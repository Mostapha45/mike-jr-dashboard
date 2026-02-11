'use client';

import type { Project } from '@/types';

interface ProjectsViewProps {
  projects: Project[];
  limit?: number;
  showAllLink?: boolean;
}

const statusColors = {
  'active': 'text-[var(--success)]',
  'paused': 'text-[var(--warning)]',
  'completed': 'text-blue-500',
  'archived': 'text-[var(--muted)]',
};

const statusIcons = {
  'active': '🟢',
  'paused': '⏸️',
  'completed': '✅',
  'archived': '📦',
};

function ProjectCard({ project }: { project: Project }) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className="bg-[var(--card-bg)] rounded-lg p-5 border border-[var(--border)] hover:border-[var(--primary)]/50 transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold text-[var(--foreground)]">{project.name}</h3>
            <span className={`text-sm ${statusColors[project.status]}`}>
              {statusIcons[project.status]}
            </span>
          </div>
          <p className="text-sm text-[var(--muted)] mt-1 line-clamp-2">{project.description}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-[var(--muted)] mb-1">
          <span>Progress</span>
          <span>{project.progress}%</span>
        </div>
        <div className="w-full bg-[var(--border)] rounded-full h-2">
          <div
            className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] h-2 rounded-full transition-all duration-300"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-4">
          <span className="text-[var(--muted)]">
            📋 {project.tasks.length} tasks
          </span>
          <span className="text-[var(--muted)]">
            ✅ {project.tasks.filter(t => t.status === 'completed').length} done
          </span>
        </div>
        <span className="text-xs text-[var(--muted)]">
          Updated {formatDate(project.lastActivity)}
        </span>
      </div>

      {/* Tags */}
      {project.tags && project.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs text-[var(--muted)] bg-[var(--border)] px-2 py-0.5 rounded"
            >
              #{tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="text-xs text-[var(--muted)]">+{project.tags.length - 3}</span>
          )}
        </div>
      )}
    </div>
  );
}

export default function ProjectsView({ projects, limit, showAllLink }: ProjectsViewProps) {
  const displayProjects = limit ? projects.slice(0, limit) : projects;

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Projects</h2>
        {showAllLink && (
          <button className="text-sm text-[var(--primary)] hover:text-[var(--primary-dark)] transition-colors">
            View All →
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {displayProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {displayProjects.length === 0 && (
        <div className="text-center py-12 text-[var(--muted)]">
          <p className="text-lg mb-2">No projects found</p>
          <p className="text-sm">Create a project to get started</p>
        </div>
      )}
    </section>
  );
}
