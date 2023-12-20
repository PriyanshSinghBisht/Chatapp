import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom';
import { SocketProvider } from './utils/providers/SocketProvider';
import { ChatProvider }from './utils/providers/ChatProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
  <BrowserRouter>
   <ChatProvider>
      <SocketProvider>
         <App />
      </SocketProvider>
  </ChatProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
