
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ExpenseData {
  name: string;
  value: number;
  color: string;
}

interface ExpensePieChartProps {
  title: string;
  data: ExpenseData[];
  className?: string;
}

export function ExpensePieChart({ title, data, className }: ExpensePieChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border-b">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
                animationBegin={200}
                animationDuration={1200}
                className="drop-shadow-sm"
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color} 
                    stroke="none"
                    className="drop-shadow-md hover:opacity-90 transition-opacity"
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => 
                  value.toLocaleString('pl-PL', { style: 'currency', currency: 'PLN' })
                }
                contentStyle={{
                  backgroundColor: "var(--card)",
                  borderRadius: "0.75rem",
                  borderColor: "var(--border)",
                  color: "var(--card-foreground)",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                  padding: "0.75rem"
                }}
              />
              <Legend 
                layout="vertical" 
                verticalAlign="middle" 
                align="right"
                iconType="circle"
                iconSize={10}
                wrapperStyle={{ paddingLeft: "20px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex justify-center">
          <div className="text-center">
            <p className="text-muted-foreground text-sm">Suma wydatków</p>
            <p className="text-2xl font-semibold mt-1">
              {total.toLocaleString('pl-PL', { style: 'currency', currency: 'PLN' })}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
