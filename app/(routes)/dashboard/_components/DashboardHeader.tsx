import { UserButton } from '@clerk/nextjs'
import { Coins } from 'lucide-react'
import React from 'react'

const DashboardHeader = () => {
  return (
    <div className='p-5 shadow-sm border-b grid grid-cols-2'>
      <div className='flex justify-end'>
        <h1 className='flex items-center gap-2 font-bold text-xl'>Trackify: Expense Tracker
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