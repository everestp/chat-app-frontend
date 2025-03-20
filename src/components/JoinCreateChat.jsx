import React, { useState } from 'react'
import { Button, colors, TextField } from '@mui/material'

import toast from 'react-hot-toast'
import { createRoomApi, joinChatApi } from "../services/RoomService";
import useChatContext from '../context/ChatContext'
import { useNavigate } from 'react-router'

const JoinCreateChat = () => {
  const [detail, setDetail] = useState({
    roomId: "",
    userName: "",
  });

  const { roomId, userName, setRoomId, setCurrentUser, setConnected } =
    useChatContext();
  const navigate = useNavigate();

  function handleFormInputChange(event) {
    setDetail({
      ...detail,
      [event.target.name]: event.target.value,
    });
  }

  function validateForm() {
    if (detail.roomId === "" || detail.userName === "") {
      toast.error("Invalid Input !!");
      return false;
    }
    return true;
  }

  async function joinChat() {
    if (validateForm()) {
      //join chat

      try {
        const room = await joinChatApi(detail.roomId);
        toast.success("joined..");
        setCurrentUser(detail.userName);
        setRoomId(room.roomId);
        setConnected(true);
        navigate("/chat");
      } catch (error) {
        if (error.status == 400) {
          toast.error(error.response.data);
        } else {
          toast.error("Error in joining room");
        }
        console.log(error);
      }
    }
  }

  async function createRoom() {
    if (validateForm()) {
      //create room
      console.log(detail);
      // call api to create room on backend
      try {
        const response = await createRoomApi(detail.roomId);
        console.log(response);
        toast.success("Room Created Successfully !!");
        //join the room
        setCurrentUser(detail.userName);
        setRoomId(response.roomId);
        setConnected(true);

        navigate("/chat");

        //forward to chat page...
      } catch (error) {
        console.log(error);
        if (error.status == 400) {
          toast.error("Room  already exists !!");
        } else {
          toast("Error in creating room");
        }
      }
    }
  }










  return (
    <>
    <div className=' min-h-screen  flex justify-center items-center '>
    <div className="p-8 w-full flex flex-col gap-8 max-w-md dark:bg-gray-900 shadow">
<h1 className='text-2xl font-bold text-center '>Join Room/Create Room...</h1>
<div>

<label htmlFor="" className='block font-medium'>Your name</label>
<TextField
onChange={handleFormInputChange}
value={detail.name}
placeholder='Enter the name'
id='name'
name='userName'
className='dark:bg-gray-600 px-4 py-2 border dark:border-gray-900 rounded focus:outline-none'
fullWidth
  // label="Name"
/>
</div>

{/* room id */}
<div>

<label htmlFor="" className='block font-medium'>Room ID</label>
<TextField
value={detail.roomId}
placeholder='Enter the RoomId'
id='roomId'
name='roomId'
onChange={handleFormInputChange}
className='dark:bg-gray-600 px-4 py-2 border dark:border-gray-300 rounded focus:outline-none'
fullWidth
  label="Room ID"
/>
</div>
<div className='flex  justify-between'>
  <Button onClick={joinChat} variant='contained'>Join</Button>
  <Button onClick={createRoom} color="success" variant='contained'>Create</Button>
</div>

    </div>
    </div>
   
    
    
    
    </>
  )
}

export default JoinCreateChat