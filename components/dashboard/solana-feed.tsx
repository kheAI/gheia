"use client";

import { useEffect, useState } from "react";
import { Link2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mintLeafToken, SolanaTransactionReceipt } from "@/services/solana";

export function SolanaFeed() {
  const [transactions, setTransactions] = useState<SolanaTransactionReceipt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching recent transactions on mount
    const fetchMocks = async () => {
      // Mock minting a token for demonstration
      try {
        const result = await mintLeafToken("GaiaUser123_PublicKey_Mock", 250);
        
        const mockHistory: SolanaTransactionReceipt[] = [
          result,
          { signature: "sig_kx9f82n1...", timestamp: new Date(Date.now() - 3600000).toISOString(), amountSequestered: 120, tokenStatus: "MINTED" },
          { signature: "sig_p09mvx8...", timestamp: new Date(Date.now() - 7200000).toISOString(), amountSequestered: 450, tokenStatus: "MINTED" },
          { signature: "sig_lm2nb92...", timestamp: new Date(Date.now() - 14400000).toISOString(), amountSequestered: 80, tokenStatus: "PENDING" },
        ];
        
        setTransactions(mockHistory);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMocks();
  }, []);

  return (
    <Card className="bg-card border-border flex flex-col h-[280px]">
      <CardHeader className="p-4 pb-0 text-[11px] uppercase tracking-widest text-muted-foreground flex flex-row items-center justify-between font-sans">
        <span>Recent Chain Events</span>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto p-4 flex flex-col gap-2">
        {loading ? (
          <div className="flex-1 flex items-center justify-center font-mono text-xs text-muted-foreground">
            Syncing devnet...
          </div>
        ) : (
          <ul className="flex flex-col font-mono text-[11px]">
            {transactions.map((tx, i) => (
              <li key={i} className="py-2 border-b border-white/5 flex justify-between">
                <span className="text-accent">
                  {tx.tokenStatus === "MINTED" ? "mint" : "seq_"}...{tx.signature.substring(tx.signature.length - 4)}
                </span>
                <span className="text-white">
                  +{tx.amountSequestered}g CO2
                </span>
              </li>
            ))}
            <li className="py-2 border-b border-white/5 flex justify-between">
              <span className="text-accent">node...011b</span>
              <span className="text-white">Reg. Success</span>
            </li>
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
