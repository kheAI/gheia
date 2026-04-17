"use client";

import { useEffect, useState } from "react";
import { Leaf, Activity, Droplets, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mockNodes = [
  { id: "NODE-X920", location: "Sector 4 Balcony", moisture: 42, health: "Optimal", co2: "410 ppm", active: true },
  { id: "NODE-A112", location: "Rooftop Hub Beta", moisture: 28, health: "Warning", co2: "390 ppm", active: true },
  { id: "NODE-O991", location: "Indoor Hydro Unit", moisture: 65, health: "Optimal", co2: "450 ppm", active: true },
  { id: "NODE-L404", location: "East Window Sill", moisture: 12, health: "Critical", co2: "400 ppm", active: false },
];

export function NodeGrid() {
  const [liveNodes, setLiveNodes] = useState<any[]>(mockNodes);

  useEffect(() => {
    let isMounted = true;
    
    async function fetchLatest() {
      try {
        const res = await fetch("/api/sensor/latest");
        if (!res.ok) return;
        const data = await res.json();
        
        if (isMounted && data.readings && data.readings.length > 0) {
          // Grab the single latest reading for urban-farm-node-42
          const latestReading = data.readings[0];
          
          setLiveNodes(prev => {
            const newNodes = [...prev];
            // See if we have an urban farm node
            const nodeIndex = newNodes.findIndex(n => n.id === latestReading.nodeId);
            
            const newNode = {
              id: latestReading.nodeId,
              location: "Zero-Trust Edge Sensor",
              moisture: parseFloat(latestReading.metrics.soilMoisture.replace('%', '')),
              health: parseFloat(latestReading.metrics.soilMoisture) > 20 ? "Optimal" : "Warning",
              co2: latestReading.metrics.humidity, // reusing co2 field for humidity display just for demo
              active: true
            };

            if (nodeIndex !== -1) {
              newNodes[nodeIndex] = newNode;
            } else {
              // Replace the first mock node with the real one to keep the grid size the same, or unshift it
              newNodes.unshift(newNode);
              newNodes.pop(); // keep array at 4 items
            }
            return newNodes;
          });
        }
      } catch (error) {
        console.error("Failed to fetch live sensor data:", error);
      }
    }

    // Poll every 3 seconds
    const interval = setInterval(fetchLatest, 3000);
    fetchLatest();

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {liveNodes.map((node) => (
        <Card key={node.id} className={`bg-card border-border flex flex-col justify-between p-5 min-h-[140px] transition-all duration-500 ${node.id === 'urban-farm-node-42' ? 'border-primary/50 shadow-[0_0_15px_rgba(16,185,129,0.15)] relative overflow-hidden' : ''}`}>
          {node.id === 'urban-farm-node-42' && (
            <div className="absolute -right-6 top-3 text-[10px] font-bold tracking-widest text-[#080c08] bg-primary font-mono py-0.5 px-8 rotate-45 z-10">LIVE PING</div>
          )}
          <div>
            <div className="font-semibold text-lg text-foreground mb-1">{node.id}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-4">{node.location}</div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-auto">
            <div className="font-mono text-[11px] p-2 bg-white/5 rounded border border-border/50">
              <div className="text-muted-foreground mb-1">Moisture</div>
              <div className={`text-sm ${node.moisture < 20 ? 'text-destructive' : 'text-secondary'}`}>{node.moisture}%</div>
            </div>
            <div className="font-mono text-[11px] p-2 bg-white/5 rounded border border-border/50">
              <div className="text-muted-foreground mb-1">Health</div>
              <div className={`text-sm ${node.health === "Optimal" ? 'text-primary' : node.health === "Warning" ? 'text-secondary' : 'text-destructive'}`}>{node.health}</div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
