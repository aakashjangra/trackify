'use client'

import { useEffect, useState } from 'react'

import { useUser } from '@clerk/nextjs'
import { db } from '@/db/dbConfig'
import { Budgets, Expenses } from '@/db/schema'
import { desc, eq, getTableColumns, sql } from 'drizzle-orm'
import BudgetItem from '../budgets/_components/BudgetItem'
import Skeleton from '@/app/_components/Skeleton'


const ExpensesScreen = () => {
  const {user} = useUser();
  const [budgetList, setBudgetList] = useState<any>();

  useEffect(() => {
    user && getBudgetList();
  }, [user])

  const getBudgetList = async () => {
    const result = await db.select({
      ...getTableColumns(Budgets),
      totalSpend: sql `sum(${Expenses.amount})`.mapWith(Number),
      totalItem: sql `count(${Expenses.id})`.mapWith(Number)
    }).from(Budgets)
    .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
    .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress!))
    .groupBy(Budgets.id)
    .orderBy(desc(Budgets.id));

    setBudgetList(result);
  }

  return (
    <div className='p-5'>
      <h2 className='text-2xl font-bold flex gap-2 items-center mt-5'>Choose a budget:</h2>
      <div className='mt-5 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>


       {
        budgetList?.length >= 0 ? budgetList.map((budget: any) => (
          <BudgetItem key={budget.id} budget={budget} />
        ))
        : (
          [1, 2, 3, 4, 5].map((el) => (
            <Skeleton key={el} />
          ))
        )
      }

            </div>
    </div>
  )
}

export default ExpensesScreen