import React, { useRef, useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const Chatpage = () => {
    const [message,setMessage] = useState([
        {
            content :"hello",
            sender :"Preeti"
        },
        {
            content :"hello",
            sender :"Hari"
        }
        ,
        {
            content :"Hi",
            sender :"Kirti"
        }
        ,
        {
            content :"Hello ",
            sender :"Everest"
        }
        ,
        {
            content :"Please do Programming",
            sender :"Java"
        }
    ]);
    const [input,setInput] = useState("");
    const inputRef = useRef(null)
    const chatBoxRef = useRef(null)
    const [stompClient ,setStompClient] = useState(null)
    const [roomId,setRoomId]= useState("");
    const [currentUser,setCurrentUser] = useState("Everest")
  return (
    <div className="">
      Chatpage

     {/* this is the header */}
     <header className=" w-full bordor py-5 flex justify-around items-center  dark:bg-gray-900 rounded-md">
        {/* room name container */}
        <div>
            <h1 className="text-xl font-semibold  ">Room : <span>Everest Room</span></h1>
        </div>
        {/* username conrtainer  */}
        <div>
        <h1 className="text-xl font-semibold  ">User: <span>Everest</span></h1>
        </div>

        {/* button leave room */}
        <div>
            <button className="dark:bg-red-500  dark:hover:bg-red-700 px-3 py-3 rounded-full">Leave room</button>
        </div>
      </header>
  <main className="py-20 dark:bg-slate-600 mx-auto h-screen overflow-auto">
<div >
{message.map((message,index)=>(
  <div key={index} className={` flex ${message.sender === currentUser ? "justify-end" : "justify-start"} px-5`}>
<div  className={`my-2 ${message.sender ==currentUser? "bg-blue-600" :"bg-gray-500"} p-2 max-w-xs rounded`} >
   <div className="flex flex-row gap-2">
    <img className="h-10 w-10" src="https://avatar.iran.liara.run/public" />
   <div className="bordor">
        <p>{message.sender}</p>
        <p>{message.content}</p>
        </div>
   </div>


    </div>
    </div>
    
))}
</div>

  </main>


 




      {/* input message container */}
      <div className=" fixed bottom-10 w-full h-16 mt-4" >
<div className="h-full w-2/3 mx-auto dark:bg-gray-900 flex justify-between px-10 gap-3">
<input type="text" placeholder="Type your Message" className=" dark:bg-gray-900 h-full w-full"  />
<div className="flex justify-center items-center gap-3">
{/* <h1 className="text-blue-400 font-semibold">Send</h1> */}
<button className="dark:bg-green-600 px-3 py-3  rounded-full"><AttachFileIcon /></button>
<button className="dark:bg-blue-600 px-3 py-3  rounded-full"><SendIcon/></button>

</div>

</div>
      </div>
    </div>
  );
};

export default Chatpage;
