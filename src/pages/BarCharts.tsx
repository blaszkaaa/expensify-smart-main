
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useState } from "react";
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

// Monthly expenses data
const monthlyData = [
  { name: "Sty", expenses: 2800, income: 5000 },
  { name: "Lut", expenses: 3200, income: 5000 },
  { name: "Mar", expenses: 2700, income: 5000 },
  { name: "Kwi", expenses: 2900, income: 5000 },
  { name: "Maj", expenses: 3100, income: 5000 },
  { name: "Cze", expenses: 2950, income: 5000 },
];

// Category comparison data
const categoryData = [
  { name: "Mieszkanie", actual: 1200, planowane: 1500 },
  { name: "Jedzenie", actual: 800, planowane: 700 },
  { name: "Transport", actual: 300, planowane: 400 },
  { name: "Rozrywka", actual: 400, planowane: 300 },
  { name: "Ubrania", actual: 250, planowane: 200 },
  { name: "Zdrowie", actual: 150, planowane: 200 },
];

// Weekly expenses data
const weeklyData = [
  { name: "Pon", wydatki: 95 },
  { name: "Wt", wydatki: 45 },
  { name: "Śr", wydatki: 120 },
  { name: "Czw", wydatki: 60 },
  { name: "Pt", wydatki: 180 },
  { name: "Sob", wydatki: 220 },
  { name: "Niedz", wydatki: 70 },
];

const BarCharts = () => {
  const [timeRange, setTimeRange] = useState("month");
  
  // Select data based on time range
  const getChartData = () => {
    switch(timeRange) {
      case "week":
        return weeklyData;
      case "month":
        return monthlyData;
      case "category":
        return categoryData;
      default:
        return monthlyData;
    }
  };
  
  // Dynamic render chart based on data type
  const renderBarChart = () => {
    const data = getChartData();
    
    // Weekly chart (single series)
    if (timeRange === "week") {
      return (
        <ResponsiveContainer width="100%" height={400}>
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
              wrapperStyle={{ paddingTop: "15px" }}
            />
            <Bar 
              dataKey="wydatki" 
              name="Wydatki" 
              fill="#8b5cf6" 
              radius={[6, 6, 0, 0]}
              animationDuration={1500}
              className="drop-shadow-sm"
            />
          </BarChart>
        </ResponsiveContainer>
      );
    }
    
    // Monthly chart (expenses vs income)
    if (timeRange === "month") {
      return (
        <ResponsiveContainer width="100%" height={400}>
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
              wrapperStyle={{ paddingTop: "15px" }}
            />
            <Bar 
              dataKey="expenses" 
              name="Wydatki" 
              fill="#f43f5e" 
              radius={[6, 6, 0, 0]}
              animationDuration={1500}
              className="drop-shadow-sm"
            />
            <Bar 
              dataKey="income" 
              name="Przychody" 
              fill="#10b981" 
              radius={[6, 6, 0, 0]}
              animationDuration={1500}
              animationBegin={300}
              className="drop-shadow-sm"
            />
          </BarChart>
        </ResponsiveContainer>
      );
    }
    
    // Category comparison (actual vs planned)
    return (
      <ResponsiveContainer width="100%" height={400}>
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
            wrapperStyle={{ paddingTop: "15px" }}
          />
          <Bar 
            dataKey="planowane" 
            name="Planowane" 
            fill="#f59e0b" 
            radius={[6, 6, 0, 0]}
            animationDuration={1500}
            className="drop-shadow-sm"
          />
          <Bar 
            dataKey="actual" 
            name="Rzeczywiste" 
            fill="#3b82f6" 
            radius={[6, 6, 0, 0]}
            animationDuration={1500}
            animationBegin={300}
            className="drop-shadow-sm"
          />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="flex h-screen w-full overflow-hidden theme-transition">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6 animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Wykresy słupkowe</h1>
            <p className="text-muted-foreground">Analiza wydatków w różnych perspektywach czasowych</p>
          </div>
          
          <Card className="animate-scale-in overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border-b">
              <CardTitle>Wybierz zakres</CardTitle>
              <div className="w-[180px]">
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Wybierz zakres" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">Tygodniowo</SelectItem>
                    <SelectItem value="month">Miesięcznie</SelectItem>
                    <SelectItem value="category">Kategorie</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {renderBarChart()}
            </CardContent>
          </Card>
          
          <Card className="animate-scale-in [animation-delay:150ms] overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border-b">
              <CardTitle>Wnioski z analizy</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <p>
                  {timeRange === "week" && "Najwięcej wydajesz w weekendy, szczególnie w soboty. Rozważ lepsze planowanie zakupów i rozrywki."}
                  {timeRange === "month" && "Twoje miesięczne wydatki są stabilne i utrzymują się poniżej przychodów, co jest dobrym znakiem dla budżetu."}
                  {timeRange === "category" && "W większości kategorii trzymasz się budżetu, ale wydajesz więcej niż planowałeś na jedzenie i rozrywkę."}
                </p>
                <p className="text-muted-foreground">
                  Analiza oparta na danych historycznych z ostatnich 6 miesięcy.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default BarCharts;
