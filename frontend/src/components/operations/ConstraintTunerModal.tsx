"use client";

import { useState } from "react";
import { Sliders, ShieldCheck, CheckCircle2, RefreshCw, X, Sparkles } from "lucide-react";

interface ConstraintTunerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyWeights: (weights: Record<string, number>) => void;
}

export function ConstraintTunerModal({ isOpen, onClose, onApplyWeights }: ConstraintTunerModalProps) {
  const [weights, setWeights] = useState({
    hardRoomClash: 10,
    facultyMaxHours: 8,
    roomCapacity: 8,
    preferredEquipment: 6,
    lunchBreakWindow: 4,
    consecutiveLectures: 3,
  });

  if (!isOpen) return null;

  const handleChange = (key: string, val: number) => {
    setWeights(prev => ({ ...prev, [key]: val }));
  };

  const handleReset = () => {
    setWeights({
      hardRoomClash: 10,
      facultyMaxHours: 8,
      roomCapacity: 8,
      preferredEquipment: 6,
      lunchBreakWindow: 4,
      consecutiveLectures: 3,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8 max-w-xl w-full space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Gymnasium PPO Reward Constraint Tuner</h3>
              <p className="text-xs text-zinc-400 font-mono">Fine-tune soft & hard policy penalty multipliers</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Sliders Grid */}
        <div className="space-y-4 text-xs font-mono">
          
          <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
            <div className="flex justify-between text-zinc-300">
              <span className="font-bold text-rose-400">Hard Room Double-Booking Penalty</span>
              <span className="text-white font-bold">{weights.hardRoomClash}x</span>
            </div>
            <input 
              type="range" min="1" max="10" 
              value={weights.hardRoomClash} 
              onChange={(e) => handleChange("hardRoomClash", parseInt(e.target.value))}
              className="w-full accent-rose-500 bg-zinc-800 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
            <div className="flex justify-between text-zinc-300">
              <span className="font-bold text-indigo-400">Faculty Max Workload Cap (16 hrs/wk)</span>
              <span className="text-white font-bold">{weights.facultyMaxHours}x</span>
            </div>
            <input 
              type="range" min="1" max="10" 
              value={weights.facultyMaxHours} 
              onChange={(e) => handleChange("facultyMaxHours", parseInt(e.target.value))}
              className="w-full accent-indigo-500 bg-zinc-800 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
            <div className="flex justify-between text-zinc-300">
              <span className="font-bold text-purple-400">Facility Seating Capacity Match</span>
              <span className="text-white font-bold">{weights.roomCapacity}x</span>
            </div>
            <input 
              type="range" min="1" max="10" 
              value={weights.roomCapacity} 
              onChange={(e) => handleChange("roomCapacity", parseInt(e.target.value))}
              className="w-full accent-purple-500 bg-zinc-800 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
            <div className="flex justify-between text-zinc-300">
              <span className="font-bold text-emerald-400">GPU / Lab Hardware Spec Alignment</span>
              <span className="text-white font-bold">{weights.preferredEquipment}x</span>
            </div>
            <input 
              type="range" min="1" max="10" 
              value={weights.preferredEquipment} 
              onChange={(e) => handleChange("preferredEquipment", parseInt(e.target.value))}
              className="w-full accent-emerald-500 bg-zinc-800 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
            <div className="flex justify-between text-zinc-300">
              <span className="font-bold text-amber-400">Faculty Lunch Break Window Protection</span>
              <span className="text-white font-bold">{weights.lunchBreakWindow}x</span>
            </div>
            <input 
              type="range" min="1" max="10" 
              value={weights.lunchBreakWindow} 
              onChange={(e) => handleChange("lunchBreakWindow", parseInt(e.target.value))}
              className="w-full accent-amber-500 bg-zinc-800 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
          <button 
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <div className="flex items-center gap-3">
            <button 
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold transition-all"
            >
              Cancel
            </button>
            <button 
              onClick={() => { onApplyWeights(weights); onClose(); }}
              className="px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all shadow-md shadow-indigo-500/20 flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Apply Policy Weights</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
