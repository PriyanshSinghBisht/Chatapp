import { useState , useEffect , useRef} from 'react';
import { useSocket } from '../utils/providers/SocketProvider';
import { useNavigate } from 'react-router-dom';

const Connect = ()=>{
  const {connected, error, socket, connect } = useSocket();
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const myVideo= useRef(null);
  
  const handleSubmit = async(e)=>{
     e.preventDefault();
     setIsLoading(true);
     try{
     await connect(name);
     }catch(err){
       console.log(err)
     }
     setIsLoading(false);
  }
  
  useEffect(()=>{
    console.log(error);
    setIsLoading(false);
  },[error]);
  
  useEffect(()=>{
     if(connected){
        navigate("/home")
     }
  },[connected])
  /*
   # feature of videocall using webRTC
   #currently not developed yet , work on
   #progress
  
  useEffect(()=>{
    navigator.mediaDevices.getUserMedia({video: true, audio: true})
    .then((currentStream)=>{
      myVideo.current.srcObject = currentStream;
    })
  },[])
  */
   return(
  <div className="w-screen h-screen flexCenter flex-col gap-y-10">
    <video ref={myVideo} autoPlay
    className="w-full aspect-video bg-blue-300"
    />
    <form className="w-full bg-slate-100 flex-flex-col px-2 max-w-[500px]"
    onSubmit={handleSubmit}
    >
        <h1 className="text-4xl text-center py-3 font-bold">Connect to Users</h1>
       <div className="py-5 mx-3">  
        <label className="text-[20px]"> Name: </label>
        <input type="text" placeholder="Enter Your Name" className="px-3 py-2 text-slate-500"
        value={name} 
        onChange={e=> setName(e.target.value)}
        />
        </div>
        {error &&
        <div className="text-red-600 p-2">soory! but this name is already token
        please enter another name.</div>
        }
        <button className={`px-3 py-2 rounded-lg  text-white mx-auto my-4 w-full
        ${isLoading? "bg-blue-200":"bg-blue-500 hover:bg-blue-600"}`}
        disabled={isLoading}
        >{isLoading? "loading":"Connect"}</button>
    </form>
</div>
     )
}

export default Connect;