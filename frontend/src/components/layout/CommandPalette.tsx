"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCommandPalette } from "@/hooks/useCommandPalette";
import { useKeyboard } from "@/hooks/useKeyboard";
import { 
  Search, 
  LayoutDashboard, 
  CalendarDays, 
  Users, 
  DoorOpen, 
  BookOpen, 
  BrainCircuit, 
  Wand2, 
  X 
} from "lucide-react";
import { ROUTES } from "@/constants/routes";

export function CommandPalette() {
  const { isOpen, close, toggle } = useCommandPalette();
  const [query, setQuery] = useState("");
  const router = useRouter();

  // Register Ctrl+K / Cmd+K listener
  useKeyboard("k", () => toggle(), true);

  if (!isOpen) return null;

  const ACTIONS = [
    { id: '1', title: 'Go to Command Center', category: 'Navigation', icon: LayoutDashboard, href: ROUTES.DASHBOARD },
    { id: '2', title: 'View Timetable Optimization', category: 'Navigation', icon: CalendarDays, href: ROUTES.TIMETABLE },
    { id: '3', title: 'Run Optimization Engine', category: 'Action', icon: Wand2, action: () => router.push(ROUTES.TIMETABLE) },
    { id: '4', title: 'Faculty Directory', category: 'Navigation', icon: Users, href: ROUTES.FACULTY },
    { id: '5', title: 'Room Allocation & Status', category: 'Navigation', icon: DoorOpen, href: ROUTES.ROOMS },
    { id: '6', title: 'Course Catalog', category: 'Navigation', icon: BookOpen, href: ROUTES.COURSES },
    { id: '7', title: 'AI Center & Audit Log', category: 'Navigation', icon: BrainCircuit, href: ROUTES.AI },
  ];

  const filtered = ACTIONS.filter(a => a.title.toLowerCase().includes(query.toLowerCase()));

  const handleSelect = (item: typeof ACTIONS[0]) => {
    close();
    setQuery("");
    if (item.href) {
      router.push(item.href);
    } else if (item.action) {
      item.action();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center pt-24 animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl bg-neutral-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="flex items-center px-4 border-b border-white/10 relative">
          <Search className="w-5 h-5 text-neutral-400 mr-3" />
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search... (e.g. Run Optimization)"
            className="w-full bg-transparent py-4 text-neutral-100 placeholder:text-neutral-500 text-sm focus:outline-none"
            autoFocus
          />
          <button 
            onClick={close} 
            className="p-1 rounded text-neutral-500 hover:text-neutral-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-sm text-neutral-500">
              No matching commands or actions found.
            </div>
          ) : (
            filtered.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelect(item)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left text-sm text-neutral-300 hover:text-neutral-100 hover:bg-primary-900/30 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-4 h-4 text-neutral-400 group-hover:text-primary-400" />
                  <span>{item.title}</span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded bg-neutral-800 text-neutral-500 border border-white/5">
                  {item.category}
                </span>
              </button>
            ))
          )}
        </div>

        {/* Footer Hint */}
        <div className="px-4 py-2 bg-neutral-950 border-t border-white/5 flex items-center justify-between text-[11px] text-neutral-500">
          <span>Use <kbd className="px-1 py-0.5 bg-neutral-800 rounded border border-white/10 text-neutral-400">↑</kbd> <kbd className="px-1 py-0.5 bg-neutral-800 rounded border border-white/10 text-neutral-400">↓</kbd> to navigate</span>
          <span>Press <kbd className="px-1 py-0.5 bg-neutral-800 rounded border border-white/10 text-neutral-400">ESC</kbd> to exit</span>
        </div>
      </div>
    </div>
  );
}
