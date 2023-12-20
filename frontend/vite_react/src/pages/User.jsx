import {Link, useParams } from 'react-router-dom';
import {useState, useEffect} from 'react';
import { ImExit } from "react-icons/im";
import { FaHome } from "react-icons/fa";
import { useSocket } from '../utils/providers/SocketProvider';
import { IoIosSend } from "react-icons/io";
import { useChat } from'../utils/providers/ChatProvider';
import moment from "moment";

const User = ()=>{
  const { name } = useParams();
  const { disconnect,user, sendMessage } = useSocket();
  const [ userInput, setUserInput] = useState("");
  const [state , dispatch]= useChat();
  
  const messages = state.filter((user)=> user?.name===name)[0]?.messages;
  
 console.log(messages)
  const handleSubmit = (e)=>{
    e.preventDefault();
    const payload = {
        from: user,
        To: name,
        message: userInput,
        Time: new Date()
    };
    
    sendMessage(payload);
    dispatch({type:"addMessage", name, payload});
    setUserInput("");
    const sendTone = new Audio();
    sendTone.src ="/tons/message_sent.mp3";
    sendTone.play();
  }
 
 useEffect(()=>{
   console.log("state",state);
 },[messages])
  return(
      <div className="flex flex-col h-[100dvh]">
       <div className="flex items-center justify-between py-2 sticky top-0 bg-white relative">
       <div className="flex gap-7 mx-5">
       <Link to="/home" className="text-purple-600 text-3xl"><FaHome /></Link>
        <div className="self-start flex flex-col">
          <p className="font-bold ">{name}</p>
          <p className="text-sm text-slate-500">Active</p>
          
      </div>
     </div>
         <button className="flex px-3 py-2 bg-red-500 hover:bg-red-600 text-white items-center rounded-lg gap-2 mr-5"
         onClick={()=>disconnect()}> Disconnect <ImExit /></button>
 <div className="w-full h-[1px] bg-slate-400 shadow-[0_5px_10px_black] absolute bottom-0"/>
      </div>
 <div className="h-full bg-slate-400 overflow-y-scroll ">
  {messages &&
    messages.map((message, index)=>(
       <div className={`${
         message.from===name?"bg-[#7c7c7c] text-white text-left rounded-[16px_16px_16px_0]":"text-right bg-[#c7c7c7] text-white ml-auto rounded-[16px_16px_0_16px]"
       }
       w-fit w-[clamp(100px_fit_250px)] py-1 px-2 my-3 mx-2`} key={index}>
        <h1 className="font-semibold break-words max-w-[250px] "> {message.message}</h1>
        <p className="text-sm">{message.from} 
       <span className="ml-2 text-[12px]">{moment(message.Time).fromNow()}</span>
        </p>
       </div>
    ))
  }
 </div>
 
     
      
    <form className="flex sticky bottom-0 focus:outline-2 outline-black shadow-[0_10_40_black] bg-gradient-to-r from-purple-300 to-blue-400 pt-2 pb-4" 
    onSubmit={handleSubmit}>
     <input type="text" placeholder="enter message..." className="w-[clamp(50px_100%_500px)] flex-1 px-3 border-none outline-none text-slate-500 bg-white" value={userInput} 
     onChange={e=> setUserInput(e.target.value)}/>
     <button className="flexCenter gap-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xl">Send <IoIosSend /></button>
     </form>
       </div>
    )
}

export default User;