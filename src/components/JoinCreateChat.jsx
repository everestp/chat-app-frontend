import React from 'react'
import { Button, colors, TextField } from '@mui/material'
import { orange } from '@mui/material/colors'
const JoinCreateChat = () => {
  return (
    <>
    <div className=' min-h-screen  flex justify-center items-center '>
    <div className="p-8 w-full flex flex-col gap-8 max-w-md dark:bg-gray-900 shadow">
<h1 className='text-2xl font-bold text-center '>Join Room/Create Room...</h1>
<div>

<label htmlFor="" className='block font-medium'>Your name</label>
<TextField
className='dark:bg-gray-600 px-4 py-2 border dark:border-gray-900 rounded focus:outline-none'
fullWidth
  label="Name"
/>
</div>

{/* room id */}
<div>

<label htmlFor="" className='block font-medium'>Room ID</label>
<TextField
className='dark:bg-gray-600 px-4 py-2 border dark:border-gray-300 rounded focus:outline-none'
fullWidth
  label="Room ID"
/>
</div>
<div className='flex  justify-between'>
  <Button variant='contained'>Join</Button>
  <Button color="success" variant='contained'>Create</Button>
</div>

    </div>
    </div>
   
    
    
    
    </>
  )
}

export default JoinCreateChat