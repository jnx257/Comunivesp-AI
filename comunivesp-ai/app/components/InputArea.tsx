"use client";

import Image from "next/image";
import { useState } from "react";

// Stable alternative icons
const imgSend = "https://cdn-icons-png.flaticon.com/512/3106/3106794.png"; // Send Icon

interface InputAreaProps {
  onSendMessage: (content: string) => void;
}

export default function InputArea({ onSendMessage }: InputAreaProps) {
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-0 left-0 lg:left-[280px] right-0 px-4 lg:px-10 pb-6 lg:pb-10 pt-4 bg-gradient-to-t from-white via-white/95 to-transparent z-40">
      <div className="max-w-[850px] mx-auto flex flex-col gap-4 lg:gap-5">
        
        {/* Quick Action Chips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {[
            { label: "📎 Aproveitamento de estudos", query: "Como faço o aproveitamento de estudos?" },
            { label: "📅 Ver Datas", query: "Quais as datas das provas?" },
            { label: "📝 Guia de ABNT", query: "Quais as normas ABNT da Univesp?" },
            { label: "🎓 Requisitos", query: "Quais os requisitos de formatura?" }
          ].map((chip) => (
            <button 
              key={chip.label} 
              onClick={() => onSendMessage(chip.query)}
              className="whitespace-nowrap px-4 py-2 bg-white border border-slate-200 rounded-full text-[12px] font-bold text-slate-500 hover:border-[#bb0013] hover:text-[#bb0013] hover:bg-red-50 transition-all shadow-sm active:scale-95"
              aria-label={`Sugestão: ${chip.label}`}
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Floating Input Area */}
        <div className="bg-white border border-slate-200 rounded-[28px] p-2 shadow-2xl shadow-slate-200/50 flex items-end group focus-within:border-[#bb0013] transition-all">
          <label htmlFor="chat-input" className="sr-only">Digite sua pergunta</label>
          <textarea 
            id="chat-input"
            className="flex-1 bg-transparent px-4 py-3 lg:py-4 outline-none font-sans font-medium text-[15px] lg:text-[16px] text-slate-800 placeholder:text-slate-400 resize-none max-h-40 min-h-[48px] lg:min-h-[56px]"
            placeholder="Pergunte qualquer coisa sobre a Univesp..."
            rows={1}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = 'auto';
              target.style.height = `${target.scrollHeight}px`;
            }}
          />

          <div className="p-1">
            <button 
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className={`p-3 lg:p-4 rounded-[22px] shadow-lg transition-all flex items-center justify-center ${
                inputValue.trim() 
                  ? "bg-[#bb0013] shadow-red-900/20 hover:bg-[#a00010] hover:scale-105 active:scale-95" 
                  : "bg-slate-200 cursor-not-allowed opacity-50"
              }`}
              aria-label="Enviar mensagem"
            >
              <Image src={imgSend} alt="" width={22} height={22} className="brightness-0 invert" />
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between px-6 text-slate-400 font-sans font-bold text-[9px] lg:text-[10px] tracking-[1px] lg:tracking-[1.5px] uppercase">
          <div className="flex items-center gap-4 lg:gap-6">
            <div className="flex items-center gap-2">
              <span className="size-1 bg-slate-300 rounded-full"></span>
              <p>IA Generativa</p>
            </div>
          </div>
          <p className="opacity-60">Univesp © 2026</p>
        </div>
      </div>
    </div>
  );
}
