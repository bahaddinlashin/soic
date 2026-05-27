# SOIC — School of Cinema platform

A live-online cinema academy platform. Vite + React + plain CSS, no global state library — just `useState` and a few context providers.

## Quick start

```bash
cd react-app
npm install
npm run dev          # → http://localhost:5173
```

Build for production:

```bash
npm run build        # outputs ./dist
npm run preview      # serves the production build locally
```

## Project structure

```
react-app/
├── index.html              Vite entry
├── package.json
├── vite.config.js
├── public/
│   └── assets/             Static images (logo, etc.)
└── src/
    ├── main.jsx            React mount + ToastProvider
    ├── App.jsx             Root component · routing · role switching
    ├── styles.css          All CSS (variables, components, themes, RTL)
    ├── data.js             Mock data (courses, users, schedule, payments…)
    ├── components.jsx      Shared UI (Icon, Brand, Modal, CourseCard, Tabs, …)
    ├── tweaks-panel.jsx    Demo Tweaks panel (host protocol + form controls)
    ├── screens-public.jsx  Landing · Browse · CourseDetail · Auth · About · Instructors
    ├── screens-student.jsx Dashboard · Browse · Calendar · MyLearning · Recording
    ├── screens-instructor.jsx Dashboard · Calendar · Courses · Students · Earnings
    ├── screens-admin.jsx   Dashboard · Courses · Users · Payments · Roles · Content
    └── screens-live.jsx    Live student room + Live instructor host
```

## What this demo does

Toggle role with the floating control bar (top right) — the entire app re-routes:

- **Public** — landing, course catalog, course detail, about, instructors, sign-in/up
- **Student** — dashboard, browse, my learning (courses → recordings + timestamped notes), calendar, wishlist, live class room, payment flow
- **Instructor** — dashboard, schedule, course management, live host room (screen share, mute students, end-lecture confirm)
- **Admin** — overview, course approvals, payments queue (InstaPay + refunds), users, **roles & permissions builder** (Super Admin / Payments Manager / Content Moderator / Read-only), homepage content blocks, analytics

Other features:
- **Bilingual EN ↔ AR** with full RTL flip
- **Dark / light mode**
- **5-color accent picker**
- **Sidebar layout toggle** — vertical or horizontal · hide / show

## Replacing the placeholder data

`src/data.js` holds all the mock data. In production you'd swap the named exports (`SOIC_DATA.courses`, `SOIC_DATA.users`, etc.) for API calls — the rest of the app reads them through plain imports.

## Notes

- Course photos are sourced from Facebook CDN URLs with short-lived signatures — when they expire, the striped placeholder shows as a graceful fallback. Replace with hosted copies in `public/assets/` for production.
- All "live" lecture audio/video is mocked. To go real you'd wire in your media SDK of choice (Twilio, LiveKit, 100ms) in `screens-live.jsx`.
- Payment flows are UI-only. InstaPay verification and card processing should be hooked up to your gateway in `screens-student.jsx` (`PaymentModal`) and `screens-admin.jsx` (`AdminPayments`).
