import {io} from 'socket.io-client';
import {  createContext, useContext,useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {useChat} from './ChatProvider';

const socketContext = createContext();
const SocketProvider = ({children})=>{
  const [state, dispatch ] = useChat();
  const [ socket, setSocket] = useState(null);
  const [error , setError ] = useState(null);
  const [ connected, setConnected ] = useState(false);
  const [user, setUser] = useState('');
  const [ activeUsers, setActiveUsers] = useState([]);
  
  const navigate = useNavigate();
  
  const connect = async(name)=>{
     try{
     const socketRef = await io("http://localhost:3000",{
          reconnectionDelayMax: 10000,
          auth: {
              user: name
            },
       });
      setSocket( () =>socketRef)
      setUser(name);
     }catch(error){
        console.log("socketConnection error")
     }
    };

 const sendMessage =(payload)=>{
     socket?.emit("send_message", payload);
 }
  const disconnect = ()=>{
     socket?.disconnect();
     setSocket(null);
     setConnected(false);
     navigate("/");
  }
  
 useEffect(() => {
    const handleConnect = () => {
      setConnected(true);
      console.log("connected")
    }
    const handleDisconnect = () => {
      setConnected(false);
      setSocket(null);
      setUser('');
      console.log("disconnected")
    };
    
    const handleActive = (users)=>{
         setActiveUsers(users);
    }
    
    const handleInitUsers  = (users)=>{
         dispatch({ type: "initUsers", users});
    }
    const handleNewUserAdded = (userName)=>{
      console.log("new user")
       dispatch({ type: "addUser", userName});
       setActiveUsers(users=> [...users, userName])
    }
    socket?.on('connect_error', (err) => {
      console.log(err);
      if (err.message === 'socket auth error') {
        setError(err);
      }
      setConnected(false);
      setSocket(() => null);
    });
    
    const handleRecieve = (payload)=>{
        console.log("recieve", payload);
        dispatch({ type: "addMessage", name: payload.from , payload});
    const recievedTone = new Audio();
    recievedTone.src ="/tons/message_recieved.mp3";
    sendTone.play();
    }

    socket?.on('connect', handleConnect);
   socket?.on('initUsers', handleInitUsers);
    socket?.on('activeUsers' , handleActive);
    socket?.on('disconnect', handleDisconnect);
 
    socket?.on("recieve_message", handleRecieve)
    socket?.on("newUserAdded", handleNewUserAdded);
    return () => {
 socket?.off('connect_error', handleConnect);
   socket?.off('connect', handleDisconnect);
  socket?.off('initUsers', handleInitUsers);
    socket?.off('activeUsers' , handleActive);
socket?.off("recieve_message", handleRecieve)
      socket?.disconnect();
    };
  }, [socket]);
  
  useEffect(()=>{
     if(!connected){
        navigate("/");
     }
  }, [connected]);

  return (
    <socketContext.Provider value={{ socket, error, connected, connect , user, activeUsers, disconnect, sendMessage}}>
      {children}
    </socketContext.Provider>
  );
};

export { SocketProvider };

export const useSocket = () => useContext(socketContext);
  