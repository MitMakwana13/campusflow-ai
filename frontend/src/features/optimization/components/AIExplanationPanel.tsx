import { AIExplanation } from "@/types/optimization";
import { CheckCircle2, AlertTriangle, ArrowUpRight, FileText, RotateCcw } from "lucide-react";
import { fastAPIOptimizationRepo, fastAPITimetableRepo } from "@/repositories/FastAPIRepository";

interface AIExplanationPanelProps {
  explanation: AIExplanation;
  onPublish?: () => void;
  onRollback?: () => void;
}

export function AIExplanationPanel({ explanation, onPublish, onRollback }: AIExplanationPanelProps) {
  const handleDownloadReport = () => {
    const reportUrl = fastAPIOptimizationRepo.getReportUrl("latest");
    window.open(reportUrl, "_blank");
  };

  const handleRollbackClick = async () => {
    await fastAPITimetableRepo.rollbackSchedule();
    if (onRollback) onRollback();
  };

  return (
    <div className="ai-card animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="ai-card-header">
        <div className="ai-pulse"></div>
        <div className="ai-label">Optimization Engine Analysis</div>
        <div className="ai-confidence">
          {explanation.confidencePercent}%
          <div className="ai-confidence-bar">
            <div className="ai-confidence-fill" style={{ width: `${explanation.confidencePercent}%` }}></div>
          </div>
        </div>
      </div>
      
      <div className="ai-recommendation font-semibold text-neutral-100 flex items-center gap-2">
        <AlertTriangle className="w-4 h-4 text-warning-400" />
        <span>{explanation.recommendation}</span>
      </div>
      
      <div className="ai-reason text-xs text-neutral-400 leading-relaxed bg-neutral-900/60 p-3 rounded-lg border border-white/5">
        {explanation.reasoning}
      </div>
      
      <div className="flex items-center justify-between text-xs py-1 border-y border-white/10 my-2">
        <span className="text-neutral-400">Reward Improvement:</span>
        <span className="text-emerald-400 font-mono font-bold flex items-center">
          <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> +1,000 pts
        </span>
      </div>

      <div className="ai-impact">
        <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-success-400" />
        <span>{explanation.impactSummary}</span>
      </div>

      <div className="ai-actions flex flex-col gap-2 mt-4">
        <button onClick={onPublish} className="btn btn-primary w-full justify-center shadow-md">
          Publish Optimized Schedule
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button onClick={handleDownloadReport} className="btn btn-secondary justify-center text-xs gap-1">
            <FileText className="w-3.5 h-3.5 text-primary-400" />
            PDF Report
          </button>
          
          <button onClick={handleRollbackClick} className="btn btn-secondary justify-center text-xs gap-1 text-danger-400 border-danger-500/20 hover:bg-danger-500/10">
            <RotateCcw className="w-3.5 h-3.5" />
            Rollback
          </button>
        </div>
      </div>
    </div>
  );
}
