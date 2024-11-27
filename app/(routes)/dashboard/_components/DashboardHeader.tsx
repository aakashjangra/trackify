import { UserButton } from '@clerk/nextjs'
import { Coins } from 'lucide-react'
import React from 'react'

const DashboardHeader = () => {
  return (
    <div className='p-5 shadow-sm border-b flex justify-end gap-5 md:gap-0 md:grid grid-cols-2'>
      <div className='flex justify-end'>
        <h1 className='flex items-center gap-2 font-bold text-xl select-none'>
          <p className='flex items-center flex-nowrap'>
            Trackify
            <span className='hidden md:block'>
              : Expense Tracker
            </span>
          </p>
          <Coins className='text-primary animate-bounce' />
        </h1>
      </div>
      <div className='flex justify-end'>
        <UserButton />  
      </div>
    </div>
  )
}

export default DashboardHeader