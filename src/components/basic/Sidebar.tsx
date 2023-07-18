'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const links = [
  {
    href: '/',
    label: 'Products',
  },
  {
    href: '/carts',
    label: 'Carts',
  },
];

const Sidebar = () => {
  const pathName = usePathname();

  return (
    <div className="flex h-screen flex-col justify-between border-e bg-white w-72 fixed inset-y-0 z-50 ">
      <div className="px-4 py-6">
        <ul className="mt-6 space-y-1">
          {links.map(({ href, label }) => (
            <li key={label}>
              <Link
                href={href}
                className={cn('block rounded-lg px-4 py-2 text-sm font-medium text-slate-700', {
                  'bg-slate-100': pathName === href,
                })}>
                {label}
              </Link>
            </li>
          ))}
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
