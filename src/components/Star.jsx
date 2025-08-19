import { useGLTF } from '@react-three/drei';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Star = (props) => {
  const starRef = useRef();
  const { scene } = useGLTF('/models/star.glb');

  useGSAP(() => {
    gsap.to(starRef.current.position, {
      y: starRef.current.position.y + 0.5,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
    });
  });

  return (
    <mesh {...props} ref={starRef} rotation={[0, Math.PI / 5, 0]} scale={1.5} onClick={props.onAssetClick}>
      <primitive object={scene} />
    </mesh>
  );
};

export default Star;
