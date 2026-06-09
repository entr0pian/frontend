# TaskApp Frontend

React (Vite) SPA for the TaskApp Kanban board, served by nginx in production.

## Stack

- **React 18** — UI
- **Vite 5** — build tool and dev server
- **nginx** — production static file server + `/tasks` proxy

## Project Structure

```
frontend/
├── index.html               # Vite entry point
├── vite.config.js           # Dev proxy: /tasks → localhost:8080
├── Dockerfile               # Multi-stage: node build → nginx:alpine
└── src/
    ├── main.jsx             # React root
    ├── App.jsx              # Global state, data fetching, modal control
    ├── index.css            # Global styles and CSS variables
    ├── api/
    │   └── tasks.js         # fetch wrappers (fetchTasks, createTask, updateTask)
    └── components/
        ├── Header.jsx       # Logo, Refresh, New Task buttons
        ├── Board.jsx        # Three-column layout + stats bar
        ├── Column.jsx       # Column header, card list, skeleton, empty state
        ├── TaskCard.jsx     # Task card with inline Edit button
        ├── TaskModal.jsx    # Create / edit modal with form state
        └── Toast.jsx        # Slide-in toast notifications
```

## Local Development

```bash
npm install
npm run dev
```

Requires the backend running on `localhost:8080`. The Vite dev server proxies all `/tasks` requests there automatically.

## Build

```bash
npm run build   # outputs to dist/
npm run preview # preview the production build locally
```

## Task Statuses

The board renders three columns driven by the `status` field returned by the API:

| Status | Column |
|--------|--------|
| `todo` | To Do |
| `in_progress` | In Progress |
| `done` | Done |

## Production

The Dockerfile is a two-stage build:

1. **Build stage** — Node 20 compiles the Vite app to `dist/`
2. **Serve stage** — nginx:alpine serves `dist/` on port 80

The Kubernetes Helm chart mounts a custom nginx config that proxies `/tasks` to the backend service — no extra configuration is needed in the app itself.
