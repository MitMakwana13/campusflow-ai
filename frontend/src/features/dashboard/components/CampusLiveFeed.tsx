import { ActivityFeedItem } from "@/types/dashboard";
import { CheckCircle2, Info, AlertTriangle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface CampusLiveFeedProps {
  feedItems: ActivityFeedItem[];
}

export function CampusLiveFeed({ feedItems }: CampusLiveFeedProps) {
  const getIcon = (severity: ActivityFeedItem['severity']) => {
    switch (severity) {
      case 'success': return <CheckCircle2 className="w-4 h-4 text-success-400" />;
      case 'info': return <Info className="w-4 h-4 text-info-400" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-warning-400" />;
      case 'error': return <XCircle className="w-4 h-4 text-danger-400" />;
    }
  };

  return (
    <div className="card p-6 border-white/10 bg-surface-1">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-neutral-100 flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
          </span>
          Live Campus Operations Stream
        </h3>
        <span className="text-xs text-neutral-500 font-mono">REAL-TIME</span>
      </div>

      <div className="space-y-4">
        {feedItems.map((item) => (
          <div key={item.id} className="flex items-start gap-3 p-3 rounded-lg bg-neutral-900/40 border border-white/5 hover:border-white/10 transition-all">
            <div className="mt-0.5">{getIcon(item.severity)}</div>
            <div className="flex-1">
              <div className="flex items-center justify-between text-xs mb-0.5">
                <span className="font-semibold text-neutral-200">{item.title}</span>
                <span className="text-neutral-500 font-mono">{item.timestamp}</span>
              </div>
              <p className="text-xs text-neutral-400">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
