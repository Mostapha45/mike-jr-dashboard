'use client';

import { useState } from 'react';
import type { Task } from '@/types';

interface TaskBoardProps {
  tasks: Task[];
  onTaskUpdate: (task: Task) => void;
  title: string;
  limit?: number;
  showAllLink?: boolean;
}

const statusColors = {
  'todo': 'bg-gradient-to-r from-slate-500 to-slate-600',
  'in-progress': 'bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)]',
  'completed': 'bg-gradient-to-r from-[var(--success)] to-emerald-600',
  'blocked': 'bg-gradient-to-r from-[var(--danger)] to-red-600',
};

const priorityColors = {
  'low': 'bg-slate-400',
  'medium': 'bg-[var(--warning)]',
  'high': 'bg-orange-500',
  'urgent': 'bg-[var(--danger)]',
};

const statusLabels = {
  'todo': 'To Do',
  'in-progress': 'In Progress',
  'completed': 'Completed',
  'blocked': 'Blocked',
};

function TaskCard({ task, onStatusChange }: { task: Task; onStatusChange: (status: Task['status']) => void }) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className="gradient-border rounded-xl p-5 bg-[var(--card-bg)] hover:scale-[1.02] transition-all duration-300 cursor-default">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-[var(--foreground)] mb-2 text-lg">{task.title}</h3>
          <p className="text-sm text-[var(--muted)] line-clamp-2 leading-relaxed">{task.description}</p>
        </div>
        <select
          value={task.status}
          onChange={(e) => onStatusChange(e.target.value as Task['status'])}
          className={`ml-3 text-xs px-3 py-1.5 rounded-full border-0 cursor-pointer focus:ring-2 focus:ring-[var(--primary)] ${statusColors[task.status]} text-white font-medium shadow-lg`}
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>

      <div className="flex items-center justify-between mt-5">
        <div className="flex items-center space-x-3">
          {task.project && (
            <span className="text-xs text-[var(--foreground)] bg-[var(--border)] px-3 py-1.5 rounded-lg font-medium">
              {task.project}
            </span>
          )}
          {task.dueDate && (
            <span className="text-xs text-[var(--muted)] flex items-center">
              📅 {formatDate(task.dueDate)}
            </span>
          )}
        </div>
        <span className={`text-xs font-bold px-3 py-1.5 rounded-full text-white ${priorityColors[task.priority]} shadow-md`}>
          {task.priority.toUpperCase()}
        </span>
      </div>

      {task.tags && task.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {task.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs text-[var(--muted)] bg-[var(--card-hover)] px-3 py-1 rounded-lg font-medium"
            >
              #{tag}
            </span>
          ))}
          {task.tags.length > 3 && (
            <span className="text-xs text-[var(--primary)] font-medium">+{task.tags.length - 3}</span>
          )}
        </div>
      )}
    </div>
  );
}

export default function TaskBoard({ tasks, onTaskUpdate, title, limit, showAllLink }: TaskBoardProps) {
  const [filter, setFilter] = useState<'all' | 'todo' | 'in-progress' | 'completed' | 'blocked'>('all');

  const filteredTasks = tasks
    .filter(task => filter === 'all' || task.status === filter)
    .sort((a, b) => {
      const priorityOrder = { 'urgent': 0, 'high': 1, 'medium': 2, 'low': 3 };
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return b.updatedAt.getTime() - a.updatedAt.getTime();
    })
    .slice(0, limit);

  const handleStatusChange = (taskId: string, newStatus: Task['status']) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      onTaskUpdate({
        ...task,
        status: newStatus,
        updatedAt: new Date(),
      });
    }
  };

  return (
    <section className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold gradient-text">{title}</h2>
        {showAllLink && (
          <button className="text-sm text-[var(--primary)] hover:text-[var(--primary-dark)] transition-colors font-medium px-4 py-2 rounded-lg hover:bg-[var(--card-hover)]">
            View All →
          </button>
        )}
      </div>

      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
        {(['all', 'todo', 'in-progress', 'completed', 'blocked'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 ${
              filter === status
                ? 'bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white shadow-lg shadow-[var(--primary)]/25'
                : 'text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--card-hover)]'
            }`}
          >
            {status === 'all' ? 'All' : statusLabels[status]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onStatusChange={(status) => handleStatusChange(task.id, status)}
          />
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <div className="text-center py-16 text-[var(--muted)]">
          <p className="text-2xl mb-3">📭</p>
          <p className="text-lg font-medium mb-1">No tasks found</p>
          <p className="text-sm">Try adjusting your filters</p>
        </div>
      )}
    </section>
  );
}
