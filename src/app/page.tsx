'use client';

import { useState } from 'react';
import { mockTasks, mockProjects, mockSessions, mockCapabilities, mockSkills, mockActivities, mockStats } from '@/lib/mockData';
import Header from '@/components/Header';
import StatsGrid from '@/components/StatsGrid';
import TaskBoard from '@/components/TaskBoard';
import ProjectsView from '@/components/ProjectsView';
import SessionsView from '@/components/SessionsView';
import CapabilitiesView from '@/components/CapabilitiesView';
import SkillsView from '@/components/SkillsView';
import ActivityFeed from '@/components/ActivityFeed';
import type { Task, View } from '@/types';

export default function Dashboard() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [tasks, setTasks] = useState<Task[]>(mockTasks);

  const handleTaskUpdate = (updatedTask: Task) => {
    setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Header currentView={currentView} onViewChange={setCurrentView} />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {currentView === 'dashboard' && (
          <div className="space-y-8">
            <StatsGrid stats={mockStats} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <TaskBoard
                  tasks={tasks}
                  onTaskUpdate={handleTaskUpdate}
                  title="Active Tasks"
                  limit={5}
                  showAllLink
                />
              </div>
              <div className="space-y-8">
                <ProjectsView projects={mockProjects} limit={3} showAllLink />
                <ActivityFeed activities={mockActivities} limit={5} />
              </div>
            </div>

            <SessionsView sessions={mockSessions} limit={4} showAllLink />
          </div>
        )}

        {currentView === 'tasks' && (
          <TaskBoard
            tasks={tasks}
            onTaskUpdate={handleTaskUpdate}
            title="All Tasks"
            showAllLink={false}
          />
        )}

        {currentView === 'projects' && (
          <ProjectsView projects={mockProjects} showAllLink={false} />
        )}

        {currentView === 'sessions' && (
          <SessionsView sessions={mockSessions} showAllLink={false} />
        )}

        {currentView === 'capabilities' && (
          <CapabilitiesView capabilities={mockCapabilities} />
        )}

        {currentView === 'skills' && (
          <SkillsView skills={mockSkills} />
        )}
      </main>
    </div>
  );
}
