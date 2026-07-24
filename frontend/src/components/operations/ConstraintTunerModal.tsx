"use client";

import { useState } from "react";
import { Sliders, ShieldCheck, CheckCircle2, RefreshCw, X, Sparkles, Zap, Award, Layers } from "lucide-react";

interface ConstraintTunerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyWeights: (weights: Record<string, number>, profileName: string) => void;
}

type ProfileKey = "balanced" | "faculty" | "space" | "conflict";

const PRESETS: Record<ProfileKey, { name: string; desc: string; weights: Record<string, number>; sat: number; util: number; reward: number }> = {
  balanced: {
    name: "Balanced Standard",
    desc: "Default multi-objective balance across faculty preferences and space.",
    weights: { hardRoomClash: 10, facultyMaxHours: 8, roomCapacity: 8, preferredEquipment: 6, lunchBreakWindow: 4 },
    sat: 84,
    util: 92,
    reward: 340,
  },
  faculty: {
    name: "Faculty-First Ergonomics",
    desc: "Prioritizes faculty lunch windows, max hour limits, and preferred break slots.",
    weights: { hardRoomClash: 10, facultyMaxHours: 10, roomCapacity: 5, preferredEquipment: 5, lunchBreakWindow: 10 },
    sat: 96,
    util: 86,
    reward: 312,
  },
  space: {
    name: "Maximum Space Efficiency",
    desc: "Maximizes room capacity utilization and GPU laboratory throughput.",
    weights: { hardRoomClash: 10, facultyMaxHours: 5, roomCapacity: 10, preferredEquipment: 9, lunchBreakWindow: 2 },
    sat: 76,
    util: 97,
    reward: 358,
  },
  conflict: {
    name: "Zero Conflict Strict Enforcement",
    desc: "Maximum penalty enforcement on all hard constraints and double bookings.",
    weights: { hardRoomClash: 10, facultyMaxHours: 9, roomCapacity: 9, preferredEquipment: 8, lunchBreakWindow: 8 },
    sat: 90,
    util: 90,
    reward: 330,
  },
};

export function ConstraintTunerModal({ isOpen, onClose, onApplyWeights }: ConstraintTunerModalProps) {
  const [activeProfile, setActiveProfile] = useState<ProfileKey>("balanced");
  const [weights, setWeights] = useState(PRESETS.balanced.weights);

  if (!isOpen) return null;

  const handleSelectPreset = (key: ProfileKey) => {
    setActiveProfile(key);
    setWeights(PRESETS[key].weights);
  };

  const handleChange = (key: string, val: number) => {
    setWeights(prev => ({ ...prev, [key]: val }));
  };

  const currentPreset = PRESETS[activeProfile];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8 max-w-2xl w-full space-y-6 shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">Scheduling Optimization Priorities</h3>
                <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[10px] font-mono">
                  PPO Reward v1.4
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-mono">Tune Gymnasium multi-objective reward policy weights</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Preset Selector */}
        <div className="space-y-2">
          <label className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider">
            Optimization Profiles
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {(Object.keys(PRESETS) as ProfileKey[]).map((key) => (
              <button
                key={key}
                onClick={() => handleSelectPreset(key)}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  activeProfile === key 
                    ? "bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-500/10" 
                    : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
                }`}
              >
                <div className="text-xs font-bold font-sans">{PRESETS[key].name}</div>
                <div className="text-[10px] font-mono text-indigo-400 mt-1">+{PRESETS[key].reward} pts</div>
              </button>
            ))}
          </div>
        </div>

        {/* Sliders Grid */}
        <div className="space-y-3 text-xs font-mono">
          <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
            <div className="flex justify-between text-zinc-300">
              <span className="font-bold text-rose-400">Hard Double-Booking Constraint</span>
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
              <span className="font-bold text-indigo-400">Faculty Max Hours Protection (16h/wk)</span>
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
              <span className="font-bold text-purple-400">Room Seating Capacity Matching</span>
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
              <span className="font-bold text-emerald-400">GPU / Lab Hardware Alignment</span>
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
              <span className="font-bold text-amber-400">Faculty Lunch Window Protection</span>
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

        {/* Trade-Off Impact Preview */}
        <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 space-y-3">
          <div className="flex items-center justify-between text-indigo-300 font-mono text-xs font-bold">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Predicted PPO Trade-Off Metrics</span>
            </span>
            <span>Profile: {currentPreset.name}</span>
          </div>

          <div className="grid grid-cols-3 gap-3 font-mono text-center">
            <div className="p-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800">
              <div className="text-[10px] text-zinc-400 uppercase">PPO Reward</div>
              <div className="text-lg font-bold text-emerald-400">+{currentPreset.reward} pts</div>
            </div>
            <div className="p-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800">
              <div className="text-[10px] text-zinc-400 uppercase">Faculty Satisfaction</div>
              <div className="text-lg font-bold text-purple-400">{currentPreset.sat}%</div>
            </div>
            <div className="p-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800">
              <div className="text-[10px] text-zinc-400 uppercase">Room Utilization</div>
              <div className="text-lg font-bold text-indigo-400">{currentPreset.util}%</div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
          <button 
            onClick={() => handleSelectPreset("balanced")}
            className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors font-mono"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Balanced</span>
          </button>

          <div className="flex items-center gap-3">
            <button 
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold transition-all"
            >
              Cancel
            </button>
            <button 
              onClick={() => { onApplyWeights(weights, currentPreset.name); onClose(); }}
              className="px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all shadow-md shadow-indigo-500/20 flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Apply & Re-Run PPO Policy</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
