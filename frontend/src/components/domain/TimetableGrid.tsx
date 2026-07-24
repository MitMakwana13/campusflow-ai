"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

// Mock Data based on AURO Real Data from blueprint
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const SLOTS = [
  "10:00 - 11:00",
  "11:05 - 12:05",
  "12:10 - 01:10",
  "01:40 - 02:40",
  "02:45 - 03:45",
  "03:50 - 04:50",
];

// 12:10 - 01:10 is slot 3, 01:10 - 01:40 is Lunch (Not a slot, just a gap)
// So we insert a visual gap after index 2.

interface TimetableGridProps {
  className?: string;
  isOptimized?: boolean;
}

export function TimetableGrid({ className, isOptimized = false }: TimetableGridProps) {
  // A helper to render a class block
  const ClassBlock = ({ course, faculty, room, type, isConflict = false, isResolved = false }: any) => (
    <div className={cn(
      "p-2 rounded-md border text-xs h-full flex flex-col justify-between transition-colors",
      isConflict 
        ? "bg-danger-500/10 border-danger-500/30" 
        : isResolved 
          ? "bg-success-500/10 border-success-500/30"
          : "bg-surface-2 border-white/5 hover:border-primary-500/50"
    )}>
      <div>
        <div className="font-bold text-neutral-100 flex justify-between">
          <span>{course}</span>
          <span className={cn("px-1 rounded text-[10px]", type === 'Lab' ? 'bg-accent-500/20 text-accent-300' : 'bg-primary-500/20 text-primary-300')}>{type}</span>
        </div>
        <div className="text-neutral-400 mt-1">{faculty}</div>
      </div>
      <div className="flex items-center justify-between mt-2">
        <span className="font-mono text-neutral-300 bg-neutral-900 px-1.5 py-0.5 rounded">{room}</span>
        {isConflict && <span className="text-danger-400 font-bold">! CLASH</span>}
        {isResolved && <span className="text-success-400 font-bold">✓ FIXED</span>}
      </div>
    </div>
  );

  return (
    <div className={cn("overflow-x-auto pb-4", className)}>
      <div className="min-w-[900px] border border-white/10 rounded-xl overflow-hidden bg-surface-1">
        
        {/* Header Row */}
        <div className="grid grid-cols-[80px_repeat(6,1fr)] border-b border-white/10 bg-neutral-900/50">
          <div className="p-3 border-r border-white/10 flex items-center justify-center">
            <span className="text-xs font-semibold text-neutral-500 uppercase">Time</span>
          </div>
          {DAYS.map(day => (
            <div key={day} className="p-3 border-r border-white/10 text-center font-medium text-neutral-300">
              {day}
            </div>
          ))}
        </div>

        {/* Body Rows */}
        <div className="flex flex-col">
          {SLOTS.map((time, slotIdx) => (
            <React.Fragment key={time}>
              <div className="grid grid-cols-[80px_repeat(6,1fr)] border-b border-white/5 min-h-[100px]">
                
                {/* Time Column */}
                <div className="p-2 border-r border-white/10 bg-neutral-900/20 flex flex-col items-center justify-center text-center">
                  <span className="text-xs font-mono text-neutral-400">{time.split(' - ')[0]}</span>
                  <span className="text-[10px] text-neutral-600">to</span>
                  <span className="text-xs font-mono text-neutral-400">{time.split(' - ')[1]}</span>
                </div>

                {/* Day Columns (Mock Data injected) */}
                {DAYS.map((day, dayIdx) => {
                  // Generate some mock classes. If not optimized, show a clash on Tuesday slot 2
                  if (!isOptimized && day === "Tuesday" && slotIdx === 1) {
                    return (
                      <div key={dayIdx} className="p-1 border-r border-white/5 relative">
                        {/* Conflict: Double booking */}
                        <div className="absolute inset-1 bottom-1/2 pb-0.5">
                          <ClassBlock course="IMBTTO306" faculty="Dr. Thaker" room="B-222" type="Lec" isConflict />
                        </div>
                        <div className="absolute inset-1 top-1/2 pt-0.5">
                          <ClassBlock course="IIQATO301" faculty="Ms. Chakrabarty" room="B-222" type="Lec" isConflict />
                        </div>
                      </div>
                    )
                  }

                  // If optimized, show the resolved state on Tuesday slot 2
                  if (isOptimized && day === "Tuesday" && slotIdx === 1) {
                    return (
                      <div key={dayIdx} className="p-1 border-r border-white/5">
                        <ClassBlock course="IMBTTO306" faculty="Dr. Thaker" room="B-222" type="Lec" isResolved />
                      </div>
                    )
                  }
                  
                  // Empty on Thursday slot 3
                  if (day === "Thursday" && slotIdx === 2) {
                    return <div key={dayIdx} className="p-1 border-r border-white/5"></div>
                  }

                  // Normal class
                  return (
                    <div key={dayIdx} className="p-1 border-r border-white/5">
                      <ClassBlock 
                        course={dayIdx % 2 === 0 ? "BScIT-501" : "MScAI-302"} 
                        faculty={dayIdx % 3 === 0 ? "Dr. Thaker" : "Ms. Chakrabarty"} 
                        room={dayIdx % 2 === 0 ? "C-231" : "B-222"} 
                        type={slotIdx === 3 ? "Lab" : "Lec"} 
                      />
                    </div>
                  )
                })}
              </div>

              {/* Lunch Break visualization after 3rd slot */}
              {slotIdx === 2 && (
                <div className="grid grid-cols-[80px_1fr] border-b border-white/10 bg-neutral-900/80">
                  <div className="p-1 border-r border-white/10 flex flex-col items-center justify-center text-center">
                    <span className="text-[10px] font-mono text-neutral-500">01:10 - 01:40</span>
                  </div>
                  <div className="p-1 flex items-center justify-center">
                    <span className="text-xs font-bold tracking-[0.5em] text-neutral-600 uppercase">Lunch Break</span>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
