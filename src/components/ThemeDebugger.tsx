'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeDebugger() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 text-sm">
      <div className="space-y-1">
        <div>Theme: <span className="font-bold text-blue-600 dark:text-blue-400">{theme}</span></div>
        <div>System: <span className="font-bold text-green-600 dark:text-green-400">{systemTheme}</span></div>
        <div>HTML Class: <span className="font-bold text-purple-600 dark:text-purple-400">{document.documentElement.className}</span></div>
      </div>
    </div>
  );
}
