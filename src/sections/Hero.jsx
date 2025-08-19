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
          (and making it fun)
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
            <h2 className="grid-headtext mb-4">My Professional Journey</h2>
            {/* Add your journey content here */}
            <p className="grid-subtext">Timeline, jobs, skills, etc.</p>
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
                <h2 className="grid-headtext mb-4 text-yellow-400">⭐ Dreams & Aspirations</h2>
                <p className="grid-subtext mb-4">
                  Every star represents a dream waiting to be realized. My journey in tech started with a simple wish - 
                  to bridge the gap between beautiful design and powerful functionality.
                </p>
                <p className="grid-subtext mb-4">
                  From late nights learning to code to designing user experiences that matter, each challenge has been 
                  a stepping stone toward creating technology that truly serves people.
                </p>
                <p className="grid-subtext">
                  The stars remind me to keep reaching higher, to never stop learning, and to always maintain that 
                  sense of wonder that first drew me to this field.
                </p>
              </>
            )}
            
            {activeAssetModal === 'cube' && (
              <>
                <h2 className="grid-headtext mb-4 text-blue-400">🎯 Building Blocks</h2>
                <p className="grid-subtext mb-4">
                  Like a Rubik's cube, every project I work on has multiple facets that need to align perfectly. 
                  Each twist and turn teaches me something new about problem-solving and patience.
                </p>
                <p className="grid-subtext mb-4">
                  My approach to development is methodical yet creative - breaking down complex problems into 
                  manageable pieces, then assembling them into something beautiful and functional.
                </p>
                <p className="grid-subtext">
                  The cube represents my love for puzzles, logic, and the satisfaction that comes from finding 
                  elegant solutions to challenging problems.
                </p>
              </>
            )}
            
            {activeAssetModal === 'ac' && (
              <>
                <h2 className="grid-headtext mb-4 text-cyan-400">🌟 Alpha Centauri</h2>
                <p className="grid-subtext mb-4">
                  Forming a consulting company with no consulting or programming experience was an interesting ride. We formed Alpha Centauri at the end of Team Week- the first week of the i.c.stars internship. Team week was focused on getting to know each other. We spent 11 hours a day with people we hardly knew. The only thing we did know was that we would be on teams with these people.
                </p>
                <p className="grid-subtext mb-4">
                  The team-making process was not what I expected. By the end of the 4th day, I had a list of interns in mind that I thought would be great to work with. I considered their personalities, communication style, and prior experience to decide who I wanted the most. On the 5th day, i.c.stars had a different plan for us. They decided the teams, which resulted in me teaming up with just the right fit for us to grow and succeed. They formed the teams based on our MBTI scores, our applications, and how we interacted across the span of the first week.
                </p>
                <p className="grid-subtext">
                 The first part of the process was hard. I didn’t know these people and I wasn’t particularly thrilled to be with one of them based on our interactions during Team Week. I didn’t really have too many opinions on the other members yet, but I was initially disappointed I wasn’t able to form the team I thought would be a good fit.
                </p>
              </>
            )}
            
            {activeAssetModal === 'rings' && (
              <>
                <h2 className="grid-headtext mb-4 text-purple-400">🔄 Continuous Learning</h2>
                <p className="grid-subtext mb-4">
                  These interconnected rings represent the cyclical nature of learning and growth. In tech, 
                  standing still means falling behind, so I've embraced a mindset of continuous improvement.
                </p>
                <p className="grid-subtext mb-4">
                  Each ring is a different skill set - UX design, frontend development, AI integration, and more. 
                  They're all connected, spinning together to create something greater than the sum of their parts.
                </p>
                <p className="grid-subtext">
                  The rings remind me that learning is not a destination but a journey, and that the most exciting 
                  discoveries happen at the intersections of different disciplines.
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
