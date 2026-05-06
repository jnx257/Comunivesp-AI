"use client";

import Image from "next/image";

// Stable logos and icons
const imgLogo = "https://pt.wikipedia.org/wiki/Ficheiro:Logo_univesp.png"; // Note: This is a page link, let's use a direct raw link if possible or a placeholder
const imgUnivespSymbol = "https://univesp.br/sites/58f6506869226e9479d38201/assets/5d7a99757c1bd17f6b4dfe1c/Normas_Academicas__1_.pdf"; // PDF link isn't helpful.

// Using a more reliable PNG from a generic source for the placeholder if institutional ones are tricky to hotlink
const imgUnivespPlaceholder = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL83x-IkKW7_zZ_o4PWvr3ss5KhJJRuoqZZw&s"; 
const imgPlus = "https://cdn-icons-png.flaticon.com/512/1828/1828817.png"; // Plus icon for "Novo Chat"

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside className={`fixed inset-y-0 left-0 bg-[#0f172a] flex flex-col h-full w-[280px] py-8 shrink-0 z-50 border-r border-white/5 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        {/* Brand Section */}
        <div className="px-6 pb-10 flex items-center justify-between">
          <div className="flex items-center gap-4 group">
            <div className="flex items-center justify-center rounded-xl size-10 shrink-0 shadow-lg shadow-red-900/20 bg-white p-1">
              <Image src={imgUnivespPlaceholder} alt="Univesp Logo" width={34} height={34}/>
            </div>
            <div className="flex flex-col">
              <h1 className="font-sans font-bold text-lg text-white tracking-tight leading-tight">
                Univesp <span className="text-[#ef4444]">AI</span>
              </h1>
              <div className="flex items-center gap-2">
                <span className="size-1.5 bg-green-500 rounded-full animate-pulse"></span>
                <p className="font-sans font-medium text-slate-400 text-[10px] tracking-wider uppercase">
                  Student Assistant
                </p>
              </div>
            </div>
          </div>
          
          {/* Close button for mobile */}
          <button 
            onClick={onClose}
            className="lg:hidden p-2 text-slate-400 hover:text-white"
            aria-label="Fechar menu"
          >
            <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 flex flex-col gap-1.5 px-4 overflow-y-auto">
          <button 
            className="flex items-center gap-3 px-4 py-3 w-full bg-[#bb0013] text-white rounded-xl shadow-md shadow-red-900/20 hover:bg-[#a00010] transition-all duration-200 group cursor-pointer"
            aria-label="Novo Chat"
          >
            <Image src={imgPlus} alt="" width={16} height={16} className="brightness-0 invert group-hover:rotate-90 transition-transform" />
            <span className="font-sans font-semibold text-sm">Novo Chat</span>
          </button>
          
          <div className="h-px bg-white/5 my-4 mx-2"></div>

          <div className="mt-4 px-4 flex flex-col gap-5">
            <h2 className="font-sans font-bold text-slate-500 text-[11px] tracking-[2px] uppercase">
              Consultas Recentes
            </h2>
            <div className="flex flex-col gap-4">
              {["Cálculo de média G1", "Normas ABNT 2026", "Prazos de Rematrícula"].map((item) => (
                <button 
                  key={item} 
                  className="text-left font-sans font-medium text-slate-400 text-xs hover:text-[#ef4444] transition-colors flex items-center gap-2 group cursor-pointer"
                  aria-label={`Abrir consulta: ${item}`}
                >
                  <span className="size-1 bg-slate-600 rounded-full group-hover:bg-[#ef4444] transition-colors"></span>
                  {item}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Footer info */}
        <div className="mt-auto px-6 pt-6 border-t border-white/5">
          <p className="font-sans text-[10px] text-slate-500 uppercase tracking-widest">
            Univesp © 2026
          </p>
        </div>
      </aside>
    </>
  );
}
