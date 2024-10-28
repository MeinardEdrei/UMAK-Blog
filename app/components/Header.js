'use client';

import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

const Header = () => {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <div>
      <nav style={{backgroundColor: '#111C4E'}}
              className='p-3 flex items-center gap-3 justify-between flex-grow'
      >
        <Link 
          href='/'
          className='flex items-center gap-2'>
            <Image src="/logo.jpg" width={30} height={30} alt='logo' />
            <h1 className='text-white font-bold text-xl'>UMAK BLOG</h1>
        </Link>
        <div>
          {pathname !== '/login' && pathname !== '/register' && session === null && (
            <Link
              href='/login'
              className='bg-white rounded-full font-bold p-2'>
                Log in
            </Link>
          )}
          {session && (
            <button
              onClick={() => signOut()}
              className='bg-white rounded-full font-bold p-2'
            >
              Sign Out
            </button>
          )}
        </div>
      </nav>
    </div>
  )
}

export default Header
