"use client";

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
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {mockNodes.map((node) => (
        <Card key={node.id} className="bg-card border-border flex flex-col justify-between p-5 min-h-[140px]">
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
