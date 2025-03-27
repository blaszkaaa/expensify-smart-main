
import { Sidebar } from "@/components/Sidebar";
import { Dashboard } from "@/components/Dashboard";

const Index = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden theme-transition bg-slate-50 dark:bg-slate-950">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <Dashboard />
      </main>
    </div>
  );
};

export default Index;
