"use client";

import { useState } from "react";
import { DoorOpen, Search, Monitor, Cpu, CheckCircle2, Zap, Wifi } from "lucide-react";
import { GlowCard } from "@/components/ui/spotlight-card";

interface Room {
  id: string;
  name: string;
  building: string;
  type: "Computer Lab" | "Lecture Hall" | "Auditorium";
  capacity: number;
  equipment: string[];
  utilization: number;
  status: "Available" | "Allocated" | "PPO Optimized";
}

const MOCK_ROOMS: Room[] = [
  { id: "RM-101", name: "Lab B-222", building: "Building B", type: "Computer Lab", capacity: 45, equipment: ["NVIDIA RTX 4090", "Gigabit LAN", "Projector"], utilization: 92, status: "PPO Optimized" },
  { id: "RM-102", name: "Hall C-231", building: "Building C", type: "Lecture Hall", capacity: 80, equipment: ["Audio System", "Smart Board", "Air Conditioned"], utilization: 88, status: "PPO Optimized" },
  { id: "RM-103", name: "Lab A-105", building: "Building A", type: "Computer Lab", capacity: 35, equipment: ["Intel i9 Workstations", "Dual Monitors"], utilization: 95, status: "Allocated" },
  { id: "RM-104", name: "Auditorium Main", building: "Main Block", type: "Auditorium", capacity: 250, equipment: ["4K Projector", "Wireless Mic", "Stage"], utilization: 60, status: "Available" },
  { id: "RM-105", name: "Hall B-110", building: "Building B", type: "Lecture Hall", capacity: 60, equipment: ["Smart Board", "Surround Sound"], utilization: 85, status: "PPO Optimized" },
];

export default function RoomsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRooms = MOCK_ROOMS.filter(
    (r) =>
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.building.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-[1400px] mx-auto pb-12 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-1">
            <DoorOpen className="w-4 h-4" />
            <span>SMART FACILITIES MATRIX</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Smart Rooms & Facilities</h1>
          <p className="text-zinc-400 text-sm mt-1">
            Real-time space utilization, equipment allocation, and capacity optimization.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center gap-2">
            <Zap className="w-3.5 h-3.5" />
            <span>55 Active Rooms Tracked</span>
          </span>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <GlowCard glowColor="purple" customSize className="p-6 space-y-2">
          <div className="text-xs font-mono text-zinc-400 uppercase">Avg Room Utilization</div>
          <div className="text-3xl font-extrabold text-white font-mono">92.0%</div>
          <p className="text-xs text-emerald-400 font-semibold">+24% gain post PPO policy rollout.</p>
        </GlowCard>

        <GlowCard glowColor="blue" customSize className="p-6 space-y-2">
          <div className="text-xs font-mono text-zinc-400 uppercase">Computer Labs</div>
          <div className="text-3xl font-extrabold text-indigo-400 font-mono">14 Labs</div>
          <p className="text-xs text-zinc-400">High-end GPU rigs & AI practical slots.</p>
        </GlowCard>

        <GlowCard glowColor="green" customSize className="p-6 space-y-2">
          <div className="text-xs font-mono text-zinc-400 uppercase">Hard Room Conflicts</div>
          <div className="text-3xl font-extrabold text-emerald-400 font-mono">0 Conflicts</div>
          <p className="text-xs text-zinc-400">Constraint satisfaction verified in Supabase.</p>
        </GlowCard>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search room, building, or type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
        
        <div className="text-xs font-mono text-zinc-500">
          Showing {filteredRooms.length} of {MOCK_ROOMS.length} facility entries
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-md overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-950/80 text-[11px] font-mono uppercase text-zinc-400">
              <th className="p-4">Facility Name</th>
              <th className="p-4">Type & Building</th>
              <th className="p-4">Capacity</th>
              <th className="p-4">Equipment Hardware</th>
              <th className="p-4">Utilization</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60 text-xs font-sans">
            {filteredRooms.map((room) => (
              <tr key={room.id} className="hover:bg-zinc-800/40 transition-colors">
                <td className="p-4">
                  <div className="font-bold text-white flex items-center gap-2">
                    <DoorOpen className="w-4 h-4 text-indigo-400" />
                    <span>{room.name}</span>
                  </div>
                  <div className="text-[11px] text-zinc-500 font-mono mt-0.5">{room.id}</div>
                </td>
                <td className="p-4">
                  <div className="text-zinc-200 font-medium">{room.type}</div>
                  <div className="text-[11px] text-zinc-500 font-mono">{room.building}</div>
                </td>
                <td className="p-4 font-mono text-zinc-300 font-bold">
                  {room.capacity} seats
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {room.equipment.map((eq) => (
                      <span key={eq} className="px-2 py-0.5 rounded bg-zinc-800/80 border border-zinc-700 text-zinc-300 font-mono text-[11px]">
                        {eq}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-4 font-mono">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">{room.utilization}%</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] border border-emerald-500/20">
                      {room.status}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
