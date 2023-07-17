import Link from 'next/link';
import React from 'react';

const Sidebar = () => {
  return (
    <div className="flex h-screen flex-col justify-between border-e bg-white w-72 fixed inset-y-0 z-50 ">
      <div className="px-4 py-6">
        <span className="grid h-10 w-32 place-content-center rounded-lg bg-slate-100 text-xs text-slate-600">
          Logo
        </span>

        <ul className="mt-6 space-y-1">
          <li>
            <Link
              href="#!"
              className="block rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
              General
            </Link>
          </li>
        </ul>
      </div>

      <div className="sticky inset-x-0 bottom-0 border-t border-slate-100">
        <div className="flex items-center gap-2 bg-white p-4 hover:bg-slate-50">
          <div>
            <p className="text-xs">
              <strong className="block font-medium">Eric Frusciante</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
