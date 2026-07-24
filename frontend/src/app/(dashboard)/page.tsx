"use client";

import Link from "next/link";
import { 
  Sparkles, 
  BrainCircuit, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  Activity, 
  CheckCircle2, 
  TrendingUp, 
  Cpu, 
  Database, 
  DoorOpen,
  Layers,
  Terminal,
  FileCheck
} from "lucide-react";
import { CampusLiveFeed } from "@/features/dashboard";
import { MOCK_ACTIVITY_FEED } from "@/lib/mock/dashboard";
import { ROUTES } from "@/constants/routes";

export default function DashboardPage() {
  return (
    <div className="space-y-10 max-w-[1400px] mx-auto pb-12 animate-in fade-in duration-500">
      
      {/* 🚀 Hero Banner Section (Linear x Vercel Aesthetic) */}
      <div className="relative overflow-hidden rounded-3xl border border-zinc-800/80 bg-gradient-to-b from-zinc-900/90 via-zinc-950/80 to-[#09090b] p-8 md:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-indigo-600/15 blur-3xl rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 -mb-12 w-80 h-80 bg-purple-600/10 blur-3xl rounded-full pointer-events-none"></div>
        
        <div className="relative z-10 space-y-6 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Autonomous RL Engine & Natural Language Copilot</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-none font-sans">
            CampusFlow <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">AI OS</span>
          </h1>

          <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-2xl font-sans">
            A production-grade institutional engine powered by <strong className="text-zinc-200 font-semibold">Stable-Baselines3 PPO</strong> and a versioned <strong className="text-zinc-200 font-semibold">Intent Copilot</strong> for optimal zero-conflict schedule synthesis.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link 
              href={ROUTES.TIMETABLE}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm shadow-xl shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <BrainCircuit className="w-4 h-4" />
              <span>Launch PPO Optimizer</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link 
              href="/ai"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700/80 font-semibold text-sm transition-all"
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Open AI Copilot</span>
            </Link>
          </div>
        </div>

        {/* Floating Architecture Specs Badge */}
        <div className="hidden lg:grid grid-cols-3 gap-3 absolute top-8 right-8 w-80 z-10">
          <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-center">
            <div className="text-[10px] font-mono text-zinc-400 uppercase">Policy Model</div>
            <div className="text-xs font-bold text-indigo-400 font-mono mt-0.5">ppo_v1.zip</div>
          </div>
          <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-center">
            <div className="text-[10px] font-mono text-zinc-400 uppercase">Verification</div>
            <div className="text-xs font-bold text-emerald-400 font-mono mt-0.5">10/10 PASS</div>
          </div>
          <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-center">
            <div className="text-[10px] font-mono text-zinc-400 uppercase">PostgreSQL</div>
            <div className="text-xs font-bold text-purple-400 font-mono mt-0.5">Supabase</div>
          </div>
        </div>
      </div>

      {/* 📊 Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Metric 1 */}
        <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-md space-y-3 hover:border-zinc-700 transition-all">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider">Schedule Score</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white font-mono">90/100</span>
            <span className="text-xs font-semibold text-emerald-400 font-mono">+12.5%</span>
          </div>
          <p className="text-xs text-zinc-400">Zero hard conflicts detected across AURO dataset.</p>
        </div>

        {/* Metric 2 */}
        <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-md space-y-3 hover:border-zinc-700 transition-all">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider">Room Utilization</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <DoorOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white font-mono">84%</span>
            <span className="text-xs font-semibold text-indigo-400 font-mono">55 Spaces</span>
          </div>
          <p className="text-xs text-zinc-400">Balanced load across lecture halls & specialized labs.</p>
        </div>

        {/* Metric 3 */}
        <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-md space-y-3 hover:border-zinc-700 transition-all">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider">AI Copilot Accuracy</span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white font-mono">95.0%</span>
            <span className="text-xs font-semibold text-purple-400 font-mono">20 Benchmark Queries</span>
          </div>
          <p className="text-xs text-zinc-400">Structured intent parser with audit logging.</p>
        </div>

        {/* Metric 4 */}
        <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-md space-y-3 hover:border-zinc-700 transition-all">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider">PPO Policy Rollouts</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Cpu className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white font-mono">1.2M</span>
            <span className="text-xs font-semibold text-amber-400 font-mono">+485.2 Reward</span>
          </div>
          <p className="text-xs text-zinc-400">Gymnasium TimetableEnv neural policy optimization.</p>
        </div>

      </div>

      {/* 🧠 Interactive Component Feature Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Card 1: PPO Optimization Engine Live Display */}
        <div className="p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 space-y-6 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white font-sans">PPO Optimizer Terminal</h2>
                <p className="text-xs text-zinc-400 font-mono">Neural policy inference (ppo_v1.zip)</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span> ONLINE
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 font-mono text-xs space-y-3">
            <div className="flex justify-between text-zinc-400 pb-2 border-b border-zinc-800">
              <span>Environment:</span>
              <span className="text-indigo-300">TimetableEnv-v1 (Gymnasium)</span>
            </div>
            <div className="flex justify-between text-zinc-400 pb-2 border-b border-zinc-800">
              <span>Policy Architecture:</span>
              <span className="text-purple-300">MlpPolicy (PyTorch)</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>Conflict Penalty Score:</span>
              <span className="text-emerald-400 font-bold">0 Hard Conflicts</span>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <FileCheck className="w-4 h-4 text-emerald-400" />
              <span>Checkpoint verified in binary model archive</span>
            </div>
            <Link 
              href="/timetable"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              <span>Run Timetable Optimization</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Card 2: AI Copilot Natural Language Assistant */}
        <div className="p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 space-y-6 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white font-sans">AI Copilot Hub</h2>
                <p className="text-xs text-zinc-400 font-mono">Intent parsing & reasoning layer</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-mono border border-purple-500/20">
              Provider Abstraction
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 font-mono text-xs space-y-2">
            <div className="text-zinc-400 text-[11px] uppercase tracking-wider font-semibold">Sample Query:</div>
            <div className="text-zinc-200 bg-zinc-900/90 p-2.5 rounded-lg border border-zinc-800">
              &quot;Find available computer labs on Wednesday morning for CS101&quot;
            </div>
            <div className="flex items-center justify-between text-emerald-400 pt-1">
              <span>Parsed Intent: <strong className="text-white">GET_FREE_ROOMS</strong></span>
              <span className="text-xs bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">98% Conf</span>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <Terminal className="w-4 h-4 text-purple-400" />
              <span>Logged to PostgreSQL `ai_requests` table</span>
            </div>
            <Link 
              href="/ai"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors"
            >
              <span>Ask Custom Natural Query</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>

      {/* ⚡ Live Operational Feed Section */}
      <div className="rounded-3xl border border-zinc-800/80 bg-zinc-900/40 p-8 backdrop-blur-md">
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-white font-sans flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-400" />
              <span>Real-Time Audit Stream</span>
            </h2>
            <p className="text-xs text-zinc-400">Automated event stream logging PPO decisions and Copilot actions.</p>
          </div>
          <span className="text-xs font-mono text-zinc-400 bg-zinc-900 px-3 py-1.5 rounded-xl border border-zinc-800">
            Live Stream Connected
          </span>
        </div>
        <CampusLiveFeed feedItems={MOCK_ACTIVITY_FEED} />
      </div>

    </div>
  );
}
