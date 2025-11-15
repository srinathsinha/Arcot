import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RiskCompliance from "@/pages/RiskCompliance";
import Treasury from "@/pages/Treasury";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="mb-6">
              <h1 className="text-xl font-semibold mb-1" data-testid="text-app-title">
                Autonomous Risk & Compliance Officer
              </h1>
              <p className="text-sm text-muted-foreground" data-testid="text-app-subtitle">
                Real-time monitoring and automated compliance workflows
              </p>
            </div>

            <Tabs defaultValue="risk-compliance" className="w-full" data-testid="tabs-main">
              <TabsList className="mb-6" data-testid="tabs-list">
                <TabsTrigger value="risk-compliance" data-testid="tab-risk-compliance">
                  Risk and Compliance
                </TabsTrigger>
                <TabsTrigger value="treasury" data-testid="tab-treasury">
                  Treasury
                </TabsTrigger>
              </TabsList>

              <TabsContent value="risk-compliance" data-testid="content-risk-compliance">
                <RiskCompliance />
              </TabsContent>

              <TabsContent value="treasury" data-testid="content-treasury">
                <Treasury />
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
