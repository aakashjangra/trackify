'use client'

import { useUser } from '@clerk/nextjs';

import { db } from '@/db/dbConfig';
import { Budgets, Expenses } from '@/db/schema';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { useEffect, useState } from 'react';
import CardInfo from './_components/CardInfo';
import BarChartDashboard from './_components/BarChartDashboard';
import BudgetItem from './budgets/_components/BudgetItem';
import { create } from 'domain';
import ExpenseListTable from './expenses/_components/ExpenseListTable';

const Dashboard = () => {

  const { user } = useUser();
  const [budgetInfo, setBudgetInfo] = useState<any>();
  const [expensesList, setExpensesList] = useState<any>();


  const getBudgetInfo = async () => {
    const result = await db.select({
      ...getTableColumns(Budgets),
      totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
      totalItem: sql`count(${Expenses.id})`.mapWith(Number)
    }).from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress!))
      .groupBy(Budgets.id)
      .orderBy(Budgets.id);

    setBudgetInfo(result);
    getAllExpenses();
  }

  const getAllExpenses = async () => {
    console.log('inside getallexpenses')
    try {
      let result = await db.select({
        id: Expenses.id,
        name: Expenses.name,
        amount: Expenses.amount,
        createdAt: Expenses.createdAt,
        createdBy: Budgets.createdBy,
      }).from(Expenses)
        .rightJoin(Budgets, eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress!))
        .orderBy(desc(Expenses.id));

        result = result.filter((el: any) => el.id !== null);
      setExpensesList(result);
      console.log('expenses list - ', result);
    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    user && getBudgetInfo();
  }, [user])

  return (
    <div className='p-5'>
      <div>
        <h2 className='font-bold text-3xl'>Hi, {user?.fullName}</h2>
        <p className='text-gray-500'>Here's what happening with your money, Let's Manage your expense</p>
      </div>
      <CardInfo budgetList={budgetInfo} />

      <div className='grid grid-cols-1 md:grid-cols-3 mt-6 gap-5'>
        <div className='md:col-span-2'>
          <BarChartDashboard budgetList={budgetInfo} />
          <ExpenseListTable expensesList={expensesList} refreshData={() => getBudgetInfo()} />
        </div>
        <div className='grid gap-2'>
          <h2 className='font-bold text-xl'>Latest Budgets</h2>
          <div>
            {
              budgetInfo && (
                budgetInfo.map((el: any) => (
                  <BudgetItem key={el.id} budget={el} />
                ))
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard