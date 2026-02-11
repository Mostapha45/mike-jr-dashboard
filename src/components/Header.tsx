'use client';

import type { View } from '@/types';

interface HeaderProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

const navItems: { id: View; label: string; icon: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
  { id: 'tasks', label: 'Tasks', icon: '📋' },
  { id: 'projects', label: 'Projects', icon: '🚀' },
  { id: 'sessions', label: 'Sessions', icon: '💬' },
  { id: 'capabilities', label: 'Capabilities', icon: '⚡' },
  { id: 'skills', label: 'Skills', icon: '🎯' },
];

export default function Header({ currentView, onViewChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 glass border-b border-[var(--border)]">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center glow">
              <span className="text-white font-bold text-xl">MJ</span>
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">Mike Jr.</h1>
              <p className="text-xs text-[var(--muted)]">AI Assistant Dashboard</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                  currentView === item.id
                    ? 'bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white shadow-lg shadow-[var(--primary)]/25'
                    : 'text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--card-hover)]'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center space-x-2 text-sm">
              <div className="w-2.5 h-2.5 rounded-full bg-[var(--success)] animate-pulse"></div>
              <span className="text-[var(--success)] font-medium">Online</span>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="flex md:hidden overflow-x-auto space-x-2 mt-4 pb-2 -mx-4 px-4 scrollbar-hide">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-200 flex items-center space-x-1.5 ${
                currentView === item.id
                  ? 'bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white'
                  : 'text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--card-hover)]'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
