import { Button } from '@/components/ui/button'
import { PenBox } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import EmojiPicker from 'emoji-picker-react'
import { Budgets } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { db } from '@/db/dbConfig'
import { toast } from 'react-toastify'

const EditBudget = ({budgetInfo, refreshData}: any) => {

  const [emojiIcon, setEmojiIcon] = useState(budgetInfo?.icon);
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  const [name, setName] = useState(budgetInfo?.name);
  const [amount, setAmount] = useState(budgetInfo?.amount);

  useEffect(() => {
    if(budgetInfo){
      setName(budgetInfo?.name);
      setAmount(budgetInfo?.amount);
      setEmojiIcon(budgetInfo?.icon);
    }
  }, [budgetInfo]);

  const onUpdateBudget = async () => {
    const result = await db.update(Budgets).set({
      name: name,
      amount: amount,
      icon: emojiIcon
    }).where(eq(Budgets.id, budgetInfo.id))
    .returning();

    if(result){
      refreshData();
      toast.success('Budget Updated Successfully');
    }
  }

  return (
    <div>
      

      <Dialog>
        <DialogTrigger asChild>
              <Button className='flex gap-2'> <PenBox/> Edit</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Budget</DialogTitle>
            <DialogDescription>
              <Button variant='outline' size='lg' onClick={() => setOpenEmojiPicker(!openEmojiPicker)}>{emojiIcon}</Button>
              <div className='absolute z-10'>
                <EmojiPicker open={openEmojiPicker}
                  onEmojiClick={(e) => {
                    setEmojiIcon(e.emoji)
                    setOpenEmojiPicker(false)
                  }}
                />
              </div>
              <div className='mt-2'>
                <h2 className='text-black font-medium my-1'>Budget Name</h2>
                <Input placeholder='e.g. Gym Equipments' value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className='mt-2'>
                <h2 className='text-black font-medium my-1'>Budget Amount</h2>
                <Input type='number' placeholder='e.g. ₹250000' min={1} max={Number.MAX_VALUE} value={amount} onChange={(e) => setAmount(parseInt(e.target.value))} />
              </div>

            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button className='mt-5 w-full'
                onClick={() => onUpdateBudget()}
                disabled={!(name && amount)}
              >Update Budget</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog> 
    </div>
  )
}

export default EditBudget