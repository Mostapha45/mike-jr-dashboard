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

const activityColors = {
  'task': 'text-blue-500',
  'project': 'text-purple-500',
  'session': 'text-green-500',
  'system': 'text-gray-500',
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
    <div className="flex items-start space-x-3 py-3 border-b border-[var(--border)] last:border-0">
      <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-[var(--border)] flex items-center justify-center ${activityColors[activity.type]}`}>
        <span className="text-sm">{activityIcons[activity.type]}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-[var(--foreground)]">{activity.description}</p>
        <p className="text-xs text-[var(--muted)] mt-0.5">{formatRelativeTime(activity.timestamp)}</p>
      </div>
    </div>
  );
}

export default function ActivityFeed({ activities, limit }: ActivityFeedProps) {
  const displayActivities = limit ? activities.slice(0, limit) : activities;

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Recent Activity</h2>
        <span className="text-xs text-[var(--muted)] bg-[var(--border)] px-2 py-1 rounded">
          {displayActivities.length}
        </span>
      </div>

      <div className="bg-[var(--card-bg)] rounded-lg border border-[var(--border)] overflow-hidden">
        {displayActivities.map((activity) => (
          <ActivityItem key={activity.id} activity={activity} />
        ))}
      </div>

      {displayActivities.length === 0 && (
        <div className="bg-[var(--card-bg)] rounded-lg border border-[var(--border)] p-8 text-center text-[var(--muted)]">
          <p className="text-sm">No recent activity</p>
        </div>
      )}
    </section>
  );
}
