"use client";
import { createContext, useContext, useState } from "react";
import { useUser, useAuth } from "@clerk/nextjs";
import { NextResponse } from 'next/server';
import axios from "axios";
import { toast } from "react-hot-toast"; 



export const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppContextProvider = ({ children }) => {
  const { user } = useUser();
  const {getToken} = useAuth()

const [chats, setChats] = useState([]);
const [selecetedChat, setSelecetedChat] = useState(null);


const createNewChat = async ()=>{
  try {
    if(!user) return null;

    const token = await getToken();

    await axios.post('/api/chat/create',{},{headers:{
      Authorization :`Bearer ${token}`
    }})
     fetchUserChats();
  } catch (error) {
    toast.error(error.message)
  }
}

const fetchUserChats = async ()=>{
  try {
      const token = await getToken();

     const {data} = await axios.get('/api/chat/get',{headers:{
      Authorization :`Bearer ${token}`
    }})
    if(data.success){
      console.log(data.data);
      setChats(data.data)

      if(data.data.length ===0){
        await createNewChat();
        return fetchUserChat();
      }else{
        data.data.sort((a,b)=> new Date(b.updatedAt) - new Date(a.updatedAt))
      }
    }else{
      toast.error(data.message)
    }
  } catch (error) {
    toast.error(error.message)
  }
}
ussEffect(()=>{
   if(user){
    fetchUserChats(;)
   }
},[user]) 
 
const value = {
    user,
  chats,
  selectedChat,
  setSelectedChat,
  createNewChat,
  fetchUserChats,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
