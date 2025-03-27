
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  
  const handleSave = () => {
    toast({
      title: "Sukces",
      description: "Ustawienia zostały zapisane",
    });
  };
  
  const handleReset = () => {
    toast({
      title: "Informacja",
      description: "Ustawienia zostały przywrócone do domyślnych",
    });
  };

  return (
    <div className="flex h-screen w-full overflow-hidden theme-transition">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6 animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Ustawienia</h1>
            <p className="text-muted-foreground">Dostosuj aplikację do swoich potrzeb</p>
          </div>
          
          <Tabs defaultValue="general" className="animate-scale-in">
            <TabsList className="mb-4">
              <TabsTrigger value="general">Ogólne</TabsTrigger>
              <TabsTrigger value="budget">Budżet</TabsTrigger>
              <TabsTrigger value="notifications">Powiadomienia</TabsTrigger>
              <TabsTrigger value="account">Konto</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general">
              <Card>
                <CardHeader>
                  <CardTitle>Ustawienia ogólne</CardTitle>
                  <CardDescription>
                    Zarządzaj podstawowymi ustawieniami aplikacji
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="dark-mode">Ciemny motyw</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatycznie przełączaj między jasnym a ciemnym motywem
                      </p>
                    </div>
                    <Switch id="dark-mode" defaultChecked />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="language">Język</Label>
                    <Select defaultValue="pl">
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Wybierz język" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pl">Polski</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="currency">Waluta</Label>
                    <Select defaultValue="pln">
                      <SelectTrigger id="currency">
                        <SelectValue placeholder="Wybierz walutę" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pln">PLN (Złoty)</SelectItem>
                        <SelectItem value="eur">EUR (Euro)</SelectItem>
                        <SelectItem value="usd">USD (Dolar)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={handleReset}>Resetuj</Button>
                    <Button onClick={handleSave}>Zapisz zmiany</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="budget">
              <Card>
                <CardHeader>
                  <CardTitle>Ustawienia budżetu</CardTitle>
                  <CardDescription>
                    Dostosuj limity budżetowe dla różnych kategorii
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="monthly-budget">Miesięczny budżet (PLN)</Label>
                    <Input id="monthly-budget" type="number" defaultValue="4500" />
                  </div>
                  
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="housing-budget">Mieszkanie (PLN)</Label>
                      <Input id="housing-budget" type="number" defaultValue="1500" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="food-budget">Jedzenie (PLN)</Label>
                      <Input id="food-budget" type="number" defaultValue="800" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="transport-budget">Transport (PLN)</Label>
                      <Input id="transport-budget" type="number" defaultValue="400" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="entertainment-budget">Rozrywka (PLN)</Label>
                      <Input id="entertainment-budget" type="number" defaultValue="300" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="budget-alerts">Alerty budżetowe</Label>
                      <p className="text-sm text-muted-foreground">
                        Otrzymuj powiadomienia gdy zbliżasz się do limitu budżetu
                      </p>
                    </div>
                    <Switch id="budget-alerts" defaultChecked />
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={handleReset}>Resetuj</Button>
                    <Button onClick={handleSave}>Zapisz zmiany</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Ustawienia powiadomień</CardTitle>
                  <CardDescription>
                    Wybierz, które powiadomienia chcesz otrzymywać
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">Powiadomienia email</Label>
                      <p className="text-sm text-muted-foreground">
                        Otrzymuj raporty o wydatkach na email
                      </p>
                    </div>
                    <Switch id="email-notifications" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="budget-warning">Ostrzeżenia o budżecie</Label>
                      <p className="text-sm text-muted-foreground">
                        Powiadomienia gdy wydasz 80% budżetu
                      </p>
                    </div>
                    <Switch id="budget-warning" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="transaction-notifications">Nowe transakcje</Label>
                      <p className="text-sm text-muted-foreground">
                        Powiadomienia o nowych transakcjach
                      </p>
                    </div>
                    <Switch id="transaction-notifications" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="monthly-summary">Miesięczne podsumowanie</Label>
                      <p className="text-sm text-muted-foreground">
                        Otrzymuj miesięczne raporty wydatków
                      </p>
                    </div>
                    <Switch id="monthly-summary" defaultChecked />
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={handleReset}>Resetuj</Button>
                    <Button onClick={handleSave}>Zapisz zmiany</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Ustawienia konta</CardTitle>
                  <CardDescription>
                    Zarządzaj danymi swojego konta
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Imię i nazwisko</Label>
                    <Input id="name" defaultValue="Jan Kowalski" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="jan.kowalski@example.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Nowe hasło</Label>
                    <Input id="password" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Potwierdź hasło</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  
                  <div className="pt-4 flex justify-between">
                    <Button variant="destructive">Usuń konto</Button>
                    <div className="flex space-x-2">
                      <Button variant="outline" onClick={handleReset}>Anuluj</Button>
                      <Button onClick={handleSave}>Zapisz zmiany</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Settings;
