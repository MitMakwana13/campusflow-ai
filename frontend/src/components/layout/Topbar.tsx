"use client";

import { Search, Bell, Zap, UserCircle2 } from "lucide-react";
import { useCommandPalette } from "@/hooks/useCommandPalette";

export function Topbar() {
  const { open } = useCommandPalette();

  return (
    <header className="h-16 border-b border-white/10 bg-neutral-950/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-8">
      {/* Search */}
      <div className="flex-1 max-w-md relative">
        <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
        <button 
          onClick={open}
          className="w-full bg-neutral-900 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-neutral-400 flex items-center justify-between hover:border-white/20 transition-all text-left"
        >
          <span>Search or run command...</span>
          <kbd className="px-1.5 py-0.5 text-[10px] bg-neutral-800 rounded border border-white/10 text-neutral-400 font-mono">⌘K</kbd>
        </button>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-neutral-400 hover:text-neutral-100 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-danger-500 border-2 border-neutral-950"></span>
        </button>
        
        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>FastAPI Live</span>
        </div>

        <button className="flex items-center gap-2 px-3 py-1.5 bg-primary-900/30 text-primary-300 border border-primary-500/30 rounded-full text-sm font-medium hover:bg-primary-900/50 hover:border-primary-500/50 transition-all">
          <Zap className="w-4 h-4 text-primary-400" />
          <span>2 Actions</span>
        </button>
        
        <div className="w-px h-6 bg-white/10 mx-2"></div>
        
        <button className="flex items-center gap-2 text-left group">
          <UserCircle2 className="w-8 h-8 text-neutral-400 group-hover:text-neutral-100 transition-colors" />
          <div className="hidden sm:block">
            <div className="text-sm font-medium text-neutral-100">Dr. Sharma</div>
            <div className="text-xs text-neutral-500">Registrar</div>
          </div>
        </button>
      </div>
    </header>
  );
}
