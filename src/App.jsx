// SOIC platform — main app
import React, { useState as useStateApp, useEffect as useEffectApp, useState as useStateS } from 'react';
import { SOIC_DATA, fmtEGP, fmtDate, fmtShortDate, initials } from './data.js';
import {
  Icon, Brand, Avatar, CourseCard, CourseImage, StatTile, MiniChart,
  PageHeader, NavItem, Tabs, useToast, useT, I18nProvider, Modal
} from './components.jsx';
import {
  Landing, BrowseCourses, CourseDetail, Auth,
  About, InstructorsPage, InstructorDetail
} from './screens-public.jsx';
import {
  StudentDashboard, StudentBrowse, StudentCalendar, PaymentModal, RecordingPlayer
} from './screens-student.jsx';
import {
  InstructorDashboard, InstructorCalendar, InstructorCourses
} from './screens-instructor.jsx';
import {
  AdminDashboard, AdminCourses, AdminPayments, AdminUsers, AdminRoles, AdminContent
} from './screens-admin.jsx';
import {
  LiveStudent, LiveInstructor
} from './screens-live.jsx';
import {
  useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakSelect, TweakColor
} from './tweaks-panel.jsx';


const DEFAULTS = /*EDITMODE-BEGIN*/{
  "role": "public",
  "accent": "#2d4ee0",
  "lang": "en",
  "theme": "light",
  "layout": "vertical",
  "sidebarHidden": false
}/*EDITMODE-END*/;

const NAV = {
  student: [
    { id: 'dashboard', icon: 'home', en: 'Dashboard', ar: 'الرئيسية' },
    { id: 'browse', icon: 'search', en: 'Browse courses', ar: 'تصفح الكورسات' },
    { id: 'calendar', icon: 'calendar', en: 'Calendar', ar: 'التقويم', badge: 6 },
    { id: 'learning', icon: 'book', en: 'My Learning', ar: 'تعلّمي' },
    { id: 'wishlist', icon: 'heart', en: 'Wishlist', ar: 'قائمة الرغبات', badge: 2 },
  ],
  instructor: [
    { id: 'dashboard', icon: 'home', en: 'Dashboard', ar: 'الرئيسية' },
    { id: 'courses', icon: 'folder', en: 'My courses', ar: 'كورساتي', badge: 2 },
    { id: 'calendar', icon: 'calendar', en: 'Schedule', ar: 'الجدول' },
    { id: 'students', icon: 'users', en: 'Students', ar: 'الطلاب' },
    { id: 'earnings', icon: 'money', en: 'Earnings', ar: 'الأرباح' },
  ],
  admin: [
    { id: 'dashboard', icon: 'home', en: 'Overview', ar: 'نظرة عامة' },
    { id: 'courses', icon: 'folder', en: 'Courses', ar: 'الكورسات', badge: 2 },
    { id: 'users', icon: 'users', en: 'Users', ar: 'المستخدمون', badge: 1 },
    { id: 'payments', icon: 'receipt', en: 'Payments', ar: 'المدفوعات', badge: 2 },
    { id: 'roles', icon: 'shield', en: 'Roles & permissions', ar: 'الأدوار والصلاحيات' },
    { id: 'content', icon: 'film', en: 'Homepage content', ar: 'محتوى الرئيسية' },
    { id: 'analytics', icon: 'chart', en: 'Analytics', ar: 'التحليلات' },
  ],
};

const ROLE_NAMES = {
  student: { display: { en: 'STUDENT', ar: 'طالب' }, name: 'Layla Khalid', sub: 'layla@example.com' },
  instructor: { display: { en: 'INSTRUCTOR', ar: 'محاضر' }, name: 'Hossam Dagher', sub: 'hossam@soic.eg' },
  admin: { display: { en: 'SUPER ADMIN', ar: 'مدير عام' }, name: 'Admin Ops', sub: 'ops@soic.eg' },
};

