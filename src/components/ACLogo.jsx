/*
    Alpha Centauri Logo Component
    Displays the alphacentauri.png image as a floating 2D element
*/

import { Float, useTexture } from '@react-three/drei';

const ACLogo = (props) => {
  const texture = useTexture('/assets/alphacentauri.png');

  return (
    <Float floatIntensity={1}>
      <group position={[8, 8, 0]} scale={0.8} {...props} dispose={null} onClick={props.onAssetClick}>
        <mesh>
          <planeGeometry args={[2, 2]} />
          <meshBasicMaterial 
            map={texture} 
            transparent={true} 
            alphaTest={0.1}
          />
        </mesh>
      </group>
    </Float>
  );
};

export default ACLogo;
