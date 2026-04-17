"use client";

import React, { useState } from "react";
import { Upload, Leaf, AlertCircle, CheckCircle2, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { diagnosePlantHealth } from "@/services/gemini";
import { ScrollArea } from "@/components/ui/scroll-area";

// Parse markdown and convert to styled elements
function parseMarkdownContent(text: string): React.ReactNode[] {
  return text.split('\n').map((line, idx) => {
    // Handle bullet points
    if (line.match(/^\s*[\*\-\•]\s+/)) {
      const content = line.replace(/^\s*[\*\-\•]\s+/, '').trim();
      return (
        <div key={idx} className="flex gap-2 mb-2">
          <span className="text-primary mt-0.5">•</span>
          <div className="flex-1"><>{formatInlineMarkdown(content)}</></div>
        </div>
      );
    }
    
    // Handle numbered lists
    if (line.match(/^\s*\d+\.\s+/)) {
      const content = line.replace(/^\s*\d+\.\s+/, '').trim();
      const num = line.match(/^\s*(\d+)\./)?.[1];
      return (
        <div key={idx} className="flex gap-2 mb-2">
          <span className="text-primary font-semibold min-w-fit">{num}.</span>
          <div className="flex-1"><>{formatInlineMarkdown(content)}</></div>
        </div>
      );
    }

    // Regular paragraphs
    if (line.trim()) {
      return (
        <p key={idx} className="mb-2">
          <>{formatInlineMarkdown(line)}</>
        </p>
      );
    }

    return <div key={idx} className="mb-1" />;
  });
}

// Format inline markdown (**bold**, *italic*, etc.)
function formatInlineMarkdown(text: string): React.ReactNode[] {
  // Handle **bold**
  const boldRegex = /\*\*([^*]+)\*\*/g;
  let match;
  
  let processedText = text;
  const boldMatches = [];
  while ((match = boldRegex.exec(text)) !== null) {
    boldMatches.push({ start: match.index, end: match.index + match[0].length, content: match[1] });
  }

  // Handle *italic*
  const italicRegex = /\*([^*]+)\*/g;
  let processedWithBold = text;
  boldMatches.forEach(m => {
    processedWithBold = processedWithBold.replace(`**${m.content}**`, `[BOLD]${m.content}[/BOLD]`);
  });

  const italicMatches = [];
  while ((match = italicRegex.exec(processedWithBold)) !== null) {
    if (!match[0].includes('[BOLD]')) {
      italicMatches.push({ content: match[1] });
    }
  }

  // Rebuild with formatting
  let result = text;
  
  // Apply bold
  result = result.replace(/\*\*([^*]+)\*\*/g, (_, content) => `[BOLD]${content}[/BOLD]`);
  
  // Apply italic (but not if it's part of bold)
  result = result.replace(/\*([^*]+)\*/g, (match) => {
    if (match.includes('[BOLD]')) return match;
    return `[ITALIC]${match.slice(1, -1)}[/ITALIC]`;
  });

  // Parse and create JSX
  const tokens = result.split(/(\[BOLD\].*?\[\/BOLD\]|\[ITALIC\].*?\[\/ITALIC\])/);
  
  return tokens.map((token, idx) => {
    if (token.startsWith('[BOLD]')) {
      return <strong key={idx} className="text-foreground font-semibold">{token.slice(6, -7)}</strong>;
    }
    if (token.startsWith('[ITALIC]')) {
      return <em key={idx} className="text-secondary italic">{token.slice(8, -8)}</em>;
    }
    return token;
  });
}

// Parse and format diagnosis text
function parseDiagnosis(text: string) {
  // CHANGED: JSX.Element is now React.ReactNode to prevent namespace build errors
  const sections: { title: string; content: React.ReactNode; icon: React.ReactNode; color: string }[] = [];
  
  const lines = text.split('\n');
  let currentSection = '';
  let currentContent: string[] = [];

  lines.forEach((line) => {
    if (line.match(/^#+\s/) || line.match(/^[A-Z][^:]*:$/) || line.match(/^\*\*[^*]+\*\*:\s*$/)) {
      if (currentSection && currentContent.length > 0) {
        sections.push({
          title: currentSection,
          content: <div className="text-[10px] leading-relaxed">{parseMarkdownContent(currentContent.join('\n'))}</div>,
          icon: getIcon(currentSection),
          color: getColor(currentSection)
        });
      }
      currentSection = line.replace(/^#+\s|\*\*|:$/g, '').trim();
      currentContent = [];
    } else if (currentSection) {
      currentContent.push(line);
    }
  });

  if (currentSection && currentContent.length > 0) {
    sections.push({
      title: currentSection,
      content: <div className="text-[10px] leading-relaxed">{parseMarkdownContent(currentContent.join('\n'))}</div>,
      icon: getIcon(currentSection),
      color: getColor(currentSection)
    });
  }

  return sections.length > 0 ? sections : [{ 
    title: 'Analysis', 
    content: <div className="text-[10px] leading-relaxed">{parseMarkdownContent(text)}</div>,
    icon: <Leaf className="w-4 h-4" />, 
    color: 'text-primary' 
  }];
}

function getIcon(title: string) {
  if (title.toLowerCase().includes('disease') || title.toLowerCase().includes('problem')) return <AlertCircle className="w-4 h-4" />;
  if (title.toLowerCase().includes('health') || title.toLowerCase().includes('good')) return <CheckCircle2 className="w-4 h-4" />;
  if (title.toLowerCase().includes('treatment') || title.toLowerCase().includes('recommendation')) return <TrendingUp className="w-4 h-4" />;
  return <Leaf className="w-4 h-4" />;
}

function getColor(title: string) {
  if (title.toLowerCase().includes('disease') || title.toLowerCase().includes('problem')) return 'text-red-400';
  if (title.toLowerCase().includes('health') || title.toLowerCase().includes('good')) return 'text-green-400';
  if (title.toLowerCase().includes('treatment') || title.toLowerCase().includes('recommendation')) return 'text-blue-400';
  return 'text-primary';
}

export function DiagnosePlant() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [diagnosis, setDiagnosis] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const runDiagnostics = async () => {
    if (!preview || !file) return;
    
    setLoading(true);
    setDiagnosis("");
    
    try {
      const base64Data = preview.split(',')[1];
      
      const result = await diagnosePlantHealth(
        base64Data,
        file.type,
        "Analyze this leaf. Identify any diseases and suggest an organic, urban-farming compliant treatment plan."
      );
      
      setDiagnosis(result);
    } catch (error) {
      setDiagnosis("Error: Critical failure in AI analysis subroutine.");
    } finally {
      setLoading(false);
    }
  };

  const sections = diagnosis ? parseDiagnosis(diagnosis) : [];

  return (
    <Card className="flex flex-col bg-gradient-to-br from-[#0d110d] to-[#1a1a2e] border-[rgba(153,69,255,0.3)]">
      <div className="flex justify-between items-center p-4 pb-3 border-b border-white/5">
        <span className="text-[11px] uppercase tracking-[0.1em] text-muted-foreground">Gemini AI Diagnostic</span>
        <span className="text-[11px] uppercase tracking-[0.1em] text-accent">Active</span>
      </div>
      <CardContent className="flex-1 flex flex-col gap-3 p-4">
        {!diagnosis ? (
          <div className="flex-1 flex flex-col gap-3">
          <div className="relative group flex-1 min-h-[120px] max-h-[220px]">
            <Input 
              type="file" 
              accept="image/jpeg, image/png, image/webp" 
              className="hidden" 
              id="plant-img" 
              onChange={handleFileChange}
            />
            <label htmlFor="plant-img" className="w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-[rgba(153,69,255,0.2)] hover:bg-[rgba(153,69,255,0.05)] rounded-lg cursor-pointer transition-colors relative overflow-hidden">
              {preview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={preview} alt="Plant preset" className="absolute inset-0 w-full h-full object-cover opacity-80" />
              ) : (
                <>
                  <Upload className="w-6 h-6 text-muted-foreground mb-2" />
                  <span className="text-[11px] text-muted-foreground uppercase">Upload plant photo</span>
                </>
              )}
            </label>
          </div>
          <p className="text-[11px] text-muted-foreground leading-[1.4]">
            AI will analyze leaf chlorosis and growth patterns against telemetry benchmarks.
          </p>
          <Button 
            onClick={runDiagnostics} 
            disabled={!file || loading} 
            size="sm"
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90 mt-2 text-xs"
          >
            {loading ? "Analyzing..." : "Run Sequence"}
          </Button>
       </div>
        ) : (
          <div className="flex-1 flex flex-col gap-3">
             <ScrollArea className="flex-1 pr-4">
               <div className="space-y-3">
                 {sections.map((section, idx) => (
                   <div key={idx} className="bg-black/20 rounded-lg border border-white/5 p-3 overflow-hidden">
                     <div className={`flex items-center gap-2 mb-2 ${section.color}`}>
                       {section.icon}
                       <h3 className="text-[11px] font-semibold uppercase tracking-wide">{section.title}</h3>
                     </div>
                     <div className="text-muted-foreground">{section.content}</div>
                   </div>
                 ))}
               </div>
             </ScrollArea>
             <Button 
               onClick={() => { setDiagnosis(""); setPreview(null); setFile(null); }} 
               size="sm"
               variant="outline"
               className="w-full mt-3 text-xs border-accent/20 hover:bg-accent/10 text-muted-foreground hover:text-foreground"
             >
               Reset Scan
             </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}