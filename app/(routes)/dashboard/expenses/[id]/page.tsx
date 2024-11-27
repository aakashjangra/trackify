"use client"

import { db } from '@/db/dbConfig';
import { Budgets, Expenses } from '@/db/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import BudgetItem from '../../budgets/_components/BudgetItem';
import Skeleton from '@/app/_components/Skeleton';
import AddExpense from '../_components/AddExpense';
import ExpenseListTable from '../_components/ExpenseListTable';
import { Button } from '@/components/ui/button';
import { ArrowLeft, PenBox, Trash } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from 'react-toastify';
import EditBudget from '../_components/EditBudget';


const ExpensesInterface = () => {
  const params = useParams();
  const route = useRouter();
  const {user} = useUser();

  const [budgetInfo, setBudgetInfo] = useState<any>();
  const [expensesList, setExpensesList] = useState<any>();


  useEffect(() => {
    user && getBudgetInfo();
  }, [user])
  
  const getBudgetInfo = async () => {
    const result = await db.select({
      ...getTableColumns(Budgets),
      totalSpend: sql `sum(${Expenses.amount})`.mapWith(Number),
      totalItem: sql `count(${Expenses.id})`.mapWith(Number)
    }).from(Budgets)
    .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
    .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress!))
    //@ts-ignore
    .where(eq(Budgets.id, params.id))
    .groupBy(Budgets.id)
    .orderBy(Budgets.id);

    setBudgetInfo(result[0]);

    getExpensesInfo();
  }

  const getExpensesInfo = async () => {
    const result = await db.select().from(Expenses)
    .where(eq(Expenses.budgetId, params.id))
    .orderBy(desc(Expenses.id));

    setExpensesList(result);
  }

  const deleteBudget = async () => {

    const deleteExpenseResult = await db.delete(Expenses)
    .where(eq(Expenses.budgetId, params.id))
    .returning();

    if(deleteExpenseResult){ 
      const result = await db.delete(Budgets)
      .where(eq(Budgets.id, params.id))
      .returning();

      console.log(result);
      toast.success("Budget Deleted");
      route.replace('/dashboard/budgets');
    }

  }
  
  return (
    <div className='p-10'>
      <div className='flex justify-between'>
        <span className='flex gap-2 items-center'>
          <ArrowLeft onClick={() => route.back()} className='cursor-pointer' />
          My Expenses
          </span>
        
        <div className='flex gap-2 items-center'>
          
        <EditBudget budgetInfo={budgetInfo} refreshData={getBudgetInfo} />
        {/* Delete button */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <span>
              <Button className='flex gap-2' variant="destructive"><Trash /> Delete</Button>
            </span>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your current budget
                and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={()=>deleteBudget()}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 mt-6'>
        {
          budgetInfo ? 
          <BudgetItem budget={budgetInfo} />
          : 
          <Skeleton />
        }
        <AddExpense budgetId={params.id} user={user} refreshData={() => getBudgetInfo()} />
      </div>
      <div>
        <ExpenseListTable expensesList={expensesList} refreshData={() => getBudgetInfo()} />
      </div>
    </div>
  )
}

export default ExpensesInterface