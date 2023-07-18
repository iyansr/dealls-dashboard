import React from 'react';
import { UserNav } from './UserNav';
import { MobileMenu } from './Sidebar';

const Header = () => {
  return (
    <header className="bg-white border-b">
      <div className="max-w-screen-2xl py-4 px-8 flex items-center justify-between">
        <div className="block md:hidden">
          <MobileMenu />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        </div>
        <UserNav />
      </div>
    </header>
  );
};

export default Header;
