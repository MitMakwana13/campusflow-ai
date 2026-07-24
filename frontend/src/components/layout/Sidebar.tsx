"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  DoorOpen, 
  BookOpen, 
  CalendarDays, 
  Sparkles, 
  ShieldCheck,
  Zap,
  Code2
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { name: "Executive Core", href: "/", icon: LayoutDashboard },
  { name: "PPO Engine", href: "/timetable", icon: CalendarDays, badge: "v1.0" },
  { name: "AI Copilot", href: "/ai", icon: Sparkles, badge: "v2.0" },
  { name: "Faculty Roster", href: "/faculty", icon: Users },
  { name: "Smart Rooms", href: "/rooms", icon: DoorOpen },
  { name: "Course Directory", href: "/courses", icon: BookOpen },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex w-64 h-screen border-r border-zinc-800/80 bg-[#09090b]/90 backdrop-blur-xl flex-col fixed left-0 top-0 z-30 shadow-2xl">
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-zinc-800/60 shrink-0">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Zap className="w-4 h-4 text-white fill-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold tracking-tight text-white text-base font-sans">CampusFlow</span>
            <span className="text-[10px] font-mono text-zinc-400 tracking-wider">AI OS v2.0</span>
          </div>
        </Link>
        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          GA
        </span>
      </div>
      
      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6 px-3 flex flex-col gap-1.5">
        <div className="text-[11px] font-mono font-semibold text-zinc-500 uppercase tracking-wider mb-2 px-3">
          Platform Controls
        </div>
        
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={cn(
                "group relative flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium",
                isActive 
                  ? "bg-gradient-to-r from-indigo-500/15 via-purple-500/10 to-transparent text-white border border-indigo-500/30 shadow-md shadow-indigo-500/5 font-semibold" 
                  : "text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04]"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className={cn("w-4 h-4 transition-colors", isActive ? "text-indigo-400" : "text-zinc-400 group-hover:text-zinc-200")} />
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span className={cn(
                  "text-[10px] font-mono px-1.5 py-0.5 rounded-md",
                  isActive ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30" : "bg-zinc-800/80 text-zinc-400"
                )}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Footer System Status */}
      <div className="p-4 border-t border-zinc-800/60 shrink-0 space-y-3">
        <Link 
          href="/verification"
          className="block p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-emerald-500/40 transition-all space-y-1.5 group"
        >
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 font-medium text-zinc-300 group-hover:text-emerald-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> System Verification
            </span>
            <span className="font-mono text-[10px] text-emerald-400 font-bold">10/10 PASS</span>
          </div>
          <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full w-full rounded-full"></div>
          </div>
        </Link>

        <a 
          href="https://github.com/MitMakwana13/campusflow-ai"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between px-3 py-2 rounded-xl text-xs text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04] transition-all font-mono"
        >
          <span className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-indigo-400" /> MitMakwana13
          </span>
          <span className="text-[10px] text-zinc-500">v1.0.0</span>
        </a>
      </div>
    </aside>
  );
}
