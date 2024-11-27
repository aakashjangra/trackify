"use client"

import { UserButton, useUser } from '@clerk/nextjs'
import { LayoutGrid, Menu, PiggyBank, ReceiptText, ShieldCheck, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const SideNav = () => {

  const path = usePathname(); 
  const {isSignedIn} = useUser();
  const [openSideNav, setOpenSideNav] = useState<boolean>(false);

  const toggleMenu = () => {
    setOpenSideNav(!openSideNav);
  }

  return (
    <>

{/* menu control */}
    <div className='fixed top-0 block md:hidden z-20 m-5 cursor-pointer hover:scale-[1.2]' onClick={toggleMenu}>
      {
        openSideNav ? (
          <X />
        ): (
          <Menu />
        )
      }

      </div>
      {/* sidenav */}
    <div className={`p-2 z-10 fixed ${openSideNav ? 'block border': 'hidden'} md:w-64 md:block bg-white h-screen`}>     
      <Link href={`${isSignedIn ? '/dashboard': '/'}`}>
        <Image className='h-[50px] m-5' src={'/logo.svg'} alt="Logo" width={160} height={50} />
      </Link>
      <div>
        <h2 className={`flex gap-2 items-center text-gray-500 font-medium p-5 cursor-pointer rounded-md hover:text-primary hover:bg-green-100
            mb-2
            ${path == "/dashboard" && '!text-primary !bg-green-100'}
          `}>
            <Link href={"/dashboard"} className='flex gap-2 text-inherit'>
              <LayoutGrid />
              Dashboard
            </Link>
          </h2>
          <h2 className={`flex gap-2 items-center text-gray-500 font-medium p-5 cursor-pointer rounded-md hover:text-primary hover:bg-green-100
            mb-2
            ${path == "/dashboard/budgets" && '!text-primary !bg-green-100'}
          `}>
            <Link href={"/dashboard/budgets"} className='flex gap-2 text-inherit'>
              <PiggyBank />
              Budgets
            </Link>
          </h2>
          <h2 className={`flex gap-2 items-center text-gray-500 font-medium p-5 cursor-pointer rounded-md hover:text-primary hover:bg-green-100
            mb-2
            ${path == "/dashboard/expenses" && '!text-primary !bg-green-100'}
          `}>
            <Link href={"/dashboard/expenses"} className='flex gap-2 text-inherit'>
              <ReceiptText />
              Expenses
            </Link>
          </h2>
          <h2 className={`flex gap-2 items-center text-gray-500 font-medium p-5 cursor-pointer rounded-md hover:text-primary hover:bg-green-100
            mb-2
            ${path == "/dashboard/upgrade" && '!text-primary !bg-green-100'}
          `}>
            <Link href={"/dashboard/upgrade"} className='flex gap-2 text-inherit'>
              <ShieldCheck />
              Upgrade
            </Link>
          </h2>
       
      </div>
      <div className='fixed bottom-10 flex p-5 gap-2 items-center'>
        <UserButton />
        <p className='select-none'>
          Profile
        </p>
      </div>
    </div>
    </>
  )
}

export default SideNav