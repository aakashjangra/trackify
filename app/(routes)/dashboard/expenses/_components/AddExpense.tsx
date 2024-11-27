"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { db } from '@/db/dbConfig';
import { Budgets, Expenses } from '@/db/schema';
import { Loader } from 'lucide-react';
import moment from 'moment';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

const AddExpense = ({budgetId, refreshData}: any) => {
  const [name, setName] = useState<string>('');
  const [amount, setAmount] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);


  const addNewExpense = async () => {
    setLoading(true);
    //@ts-expect-error
    const result = await db.insert(Expenses).values({
      name,
      amount,
      budgetId, 
      createdAt: moment().format('DD-MM-YYYY'),
    }).returning({insertedId: Budgets.id});


    
    if(result){
      toast.success('New Expense Added')
      setLoading(false);
      setName('');
      setAmount(NaN);
      refreshData();
    }
  }

  return (
    <div className='p-5 border'>
      <h2 className='font-bold text-lg'>Add Expense</h2>
      <div className='mt-2'>
        <h2 className='text-black font-medium my-1'>Expense Name</h2>
        <Input placeholder='e.g. Bedroom Decor' value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className='mt-2'>
        <h2 className='text-black font-medium my-1'>Amount</h2>
        <Input type='number' placeholder='e.g. 1000' min={1} value={amount} onChange={(e) => setAmount(parseInt(e.target.value))} />
      </div>
      <Button disabled={!(name && amount) || loading}
      onClick={() => addNewExpense()}
      className='mt-3 w-full'>
        {
          loading ? (
            <Loader className='animate-spin' />
          ):(
            "Add New Expense"
          ) 
        }
        </Button>

    </div>
  )
}

export default AddExpense