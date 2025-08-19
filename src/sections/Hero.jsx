import { useControls, Leva } from 'leva';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useMediaQuery } from 'react-responsive';
import { PerspectiveCamera } from '@react-three/drei';

import Cube from '../components/Cube.jsx';
import Rings from '../components/Rings.jsx';
import ReactLogo from '../components/ReactLogo.jsx';
import Button from '../components/Button.jsx';
import Star from '../components/Star.jsx';
import CanvasLoader from '../components/Loading.jsx';
import HeroCamera from '../components/HeroCamera.jsx';
import { calculateSizes } from '../constants/index.js';
import HackerRoom from '../components/HackerRoom.jsx';

import { useState } from 'react';
// ...existing imports

const Hero = () => {
  const [showModal, setShowModal] = useState(false);

  // Use media queries to determine screen size
  const isSmall = useMediaQuery({ maxWidth: 440 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
  const sizes = calculateSizes(isSmall, isMobile, isTablet);

  // Leva controls for HackerRoom position and scale
  const { positionX, positionY, positionZ, scale } = useControls('HackerRoom', {
    positionX: { value: 2.5, min: -10, max: 50, step: 0.1 },
    positionY: { value: 2.5, min: -10, max: 50, step: 0.1 },
    positionZ: { value: 2.5, min: -10, max: 50, step: 0.1 },
  });

  return (
    <section className="min-h-screen w-full flex flex-col relative" id="home">
      <div className="w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-3">
        <p className="sm:text-3xl text-xl font-medium text-white text-center font-generalsans">
          Hi, I'm Maddy<span className="waving-hand">👋</span>
        </p>
        <p className="hero_tag text-gray_gradient">Bridging UX, Code, & AI</p>
      </div>

      <div className="w-full h-full absolute inset-0">
        <Leva hidden />
        <Canvas className="w-full h-full">
          <Suspense fallback={<CanvasLoader />}>
            {/* To hide controller */}
            
            <PerspectiveCamera makeDefault position={[0, 0, 30]} />

            <HeroCamera isMobile={isMobile}>
              <HackerRoom
                scale={sizes.deskScale}
                position={sizes.deskPosition}
                rotation={[0.1, 0, 0]}
                onAssetClick={() => setShowModal(true)}
              />
            </HeroCamera>

            <group>
              <Star position={sizes.starPosition} />
              <ReactLogo position={sizes.reactLogoPosition} />
              <Rings position={sizes.ringPosition} />
              <Cube position={sizes.cubePosition} />
            </group>

            <ambientLight intensity={1} />
            <directionalLight position={[10, 10, 10]} intensity={0.5} />
          </Suspense>
        </Canvas>
      </div>

      <div className="absolute bottom-0 left-0 right-0 w-full z-10 c-space">
        <a href="#contact" className="w-fit">
          <Button name="Let's work together" isBeam containerClass="sm:w-fit w-full sm:min-w-96" />
        </a>
      </div>
      {/* Modal for professional journey */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div
            className="grid-container relative shadow-2xl animate-growin"
            style={{
              maxWidth: '480px',
              width: '100%',
              maxHeight: '90vh',
              minHeight: '200px',
              padding: '2rem',
              boxSizing: 'border-box',
              overflowY: 'auto',
              borderRadius: '1rem',
            }}
          >
            <button
              className="absolute top-3 right-4 text-2xl text-white hover:text-gray-400"
              onClick={() => setShowModal(false)}
              style={{ lineHeight: 1 }}
            >
              &times;
            </button>
            <h2 className="grid-headtext mb-4">My Professional Journey</h2>
            {/* Add your journey content here */}
            <p className="grid-subtext">Timeline, jobs, skills, etc.</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
