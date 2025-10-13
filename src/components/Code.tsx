"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeProps {
  className?: string;
  children: string;
}

export default function Code({ className, children }: CodeProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const language = className?.replace("language-", "") || "text";
  const themeCode = theme === "dark" ? oneDark : oneLight;

  if (!mounted) {
    return (
      <pre className="rounded-xl p-4 bg-transparent animation-blur">
        <code>{children}</code>
      </pre>
    );
  }

  return (
    <SyntaxHighlighter
      language={language}
      style={themeCode}
      className="rounded-xl p-4 animation-blur"
      wrapLongLines
    >
      {children}
    </SyntaxHighlighter>
  );
}
