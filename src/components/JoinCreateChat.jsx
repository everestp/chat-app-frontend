import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import toast from "react-hot-toast";
import { createRoomApi, joinChatApi } from "../services/RoomService";
import useChatContext from "../context/ChatContext";
import { useNavigate } from "react-router";

const JoinCreateChat = () => {
  const [detail, setDetail] = useState({
    roomId: "",
    userName: "",
  });

  const { setRoomId, setCurrentUser, setConnected } = useChatContext();
  const navigate = useNavigate();

  function handleFormInputChange(event) {
    setDetail({
      ...detail,
      [event.target.name]: event.target.value,
    });
  }

  function validateForm() {
    if (detail.roomId.trim() === "" || detail.userName.trim() === "") {
      toast.error("Invalid Input! Please fill in all fields.");
      return false;
    }
    return true;
  }

  async function joinChat() {
    if (validateForm()) {
      try {
        const room = await joinChatApi(detail.roomId);
        toast.success("Joined successfully!");
        setCurrentUser(detail.userName);
        setRoomId(room.roomId);
        setConnected(true);
        navigate("/chat");
      } catch (error) {
        if (error.response?.status === 400) {
          toast.error(error.response.data);
        } else {
          toast.error("Error joining the room. Please try again.");
        }
        console.error(error);
      }
    }
  }

  async function createRoom() {
    if (validateForm()) {
      try {
        const response = await createRoomApi(detail.roomId);
        toast.success("Room created successfully!");
        setCurrentUser(detail.userName);
        setRoomId(response.roomId);
        setConnected(true);
        navigate("/chat");
      } catch (error) {
        if (error.response?.status === 400) {
          toast.error("Room already exists!");
        } else {
          toast.error("Error creating the room. Please try again.");
        }
        console.error(error);
      }
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900">
      <div className="p-6 w-full max-w-md flex flex-col gap-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
          Join/Create Room
        </h1>
        {/* Username Input */}
        <div>
          <label htmlFor="userName" className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
            Your Name
          </label>
          <TextField
            onChange={handleFormInputChange}
            value={detail.userName}
            placeholder="Enter your name"
            id="userName"
            name="userName"
            variant="outlined"
            fullWidth
            className="dark:bg-gray-700"
          />
        </div>
        {/* Room ID Input */}
        <div>
          <label htmlFor="roomId" className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
            Room ID
          </label>
          <TextField
            onChange={handleFormInputChange}
            value={detail.roomId}
            placeholder="Enter the Room ID"
            id="roomId"
            name="roomId"
            variant="outlined"
            fullWidth
            className="dark:bg-gray-700"
          />
        </div>
        {/* Buttons */}
        <div className="flex justify-between">
          <Button
            onClick={joinChat}
            variant="contained"
            color="primary"
            className="w-full mr-2"
          >
            Join
          </Button>
          <Button
            onClick={createRoom}
            variant="contained"
            color="success"
            className="w-full ml-2"
          >
            Create
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JoinCreateChat;