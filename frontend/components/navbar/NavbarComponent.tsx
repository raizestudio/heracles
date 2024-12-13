"use client";

import React from 'react';
import Link from 'next/link';

import { capitalize } from '@/utils/textHelper';

interface MenuInterface {
  name: string;
  url: string;
  requiresAuth?: boolean;
}

const NavbarComponent = () => {
  const MENUS: MenuInterface[] = [
    {
      name: 'home',
      url: '/',
      requiresAuth: false
    },
    {
      name: 'go to app',
      url: '/app',
      requiresAuth: true
    }
  ]

  return (
    <nav className='flex justify-between px-4 py-1'>
      <div>
        <span className="font-black">Heracles</span>
      </div>
      <ul className='flex gap-2'>
        {MENUS.map((menu, index) => (
          <li key={index}>
            <Link href={menu.url}>
              <span>{capitalize(menu.name)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavbarComponent;