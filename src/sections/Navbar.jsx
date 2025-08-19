import { useState } from 'react';

import { navLinks } from '../constants/index.js';
import mball from '/assets/mball.png';
const resumeUrl = '/assets/Madeline-Smith-Resume.pdf';

const NavItems = ({ onClick = () => {} }) => {
  const ballLink = navLinks.find((item) => item.id === 5);
  const otherLinks = navLinks.filter((item) => item.id !== 5);
  return (
    <ul className="nav-ul">
      {otherLinks.map((item) => (
        <li key={item.id} className="nav-li">
          <a href={item.href} className="nav-li_a" onClick={onClick}>
            {item.name}
          </a>
        </li>
      ))}
      <li className="nav-li">
        <a href={resumeUrl} className="nav-li_a" download target="_blank" rel="noopener noreferrer">
          Resume
        </a>
      </li>
      {ballLink && (
        <li key={ballLink.id} className="nav-li">
          <a href={ballLink.href} className="nav-li_a" onClick={onClick}>
            <img src={mball} alt="Magic 8 Ball" style={{ height: 36, width: 'auto', background: 'transparent', display: 'inline-block', verticalAlign: 'middle' }} />
          </a>
        </li>
      )}
    </ul>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center py-5 mx-auto c-space">
          <a href="/" className="text-neutral-400 font-bold text-xl hover:text-white transition-colors">
            Maddy Smith
          </a>

          <button
            onClick={toggleMenu}
            className="text-neutral-400 hover:text-white focus:outline-none sm:hidden flex"
            aria-label="Toggle menu">
            <img src={isOpen ? 'assets/close.svg' : 'assets/menu.svg'} alt="toggle" className="w-6 h-6" />
          </button>

          <nav className="sm:flex hidden">
            <NavItems />
          </nav>
        </div>
      </div>

      <div className={`nav-sidebar ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
        <nav className="p-5">
          <NavItems onClick={closeMenu} />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