const App = () => {
  const [t, setTweak] = useTweaks(DEFAULTS);
  const [route, setRoute] = useStateApp('dashboard'); // 'dashboard', 'browse', 'course-c1', 'live-student', 'landing', 'auth-signin', 'auth-signup'
  const [enrolled, setEnrolled] = useStateApp(SOIC_DATA.myEnrolled);
  const [wishlist, setWishlist] = useStateApp(SOIC_DATA.myWishlist);
  const [wallet, setWallet] = useStateApp(5200);
  const [paymentCourse, setPaymentCourse] = useStateApp(null);
  const { toast } = useToast();

  const role = t.role; // 'public' | 'student' | 'instructor' | 'admin'
  const isPublic = role === 'public';
  const isLive = route === 'live-student' || route === 'live-instructor';
  const isAuth = route.startsWith('auth-');
  const showSidebar = !isPublic && !isLive && !isAuth && route !== 'landing';

  // Apply language + theme
  useEffectApp(() => {
    document.documentElement.dir = t.lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = t.lang;
    document.body.classList.toggle('lang-ar', t.lang === 'ar');
    document.body.classList.toggle('lang-en', t.lang !== 'ar');
  }, [t.lang]);
  useEffectApp(() => {
    document.body.classList.toggle('theme-light', t.theme === 'light');
    document.body.classList.toggle('theme-dark', t.theme !== 'light');
  }, [t.theme]);

  // Apply accent to css variables
  useEffectApp(() => {
    document.documentElement.style.setProperty('--accent', t.accent);
    // brighten
    const brighter = (() => {
      try {
        const r = parseInt(t.accent.slice(1,3), 16);
        const g = parseInt(t.accent.slice(3,5), 16);
        const b = parseInt(t.accent.slice(5,7), 16);
        const mix = (c) => Math.min(255, Math.round(c + (255 - c) * 0.3));
        return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`;
      } catch { return t.accent; }
    })();
    document.documentElement.style.setProperty('--accent-bright', brighter);
    document.documentElement.style.setProperty('--accent-soft', t.accent + '29');
  }, [t.accent]);

  // Reset route when role changes — drop to dashboard if current route isn't valid for the new role
  useEffectApp(() => {
    if (role === 'public') { setRoute('landing'); return; }
    const validRoutes = (NAV[role] || []).map(n => n.id);
    const isCrossRoleRoute = route.startsWith('course-') || route.startsWith('recording-') || route.startsWith('live-');
    if (!validRoutes.includes(route) && !isCrossRoleRoute) setRoute('dashboard');
  }, [role]);

  // Enroll
  const handleEnroll = (courseId) => {
    const c = SOIC_DATA.courses.find(x => x.id === courseId);
    if (isPublic) { setRoute('auth-signup'); return; }
    setPaymentCourse(c);
  };
  const handleConfirmPayment = (method) => {
    if (paymentCourse) {
      setEnrolled([...enrolled, paymentCourse.id]);
      setWishlist(wishlist.filter(id => id !== paymentCourse.id));
      if (method === 'instapay') {
        toast(`Receipt submitted. Admin will approve within 24h.`, 'success');
      } else {
        toast(`Enrolled in ${paymentCourse.title}!`, 'success');
      }
      setPaymentCourse(null);
    }
  };
  const handleWishlist = (courseId) => {
    if (isPublic) { setRoute('auth-signup'); return; }
    if (wishlist.includes(courseId)) {
      setWishlist(wishlist.filter(id => id !== courseId));
      toast('Removed from wishlist');
    } else {
      setWishlist([...wishlist, courseId]);
      toast('Added to wishlist — we\'ll notify you', 'success');
    }
  };

  // Public flow
  let view;
  if (isPublic && route === 'landing') {
    view = <Landing go={setRoute} signIn={() => {}} />;
  } else if (isPublic && route === 'browse') {
    view = <BrowseCourses go={setRoute} />;
  } else if (isPublic && route === 'about') {
    view = <About go={setRoute} />;
  } else if (isPublic && route === 'instructors') {
    view = <InstructorsPage go={setRoute} />;
  } else if (isPublic && route.startsWith('instructor-')) {
    view = <InstructorDetail instructorId={route.replace('instructor-', '')} go={setRoute} />;
  } else if (route.startsWith('course-')) {
    const id = route.replace('course-', '');
    view = (
      <>
        {showSidebar ? (
          <AppShell role={role} route={route} go={setRoute} layout={t.layout} sidebarHidden={t.sidebarHidden} setTweak={setTweak}>
            <CourseDetail courseId={id} go={setRoute} role={role}
              onEnroll={() => handleEnroll(id)}
              onWishlist={() => handleWishlist(id)}
              isEnrolled={enrolled.includes(id)}
              isWishlisted={wishlist.includes(id)} />
          </AppShell>
        ) : (
          <CourseDetail courseId={id} go={setRoute} role={role}
            onEnroll={() => handleEnroll(id)}
            onWishlist={() => handleWishlist(id)}
            isEnrolled={enrolled.includes(id)}
            isWishlisted={wishlist.includes(id)} />
        )}
        <PaymentModal open={!!paymentCourse} course={paymentCourse} onClose={() => setPaymentCourse(null)} onConfirm={handleConfirmPayment} />
      </>
    );
  } else if (isAuth) {
    view = <Auth mode={route === 'auth-signin' ? 'signin' : 'signup'} go={setRoute} onSignIn={(r) => { setTweak('role', r); setRoute('dashboard'); }} />;
  } else if (route === 'live-student') {
    view = <LiveStudent go={setRoute} />;
  } else if (route === 'live-instructor') {
    view = <LiveInstructor go={setRoute} />;
  } else {
    // App shell views
    view = (
      <>
        <AppShell role={role} route={route} go={setRoute} layout={t.layout} sidebarHidden={t.sidebarHidden} setTweak={setTweak}>
          {role === 'student' && route === 'dashboard' && <StudentDashboard go={setRoute} enrolled={enrolled} wishlist={wishlist} />}
          {role === 'student' && route === 'browse' && <StudentBrowse go={setRoute} enrolled={enrolled} wishlist={wishlist} />}
          {role === 'student' && route === 'calendar' && <StudentCalendar go={setRoute} />}
          {role === 'student' && route === 'learning' && <MyLearning go={setRoute} enrolled={enrolled} />}
          {role === 'student' && route.startsWith('learning-') && <CourseLearning courseId={route.replace('learning-', '')} go={setRoute} />}
          {role === 'student' && route === 'wishlist' && <WishlistPage go={setRoute} wishlist={wishlist} />}
          {role === 'student' && route.startsWith('recording-') && <RecordingPlayer recordingId={route.replace('recording-', '')} go={setRoute} />}

          {role === 'instructor' && route === 'dashboard' && <InstructorDashboard go={setRoute} />}
          {role === 'instructor' && route === 'courses' && <InstructorCourses go={setRoute} />}
          {role === 'instructor' && route === 'calendar' && <InstructorCalendar go={setRoute} />}
          {role === 'instructor' && route === 'students' && <InstructorStudents go={setRoute} />}
          {role === 'instructor' && route === 'earnings' && <InstructorEarnings go={setRoute} />}

          {role === 'admin' && route === 'dashboard' && <AdminDashboard go={setRoute} />}
          {role === 'admin' && route === 'courses' && <AdminCourses go={setRoute} />}
          {role === 'admin' && route === 'users' && <AdminUsers go={setRoute} />}
          {role === 'admin' && route === 'payments' && <AdminPayments go={setRoute} />}
          {role === 'admin' && route === 'roles' && <AdminRoles go={setRoute} />}
          {role === 'admin' && route === 'content' && <AdminContent go={setRoute} />}
          {role === 'admin' && route === 'analytics' && <AdminAnalytics go={setRoute} />}
        </AppShell>
        <PaymentModal open={!!paymentCourse} course={paymentCourse} onClose={() => setPaymentCourse(null)} onConfirm={handleConfirmPayment} />
      </>
    );
  }

  return (
    <I18nProvider lang={t.lang}>
      {view}
      <DemoControls t={t} setTweak={setTweak} />
      <TweaksPanelUI t={t} setTweak={setTweak} />
    </I18nProvider>
  );
};

const AppShell = ({ role, route, go, children, layout, sidebarHidden, setTweak }) => {
  const { tr, lang } = useT();
  const nav = NAV[role] || [];
  const roleInfo = ROLE_NAMES[role];
  const isHorizontal = layout === 'horizontal';
  const isHidden = !isHorizontal && sidebarHidden;

  // Mini icon buttons used in both layouts
  const LayoutToggle = (
    <button onClick={() => setTweak('layout', isHorizontal ? 'vertical' : 'horizontal')}
      className="btn btn-ghost"
      style={{ width: 32, height: 32, borderRadius: 8, padding: 0, color: 'var(--text-muted)' }}
      title={tr(isHorizontal ? 'Switch to sidebar' : 'Switch to top menu', isHorizontal ? 'تبديل إلى قائمة جانبية' : 'تبديل إلى قائمة علوية')}>
      {isHorizontal
        // Sidebar icon
        ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="7" height="16" rx="1.5" /><rect x="12" y="4" width="9" height="16" rx="1.5" fill="currentColor" opacity="0.15" /></svg>
        // Topbar icon
        : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="6" rx="1.5" fill="currentColor" opacity="0.15" /><rect x="3" y="11" width="18" height="10" rx="1.5" /></svg>
      }
    </button>
  );

  const HideToggle = !isHorizontal && (
    <button onClick={() => setTweak('sidebarHidden', !sidebarHidden)}
      className="btn btn-ghost"
      style={{ width: 32, height: 32, borderRadius: 8, padding: 0, color: 'var(--text-muted)' }}
      title={tr('Hide menu', 'إخفاء القائمة')}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {lang === 'ar' ? <path d="M9 6l6 6-6 6" /> : <path d="M15 6l-6 6 6 6" />}
      </svg>
    </button>
  );

  // === Horizontal (topbar) layout ===
  if (isHorizontal) {
    return (
      <div data-screen-label={`${role}-${route}`} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <header style={{
          background: 'var(--surface)', borderBottom: '1px solid var(--border)',
          padding: '10px 24px', display: 'flex', alignItems: 'center', gap: 18, position: 'sticky', top: 0, zIndex: 10,
        }}>
          <Brand role={roleInfo?.display?.[lang] || roleInfo?.display?.en} onClick={() => go('dashboard')} />
          <nav className="row" style={{ gap: 2, marginInlineStart: 16, flex: 1, overflowX: 'auto' }}>
            {nav.map(n => {
              const active = route === n.id;
              return (
                <button key={n.id} onClick={() => go(n.id)} style={{
                  padding: '8px 14px', borderRadius: 8, fontSize: 14, fontWeight: 500, whiteSpace: 'nowrap',
                  display: 'flex', alignItems: 'center', gap: 8,
                  color: active ? 'var(--text)' : 'var(--text-muted)',
                  background: active ? 'var(--accent-soft)' : 'transparent',
                  position: 'relative',
                }}>
                  <Icon name={n.icon} size={15} />
                  {tr(n.en, n.ar)}
                  {n.badge && <span style={{ background: 'var(--accent)', color: '#fff', fontSize: 10, padding: '1px 6px', borderRadius: 8, fontWeight: 700 }}>{n.badge}</span>}
                  {active && <span style={{ position: 'absolute', left: 14, right: 14, bottom: -11, height: 2, background: 'var(--accent-bright)', borderRadius: 2 }}></span>}
                </button>
              );
            })}
          </nav>
          <div className="row" style={{ gap: 8, marginInlineEnd: 200 /* leave room for DemoControls */ }}>
            {LayoutToggle}
            <div style={{ width: 1, height: 24, background: 'var(--border)' }}></div>
            <div className="row" style={{ gap: 10 }}>
              <Avatar name={roleInfo?.name || 'You'} size="sm" />
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{roleInfo?.name}</div>
                <div className="dim" style={{ fontSize: 10 }}>{roleInfo?.display?.[lang] || roleInfo?.display?.en}</div>
              </div>
            </div>
          </div>
        </header>
        <main className="main" style={{ flex: 1 }}>{children}</main>
      </div>
    );
  }

  // === Vertical (sidebar) layout — possibly hidden ===
  return (
    <div className={isHidden ? 'app no-sidebar' : 'app'} data-screen-label={`${role}-${route}`}>
      {!isHidden && (
        <aside className="sidebar">
          <div className="row" style={{ justifyContent: 'space-between', paddingInlineEnd: 4 }}>
            <Brand role={roleInfo?.display?.[lang] || roleInfo?.display?.en} onClick={() => go('dashboard')} />
            <div className="row" style={{ gap: 2 }}>
              {LayoutToggle}
              {HideToggle}
            </div>
          </div>
          <div className="nav-section">{tr('Main', 'الرئيسي')}</div>
          {nav.map(n => <NavItem key={n.id} icon={n.icon} label={tr(n.en, n.ar)} active={route === n.id} onClick={() => go(n.id)} badge={n.badge} />)}

          <div style={{ marginTop: 'auto', paddingTop: 24, borderTop: '1px solid var(--border)' }}>
            <div className="nav-section" style={{ paddingTop: 0 }}>{tr('Account', 'الحساب')}</div>
            <NavItem icon="settings" label={tr('Settings', 'الإعدادات')} onClick={() => {}} />
            <NavItem icon="logout" label={tr('Sign out', 'تسجيل الخروج')} onClick={() => {}} />

            <div className="card flat" style={{ padding: 12, marginTop: 14, display: 'flex', gap: 10, alignItems: 'center' }}>
              <Avatar name={roleInfo?.name || 'You'} size="sm" />
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{roleInfo?.name}</div>
                <div className="dim" style={{ fontSize: 11, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{roleInfo?.sub}</div>
              </div>
            </div>
          </div>
        </aside>
      )}
      <main className="main">
        {isHidden && (
          <button onClick={() => setTweak('sidebarHidden', false)}
            className="btn btn-secondary"
            style={{
              position: 'fixed', top: 16, [lang === 'ar' ? 'right' : 'left']: 16, zIndex: 80,
              padding: '8px 12px', borderRadius: 10,
            }}
            title={tr('Show menu', 'إظهار القائمة')}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
            <span style={{ marginInlineStart: 6 }}>{tr('Menu', 'القائمة')}</span>
          </button>
        )}
        {children}
      </main>
    </div>
  );
};

// === Small "stub" screens to round out menus ===

const MyLearning = ({ go, enrolled }) => {
  const { tr } = useT();
  const courses = SOIC_DATA.courses.filter(c => enrolled.includes(c.id));
  // Stats per course
  const courseStats = (cid) => {
    const recs = SOIC_DATA.recordings.filter(r => r.courseId === cid);
    const watched = recs.filter(r => r.watched === 100).length;
    const total = recs.length;
    const avgProgress = recs.length ? Math.round(recs.reduce((s, r) => s + r.watched, 0) / recs.length) : 0;
    const notes = SOIC_DATA.notes.filter(n => recs.some(r => r.id === n.recordingId)).length;
    const next = SOIC_DATA.schedule.find(s => s.courseId === cid);
    return { watched, total, avgProgress, notes, next };
  };
  return (
    <div>
      <PageHeader title={tr('My Learning', 'تعلّمي')} subtitle={tr(`${courses.length} enrolled course${courses.length === 1 ? '' : 's'} · pick up where you left off`, `${courses.length} كورس مسجّل · تابع من حيث توقفت`)} />
      {courses.length === 0 ? (
        <div className="card" style={{ padding: 64, textAlign: 'center' }}>
          <Icon name="book" size={32} style={{ color: 'var(--text-dim)' }} />
          <h3 className="h3" style={{ marginTop: 14 }}>No courses yet</h3>
          <div className="muted" style={{ marginTop: 6 }}>Browse the catalog and enroll to start learning.</div>
          <button className="btn btn-primary" style={{ marginTop: 20 }} onClick={() => go('browse')}>Browse courses</button>
        </div>
      ) : (
        <div className="col" style={{ gap: 16 }}>
          {courses.map(c => {
            const s = courseStats(c.id);
            return (
              <div key={c.id} className="card" style={{ padding: 0, overflow: 'hidden', display: 'grid', gridTemplateColumns: '220px 1fr auto', gap: 0, cursor: 'pointer', alignItems: 'stretch' }}
                onClick={() => go('learning-' + c.id)}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-strong)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; }}>
                <div className="ph-img" style={{ borderRadius: 0, background: `repeating-linear-gradient(135deg, rgba(255,255,255,0.04) 0 12px, rgba(255,255,255,0.06) 12px 24px), linear-gradient(135deg, ${c.tint}66, ${c.tint}22)`, position: 'relative', overflow: 'hidden' }}>
                  {c.coverImage && <img src={c.coverImage} alt={c.title} onError={e => e.target.style.display='none'} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />}
                  {!c.coverImage && <span style={{ fontFamily: 'Anton', fontSize: 12, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.6)' }}>{c.cover.split(' · ')[0]}</span>}
                </div>
                <div style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div className="row" style={{ gap: 8 }}>
                    <span className="badge badge-muted">{c.category}</span>
                    {s.next && <span className="badge badge-accent">Next lecture {fmtShortDate(s.next.date)}</span>}
                  </div>
                  <h3 className="h3">{c.title}</h3>
                  <div className="muted" style={{ fontSize: 13 }}>{c.instructor}</div>
                  <div style={{ marginTop: 'auto', paddingTop: 12 }}>
                    <div style={{ height: 6, background: 'var(--surface-2)', borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: s.avgProgress + '%', background: c.tint }}></div>
                    </div>
                    <div className="row" style={{ gap: 24, marginTop: 10, fontSize: 12, color: 'var(--text-muted)' }}>
                      <span><strong style={{ color: 'var(--text)' }}>{s.avgProgress}%</strong> complete</span>
                      <span><strong style={{ color: 'var(--text)' }}>{s.watched} / {s.total}</strong> lectures watched</span>
                      <span className="row" style={{ gap: 4 }}><Icon name="note" size={12} style={{ color: 'var(--gold)' }} /> <strong style={{ color: 'var(--text)' }}>{s.notes}</strong> notes</span>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', padding: '0 24px', borderLeft: '1px solid var(--border)', background: 'var(--surface-2)' }}>
                  <button className="btn btn-primary">Open course <Icon name="arrow" size={13} /></button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const CourseLearning = ({ courseId, go }) => {
  const c = SOIC_DATA.courses.find(x => x.id === courseId);
  if (!c) return <div style={{ padding: 40 }}>Course not found</div>;
  const recordings = SOIC_DATA.recordings.filter(r => r.courseId === courseId);
  const upcoming = SOIC_DATA.schedule.filter(s => s.courseId === courseId);
  const totalNotes = SOIC_DATA.notes.filter(n => recordings.some(r => r.id === n.recordingId)).length;
  const avgProgress = recordings.length ? Math.round(recordings.reduce((s, r) => s + r.watched, 0) / recordings.length) : 0;

  return (
    <div>
      <div className="row" style={{ marginBottom: 16, cursor: 'pointer' }} onClick={() => go('learning')}>
        <span className="muted" style={{ fontSize: 13 }}>← Back to My Learning</span>
      </div>

      {/* Course banner */}
      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: 24, display: 'grid', gridTemplateColumns: '240px 1fr' }}>
        <div className="ph-img" style={{ borderRadius: 0, background: `repeating-linear-gradient(135deg, rgba(255,255,255,0.04) 0 12px, rgba(255,255,255,0.06) 12px 24px), linear-gradient(135deg, ${c.tint}66, ${c.tint}22)`, position: 'relative', overflow: 'hidden' }}>
          {c.coverImage && <img src={c.coverImage} alt={c.title} onError={e => e.target.style.display='none'} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />}
          {!c.coverImage && <span style={{ fontFamily: 'Anton', fontSize: 13, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.65)' }}>{c.cover}</span>}
        </div>
        <div style={{ padding: 28 }}>
          <div className="row" style={{ gap: 8, marginBottom: 8 }}>
            <span className="badge badge-accent">Enrolled</span>
            <span className="badge badge-muted">{c.category}</span>
          </div>
          <h1 className="h1">{c.title}</h1>
          <div className="muted" style={{ marginTop: 4 }}>{c.instructor}</div>
          <div className="row" style={{ gap: 32, marginTop: 20 }}>
            <div>
              <div className="display" style={{ fontSize: 26 }}>{avgProgress}%</div>
              <div className="muted" style={{ fontSize: 12 }}>Course progress</div>
            </div>
            <div>
              <div className="display" style={{ fontSize: 26 }}>{recordings.length}<span className="dim" style={{ fontSize: 16 }}> / {c.lectures}</span></div>
              <div className="muted" style={{ fontSize: 12 }}>Lectures recorded</div>
            </div>
            <div>
              <div className="display" style={{ fontSize: 26, color: 'var(--gold)' }}>{totalNotes}</div>
              <div className="muted" style={{ fontSize: 12 }}>My notes</div>
            </div>
            {upcoming[0] && (
              <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                <div className="muted" style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Next live lecture</div>
                <div style={{ fontWeight: 700, marginTop: 4 }}>{upcoming[0].title}</div>
                <div className="muted mono" style={{ fontSize: 12, marginTop: 2 }}>{fmtShortDate(upcoming[0].date)} · {upcoming[0].time}</div>
                <button className="btn btn-primary btn-sm" style={{ marginTop: 10 }} onClick={() => go('live-student')}><Icon name="video" size={13} /> Join when live</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <h3 className="h3" style={{ marginBottom: 14 }}>Recorded lectures</h3>
      <div className="col" style={{ gap: 14 }}>
        {recordings.map((r, idx) => {
          const notes = SOIC_DATA.notes.filter(n => n.recordingId === r.id);
          return (
            <div key={r.id} className="card" style={{ padding: 0, overflow: 'hidden', display: 'grid', gridTemplateColumns: '1fr 360px' }}>
              {/* Recording side */}
              <div style={{ padding: 20, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div onClick={() => go('recording-' + r.id)} className="ph-img" style={{ width: 180, height: 110, borderRadius: 8, flexShrink: 0, cursor: 'pointer', background: `repeating-linear-gradient(135deg, rgba(255,255,255,0.04) 0 12px, rgba(255,255,255,0.06) 12px 24px), linear-gradient(135deg, ${c.tint}55, ${c.tint}15)`, position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 40, height: 40, borderRadius: 50, background: 'rgba(0,0,0,0.65)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon name="play" size={16} />
                    </div>
                  </div>
                  <div style={{ position: 'absolute', bottom: 6, right: 6, background: 'rgba(0,0,0,0.75)', padding: '2px 6px', borderRadius: 3, fontSize: 10, fontWeight: 600 }} className="mono">{r.duration}</div>
                  {r.watched > 0 && r.watched < 100 && (
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'rgba(0,0,0,0.5)' }}>
                      <div style={{ width: r.watched + '%', height: '100%', background: 'var(--danger)' }}></div>
                    </div>
                  )}
                </div>
                <div className="grow" style={{ minWidth: 0 }}>
                  <div className="row" style={{ gap: 8, marginBottom: 6 }}>
                    <span className="dim mono" style={{ fontSize: 11 }}>LECTURE {String(idx + 1).padStart(2, '0')}</span>
                    {r.watched === 100 && <span className="badge badge-success" style={{ fontSize: 10 }}>Watched</span>}
                    {r.watched > 0 && r.watched < 100 && <span className="badge badge-warning" style={{ fontSize: 10 }}>{r.watched}% watched</span>}
                    {r.watched === 0 && <span className="badge badge-muted" style={{ fontSize: 10 }}>Not started</span>}
                  </div>
                  <h4 style={{ fontSize: 16, fontWeight: 700, cursor: 'pointer' }} onClick={() => go('recording-' + r.id)}>{r.title}</h4>
                  <div className="muted" style={{ fontSize: 13, marginTop: 6 }}>{fmtDate(r.date)} · {r.duration}</div>
                  <div className="row" style={{ gap: 8, marginTop: 14 }}>
                    <button className="btn btn-primary btn-sm" onClick={() => go('recording-' + r.id)}>
                      <Icon name="play" size={12} /> {r.watched > 0 && r.watched < 100 ? 'Resume' : r.watched === 100 ? 'Rewatch' : 'Watch'}
                    </button>
                    <button className="btn btn-secondary btn-sm"><Icon name="download" size={12} /> Materials</button>
                  </div>
                </div>
              </div>

              {/* Notes side */}
              <div style={{ background: 'var(--surface-2)', borderLeft: '1px solid var(--border)', padding: 18, display: 'flex', flexDirection: 'column' }}>
                <div className="row" style={{ justifyContent: 'space-between', marginBottom: 12 }}>
                  <div className="row" style={{ gap: 8 }}>
                    <Icon name="note" size={14} style={{ color: 'var(--gold)' }} />
                    <strong style={{ fontSize: 13 }}>My notes</strong>
                    <span className="muted" style={{ fontSize: 12 }}>· {notes.length}</span>
                  </div>
                  {notes.length > 0 && (
                    <button className="btn-ghost" style={{ fontSize: 11, color: 'var(--text-muted)', padding: '2px 6px' }} onClick={() => go('recording-' + r.id)}>View all →</button>
                  )}
                </div>
                {notes.length === 0 ? (
                  <div className="muted" style={{ fontSize: 12, padding: '20px 0', textAlign: 'center', fontStyle: 'italic' }}>
                    No notes yet — open the lecture to add some.
                  </div>
                ) : (
                  <div className="col" style={{ gap: 8, overflow: 'hidden' }}>
                    {notes.slice(0, 3).map(n => (
                      <div key={n.id} style={{ borderLeft: '2px solid var(--gold)', paddingLeft: 10 }}>
                        <div className="mono" style={{ fontSize: 10, color: 'var(--gold)', fontWeight: 700, marginBottom: 3, letterSpacing: '0.05em' }}>{n.timestamp}</div>
                        <div style={{ fontSize: 12, lineHeight: 1.5, color: 'var(--text)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{n.text}</div>
                      </div>
                    ))}
                    {notes.length > 3 && (
                      <div className="muted" style={{ fontSize: 11, paddingLeft: 12 }}>+ {notes.length - 3} more note{notes.length - 3 === 1 ? '' : 's'}</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const WishlistPage = ({ go, wishlist }) => {
  const items = SOIC_DATA.courses.filter(c => wishlist.includes(c.id));
  return (
    <div>
      <PageHeader title="Wishlist" subtitle="We'll email you the day enrollment opens." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {items.map(c => <CourseCard key={c.id} course={c} onClick={() => go('course-' + c.id)} footerSlot={<span className="badge badge-gold">Wishlisted</span>} />)}
        {items.length === 0 && (
          <div className="card" style={{ padding: 56, textAlign: 'center', gridColumn: '1 / -1' }}>
            <Icon name="heart" size={32} style={{ color: 'var(--text-dim)' }} />
            <h3 className="h3" style={{ marginTop: 14 }}>Nothing wishlisted yet</h3>
            <div className="muted" style={{ marginTop: 6 }}>Browse courses and tap the heart to save them.</div>
          </div>
        )}
      </div>
    </div>
  );
};

const InstructorStudents = () => (
  <div>
    <PageHeader title="My students" subtitle="180 students across 2 courses" />
    <div className="card" style={{ padding: 0 }}>
      <table className="table">
        <thead><tr><th>Student</th><th>Course</th><th>Progress</th><th>Last seen</th><th>Notes</th><th></th></tr></thead>
        <tbody>
          {SOIC_DATA.users.filter(u => u.role === 'student').slice(0, 8).map((u, i) => (
            <tr key={u.id} className="row-hover">
              <td>
                <div className="row" style={{ gap: 12 }}>
                  <Avatar name={u.name} />
                  <div>
                    <div style={{ fontWeight: 600 }}>{u.name}</div>
                    <div className="muted" style={{ fontSize: 12 }}>{u.email}</div>
                  </div>
                </div>
              </td>
              <td>Filmmaking Diploma</td>
              <td>
                <div className="row" style={{ gap: 8 }}>
                  <div style={{ width: 100, height: 6, background: 'var(--surface-2)', borderRadius: 3 }}>
                    <div style={{ width: (40 + i*7) + '%', height: '100%', background: 'var(--accent-bright)', borderRadius: 3 }}></div>
                  </div>
                  <span className="mono muted" style={{ fontSize: 12 }}>{40 + i*7}%</span>
                </div>
              </td>
              <td className="muted">{i+1}d ago</td>
              <td className="mono muted">{2 + i}</td>
              <td><button className="btn btn-ghost btn-sm">⋯</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const InstructorEarnings = () => (
  <div>
    <PageHeader title="Earnings" subtitle="60% revenue share · paid monthly" />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
      <StatTile label="This month" value={fmtEGP(48720)} delta="+18%" tone="gold" icon="money" />
      <StatTile label="Pending payout" value={fmtEGP(12400)} tone="accent" icon="clock" />
      <StatTile label="Lifetime" value={fmtEGP(284600)} tone="success" icon="award" />
    </div>
    <div className="card">
      <h3 className="h3" style={{ marginBottom: 14 }}>Payouts</h3>
      <table className="table">
        <thead><tr><th>Period</th><th>Course</th><th>Enrollments</th><th>Status</th><th style={{ textAlign: 'right' }}>Amount</th></tr></thead>
        <tbody>
          {[
            { p: 'Nov 2025', c: 'Filmmaking Diploma', e: 12, s: 'paid', a: 60480 },
            { p: 'Nov 2025', c: 'Acting Workshop', e: 4, s: 'paid', a: 15600 },
            { p: 'Oct 2025', c: 'Filmmaking Diploma', e: 14, s: 'paid', a: 70560 },
            { p: 'Dec 2025 (current)', c: 'Filmmaking Diploma', e: 8, s: 'pending', a: 40320 },
          ].map((p, i) => (
            <tr key={i}>
              <td>{p.p}</td>
              <td>{p.c}</td>
              <td className="mono">{p.e}</td>
              <td><span className={`badge ${p.s === 'paid' ? 'badge-success' : 'badge-warning'}`}>{p.s}</span></td>
              <td className="mono" style={{ textAlign: 'right', fontWeight: 700 }}>{fmtEGP(p.a)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const AdminAnalytics = () => (
  <div>
    <PageHeader title="Analytics" subtitle="Platform-wide performance"
      actions={<button className="btn btn-secondary"><Icon name="download" size={14} /> Export report</button>} />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
      <StatTile label="Revenue · 30d" value={fmtEGP(184200)} delta="+29%" tone="gold" icon="money" />
      <StatTile label="New students" value="47" delta="+9" tone="accent" icon="user" />
      <StatTile label="Avg. course rating" value="4.8" delta="+0.1" tone="success" icon="star" />
      <StatTile label="Refund rate" value="2.1%" delta="-0.4%" tone="success" icon="refund" />
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
      <div className="card">
        <h3 className="h3" style={{ marginBottom: 14 }}>Revenue trend</h3>
        <MiniChart data={SOIC_DATA.analytics.revenueChart} height={160} color="var(--gold)" />
      </div>
      <div className="card">
        <h3 className="h3" style={{ marginBottom: 14 }}>Enrollments</h3>
        <MiniChart data={SOIC_DATA.analytics.enrollmentChart} height={160} color="var(--accent-bright)" />
      </div>
      <div className="card" style={{ gridColumn: '1 / -1' }}>
        <h3 className="h3" style={{ marginBottom: 14 }}>Source breakdown · last 30 days</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {[
            { src: 'Facebook ads', pct: 42, count: 20 },
            { src: 'Organic search', pct: 28, count: 13 },
            { src: 'Referrals', pct: 18, count: 8 },
            { src: 'Direct', pct: 12, count: 6 },
          ].map(s => (
            <div key={s.src} className="card flat" style={{ padding: 16 }}>
              <div className="muted" style={{ fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{s.src}</div>
              <div className="display" style={{ fontSize: 32, marginTop: 6 }}>{s.pct}<span style={{ fontSize: 18, color: 'var(--text-muted)' }}>%</span></div>
              <div className="muted" style={{ fontSize: 12, marginTop: 4 }}>{s.count} new students</div>
              <div style={{ height: 4, background: 'var(--surface-3)', borderRadius: 2, marginTop: 12 }}>
                <div style={{ width: s.pct + '%', height: '100%', background: 'var(--accent-bright)', borderRadius: 2 }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// === Floating demo controls (always visible) ===
const DemoControls = ({ t, setTweak }) => {
  const { tr, lang } = useT();
  const [open, setOpen] = useStateApp(false);
  const isRTL = lang === 'ar';
  const roles = [
    { id: 'public', en: 'Public', ar: 'زائر' },
    { id: 'student', en: 'Student', ar: 'طالب' },
    { id: 'instructor', en: 'Instructor', ar: 'محاضر' },
    { id: 'admin', en: 'Admin', ar: 'مدير' },
  ];
  const current = roles.find(r => r.id === t.role);
  return (
    <div style={{
      position: 'fixed', top: 16, [isRTL ? 'left' : 'right']: 16, zIndex: 90,
      display: 'flex', alignItems: 'center', gap: 6,
      background: 'var(--surface)', border: '1px solid var(--border)',
      padding: 5, borderRadius: 100, boxShadow: 'var(--shadow-1)',
      direction: 'ltr',
    }}>
      {/* Language toggle */}
      <div style={{ display: 'flex', background: 'var(--surface-2)', borderRadius: 100, padding: 2 }}>
        {['en', 'ar'].map(l => (
          <button key={l} onClick={() => setTweak('lang', l)} style={{
            padding: '6px 12px', borderRadius: 100, fontSize: 11, fontWeight: 700,
            background: t.lang === l ? 'var(--accent)' : 'transparent',
            color: t.lang === l ? '#fff' : 'var(--text-muted)',
            letterSpacing: '0.06em', textTransform: 'uppercase',
          }}>{l === 'en' ? 'EN' : 'AR'}</button>
        ))}
      </div>

      {/* Theme toggle */}
      <button onClick={() => setTweak('theme', t.theme === 'light' ? 'dark' : 'light')} style={{
        width: 30, height: 30, borderRadius: 50, background: 'var(--surface-2)',
        color: 'var(--text)', display: 'flex', alignItems: 'center', justifyContent: 'center',
      }} title={t.theme === 'light' ? 'Switch to dark' : 'Switch to light'}>
        {t.theme === 'light'
          ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" /></svg>
          : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4" /><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4" /></svg>
        }
      </button>

      {/* Role selector */}
      <div style={{ position: 'relative' }}>
        <button onClick={() => setOpen(!open)} style={{
          padding: '6px 12px 6px 8px', borderRadius: 100, fontSize: 12, fontWeight: 600,
          background: 'var(--surface-2)', color: 'var(--text)',
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <span style={{ width: 22, height: 22, borderRadius: 50, background: 'var(--accent-soft)', color: 'var(--accent-bright)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700 }}>
            {current?.id === 'public' ? '👤' : current?.id === 'student' ? 'S' : current?.id === 'instructor' ? 'I' : 'A'}
          </span>
          <span>{tr(current?.en || '', current?.ar || '')}</span>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
        </button>
        {open && (
          <>
            <div style={{ position: 'fixed', inset: 0, zIndex: 1 }} onClick={() => setOpen(false)}></div>
            <div style={{
              position: 'absolute', top: 'calc(100% + 6px)', right: 0, minWidth: 180,
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 12, padding: 6, boxShadow: 'var(--shadow-2)', zIndex: 2,
              direction: isRTL ? 'rtl' : 'ltr',
            }}>
              <div style={{ fontSize: 10, color: 'var(--text-dim)', padding: '6px 10px', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{tr('View as', 'عرض كـ')}</div>
              {roles.map(r => (
                <button key={r.id} onClick={() => { setTweak('role', r.id); setOpen(false); }} style={{
                  width: '100%', textAlign: isRTL ? 'right' : 'left',
                  padding: '8px 10px', borderRadius: 8, fontSize: 13, fontWeight: 500,
                  background: t.role === r.id ? 'var(--accent-soft)' : 'transparent',
                  color: t.role === r.id ? 'var(--text)' : 'var(--text-muted)',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
                }}>
                  <span>{tr(r.en, r.ar)}</span>
                  {t.role === r.id && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-bright)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7" /></svg>}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// === Tweaks panel UI ===
const TweaksPanelUI = ({ t, setTweak }) => (
  <TweaksPanel>
    <TweakSection label="Language" />
    <TweakRadio
      label="Language"
      value={t.lang}
      options={['en', 'ar']}
      onChange={(v) => setTweak('lang', v)}
    />
    <TweakSection label="Theme" />
    <TweakRadio
      label="Mode"
      value={t.theme}
      options={['dark', 'light']}
      onChange={(v) => setTweak('theme', v)}
    />
    <TweakColor
      label="Accent"
      value={t.accent}
      options={['#2d4ee0', '#d4a356', '#9b6ee0', '#e84a4a', '#4ad287']}
      onChange={(v) => setTweak('accent', v)}
    />
    <TweakSection label="View as" />
    <TweakSelect
      label="Role"
      value={t.role}
      options={['public', 'student', 'instructor', 'admin']}
      onChange={(v) => setTweak('role', v)}
    />
  </TweaksPanel>
);


export { App };
