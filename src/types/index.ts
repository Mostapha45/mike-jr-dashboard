export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed' | 'blocked';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  project?: string;
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
  tags?: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'paused' | 'completed' | 'archived';
  progress: number;
  tasks: Task[];
  createdAt: Date;
  lastActivity: Date;
  tags?: string[];
}

export interface Session {
  id: string;
  startTime: Date;
  endTime?: Date;
  duration?: number;
  channel: string;
  messages: number;
  tasksCreated: number;
  tasksCompleted: number;
  summary?: string;
  tags?: string[];
}

export interface Capability {
  id: string;
  name: string;
  category: string;
  description: string;
  status: 'available' | 'learning' | 'deprecated';
  usageCount: number;
  lastUsed?: Date;
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  proficiency: number; // 0-100
  category: string;
  examples: string[];
}

export interface DashboardStats {
  totalTasks: number;
  activeTasks: number;
  completedTasks: number;
  totalProjects: number;
  activeProjects: number;
  totalSessions: number;
  recentSessions: number;
  capabilitiesAvailable: number;
}

export interface Activity {
  id: string;
  type: 'task' | 'project' | 'session' | 'system';
  description: string;
  timestamp: Date;
  details?: Record<string, any>;
}
