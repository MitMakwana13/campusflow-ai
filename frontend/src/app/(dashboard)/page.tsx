"use client";

import Link from "next/link";
import { 
  Sparkles, 
  BrainCircuit, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  Cpu, 
  Database, 
  DoorOpen,
  Layers,
  Terminal,
  Zap,
  Code2,
  Activity,
  FileCheck,
  AlertTriangle
} from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { GlowCard } from "@/components/ui/spotlight-card";
import { HeroInteractiveDemo } from "@/components/landing/HeroInteractiveDemo";

export default function MarketingLandingPage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans relative overflow-hidden">
      
      {/* Background Animated Glows & Grid */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-tr from-indigo-600/10 via-purple-600/10 to-pink-500/5 blur-3xl rounded-full pointer-events-none"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>

      {/* 🌐 Floating SaaS Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#09090b]/80 border-b border-zinc-800/60">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Zap className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="font-extrabold tracking-tight text-white text-lg">CampusFlow <span className="text-indigo-400">AI</span></span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-zinc-400">
            <a href="#problem" className="hover:text-white transition-colors">Why CampusFlow</a>
            <a href="#architecture" className="hover:text-white transition-colors">Architecture</a>
            <a href="#bento" className="hover:text-white transition-colors">Metrics</a>
            <Link href={ROUTES.VERIFICATION} className="hover:text-white transition-colors">System Health</Link>
          </nav>

          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/MitMakwana13/campusflow-ai" 
              target="_blank" 
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-mono text-zinc-300 transition-all"
            >
              <Code2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>GitHub</span>
            </a>

            <Link
              href={ROUTES.DASHBOARD}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-xs shadow-lg shadow-indigo-500/20 transition-all"
            >
              <span>Launch App</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </header>

      {/* 🚀 Hero Section */}
      <section className="pt-20 pb-24 max-w-7xl mx-auto px-6 text-center relative z-10">
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono mb-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Reinforcement Learning Timetable Optimizer</span>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight leading-[1.05] max-w-5xl mx-auto font-sans">
          The operating system for <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">modern universities.</span>
        </h1>

        <p className="mt-8 text-zinc-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
          AI-Powered University Scheduling Platform driven by <strong className="text-zinc-200">Stable-Baselines3 PPO</strong> and natural language intent explainability.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 mb-16">
          <Link
            href={ROUTES.DASHBOARD}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-2xl shadow-indigo-500/30 transition-all transform hover:-translate-y-0.5"
          >
            <BrainCircuit className="w-4 h-4" />
            <span>Launch Optimization App</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href={ROUTES.VERIFICATION}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 font-semibold text-sm transition-all"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>View 10/10 System Health</span>
          </Link>
        </div>

        {/* Dynamic Framer Motion Simulation Terminal Demo */}
        <HeroInteractiveDemo />

      </section>

      {/* 📊 Section 1: Before vs After Storytelling */}
      <section id="problem" className="py-20 border-t border-zinc-800/60 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest">Story of Scheduling</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white">Manual Spreadsheets vs PPO Reinforcement Learning</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Manual Scheduling (Old Way) */}
          <GlowCard glowColor="red" customSize className="w-full h-auto p-8 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider">Traditional Method</span>
              <AlertTriangle className="w-5 h-5 text-rose-400" />
            </div>

            <h3 className="text-2xl font-bold text-white">Manual Excel Scheduling</h3>
            
            <ul className="space-y-4 text-sm text-zinc-400">
              <li className="flex items-start gap-3">
                <span className="text-rose-400 font-bold text-base">✕</span>
                <span><strong>12+ Hard Conflicts:</strong> Faculty room double-bookings during peak lecture hours.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-rose-400 font-bold text-base">✕</span>
                <span><strong>Suboptimal Space Usage:</strong> Computer labs sit empty while lecture halls overflow.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-rose-400 font-bold text-base">✕</span>
                <span><strong>Zero Reasoning:</strong> No audit trail when faculty requests schedule changes.</span>
              </li>
            </ul>
          </GlowCard>

          {/* CampusFlow AI (New Way) */}
          <GlowCard glowColor="purple" customSize className="w-full h-auto p-8 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">CampusFlow AI Engine</span>
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>

            <h3 className="text-2xl font-bold text-white">Autonomous PPO Neural Policy</h3>
            
            <ul className="space-y-4 text-sm text-zinc-300">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 font-bold text-base">✓</span>
                <span><strong>0 Hard Conflicts:</strong> 100% constraint satisfaction across AURO SIT dataset.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 font-bold text-base">✓</span>
                <span><strong>92% Room Utilization:</strong> +24% capacity efficiency gained across all halls.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 font-bold text-base">✓</span>
                <span><strong>AI Natural Explanation:</strong> Instant intent parsing for dean queries.</span>
              </li>
            </ul>
          </GlowCard>

        </div>
      </section>

      {/* 🏗️ Section 2: Interactive Architecture Pipeline */}
      <section id="architecture" className="py-20 border-t border-zinc-800/60 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest">System Architecture</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white">Production Stack Pipeline</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          
          <GlowCard glowColor="blue" customSize className="p-6 text-center space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mx-auto">
              <Zap className="w-5 h-5" />
            </div>
            <div className="text-xs font-mono font-bold text-zinc-400 uppercase">Frontend</div>
            <div className="text-sm font-extrabold text-white">Next.js 16 App</div>
          </GlowCard>

          <GlowCard glowColor="purple" customSize className="p-6 text-center space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mx-auto">
              <Terminal className="w-5 h-5" />
            </div>
            <div className="text-xs font-mono font-bold text-zinc-400 uppercase">Backend API</div>
            <div className="text-sm font-extrabold text-white">FastAPI (Render)</div>
          </GlowCard>

          <GlowCard glowColor="green" customSize className="p-6 text-center space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mx-auto">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div className="text-xs font-mono font-bold text-zinc-400 uppercase">RL Policy</div>
            <div className="text-sm font-extrabold text-white">SB3 PPO v1.zip</div>
          </GlowCard>

          <GlowCard glowColor="orange" customSize className="p-6 text-center space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mx-auto">
              <Database className="w-5 h-5" />
            </div>
            <div className="text-xs font-mono font-bold text-zinc-400 uppercase">Database</div>
            <div className="text-sm font-extrabold text-white">Supabase PG</div>
          </GlowCard>

          <GlowCard glowColor="purple" customSize className="p-6 text-center space-y-3">
            <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 mx-auto">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="text-xs font-mono font-bold text-zinc-400 uppercase">Copilot</div>
            <div className="text-sm font-extrabold text-white">Intent Parser</div>
          </GlowCard>

        </div>
      </section>

      {/* 📦 Section 3: Bento Grid Metrics */}
      <section id="bento" className="py-20 border-t border-zinc-800/60 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">Performance Metrics</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white">Quantifiable Institutional Results</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <GlowCard glowColor="green" customSize className="p-8 space-y-4">
            <div className="text-xs font-mono text-zinc-400 uppercase">Hard Clashes</div>
            <div className="text-5xl font-extrabold text-emerald-400 font-mono">0</div>
            <p className="text-xs text-zinc-400">Zero double-bookings recorded across 55 rooms.</p>
          </GlowCard>

          <GlowCard glowColor="blue" customSize className="p-8 space-y-4">
            <div className="text-xs font-mono text-zinc-400 uppercase">Room Utilization</div>
            <div className="text-5xl font-extrabold text-white font-mono">92%</div>
            <p className="text-xs text-emerald-400 font-semibold">+24% capacity gain post PPO rollout.</p>
          </GlowCard>

          <GlowCard glowColor="purple" customSize className="p-8 space-y-4">
            <div className="text-xs font-mono text-zinc-400 uppercase">PPO Policy Reward</div>
            <div className="text-5xl font-extrabold text-indigo-400 font-mono">+340</div>
            <p className="text-xs text-zinc-400">Evaluated on Gymnasium TimetableEnv.</p>
          </GlowCard>

          <GlowCard glowColor="green" customSize className="p-8 space-y-4">
            <div className="text-xs font-mono text-zinc-400 uppercase">System Verification</div>
            <div className="text-5xl font-extrabold text-purple-400 font-mono">10/10</div>
            <p className="text-xs text-zinc-400">Automated verification checks passed.</p>
          </GlowCard>

        </div>
      </section>

      {/* 🏁 Footer */}
      <footer className="py-12 border-t border-zinc-800/60 max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-zinc-500">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
            <Zap className="w-3.5 h-3.5 fill-white" />
          </div>
          <span>CampusFlow AI OS • AURO University SIT</span>
        </div>

        <div className="flex items-center gap-6 font-mono">
          <Link href={ROUTES.DASHBOARD} className="hover:text-zinc-200">App Console</Link>
          <Link href={ROUTES.VERIFICATION} className="hover:text-zinc-200">System Certification</Link>
          <a href="https://github.com/MitMakwana13/campusflow-ai" target="_blank" rel="noreferrer" className="hover:text-zinc-200">GitHub Repository</a>
        </div>
      </footer>

    </div>
  );
}
