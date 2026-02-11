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
    <div className="gradient-border rounded-xl p-6 bg-[var(--card-bg)] hover:scale-[1.01] transition-all duration-300 cursor-default">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-bold text-[var(--foreground)] mb-2 text-xl">{capability.name}</h3>
          <p className="text-sm text-[var(--muted)] leading-relaxed">{capability.description}</p>
        </div>
        <span className={`flex items-center space-x-2 text-xs px-3 py-1.5 rounded-full font-medium ${
          capability.status === 'available' ? 'bg-[var(--success)]/10 text-[var(--success)]' :
          capability.status === 'learning' ? 'bg-[var(--warning)]/10 text-[var(--warning)]' :
          'bg-[var(--danger)]/10 text-[var(--danger)]'
        }`}>
          <span className={`w-2 h-2 rounded-full ${statusColors[capability.status]} animate-pulse`}></span>
          {statusLabels[capability.status]}
        </span>
      </div>

      <div className="flex items-center justify-between mt-5">
        <div className="flex items-center space-x-5 text-sm">
          <span className="text-[var(--muted)] font-medium flex items-center">
            🏷️ {capability.category}
          </span>
          <span className="text-[var(--primary)] font-bold flex items-center">
            📊 {capability.usageCount} uses
          </span>
        </div>
        <span className="text-xs text-[var(--muted)] font-medium">
          Last used: {formatDate(capability.lastUsed)}
        </span>
      </div>
    </div>
  );
}

export default function CapabilitiesView({ capabilities }: CapabilitiesViewProps) {
  const categories = Array.from(new Set(capabilities.map(c => c.category)));

  return (
    <section className="animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold gradient-text">Capabilities</h2>
        <p className="text-[var(--muted)] mt-2">Skills and features available in Mike Jr.</p>
      </div>

      <div className="space-y-8">
        {categories.map((category) => (
          <div key={category}>
            <h3 className="text-xl font-bold mb-4 text-[var(--foreground)]">{category}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {capabilities
                .filter(c => c.category === category)
                .map((capability) => (
                  <CapabilityCard key={capability.id} capability={capability} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
