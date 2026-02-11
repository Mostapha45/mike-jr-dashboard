'use client';

import type { Activity } from '@/types';

interface ActivityFeedProps {
  activities: Activity[];
  limit?: number;
}

const activityIcons = {
  'task': '📋',
  'project': '🚀',
  'session': '💬',
  'system': '⚙️',
};

const activityGradients = {
  'task': 'bg-gradient-to-br from-blue-500 to-blue-600',
  'project': 'bg-gradient-to-br from-purple-500 to-purple-600',
  'session': 'bg-gradient-to-br from-green-500 to-green-600',
  'system': 'bg-gradient-to-br from-gray-500 to-gray-600',
};

function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days}d ago`;

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(date);
}

function ActivityItem({ activity }: { activity: Activity }) {
  return (
    <div className="flex items-start space-x-4 py-4 px-4 border-b border-[var(--border)] last:border-0 hover:bg-[var(--card-hover)] transition-colors duration-200 rounded-lg">
      <div className={`flex-shrink-0 w-10 h-10 rounded-xl ${activityGradients[activity.type]} flex items-center justify-center shadow-lg`}>
        <span className="text-lg">{activityIcons[activity.type]}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-[var(--foreground)] font-medium">{activity.description}</p>
        <p className="text-xs text-[var(--muted)] mt-1 font-medium">{formatRelativeTime(activity.timestamp)}</p>
      </div>
    </div>
  );
}

export default function ActivityFeed({ activities, limit }: ActivityFeedProps) {
  const displayActivities = limit ? activities.slice(0, limit) : activities;

  return (
    <section className="animate-fade-in">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold gradient-text">Recent Activity</h2>
        <span className="text-xs text-[var(--foreground)] bg-[var(--card-hover)] px-3 py-1.5 rounded-lg font-bold">
          {displayActivities.length}
        </span>
      </div>

      <div className="gradient-border rounded-xl bg-[var(--card-bg)] overflow-hidden">
        {displayActivities.map((activity) => (
          <ActivityItem key={activity.id} activity={activity} />
        ))}
      </div>

      {displayActivities.length === 0 && (
        <div className="gradient-border rounded-xl bg-[var(--card-bg)] p-12 text-center text-[var(--muted)]">
          <p className="text-2xl mb-2">📭</p>
          <p className="text-sm font-medium">No recent activity</p>
        </div>
      )}
    </section>
  );
}
