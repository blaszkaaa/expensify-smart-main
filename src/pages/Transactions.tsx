
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { TransactionItem, TransactionCategory } from "@/components/TransactionItem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { AddExpenseDialog } from "@/components/AddExpenseDialog";
import { Search } from "lucide-react";

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
  {
    id: "6",
    title: "Ubrania",
    amount: 250.00,
    date: new Date(2023, 5, 4),
    category: "clothing" as TransactionCategory,
  },
  {
    id: "7",
    title: "Restauracja",
    amount: 120.00,
    date: new Date(2023, 5, 2),
    category: "restaurant" as TransactionCategory,
  },
  {
    id: "8",
    title: "Lekarz",
    amount: 150.00,
    date: new Date(2023, 4, 28),
    category: "health" as TransactionCategory,
  },
  {
    id: "9",
    title: "Internet",
    amount: 70.00,
    date: new Date(2023, 4, 25),
    category: "bills" as TransactionCategory,
  },
  {
    id: "10",
    title: "Paliwo",
    amount: 200.00,
    date: new Date(2023, 4, 22),
    category: "transport" as TransactionCategory,
  },
];

const Transactions = () => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  
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
  
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "all" || transaction.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex h-screen w-full overflow-hidden theme-transition">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6 animate-fade-in">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Transakcje</h1>
              <p className="text-muted-foreground">Przegląd wszystkich twoich transakcji</p>
            </div>
            <AddExpenseDialog onAddTransaction={handleAddTransaction} />
          </div>
          
          <Card className="animate-scale-in">
            <CardHeader>
              <CardTitle>Filtruj transakcje</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="search">Wyszukaj</Label>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Wyszukaj transakcję..."
                      className="pl-8"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Kategoria</Label>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Wybierz kategorię" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Wszystkie</SelectItem>
                      <SelectItem value="shopping">Zakupy</SelectItem>
                      <SelectItem value="food">Żywność</SelectItem>
                      <SelectItem value="transport">Transport</SelectItem>
                      <SelectItem value="entertainment">Rozrywka</SelectItem>
                      <SelectItem value="housing">Mieszkanie</SelectItem>
                      <SelectItem value="savings">Oszczędności</SelectItem>
                      <SelectItem value="clothing">Ubrania</SelectItem>
                      <SelectItem value="restaurant">Restauracja</SelectItem>
                      <SelectItem value="health">Zdrowie</SelectItem>
                      <SelectItem value="bills">Rachunki</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="animate-scale-in [animation-delay:150ms]">
            <CardHeader>
              <CardTitle>Lista transakcji</CardTitle>
            </CardHeader>
            <CardContent>
              {filteredTransactions.length > 0 ? (
                <div className="space-y-1">
                  {filteredTransactions.map((transaction) => (
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
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Nie znaleziono transakcji spełniających kryteria wyszukiwania
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Transactions;
