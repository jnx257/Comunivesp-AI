"use client";

import Image from "next/image";
import { Message } from "../hooks/useChat";

// Stable alternative images from public CDNs/Univesp
const imgAssistant = "https://cdn-icons-png.flaticon.com/512/8943/8943377.png"; // AI Bot Icon
const imgIconCalc = "https://cdn-icons-png.flaticon.com/512/2344/2344132.png"; // Calculator Icon
const imgIconCalendar = "https://cdn-icons-png.flaticon.com/512/2693/2693507.png"; // Calendar Icon
const imgIconABNT = "https://cdn-icons-png.flaticon.com/512/2991/2991108.png"; // Document Icon

interface ChatCanvasProps {
  messages: Message[];
  isTyping: boolean;
  onSendMessage: (content: string) => void;
}

export default function ChatCanvas({ messages, isTyping, onSendMessage }: ChatCanvasProps) {
  return (
    <div className="flex-1 overflow-y-auto pt-24 lg:pt-36 pb-48 lg:pb-64 px-4 lg:px-10 relative scroll-smooth h-full">
      {/* Background Mesh Effect */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-red-50/30 to-transparent -z-10 pointer-events-none"></div>
      
      <div className="max-w-[850px] mx-auto flex flex-col gap-8 lg:gap-12">
        {/* Welcome Header (Only show if few messages) */}
        {messages.length <= 2 && (
          <section className="flex flex-col gap-4 lg:gap-6 animate-in">
            <div className="flex flex-col gap-2">
              <h3 className="font-sans font-extrabold text-[32px] lg:text-[56px] text-slate-900 tracking-tight leading-[1.1]">
                Olá, <span className="text-[#bb0013]">Estudante</span>.
              </h3>
              <h4 className="font-sans font-bold text-xl lg:text-3xl text-slate-400">
                Como posso facilitar sua jornada hoje?
              </h4>
            </div>
            <p className="max-w-[600px] font-sans font-medium text-base lg:text-lg text-slate-500 leading-relaxed">
              Estou aqui para tirar suas dúvidas sobre o Manual do Aluno, calendários, provas e muito mais.
            </p>
          </section>
        )}

        {/* Message Exchange */}
        <section 
          className="flex flex-col gap-8 lg:gap-10" 
          aria-label="Histórico de mensagens"
          role="log"
          aria-live="polite"
          aria-relevant="additions text"
          aria-atomic="false"
        >
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "gap-3 lg:gap-6"} animate-in`}>
              {msg.role === "ai" && (
                <div className="shrink-0">
                  <div className="bg-[#bb0013] flex items-center justify-center rounded-2xl size-10 lg:size-12 shadow-lg shadow-red-900/10 border-2 border-white">
                    <Image src={imgAssistant} alt="IA" width={24} height={24} className="animate-float brightness-0 invert" />
                  </div>
                </div>
              )}
              
              <div className={`flex flex-col gap-2 ${msg.role === "user" ? "items-end max-w-[90%] lg:max-w-[80%]" : "max-w-[90%] lg:max-w-[85%] flex-1"}`}>
                <div className={`${
                  msg.role === "user" 
                    ? "bg-[#0f172a] text-white rounded-[20px] lg:rounded-[24px] rounded-tr-none shadow-xl shadow-slate-200" 
                    : "bg-white/80 backdrop-blur-sm border border-slate-200 rounded-[24px] lg:rounded-[32px] rounded-tl-none shadow-sm"
                } p-5 lg:p-8`}>
                  <p className={`font-sans font-medium text-[15px] lg:text-[16px] leading-relaxed whitespace-pre-wrap ${msg.role === "user" ? "text-white" : "text-slate-800"}`}>
                    {msg.content}
                  </p>
                  
                  {msg.role === "ai" && (
                    <div className="pt-4 lg:pt-6 mt-4 lg:mt-6 border-t border-slate-100 flex items-center justify-end">
                      <span className="text-[10px] lg:text-[11px] font-bold text-slate-300 italic">Univesp AI Assistant</span>
                    </div>
                  )}
                </div>
                <p className={`px-2 font-sans font-bold text-[9px] lg:text-[10px] text-slate-400 tracking-widest uppercase ${msg.role === "user" ? "text-right" : ""}`}>
                  <span className="sr-only">
                    {msg.role === "user" ? "Você enviou:" : "O assistente respondeu:"}
                  </span>
                  {msg.role === "user" ? "Enviado" : "Assistente"} • {msg.timestamp}
                </p>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3 lg:gap-6 animate-pulse" aria-live="polite" aria-label="Assistente está digitando">
              <div className="shrink-0">
                <div className="bg-slate-200 rounded-2xl size-10 lg:size-12 border-2 border-white"></div>
              </div>
              <div className="bg-slate-100 border border-slate-200 p-4 lg:p-6 rounded-[24px] lg:rounded-[32px] rounded-tl-none w-20 lg:w-24 flex gap-1 justify-center items-center">
                <span className="size-1 bg-slate-400 rounded-full animate-bounce"></span>
                <span className="size-1 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="size-1 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          )}
        </section>

        {/* Bento Suggestion Grid (Only show if few messages) */}
        {messages.length <= 2 && (
          <section className="pt-4 lg:pt-8">
            <div className="flex items-center gap-4 mb-6">
              <h5 className="font-sans font-bold text-slate-400 text-[10px] lg:text-[11px] tracking-[2px] lg:tracking-[3px] uppercase">
                Sugestões para você
              </h5>
              <div className="h-px bg-slate-200 flex-1"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
              {[
                { icon: imgIconCalc, title: "Cálculo de Notas", desc: "Entenda como funciona o cálculo de notas e médias.", query: "Como funciona o cálculo da G2?" },
                { icon: imgIconCalendar, title: "Calendário 2026", desc: "Confira datas de provas, feriados e atividades.", query: "Quais as datas das provas?" },
                { icon: imgIconABNT, title: "Formatos ABNT", desc: "Guia rápido para formatação de trabalhos acadêmicos.", query: "Quais as normas ABNT?" }
              ].map((item) => (
                <button 
                  key={item.title} 
                  onClick={() => onSendMessage(item.query)}
                  className="bg-white border border-slate-200 p-5 lg:p-6 rounded-2xl flex flex-col gap-3 text-left hover:border-[#bb0013] hover:shadow-xl hover:shadow-red-900/5 hover:-translate-y-1 transition-all duration-300 group"
                  aria-label={`Sugestão: ${item.title}`}
                >
                  <div className="bg-slate-50 p-2 rounded-xl w-fit group-hover:bg-red-50 transition-colors">
                    <Image src={item.icon} alt="" width={20} height={20} className="group-hover:scale-110 transition-transform opacity-60 group-hover:opacity-100" />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-sm text-slate-900">{item.title}</h4>
                    <p className="font-sans font-medium text-[12px] text-slate-500 leading-relaxed mt-1">{item.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
