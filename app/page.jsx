'use client';
import { useState } from "react";
import Image from 'next/image';
import { assets } from "@/assets/assets";
import Sidebar from "@/components/Sidebar";
import PromptBox from "@/components/PromptBox";

export default function Home() {

  const [expand, setExpand] = useState(false);
  const [messages, setmessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


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
        ) : (<div></div>)
        }

        <PromptBox isLoading={isLoading} setIsLoading={setIsLoading} />

        <p className="text-xs absolute bottom-1 text-gray-500">AI generated response, for reference purpose only.</p>
      </div>
    </div>
   </div>
  );
}
