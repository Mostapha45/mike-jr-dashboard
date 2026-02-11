# Mike Jr. Dashboard

A modern, React/Next.js dashboard for managing Mike Jr. (AI assistant). Track tasks, projects, sessions, capabilities, and activity history in a clean, intuitive interface.

## Features

- **Task Management** - Create, track, and update tasks with status, priority, and due dates
- **Project Overview** - Monitor progress across multiple projects with visual indicators
- **Session History** - View past interactions with messages, tasks created/completed, and summaries
- **Capabilities** - Browse available AI capabilities and their usage statistics
- **Skills** - Track technical proficiencies with progress indicators
- **Activity Feed** - Real-time feed of all recent actions and events
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Dark/Light Mode** - Automatic theme switching based on system preferences

## Tech Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React Hooks (useState)
- **Icons:** Emojis (for zero dependencies)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd mike-jr-dashboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

### Running the App

**Development Mode:**
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

**Production Build:**
```bash
npm run build
npm start
```

## Project Structure

```
mike-jr-dashboard/
├── src/
│   ├── app/
│   │   ├── globals.css      # Global styles with Tailwind
│   │   ├── layout.tsx       # Root layout component
│   │   └── page.tsx         # Main dashboard page
│   ├── components/
│   │   ├── ActivityFeed.tsx
│   │   ├── CapabilitiesView.tsx
│   │   ├── Header.tsx
│   │   ├── ProjectsView.tsx
│   │   ├── SessionsView.tsx
│   │   ├── SkillsView.tsx
│   │   ├── StatsGrid.tsx
│   │   └── TaskBoard.tsx
│   ├── lib/
│   │   └── mockData.ts      # Mock data for development
│   └── types/
│       └── index.ts         # TypeScript type definitions
├── public/                  # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
└── next.config.js
```

## Components Overview

### Core Components

- **Header** - Navigation bar with responsive mobile menu
- **StatsGrid** - Overview statistics cards
- **TaskBoard** - Kanban-style task management with filtering
- **ProjectsView** - Project cards with progress tracking
- **SessionsView** - Session history with metrics
- **CapabilitiesView** - Organized list of AI capabilities
- **SkillsView** - Skill proficiency cards with progress bars
- **ActivityFeed** - Recent activity timeline

## Data Structure

### Task
```typescript
{
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
```

### Project
```typescript
{
  id: string;
  name: string;
  description: string;
  status: 'active' | 'paused' | 'completed' | 'archived';
  progress: number; // 0-100
  tasks: Task[];
  createdAt: Date;
  lastActivity: Date;
  tags?: string[];
}
```

## Backend API Integration

The dashboard currently uses mock data (`src/lib/mockData.ts`). To connect to a real backend:

1. Replace mock data imports with API calls
2. Use `fetch()` or a library like `axios` in `useEffect` hooks
3. Handle loading and error states
4. Add API configuration in `src/lib/api.ts`

Example API integration pattern:
```typescript
// src/lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export async function fetchTasks(): Promise<Task[]> {
  const response = await fetch(`${API_BASE_URL}/tasks`);
  return response.json();
}

// In component
import { useEffect, useState } from 'react';
import { fetchTasks } from '@/lib/api';

function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks().then(tasks => {
      setTasks(tasks);
      setLoading(false);
    });
  }, []);
  // ...
}
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Deploy automatically on push

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Static Export

For hosting on static servers (Netlify, GitHub Pages):

```javascript
// next.config.js
module.exports = {
  output: 'export',
  images: { unoptimized: true },
}
```

Run: `npm run build` and deploy the `out/` directory.

## Customization

### Theme Colors

Edit `src/app/globals.css` to customize colors:

```css
:root {
  --background: #0a0a0a;
  --foreground: #ededed;
  --primary: #6366f1;
  --secondary: #8b5cf6;
  /* ... */
}
```

### Add New Features

1. Create component in `src/components/`
2. Add to navigation in `src/components/Header.tsx`
3. Define types in `src/types/index.ts`
4. Add mock data in `src/lib/mockData.ts`

## Development Tips

- Use TypeScript strict mode for type safety
- Run `npm run lint` to check code quality
- Test responsive design at different viewport sizes
- Mock new features before API integration
- Use Tailwind's responsive prefixes (`md:`, `lg:`) for layout adjustments

## License

MIT

## Future Enhancements

- Real-time updates with WebSockets
- User authentication and permissions
- Task comments and attachments
- Kanban drag-and-drop interface
- Advanced filtering and search
- Export to CSV/PDF
- Calendar view for tasks
- Team collaboration features
- Integration with external tools (GitHub, Jira, etc.)
