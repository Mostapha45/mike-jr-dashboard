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
    <div className="gradient-border rounded-xl p-6 bg-[var(--card-bg)] hover:scale-[1.01] transition-all duration-300 cursor-default">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3">
            <h3 className="font-bold text-[var(--foreground)] text-xl">{project.name}</h3>
            <span className={`text-2xl ${statusColors[project.status]}`}>
              {statusIcons[project.status]}
            </span>
          </div>
          <p className="text-sm text-[var(--muted)] mt-2 line-clamp-2 leading-relaxed">{project.description}</p>
        </div>
      </div>

      <div className="mb-5">
        <div className="flex justify-between text-xs text-[var(--muted)] mb-2 font-medium">
          <span>Progress</span>
          <span className="gradient-text font-bold">{project.progress}%</span>
        </div>
        <div className="w-full bg-[var(--border)] rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] h-3 rounded-full transition-all duration-500 shadow-lg shadow-[var(--primary)]/20"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-5">
          <span className="text-[var(--muted)] font-medium flex items-center">
            📋 {project.tasks.length} tasks
          </span>
          <span className="text-[var(--muted)] font-medium flex items-center">
            ✅ {project.tasks.filter(t => t.status === 'completed').length} done
          </span>
        </div>
        <span className="text-xs text-[var(--muted)] font-medium">
          Updated {formatDate(project.lastActivity)}
        </span>
      </div>

      {project.tags && project.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs text-[var(--muted)] bg-[var(--card-hover)] px-3 py-1.5 rounded-lg font-medium"
            >
              #{tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="text-xs text-[var(--primary)] font-bold">+{project.tags.length - 3}</span>
          )}
        </div>
      )}
    </div>
  );
}

export default function ProjectsView({ projects, limit, showAllLink }: ProjectsViewProps) {
  const displayProjects = limit ? projects.slice(0, limit) : projects;

  return (
    <section className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold gradient-text">Projects</h2>
        {showAllLink && (
          <button className="text-sm text-[var(--primary)] hover:text-[var(--primary-dark)] transition-colors font-medium px-4 py-2 rounded-lg hover:bg-[var(--card-hover)]">
            View All →
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-5">
        {displayProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {displayProjects.length === 0 && (
        <div className="text-center py-16 text-[var(--muted)]">
          <p className="text-2xl mb-3">🚀</p>
          <p className="text-lg font-medium mb-1">No projects found</p>
          <p className="text-sm">Create a project to get started</p>
        </div>
      )}
    </section>
  );
}
