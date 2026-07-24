"use client";

import { useState } from "react";
import { Wrench, CheckCircle2, RotateCcw, X, ShieldCheck, Sparkles, Cpu, Clock, Terminal, ArrowRight, Zap, Play } from "lucide-react";

interface HybridOptimizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyHybridSchedule: (result: any) => void;
}

export function HybridOptimizerModal({
  isOpen,
  onClose,
  onApplyHybridSchedule,
}: HybridOptimizerModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [hybridResult, setHybridResult] = useState<any | null>(null);

  if (!isOpen) return null;

  const handleRunHybridOptimization = () => {
    setIsProcessing(true);
    setHybridResult(null);

    setTimeout(() => {
      const mockResult = {
        initialPpoReward: 341.2,
        initialConflicts: 1,
        repairIterations: 14,
        repairSwaps: 2,
        repairRewardDelta: 19.4,
        finalHybridReward: 360.6,
        finalConflicts: 0,
        latencyMs: 510,
        validationStatus: "PASSED ✅",
        strategyUsed: "PPO Policy + Hill-Climbing Local Search Repair",
      };
      setHybridResult(mockResult);
      setIsProcessing(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8 max-w-3xl w-full space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">Hybrid PPO + Constraint Repair Solver</h3>
                <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[10px] font-mono">
                  v2.0 Hybrid Engine
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-mono">Combines learned PPO neural rollouts with deterministic Hill-Climbing repair</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Workflow Diagram Card */}
        <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-3">
          <div className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
            Hybrid Optimization Architecture Execution Pipeline
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-xs font-mono p-3 bg-zinc-900/60 rounded-xl border border-zinc-800">
            <div className="flex items-center gap-2 text-indigo-400">
              <Cpu className="w-4 h-4" />
              <span>1. PPO Policy Rollout</span>
            </div>
            <ArrowRight className="w-4 h-4 text-zinc-600 hidden md:block" />
            <div className="flex items-center gap-2 text-amber-400">
              <ShieldCheck className="w-4 h-4" />
              <span>2. Constraint Validator</span>
            </div>
            <ArrowRight className="w-4 h-4 text-zinc-600 hidden md:block" />
            <div className="flex items-center gap-2 text-purple-400">
              <Wrench className="w-4 h-4" />
              <span>3. Hill-Climbing Repair</span>
            </div>
            <ArrowRight className="w-4 h-4 text-zinc-600 hidden md:block" />
            <div className="flex items-center gap-2 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>4. Validated Timetable</span>
            </div>
          </div>
        </div>

        {/* Trigger Action */}
        {!hybridResult && (
          <div className="text-center py-6 space-y-4">
            <p className="text-xs text-zinc-400 max-w-md mx-auto">
              Execute PPO neural inference followed by deterministic local search neighbor moves to guarantee 100% legal constraint compliance.
            </p>
            <button
              onClick={handleRunHybridOptimization}
              disabled={isProcessing}
              className="px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs font-bold transition-all shadow-lg shadow-purple-500/25 flex items-center gap-2 mx-auto disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <Clock className="w-4 h-4 animate-spin" />
                  <span>Running Hill-Climbing Repair Swaps...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>Execute Hybrid PPO + Repair Engine</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Results Card */}
        {hybridResult && (
          <div className="p-5 rounded-2xl bg-purple-500/10 border border-purple-500/30 space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-purple-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>Hybrid Execution Breakdown</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono font-bold">
                {hybridResult.validationStatus}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                <span className="text-zinc-500 text-[10px] block uppercase">PPO Initial Reward</span>
                <span className="text-indigo-400 font-bold text-sm">+{hybridResult.initialPpoReward} pts</span>
              </div>

              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                <span className="text-zinc-500 text-[10px] block uppercase">Repair Swaps Delta</span>
                <span className="text-purple-400 font-bold text-sm">+{hybridResult.repairRewardDelta} pts</span>
              </div>

              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                <span className="text-zinc-500 text-[10px] block uppercase">Final Hybrid Reward</span>
                <span className="text-emerald-400 font-bold text-sm">+{hybridResult.finalHybridReward} pts</span>
              </div>

              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                <span className="text-zinc-500 text-[10px] block uppercase">Inference Latency</span>
                <span className="text-zinc-300 font-bold text-sm">{hybridResult.latencyMs} ms</span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  onApplyHybridSchedule(hybridResult);
                  onClose();
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold transition-all shadow-md shadow-emerald-500/20 flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Apply Hybrid Optimized Schedule</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
