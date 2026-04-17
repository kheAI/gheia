import type {Metadata} from 'next';
import './globals.css';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'Gheia',
  description: 'Decentralized infrastructure that transforms urban balconies and rooftops into Autonomous Carbon Sinks.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={cn("dark", inter.variable, jetBrainsMono.variable)}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
