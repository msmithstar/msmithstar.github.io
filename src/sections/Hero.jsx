import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useMediaQuery } from 'react-responsive';
import { PerspectiveCamera } from '@react-three/drei';
import { Leva } from 'leva';

import Cube from '../components/Cube.jsx';
import Rings from '../components/Rings.jsx';
import ACLogo from '../components/ACLogo.jsx';
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
  const [activeAssetModal, setActiveAssetModal] = useState(null);

  // Use media queries to determine screen size
  const isSmall = useMediaQuery({ maxWidth: 440 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
  const sizes = calculateSizes(isSmall, isMobile, isTablet);

  return (
    <section className="min-h-screen w-full flex flex-col relative overflow-hidden" id="home">
      <div className="w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-3">
        <p className="sm:text-3xl text-xl font-medium text-white text-center font-generalsans">
          Hi, I'm Maddy<span className="waving-hand">👋</span>
        </p>
        <p className="hero_tag text-gray_gradient">Bridging UX, Code, & AI</p>
        <p className="sm:text-3xl text-xl font-medium text-white text-center font-generalsans">
          (have fun!)
        </p>
      </div>

      <div className="w-full h-full absolute inset-0 overflow-hidden">
        <Leva hidden />
        <Canvas className="w-full h-full" camera={{ fov: 45 }}>
          <Suspense fallback={<CanvasLoader />}>
            {/* To hide controller */}
            
            <PerspectiveCamera makeDefault position={[0, 0, 35]} fov={45} />

            <HeroCamera isMobile={isMobile}>
              <HackerRoom
                scale={sizes.deskScale}
                position={sizes.deskPosition}
                rotation={[0.1, 0, 0]}
                onAssetClick={() => setShowModal(true)}
              />
            </HeroCamera>

            <group>
              <Star position={sizes.starPosition} onAssetClick={() => setActiveAssetModal('star')} />
              <ACLogo position={sizes.acLogoPosition} onAssetClick={() => setActiveAssetModal('ac')} />
              <Rings position={sizes.ringPosition} onAssetClick={() => setActiveAssetModal('rings')} />
              <Cube position={sizes.cubePosition} onAssetClick={() => setActiveAssetModal('cube')} />
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
            <h2 className="grid-headtext mb-4">🩷 A little about me</h2>
            {/* Add your journey content here */}
            <p className="grid-subtext">I'm a passionate developer with a love for creating intuitive user experiences. I earned my Bachelor's in Game Art from Columbia College Chicago, where I learned 2D illustration, 3D modeling, and animation. I got into software development through i.c.stars internship and am lucky to have been able to marry the two to create fun, interactive experiences for everyone.</p>
          </div>
        </div>
      )}

      {/* Asset Modals */}
      {activeAssetModal && (
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
              borderRadius: '1.5rem',
            }}
          >
            <button
              className="absolute top-3 right-4 text-2xl text-white hover:text-gray-400 transition-colors"
              onClick={() => setActiveAssetModal(null)}
              style={{ lineHeight: 1 }}
            >
              &times;
            </button>
            
            {activeAssetModal === 'star' && (
              <>
                <h2 className="grid-headtext mb-4 text-yellow-400">⭐ Leadership</h2>
                <p className="grid-subtext mb-4">
                  Before i.c.stars, I did not want to be a leader. I didn't think I was qualified or ambitious enough to lead others. I.c.stars taught me there are many ways to lead.
                </p>
                <p className="grid-subtext mb-4">
                  I learned I lead through mentorship. Week 3 I was already introducing the cycle to Figma. On Alpha Centauri, I introduced new project management software like Microsoft Loop which kept our team organized and on track. During Geek Week, I sped through my tasks and reached back to make sure I uplifted my peers so they could succeed too.
                </p>
                <p className="grid-subtext">
                  I didn't expect to enjoy leading others. I still have some imposter syndrome (who doesn't?), but I'm proud of my growth in just 14 weeks. I've learned to embrace my role and support my team in ways I never would've guessed.
                </p>
              </>
            )}
            
            {activeAssetModal === 'cube' && (
              <>
                <h2 className="grid-headtext mb-4 text-blue-400">🎮 Game Development</h2>
                <p className="grid-subtext mb-4">
                  Before diving into web development, I focused on design and got my BA in game art. I worked on TerraSphere, an indie game project where I contributed to both art and development. I made{' '}
                  <a 
                    href="https://skfb.ly/pAoI8" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-orange-400 hover:text-orange-300 underline transition-colors font-medium"
                  >
                    Mars
                  </a>
                  , a cute astronaut that crash-landed on a planet and had to bring the planet back to life through planting new alien plants.
                </p>
                <p className="grid-subtext mb-4">
                  This was the first piece of work I ever showcased at an event. We exhibited at the Chicago Toy and Game fair, where our cute space farming sim garnered the interest of both kids and adults combined. 
                </p>
                <p className="grid-subtext">
                 One note I remember, to this day, was a man who came up to our booth and loved the game. He asked for our business cards, but we had no cards! Since then, I've understood the importance of having a business card (thank you, QR codes..).
                </p>
                
                <div className="mt-4">
                  <a 
                    href="https://thequestcrafter.itch.io/terrasphere/devlog/109959/meet-the-devs" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 underline transition-colors"
                  >
                    Check out Terrasphere →
                  </a>
                </div>
              </>
            )}
            
            {activeAssetModal === 'ac' && (
              <>
                <h2 className="grid-headtext mb-4 text-cyan-400">🌟 Alpha Centauri</h2>
                <p className="grid-subtext mb-4">
                  Forming a consulting company with no consulting or programming experience was an interesting ride. We formed Alpha Centauri at the end of Team Week- the first week of the i.c.stars internship. Team week was focused on getting to know each other. We spent 11 hours a day with people we hardly knew. The only thing we did know was that we would be on teams with these people. Luckily, my team was Alpha Centauri.
                </p>
                <p className="grid-subtext mb-4">
                  Our initial process was choppy. New to tech, new to consulting, and new to each other, we had a lot to learn. We embraced the challenge, though, and through pushing and learning from each other, we found our rhythm.
                </p>
                <p className="grid-subtext">
                 From the start, my interest was in UX/UI. Over time, however, I found myself having fun learning various technologies, languages, and frameworks. Through shared leadership and a lot of curiosity, we were able to secure both wins for the Medline solutions projects.
                </p>
              </>
            )}
            
            {activeAssetModal === 'rings' && (
              <>
                <h2 className="grid-headtext mb-4 text-purple-400">🔄 Under Construction!</h2>
                <p className="grid-subtext mb-4">
                  Coming soon...
                </p>
                {/* <p className="grid-subtext mb-4">
                  Each ring is a different skill set - UX design, frontend development, AI integration, and more. 
                  They're all connected, spinning together to create something greater than the sum of their parts.
                </p>
                <p className="grid-subtext">
                  The rings remind me that learning is not a destination but a journey, and that the most exciting 
                  discoveries happen at the intersections of different disciplines.
                </p> */}
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
