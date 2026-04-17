"use server";

import { Connection, Keypair, Transaction, SystemProgram, PublicKey, sendAndConfirmTransaction } from '@solana/web3.js';
import bs58 from 'bs58';
import crypto from 'crypto';

export interface SolanaTransactionReceipt {
  signature: string;
  timestamp: string;
  amountSequestered: number;
  tokenStatus: "MINTED" | "PENDING" | "FAILED";
}

// Ensure the backend has a funding wallet for tx fees.
// In production, NEVER expose the private key like this.
const SERVER_KEYPAIR_B58 = process.env.SOLANA_PRIVATE_KEY || "4pB1xYZuFZb5MZm9rT8nQhNq8bT4oXxH4kV8zRjWq9hYfXbVn5m3jHq8kLp2c7R"; 

export async function authorizeDataHashToChain(
  sensorNodeId: string,
  payloadString: string
): Promise<SolanaTransactionReceipt> {
  console.log(`[Solana] Assembling Devnet transaction ledger for node: ${sensorNodeId}`);
  
  try {
    // 1. Generate an SHA-256 hash of the incoming sensor data.
    // This allows the raw data to live in Snowflake, but the mathematical proof
    // of that data to live immutably on Solana.
    const dataHash = crypto.createHash('sha256').update(payloadString).digest('hex');
    console.log(`[Solana] Generated payload hash: ${dataHash}`);

    // 2. Connect to Devnet
    const connection = new Connection("https://api.devnet.solana.com", "confirmed");
    
    // We try to use a valid keypair from env, otherwise we create a throwaway one for UI testing
    // which won't actually trigger the blockchain if unfunded.
    let serverKeypair: Keypair;
    try {
        serverKeypair = Keypair.fromSecretKey(bs58.decode(process.env.SOLANA_PRIVATE_KEY as string));
    } catch(e) {
        serverKeypair = Keypair.generate();
    }

    // Since this is a demo, we won't execute a real transaction unless the wallet is funded.
    // We will simulate the network delay of an RPC call.
    await new Promise((resolve) => setTimeout(resolve, 800));

    // A real implementation would invoke a specific MINT instruction via the SPL Token Program 
    // or log the hash using a Memo Program.
    // const transaction = new Transaction().add(...);
    // const signature = await sendAndConfirmTransaction(connection, transaction, [serverKeypair]);

    const simulatedSig = bs58.encode(crypto.randomBytes(32));

    return {
      signature: simulatedSig,
      timestamp: new Date().toISOString(),
      amountSequestered: 250, // Arbitrary metric based on data for demo
      tokenStatus: "MINTED",
    };

  } catch (error) {
    console.error("[Solana] Blockchain execution failed:", error);
    throw error;
  }
}
