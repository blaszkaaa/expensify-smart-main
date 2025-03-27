
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  BarChart3, 
  PieChart, 
  CreditCard, 
  Settings, 
  Menu, 
  X,
  Plus,
  ChevronRight,
  ChevronLeft 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type NavItem = {
  name: string;
  path: string;
  icon: React.ReactNode;
};

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const navItems: NavItem[] = [
    {
      name: "Podsumowanie",
      path: "/",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "Transakcje",
      path: "/transactions",
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      name: "Wykresy słupkowe",
      path: "/bar-charts",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      name: "Wykresy kołowe",
      path: "/pie-charts",
      icon: <PieChart className="h-5 w-5" />,
    },
    {
      name: "Ustawienia",
      path: "/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <aside
      className={cn(
        "h-screen bg-card text-card-foreground border-r border-border transition-all duration-300 ease-in-out flex flex-col",
        collapsed ? "w-[70px]" : "w-[240px]"
      )}
    >
      <div className="flex items-center justify-between px-4 h-14 border-b border-border">
        {!collapsed && (
          <h1 className="text-xl font-semibold text-primary animate-fade-in">ExpensiFy</h1>
        )}
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="ml-auto">
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>

      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to={item.path}
                      className={cn(
                        "flex items-center h-10 px-3 rounded-md text-foreground/60 hover:text-foreground hover:bg-accent transition-colors",
                        location.pathname === item.path && "bg-accent text-foreground font-medium"
                      )}
                    >
                      <span>{item.icon}</span>
                      {!collapsed && <span className="ml-3">{item.name}</span>}
                    </Link>
                  </TooltipTrigger>
                  {collapsed && (
                    <TooltipContent side="right">
                      <span>{item.name}</span>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-border flex items-center justify-between">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="default" size={collapsed ? "icon" : "default"} className="gap-2">
                <Plus className="h-4 w-4" />
                {!collapsed && <span>Dodaj wydatek</span>}
              </Button>
            </TooltipTrigger>
            {collapsed && (
              <TooltipContent side="right">
                <span>Dodaj wydatek</span>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
        <ThemeToggle />
      </div>
    </aside>
  );
}
