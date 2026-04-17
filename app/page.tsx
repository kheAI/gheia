import { Globe2 } from "lucide-react";
import { NodeGrid } from "@/components/dashboard/node-grid";
import { DiagnosePlant } from "@/components/dashboard/diagnose-plant";
import { SolanaFeed } from "@/components/dashboard/solana-feed";
import { NetworkStats } from "@/components/dashboard/network-stats";
import { DataLakeAnalytics } from "@/components/dashboard/data-lake-analytics";
import { AgentReputation } from "@/components/dashboard/agent-reputation";
import * as motion from "motion/react-client";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background selection:bg-primary/30">
      {/* HUD Header */}
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-border bg-[#080c08]/80 px-8 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="flex w-8 h-8 bg-primary rounded-md items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.4)] relative overflow-hidden">
             <div className="absolute inset-0 bg-white/20 animate-pulse" />
             <Globe2 className="h-5 w-5 text-black relative z-10" />
          </div>
          <span className="font-bold tracking-tighter text-lg text-white">GheiaGrid</span>
        </div>
        <div className="flex items-center gap-6 font-mono text-xs">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-border">
            <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--color-primary)] animate-pulse" />
            Solana Mainnet
          </div>
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-border text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
            Auth0: Agent-8812 Verified
          </div>
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-border text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.8)]" />
            Snowflake: Connected
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-[1200px] mx-auto p-5 flex flex-col gap-5">
        
        {/* Top Grid Row */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_280px] gap-5 items-start">
          
          {/* Left Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-5"
          >
             <DataLakeAnalytics />
          </motion.div>

          {/* Middle Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-5 overflow-hidden"
          >
            <NetworkStats />
            <NodeGrid />
          </motion.div>

          {/* Right Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col gap-5"
          >
             <SolanaFeed />
             <AgentReputation />
          </motion.div>
        </div>

        {/* DiagnosePlant Full Width Row at Bottom */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, delay: 0.4 }}
        >
          <DiagnosePlant />
        </motion.div>

      </main>
    </div>
  );
}

// Custom Activity Icon to ensure it's available
const Activity = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
);
