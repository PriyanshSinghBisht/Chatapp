import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from "react-router-dom";
import {Home, User,Connect } from './pages'


function App() {
 return(
   <>
   <Routes>
        <Route path="/" element={<Connect />} />
        <Route path="/Home" element={<Home />} />
         <Route path="/user/:name" element={<User />} />
       </Routes>
   </>
  )
}

export default App
