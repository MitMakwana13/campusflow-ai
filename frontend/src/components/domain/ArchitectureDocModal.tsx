"use client";

import { BookOpen, Cpu, BrainCircuit, ShieldAlert, Sparkles, X, CheckCircle2, Layers } from "lucide-react";

interface ArchitectureDocModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ArchitectureDocModal({ isOpen, onClose }: ArchitectureDocModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8 max-w-3xl w-full space-y-6 shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Architecture & System Boundaries Specification</h3>
              <p className="text-xs text-zinc-400 font-mono">Formal documentation of production vs simulation mechanisms</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Section 1: Training vs Inference */}
        <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
          <div className="flex items-center gap-2 text-indigo-400 font-mono font-bold text-xs uppercase">
            <Cpu className="w-4 h-4" />
            <span>1. Training vs Inference Pipeline</span>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed font-sans">
            To ensure sub-second web responsiveness, CampusFlow AI does not retrain neural networks on live HTTP user requests.
            The PPO policy model is pre-trained offline in Python using <strong>Stable-Baselines3</strong> and <strong>PyTorch</strong>, saved as <strong><code className="text-emerald-400">ppo_v1.zip</code></strong>.
            When users click &quot;Run PPO Optimizer&quot;, FastAPI executes <strong>PPO Inference (<code className="text-emerald-400">model.predict(obs)</code>)</strong> over state rollouts in ~500 ms.
          </p>
        </div>

        {/* Section 2: Reward Policy Execution */}
        <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
          <div className="flex items-center gap-2 text-purple-400 font-mono font-bold text-xs uppercase">
            <BrainCircuit className="w-4 h-4" />
            <span>2. Reward Weights & Policy Re-Evaluation</span>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed font-sans">
            Tuning sliders in <strong>Scheduling Optimization Priorities</strong> updates the multi-objective reward penalty vector in the Gymnasium environment (<code className="text-purple-300">TimetableEnv-v1</code>). 
            During inference, candidate schedule actions are ranked against the configured penalty functions (hard double bookings: 10x, faculty workload caps: 8x, lunch break protection: 4x).
          </p>
        </div>

        {/* Section 3: Measured vs Estimated Preview */}
        <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold text-xs uppercase">
            <Layers className="w-4 h-4" />
            <span>3. Measured vs Estimated Preview Metrics</span>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed font-sans">
            All numerical scores displayed in the <strong>Optimization Profiles Modal</strong> are labeled as <em>Predicted Policy Estimates (Simulation Preview)</em>. 
            Once applied, the system executes full inference and logs <strong>Measured Post-Inference Impact</strong> directly to the Supabase Audit Stream and Run History Comparison table.
          </p>
        </div>

        {/* Section 4: System Boundaries */}
        <div className="p-5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 space-y-3">
          <div className="flex items-center gap-2 text-indigo-300 font-mono font-bold text-xs uppercase">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span>4. Current System Boundaries & Future Roadmap</span>
          </div>
          <ul className="text-xs text-zinc-300 space-y-1 font-mono list-disc list-inside">
            <li><strong>AI Copilot LLM</strong>: Uses structured intent schema v1.0; streams from local Ollama daemon (<code className="text-indigo-300">localhost:11434</code>) when active.</li>
            <li><strong>Verification Checkpoint</strong>: 10/10 automated tests pass via CLI (<code className="text-emerald-400">python verify_project.py</code>).</li>
            <li><strong>Roadmap Depth</strong>: Drag-and-drop calendar canvas and PDF executive workload exports.</li>
          </ul>
        </div>

      </div>
    </div>
  );
}
