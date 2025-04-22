import React, { useEffect, useRef, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import useChatContext from "../context/ChatContext";
import { useNavigate } from "react-router";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import toast from "react-hot-toast";
import { baseURL } from "../config/AxiosHelper";
import { getMessagess } from "../services/RoomService";
import { timeAgo } from "../config/helper";

const ChatPage = () => {
  const {
    roomId,
    currentUser,
    connected,
    setConnected,
    setRoomId,
    setCurrentUser,
  } = useChatContext();

  const navigate = useNavigate();
  useEffect(() => {
    if (!connected) {
      navigate("/");
    }
  }, [connected, roomId, currentUser]);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const chatBoxRef = useRef(null);
  const [stompClient, setStompClient] = useState(null);

  // Load messages
  useEffect(() => {
    async function loadMessages() {
      try {
        const messages = await getMessagess(roomId);
        setMessages(messages);
      } catch (error) {
        console.error("Failed to load messages:", error);
      }
    }
    if (connected) {
      loadMessages();
    }
  }, []);

  // Scroll to latest message
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scroll({
        top: chatBoxRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  // Connect WebSocket and subscribe
  useEffect(() => {
    const connectWebSocket = () => {
      const sock = new SockJS(`${baseURL}/chat`);
      const client = Stomp.over(sock);

      client.connect({}, () => {
        setStompClient(client);
        toast.success("Connected");
        client.subscribe(`/topic/room/${roomId}`, (message) => {
          const newMessage = JSON.parse(message.body);
          setMessages((prev) => [...prev, newMessage]);
        });
      });
    };

    if (connected) {
      connectWebSocket();
    }
  }, [roomId]);

  // Send message handler
  const sendMessage = async () => {
    if (stompClient && connected && input.trim()) {
      const message = {
        sender: currentUser,
        content: input,
        roomId: roomId,
      };

      stompClient.send(
        `/app/sendMessage/${roomId}`,
        {},
        JSON.stringify(message)
      );
      setInput("");
    }
  };

  // Logout handler
  const handleLogout = () => {
    if (stompClient) stompClient.disconnect();
    setConnected(false);
    setRoomId("");
    setCurrentUser("");
    navigate("/");
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="fixed top-0 w-full bg-gray-900 py-4 shadow-lg flex flex-wrap justify-around items-center">
        <div className="text-center mb-2 md:mb-0">
          <h1 className="text-lg md:text-xl font-semibold text-white">
            Room: <span className="font-light">{roomId}</span>
          </h1>
        </div>
        <div className="text-center mb-2 md:mb-0">
          <h1 className="text-lg md:text-xl font-semibold text-white">
            User: <span className="font-light">{currentUser}</span>
          </h1>
        </div>
        <div>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-full"
          >
            Leave Room
          </button>
        </div>
      </header>

      {/* Chat Area */}
      <main
        ref={chatBoxRef}
        className="flex-grow pt-20 px-4 pb-16 overflow-auto bg-gray-800"
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex mb-4 ${
              message.sender === currentUser ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-4 rounded-lg shadow-md flex items-start gap-3 ${
                message.sender === currentUser
                  ? "bg-blue-500 text-white"
                  : "bg-gray-700 text-white"
              }`}
            >
              <img
                className="h-8 w-8 rounded-full border border-gray-300"
                src="https://avatar.iran.liara.run/public"
                alt="avatar"
              />
              <div>
                <p className="font-medium">{message.sender}</p>
                <p className="text-sm">{message.content}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {timeAgo(message.timeStamp)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* Input Section */}
      <div className="fixed bottom-0 w-full bg-gray-900 py-3 px-4">
        <div className="flex items-center gap-3 rounded-lg bg-gray-700 p-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
            type="text"
            placeholder="Type your message..."
            className="flex-grow px-3 py-2 bg-gray-800 text-white rounded-lg focus:outline-none"
          />
          <button
            className="bg-green-600 hover:bg-green-700 p-3 rounded-lg text-white"
          >
            <AttachFileIcon />
          </button>
          <button
            onClick={sendMessage}
            className="bg-blue-600 hover:bg-blue-700 p-3 rounded-lg text-white"
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;