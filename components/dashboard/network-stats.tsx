"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

export function NetworkStats() {
  const [seq, setSeq] = useState(1284.4);
  const [minted, setMinted] = useState(84.2);

  // Simulate global network metrics ticking up slowly as devices report in globally
  useEffect(() => {
    const interval = setInterval(() => {
      setSeq(prev => +(prev + Math.random() * 0.1).toFixed(1));
      setMinted(prev => +(prev + Math.random() * 0.05).toFixed(1));
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-2 h-[100px] bg-gradient-to-r from-primary/10 to-background border border-border rounded-xl relative overflow-hidden">
       {/* Background subtle pulse */}
       <motion.div 
         className="absolute inset-0 bg-primary/5"
         animate={{ opacity: [0, 1, 0] }}
         transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
       />
       
       <div className="flex flex-col items-center justify-center border-r border-border/50 relative z-10">
         <div className="text-[12px] uppercase text-muted-foreground font-sans tracking-wide">Network Sequestered</div>
         <motion.div 
           key={seq} 
           initial={{ scale: 1.05, filter: "brightness(1.5)" }} 
           animate={{ scale: 1, filter: "brightness(1)" }} 
           className="font-mono text-4xl font-bold text-primary"
         >
           {seq.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
         </motion.div>
         <div className="text-[12px] uppercase text-muted-foreground font-sans tracking-wide">kg CO2e</div>
       </div>
       
       <div className="flex flex-col items-center justify-center relative z-10">
         <div className="text-[12px] uppercase text-muted-foreground font-sans tracking-wide">LeafTokens Minted</div>
         <motion.div 
           key={minted} 
           initial={{ scale: 1.05, filter: "brightness(1.5)" }} 
           animate={{ scale: 1, filter: "brightness(1)" }} 
           className="font-mono text-4xl font-bold text-primary"
         >
           {minted.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
         </motion.div>
         <div className="text-[12px] uppercase text-muted-foreground font-sans tracking-wide">1 LF = 1kg CO₂</div>
       </div>
    </div>
  );
}
