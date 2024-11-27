import Link from 'next/link'
import React from 'react'

const BudgetItem = ({budget}: any) => {

  const calculateProgressPerc = () => {
    const perc = (budget.totalSpend / budget.amount) * 100;
    return perc.toFixed(2);
  }

  return (
    <Link href={'/dashboard/expenses/'+budget?.id} className='w-full p-5 border rounded-lg flex flex-col hover:shadow-md cursor-pointer h-[170px]'>
      <div className='w-full flex gap-2 items-center justify-between'>
        <div className='flex gap-2 items-center'>
          <h2 className='text-3xl p-3 px-4 bg-slate-100 rounded-full'>{budget?.icon}</h2>
          <div>
            <h2 className='font-bold'>{budget.name}</h2>
            <h2 className='text-sm text-gray-900'>{budget.totalItem} Item</h2>
          </div>
        </div>
        <h2 className='font-bold text-lg text-primary'>₹{budget.amount}</h2>
      </div>
      {/* progress bar */}
      {/* TODO: Dynamic Update  */}
      <div className='mt-5'>
        <div className='flex justify-between'>
          <h2 className='text-xs text-slate-400'>
            ₹{budget?.totalSpend ? budget.totalSpend: 0} Spent
          </h2>
          <h2 className='text-xs text-slate-400'>
            ₹{budget?.totalSpend ? budget.amount - budget.totalSpend: budget.amount} Remaining
          </h2>
        </div>
        <div className='w-full bg-slate-300 h-2 rounded-full'> 
          <div className={` bg-primary h-2 rounded-full`} style={{
            width: `${calculateProgressPerc()}%`
          }}> 
          </div>
        </div>
      </div>
    </Link>
  )
}

export default BudgetItem