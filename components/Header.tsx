
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-8 text-center">
      <h1 className="text-4xl font-extrabold text-indigo-600 tracking-tight">
        Task<span className="text-slate-800">Master</span>
      </h1>
      <p className="mt-2 text-slate-500">Stay organized and get things done.</p>
    </header>
  );
};

export default Header;
