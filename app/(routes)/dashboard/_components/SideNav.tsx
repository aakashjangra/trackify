"use client"

import { UserButton } from '@clerk/nextjs'
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const SideNav = () => {
  const menuList = [
    {
      id: 1, 
      name: 'Dashboard', 
      icon: LayoutGrid, 
      path: "/dashboard"
    }, 
    {
      id: 2, 
      name: 'Budgets', 
      icon: PiggyBank, 
      path: "/dashboard/budgets"
    }, 
    {
      id: 3, 
      name: 'Expenses', 
      icon: ReceiptText,
      path: "/dashboard/expenses"
    }, 
    {
      id: 4, 
      name: 'Upgrade', 
      icon: ShieldCheck, 
      path: "/dashboard/upgrade"
    }
  ]

  const path = usePathname();

  return (
    <div className=''>
      <Image className='h-[50px] m-5' src={'/logo.svg'} alt="Logo" width={160} height={50} />
      <div>
        {menuList.map((menu) => (
          <h2 key={menu.id} className={`flex gap-2 items-center text-gray-500 font-medium p-5 cursor-pointer rounded-md hover:text-primary hover:bg-green-100
            mb-2
            ${path == menu.path && '!text-primary !bg-green-100'}
          `}>
            <Link href={menu.path} className='flex gap-2 text-inherit'>
              <menu.icon />
              {menu.name}
            </Link>
          </h2>
        ))}
      </div>
      <div className='fixed bottom-10 flex p-5 gap-2 items-center'>
        <UserButton />
        <p className='select-none'>
          Profile
        </p>
      </div>
    </div>
  )
}

export default SideNav