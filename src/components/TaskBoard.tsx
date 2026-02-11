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
  'todo': 'bg-slate-500',
  'in-progress': 'bg-[var(--primary)]',
  'completed': 'bg-[var(--success)]',
  'blocked': 'bg-[var(--danger)]',
};

const priorityColors = {
  'low': 'text-slate-400',
  'medium': 'text-[var(--warning)]',
  'high': 'text-orange-500',
  'urgent': 'text-[var(--danger)]',
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
    <div className="bg-[var(--card-bg)] rounded-lg p-4 border border-[var(--border)] hover:border-[var(--primary)]/50 transition-all duration-200">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h3 className="font-semibold text-[var(--foreground)] mb-1">{task.title}</h3>
          <p className="text-sm text-[var(--muted)] line-clamp-2">{task.description}</p>
        </div>
        <select
          value={task.status}
          onChange={(e) => onStatusChange(e.target.value as Task['status'])}
          className={`ml-3 text-xs px-2 py-1 rounded-full border-0 cursor-pointer focus:ring-2 focus:ring-[var(--primary)] ${statusColors[task.status]} text-white`}
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-3">
          {task.project && (
            <span className="text-xs text-[var(--muted)] bg-[var(--border)] px-2 py-1 rounded">
              {task.project}
            </span>
          )}
          {task.dueDate && (
            <span className="text-xs text-[var(--muted)] flex items-center">
              📅 {formatDate(task.dueDate)}
            </span>
          )}
        </div>
        <span className={`text-xs font-medium ${priorityColors[task.priority]}`}>
          {task.priority.toUpperCase()}
        </span>
      </div>

      {task.tags && task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3">
          {task.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs text-[var(--muted)] bg-[var(--border)] px-2 py-0.5 rounded"
            >
              #{tag}
            </span>
          ))}
          {task.tags.length > 3 && (
            <span className="text-xs text-[var(--muted)]">+{task.tags.length - 3}</span>
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
      // Sort by priority first, then by date
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
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        {showAllLink && (
          <button className="text-sm text-[var(--primary)] hover:text-[var(--primary-dark)] transition-colors">
            View All →
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-1 mb-6 overflow-x-auto pb-2">
        {(['all', 'todo', 'in-progress', 'completed', 'blocked'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              filter === status
                ? 'bg-[var(--primary)] text-white'
                : 'text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--card-hover)]'
            }`}
          >
            {status === 'all' ? 'All' : statusLabels[status]}
          </button>
        ))}
      </div>

      {/* Task Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onStatusChange={(status) => handleStatusChange(task.id, status)}
          />
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <div className="text-center py-12 text-[var(--muted)]">
          <p className="text-lg mb-2">No tasks found</p>
          <p className="text-sm">Try adjusting your filters</p>
        </div>
      )}
    </section>
  );
}
