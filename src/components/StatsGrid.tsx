'use client';

import type { DashboardStats } from '@/types';

interface StatsGridProps {
  stats: DashboardStats;
}

interface StatCardProps {
  label: string;
  value: number;
  icon: string;
  color: 'primary' | 'success' | 'warning' | 'secondary';
}

const colorGradients = {
  primary: 'from-[var(--primary)] to-[var(--primary-dark)]',
  success: 'from-[var(--success)] to-emerald-600',
  warning: 'from-[var(--warning)] to-amber-600',
  secondary: 'from-[var(--secondary)] to-cyan-600',
};

function StatCard({ label, value, icon, color }: StatCardProps) {
  return (
    <div className="gradient-border rounded-xl p-6 bg-[var(--card-bg)] hover:scale-105 transition-all duration-300 cursor-default">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-[var(--muted)] mb-2 font-medium">{label}</p>
          <p className="text-4xl font-bold gradient-text">{value}</p>
        </div>
        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colorGradients[color]} flex items-center justify-center text-white text-2xl shadow-lg shadow-[var(--primary)]/20`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

export default function StatsGrid({ stats }: StatsGridProps) {
  const statCards: Omit<StatCardProps, 'value'>[] = [
    { label: 'Total Tasks', icon: '📋', color: 'primary' },
    { label: 'Active Tasks', icon: '⚡', color: 'warning' },
    { label: 'Completed Tasks', icon: '✅', color: 'success' },
    { label: 'Active Projects', icon: '🚀', color: 'secondary' },
  ];

  return (
    <section className="animate-fade-in">
      <h2 className="text-3xl font-bold mb-6 gradient-text">Overview</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, index) => (
          <StatCard
            key={card.label}
            {...card}
            value={Object.values(stats)[index] as number}
          />
        ))}
      </div>
    </section>
  );
}
