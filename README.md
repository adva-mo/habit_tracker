# Habit Tracker

A mobile-first Progressive Web App for building and tracking daily habits. Runs entirely offline — no account, no server, no data leaves your device.

**Live:** https://habit-tracker-liart-theta.vercel.app

> Open on your phone → tap "Add to Home Screen" → works offline from that point on.

## Features

- **Daily check-ins** — tap to complete, long-press to add a note
- **Progress ring** — live completion tracker pinned to the top of your day
- **Calendar heatmap** — visualize streaks and consistency over time
- **Habit management** — create, reorder (drag & drop), archive, and delete habits
- **Scheduling** — per-habit day-of-week targeting
- **Insights** — completion rate charts and streak stats
- **Dark mode** — respects system preference, manually overridable
- **PIN lock** — optional app lock for privacy
- **Export / Import** — full data backup as JSON
- **Installable PWA** — add to home screen on iOS and Android

## Tech Stack

| Layer | Library |
|---|---|
| UI | React 18 + TypeScript |
| Styling | Tailwind CSS v3 |
| Animations | Framer Motion |
| Routing | React Router v6 |
| State | Zustand |
| Storage | Dexie.js (IndexedDB) |
| Charts | Recharts |
| Drag & drop | @dnd-kit |
| Build | Vite 5 + vite-plugin-pwa |

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The dev server runs at `http://localhost:5173`.

## Project Structure

```
src/
  components/     # Shared UI primitives and layout
  db/             # Dexie schema and seed data
  features/       # Screen-level feature modules
    today/        # Daily habits + progress ring
    calendar/     # Monthly heatmap + day detail
    habits/       # CRUD and reorder
    insights/     # Charts and stats
    settings/     # Theme, PIN, export/import
  hooks/          # Reusable React hooks
  services/       # Data access layer (Dexie queries)
  store/          # Zustand stores
  types/          # TypeScript types
  utils/          # Date, color, and formatting helpers
```

## License

MIT — see [LICENSE](LICENSE).
