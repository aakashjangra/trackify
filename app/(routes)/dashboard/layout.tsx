"use client"

import DashboardHeader from '@/app/(routes)/dashboard/_components/DashboardHeader'
import SideNav from '@/app/(routes)/dashboard/_components/SideNav'
import { db } from '@/db/dbConfig'
import { Budgets } from '@/db/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const DashboardLayout = ({children}: any) => {

  const {user} = useUser();
  const router = useRouter();

  const checkUserBudgets = async () => {
    const result = await db.select()
    .from(Budgets)
    .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress));

    console.log(result);

    if(result?.length === 0) {
      router.replace('/dashboard/budgets');
    }
  }

  useEffect(() => {
    user && checkUserBudgets();
  }, [user])

  return (
    <div>
      <div className='fixed hidden md:w-64 md:block'>
        <SideNav />
      </div>
      <div className='md:ml-64'>
        <DashboardHeader />
        {children}
      </div>

      <ToastContainer />
    </div>
  )
}

export default DashboardLayout