import React from 'react'
import Image from 'next/image';

const Header = () => {
  return (
    <div>
      <nav style={{backgroundColor: 'rgb(17, 28, 78)'}}
              className='p-5 flex items-center gap-3 justify-between flex-grow'
      >
        <div className='flex items-center gap-2'>
          <Image src="/logo.jpg" width={50} height={50} alt='logo' />
          <h1 className='text-white font-bold text-2xl'>UMAK BLOG</h1>
        </div>
        <div>
          <button
            className='bg-white rounded-full font-bold p-3'
          >
            Sign in
          </button>
        </div>
      </nav>
    </div>
  )
}

export default Header
