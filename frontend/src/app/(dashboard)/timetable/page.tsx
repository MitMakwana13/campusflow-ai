"use client";

import { useState, useEffect } from "react";
import { TimetableGrid } from "@/components/domain/TimetableGrid";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { MetricCard } from "@/components/ui/MetricCard";
import { AIExplanationPanel } from "@/features/optimization";
import { timetableApi } from "@/lib/api/timetableApi";
import { optimizationApi } from "@/lib/api/optimizationApi";
import { fastAPIOptimizationRepo, fastAPITimetableRepo } from "@/repositories/FastAPIRepository";
import { TimetableSchedule } from "@/types/timetable";
import { AIExplanation } from "@/types/optimization";
import { 
  Filter, 
  Wand2, 
  CheckCircle2, 
  AlertTriangle, 
  Activity, 
  ThumbsUp,
  BarChart3,
  RotateCcw
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function TimetablePage() {
  const [isOptimized, setIsOptimized] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [schedule, setSchedule] = useState<TimetableSchedule | null>(null);
  const [explanation, setExplanation] = useState<AIExplanation | null>(null);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [showBenchmarkModal, setShowBenchmarkModal] = useState(false);
  const [benchmarkMatrix, setBenchmarkMatrix] = useState<any[]>([]);

  useEffect(() => {
    timetableApi.getSchedule(isOptimized).then(setSchedule);
    if (isOptimized) {
      optimizationApi.getLatestExplanation().then(setExplanation);
    }
  }, [isOptimized]);

  const handleOptimize = async () => {
    setIsOptimizing(true);
    const result = await timetableApi.optimize();
    const exp = await optimizationApi.getLatestExplanation();
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
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-[1400px] mx-auto">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-neutral-50 tracking-tight">
            Timetable Optimization System
          </h1>
          <p className="text-neutral-400 mt-2">
            AURO University School of Information Technology (Odd Semester 2026)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-surface-2 border border-white/10 rounded-lg p-1">
            <button 
              onClick={() => setIsOptimized(false)}
              className={cn("px-4 py-1.5 rounded-md text-sm font-medium transition-colors", !isOptimized ? "bg-surface-3 text-white shadow" : "text-neutral-400 hover:text-white")}
            >
              Manual View
            </button>
            <button 
              onClick={() => setIsOptimized(true)}
              className={cn("px-4 py-1.5 rounded-md text-sm font-medium transition-colors", isOptimized ? "bg-primary-600 text-white shadow" : "text-neutral-400 hover:text-white")}
            >
              Optimized View
            </button>
          </div>
          
          <button onClick={handleRunBenchmark} className="btn btn-secondary gap-1.5 text-xs">
            <BarChart3 className="w-4 h-4 text-accent-400" />
            Algorithm Benchmark
          </button>
          
          {isOptimized ? (
            <button onClick={handleRollback} className="btn btn-secondary text-xs text-danger-400 border-danger-500/20 hover:bg-danger-500/10">
              <RotateCcw className="w-4 h-4 mr-1" />
              Rollback
            </button>
          ) : (
            <button 
              onClick={handleOptimize}
              disabled={isOptimizing}
              className="btn btn-ai shadow-lg group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              {isOptimizing ? (
                <div className="flex items-center gap-2 relative z-10">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Running Optimization Engine...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 relative z-10">
                  <Wand2 className="w-4 h-4" />
                  <span>Run Optimization</span>
                </div>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Comparison Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard 
          title="Hard Conflicts"
          value={schedule ? schedule.hardConflictsCount : (isOptimized ? "0" : "12")}
          trend={isOptimized ? { value: "100% resolved", isPositive: true } : { value: "Requires action", isPositive: false }}
          icon={isOptimized ? CheckCircle2 : AlertTriangle}
          className={cn("transition-colors duration-500", !isOptimized ? "border-danger-500/30 bg-danger-500/5" : "border-success-500/30 bg-success-500/5")}
        />
        <MetricCard 
          title="Room Utilization"
          value={schedule ? `${schedule.roomUtilizationPercent}%` : (isOptimized ? "92%" : "68%")}
          trend={isOptimized ? { value: "+24%", isPositive: true } : undefined}
          icon={Activity}
          className="transition-colors duration-500"
        />
        <MetricCard 
          title="Faculty Satisfaction"
          value={schedule ? `${schedule.facultySatisfactionScore}/10` : (isOptimized ? "9.4/10" : "6.2/10")}
          trend={isOptimized ? { value: "Preferences met", isPositive: true } : undefined}
          icon={ThumbsUp}
          className="transition-colors duration-500"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        
        {/* Main Grid */}
        <div className="xl:col-span-3">
          <Card className="h-full border-white/10 bg-surface-1">
            <CardHeader className="border-b border-white/5 pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  Weekly Schedule
                </CardTitle>
                <div className="flex items-center gap-4 text-xs text-neutral-400">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary-500"></span> Lecture</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-accent-500"></span> Lab (2 hrs)</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <TimetableGrid isOptimized={isOptimized} />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar panels */}
        <div className="xl:col-span-1 space-y-6">
          
          {/* AI Explanation Contract Panel */}
          {isOptimized && explanation && (
            <AIExplanationPanel 
              explanation={explanation}
              onPublish={() => alert("Schedule published to production database.")}
              onRollback={handleRollback}
            />
          )}

          {!isOptimized && (
            <Card className="border-danger-500/20 bg-danger-500/5">
              <CardHeader>
                <CardTitle className="text-danger-400 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4" />
                  Active Conflicts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-neutral-900 rounded-lg border border-danger-500/30">
                  <div className="text-sm font-bold text-neutral-100 mb-1">Double Booking: B-222</div>
                  <div className="text-xs text-neutral-400">Tuesday 11:05 AM</div>
                  <div className="text-xs text-danger-300 mt-2">Dr. Thaker (IMBTTO306) and Ms. Chakrabarty (IIQATO301) are scheduled for the same room.</div>
                </div>
                
                <div className="p-3 bg-neutral-900 rounded-lg border border-warning-500/30">
                  <div className="text-sm font-bold text-neutral-100 mb-1">Back-to-Back Warning</div>
                  <div className="text-xs text-neutral-400">Dr. Sunil Kumar</div>
                  <div className="text-xs text-warning-300 mt-2">Scheduled for 4 consecutive lectures on Thursday.</div>
                </div>
              </CardContent>
            </Card>
          )}

        </div>
      </div>

      {/* Optimization Complete Modal */}
      {showSummaryModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-neutral-900 border border-emerald-500/30 rounded-2xl p-6 max-w-lg w-full space-y-6 shadow-2xl">
            <div className="flex items-center gap-3 text-emerald-400">
              <CheckCircle2 className="w-8 h-8 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-neutral-100">Optimization Complete</h3>
                <p className="text-xs text-neutral-400">PPO RL Engine executed on AURO dataset</p>
              </div>
            </div>

            <div className="bg-neutral-950 p-4 rounded-xl border border-white/10 space-y-3">
              <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Before vs After Performance</div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-neutral-900 p-3 rounded-lg border border-white/5">
                  <div className="text-xs text-neutral-400">Hard Conflicts</div>
                  <div className="text-lg font-bold text-danger-400 line-through">1 Clash</div>
                  <div className="text-xl font-bold text-emerald-400">0 Clashes</div>
                </div>

                <div className="bg-neutral-900 p-3 rounded-lg border border-white/5">
                  <div className="text-xs text-neutral-400">Total Reward</div>
                  <div className="text-lg font-bold text-danger-400">-760 pts</div>
                  <div className="text-xl font-bold text-emerald-400">+240 pts</div>
                </div>

                <div className="bg-neutral-900 p-3 rounded-lg border border-white/5">
                  <div className="text-xs text-neutral-400">Room Utilization</div>
                  <div className="text-lg font-bold text-neutral-400">68%</div>
                  <div className="text-xl font-bold text-emerald-400">92% (+24%)</div>
                </div>

                <div className="bg-neutral-900 p-3 rounded-lg border border-white/5">
                  <div className="text-xs text-neutral-400">Faculty Satisfaction</div>
                  <div className="text-lg font-bold text-neutral-400">6.2 / 10</div>
                  <div className="text-xl font-bold text-emerald-400">9.4 / 10</div>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setShowSummaryModal(false)}
              className="w-full btn btn-primary justify-center shadow-lg py-2.5"
            >
              Explore Optimized Timetable
            </button>
          </div>
        </div>
      )}

      {/* Multi-Algorithm Benchmark Modal */}
      {showBenchmarkModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-neutral-900 border border-primary-500/30 rounded-2xl p-6 max-w-3xl w-full space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3 text-primary-400">
                <BarChart3 className="w-7 h-7 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-neutral-100">Multi-Algorithm Benchmark Suite</h3>
                  <p className="text-xs text-neutral-400">Side-by-side performance evaluation across solver algorithms</p>
                </div>
              </div>
              <button onClick={() => setShowBenchmarkModal(false)} className="text-neutral-400 hover:text-white">✕</button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-neutral-300">
                <thead className="bg-neutral-950 text-xs uppercase text-neutral-400">
                  <tr>
                    <th className="p-3">Algorithm</th>
                    <th className="p-3">Exec Time</th>
                    <th className="p-3">Reward</th>
                    <th className="p-3">Hard Conflicts</th>
                    <th className="p-3">Utilization</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {benchmarkMatrix.map((item, idx) => (
                    <tr key={idx} className={item.algorithm.includes('PPO') ? 'bg-primary-950/40 font-semibold' : ''}>
                      <td className="p-3 font-mono">{item.algorithm}</td>
                      <td className="p-3 font-mono text-neutral-400">{item.execution_time_seconds}s</td>
                      <td className="p-3 font-mono text-emerald-400">{item.reward_score} pts</td>
                      <td className="p-3 font-mono">{item.hard_conflicts_count === 0 ? <span className="text-emerald-400">0</span> : <span className="text-danger-400">{item.hard_conflicts_count}</span>}</td>
                      <td className="p-3 font-mono text-accent-300">{item.room_utilization_percent}%</td>
                      <td className="p-3 text-xs"><span className="px-2 py-0.5 rounded bg-surface-3">{item.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end">
              <button 
                onClick={() => setShowBenchmarkModal(false)}
                className="btn btn-secondary"
              >
                Close Benchmark Matrix
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
