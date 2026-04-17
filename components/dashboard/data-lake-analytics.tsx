"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion } from "motion/react";

export function DataLakeAnalytics() {
  const [inserts, setInserts] = useState(1420);
  const [lastPing, setLastPing] = useState(Date.now());

  // Listen to the local sensor API to dynamically increment the batch insert status
  // whenever your MacBook terminal hits the mock-sensor script!
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch("/api/sensor/latest");
        if (res.ok) {
          const data = await res.json();
          if (data.readings && data.readings.length > 0) {
             const latest = data.readings[0];
             const readingTime = new Date(latest.timestamp).getTime();
             if (readingTime > lastPing) {
                setInserts(prev => prev + 1);
                setLastPing(readingTime);
             }
          }
        }
      } catch(e) {}
    }, 3000);
    return () => clearInterval(interval);
  }, [lastPing]);

  return (
    <Card className="bg-card border-border h-full max-h-[140px] overflow-hidden relative">
       <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 blur-[40px] rounded-full pointer-events-none" />
       
       <CardHeader className="p-4 pb-0 text-[11px] uppercase tracking-widest text-muted-foreground flex flex-row items-center justify-between font-sans">
         <span>Data Lake Analytics</span>
         <div className="flex items-center gap-2">
            <span className="text-[9px] text-primary/70">SYNCING</span>
            <motion.div 
              animate={{ opacity: [0.2, 1, 0.2] }} 
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="h-1.5 w-1.5 rounded-full bg-primary"
            />
         </div>
       </CardHeader>
       
       <CardContent className="p-4 pt-3 flex flex-col justify-between font-mono text-[11px] relative z-10">
           <div className="text-secondary mb-1">&gt; SELECT avg(co2) FROM sensors;</div>
           <div className="text-foreground">Result: 412.44 ppm</div>
           <div className="text-secondary mt-3 mb-1">&gt; BATCH_INSERT_STATUS</div>
           <motion.div 
             key={inserts} 
             initial={{ opacity: 0, x: -5, color: '#fff' }} 
             animate={{ opacity: 1, x: 0, color: "var(--color-primary)" }} 
           >
             Success: {inserts.toLocaleString()} rows verified
           </motion.div>
       </CardContent>
    </Card>
  );
}
