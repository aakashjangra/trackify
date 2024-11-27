'use client'

import { useUser } from '@clerk/nextjs';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Hero = () => {

  const {isSignedIn} = useUser();

  return (
    <section className="bg-gray-50 flex flex-col items-center">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Manage Your Expense
            <strong className="font-extrabold text-primary sm:block"> Control your Money </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed">
            Start creating your budget and save your money
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-hover  focus:outline-none focus:ring sm:w-auto"
              href={`${isSignedIn ? '/dashboard' : '/sign-in'}`}
            >   
              Get Started
            </Link>    
          </div>
        </div>
      </div>
      <Image src={'/dashboard.jpg'} height={700} width={1000} alt='dashboard image'/>
    </section>
  )
}

export default Hero