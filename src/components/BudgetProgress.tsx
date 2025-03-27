
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface BudgetProgressProps {
  title: string;
  current: number;
  max: number;
  className?: string;
}

export function BudgetProgress({ title, current, max, className }: BudgetProgressProps) {
  const percentage = Math.min(Math.round((current / max) * 100), 100);
  
  let statusColor = "bg-green-500";
  if (percentage > 70 && percentage < 90) {
    statusColor = "bg-yellow-500";
  } else if (percentage >= 90) {
    statusColor = "bg-red-500";
  }

  return (
    <Card className={cn("overflow-hidden transition-all", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex justify-between items-center">
          <span>{title}</span>
          <span className="text-sm font-normal text-muted-foreground">
            {current.toLocaleString('pl-PL', { style: 'currency', currency: 'PLN' })} 
            <span className="mx-1">/</span>
            {max.toLocaleString('pl-PL', { style: 'currency', currency: 'PLN' })}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Progress value={percentage} className="h-2 progress-animate">
            <div 
              className={cn("h-full rounded-full", statusColor)} 
              style={{ width: `${percentage}%` }} 
            />
          </Progress>
          <p className="text-xs text-right text-muted-foreground">
            {percentage}% wykorzystano
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
