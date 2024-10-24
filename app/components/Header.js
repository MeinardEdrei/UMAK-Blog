import React from 'react'
import Image from 'next/image';

const Header = () => {
  return (
    <div>
      <nav style={{backgroundColor: 'rgb(17, 28, 78)'}}
              className='p-5 flex items-center gap-3'
      >
        <Image src="/logo.jpg" width={50} height={50} alt='logo' />
        <h1 className='text-white font-bold'>UMAK Blog</h1>
      </nav>
    </div>
  )
}

export default Header
