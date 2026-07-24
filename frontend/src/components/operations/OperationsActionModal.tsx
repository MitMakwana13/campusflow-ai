"use client";

import { useState } from "react";
import { 
  Plus, 
  Calendar, 
  UserX, 
  Wrench, 
  BrainCircuit, 
  CheckCircle2, 
  AlertTriangle, 
  X, 
  Sparkles,
  Clock,
  DoorOpen,
  UserCheck
} from "lucide-react";

interface OperationsActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onActionComplete: (type: string, details: string) => void;
}

type ActionType = "event" | "leave" | "maintenance";

export function OperationsActionModal({ isOpen, onClose, onActionComplete }: OperationsActionModalProps) {
  const [activeTab, setActiveTab] = useState<ActionType>("event");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [affectedSlots, setAffectedSlots] = useState<string | null>(null);

  // Form states
  const [eventTitle, setEventTitle] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("Dr. Thaker");
  const [selectedRoom, setSelectedRoom] = useState("Auditorium Main");
  const [selectedDate, setSelectedDate] = useState("Wednesday, 11:05 AM");

  if (!isOpen) return null;

  const handleSimulateAction = (type: ActionType) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      if (type === "leave") {
        setAffectedSlots("2 lectures affected (IMBTTO306 & IIQATO301). AI recommends re-allocating to Friday or assigning Ms. Chakrabarty.");
      } else if (type === "maintenance") {
        setAffectedSlots("4 practical sessions affected in Lab B-222. AI recommends routing sessions to Lab C-231.");
      } else {
        setAffectedSlots("Auditorium Main reserved. 0 conflicts with current PPO timetable.");
      }
    }, 600);
  };

  const handleApplyResolution = () => {
    onActionComplete(activeTab, affectedSlots || "Action logged and integrated into PPO constraint solver.");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8 max-w-xl w-full space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase">
              Campus Operations Dispatch
            </span>
            <h3 className="text-xl font-bold text-white mt-1">Schedule Operations Console</h3>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="grid grid-cols-3 gap-2 bg-zinc-950 p-1.5 rounded-2xl border border-zinc-800">
          <button
            onClick={() => { setActiveTab("event"); setAffectedSlots(null); }}
            className={`flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === "event" 
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20" 
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Add Event</span>
          </button>

          <button
            onClick={() => { setActiveTab("leave"); setAffectedSlots(null); }}
            className={`flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === "leave" 
                ? "bg-rose-600 text-white shadow-md shadow-rose-500/20" 
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <UserX className="w-3.5 h-3.5" />
            <span>Faculty Leave</span>
          </button>

          <button
            onClick={() => { setActiveTab("maintenance"); setAffectedSlots(null); }}
            className={`flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === "maintenance" 
                ? "bg-amber-600 text-white shadow-md shadow-amber-500/20" 
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Maintenance</span>
          </button>
        </div>

        {/* Form Body */}
        <div className="space-y-4 text-xs">
          
          {activeTab === "event" && (
            <>
              <div className="space-y-1">
                <label className="text-zinc-400 font-mono">Event / Seminar Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. AI in Healthcare Guest Lecture" 
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-zinc-400 font-mono">Host Faculty</label>
                  <select 
                    value={selectedFaculty} 
                    onChange={(e) => setSelectedFaculty(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option>Dr. Thaker</option>
                    <option>Ms. Chakrabarty</option>
                    <option>Prof. R. V. Patel</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-400 font-mono">Target Facility</label>
                  <select 
                    value={selectedRoom} 
                    onChange={(e) => setSelectedRoom(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option>Auditorium Main</option>
                    <option>Hall C-231</option>
                    <option>Lab B-222</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {activeTab === "leave" && (
            <>
              <div className="space-y-1">
                <label className="text-zinc-400 font-mono">Select Absentee Faculty</label>
                <select 
                  value={selectedFaculty} 
                  onChange={(e) => setSelectedFaculty(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option>Dr. Thaker (Computer Science)</option>
                  <option>Ms. Chakrabarty (Artificial Intelligence)</option>
                  <option>Prof. R. V. Patel (Information Tech)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-zinc-400 font-mono">Leave Date / Slot</label>
                <input 
                  type="text" 
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>
            </>
          )}

          {activeTab === "maintenance" && (
            <>
              <div className="space-y-1">
                <label className="text-zinc-400 font-mono">Facility to Block</label>
                <select 
                  value={selectedRoom} 
                  onChange={(e) => setSelectedRoom(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option>Lab B-222 (GPU Rig Renovation)</option>
                  <option>Hall C-231 (Projector Repair)</option>
                  <option>Auditorium Main (Stage Setup)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-zinc-400 font-mono">Maintenance Reason</label>
                <input 
                  type="text" 
                  placeholder="Network Hardware Upgrade" 
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </>
          )}

          {/* AI Check Result */}
          {affectedSlots && (
            <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 space-y-3 animate-in fade-in duration-300">
              <div className="flex items-center gap-2 text-indigo-300 font-mono font-bold text-xs">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>AI Intent Impact Assessment</span>
              </div>
              <p className="text-zinc-200 leading-relaxed font-sans">{affectedSlots}</p>
            </div>
          )}

        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
          <button 
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold transition-all"
          >
            Cancel
          </button>

          {!affectedSlots ? (
            <button 
              onClick={() => handleSimulateAction(activeTab)}
              disabled={isSubmitting}
              className="px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all shadow-md shadow-indigo-500/20 disabled:opacity-50 flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Evaluating AI Constraints...</span>
                </>
              ) : (
                <>
                  <BrainCircuit className="w-4 h-4" />
                  <span>Evaluate with PPO</span>
                </>
              )}
            </button>
          ) : (
            <button 
              onClick={handleApplyResolution}
              className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-all shadow-md shadow-emerald-500/20 flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Apply & Re-Optimize Timetable</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
