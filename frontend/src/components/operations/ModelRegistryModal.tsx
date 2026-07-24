"use client";

import { useState } from "react";
import { Box, CheckCircle2, RotateCcw, X, ShieldCheck, Sparkles, Cpu, Clock, Terminal, ArrowUpRight, Award, Layers } from "lucide-react";

export interface ModelCheckpointRecord {
  id: string;
  name: string;
  version: string;
  status: "PRODUCTION" | "STAGING" | "EXPERIMENTAL" | "RESEARCH";
  createdDate: string;
  episodesTrained: number;
  evalReward: number;
  framework: string;
  sb3Version: string;
  pytorchVersion: string;
  envVersion: string;
  dataset: string;
  active: boolean;
  notes: string;
}

interface ModelRegistryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectActiveModel: (model: ModelCheckpointRecord) => void;
}

const DEFAULT_MODELS: ModelCheckpointRecord[] = [
  {
    id: "model-prod",
    name: "ppo_v1.zip",
    version: "1.4.2",
    status: "PRODUCTION",
    createdDate: "2026-07-18",
    episodesTrained: 50000,
    evalReward: 341.2,
    framework: "PyTorch 2.1.2",
    sb3Version: "2.9.0",
    pytorchVersion: "2.1.2+cpu",
    envVersion: "TimetableEnv-v1",
    dataset: "AURO Demo Dataset (30 courses)",
    active: true,
    notes: "Default active model for zero hard double-booking constraint policy.",
  },
  {
    id: "model-curriculum",
    name: "ppo_v1_curriculum.zip",
    version: "1.5.0-rc1",
    status: "STAGING",
    createdDate: "2026-07-22",
    episodesTrained: 75000,
    evalReward: 358.4,
    framework: "PyTorch 2.1.2",
    sb3Version: "2.9.0",
    pytorchVersion: "2.1.2+cpu",
    envVersion: "TimetableEnv-v2",
    dataset: "AURO Demo Dataset + 3-Stage Scale",
    active: false,
    notes: "Trained using progressive 3-stage curriculum learning for faster convergence.",
  },
  {
    id: "model-hybrid",
    name: "ppo_v2_hybrid.zip",
    version: "2.0.0-exp",
    status: "EXPERIMENTAL",
    createdDate: "2026-07-23",
    episodesTrained: 100000,
    evalReward: 372.0,
    framework: "PyTorch 2.1.2 + NetworkX",
    sb3Version: "2.9.0",
    pytorchVersion: "2.1.2+cpu",
    envVersion: "TimetableEnv-v2",
    dataset: "AURO Institutional Full Batch",
    active: false,
    notes: "Combines PPO policy rollouts with deterministic local search constraint repair.",
  },
  {
    id: "model-graph",
    name: "ppo_graph_v1.zip",
    version: "3.0.0-proto",
    status: "RESEARCH",
    createdDate: "2026-07-24",
    episodesTrained: 25000,
    evalReward: 310.5,
    framework: "PyTorch Geometric (PyG)",
    sb3Version: "2.9.0",
    pytorchVersion: "2.1.2+cpu",
    envVersion: "GraphTimetableEnv-v1",
    dataset: "Campus Heterogeneous Graph Schema",
    active: false,
    notes: "Research prototype using Graph Neural Network state representations.",
  },
];

export function ModelRegistryModal({ 
  isOpen, 
  onClose, 
  onSelectActiveModel 
}: ModelRegistryModalProps) {
  const [models, setModels] = useState<ModelCheckpointRecord[]>(DEFAULT_MODELS);

  if (!isOpen) return null;

  const handlePromoteModel = (selected: ModelCheckpointRecord) => {
    setModels(prev => prev.map(m => ({
      ...m,
      active: m.id === selected.id
    })));
    onSelectActiveModel(selected);
  };

  const getStatusBadge = (status: ModelCheckpointRecord["status"]) => {
    switch (status) {
      case "PRODUCTION":
        return <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono font-bold">PRODUCTION ✓</span>;
      case "STAGING":
        return <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[10px] font-mono font-bold">STAGING</span>;
      case "EXPERIMENTAL":
        return <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[10px] font-mono font-bold">EXPERIMENTAL</span>;
      case "RESEARCH":
        return <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-mono font-bold">RESEARCH</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8 max-w-4xl w-full space-y-6 shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Box className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">PPO Model Registry & Version Control</h3>
              <p className="text-xs text-zinc-400 font-mono">Manage, evaluate, and promote PyTorch RL policy checkpoints</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Models List */}
        <div className="space-y-4">
          {models.map((model) => (
            <div 
              key={model.id}
              className={`p-5 rounded-2xl border transition-all space-y-3 ${
                model.active 
                  ? "bg-indigo-500/10 border-indigo-500/40 shadow-lg shadow-indigo-500/5" 
                  : "bg-zinc-950 border-zinc-800/80 hover:border-zinc-700"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <span className="font-bold text-white font-mono text-base">{model.name}</span>
                    <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 text-[10px] font-mono">v{model.version}</span>
                    {getStatusBadge(model.status)}
                    {model.active && (
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold border border-emerald-500/30">
                        Active Policy
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-400 font-sans">{model.notes}</p>
                </div>

                <div>
                  {!model.active ? (
                    <button
                      onClick={() => handlePromoteModel(model)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all shadow-md shadow-indigo-500/20 font-mono"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                      <span>Promote to Active</span>
                    </button>
                  ) : (
                    <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono font-bold px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Loaded in Memory</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 pt-3 border-t border-zinc-800/80 text-[10px] font-mono">
                <div className="p-2 rounded-xl bg-zinc-900/60 border border-zinc-800">
                  <span className="text-zinc-500 uppercase block">Training Episodes</span>
                  <span className="text-zinc-200 font-bold">{model.episodesTrained.toLocaleString()}</span>
                </div>

                <div className="p-2 rounded-xl bg-zinc-900/60 border border-zinc-800">
                  <span className="text-zinc-500 uppercase block">Eval Reward</span>
                  <span className="text-emerald-400 font-bold">+{model.evalReward} pts</span>
                </div>

                <div className="p-2 rounded-xl bg-zinc-900/60 border border-zinc-800">
                  <span className="text-zinc-500 uppercase block">Framework</span>
                  <span className="text-indigo-400 font-bold">{model.framework}</span>
                </div>

                <div className="p-2 rounded-xl bg-zinc-900/60 border border-zinc-800">
                  <span className="text-zinc-500 uppercase block">Environment</span>
                  <span className="text-purple-400 font-bold">{model.envVersion}</span>
                </div>

                <div className="p-2 rounded-xl bg-zinc-900/60 border border-zinc-800">
                  <span className="text-zinc-500 uppercase block">Created Date</span>
                  <span className="text-zinc-400 font-bold">{model.createdDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
