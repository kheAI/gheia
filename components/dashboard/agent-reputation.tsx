"use client";

import { motion } from "motion/react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function AgentReputation() {
  return (
    <Card className="bg-card border-border overflow-hidden relative group">
       <motion.div 
         className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" 
       />
       <CardHeader className="p-4 pb-0 text-[11px] uppercase tracking-widest text-muted-foreground flex flex-row items-center justify-between font-sans">
         <span>Agent Reputation</span>
       </CardHeader>
       <CardContent className="p-4 pt-3 relative z-10">
          <div className="flex items-center justify-between mb-2">
             <span className="text-lg font-bold">Level 14</span>
             <span className="text-primary text-sm font-medium">Top 2%</span>
          </div>
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
             <motion.div 
               initial={{ width: 0 }}
               animate={{ width: "72%" }}
               transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
               className="h-full bg-primary" 
             />
          </div>
          <div className="mt-3 text-[10px] text-muted-foreground tracking-wide flex justify-between">
            <span>Auth0 Trust Score</span>
            <span className="text-emerald-400">99.8%</span>
          </div>
       </CardContent>
    </Card>
  );
}
