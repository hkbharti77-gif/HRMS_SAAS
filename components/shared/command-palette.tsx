'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/shared/icon';
import { Input } from '@/components/ui/input';
import { useApp } from '@/lib/store';
import { copilotAnswer, copilotSuggestions, type CopilotResponse } from '@/lib/copilot';
import { navConfig } from '@/lib/nav';
import type { Role } from '@/lib/types';

interface SearchResult {
  label: string;
  href: string;
  icon: string;
  group: string;
}

function flattenNav(role: Role): SearchResult[] {
  const items = navConfig[role] ?? [];
  const results: SearchResult[] = [];
  for (const item of items) {
    results.push({ label: item.title, href: item.href, icon: item.icon, group: 'Pages' });
    if (item.children) {
      for (const child of item.children) {
        results.push({ label: child.title, href: child.href, icon: child.icon, group: 'Pages' });
      }
    }
  }
  return results;
}

export function CommandPalette() {
  const { role } = useApp();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [aiResponse, setAiResponse] = React.useState<CopilotResponse | null>(null);
  const [aiLoading, setAiLoading] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Open with Cmd+K / Ctrl+K
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  React.useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setAiResponse(null);
      setActiveIndex(0);
    }
  }, [open]);

  const pages = React.useMemo(() => flattenNav(role), [role]);
  const suggestions = copilotSuggestions(role);

  const filteredPages = React.useMemo(() => {
    if (!query.trim()) return pages.slice(0, 8);
    const q = query.toLowerCase();
    return pages.filter((p) => p.label.toLowerCase().includes(q) || p.group.toLowerCase().includes(q)).slice(0, 8);
  }, [query, pages]);

  const handleSearch = (q: string) => {
    setQuery(q);
    setAiResponse(null);
    if (q.trim().length > 2) {
      setAiLoading(true);
      setTimeout(() => {
        setAiResponse(copilotAnswer(q, role));
        setAiLoading(false);
      }, 400);
    }
  };

  const navigate = (href: string) => {
    router.push(href);
    setOpen(false);
  };

  const showAi = query.trim().length > 2 && (aiResponse || aiLoading);

  const allItems = [...filteredPages];
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, allItems.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && allItems[activeIndex]) {
      e.preventDefault();
      navigate(allItems[activeIndex].href);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center bg-black/50 p-4 pt-[15vh]" onClick={() => setOpen(false)}>
      <div className="w-full max-w-xl overflow-hidden rounded-2xl border bg-card shadow-elevated animate-scale-in" onClick={(e) => e.stopPropagation()}>
        {/* Search input */}
        <div className="flex items-center gap-3 border-b p-4">
          <Icon name="Search" className="h-5 w-5 shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search pages or ask Copilot..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <kbd className="rounded border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">ESC</kbd>
        </div>

        <div className="max-h-[50vh] overflow-y-auto scrollbar-thin">
          {/* AI Copilot Response */}
          {showAi && (
            <div className="border-b p-4">
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 text-white"><Icon name="Sparkles" className="h-3.5 w-3.5" /></div>
                <span className="text-xs font-semibold text-brand-600">Pilot Copilot</span>
              </div>
              {aiLoading ? (
                <div className="flex gap-1 py-2"><span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50" style={{ animationDelay: '0ms' }} /><span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50" style={{ animationDelay: '150ms' }} /><span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50" style={{ animationDelay: '300ms' }} /></div>
              ) : aiResponse ? (
                <div>
                  <p className="text-sm">{aiResponse.text}</p>
                  {aiResponse.table && (
                    <div className="mt-2 overflow-hidden rounded-lg border">
                      <table className="w-full text-xs">
                        <thead className="bg-muted/50"><tr>{aiResponse.table.headers.map((h) => <th key={h} className="px-2 py-1.5 text-left font-medium">{h}</th>)}</tr></thead>
                        <tbody>{aiResponse.table.rows.map((row, i) => <tr key={i} className="border-t">{row.map((cell, j) => <td key={j} className="px-2 py-1.5">{cell}</td>)}</tr>)}</tbody>
                      </table>
                    </div>
                  )}
                  {aiResponse.actions && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {aiResponse.actions.map((a, i) => (
                        <button key={i} onClick={() => navigate(a.href ?? '#')} className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700 transition-colors hover:bg-brand-100 dark:border-brand-800 dark:bg-brand-500/10 dark:text-brand-300">
                          <Icon name={a.icon} className="h-3 w-3" />{a.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          )}

          {/* Suggested questions when empty */}
          {query.trim().length === 0 && (
            <div className="border-b p-4">
              <p className="mb-2 text-xs font-medium text-muted-foreground">Ask Copilot:</p>
              <div className="space-y-1">
                {suggestions.map((s) => (
                  <button key={s} onClick={() => handleSearch(s)} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-accent">
                    <Icon name="Sparkles" className="h-3.5 w-3.5 shrink-0 text-brand-500" />
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Page results */}
          {filteredPages.length > 0 && (
            <div className="p-2">
              <p className="px-2 py-1.5 text-xs font-medium text-muted-foreground">Pages</p>
              {filteredPages.map((page, i) => (
                <button
                  key={page.href}
                  onClick={() => navigate(page.href)}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={cn('flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors', activeIndex === i ? 'bg-accent' : 'hover:bg-accent/50')}
                >
                  <Icon name={page.icon} className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span className="flex-1">{page.label}</span>
                  <Icon name="ChevronRight" className="h-3.5 w-3.5 text-muted-foreground/50" />
                </button>
              ))}
            </div>
          )}

          {filteredPages.length === 0 && query.trim().length > 0 && !showAi && (
            <div className="p-8 text-center">
              <Icon name="SearchX" className="mx-auto mb-2 h-8 w-8 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">No pages found. Try asking Copilot instead.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t px-4 py-2.5 text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><kbd className="rounded border bg-muted px-1 py-0.5 text-[10px]">↑↓</kbd>Navigate</span>
            <span className="flex items-center gap-1"><kbd className="rounded border bg-muted px-1 py-0.5 text-[10px]">↵</kbd>Open</span>
          </div>
          <span className="flex items-center gap-1.5"><Icon name="Sparkles" className="h-3 w-3 text-brand-500" /> Powered by Pilot Copilot</span>
        </div>
      </div>
    </div>
  );
}
