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

const colors = {
  primary: 'bg-[var(--primary)]',
  success: 'bg-[var(--success)]',
  warning: 'bg-[var(--warning)]',
  secondary: 'bg-[var(--secondary)]',
};

function StatCard({ label, value, icon, color }: StatCardProps) {
  return (
    <div className="bg-[var(--card-bg)] rounded-xl p-6 border border-[var(--border)] hover:border-[var(--primary)]/50 transition-all duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-[var(--muted)] mb-1">{label}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-lg ${colors[color]} flex items-center justify-center text-white text-xl`}>
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
    <section>
      <h2 className="text-2xl font-bold mb-6">Overview</h2>
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
