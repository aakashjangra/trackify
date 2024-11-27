import { db } from '@/db/dbConfig';
import { Expenses } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { Trash } from 'lucide-react'
import React from 'react'
import { toast } from 'react-toastify';

const ExpenseListTable = ({expensesList, refreshData}: any) => {

  const deleteExpense = async (id: number) => {
    const result = await db.delete(Expenses)
    .where(eq(Expenses.id, id))
    .returning();

    if(result){
      toast.error('Expense Deleted');
      refreshData();
    }
  }

  return (
    <div className='mt-3'>
        <h2 className='font-bold text-xl mb-2'>Latest Expenses</h2>
      <div className='grid grid-cols-4 bg-slate-200 p-2 font-bold'>
        <h2 className=''>Name</h2>
        <h2>Amount</h2>
        <h2>Date {`(DD-MM-YYYY)`}</h2>
        <h2>Action</h2>
      </div>

      {
        expensesList && expensesList.map((expense: any) => (
          <div className='grid grid-cols-4 bg-slate-50 p-2' key={expense.id}>
            <h2>{expense.name}</h2>
            <h2>{expense.amount}</h2>
            <h2>{expense.createdAt}</h2>
            <h2>
              <Trash className='text-red-600 cursor-pointer' 
                onClick={() => deleteExpense(expense.id)}
              />
            </h2>
          </div>
        ))
      }
    </div>
  )
}

export default ExpenseListTable