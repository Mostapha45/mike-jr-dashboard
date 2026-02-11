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
    <div className="gradient-border rounded-xl p-6 bg-[var(--card-bg)] hover:scale-[1.01] transition-all duration-300 cursor-default">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-2xl">💬</span>
            <h3 className="font-bold text-[var(--foreground)] text-xl">{session.channel}</h3>
            {session.tags && session.tags.length > 0 && (
              <div className="flex gap-1.5">
                {session.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-[var(--muted)] bg-[var(--card-hover)] px-3 py-1 rounded-lg font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <p className="text-sm text-[var(--muted)] font-medium">
            {formatDate(session.startTime)} • {formatTime(session.startTime)}
          </p>
        </div>
        <span className="text-sm text-[var(--primary)] font-bold px-3 py-1.5 bg-[var(--card-hover)] rounded-lg">
          {formatDuration(session.duration || 0)}
        </span>
      </div>

      {session.summary && (
        <p className="text-sm text-[var(--foreground)] mb-5 line-clamp-2 leading-relaxed">
          {session.summary}
        </p>
      )}

      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-3 rounded-lg bg-[var(--card-hover)]">
          <p className="text-2xl font-bold text-[var(--primary)]">{session.messages}</p>
          <p className="text-xs text-[var(--muted)] font-medium">Messages</p>
        </div>
        <div className="text-center p-3 rounded-lg bg-[var(--card-hover)]">
          <p className="text-2xl font-bold text-[var(--success)]">{session.tasksCreated}</p>
          <p className="text-xs text-[var(--muted)] font-medium">Created</p>
        </div>
        <div className="text-center p-3 rounded-lg bg-[var(--card-hover)]">
          <p className="text-2xl font-bold text-[var(--secondary)]">{session.tasksCompleted}</p>
          <p className="text-xs text-[var(--muted)] font-medium">Completed</p>
        </div>
      </div>
    </div>
  );
}

export default function SessionsView({ sessions, limit, showAllLink }: SessionsViewProps) {
  const displaySessions = limit ? sessions.slice(0, limit) : sessions;

  return (
    <section className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold gradient-text">Sessions</h2>
        {showAllLink && (
          <button className="text-sm text-[var(--primary)] hover:text-[var(--primary-dark)] transition-colors font-medium px-4 py-2 rounded-lg hover:bg-[var(--card-hover)]">
            View All →
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
        {displaySessions.map((session) => (
          <SessionCard key={session.id} session={session} />
        ))}
      </div>

      {displaySessions.length === 0 && (
        <div className="text-center py-16 text-[var(--muted)]">
          <p className="text-2xl mb-3">💬</p>
          <p className="text-lg font-medium mb-1">No sessions found</p>
          <p className="text-sm">Start a conversation to track your sessions</p>
        </div>
      )}
    </section>
  );
}
