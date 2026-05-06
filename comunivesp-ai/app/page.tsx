"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import ChatCanvas from "./components/ChatCanvas";
import InputArea from "./components/InputArea";
import { useChat } from "./hooks/useChat";

export default function Home() {
  const { messages, sendMessage, isTyping } = useChat();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#fdfdfd] text-slate-900 selection:bg-red-100 selection:text-[#bb0013] overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main className="flex-1 flex flex-col min-w-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-red-50/20 via-transparent to-transparent relative">
        <TopBar onMenuClick={() => setIsSidebarOpen(true)} />
        <ChatCanvas messages={messages} isTyping={isTyping} onSendMessage={sendMessage} />
        <InputArea onSendMessage={sendMessage} />
      </main>
    </div>
  );
}
