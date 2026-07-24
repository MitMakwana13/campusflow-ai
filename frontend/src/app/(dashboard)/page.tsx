import { MetricCard } from "@/components/ui/MetricCard";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Activity, Users, DoorOpen, CalendarDays, BrainCircuit, Wand2 } from "lucide-react";
import { CampusLiveFeed } from "@/features/dashboard";
import { MOCK_ACTIVITY_FEED, MOCK_CAMPUS_HEALTH } from "@/lib/mock/dashboard";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-[1400px] mx-auto">
      
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-neutral-50 tracking-tight">
            Command Center
          </h1>
          <p className="text-neutral-400 mt-2">
            Overview of AURO University campus operations for Odd Semester 2026.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        
        {/* 1. Campus Health */}
        <MetricCard 
          title="Campus Health"
          value={`${MOCK_CAMPUS_HEALTH.overallHealthPercent}%`}
          trend={{ value: "2.1%", isPositive: true }}
          icon={Activity}
          description="Overall operational efficiency score based on attendance and utilization."
        />

        {/* 2. Faculty Status */}
        <MetricCard 
          title="Faculty Status"
          value={MOCK_CAMPUS_HEALTH.facultyActiveCount}
          trend={{ value: "4 active leaves", isPositive: false }}
          icon={Users}
          description="Average workload is currently balanced at 16.2 hrs/week."
        />

        {/* 3. Room Utilization */}
        <MetricCard 
          title="Room Utilization"
          value={`${MOCK_CAMPUS_HEALTH.roomUtilizationPercent}%`}
          trend={{ value: "12%", isPositive: true }}
          icon={DoorOpen}
          description="Across 55 tracked spaces. Peak usage expected at 11:00 AM."
        />

        {/* 4. Today's Classes */}
        <MetricCard 
          title="Today's Classes"
          value={MOCK_CAMPUS_HEALTH.todayClassesCount}
          icon={CalendarDays}
          description="Across 8 schools. 4 lab sessions require special attention."
        />

        {/* 5. RL Engine Status */}
        <Card className="flex flex-col justify-between">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-neutral-400 uppercase tracking-wider">
                Optimization Engine Status
              </CardTitle>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-success-500"></span>
                </span>
                <span className="text-xs font-mono text-success-500">ONLINE</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-neutral-50 mb-4 flex items-center gap-2">
              <BrainCircuit className="w-6 h-6 text-primary-400" />
              <span>TimetablePPO-v2.1</span>
            </div>
            <div className="space-y-2 text-sm text-neutral-400">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Last Training Run:</span>
                <span className="text-neutral-100">04:30 AM (IST)</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Total Episodes:</span>
                <span className="text-neutral-100 font-mono">1.2M</span>
              </div>
              <div className="flex justify-between pb-1">
                <span>Current Reward Avg:</span>
                <span className="text-success-400 font-mono">+485.2</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 6. Generate Timetable CTA */}
        <Card className="card-ai border-primary-500/30 flex flex-col justify-center items-center text-center p-8 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/10 to-accent-600/10 z-0 opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="z-10 bg-primary-950/50 p-4 rounded-2xl border border-primary-500/20 mb-6 group-hover:scale-110 transition-transform duration-500">
            <Wand2 className="w-10 h-10 text-primary-400" />
          </div>
          
          <h3 className="text-2xl font-display font-bold text-white mb-2 z-10">
            Optimize Timetable
          </h3>
          <p className="text-primary-200/70 text-sm mb-8 max-w-[240px] z-10">
            Run the optimization engine to generate a conflict-free schedule for AURO University.
          </p>
          
          <Link 
            href={ROUTES.TIMETABLE}
            className="z-10 btn btn-ai w-full shadow-lg"
          >
            Launch Engine
          </Link>
        </Card>

      </div>

      {/* Live Operational Stream / Feed */}
      <CampusLiveFeed feedItems={MOCK_ACTIVITY_FEED} />
    </div>
  );
}
