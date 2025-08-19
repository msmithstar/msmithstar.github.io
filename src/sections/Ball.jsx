import React, { useRef, useState, useLayoutEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';

const answers = [
  'Yes',
  'No',
  'Ask again',
  'Definitely',
  'Unlikely',
  'Maybe',
  'Absolutely',
  'Try later',
  'Cannot say',
  'Outlook good',
  'Better not tell you now... or ever.',
  'You already know the answer.',
  'The stars say meh.',
  'My sources say refresh.',
  'If you believe in magic...',
  'You can\'t handle the truth!',
  'Ask again when Mercury is in retrograde.',
  'Only if you say please.',
  'I wouldn\'t bet on it.',
  'You wish!',
  'Absolutely.. not sure.',
  'The answer is somewhere on the internet.',
  'Ask your future self.',
  'If I told you, I\'d have to [REDACTED].',
  'Only on a leap year.',
  'I see a yes, but also a no.',
  'Consult the nearest dog.',
  'If you have to ask, you know the answer.',
  'I plead the fifth.',
  'Ask again after a deep breath.',
  'You can\'t rush magic.',
];

function EightBall(props) {
  const mesh = useRef();
  const [state, setState] = useState({
    answer: '8',
    display: '8',
    opacity: 1,
    color: '#00ffe7',
    phase: 'default',
  });
  const shakeRef = useRef(0);
  const timerRef = useRef();
  const measureRef = useRef();
  const [pendingResize, setPendingResize] = useState(false);

  // Handle all animation and reset logic in one effect
  React.useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  React.useEffect(() => {
    clearTimeout(timerRef.current);
    if (state.phase === 'fadingOut') {
      setState(s => ({ ...s, opacity: 0 }));
      timerRef.current = setTimeout(() => {
        setPendingResize(true);
        setState(s => ({
          ...s,
          display: s.nextAnswer || s.answer,
          color: '#00ffe7',
          opacity: 0,
          nextAnswer: null,
          phase: 'fadingIn',
        }));
      }, 400);
    } else if (state.phase === 'fadingIn') {
      timerRef.current = setTimeout(() => setState(s => ({ ...s, opacity: 1, phase: 'answer' })), 10);
    } else if (state.phase === 'answer') {
      timerRef.current = setTimeout(() => setState(s => ({ ...s, phase: 'fadeToBlack' })), 5000);
    } else if (state.phase === 'fadeToBlack') {
      setState(s => ({ ...s, opacity: 0 }));
      timerRef.current = setTimeout(() => setState(s => ({ ...s, display: '8', color: '#000', phase: 'fadeIn8' })), 400);
    } else if (state.phase === 'fadeIn8') {
      timerRef.current = setTimeout(() => setState(s => ({ ...s, opacity: 1, color: '#00ffe7', answer: '8', phase: 'default' })), 10);
    }
    // No timer for 'default', 'shaking', 'returning'
    return () => clearTimeout(timerRef.current);
  }, [state.phase]);

  useLayoutEffect(() => {
    // Only measure when nextAnswer is set and phase is fadingOut
    if ((state.phase === 'fadingOut' || state.phase === 'fadingIn') && state.nextAnswer && measureRef.current) {
      const rect = measureRef.current.getBoundingClientRect();
      setState(s => ({ ...s, width: rect.width, height: rect.height }));
    }
    // After fade-in, allow container to resize naturally
    if (state.phase === 'answer' && pendingResize) {
      setState(s => ({ ...s, width: null, height: null }));
      setPendingResize(false);
    }
  }, [state.phase, state.nextAnswer, pendingResize]);

  useFrame((_, delta) => {
    if (state.phase === 'shaking') {
      shakeRef.current += delta * 10;
      mesh.current.rotation.x = Math.sin(shakeRef.current) * 0.2;
      mesh.current.rotation.y = Math.sin(shakeRef.current * 1.2) * 0.2;
      if (shakeRef.current > Math.PI * 2) {
        shakeRef.current = 0;
        mesh.current.rotation.x = 0;
        mesh.current.rotation.y = 0;
        setState(s => ({
          ...s,
          answer: answers[Math.floor(Math.random() * answers.length)],
          phase: 'returning',
        }));
      }
    } else if (state.phase === 'returning') {
      mesh.current.rotation.x += (-mesh.current.rotation.x) * 0.2;
      mesh.current.rotation.y += (-mesh.current.rotation.y) * 0.2;
      if (Math.abs(mesh.current.rotation.x) < 0.01 && Math.abs(mesh.current.rotation.y) < 0.01) {
        mesh.current.rotation.x = 0;
        mesh.current.rotation.y = 0;
        setState(s => ({ ...s, phase: 'fadingOut' }));
      }
    }
  });

  // Triggers (click, mouse shake, etc.)
  const handleShake = () => {
    clearTimeout(timerRef.current);
    setState(s => ({ ...s, phase: 'shaking', display: '8', color: '#00ffe7', answer: '8', opacity: 1 }));
  };

  // Mouse shake detection
  const mouseShake = useRef({ lastX: null, lastTime: null, streak: 0 });
  function handlePointerMove(e) {
    if (state.phase === 'shaking' || state.phase === 'returning') return;
    const now = Date.now(), x = e.clientX;
    if (mouseShake.current.lastX !== null && mouseShake.current.lastTime !== null) {
      const dx = x - mouseShake.current.lastX, dt = now - mouseShake.current.lastTime;
      if (Math.abs(dx / (dt || 1)) > 1.5) {
        mouseShake.current.streak++;
        if (mouseShake.current.streak > 2) {
          handleShake();
          mouseShake.current.streak = 0;
        }
      } else mouseShake.current.streak = 0;
    }
    mouseShake.current.lastX = x; mouseShake.current.lastTime = now;
  }
  function handlePointerUp() { mouseShake.current.streak = 0; mouseShake.current.lastX = null; mouseShake.current.lastTime = null; }

  // Digital interface style
  const digitalStyle = {
    background: 'linear-gradient(180deg, #222 60%, #444 100%)',
    border: '2px solid #00ffe7',
    borderRadius: '1rem',
    boxShadow: '0 0 16px #00ffe7, 0 0 2px #fff',
    color: state.color,
    fontFamily: 'monospace',
    fontWeight: 'bold',
    fontSize: state.display === '8' ? '2rem' : '1.1rem',
    padding: '0.4rem 1.2rem',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    letterSpacing: '0.1em',
    textShadow: '0 0 8px #00ffe7, 0 0 2px #fff',
    userSelect: 'none',
    pointerEvents: 'none',
    transition: (state.width || state.height) ? 'width 0.5s cubic-bezier(0.22,1,0.36,1), height 0.5s cubic-bezier(0.22,1,0.36,1), font-size 0.3s' : undefined,
    overflow: 'hidden',
    whiteSpace: 'pre',
  };
  const answerTextStyle = {
    opacity: state.opacity,
    color: state.color,
    transition: 'opacity 0.7s cubic-bezier(.4,0,.2,1), color 0.4s',
    willChange: 'opacity,color',
  };

  return (
    <group {...props} ref={mesh}
      onClick={handleShake}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshPhysicalMaterial color="#ffb6c1" clearcoat={1} clearcoatRoughness={0} metalness={0.7} roughness={0.1} reflectivity={1} />
      </mesh>
      <Html center position={[-0.35, 0, 2.5]} style={digitalStyle} transform>
        <span style={answerTextStyle}>{state.display}</span>
      </Html>
    </group>
  );
}

export default function BallSection() {
  const [fullscreen, setFullscreen] = useState(false);
  const sectionRef = useRef();

  const handleFullscreen = () => {
    setFullscreen(f => !f);
    setTimeout(() => {
      if (!fullscreen) {
        sectionRef.current.requestFullscreen?.();
      } else {
        document.exitFullscreen?.();
      }
    }, 0);
  };

  return (
    <section
      id="ball"
      ref={sectionRef}
      className={`w-full flex items-center justify-center scroll-mt-24 ${fullscreen ? 'fixed inset-0 z-[9999] bg-black' : ''}`}
      style={{ minHeight: 'unset', height: fullscreen ? '100vh' : '350px', position: fullscreen ? 'fixed' : 'relative', marginTop: fullscreen ? 0 : '5rem' }}
    >
      <Canvas shadows camera={{ position: [0, 0, 7.5], fov: 50 }} gl={{ alpha: true }} style={{ background: 'transparent', height: fullscreen ? '100vh' : 350, width: '100%' }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <EightBall position={[0, 0, 0]} />
        <OrbitControls enablePan={false} />
      </Canvas>
      <div className="absolute bottom-2 left-0 right-0 flex items-center justify-center gap-3 text-white opacity-80 select-none text-s">
        <span>Click the ball to shake for an answer!</span>
        <button
          onClick={handleFullscreen}
          className="bg-[#222] border border-[#00ffe7] rounded px-2 py-1 text-xs hover:bg-[#00ffe7] hover:text-black transition-colors"
          style={{ outline: 'none' }}
        >
          {fullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        </button>
      </div>
    </section>
  );
}
