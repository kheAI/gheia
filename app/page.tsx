import { Globe2, Leaf, Box, Wind } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NodeGrid } from "@/components/dashboard/node-grid";
import { DiagnosePlant } from "@/components/dashboard/diagnose-plant";
import { SolanaFeed } from "@/components/dashboard/solana-feed";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background selection:bg-primary/30">
      {/* HUD Header */}
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-border bg-[#080c08]/80 px-8 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="flex w-8 h-8 bg-primary rounded-md items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.4)]">
             <Globe2 className="h-5 w-5 text-black" />
          </div>
          <span className="font-bold tracking-tighter text-lg text-white">GheiaGrid</span>
        </div>
        <div className="flex items-center gap-6 font-mono text-xs">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-border">
            <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--color-primary)]" />
            Solana Mainnet
          </div>
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-border text-muted-foreground">
            Auth0: Agent-8812 Verified
          </div>
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-border text-muted-foreground">
            Snowflake: Connected
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-[1200px] mx-auto p-5 flex flex-col gap-5">
        
        {/* Top Grid Row */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_280px] gap-5 items-start">
          
          {/* Left Column */}
          <div className="flex flex-col gap-5">
             <Card className="bg-card border-border h-full max-h-[140px]">
                <CardHeader className="p-4 pb-0 text-[11px] uppercase tracking-widest text-muted-foreground flex flex-row items-center justify-between font-sans">
                  <span>Data Lake Analytics</span>
                </CardHeader>
                <CardContent className="p-4 pt-3 flex flex-col justify-between font-mono text-[11px]">
                    <div className="text-secondary mb-1">&gt; SELECT avg(co2) FROM sensors;</div>
                    <div className="text-foreground">Result: 412.44 ppm</div>
                    <div className="text-secondary mt-3 mb-1">&gt; BATCH_INSERT_STATUS</div>
                    <div className="text-foreground">Success: 1,420 rows</div>
                </CardContent>
             </Card>
          </div>

          {/* Middle Column */}
          <div className="flex flex-col gap-5 overflow-hidden">
            
            <div className="grid grid-cols-2 h-[100px] bg-gradient-to-r from-primary/10 to-background border border-border rounded-xl">
               <div className="flex flex-col items-center justify-center border-r border-border/50">
                 <div className="text-[12px] uppercase text-muted-foreground font-sans tracking-wide">Network Sequestered</div>
                 <div className="font-mono text-4xl font-bold text-primary">1,284.4</div>
                 <div className="text-[12px] uppercase text-muted-foreground font-sans tracking-wide">kg CO2e</div>
               </div>
               <div className="flex flex-col items-center justify-center">
                 <div className="text-[12px] uppercase text-muted-foreground font-sans tracking-wide">LeafTokens Minted</div>
                 <div className="font-mono text-4xl font-bold text-primary">84.2</div>
                 <div className="text-[12px] uppercase text-muted-foreground font-sans tracking-wide">1 LF = 1kg CO₂</div>
               </div>
            </div>

            <NodeGrid />
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-5">
             <SolanaFeed />
             
             <Card className="bg-card border-border">
                <CardHeader className="p-4 pb-0 text-[11px] uppercase tracking-widest text-muted-foreground flex flex-row items-center justify-between font-sans">
                  <span>Agent Reputation</span>
                </CardHeader>
                <CardContent className="p-4 pt-3">
                   <div className="flex items-center justify-between mb-2">
                      <span className="text-lg font-bold">Level 14</span>
                      <span className="text-primary text-sm font-medium">Top 2%</span>
                   </div>
                   <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-[72%]" />
                   </div>
                </CardContent>
             </Card>
          </div>
        </div>

        {/* DiagnosePlant Full Width Row at Bottom */}
        <DiagnosePlant />

      </main>
    </div>
  );
}

// Custom Activity Icon to ensure it's available
const Activity = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
);
