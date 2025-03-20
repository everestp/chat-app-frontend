import React, { useEffect, useRef, useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import useChatContext from "../context/ChatContext";
import { useNavigate } from "react-router";
import SockJS from "sockjs-client";
import { BASE_URL } from "../config/AxiosHelper";
import { Stomp } from "@stomp/stompjs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const chatBoxRef = useRef(null);
    const [stompClient, setStompClient] = useState(null);

    const { roomId, currentUser, connected, setConnected } = useChatContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!connected) {
            navigate("/");
        }
    }, [connected, roomId, currentUser]);

    useEffect(() => {
        const connectWebSocket = () => {
            const sock = new SockJS(`${BASE_URL}/chat`);
            const client = Stomp.over(sock);

            client.connect({}, () => {
                setStompClient(client);
                toast.success("Connected to WebSocket!");

                client.subscribe(`/topic/room/${roomId}`, (message) => {
                    console.log("Received message:", message);
                    const newMessage = JSON.parse(message.body);
                    setMessages((prev) => [...prev, newMessage]);
                });
            });

            setStompClient(client);
        };

        connectWebSocket();

        return () => {
            if (stompClient) {
                stompClient.disconnect();
                console.log("WebSocket Disconnected");
            }
        };
    }, [roomId]);

    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [messages]);

    const sendMessage = async () => {
        if (stompClient && connected && input.trim()) {
            console.log("Sending message:", input);
            
            const message = {
                sender: currentUser,
                content: input,
                roomId: roomId
            };

            // Send message to WebSocket server
            stompClient.send(`/app/chat/${roomId}`, {}, JSON.stringify(message));

            // Add message instantly to state (optimistic UI update)
            setMessages((prevMessages) => [...prevMessages, message]);

            // Clear input field
            setInput("");
        }
    };

    return (
        <div>
            {/* Header */}
            <header className="w-full border py-5 flex justify-around items-center dark:bg-gray-900 rounded-md">
                <h1 className="text-xl font-semibold">Room: <span>{roomId}</span></h1>
                <h1 className="text-xl font-semibold">User: <span>{currentUser}</span></h1>
                <button className="dark:bg-red-500 dark:hover:bg-red-700 px-3 py-3 rounded-full" onClick={() => navigate("/")}>
                    Leave Room
                </button>
            </header>

            {/* Chat Messages */}
            <main ref={chatBoxRef} className="py-20 dark:bg-slate-600 mx-auto h-screen overflow-auto">
                <div>
                    {messages.map((message, index) => (
                        <div key={index} className={`flex ${message.sender === currentUser ? "justify-end" : "justify-start"} px-5`}>
                            <div className={`my-2 ${message.sender === currentUser ? "bg-blue-600" : "bg-gray-500"} p-2 max-w-md rounded`}>
                                <div className="flex flex-row gap-2">
                                    <img className="h-10 w-10" src="https://avatar.iran.liara.run/public" alt="avatar" />
                                    <div>
                                        <p className="font-bold">{message.sender}</p>
                                        <p>{message.content}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Input Box */}
            <div className="fixed bottom-10 w-full h-16 mt-4">
                <div className="h-full w-2/3 mx-auto dark:bg-gray-900 flex justify-between px-10 gap-3">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        type="text"
                        placeholder="Type your message..."
                        className="dark:bg-gray-900 h-full w-full"
                    />
                    <div className="flex justify-center items-center gap-3">
                        <button className="dark:bg-green-600 px-3 py-3 rounded-full">
                            <AttachFileIcon />
                        </button>
                        <button onClick={sendMessage} className="dark:bg-blue-600 px-3 py-3 rounded-full">
                            <SendIcon />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
const handleKeyDown = (event) => {
    if (event.key === "Enter") {
     sendMessage() 
    }
  };



  
  <div className="h-96">
  <main ref={chatBoxRef} className="py-20 dark:bg-slate-600 mx-auto h-[770px] overflow-auto pb-24">
<div>
{messages.map((message, index) => (
    <div key={index} className={`flex px-5 ${message.sender === currentUser  ? "justify-end" : "justify-start"}`}>
    <div className={`my-2 p-3 max-w-md rounded-lg shadow-md flex gap-3 
                    ${message.sender === currentUser  ? "bg-blue-600 text-white" : "bg-gray-500 text-white"}`}>
      
    
        <img
          className="h-10 w-10 rounded-full border border-gray-300"
          src="https://avatar.iran.liara.run/public"
          alt="avatar"
        />
      

      <div className="flex flex-col">
        <p className="font-semibold">{message.sender}</p>
        <p className="text-sm">{message.content}</p>
        <p className="text-xs text-gray-300 mt-1">
          {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
        </p>
      </div>
    </div>
  </div>
))}
</div>
</main>
  </div>
