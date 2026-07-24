"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  DoorOpen, 
  BookOpen, 
  CalendarDays, 
  BrainCircuit, 
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Faculty", href: "/faculty", icon: Users },
  { name: "Rooms", href: "/rooms", icon: DoorOpen },
  { name: "Courses", href: "/courses", icon: BookOpen },
  { name: "Timetable", href: "/timetable", icon: CalendarDays },
  { name: "AI Center", href: "/ai", icon: BrainCircuit },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex w-64 h-screen border-r border-white/10 bg-[#0b1329]/95 backdrop-blur-md flex-col fixed left-0 top-0 z-30 shadow-2xl">
      <div className="h-16 flex items-center px-6 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-2 text-primary-400 font-bold tracking-widest uppercase">
          <BrainCircuit className="w-6 h-6 text-primary-400 animate-pulse" />
          <span className="bg-gradient-to-r from-primary-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent font-extrabold text-lg">CampusFlow</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-1">
        <div className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-2 px-2">
          Platform Navigation
        </div>
        
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium",
                isActive 
                  ? "bg-gradient-to-r from-primary-600/30 to-indigo-600/20 text-white border border-primary-500/30 shadow-lg shadow-primary-500/10" 
                  : "text-neutral-400 hover:text-neutral-100 hover:bg-white/5"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "text-primary-400" : "text-neutral-400")} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-white/10 shrink-0">
        <Link 
          href="/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-neutral-400 hover:text-neutral-100 hover:bg-white/5 transition-all text-sm font-medium"
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </Link>
      </div>
    </aside>
  );
}
