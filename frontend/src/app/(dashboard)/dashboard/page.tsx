"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  BrainCircuit, 
  Sparkles, 
  ArrowRight, 
  Activity, 
  CheckCircle2, 
  DoorOpen,
  Cpu, 
  FileCheck,
  ChevronRight
} from "lucide-react";
import { CampusLiveFeed } from "@/features/dashboard";
import { MOCK_ACTIVITY_FEED } from "@/lib/mock/dashboard";
import { ROUTES } from "@/constants/routes";
import { BuildingDrilldownModal } from "@/components/domain/BuildingDrilldownModal";

export default function AppDashboardPage() {
  const [showDrilldown, setShowDrilldown] = useState(false);

  return (
    <div className="space-y-8 max-w-[1400px] mx-auto pb-12 animate-in fade-in duration-500">
      
      {/* App Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Institutional Control Center
          </h1>
          <p className="text-zinc-400 text-sm mt-1">
            Real-time status of PPO scheduler, AI Copilot, and active room allocations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={ROUTES.TIMETABLE}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all shadow-md shadow-indigo-500/20"
          >
            <BrainCircuit className="w-4 h-4" />
            <span>Run PPO Optimization</span>
          </Link>

          <Link
            href={ROUTES.AI}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-semibold text-xs transition-all"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Launch AI Copilot</span>
          </Link>
        </div>
      </div>

      {/* Bento Grid Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-md space-y-2">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-mono font-semibold uppercase">Schedule Score</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">90 / 100</div>
          <p className="text-xs text-zinc-400">Zero hard conflicts across AURO dataset.</p>
        </div>

        {/* Room Utilization Card with Drilldown Action */}
        <div 
          onClick={() => setShowDrilldown(true)}
          className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-indigo-500/50 cursor-pointer backdrop-blur-md space-y-2 transition-all group"
        >
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-mono font-semibold uppercase">Room Utilization</span>
            <DoorOpen className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono flex items-center justify-between">
            <span>92%</span>
            <ChevronRight className="w-4 h-4 text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <p className="text-xs text-indigo-300 font-medium">Click to inspect building breakdown →</p>
        </div>

        <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-md space-y-2">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-mono font-semibold uppercase">AI Copilot Accuracy</span>
            <Sparkles className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">95.0%</div>
          <p className="text-xs text-zinc-400">20 natural language benchmark queries.</p>
        </div>

        <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-md space-y-2">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-mono font-semibold uppercase">Verification</span>
            <FileCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-400 font-mono">10 / 10</div>
          <p className="text-xs text-zinc-400">All binary & system checks passed.</p>
        </div>

      </div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* PPO Status Card */}
        <div className="p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">PPO Optimization Terminal</h3>
                <p className="text-xs text-zinc-400 font-mono">Model: ppo_v1.zip (PyTorch)</p>
              </div>
            </div>
            <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Active Policy
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 font-mono text-xs space-y-2">
            <div className="flex justify-between text-zinc-400">
              <span>Observation Space:</span>
              <span className="text-indigo-300">TimetableEnv-v1 (Gymnasium)</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>Hard Conflicts:</span>
              <span className="text-emerald-400 font-bold">0 Clashes</span>
            </div>
          </div>

          <Link 
            href={ROUTES.TIMETABLE}
            className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            <span>Open Optimization Terminal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* AI Copilot Status Card */}
        <div className="p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">AI Copilot Hub</h3>
                <p className="text-xs text-zinc-400 font-mono">Intent parsing & explanation</p>
              </div>
            </div>
            <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
              Audit Stream Active
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 font-mono text-xs space-y-2">
            <div className="text-zinc-400">Latest Intent Query:</div>
            <div className="text-zinc-200 bg-zinc-900 p-2 rounded border border-zinc-800">
              &quot;Find available computer labs on Wednesday morning&quot;
            </div>
          </div>

          <Link 
            href={ROUTES.AI}
            className="inline-flex items-center gap-2 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors"
          >
            <span>Launch Interactive AI Copilot</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>

      {/* Audit Stream */}
      <div className="rounded-3xl border border-zinc-800/80 bg-zinc-900/40 p-8 backdrop-blur-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-indigo-400" />
            <span>Real-Time Audit Stream</span>
          </h2>
          <span className="text-xs font-mono text-zinc-400 bg-zinc-900 px-3 py-1.5 rounded-xl border border-zinc-800">
            Connected to Supabase
          </span>
        </div>
        <CampusLiveFeed feedItems={MOCK_ACTIVITY_FEED} />
      </div>

      {/* Drilldown Modal */}
      <BuildingDrilldownModal isOpen={showDrilldown} onClose={() => setShowDrilldown(false)} />

    </div>
  );
}
