"use client";

import { History, ArrowRightLeft, CheckCircle2, RotateCcw, X, ShieldCheck, Sparkles } from "lucide-react";

export interface OptimizationRunRecord {
  id: string;
  runNumber: number;
  strategyName: string;
  timestamp: string;
  rewardScore: number;
  hardConflicts: number;
  facultySatisfaction: number;
  roomUtilization: number;
  active: boolean;
}

interface OptimizationHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: OptimizationRunRecord[];
  onSelectRunToRestore: (run: OptimizationRunRecord) => void;
}

export function OptimizationHistoryModal({ 
  isOpen, 
  onClose, 
  history, 
  onSelectRunToRestore 
}: OptimizationHistoryModalProps) {
  if (!isOpen) return null;

  const currentRun = history.find(r => r.active) || history[0];
  const previousRun = history.length > 1 ? history[history.length - 2] : null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8 max-w-3xl w-full space-y-6 shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">PPO Policy Optimization History & Comparison</h3>
              <p className="text-xs text-zinc-400 font-mono">Traceability audit & side-by-side run comparisons</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Side-by-Side Comparison Card */}
        {previousRun && currentRun && (
          <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-indigo-300">
              <span className="flex items-center gap-2">
                <ArrowRightLeft className="w-4 h-4 text-purple-400" />
                <span>Side-by-Side Policy Comparison</span>
              </span>
              <span>Comparing Run #{previousRun.runNumber} vs Run #{currentRun.runNumber}</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono text-left">
                <thead className="text-zinc-400 border-b border-zinc-800 bg-zinc-950/60">
                  <tr>
                    <th className="p-2.5">Metric</th>
                    <th className="p-2.5">Run #{previousRun.runNumber} ({previousRun.strategyName})</th>
                    <th className="p-2.5">Run #{currentRun.runNumber} ({currentRun.strategyName})</th>
                    <th className="p-2.5">Net Change</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 text-zinc-200">
                  <tr>
                    <td className="p-2.5 font-sans font-bold text-zinc-300">PPO Reward Score</td>
                    <td className="p-2.5 text-zinc-400">+{previousRun.rewardScore} pts</td>
                    <td className="p-2.5 text-emerald-400 font-bold">+{currentRun.rewardScore} pts</td>
                    <td className="p-2.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] ${
                        currentRun.rewardScore >= previousRun.rewardScore 
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                          : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      }`}>
                        {currentRun.rewardScore >= previousRun.rewardScore ? "+" : ""}{currentRun.rewardScore - previousRun.rewardScore} pts
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td className="p-2.5 font-sans font-bold text-zinc-300">Hard Conflicts</td>
                    <td className="p-2.5 text-emerald-400">{previousRun.hardConflicts} Clashes</td>
                    <td className="p-2.5 text-emerald-400 font-bold">{currentRun.hardConflicts} Clashes</td>
                    <td className="p-2.5"><span className="text-emerald-400 font-bold">Optimal (0)</span></td>
                  </tr>

                  <tr>
                    <td className="p-2.5 font-sans font-bold text-zinc-300">Faculty Satisfaction Index</td>
                    <td className="p-2.5 text-zinc-400">{previousRun.facultySatisfaction}%</td>
                    <td className="p-2.5 text-purple-400 font-bold">{currentRun.facultySatisfaction}%</td>
                    <td className="p-2.5">
                      <span className="text-purple-300 font-bold">
                        {currentRun.facultySatisfaction >= previousRun.facultySatisfaction ? "+" : ""}
                        {currentRun.facultySatisfaction - previousRun.facultySatisfaction}%
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td className="p-2.5 font-sans font-bold text-zinc-300">Space Utilization Rate</td>
                    <td className="p-2.5 text-zinc-400">{previousRun.roomUtilization}%</td>
                    <td className="p-2.5 text-indigo-400 font-bold">{currentRun.roomUtilization}%</td>
                    <td className="p-2.5">
                      <span className="text-indigo-300 font-bold">
                        {currentRun.roomUtilization >= previousRun.roomUtilization ? "+" : ""}
                        {currentRun.roomUtilization - previousRun.roomUtilization}%
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* History Run Log */}
        <div className="space-y-3">
          <div className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider">
            Optimization Audit Runs ({history.length})
          </div>

          <div className="space-y-2.5">
            {history.map((run) => (
              <div 
                key={run.id}
                className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${
                  run.active 
                    ? "bg-indigo-500/10 border-indigo-500/40" 
                    : "bg-zinc-950 border-zinc-800/80 hover:border-zinc-700"
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="font-bold text-white font-sans text-sm">Run #{run.runNumber} — {run.strategyName}</span>
                    {run.active && (
                      <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-bold">
                        Active In-Memory Policy
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-zinc-400 font-mono">
                    Timestamp: {run.timestamp} • Reward: <strong className="text-emerald-400">+{run.rewardScore} pts</strong> • Sat: {run.facultySatisfaction}% • Util: {run.roomUtilization}%
                  </div>
                </div>

                <div>
                  {!run.active ? (
                    <button
                      onClick={() => onSelectRunToRestore(run)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold transition-all font-mono"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Rollback</span>
                    </button>
                  ) : (
                    <span className="flex items-center gap-1 text-xs text-emerald-400 font-mono font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Current</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
