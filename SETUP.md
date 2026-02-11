# Quick Setup Guide

## Installation & Running

### 1. Install Dependencies
```bash
cd mike-jr-dashboard
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open http://localhost:3000 in your browser.

### 3. Build for Production
```bash
npm run build
npm start
```

## Project Structure

```
mike-jr-dashboard/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── globals.css        # Global styles with Tailwind
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Main dashboard page
│   ├── components/            # React components
│   │   ├── ActivityFeed.tsx   # Recent activity timeline
│   │   ├── CapabilitiesView.tsx # AI capabilities list
│   │   ├── Header.tsx         # Navigation header
│   │   ├── ProjectsView.tsx   # Project cards
│   │   ├── SessionsView.tsx   # Session history
│   │   ├── SkillsView.tsx     # Skill proficiency cards
│   │   ├── StatsGrid.tsx      # Overview statistics
│   │   └── TaskBoard.tsx      # Task management
│   ├── lib/
│   │   └── mockData.ts        # Mock data for development
│   └── types/
│       └── index.ts           # TypeScript definitions
├── public/                    # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── next.config.js
└── README.md                 # Full documentation
```

## Features

- **Task Management** - Create, track, and update tasks with status, priority, and due dates
- **Project Overview** - Monitor progress across multiple projects
- **Session History** - View past interactions with metrics and summaries
- **Capabilities** - Browse available AI capabilities and usage stats
- **Skills** - Track technical proficiencies with progress indicators
- **Activity Feed** - Real-time feed of recent actions

## Backend Integration

To connect to a real backend:

1. Create `src/lib/api.ts`:
```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export async function fetchTasks(): Promise<Task[]> {
  const response = await fetch(`${API_BASE_URL}/tasks`);
  return response.json();
}
```

2. Replace mock data imports with API calls in components

## Customization

### Colors
Edit `src/app/globals.css` to customize the color scheme:

```css
:root {
  --primary: #6366f1;
  --secondary: #8b5cf6;
  --success: #10b981;
  /* ... etc */
}
```

### Add New View
1. Create component in `src/components/`
2. Add to navigation in `src/components/Header.tsx`
3. Define types in `src/types/index.ts`

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import in Vercel
3. Deploy automatically

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

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **Runtime**: Node.js 18+
