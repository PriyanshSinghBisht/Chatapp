import { useSocket } from '../utils/providers/SocketProvider';
import { useChat } from '../utils/providers/ChatProvider';
import {useNavigate} from 'react-router-dom';
import { useMemo, useEffect } from 'react';

const Home = ()=>{
   const { activeUsers, user, disconnect } = useSocket();
   const [ state ] = useChat();
   const navigate = useNavigate();
 
 const isUserActive = (user)=>
      (activeUsers.includes(user));
   
   useEffect(()=>{
     console.log("active:",activeUsers)
   },[activeUsers]);
   return(
       <div className="w-full"> 
           <div className="w-full bg-slate-900 text-white px-3 py-1 flex">
           <div className="flex flex-col flex-1">
           <h1 className="text-2xl font-semibold">Acitve Users</h1>
           <p className="text-slate-400">You: {user}</p>
            </div>
            <button className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg" 
            onClick={()=> disconnect()}
            >Disconnect</button>
            </div>
            {state?.length<2 ?
            <div className="flexCenter flex-col mt-20">
            
              <img src="/Alone-rafiki.png" alt="alone" 
              className="w-[300px] mx-auto"
              />
              <p className="text-[20px] text-slate-400 text-center px-4">No user to chat with! please come again later</p>
            </div>  :
            state.map((User,index)=>{
              if (user !== User.name) 
                   return (
                     <ul key={index}>
              
               <div className="flex">
                
                     <div className="w-full text-[18px] font-semibold px-4 py-2 hover:bg-slate-100 flex items-center"
                    onClick={()=> navigate(`/user/${User.name}`)}>
               <div
               className={`aspect-[1/1] bg-amber-100 h-14 text-[40px] rounded-full  flexCenter ${isUserActive(User.name) ? "live": ""} mr-3`}
                    >{User.name[0]}</div>
                     {User.name}</div>
                </div>
                     <div className="h-1 w-full bg-slate-300 px-2"/>
                 </ul>
                  )})
            }
        </div>
     )
}

export default Home