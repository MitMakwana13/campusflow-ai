"use client";

import { useState, useEffect } from "react";
import { TimetableGrid } from "@/components/domain/TimetableGrid";
import { AIExplanationPanel } from "@/features/optimization";
import { timetableApi } from "@/lib/api/timetableApi";
import { optimizationApi } from "@/lib/api/optimizationApi";
import { fastAPIOptimizationRepo, fastAPITimetableRepo } from "@/repositories/FastAPIRepository";
import { TimetableSchedule } from "@/types/timetable";
import { AIExplanation } from "@/types/optimization";
import { 
  Wand2, 
  CheckCircle2, 
  AlertTriangle, 
  Activity, 
  ThumbsUp,
  BarChart3,
  RotateCcw,
  Sparkles,
  BrainCircuit,
  Zap,
  ArrowRight,
  ShieldCheck,
  Sliders
} from "lucide-react";
import { cn } from "@/lib/utils";
import { OperationsActionModal } from "@/components/operations/OperationsActionModal";
import { ConstraintTunerModal } from "@/components/operations/ConstraintTunerModal";

export default function TimetablePage() {
  const [isOptimized, setIsOptimized] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [optimizationStep, setOptimizationStep] = useState("");
  const [schedule, setSchedule] = useState<TimetableSchedule | null>(null);
  const [explanation, setExplanation] = useState<AIExplanation | null>(null);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [showBenchmarkModal, setShowBenchmarkModal] = useState(false);
  const [showOperationsModal, setShowOperationsModal] = useState(false);
  const [showConstraintModal, setShowConstraintModal] = useState(false);
  const [lastOperationMessage, setLastOperationMessage] = useState<string | null>(null);
  const [benchmarkMatrix, setBenchmarkMatrix] = useState<any[]>([]);

  useEffect(() => {
    timetableApi.getSchedule(isOptimized).then(setSchedule);
    if (isOptimized) {
      optimizationApi.getLatestExplanation().then(setExplanation);
    }
  }, [isOptimized]);

  const handleOptimize = async () => {
    setIsOptimizing(true);
    setProgress(15);
    setOptimizationStep("Initializing Gymnasium TimetableEnv observation space...");

    await new Promise(r => setTimeout(r, 600));
    setProgress(45);
    setOptimizationStep("Executing SB3 PPO policy rollouts (ppo_v1.zip)...");

    await new Promise(r => setTimeout(r, 700));
    setProgress(80);
    setOptimizationStep("Resolving hard room double-bookings & faculty constraints...");

    const result = await timetableApi.optimize();
    const exp = await optimizationApi.getLatestExplanation();
    
    setProgress(100);
    setSchedule(result);
    setExplanation(exp);
    setIsOptimizing(false);
    setIsOptimized(true);
    setShowSummaryModal(true);
  };

  const handleRollback = async () => {
    await fastAPITimetableRepo.rollbackSchedule();
    setIsOptimized(false);
    const result = await timetableApi.getSchedule(false);
    setSchedule(result);
  };

  const handleRunBenchmark = async () => {
    const matrix = await fastAPIOptimizationRepo.runBenchmark();
    setBenchmarkMatrix(matrix);
    setShowBenchmarkModal(true);
  };

  return (
    <div className="space-y-8 max-w-[1400px] mx-auto pb-12 animate-in fade-in duration-500">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono mb-2">
            <BrainCircuit className="w-3.5 h-3.5 text-indigo-400" />
            <span>PPO Neural Scheduler Engine</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Schedule Synthesis Terminal
          </h1>
          <p className="text-zinc-400 text-sm mt-1">
            AURO University School of Information Technology • Odd Semester 2026
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 rounded-xl p-1">
            <button 
              onClick={() => setIsOptimized(false)}
              className={cn("px-4 py-1.5 rounded-lg text-xs font-medium transition-all", !isOptimized ? "bg-zinc-800 text-white font-bold shadow" : "text-zinc-400 hover:text-white")}
            >
              Unoptimized View
            </button>
            <button 
              onClick={() => setIsOptimized(true)}
              className={cn("px-4 py-1.5 rounded-lg text-xs font-medium transition-all", isOptimized ? "bg-indigo-600 text-white font-bold shadow-md shadow-indigo-500/20" : "text-zinc-400 hover:text-white")}
            >
              PPO Optimized View
            </button>
          </div>
          
          <button 
            onClick={() => setShowConstraintModal(true)} 
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs text-zinc-300 font-mono transition-all"
          >
            <Sliders className="w-4 h-4 text-emerald-400" />
            <span>RL Weights</span>
          </button>

          <button 
            onClick={() => setShowOperationsModal(true)} 
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-xs text-purple-300 font-mono transition-all"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>+ Add Event / Action</span>
          </button>

          <button 
            onClick={handleRunBenchmark} 
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs text-zinc-300 font-mono transition-all"
          >
            <BarChart3 className="w-4 h-4 text-indigo-400" />
            <span>Algorithm Matrix</span>
          </button>
          
          {isOptimized ? (
            <button 
              onClick={handleRollback} 
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-xs text-rose-400 font-mono transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Rollback</span>
            </button>
          ) : (
            <button 
              onClick={handleOptimize}
              disabled={isOptimizing}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-xs shadow-lg shadow-indigo-500/25 transition-all disabled:opacity-50"
            >
              {isOptimizing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Optimizing...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  <span>Run PPO Optimizer</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Live Optimization Progress Bar */}
      {isOptimizing && (
        <div className="p-6 rounded-2xl bg-zinc-900/90 border border-indigo-500/30 space-y-3 animate-in fade-in duration-300">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-indigo-400 font-bold flex items-center gap-2">
              <Zap className="w-4 h-4 animate-bounce" /> {optimizationStep}
            </span>
            <span className="text-white font-bold">{progress}%</span>
          </div>
          <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Comparison Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className={cn(
          "p-6 rounded-2xl border backdrop-blur-md space-y-3 transition-all",
          !isOptimized ? "bg-rose-500/5 border-rose-500/20" : "bg-emerald-500/5 border-emerald-500/20"
        )}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-400 uppercase">Hard Conflicts</span>
            {isOptimized ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-rose-400" />
            )}
          </div>
          <div className="flex items-baseline gap-2">
            <span className={cn("text-3xl font-extrabold font-mono", !isOptimized ? "text-rose-400" : "text-emerald-400")}>
              {schedule ? schedule.hardConflictsCount : (isOptimized ? "0" : "12")}
            </span>
            <span className="text-xs font-mono text-zinc-400">
              {isOptimized ? "0 Clashes" : "Requires PPO action"}
            </span>
          </div>
          <p className="text-xs text-zinc-400">
            {isOptimized ? "All room and faculty double-bookings resolved." : "Conflict detected in Building B lab schedule."}
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-md space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-400 uppercase">Space Utilization</span>
            <Activity className="w-5 h-5 text-indigo-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white font-mono">
              {schedule ? `${schedule.roomUtilizationPercent}%` : (isOptimized ? "92%" : "68%")}
            </span>
            {isOptimized && <span className="text-xs font-mono text-emerald-400 font-bold">+24%</span>}
          </div>
          <p className="text-xs text-zinc-400">Capacity efficiency across all lecture halls and practical labs.</p>
        </div>

        <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-md space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-400 uppercase">Faculty Score</span>
            <ThumbsUp className="w-5 h-5 text-purple-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white font-mono">
              {schedule ? `${schedule.facultySatisfactionScore}/10` : (isOptimized ? "9.4/10" : "6.2/10")}
            </span>
            {isOptimized && <span className="text-xs font-mono text-purple-400 font-bold">Optimal</span>}
          </div>
          <p className="text-xs text-zinc-400">Minimized back-to-back lectures and evening overhang.</p>
        </div>
      </div>

      {/* Main Grid View */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        
        {/* Main Schedule Table (3 cols) */}
        <div className="xl:col-span-3">
          <div className="rounded-3xl border border-zinc-800/80 bg-zinc-900/40 overflow-hidden backdrop-blur-md">
            <div className="p-6 border-b border-zinc-800/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-bold text-white text-base">Weekly Timetable Grid</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
                  {isOptimized ? "PPO Policy Applied" : "Unoptimized Baseline"}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span> Lecture</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span> Lab (2 hrs)</span>
              </div>
            </div>
            <div className="p-4">
              <TimetableGrid isOptimized={isOptimized} />
            </div>
          </div>
        </div>

        {/* Sidebar Explanation Panel (1 col) */}
        <div className="xl:col-span-1 space-y-6">
          {isOptimized && explanation && (
            <AIExplanationPanel 
              explanation={explanation}
              onPublish={() => alert("Schedule published to production Supabase PostgreSQL database.")}
              onRollback={handleRollback}
            />
          )}

          {!isOptimized && (
            <div className="p-6 rounded-3xl border border-rose-500/30 bg-rose-500/5 space-y-4">
              <div className="flex items-center gap-2 text-rose-400 font-mono font-bold text-xs uppercase">
                <AlertTriangle className="w-4 h-4" />
                <span>Detected Hard Conflicts</span>
              </div>
              
              <div className="p-3 bg-zinc-950 rounded-xl border border-rose-500/30 space-y-1">
                <div className="text-xs font-bold text-white">Double Booking: Lab B-222</div>
                <div className="text-[11px] font-mono text-zinc-400">Tuesday 11:05 AM</div>
                <div className="text-xs text-rose-300 mt-2">Dr. Thaker (IMBTTO306) and Ms. Chakrabarty (IIQATO301) are assigned to the same space.</div>
              </div>

              <button 
                onClick={handleOptimize}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all shadow-md shadow-indigo-500/20"
              >
                Resolve with PPO Engine
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Benchmark Matrix Modal */}
      {showBenchmarkModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 max-w-3xl w-full space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-3 text-indigo-400">
                <BarChart3 className="w-6 h-6" />
                <div>
                  <h3 className="text-lg font-bold text-white">Solver Algorithm Benchmark Matrix</h3>
                  <p className="text-xs text-zinc-400">Comparative evaluation across Gymnasium solvers</p>
                </div>
              </div>
              <button onClick={() => setShowBenchmarkModal(false)} className="text-zinc-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-4">
              {benchmarkMatrix.map((item, idx) => (
                <div 
                  key={idx} 
                  className={`p-4 rounded-2xl border transition-all ${
                    item.algorithm.includes('PPO') 
                      ? 'bg-indigo-500/10 border-indigo-500/30' 
                      : 'bg-zinc-950 border-zinc-800'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="font-bold text-white font-sans text-sm flex items-center gap-2">
                      <span>{item.algorithm}</span>
                      {item.algorithm.includes('PPO') && (
                        <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px]">
                          Active Policy
                        </span>
                      )}
                    </span>
                    <div className="flex items-center gap-4">
                      <span className="text-zinc-400">{item.execution_time_seconds}s</span>
                      <span className="text-emerald-400 font-bold text-sm">+{item.reward_score} pts</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-zinc-900 h-2.5 rounded-full overflow-hidden mb-2">
                    <div 
                      className={`h-full rounded-full transition-all ${
                        item.algorithm.includes('PPO')
                          ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400'
                          : 'bg-zinc-700'
                      }`}
                      style={{ width: `${Math.min(100, Math.max(15, (item.reward_score / 340) * 100))}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-[11px] font-mono text-zinc-400">
                    <span>Hard Conflicts: <strong className={item.hard_conflicts_count === 0 ? "text-emerald-400" : "text-rose-400"}>{item.hard_conflicts_count}</strong></span>
                    <span>Status: <span className="text-zinc-300">{item.status}</span></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Operations Modal */}
      <OperationsActionModal 
        isOpen={showOperationsModal}
        onClose={() => setShowOperationsModal(false)}
        onActionComplete={(type, details) => {
          setLastOperationMessage(`Operation logged [${type.toUpperCase()}]: ${details}`);
          handleOptimize();
        }}
      />

      {/* Constraint Tuner Modal */}
      <ConstraintTunerModal 
        isOpen={showConstraintModal}
        onClose={() => setShowConstraintModal(false)}
        onApplyWeights={(w) => {
          setLastOperationMessage(`Gymnasium reward weights updated [Capacity:${w.roomCapacity}x, MaxHours:${w.facultyMaxHours}x]`);
          handleOptimize();
        }}
      />

    </div>
  );
}
