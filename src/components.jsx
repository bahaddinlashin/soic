// Shared components for SOIC platform
import React, { useState, useEffect, useRef, useMemo, createContext, useContext } from 'react';
import { SOIC_DATA, initials, fmtEGP, fmtDate, fmtShortDate } from './data.js';

// === i18n ===
const I18nContext = createContext({ lang: 'en', tr: (en) => en });
export const useT = () => useContext(I18nContext);
const I18nProvider = ({ lang, children }) => {
  const value = useMemo(() => ({
    lang,
    tr: (en, ar) => lang === 'ar' && ar ? ar : en,
  }), [lang]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

// === Icon set (inline SVG, stroke-based) ===
const Icon = ({ name, size = 18, ...props }) => {
  const paths = {
    home: <path d="M3 12L12 4l9 8M5 10v10h14V10" />,
    book: <path d="M4 5a2 2 0 012-2h12v18H6a2 2 0 010-4h12" />,
    calendar: <path d="M4 7h16M4 7v12a2 2 0 002 2h12a2 2 0 002-2V7M4 7V5a2 2 0 012-2h12a2 2 0 012 2v2M9 3v4M15 3v4" />,
    wallet: <path d="M3 7a2 2 0 012-2h14v14H5a2 2 0 01-2-2V7zm14 5h2v-2h-2a1 1 0 100 2z" />,
    heart: <path d="M12 21s-7-4.5-9.5-9C.5 8 3 4 7 4c2 0 3.5 1 5 3 1.5-2 3-3 5-3 4 0 6.5 4 4.5 8C19 16.5 12 21 12 21z" />,
    play: <path d="M6 4l14 8-14 8V4z" />,
    user: <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM4 21a8 8 0 0116 0" />,
    users: <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM3 21a7 7 0 0114 0M19 8a3 3 0 110 6M22 21a5 5 0 00-3-4.6" />,
    bell: <path d="M6 8a6 6 0 1112 0c0 7 3 7 3 9H3c0-2 3-2 3-9zM10 21a2 2 0 004 0" />,
    settings: <path d="M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3h.1a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8v.1a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z" />,
    logout: <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />,
    search: <path d="M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.3-4.3" />,
    plus: <path d="M12 5v14M5 12h14" />,
    check: <path d="M5 12l5 5L20 7" />,
    x: <path d="M6 6l12 12M18 6L6 18" />,
    arrow: <path d="M5 12h14M13 5l7 7-7 7" />,
    chevron: <path d="M9 6l6 6-6 6" />,
    mic: <path d="M12 2a3 3 0 00-3 3v7a3 3 0 006 0V5a3 3 0 00-3-3zM19 12a7 7 0 01-14 0M12 19v4M8 23h8" />,
    micOff: <path d="M9 9v3a3 3 0 005.1 2.1M12 2a3 3 0 00-3 3v3M19 12a7 7 0 01-11.3 5.5M12 19v4M3 3l18 18" />,
    video: <path d="M23 7l-7 5 7 5V7zM3 5h12a2 2 0 012 2v10a2 2 0 01-2 2H3a2 2 0 01-2-2V7a2 2 0 012-2z" />,
    videoOff: <path d="M16 16v1a2 2 0 01-2 2H3a2 2 0 01-2-2V7a2 2 0 012-2h2m5.7.6L16 7v4M3 3l18 18" />,
    screen: <path d="M2 4h20v12H2zM8 20h8M12 16v4" />,
    chat: <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" />,
    hand: <path d="M9 11V5a2 2 0 014 0v6M13 11V3a2 2 0 014 0v8M17 11V5a2 2 0 014 0v9c0 4-3 7-7 7s-7-3-7-7v-2a2 2 0 014 0v1" />,
    note: <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM14 2v6h6M9 13h6M9 17h6" />,
    money: <path d="M12 2v20M17 5H9a3 3 0 000 6h6a3 3 0 010 6H7" />,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
    chart: <path d="M3 3v18h18M7 15l4-4 4 4 5-5" />,
    folder: <path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />,
    star: <path d="M12 2l3 7 7 .7-5.3 4.8 1.6 7-6.3-3.7-6.3 3.7 1.6-7L2 9.7 9 9l3-7z" />,
    clock: <path d="M12 22a10 10 0 110-20 10 10 0 010 20zM12 6v6l4 2" />,
    location: <path d="M12 22s7-7 7-12a7 7 0 10-14 0c0 5 7 12 7 12zM12 11a2 2 0 100-4 2 2 0 000 4z" />,
    instructor: <path d="M3 21h18M5 21V9l7-6 7 6v12M9 21v-6h6v6" />,
    mail: <path d="M3 6h18v12H3zM3 6l9 7 9-7" />,
    refund: <path d="M3 12a9 9 0 109-9M3 12V5M3 12h7" />,
    pin: <path d="M16 3l5 5-3 3 1 8-9-9 8 1 3-3-5-5z" />,
    eye: <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7zM12 15a3 3 0 100-6 3 3 0 000 6z" />,
    upload: <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />,
    download: <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />,
    film: <path d="M3 3h18v18H3zM7 3v18M17 3v18M3 8h4M3 16h4M17 8h4M17 16h4M7 8h10v8H7z" />,
    award: <path d="M12 15a6 6 0 100-12 6 6 0 000 12zM8 13l-2 8 6-3 6 3-2-8" />,
    receipt: <path d="M5 3h14v18l-3-2-2 2-2-2-2 2-2-2-3 2zM9 9h6M9 13h6M9 17h3" />,
    menu: <path d="M3 6h18M3 12h18M3 18h18" />,
    globe: <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0zM3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" />,
    sun: <path d="M12 4v2M12 18v2M5 12H3M21 12h-2M6.3 6.3l1.4 1.4M16.3 16.3l1.4 1.4M6.3 17.7l1.4-1.4M16.3 7.7l1.4-1.4M16 12a4 4 0 11-8 0 4 4 0 018 0z" />,
    moon: <path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" />,
    block: <path d="M12 22a10 10 0 110-20 10 10 0 010 20zM5 5l14 14" />,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
      {paths[name] || <circle cx="12" cy="12" r="8" />}
    </svg>
  );
};

// === Logo ===
const Brand = ({ role, onClick }) => (
  <div className="brand" onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
    <div className="brand-mark"><img src="assets/soic-logo-transparent.png" alt="SOIC" /></div>
    <div className="brand-text">
      <div className="name">SOIC</div>
      <div className="role">{role || 'School of Cinema'}</div>
    </div>
  </div>
);

// === Toast system ===
const ToastContext = React.createContext({ toast: () => {} });
const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const toast = (message, kind = 'info') => {
    const id = Math.random().toString(36).slice(2);
    setToasts(t => [...t, { id, message, kind }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3200);
  };
  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="toast-wrap">
        {toasts.map(t => (
          <div key={t.id} className="toast">
            {t.kind === 'success' && <span style={{ color: 'var(--success)', marginRight: 8 }}>✓</span>}
            {t.kind === 'error' && <span style={{ color: 'var(--danger)', marginRight: 8 }}>×</span>}
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
const useToast = () => React.useContext(ToastContext);

// === Modal ===
const Modal = ({ open, onClose, title, children, footer, size = 'md' }) => {
  if (!open) return null;
  const maxW = size === 'lg' ? 720 : size === 'sm' ? 420 : 560;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" style={{ maxWidth: maxW }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="h3">{title}</h3>
          <button className="btn-ghost" onClick={onClose} style={{ padding: 6, borderRadius: 8 }}>
            <Icon name="x" size={18} />
          </button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
};

// === Avatar ===
const Avatar = ({ name, size = 'md', tint }) => {
  const cls = size === 'lg' ? 'avatar avatar-lg' : size === 'sm' ? 'avatar avatar-sm' : 'avatar';
  return (
    <div className={cls} style={tint ? { background: tint + '22', color: tint } : {}}>
      {initials(name)}
    </div>
  );
};

// === Course card ===
const CourseImage = ({ course, height, radius = 0 }) => (
  <div className="ph-img" style={{ height, borderRadius: radius, background: `repeating-linear-gradient(135deg, rgba(255,255,255,0.04) 0 12px, rgba(255,255,255,0.06) 12px 24px), linear-gradient(135deg, ${course.tint}55, ${course.tint}15)`, position: 'relative', overflow: 'hidden' }}>
    {course.coverImage && (
      <img src={course.coverImage} alt={course.title} onError={(e) => { e.target.style.display = 'none'; }}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }} />
    )}
    {!course.coverImage && <span style={{ fontFamily: 'Anton, sans-serif', fontSize: 14, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.65)', position: 'relative', zIndex: 2 }}>{course.cover}</span>}
    {course.tag && <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 3 }}><span className="badge badge-gold">{course.tag}</span></div>}
  </div>
);

const CourseCard = ({ course, onClick, footerSlot }) => (
  <div className="card" style={{ padding: 0, overflow: 'hidden', cursor: onClick ? 'pointer' : 'default', transition: 'transform 0.15s, border-color 0.15s', display: 'flex', flexDirection: 'column' }}
       onMouseEnter={e => { if (onClick) { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}}
       onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}
       onClick={onClick}>
    <CourseImage course={course} height={150} />
    <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
      <div className="row" style={{ gap: 8 }}>
        <span className="badge badge-muted">{course.category}</span>
        <span className="badge badge-muted">{course.level}</span>
      </div>
      <h3 className="h3" style={{ marginTop: 2 }}>{course.title}</h3>
      <div className="muted" style={{ fontSize: 13 }}>{course.instructor}</div>
      <div className="row" style={{ gap: 16, marginTop: 'auto', fontSize: 12, color: 'var(--text-muted)' }}>
        <span className="row" style={{ gap: 4 }}><Icon name="clock" size={13} />{course.duration}</span>
        <span className="row" style={{ gap: 4 }}><Icon name="play" size={13} />{course.lectures} lectures</span>
        {course.rating > 0 && <span className="row" style={{ gap: 4 }}><Icon name="star" size={13} />{course.rating}</span>}
      </div>
      <div className="row" style={{ justifyContent: 'space-between', marginTop: 8, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
        <div>
          {course.originalPrice && <div className="dim" style={{ fontSize: 11, textDecoration: 'line-through' }}>{fmtEGP(course.originalPrice)}</div>}
          <div style={{ fontFamily: 'Anton, sans-serif', fontSize: 22 }}>{fmtEGP(course.price)}</div>
        </div>
        {footerSlot}
      </div>
    </div>
  </div>
);

// === Stat tile ===
const StatTile = ({ label, value, delta, icon, tone = 'accent' }) => {
  const toneColor = { accent: 'var(--accent-bright)', gold: 'var(--gold)', success: 'var(--success)', danger: 'var(--danger)' }[tone];
  return (
    <div className="card">
      <div className="row" style={{ justifyContent: 'space-between', marginBottom: 14 }}>
        <span className="muted" style={{ fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</span>
        {icon && <div style={{ color: toneColor }}><Icon name={icon} size={18} /></div>}
      </div>
      <div className="stat-num">{value}</div>
      {delta && (
        <div className="row" style={{ marginTop: 8, fontSize: 12 }}>
          <span style={{ color: delta.startsWith('-') ? 'var(--danger)' : 'var(--success)' }}>{delta}</span>
          <span className="muted">vs last 30 days</span>
        </div>
      )}
    </div>
  );
};

// === Mini bar chart ===
const MiniChart = ({ data, height = 80, color = 'var(--accent-bright)' }) => {
  const max = Math.max(...data);
  return (
    <svg width="100%" height={height} viewBox={`0 0 ${data.length * 18} ${height}`} preserveAspectRatio="none">
      {data.map((v, i) => {
        const h = (v / max) * (height - 6);
        return <rect key={i} x={i * 18 + 2} y={height - h} width={14} height={h} rx={2} fill={color} opacity={0.75} />;
      })}
    </svg>
  );
};

// === Calendar grid (month view) ===
const CalendarMonth = ({ events, onEventClick, year = 2025, month = 11 /* 0-indexed */ }) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startWeekday = firstDay.getDay();
  const daysInMonth = lastDay.getDate();
  const todayIso = '2025-12-08'; // demo "today"
  const cells = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const eventsByDay = {};
  (events || []).forEach(e => {
    const day = parseInt(e.date.split('-')[2], 10);
    eventsByDay[day] = eventsByDay[day] || [];
    eventsByDay[day].push(e);
  });

  return (
    <div className="card" style={{ padding: 16 }}>
      <div className="row" style={{ justifyContent: 'space-between', marginBottom: 14 }}>
        <h3 className="h2">{firstDay.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h3>
        <div className="row" style={{ gap: 6 }}>
          <button className="btn btn-secondary btn-sm">‹ Prev</button>
          <button className="btn btn-secondary btn-sm">Today</button>
          <button className="btn btn-secondary btn-sm">Next ›</button>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
        {['SUN','MON','TUE','WED','THU','FRI','SAT'].map(d => (
          <div key={d} style={{ padding: '6px 8px', fontSize: 10, color: 'var(--text-dim)', letterSpacing: '0.12em' }}>{d}</div>
        ))}
        {cells.map((d, i) => {
          const dayEvents = d ? (eventsByDay[d] || []) : [];
          const iso = d ? `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}` : null;
          const isToday = iso === todayIso;
          return (
            <div key={i} style={{
              minHeight: 92, padding: 8, background: d ? (isToday ? 'var(--accent-soft)' : 'var(--surface-2)') : 'transparent',
              borderRadius: 8, border: isToday ? '1px solid var(--accent-bright)' : '1px solid transparent', display: 'flex', flexDirection: 'column', gap: 4,
            }}>
              {d && <div style={{ fontSize: 12, fontWeight: 600, color: isToday ? 'var(--accent-bright)' : 'var(--text-muted)' }}>{d}</div>}
              {dayEvents.slice(0,3).map(e => {
                const course = SOIC_DATA.courses.find(c => c.id === e.courseId);
                return (
                  <div key={e.id} onClick={() => onEventClick && onEventClick(e)} style={{
                    background: (course?.tint || '#2d4ee0') + '30', color: '#fff', borderLeft: `3px solid ${course?.tint || '#2d4ee0'}`,
                    padding: '3px 6px', borderRadius: 4, fontSize: 11, cursor: 'pointer',
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }} title={e.title}>
                    <span style={{ fontWeight: 600 }}>{e.time}</span> {e.title}
                  </div>
                );
              })}
              {dayEvents.length > 3 && <div style={{ fontSize: 10, color: 'var(--text-dim)' }}>+{dayEvents.length - 3} more</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// === Page header ===
const PageHeader = ({ title, subtitle, actions }) => (
  <div className="topbar">
    <div>
      <h1 className="h1">{title}</h1>
      {subtitle && <div className="muted" style={{ marginTop: 4 }}>{subtitle}</div>}
    </div>
    {actions && <div className="row" style={{ gap: 10 }}>{actions}</div>}
  </div>
);

// === Nav item ===
const NavItem = ({ icon, label, active, onClick, badge }) => (
  <div className={`nav-item ${active ? 'active' : ''}`} onClick={onClick}>
    <span className="nav-icon"><Icon name={icon} size={16} /></span>
    <span>{label}</span>
    {badge && <span className="nav-badge">{badge}</span>}
  </div>
);

// === Tabs ===
const Tabs = ({ tabs, active, onChange }) => (
  <div className="row" style={{ gap: 4, borderBottom: '1px solid var(--border)', marginBottom: 20 }}>
    {tabs.map(t => {
      const isActive = (typeof t === 'string' ? t : t.id) === active;
      const label = typeof t === 'string' ? t : t.label;
      const id = typeof t === 'string' ? t : t.id;
      const count = typeof t === 'object' ? t.count : null;
      return (
        <button key={id} onClick={() => onChange(id)} style={{
          padding: '12px 16px', fontSize: 14, fontWeight: 600,
          color: isActive ? 'var(--text)' : 'var(--text-muted)',
          borderBottom: isActive ? '2px solid var(--accent-bright)' : '2px solid transparent',
          marginBottom: -1, transition: 'color 0.12s, border-color 0.12s',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          {label}
          {count !== null && count !== undefined && (
            <span className="badge badge-muted" style={{ padding: '1px 7px', fontSize: 10 }}>{count}</span>
          )}
        </button>
      );
    })}
  </div>
);

// === Persistent app header (Udemy style) ===
const Header = ({ role, route, go, onMenuToggle, isLoggedIn, t, setTweak }) => {
  const { tr, lang } = useT();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const publicNav = [
    { id: 'browse', en: 'Browse courses', ar: 'تصفح الكورسات' },
    { id: 'instructors', en: 'Instructors', ar: 'المحاضرون' },
    { id: 'about', en: 'About', ar: 'عن SOIC' },
  ];

  return (
    <header className="app-header">
      {isLoggedIn && (
        <button className="icon-btn menu-toggle" onClick={onMenuToggle} aria-label="Menu" title={tr('Menu', 'القائمة')}>
          <Icon name="menu" size={20} />
        </button>
      )}

      <div className="app-header__brand">
        <div className="brand" onClick={() => go(isLoggedIn ? 'dashboard' : 'landing')} style={{ cursor: 'pointer' }}>
          <div className="brand-mark"><img src="assets/soic-logo-transparent.png" alt="SOIC" /></div>
          <div className="brand-text">
            <div className="name">SOIC</div>
          </div>
        </div>
      </div>

      {/* Left nav links — public only */}
      {!isLoggedIn && (
        <nav className="app-header__nav">
          {publicNav.map(n => (
            <a key={n.id}
              className={`app-header__nav-link ${route === n.id ? 'active' : ''}`}
              onClick={() => go(n.id)}>
              {tr(n.en, n.ar)}
            </a>
          ))}
        </nav>
      )}

      {/* Pill search */}
      <div className="app-header__search" onClick={() => go(isLoggedIn ? 'browse' : 'browse')}>
        <Icon name="search" size={18} />
        <input placeholder={tr('Search for courses, instructors…', 'ابحث عن كورسات أو محاضرين…')} readOnly />
      </div>

      <div className="app-header__right">
        {!isLoggedIn ? (
          <>
            <button className="btn btn-outline btn-sm" onClick={() => go('auth-signin')}>{tr('Log in', 'تسجيل الدخول')}</button>
            <button className="btn btn-primary btn-sm" onClick={() => go('auth-signup')}>{tr('Sign up', 'إنشاء حساب')}</button>
            <button className="icon-btn" onClick={() => setTweak('lang', t.lang === 'en' ? 'ar' : 'en')} title="Language">
              <Icon name="globe" size={18} />
            </button>
          </>
        ) : (
          <>
            <button className="icon-btn" onClick={() => go('learning')} title={tr('My learning', 'تعلّمي')}>
              <Icon name="book" size={18} />
            </button>
            <button className="icon-btn" title={tr('Wishlist', 'قائمة الرغبات')}>
              <Icon name="heart" size={18} />
            </button>
            <button className="icon-btn" title={tr('Notifications', 'الإشعارات')}>
              <Icon name="bell" size={18} />
              <span className="notif-dot"></span>
            </button>

            <div style={{ position: 'relative' }}>
              <button className="icon-btn" onClick={() => setDropdownOpen(!dropdownOpen)} style={{ padding: 0, width: 'auto', height: 'auto' }} title={tr('Account', 'الحساب')}>
                <Avatar name={ROLE_NAMES_LOCAL[role]?.name || 'You'} size="sm" />
              </button>
              {dropdownOpen && (
                <>
                  <div style={{ position: 'fixed', inset: 0, zIndex: 60 }} onClick={() => setDropdownOpen(false)}></div>
                  <div style={{
                    position: 'absolute', top: 'calc(100% + 8px)', right: 0, minWidth: 220,
                    background: 'var(--surface)', border: '1px solid var(--border)',
                    borderRadius: 12, padding: 6, boxShadow: 'var(--shadow-2)', zIndex: 70,
                    direction: lang === 'ar' ? 'rtl' : 'ltr',
                  }}>
                    <div style={{ padding: '12px 12px 8px', borderBottom: '1px solid var(--border)' }}>
                      <div style={{ fontSize: 14, fontWeight: 700 }}>{ROLE_NAMES_LOCAL[role]?.name}</div>
                      <div className="muted" style={{ fontSize: 12, marginTop: 2 }}>{ROLE_NAMES_LOCAL[role]?.sub}</div>
                    </div>
                    <button className="nav-item" style={{ width: '100%' }}>
                      <Icon name="user" size={15} />{tr('Profile', 'الملف الشخصي')}
                    </button>
                    <button className="nav-item" style={{ width: '100%' }}>
                      <Icon name="settings" size={15} />{tr('Settings', 'الإعدادات')}
                    </button>
                    <button className="nav-item" style={{ width: '100%' }} onClick={() => setTweak('lang', lang === 'en' ? 'ar' : 'en')}>
                      <Icon name="globe" size={15} />{tr('Switch to العربية', 'Switch to English')}
                    </button>
                    <button className="nav-item" style={{ width: '100%' }} onClick={() => setTweak('theme', t.theme === 'light' ? 'dark' : 'light')}>
                      <Icon name={t.theme === 'light' ? 'moon' : 'sun'} size={15} />
                      {t.theme === 'light' ? tr('Dark mode', 'الوضع الداكن') : tr('Light mode', 'الوضع الفاتح')}
                    </button>
                    <div style={{ height: 1, background: 'var(--border)', margin: '4px 0' }}></div>
                    <button className="nav-item" style={{ width: '100%', color: 'var(--danger)' }} onClick={() => { setTweak('role', 'public'); setDropdownOpen(false); }}>
                      <Icon name="logout" size={15} />{tr('Sign out', 'تسجيل الخروج')}
                    </button>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
};

// Local copy of role display info for use in Header (mirrors app.jsx)
const ROLE_NAMES_LOCAL = {
  student: { name: 'Layla Khalid', sub: 'layla@example.com' },
  instructor: { name: 'Dr. Hossam Dagher', sub: 'hossam@soic.eg' },
  admin: { name: 'Admin Ops', sub: 'ops@soic.eg' },
  public: { name: 'Guest', sub: '' },
};

export { Icon, Brand, ToastProvider, useToast, Modal, Avatar, CourseCard, CourseImage, StatTile, MiniChart, CalendarMonth, PageHeader, NavItem, Tabs, I18nProvider, Header };
