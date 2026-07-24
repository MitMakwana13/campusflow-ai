"use client";

import { DoorOpen, Building2, CheckCircle2, TrendingUp, X } from "lucide-react";

interface BuildingDrilldownModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BUILDINGS = [
  { name: "Building A (Computing & AI)", utilization: 91, rooms: 18, activeLabs: 6, status: "Optimal" },
  { name: "Building B (Information Tech)", utilization: 95, rooms: 20, activeLabs: 8, status: "High Demand" },
  { name: "Building C (Data Science & Stats)", utilization: 84, rooms: 12, activeLabs: 4, status: "Balanced" },
  { name: "Main Block Auditorium", utilization: 60, rooms: 5, activeLabs: 0, status: "Available" },
];

export function BuildingDrilldownModal({ isOpen, onClose }: BuildingDrilldownModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8 max-w-2xl w-full space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-3 text-indigo-400">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Building Space Utilization Drilldown</h3>
              <p className="text-xs text-zinc-400 font-mono">Institutional capacity breakdown by facility block</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Building List */}
        <div className="space-y-4">
          {BUILDINGS.map((b) => (
            <div key={b.name} className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-white font-sans">{b.name}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] ${
                  b.utilization > 90 
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                    : "bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
                }`}>
                  {b.utilization}% Utilized
                </span>
              </div>

              <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${b.utilization > 90 ? "bg-emerald-400" : "bg-indigo-500"}`} 
                  style={{ width: `${b.utilization}%` }}
                />
              </div>

              <div className="flex justify-between text-[11px] font-mono text-zinc-400 pt-1">
                <span>{b.rooms} Total Rooms Tracked</span>
                <span>{b.activeLabs} Active GPU Labs</span>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300 flex items-center justify-between font-mono">
          <span>Overall Campus Average:</span>
          <strong className="text-white text-sm">92.0% Utilization (+24% PPO Gain)</strong>
        </div>

      </div>
    </div>
  );
}
