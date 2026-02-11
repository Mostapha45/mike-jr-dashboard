'use client';

import type { Session } from '@/types';

interface SessionsViewProps {
  sessions: Session[];
  limit?: number;
  showAllLink?: boolean;
}

function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}

function formatDate(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) {
    return 'Today';
  } else if (days === 1) {
    return 'Yesterday';
  } else if (days < 7) {
    return `${days} days ago`;
  } else {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
    }).format(date);
  }
}

function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
}

function SessionCard({ session }: { session: Session }) {
  return (
    <div className="bg-[var(--card-bg)] rounded-lg p-5 border border-[var(--border)] hover:border-[var(--primary)]/50 transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-xl">💬</span>
            <h3 className="font-semibold text-[var(--foreground)]">{session.channel}</h3>
            {session.tags && session.tags.length > 0 && (
              <div className="flex gap-1">
                {session.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-[var(--muted)] bg-[var(--border)] px-2 py-0.5 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <p className="text-sm text-[var(--muted)]">
            {formatDate(session.startTime)} • {formatTime(session.startTime)}
          </p>
        </div>
        <span className="text-sm text-[var(--muted)]">
          {formatDuration(session.duration || 0)}
        </span>
      </div>

      {session.summary && (
        <p className="text-sm text-[var(--foreground)] mb-4 line-clamp-2">
          {session.summary}
        </p>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-[var(--primary)]">{session.messages}</p>
          <p className="text-xs text-[var(--muted)]">Messages</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-[var(--success)]">{session.tasksCreated}</p>
          <p className="text-xs text-[var(--muted)]">Created</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-[var(--secondary)]">{session.tasksCompleted}</p>
          <p className="text-xs text-[var(--muted)]">Completed</p>
        </div>
      </div>
    </div>
  );
}

export default function SessionsView({ sessions, limit, showAllLink }: SessionsViewProps) {
  const displaySessions = limit ? sessions.slice(0, limit) : sessions;

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Recent Sessions</h2>
        {showAllLink && (
          <button className="text-sm text-[var(--primary)] hover:text-[var(--primary-dark)] transition-colors">
            View All →
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {displaySessions.map((session) => (
          <SessionCard key={session.id} session={session} />
        ))}
      </div>

      {displaySessions.length === 0 && (
        <div className="text-center py-12 text-[var(--muted)]">
          <p className="text-lg mb-2">No sessions found</p>
          <p className="text-sm">Sessions will appear here after you interact with Mike Jr.</p>
        </div>
      )}
    </section>
  );
}
