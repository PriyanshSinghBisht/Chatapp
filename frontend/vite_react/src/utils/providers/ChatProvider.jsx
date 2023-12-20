import {  createContext, useContext,useState,useEffect, useReducer } from "react";
import { reducer, initState } from "../reducer/reducer";

const chatContext = createContext();

export const ChatProvider = ({children}) =>{
 
  return(
     <chatContext.Provider value={useReducer(reducer, initState)}>
        {children}
     </chatContext.Provider>
    )
}

export const useChat = ()=> useContext(chatContext);
