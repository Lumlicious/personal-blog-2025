"use client";

import { useEffect, useRef, useState } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  plainText: string;
  language?: string;
  className?: string;
}

export function CodeBlock({ plainText, language = "typescript", className }: CodeBlockProps) {
  const codeRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [plainText]);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(plainText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className={cn("relative my-6 rounded-lg bg-zinc-950 dark:bg-zinc-900", className)}>
      <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2">
        <div className="text-sm text-zinc-400">{language}</div>
        <button
          onClick={onCopy}
          className="flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              <span className="text-sm">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              <span className="text-sm">Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="!m-0 !bg-transparent p-4">
        <code
          ref={codeRef}
          className={`language-${language}`}
        >
          {plainText}
        </code>
      </pre>
    </div>
  );
} 