"use client"

import { Button } from '@/components/ui/button'
import { UserButton, useUser } from '@clerk/nextjs';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

const Header = () => {

  const {isSignedIn, user} = useUser();

  return (
    <div className='p-5 flex justify-between items-center border shadow-md'>
      <Image className='h-[50px] ' src={'./logo.svg'} alt="Logo" width={160} height={100} />
      {
        isSignedIn ? (
          <UserButton />
        ): (
          <Link href='/sign-in'>
            <Button>Get Started</Button>
          </Link>
        )
      }
    </div>
  ) 
}

export default Header