import React, { useState } from 'react';


const SidePopup = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="fixed z-50 bg-[#0a0a0a] text-white px-4 py-2 rounded-r-lg shadow-lg left-0 transition border border-gray-700 top-24 hover:bg-[#18181b] flex items-center justify-center"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close My Story' : 'Open My Story'}
        style={{ width: 56, height: 56 }}
      >
        {open ? (
          '✕'
        ) : (
          <img src="/assets/burger-solid-full.svg" alt="Open My Story" className="w-7 h-7" />
        )}
      </button>
      <aside
        className={`fixed left-0 w-80 bg-[#0a0a0a] border-r border-gray-800 shadow-2xl z-40 transform transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ maxWidth: '90vw', top: '80px', height: 'calc(100% - 80px)' }}
      >
        <div className="p-6 pl-16 h-full overflow-y-auto text-white">
          <h2 className="text-2xl font-bold mb-4 text-gradient bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">My Story</h2>
          {children || <p className="text-gray-300">Write your story here...</p>}
        </div>
      </aside>
    </>
  );
};

export default SidePopup;
