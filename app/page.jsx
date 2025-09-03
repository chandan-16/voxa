'use client';
import { useEffect, useRef, useState } from "react";
import Image from 'next/image';
import { assets } from "@/assets/assets";
import Sidebar from "@/components/Sidebar";
import PromptBox from "@/components/PromptBox";
import Message from './../components/Message';
import { useAppContext } from "@/context/AppContext";

export default function Home() {

  const [expand, setExpand] = useState(false);
  const [messages, setmessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {selectedChats} = useAppContext();

  const containerRef = useRef(null);

  useEffect(() => {
    if(selectedChats){
      setmessages(selectedChats.messages)
    }
  },[selectedChats])

  useEffect(() =>{
    if(containerRef.current){
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behaviour: "smooth",
      })
    }
  },[messages])

  return (
   <div>
    <div className="flex h-screen ">
      <Sidebar expand={expand} setExpand={setExpand} />

      <div className="flex flex-1 flex-col items-center justify-center px-4 pb-8 bg-[#292a2d] text-white relative">
        <div className="md:hidden absolute px-4 top-6 flex items-center justify-between w-full ">
          <Image onClick={() => setExpand(!expand)} src={assets.menu_icon} alt="menu" className='rotate-180'/>
          <Image src={assets.chat_icon} alt="chat" className='opacity-70' />
        </div>

        {
          messages.length === 0 ? (
          <>
          <div className="flex items-center gap-3">
            <Image src={assets.logo_icon} alt='' className="h-16" />
            <p className="text-2xl font-medium">Hi, I'm Voxa-AI.</p>
          </div>
          <p className="text-sm mt-2">How can I help you today?</p>
          </>
        ) : (
          <div ref={containerRef} className="relative flex flex-col items-center justify-start w-full mt-20 max-h-screen overflow-y-auto">
            <p className="fixed top-8 border border-transparent hover:border-gray-500/50 py-1 px-2 rounded-lg font-semibold mb-6">{selectedChats.name}</p>
            {
              messages.map((msg, index) =>(
                <Message key={index} role={msg.role} content={msg.content} />
              ))
            }

            {
              isLoading && (
                <div className="flex gap-4 max-w-3xl w-full py-3">
                  <Image src={assets.logo_icon} alt='logo' className="h-9 w-9 p-1 border border-white/15 rounded-full" />

                  <div className="loader flex justify-center items-center gap-1">
                    <div className="w-1 h-1 rounded-full bg-white animate-bounce"></div>
                    <div className="w-1 h-1 rounded-full bg-white animate-bounce"></div>
                    <div className="w-1 h-1 rounded-full bg-white animate-bounce"></div>
                  </div>
                </div>
              )
            }
          </div>
          )
        }

        <PromptBox isLoading={isLoading} setIsLoading={setIsLoading} />

        <p className="text-xs absolute bottom-1 text-gray-500">AI generated response, for reference purpose only.</p>
      </div>
    </div>
   </div>
  );
}
