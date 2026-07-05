# AMS Workbench

Enterprise-grade AI-Based Application Maintenance and Support (AMS) Workbench — a production-ready React frontend.

## Tech Stack

- **React 19** + **Vite**
- **React Router DOM** — client-side routing
- **Material UI (MUI)** — component library with custom theme
- **React Hook Form** — form management
- **Axios** — HTTP client (pre-configured, not connected)
- **React Icons** — icon system
- **Framer Motion** — animations
- **Recharts** — data visualization
- **React Dropzone** — file uploads
- **React Hot Toast** — notifications

## Design System

Modern AI dashboard inspired by Azure Portal, GitHub, Jira, and ServiceNow.

| Token | Value |
|-------|-------|
| Primary | `#2563EB` |
| Slate 800 | `#1E293B` |
| Slate 900 | `#0F172A` |
| Background | `#F8FAFC` |
| Success | `#10B981` |
| Error | `#EF4444` |
| Warning | `#F59E0B` |

## Project Structure

```
src/
├── components/
│   ├── common/          # Reusable UI (StatCard, DataTable, etc.)
│   └── layout/          # App shell (Sidebar, Header, AppLayout)
├── pages/               # Route-level page components
├── hooks/               # Custom React hooks
├── services/            # API & data services
├── data/dummy/          # Dummy JSON data
├── theme/               # MUI theme configuration
├── styles/              # Global CSS
├── utils/               # Constants, helpers
└── routes/              # React Router config
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Reusable Components

Every page uses the shared component library:

- **LoadingState** — spinner with message
- **EmptyState** — no-data placeholder with actions
- **ErrorState** — error display with retry
- **SkeletonLoader** — skeleton presets (card, table, page, stat)
- **PageHeader** — gradient/simple headers with breadcrumbs
- **StatCard** — KPI cards with trend indicators
- **StatusBadge** — status/priority badges
- **GlassCard** — glassmorphism content containers
- **DataTable** — sortable tables with hover states
- **SearchBar** — search input with icon

## Pages

| Route | Status |
|-------|--------|
| `/` | Dashboard (complete) |
| `/incidents` | Placeholder |
| `/tickets` | Placeholder |
| `/knowledge` | Placeholder |
| `/ai-assistant` | Placeholder |
| `/analytics` | Placeholder |
| `/settings` | Placeholder |

## Conventions

- Functional components with hooks only
- CSS Modules for all styling (no inline CSS)
- Dummy JSON data — no backend connection unless requested
- Every page includes loading, empty, error, and skeleton states
- Responsive: desktop, tablet, and mobile
- Accessibility: ARIA labels, keyboard navigation, focus states
