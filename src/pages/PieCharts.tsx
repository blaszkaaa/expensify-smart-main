
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { useState } from "react";

// Monthly expense categories data
const expenseData = [
  { name: "Mieszkanie", value: 1200, color: "#4f46e5" },
  { name: "Jedzenie", value: 800, color: "#10b981" },
  { name: "Transport", value: 300, color: "#f59e0b" },
  { name: "Rozrywka", value: 400, color: "#8b5cf6" },
  { name: "Ubrania", value: 250, color: "#ec4899" },
  { name: "Zdrowie", value: 150, color: "#ef4444" },
  { name: "Oszczędności", value: 500, color: "#14b8a6" },
  { name: "Inne", value: 200, color: "#6b7280" },
];

// Previous month data for comparison
const previousMonthData = [
  { name: "Mieszkanie", value: 1200, color: "#4f46e5" },
  { name: "Jedzenie", value: 750, color: "#10b981" },
  { name: "Transport", value: 350, color: "#f59e0b" },
  { name: "Rozrywka", value: 320, color: "#8b5cf6" },
  { name: "Ubrania", value: 180, color: "#ec4899" },
  { name: "Zdrowie", value: 200, color: "#ef4444" },
  { name: "Oszczędności", value: 600, color: "#14b8a6" },
  { name: "Inne", value: 180, color: "#6b7280" },
];

// Income breakdown data
const incomeData = [
  { name: "Wypłata", value: 4500, color: "#10b981" },
  { name: "Freelancing", value: 800, color: "#3b82f6" },
  { name: "Inwestycje", value: 200, color: "#f59e0b" },
  { name: "Inne", value: 100, color: "#6b7280" },
];

const PieCharts = () => {
  const [activeTab, setActiveTab] = useState("expenses");
  const [timeRange, setTimeRange] = useState("current");
  
  // Get data based on active tab and time range
  const getChartData = () => {
    if (activeTab === "expenses") {
      return timeRange === "current" ? expenseData : previousMonthData;
    } else {
      return incomeData;
    }
  };
  
  // Calculate total from data
  const calculateTotal = (data: any[]) => {
    return data.reduce((acc, item) => acc + item.value, 0);
  };
  
  const data = getChartData();
  const total = calculateTotal(data);

  return (
    <div className="flex h-screen w-full overflow-hidden theme-transition">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6 animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Wykresy kołowe</h1>
            <p className="text-muted-foreground">Wizualizacja rozkładu wydatków i przychodów</p>
          </div>
          
          <Tabs defaultValue="expenses" className="animate-scale-in" onValueChange={setActiveTab}>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0 mb-4">
              <TabsList>
                <TabsTrigger value="expenses">Wydatki</TabsTrigger>
                <TabsTrigger value="income">Przychody</TabsTrigger>
              </TabsList>
              
              {activeTab === "expenses" && (
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Wybierz okres" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="current">Bieżący miesiąc</SelectItem>
                    <SelectItem value="previous">Poprzedni miesiąc</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
            
            <TabsContent value="expenses">
              <Card className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border-b">
                  <CardTitle>
                    {timeRange === "current" ? "Wydatki w bieżącym miesiącu" : "Wydatki w poprzednim miesiącu"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="flex items-center justify-center h-[350px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={110}
                            paddingAngle={3}
                            dataKey="value"
                            animationBegin={100}
                            animationDuration={1200}
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
                              [
                                value.toLocaleString('pl-PL', { style: 'currency', currency: 'PLN' }),
                                "Kwota"
                              ]
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
                            align="right" 
                            verticalAlign="middle" 
                            iconType="circle"
                            iconSize={10}
                            wrapperStyle={{ paddingLeft: "20px" }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex flex-col justify-center space-y-6">
                      <div className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4 rounded-xl">
                        <h3 className="text-lg font-medium">Podsumowanie wydatków</h3>
                        <p className="text-3xl font-bold mt-2">
                          {total.toLocaleString('pl-PL', { style: 'currency', currency: 'PLN' })}
                        </p>
                      </div>
                      <div className="space-y-3">
                        {data.map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                              <span className="font-medium">{item.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">
                                {item.value.toLocaleString('pl-PL', { style: 'currency', currency: 'PLN' })}
                              </span>
                              <span className="text-muted-foreground text-sm font-semibold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                                {Math.round((item.value / total) * 100)}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="income">
              <Card className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border-b">
                  <CardTitle>Struktura przychodów</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="flex items-center justify-center h-[350px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={incomeData}
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={110}
                            paddingAngle={3}
                            dataKey="value"
                            animationBegin={100}
                            animationDuration={1200}
                          >
                            {incomeData.map((entry, index) => (
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
                              [
                                value.toLocaleString('pl-PL', { style: 'currency', currency: 'PLN' }),
                                "Kwota"
                              ]
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
                            align="right" 
                            verticalAlign="middle" 
                            iconType="circle"
                            iconSize={10}
                            wrapperStyle={{ paddingLeft: "20px" }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex flex-col justify-center space-y-6">
                      <div className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4 rounded-xl">
                        <h3 className="text-lg font-medium">Całkowity przychód</h3>
                        <p className="text-3xl font-bold mt-2 text-green-500">
                          {calculateTotal(incomeData).toLocaleString('pl-PL', { style: 'currency', currency: 'PLN' })}
                        </p>
                      </div>
                      <div className="space-y-3">
                        {incomeData.map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                              <span className="font-medium">{item.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">
                                {item.value.toLocaleString('pl-PL', { style: 'currency', currency: 'PLN' })}
                              </span>
                              <span className="text-muted-foreground text-sm font-semibold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                                {Math.round((item.value / calculateTotal(incomeData)) * 100)}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <Card className="animate-scale-in [animation-delay:150ms] overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border-b">
              <CardTitle>Wskazówki budżetowe</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {activeTab === "expenses" ? (
                  <>
                    <p>
                      Najwięcej wydajesz na mieszkanie i jedzenie, co jest typowym rozkładem kosztów w gospodarstwie domowym.
                    </p>
                    <p>
                      {timeRange === "current" 
                        ? "W tym miesiącu zmniejszyły się wydatki na transport, ale wzrosły na rozrywkę w porównaniu do poprzedniego miesiąca." 
                        : "W poprzednim miesiącu więcej wydałeś na zdrowie i oszczędności w porównaniu do obecnego miesiąca."}
                    </p>
                    <p className="text-muted-foreground">
                      Rozważ przegląd wydatków na jedzenie - stanowią one znaczącą część budżetu i mogą istnieć możliwości oszczędności.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      Głównym źródłem przychodów jest regularna wypłata, która stanowi {Math.round((4500 / calculateTotal(incomeData)) * 100)}% łącznych dochodów.
                    </p>
                    <p>
                      Dywersyfikacja źródeł przychodu poprzez freelancing i inwestycje to dobra strategia finansowa.
                    </p>
                    <p className="text-muted-foreground">
                      Rozważ zwiększenie udziału inwestycji w całkowitych przychodach, aby budować aktywa pasywne na przyszłość.
                    </p>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default PieCharts;
