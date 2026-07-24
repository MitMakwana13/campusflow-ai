"use client";

import { useState } from "react";
import { BookOpen, Search, GraduationCap, Clock, CheckCircle2, Layers } from "lucide-react";
import { GlowCard } from "@/components/ui/spotlight-card";

interface Course {
  code: string;
  title: string;
  department: string;
  credits: number;
  enrolledStudents: number;
  requiredRoomType: "Computer Lab" | "Lecture Hall";
  assignedFaculty: string;
  weeklySlots: number;
}

const MOCK_COURSES: Course[] = [
  { code: "BScIT-501", title: "Reinforcement Learning & Neural Net Systems", department: "Computer Science", credits: 4, enrolledStudents: 42, requiredRoomType: "Computer Lab", assignedFaculty: "Dr. Thaker", weeklySlots: 4 },
  { code: "MScAI-302", title: "Deep Learning Architectures & PyTorch", department: "Artificial Intelligence", credits: 4, enrolledStudents: 38, requiredRoomType: "Computer Lab", assignedFaculty: "Ms. Chakrabarty", weeklySlots: 4 },
  { code: "IT-401", title: "Cloud Database Distributed Systems", department: "Information Technology", credits: 3, enrolledStudents: 60, requiredRoomType: "Lecture Hall", assignedFaculty: "Prof. R. V. Patel", weeklySlots: 3 },
  { code: "DS-301", title: "Statistical Machine Learning & Data Mining", department: "Data Science", credits: 4, enrolledStudents: 45, requiredRoomType: "Computer Lab", assignedFaculty: "Dr. Ananya Sharma", weeklySlots: 4 },
  { code: "SEC-201", title: "Cybersecurity & Network Protocol Defense", department: "Cybersecurity", credits: 3, enrolledStudents: 50, requiredRoomType: "Lecture Hall", assignedFaculty: "Dr. K. S. Mehta", weeklySlots: 3 },
];

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCourses = MOCK_COURSES.filter(
    (c) =>
      c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-[1400px] mx-auto pb-12 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 mb-1">
            <BookOpen className="w-4 h-4" />
            <span>ACADEMIC CURRICULUM CATALOG</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Course Directory & Schedules</h1>
          <p className="text-zinc-400 text-sm mt-1">
            Institutional course catalog, credit allocations, and facility requirements for PPO timetable synthesis.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-purple-500/10 text-purple-300 border border-purple-500/20 flex items-center gap-2">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>AURO SIT Odd Semester 2026</span>
          </span>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <GlowCard glowColor="purple" customSize className="p-6 space-y-2">
          <div className="text-xs font-mono text-zinc-400 uppercase">Active Courses</div>
          <div className="text-3xl font-extrabold text-white font-mono">24 Courses</div>
          <p className="text-xs text-zinc-400">BSc IT, MSc AI, and Data Science programs.</p>
        </GlowCard>

        <GlowCard glowColor="blue" customSize className="p-6 space-y-2">
          <div className="text-xs font-mono text-zinc-400 uppercase">Total Enrollment</div>
          <div className="text-3xl font-extrabold text-indigo-400 font-mono">480 Students</div>
          <p className="text-xs text-zinc-400">Allocated across lecture halls & labs.</p>
        </GlowCard>

        <GlowCard glowColor="green" customSize className="p-6 space-y-2">
          <div className="text-xs font-mono text-zinc-400 uppercase">Weekly Time Slots</div>
          <div className="text-3xl font-extrabold text-emerald-400 font-mono">86 Slots</div>
          <p className="text-xs text-emerald-400 font-semibold">100% scheduled with 0 hard conflicts.</p>
        </GlowCard>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search code, title, or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
        
        <div className="text-xs font-mono text-zinc-500">
          Showing {filteredCourses.length} of {MOCK_COURSES.length} courses
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-md overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-950/80 text-[11px] font-mono uppercase text-zinc-400">
              <th className="p-4">Course Code & Title</th>
              <th className="p-4">Department</th>
              <th className="p-4">Credits & Enrolled</th>
              <th className="p-4">Facility Requirement</th>
              <th className="p-4">Assigned Faculty</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60 text-xs font-sans">
            {filteredCourses.map((c) => (
              <tr key={c.code} className="hover:bg-zinc-800/40 transition-colors">
                <td className="p-4">
                  <div className="font-bold text-white flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-mono text-[11px]">
                      {c.code}
                    </span>
                    <span>{c.title}</span>
                  </div>
                </td>
                <td className="p-4 text-zinc-300 font-medium">{c.department}</td>
                <td className="p-4 font-mono">
                  <div className="text-white font-bold">{c.credits} Credits</div>
                  <div className="text-[11px] text-zinc-500">{c.enrolledStudents} students</div>
                </td>
                <td className="p-4 font-mono">
                  <span className={`px-2.5 py-1 rounded-full text-[11px] border font-semibold ${
                    c.requiredRoomType === "Computer Lab" 
                      ? "bg-purple-500/10 text-purple-300 border-purple-500/20"
                      : "bg-indigo-500/10 text-indigo-300 border-indigo-500/20"
                  }`}>
                    {c.requiredRoomType}
                  </span>
                </td>
                <td className="p-4 font-mono text-zinc-300 font-semibold">
                  {c.assignedFaculty}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
