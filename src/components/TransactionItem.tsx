
import { 
  ShoppingCart, 
  Coffee, 
  Car, 
  Film, 
  Home, 
  PiggyBank, 
  Shirt, 
  Utensils, 
  FolderHeart, 
  Landmark,
  LucideIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

// Define category types
export type TransactionCategory = 
  | "shopping" 
  | "food" 
  | "transport" 
  | "entertainment" 
  | "housing" 
  | "savings" 
  | "clothing" 
  | "restaurant" 
  | "health" 
  | "bills";

interface CategoryIconProps {
  category: TransactionCategory;
  className?: string;
}

interface TransactionItemProps {
  id: string;
  title: string;
  amount: number;
  date: Date;
  category: TransactionCategory;
  isIncome?: boolean;
}

// Map categories to colors
const categoryColors: Record<TransactionCategory, string> = {
  shopping: "bg-blue-50 text-blue-600 dark:bg-blue-900/60 dark:text-blue-300",
  food: "bg-green-50 text-green-600 dark:bg-green-900/60 dark:text-green-300",
  transport: "bg-amber-50 text-amber-600 dark:bg-amber-900/60 dark:text-amber-300",
  entertainment: "bg-purple-50 text-purple-600 dark:bg-purple-900/60 dark:text-purple-300",
  housing: "bg-cyan-50 text-cyan-600 dark:bg-cyan-900/60 dark:text-cyan-300",
  savings: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/60 dark:text-emerald-300",
  clothing: "bg-pink-50 text-pink-600 dark:bg-pink-900/60 dark:text-pink-300",
  restaurant: "bg-orange-50 text-orange-600 dark:bg-orange-900/60 dark:text-orange-300",
  health: "bg-red-50 text-red-600 dark:bg-red-900/60 dark:text-red-300",
  bills: "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/60 dark:text-indigo-300",
};

// Map categories to icons
const categoryIcons: Record<TransactionCategory, LucideIcon> = {
  shopping: ShoppingCart,
  food: Coffee,
  transport: Car,
  entertainment: Film,
  housing: Home,
  savings: PiggyBank,
  clothing: Shirt,
  restaurant: Utensils,
  health: FolderHeart,
  bills: Landmark,
};

export function CategoryIcon({ category, className }: CategoryIconProps) {
  const Icon = categoryIcons[category];
  return (
    <div className={cn("p-2.5 rounded-full flex items-center justify-center", categoryColors[category], className)}>
      <Icon className="h-4 w-4" />
    </div>
  );
}

export function TransactionItem({ id, title, amount, date, category, isIncome = false }: TransactionItemProps) {
  const formattedDate = new Intl.DateTimeFormat('pl-PL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date);

  return (
    <div className="flex items-center py-3.5 px-3 hover:bg-slate-50 dark:hover:bg-slate-800/60 rounded-xl transition-colors mb-1.5 soft-shadow">
      <CategoryIcon category={category} />
      <div className="ml-4 flex-1">
        <div className="flex justify-between">
          <p className="font-medium text-slate-800 dark:text-slate-200">{title}</p>
          <p className={cn(
            "font-semibold",
            isIncome ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
          )}>
            {isIncome ? "+" : "-"}
            {amount.toLocaleString('pl-PL', { style: 'currency', currency: 'PLN' })}
          </p>
        </div>
        <div className="flex justify-between mt-1">
          <p className="text-xs text-slate-500 dark:text-slate-400">{formattedDate}</p>
        </div>
      </div>
    </div>
  );
}
