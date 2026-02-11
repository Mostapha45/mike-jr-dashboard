'use client';

import type { View } from '@/types';

interface HeaderProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

const navItems: { id: View; label: string }[] = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'tasks', label: 'Tasks' },
  { id: 'projects', label: 'Projects' },
  { id: 'sessions', label: 'Sessions' },
  { id: 'capabilities', label: 'Capabilities' },
  { id: 'skills', label: 'Skills' },
];

export default function Header({ currentView, onViewChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-[var(--card-bg)]/95 backdrop-blur border-b border-[var(--border)]">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center">
              <span className="text-white font-bold text-lg">MJ</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">Mike Jr.</h1>
              <p className="text-xs text-[var(--muted)]">AI Assistant Dashboard</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentView === item.id
                    ? 'bg-[var(--primary)] text-white'
                    : 'text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--card-hover)]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center space-x-2 text-sm text-[var(--muted)]">
              <div className="w-2 h-2 rounded-full bg-[var(--success)] animate-pulse"></div>
              <span>Online</span>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="flex md:hidden overflow-x-auto space-x-2 mt-4 pb-2 -mx-4 px-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                currentView === item.id
                  ? 'bg-[var(--primary)] text-white'
                  : 'text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--card-hover)]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
