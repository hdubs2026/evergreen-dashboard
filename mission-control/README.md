# 🚀 Mission Control Dashboard

A clean, Linear-inspired dashboard for managing Evergreen Landscaping AI agents, built with Next.js 14.

## Features

- **Agent Dashboard**: Monitor all AI agents (Jarvis, Jordan, Donna, Jerry)
- **System Health**: Real-time status of integrations (Jobber, QuickBooks, etc.)
- **Task Management**: View and manage active tasks
- **Memory System**: Monitor Obsidian vault status
- **Custom Tools**: Build and manage automation tools
- **Clean UI**: Linear.app-inspired design with dark/light mode

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Lucide React** (icons)
- **Local hosting** (localhost:3000)

## Getting Started

### Installation

```bash
cd /Users/jarvishstark/.openclaw/workspace/mission-control
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
mission-control/
├── app/                    # Next.js 14 App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Dashboard page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Sidebar.tsx        # Navigation sidebar
│   ├── Header.tsx         # Top header
│   ├── AgentCard.tsx      # Agent status cards
│   └── StatCard.tsx       # Statistics cards
├── public/                # Static assets
└── package.json          # Dependencies
```

## Features in Detail

### 1. Agent Monitoring
- Real-time status of all AI agents
- Last activity tracking
- Active task counts
- Quick access to agent details

### 2. System Health
- Integration status (Jobber, QuickBooks, Google Sheets, etc.)
- Latency monitoring
- Health indicators with color coding

### 3. Task Management
- View all active tasks
- Filter by agent, status, priority
- Create new tasks
- Track progress

### 4. Memory System
- Obsidian vault status
- iCloud sync monitoring
- Checkpoint tracking
- Daily log access

### 5. Custom Tools Builder
- Build new automation tools
- Configure existing tools
- Monitor tool performance
- Create workflows

## Integration Points

### Current Integrations
- **Jobber API**: Client and job data
- **QuickBooks**: Financial data via Zapier
- **Google Sheets**: Cash flow modeling
- **Discord**: Alerts and notifications
- **Obsidian**: Memory vault system

### Planned Integrations
- **Weather API**: For scheduling
- **Calendar**: Team scheduling
- **Email**: Client communications
- **SMS**: Quick notifications

## Design Philosophy

### Inspired by Linear.app
- Clean, minimal interface
- Fast and responsive
- Keyboard shortcuts ready
- Dark/light mode support

### User Experience
- Single dashboard for all operations
- Real-time updates
- Quick actions for common tasks
- Comprehensive but not overwhelming

## Development Notes

### Styling
- Uses Tailwind CSS for utility-first styling
- Custom color palette with CSS variables
- Responsive design for all screen sizes
- Dark mode support with CSS variables

### Components
- Reusable, typed components
- Consistent design patterns
- Accessible markup
- Performance optimized

### State Management
- Currently using React state (simple)
- Can be extended with Zustand/Redux if needed
- API routes for backend integration

## Deployment

### Local Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm start
```

### Docker (Optional)
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

## Next Steps

### Phase 1 (Complete)
- ✅ Basic dashboard structure
- ✅ Agent monitoring
- ✅ System health display
- ✅ Task management table

### Phase 2 (Next)
- [ ] Real data integration
- [ ] API endpoints for agents
- [ ] Live updates via WebSocket
- [ ] Custom tools builder UI

### Phase 3 (Future)
- [ ] User authentication
- [ ] Multi-user support
- [ ] Advanced analytics
- [ ] Mobile app

## License

Built for Evergreen Landscaping & Design internal use.

---
**Built by Jarvis (AI Orchestrator)**  
**Date:** 2026-04-20  
**Purpose:** Mission Control for AI agent system