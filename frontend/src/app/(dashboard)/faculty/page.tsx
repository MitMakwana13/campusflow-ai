"use client";

import { useState } from "react";
import { Users, Search, Filter, CheckCircle2, BookOpen, Clock, ShieldCheck, Award } from "lucide-react";
import { GlowCard } from "@/components/ui/spotlight-card";

interface FacultyMember {
  id: string;
  name: string;
  role: string;
  department: string;
  courses: string[];
  weeklyHours: number;
  maxHours: number;
  status: "Balanced" | "Optimal" | "Near Limit";
}

const MOCK_FACULTY: FacultyMember[] = [
  { id: "FAC-101", name: "Dr. Thaker", role: "Associate Professor", department: "Computer Science", courses: ["BScIT-501", "MScAI-101"], weeklyHours: 14, maxHours: 16, status: "Balanced" },
  { id: "FAC-102", name: "Ms. Chakrabarty", role: "Assistant Professor", department: "Artificial Intelligence", courses: ["MScAI-302", "BScIT-201"], weeklyHours: 12, maxHours: 16, status: "Optimal" },
  { id: "FAC-103", name: "Prof. R. V. Patel", role: "Head of Department", department: "Information Technology", courses: ["IT-401", "IT-602"], weeklyHours: 10, maxHours: 14, status: "Optimal" },
  { id: "FAC-104", name: "Dr. Ananya Sharma", role: "Associate Professor", department: "Data Science", courses: ["DS-301", "DS-502"], weeklyHours: 15, maxHours: 16, status: "Near Limit" },
  { id: "FAC-105", name: "Dr. K. S. Mehta", role: "Assistant Professor", department: "Cybersecurity", courses: ["SEC-201", "SEC-402"], weeklyHours: 12, maxHours: 16, status: "Optimal" },
];

export default function FacultyPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFaculty = MOCK_FACULTY.filter(
    (f) =>
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.courses.some((c) => c.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-8 max-w-[1400px] mx-auto pb-12 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-1">
            <Users className="w-4 h-4" />
            <span>INSTITUTIONAL ROSTER</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Faculty Directory & Workload</h1>
          <p className="text-zinc-400 text-sm mt-1">
            PPO load-balanced faculty scheduling, weekly constraints, and active course assignments.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>PPO Workload Balance Active</span>
          </span>
        </div>
      </div>

      {/* Roster Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <GlowCard glowColor="blue" customSize className="p-6 space-y-2">
          <div className="text-xs font-mono text-zinc-400 uppercase">Total Faculty</div>
          <div className="text-3xl font-extrabold text-white font-mono">18 Professors</div>
          <p className="text-xs text-zinc-400">AURO SIT Department of Computing.</p>
        </GlowCard>

        <GlowCard glowColor="purple" customSize className="p-6 space-y-2">
          <div className="text-xs font-mono text-zinc-400 uppercase">Avg Workload</div>
          <div className="text-3xl font-extrabold text-indigo-400 font-mono">12.6 hrs / wk</div>
          <p className="text-xs text-emerald-400 font-semibold">Zero back-to-back burnout slots.</p>
        </GlowCard>

        <GlowCard glowColor="green" customSize className="p-6 space-y-2">
          <div className="text-xs font-mono text-zinc-400 uppercase">Max Threshold</div>
          <div className="text-3xl font-extrabold text-emerald-400 font-mono">16.0 hrs max</div>
          <p className="text-xs text-zinc-400">Enforced strictly in Gymnasium reward function.</p>
        </GlowCard>
      </div>

      {/* Search & Table Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search faculty or course..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
        
        <div className="text-xs font-mono text-zinc-500">
          Showing {filteredFaculty.length} of {MOCK_FACULTY.length} records
        </div>
      </div>

      {/* Faculty Data Table */}
      <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-md overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-950/80 text-[11px] font-mono uppercase text-zinc-400">
              <th className="p-4">Faculty Member</th>
              <th className="p-4">Department</th>
              <th className="p-4">Assigned Courses</th>
              <th className="p-4">Weekly Workload</th>
              <th className="p-4">PPO Balance Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60 text-xs font-sans">
            {filteredFaculty.map((fac) => (
              <tr key={fac.id} className="hover:bg-zinc-800/40 transition-colors">
                <td className="p-4">
                  <div className="font-bold text-white">{fac.name}</div>
                  <div className="text-[11px] text-zinc-500 font-mono">{fac.role}</div>
                </td>
                <td className="p-4 text-zinc-300 font-medium">{fac.department}</td>
                <td className="p-4">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {fac.courses.map((c) => (
                      <span key={c} className="px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-indigo-300 font-mono text-[11px]">
                        {c}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-4 font-mono">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold">{fac.weeklyHours} hrs</span>
                    <span className="text-zinc-500">/ {fac.maxHours} max</span>
                  </div>
                  <div className="w-24 h-1.5 rounded-full bg-zinc-800 mt-1 overflow-hidden">
                    <div 
                      className="h-full bg-indigo-500" 
                      style={{ width: `${(fac.weeklyHours / fac.maxHours) * 100}%` }}
                    />
                  </div>
                </td>
                <td className="p-4 font-mono">
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                    fac.status === "Optimal" 
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : fac.status === "Balanced"
                      ? "bg-indigo-500/10 text-indigo-300 border-indigo-500/20"
                      : "bg-amber-500/10 text-amber-300 border-amber-500/20"
                  }`}>
                    {fac.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
