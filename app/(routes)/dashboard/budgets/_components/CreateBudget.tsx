"use client"

import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import EmojiPicker from 'emoji-picker-react'
import { Input } from '@/components/ui/input'

import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { DialogClose } from '@radix-ui/react-dialog'
import { db } from '@/db/dbConfig'
import { Budgets } from '@/db/schema'
import { useUser } from '@clerk/nextjs'


const CreateBudget = ({refreshData}: any) => {

  
  const [emojiIcon, setEmojiIcon] = useState('🎉');
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  const [name, setName] = useState('');
  const [amount, setAmount] = useState(0);

  const {user} = useUser();

  const onCreateBudget = async () => {
    try{
      const result = await db.insert(Budgets)
      .values({
        name,
        amount,
        createdBy: user?.primaryEmailAddress?.emailAddress || '',
        icon: emojiIcon
      }).returning({ inseredId: Budgets.id });

      if (result) {
        toast.success('New Budget Created!');
        refreshData();
      }
    } catch (error) {
      toast.error('Error creating budget');
    }
    
  }


  return (
    <>
    <Dialog>
        <DialogTrigger asChild>
              <div className='w-full p-10 flex flex-col items-center bg-slate-100 rounded-md border-2 border-dashed cursor-pointer hover:shadow-md'>
                <h2 className='text-3xl'>+</h2>
                <h2>Create New Budget</h2>
              </div>
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
                onClick={() => onCreateBudget()}
                disabled={!(name && amount)}
              >Create Budget</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog> 


        <div className='absolute'>
      <ToastContainer />
          </div>          

      </>
  )
}

export default CreateBudget