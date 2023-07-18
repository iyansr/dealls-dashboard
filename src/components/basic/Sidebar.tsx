'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { CreditCard, LogOut, MenuIcon, PlusCircle, Settings, User } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';

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

export function MobileMenu() {
  const pathName = usePathname();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MenuIcon className="h-6 w-6" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        {links.map(({ href, label }) => (
          <DropdownMenuItem asChild key={label}>
            <Link
              href={href}
              className={cn('block rounded-lg px-4 py-2 text-sm font-medium text-slate-700', {
                'bg-slate-100': pathName === href,
              })}>
              {label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const Sidebar = () => {
  const pathName = usePathname();

  return (
    <div className="h-screen flex-col hidden md:flex justify-between border-e bg-white md:w-72 fixed inset-y-0 z-50 ">
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
