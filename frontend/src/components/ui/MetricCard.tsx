import { Card, CardContent } from "./Card"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface MetricCardProps {
  title: string;
  value: string | number;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  icon: LucideIcon;
  description?: string;
  className?: string;
}

export function MetricCard({ title, value, trend, icon: Icon, description, className }: MetricCardProps) {
  return (
    <Card className={cn("flex flex-col justify-between", className)}>
      <CardContent className="flex flex-col h-full">
        <div className="flex items-start justify-between mb-2">
          <div className="text-sm font-medium text-neutral-400 uppercase tracking-wider">{title}</div>
          <div className="p-2 bg-neutral-900/50 rounded-lg border border-white/5">
            <Icon className="w-4 h-4 text-primary-400" />
          </div>
        </div>
        
        <div className="flex items-baseline gap-3 mb-2">
          <div className="text-3xl font-bold font-display text-neutral-50 tracking-tight">{value}</div>
          {trend && (
            <div className={cn(
              "text-xs font-semibold px-2 py-0.5 rounded-full flex items-center",
              trend.isPositive ? "bg-success-500/10 text-success-400" : "bg-danger-500/10 text-danger-400"
            )}>
              {trend.isPositive ? "↑" : "↓"} {trend.value}
            </div>
          )}
        </div>
        
        {description && (
          <div className="text-sm text-neutral-500 mt-auto">
            {description}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
