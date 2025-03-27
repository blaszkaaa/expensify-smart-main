
import { BudgetProgress } from "@/components/BudgetProgress";
import { ExpensePieChart } from "@/components/ExpensePieChart";
import { ExpenseBarChart } from "@/components/ExpenseBarChart";
import { TransactionItem, TransactionCategory } from "@/components/TransactionItem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddExpenseDialog } from "@/components/AddExpenseDialog";
import { useState } from "react";

// Sample data for pie chart
const pieChartData = [
  { name: "Mieszkanie", value: 1200, color: "#4f46e5" },
  { name: "Jedzenie", value: 800, color: "#10b981" },
  { name: "Transport", value: 300, color: "#f59e0b" },
  { name: "Rozrywka", value: 400, color: "#8b5cf6" },
  { name: "Inne", value: 200, color: "#ec4899" },
];

// Sample data for bar chart
const barChartData = [
  { name: "Sty", plan: 3000, actual: 2800 },
  { name: "Lut", plan: 3000, actual: 3200 },
  { name: "Mar", plan: 3000, actual: 2700 },
  { name: "Kwi", plan: 3000, actual: 2900 },
  { name: "Maj", plan: 3000, actual: 3100 },
  { name: "Cze", plan: 3000, actual: 2950 },
];

// Sample transaction data
const initialTransactions = [
  {
    id: "1",
    title: "Zakupy spożywcze",
    amount: 125.60,
    date: new Date(2023, 5, 15),
    category: "food" as TransactionCategory,
  },
  {
    id: "2",
    title: "Bilet autobusowy",
    amount: 5.20,
    date: new Date(2023, 5, 14),
    category: "transport" as TransactionCategory,
  },
  {
    id: "3",
    title: "Kino",
    amount: 35.00,
    date: new Date(2023, 5, 13),
    category: "entertainment" as TransactionCategory,
  },
  {
    id: "4",
    title: "Wypłata",
    amount: 4500.00,
    date: new Date(2023, 5, 10),
    category: "savings" as TransactionCategory,
    isIncome: true,
  },
  {
    id: "5",
    title: "Czynsz",
    amount: 1800.00,
    date: new Date(2023, 5, 5),
    category: "housing" as TransactionCategory,
  },
];

export function Dashboard() {
  const [transactions, setTransactions] = useState(initialTransactions);
  
  const handleAddTransaction = (transaction: {
    title: string;
    amount: number;
    date: Date;
    category: TransactionCategory;
    isIncome: boolean;
  }) => {
    const newTransaction = {
      id: Date.now().toString(),
      ...transaction,
    };
    
    setTransactions([newTransaction, ...transactions]);
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Podsumowanie budżetu</h1>
          <p className="text-muted-foreground">Przegląd twoich wydatków i budżetu na czerwiec 2023</p>
        </div>
        <AddExpenseDialog onAddTransaction={handleAddTransaction} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <BudgetProgress 
          title="Całkowity budżet" 
          current={2900} 
          max={4500} 
          className="animate-scale-in" 
        />
        <BudgetProgress 
          title="Jedzenie" 
          current={725} 
          max={800}
          className="animate-scale-in [animation-delay:100ms]" 
        />
        <BudgetProgress 
          title="Rozrywka" 
          current={320} 
          max={400} 
          className="animate-scale-in [animation-delay:200ms]"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ExpensePieChart 
          title="Wydatki według kategorii" 
          data={pieChartData} 
          className="animate-scale-in"
        />
        <ExpenseBarChart 
          title="Miesięczne wydatki" 
          data={barChartData} 
          className="animate-scale-in [animation-delay:100ms]"
        />
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <Card className="animate-scale-in">
          <CardHeader>
            <CardTitle>Ostatnie transakcje</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {transactions.map((transaction) => (
                <TransactionItem
                  key={transaction.id}
                  id={transaction.id}
                  title={transaction.title}
                  amount={transaction.amount}
                  date={transaction.date}
                  category={transaction.category}
                  isIncome={transaction.isIncome}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
