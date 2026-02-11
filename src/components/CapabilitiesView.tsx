'use client';

import type { Capability } from '@/types';

interface CapabilitiesViewProps {
  capabilities: Capability[];
}

const statusColors = {
  'available': 'bg-[var(--success)]',
  'learning': 'bg-[var(--warning)]',
  'deprecated': 'bg-[var(--danger)]',
};

const statusLabels = {
  'available': 'Available',
  'learning': 'Learning',
  'deprecated': 'Deprecated',
};

function CapabilityCard({ capability }: { capability: Capability }) {
  const formatDate = (date?: Date) => {
    if (!date) return 'Never';
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    return `${Math.floor(days / 30)} months ago`;
  };

  return (
    <div className="bg-[var(--card-bg)] rounded-lg p-5 border border-[var(--border)] hover:border-[var(--primary)]/50 transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-[var(--foreground)] mb-1">{capability.name}</h3>
          <p className="text-sm text-[var(--muted)]">{capability.description}</p>
        </div>
        <span className={`flex items-center space-x-2 text-xs px-2 py-1 rounded-full ${
          capability.status === 'available' ? 'bg-[var(--success)]/10 text-[var(--success)]' :
          capability.status === 'learning' ? 'bg-[var(--warning)]/10 text-[var(--warning)]' :
          'bg-[var(--danger)]/10 text-[var(--danger)]'
        }`}>
          <span className={`w-2 h-2 rounded-full ${statusColors[capability.status]}`}></span>
          {statusLabels[capability.status]}
        </span>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-4 text-sm">
          <span className="text-[var(--muted)]">
            🏷️ {capability.category}
          </span>
          <span className="text-[var(--muted)]">
            📊 Used {capability.usageCount}x
          </span>
        </div>
        <span className="text-xs text-[var(--muted)]">
          Last used: {formatDate(capability.lastUsed)}
        </span>
      </div>
    </div>
  );
}

export default function CapabilitiesView({ capabilities }: CapabilitiesViewProps) {
  const categories = Array.from(new Set(capabilities.map(c => c.category)));

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Capabilities</h2>
        <p className="text-[var(--muted)] mt-1">Skills and features available in Mike Jr.</p>
      </div>

      <div className="space-y-8">
        {categories.map((category) => (
          <div key={category}>
            <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4 flex items-center">
              <span className="w-2 h-2 rounded-full bg-[var(--primary)] mr-2"></span>
              {category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {capabilities
                .filter(cap => cap.category === category)
                .map((capability) => (
                  <CapabilityCard key={capability.id} capability={capability} />
                ))}
            </div>
          </div>
        ))}
      </div>

      {capabilities.length === 0 && (
        <div className="text-center py-12 text-[var(--muted)]">
          <p className="text-lg mb-2">No capabilities found</p>
          <p className="text-sm">Capabilities will appear here as Mike Jr. learns new skills.</p>
        </div>
      )}
    </section>
  );
}
