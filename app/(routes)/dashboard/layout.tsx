import DashboardHeader from '@/app/(routes)/dashboard/_components/DashboardHeader'
import SideNav from '@/app/(routes)/dashboard/_components/SideNav'
import React from 'react'

const DashboardLayout = ({children}: any) => {
  return (
    <div>
      <div className='fixed hidden md:w-64 md:block'>
        <SideNav />
      </div>
      <div className='md:ml-64'>
        <DashboardHeader />
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout