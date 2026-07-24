"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit, AlertTriangle, CheckCircle2, Sparkles, RefreshCw, ArrowRight } from "lucide-react";
import { GlowCard } from "@/components/ui/spotlight-card";

export function HeroInteractiveDemo() {
  const [step, setStep] = useState<"conflict" | "thinking" | "resolved">("conflict");

  useEffect(() => {
    const timer1 = setTimeout(() => setStep("thinking"), 3000);
    const timer2 = setTimeout(() => setStep("resolved"), 6000);
    const timer3 = setTimeout(() => setStep("conflict"), 10000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [step]);

  return (
    <GlowCard glowColor="purple" customSize className="w-full max-w-4xl mx-auto p-6 md:p-8 space-y-6 text-left border border-zinc-800/80 shadow-2xl">
      
      {/* Terminal Bar */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4 font-mono text-xs text-zinc-400">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
          <span className="ml-2 text-zinc-300 font-bold">PPO Policy Simulation Terminal</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-md bg-zinc-950 border border-zinc-800 text-indigo-400 font-semibold">
            AURO SIT Dataset
          </span>
          <button 
            onClick={() => setStep("conflict")}
            className="p-1 rounded hover:bg-zinc-800 transition-colors text-zinc-400 hover:text-white"
            title="Restart Simulation"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Dynamic View */}
      <div className="min-h-[220px] flex flex-col justify-between">
        
        <AnimatePresence mode="wait">
          {step === "conflict" && (
            <motion.div
              key="conflict"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/20 flex items-center justify-center text-rose-400">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Manual Schedule Conflict Detected</h4>
                    <p className="text-xs text-rose-300 font-mono">Double booking at 11:05 AM in Lab B-222</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-mono font-bold animate-pulse">
                  Hard Conflict
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 font-mono text-xs">
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-400">
                  <span>Slot Assignment A:</span>
                  <div className="text-white font-bold mt-0.5">Dr. Thaker (BScIT-501)</div>
                </div>
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-400">
                  <span>Slot Assignment B:</span>
                  <div className="text-white font-bold mt-0.5">Ms. Chakrabarty (MScAI-302)</div>
                </div>
              </div>
            </motion.div>
          )}

          {step === "thinking" && (
            <motion.div
              key="thinking"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/30">
                <div className="flex items-center gap-3">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400"
                  >
                    <BrainCircuit className="w-5 h-5" />
                  </motion.div>
                  <div>
                    <h4 className="text-sm font-bold text-white">PPO Neural Policy Optimization</h4>
                    <p className="text-xs text-indigo-300 font-mono">Evaluating 1,024 policy rollouts in Gymnasium...</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold">
                  Reward Optimizing...
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono text-zinc-400">
                  <span>Policy Convergence</span>
                  <span className="text-indigo-400 font-bold">84%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-zinc-950 border border-zinc-800 overflow-hidden">
                  <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: "84%" }}
                    transition={{ duration: 2.5 }}
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {step === "resolved" && (
            <motion.div
              key="resolved"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Optimal Schedule Synthesized</h4>
                    <p className="text-xs text-emerald-300 font-mono">0 Hard Conflicts • Room Utilization +24%</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
                  Reward +340 Gain
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 font-mono text-xs">
                <div className="p-3 rounded-xl bg-zinc-950 border border-emerald-500/20 text-zinc-300">
                  <span className="text-zinc-500">Reallocated Slot A:</span>
                  <div className="text-emerald-400 font-bold mt-0.5">Dr. Thaker ➔ Lab C-231</div>
                </div>
                <div className="p-3 rounded-xl bg-zinc-950 border border-emerald-500/20 text-zinc-300">
                  <span className="text-zinc-500">Reallocated Slot B:</span>
                  <div className="text-indigo-400 font-bold mt-0.5">Ms. Chakrabarty ➔ Hall B-222</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Footer Step Indicator */}
      <div className="flex items-center justify-between pt-4 border-t border-zinc-800/80 text-xs font-mono text-zinc-400">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${step === "conflict" ? "bg-rose-500" : "bg-zinc-700"}`}></span>
          <span className={`w-2 h-2 rounded-full ${step === "thinking" ? "bg-indigo-500" : "bg-zinc-700"}`}></span>
          <span className={`w-2 h-2 rounded-full ${step === "resolved" ? "bg-emerald-500" : "bg-zinc-700"}`}></span>
        </div>
        <div className="flex items-center gap-1.5 text-zinc-400">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>Real-time PyTorch rollout loop</span>
        </div>
      </div>

    </GlowCard>
  );
}
