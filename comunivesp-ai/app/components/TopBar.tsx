"use client";

interface TopBarProps {
  onMenuClick: () => void;
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  return (
    <header className="fixed top-0 left-0 lg:left-[280px] right-0 h-20 bg-white/60 backdrop-blur-xl border-b border-slate-200/50 flex items-center justify-between px-6 lg:px-10 z-20">
      <div className="flex items-center gap-4 lg:gap-10">
        {/* Mobile Menu Toggle */}
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          aria-label="Abrir menu"
        >
          <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="flex items-center gap-2">
          <div className="size-2 bg-[#bb0013] rounded-full animate-pulse"></div>
          <h2 className="font-sans font-extrabold text-lg lg:text-xl text-slate-900 tracking-tight">
            Assistente Virtual
          </h2>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-slate-400 font-sans font-bold text-[10px] tracking-wider uppercase">
          <span className="hidden sm:inline">Online</span>
          <span className="size-2 bg-green-500 rounded-full"></span>
        </div>
      </div>
    </header>
  );
}
