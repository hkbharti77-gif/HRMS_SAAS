'use client';

import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/shared/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AvatarBadge } from '@/components/shared/avatar-badge';
import { useApp } from '@/lib/store';
import { copilotAnswer, copilotSuggestions, type CopilotResponse, type CopilotAction } from '@/lib/copilot';

interface Msg {
  id: number;
  role: 'user' | 'assistant';
  text: string;
  response?: CopilotResponse;
}

const priorityColors: Record<string, string> = {
  info: 'border-l-info-500',
  warning: 'border-l-warning-500',
  danger: 'border-l-danger-500',
};

const priorityIcon: Record<string, string> = {
  info: 'Info',
  warning: 'AlertTriangle',
  danger: 'AlertOctagon',
};

export function AiAssistant() {
  const { role } = useApp();
  const [open, setOpen] = React.useState(false);
  const [msgs, setMsgs] = React.useState<Msg[]>([
    {
      id: 0,
      role: 'assistant',
      text: "Hi! I'm Pilot Copilot — your AI HR assistant. I can answer questions, draft documents, surface insights, and take you to the right actions. Ask me anything or try a suggestion below.",
    },
  ]);
  const [input, setInput] = React.useState('');
  const [typing, setTyping] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [msgs, open, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Msg = { id: Date.now(), role: 'user', text };
    setMsgs((m) => [...m, userMsg]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      const response = copilotAnswer(text, role);
      setMsgs((m) => [...m, { id: Date.now() + 1, role: 'assistant', text: response.text, response }]);
      setTyping(false);
    }, 700);
  };

  const suggestions = copilotSuggestions(role);

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 text-white shadow-elevated transition-transform hover:scale-105 hover:bg-brand-700"
        aria-label="Open Copilot"
      >
        <Icon name={open ? 'X' : 'Sparkles'} className="h-6 w-6" />
        {!open && (
          <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success-400 opacity-75" />
            <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-success-500" />
          </span>
        )}
      </button>

      {open && (
        <div className="fixed bottom-24 right-5 z-50 flex h-[34rem] w-[calc(100vw-2.5rem)] max-w-md flex-col overflow-hidden rounded-2xl border bg-card shadow-elevated animate-scale-in">
          {/* Header */}
          <div className="flex items-center justify-between border-b bg-gradient-to-r from-brand-600 to-brand-700 p-4 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
                <Icon name="Sparkles" className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">Pilot Copilot</p>
                <p className="text-xs text-white/80">AI HR Assistant · Online</p>
              </div>
            </div>
            <button onClick={() => setMsgs([{ id: 0, role: 'assistant', text: "Hi! I'm Pilot Copilot — your AI HR assistant. Ask me anything or try a suggestion below." }])} className="rounded-lg p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white" title="Clear conversation">
              <Icon name="RotateCcw" className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4 scrollbar-thin">
            {msgs.map((m) => (
              <div key={m.id} className={cn('flex gap-2', m.role === 'user' ? 'justify-end' : 'justify-start')}>
                {m.role === 'assistant' && <AvatarBadge name="AI" size="sm" className="h-7 w-7 shrink-0 bg-brand-600" />}
                <div className={cn('max-w-[85%]', m.role === 'user' ? 'items-end' : 'items-start')}>
                  <div className={cn('rounded-2xl px-3 py-2 text-sm', m.role === 'user' ? 'rounded-br-sm bg-brand-600 text-white' : 'rounded-bl-sm bg-muted text-foreground')}>
                    {m.text}
                  </div>
                  {/* Rich response cards */}
                  {m.response?.table && (
                    <div className="mt-2 overflow-hidden rounded-lg border">
                      <table className="w-full text-xs">
                        <thead className="bg-muted/50">
                          <tr>{m.response.table.headers.map((h) => <th key={h} className="px-2 py-1.5 text-left font-medium">{h}</th>)}</tr>
                        </thead>
                        <tbody>
                          {m.response.table.rows.map((row, i) => (
                            <tr key={i} className="border-t">{row.map((cell, j) => <td key={j} className="px-2 py-1.5">{cell}</td>)}</tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  {m.response?.actions && m.response.actions.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {m.response.actions.map((a, i) => <ActionChip key={i} action={a} />)}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex gap-2">
                <AvatarBadge name="AI" size="sm" className="h-7 w-7 bg-brand-600" />
                <div className="rounded-2xl rounded-bl-sm bg-muted px-4 py-3">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50" style={{ animationDelay: '0ms' }} />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50" style={{ animationDelay: '150ms' }} />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            {msgs.length <= 1 && !typing && (
              <div className="space-y-1.5 pt-2">
                <p className="px-1 text-xs font-medium text-muted-foreground">Suggested questions:</p>
                {suggestions.map((s) => (
                  <button key={s} onClick={() => send(s)} className="flex w-full items-center gap-2 rounded-lg border bg-card px-3 py-2 text-left text-xs transition-colors hover:bg-accent hover:border-brand-200 dark:hover:border-brand-800">
                    <Icon name="CornerDownRight" className="h-3.5 w-3.5 shrink-0 text-brand-500" />
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex items-center gap-2 border-t p-3">
            <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask Copilot anything..." className="h-9" />
            <Button type="submit" size="icon" className="h-9 w-9 shrink-0" disabled={!input.trim()}>
              <Icon name="Send" className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </>
  );
}

function ActionChip({ action }: { action: CopilotAction }) {
  return (
    <Link href={action.href ?? '#'} className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700 transition-colors hover:bg-brand-100 dark:border-brand-800 dark:bg-brand-500/10 dark:text-brand-300 dark:hover:bg-brand-500/20">
      <Icon name={action.icon} className="h-3 w-3" />
      {action.label}
    </Link>
  );
}
