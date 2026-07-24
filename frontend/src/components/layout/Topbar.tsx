"use client";

import { Search, Sparkles, Database, Terminal } from "lucide-react";
import { useCommandPalette } from "@/hooks/useCommandPalette";

export function Topbar() {
  const { open } = useCommandPalette();

  return (
    <header className="h-16 border-b border-zinc-800/60 bg-[#09090b]/80 backdrop-blur-xl sticky top-0 z-20 flex items-center justify-between px-4 md:px-8">
      {/* Search / Command Bar */}
      <div className="flex-1 max-w-md relative">
        <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <button 
          onClick={open}
          className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl pl-10 pr-3 py-2 text-xs text-zinc-400 flex items-center justify-between hover:border-zinc-700 hover:bg-zinc-900 transition-all text-left shadow-inner"
        >
          <span className="font-mono text-zinc-400">Search AI intents, rooms, schedules...</span>
          <div className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 text-[10px] bg-zinc-800 rounded-md border border-zinc-700 text-zinc-300 font-mono">⌘K</kbd>
          </div>
        </button>
      </div>

      {/* Right Actions & Status Badges */}
      <div className="flex items-center gap-3">
        {/* Supabase Status */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
          <span>PostgreSQL Active</span>
        </div>

        {/* Render Backend Status */}
        <div className="flex items-center gap-2 px-3 py-1 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 rounded-full text-xs font-mono">
          <Database className="w-3.5 h-3.5 text-indigo-400" />
          <span className="hidden md:inline">FastAPI Render</span>
          <span className="text-[10px] text-emerald-400 font-bold">14ms</span>
        </div>

        {/* Command Trigger Button */}
        <button 
          onClick={open}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-500/20 transition-all"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Ask Copilot</span>
        </button>
      </div>
    </header>
  );
}
