
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ExpenseBarChartProps {
  title: string;
  data: any[];
  className?: string;
}

export function ExpenseBarChart({ title, data, className }: ExpenseBarChartProps) {
  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border-b">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis 
                dataKey="name" 
                tick={{ fill: "var(--foreground)" }}
                axisLine={{ stroke: "var(--border)" }}
                tickLine={{ stroke: "var(--border)" }}
              />
              <YAxis 
                tick={{ fill: "var(--foreground)" }} 
                tickFormatter={(value) => `${value} zł`}
                axisLine={{ stroke: "var(--border)" }}
                tickLine={{ stroke: "var(--border)" }}
              />
              <Tooltip
                formatter={(value: number) => 
                  [value.toLocaleString('pl-PL', { style: 'currency', currency: 'PLN' }), "Kwota"]
                }
                contentStyle={{
                  backgroundColor: "var(--card)",
                  borderRadius: "0.75rem",
                  borderColor: "var(--border)",
                  color: "var(--card-foreground)",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                  padding: "0.75rem"
                }}
                cursor={{ fill: 'var(--muted)', opacity: 0.1 }}
              />
              <Legend 
                iconType="circle"
                iconSize={10}
                wrapperStyle={{ paddingTop: "10px" }}
              />
              <Bar 
                dataKey="plan" 
                name="Planowane" 
                fill="#6366f1" 
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
                className="drop-shadow-sm"
              />
              <Bar 
                dataKey="actual" 
                name="Rzeczywiste" 
                fill="#14b8a6" 
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
                animationBegin={300}
                className="drop-shadow-sm"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
