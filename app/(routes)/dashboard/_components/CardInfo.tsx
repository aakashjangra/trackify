import Skeleton from '@/app/_components/Skeleton';
import { PiggyBank, ReceiptText, Wallet } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const CardInfo = ({ budgetList }: any) => {
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpend, setTotalSpend] = useState(0);


  useEffect(() => {
    budgetList && CalculateCardInfo();
  }, [budgetList])

  const CalculateCardInfo = () => {
    let totalBudget_ = 0, totalSpend_ = 0;
    budgetList.forEach((el: { amount: number; totalSpend: number; }) => {
      totalBudget_ += el.amount;
      totalSpend_ += el.totalSpend;
    })

    setTotalBudget(totalBudget_);
    setTotalSpend(totalSpend_);
  }

  return (
    <>
      {
        budgetList ?
          (
            <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>

              <div className='p-7 border rounded-lg flex items-center justify-between'>
                <div>
                  <h2 className='text-sm'>Total Budget</h2>
                  <h2 className='font-bold text-2xl'>₹{totalBudget}</h2>
                </div>
                <PiggyBank className='bg-primary p-3 h-12 w-12 rounded-full text-white' />
              </div>
              <div className='p-7 border rounded-lg flex items-center justify-between'>
                <div>
                  <h2 className='text-sm'>Total Spend</h2>
                  <h2 className='font-bold text-2xl'>₹{totalSpend}</h2>
                </div>
                <ReceiptText className='bg-primary p-3 h-12 w-12 rounded-full text-white' />
              </div>
              <div className='p-7 border rounded-lg flex items-center justify-between'>
                <div>
                  <h2 className='text-sm'>No. of Budget</h2>
                  <h2 className='font-bold text-2xl'>{budgetList?.length}</h2>
                </div>
                <Wallet className='bg-primary p-3 h-12 w-12 rounded-full text-white' />
              </div>
            </div>
          ) : (
            [1, 2, 3].map((el: number) => (
              <Skeleton key={el} />
            ))
          )
      }
    </>

  )
}

export default CardInfo