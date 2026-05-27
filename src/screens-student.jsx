// Student screens
import React, { useState as useStateS, useEffect as useEffectS } from 'react';
import { SOIC_DATA, fmtEGP, fmtDate, fmtShortDate, initials } from './data.js';
import { Icon, Brand, Avatar, CourseCard, CourseImage, StatTile, MiniChart, CalendarMonth, PageHeader, NavItem, Tabs, Modal, useToast, useT } from './components.jsx';


const StudentDashboard = ({ go, enrolled, wishlist }) => {
  const { tr } = useT();
  const enrolledCourses = SOIC_DATA.courses.filter(c => enrolled.includes(c.id));
  const upcoming = SOIC_DATA.schedule.slice(0, 3);
  return (
    <div>
      <PageHeader title={tr('Welcome back, Layla', 'أهلًا بعودتك يا ليلى')} subtitle={tr('Your next live class is in 14 hours.', 'محاضرتك القادمة بعد 14 ساعة.')}
        actions={<button className="btn btn-secondary"><Icon name="bell" size={15} /> {tr('3 new', '3 جديد')}</button>} />

      {/* Big up next */}
      <div className="card frame-corners cinema-card" style={{ background: 'linear-gradient(135deg, #1a2562 0%, #0d1233 100%)', padding: 32, marginBottom: 24, position: 'relative', overflow: 'hidden' }}>
        <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div className="row" style={{ gap: 10, marginBottom: 10 }}>
              <span className="badge badge-gold">{tr('UP NEXT', 'القادم')}</span>
              <span className="badge badge-muted">{tr('Lecture #5 of 24', 'محاضرة 5 من 24')}</span>
            </div>
            <h2 className="h1" style={{ fontSize: 38 }}>{tr('Camera Movement & Blocking', 'حركة الكاميرا والتمركز')}</h2>
            <div className="muted" style={{ marginTop: 6 }}>{tr('Filmmaking Diploma · Dr. Hossam Dagher', 'دبلومة صناعة الأفلام · د. حسام داغر')}</div>
            <div className="row" style={{ gap: 24, marginTop: 24, fontSize: 14 }}>
              <span className="row" style={{ gap: 6 }}><Icon name="calendar" size={15} /> {tr('Tomorrow · Dec 8', 'الغد · 8 ديسمبر')}</span>
              <span className="row" style={{ gap: 6 }}><Icon name="clock" size={15} /> 19:00 — 20:30</span>
              <span className="row" style={{ gap: 6 }}><Icon name="users" size={15} /> {tr('42 classmates', '42 زميل')}</span>
            </div>
            <div className="row" style={{ gap: 10, marginTop: 24 }}>
              <button className="btn btn-primary btn-lg" onClick={() => go('live-student')}><Icon name="video" size={15} /> {tr('Join live room', 'انضم للمحاضرة')}</button>
              <button className="btn btn-secondary">{tr('Open course', 'افتح الكورس')}</button>
            </div>
          </div>
          <div style={{ textAlign: tr('right', 'left') }}>
            <div className="display" style={{ fontSize: 14, color: 'var(--gold)' }}>{tr('STARTS IN', 'يبدأ خلال')}</div>
            <div className="display" style={{ fontSize: 72, lineHeight: 1, marginTop: 6 }}>14<span style={{ color: 'var(--text-dim)' }}>:</span>32</div>
            <div className="muted mono" style={{ fontSize: 12 }}>{tr('HRS : MIN', 'ساعة : دقيقة')}</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
        <div>
          <h3 className="h3" style={{ marginBottom: 14 }}>{tr('Your enrolled courses', 'كورساتك المسجّلة')}</h3>
          <div className="col" style={{ gap: 14 }}>
            {enrolledCourses.map(c => {
              const prog = c.id === 'c1' ? 42 : 78;
              return (
                <div key={c.id} className="card" style={{ padding: 18, display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 18, alignItems: 'center', cursor: 'pointer' }}
                  onClick={() => go('learning-' + c.id)}>
                  <div className="ph-img" style={{ width: 100, height: 70, borderRadius: 8, background: `repeating-linear-gradient(135deg, rgba(255,255,255,0.04) 0 12px, rgba(255,255,255,0.06) 12px 24px), linear-gradient(135deg, ${c.tint}66, ${c.tint}22)`, position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
                    {c.coverImage && <img src={c.coverImage} alt={c.title} onError={e => e.target.style.display='none'} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />}
                    {!c.coverImage && <span style={{ fontFamily: 'Anton', fontSize: 9, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.5)' }}>{c.category}</span>}
                  </div>
                  <div>
                    <h4 className="h4">{c.title}</h4>
                    <div className="muted" style={{ fontSize: 12, marginTop: 4 }}>{c.instructor}</div>
                    <div style={{ marginTop: 12 }}>
                      <div style={{ height: 6, background: 'var(--surface-2)', borderRadius: 4, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: prog + '%', background: c.tint }}></div>
                      </div>
                      <div className="row" style={{ justifyContent: 'space-between', marginTop: 6 }}>
                        <span className="muted" style={{ fontSize: 12 }}>{prog}% complete</span>
                        <span className="muted" style={{ fontSize: 12 }}>{Math.round(c.lectures * prog / 100)} / {c.lectures} lectures</span>
                      </div>
                    </div>
                  </div>
                  <button className="btn btn-secondary btn-sm">Continue <Icon name="arrow" size={13} /></button>
                </div>
              );
            })}
          </div>

          <h3 className="h3" style={{ marginTop: 32, marginBottom: 14 }}>{tr('Continue watching', 'تابع المشاهدة')}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {SOIC_DATA.recordings.filter(r => r.watched > 0 && r.watched < 100).slice(0, 2).map(r => {
              const c = SOIC_DATA.courses.find(x => x.id === r.courseId);
              return (
                <div key={r.id} className="card" style={{ padding: 0, overflow: 'hidden', cursor: 'pointer' }} onClick={() => go('recording-' + r.id)}>
                  <div className="ph-img" style={{ height: 120, borderRadius: 0, background: `repeating-linear-gradient(135deg, rgba(255,255,255,0.04) 0 12px, rgba(255,255,255,0.06) 12px 24px), linear-gradient(135deg, ${c.tint}55, ${c.tint}15)`, position: 'relative' }}>
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ width: 44, height: 44, borderRadius: 50, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                        <Icon name="play" size={18} />
                      </div>
                    </div>
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'rgba(0,0,0,0.4)' }}>
                      <div style={{ width: r.watched + '%', height: '100%', background: 'var(--danger)' }}></div>
                    </div>
                  </div>
                  <div style={{ padding: 14 }}>
                    <div className="muted" style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{c.title}</div>
                    <h4 style={{ marginTop: 4, fontSize: 14, fontWeight: 600 }}>{r.title}</h4>
                    <div className="row" style={{ justifyContent: 'space-between', marginTop: 8, fontSize: 12, color: 'var(--text-muted)' }}>
                      <span>{r.duration}</span>
                      <span>{r.watched}% watched</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="h3" style={{ marginBottom: 14 }}>{tr('Upcoming lectures', 'محاضرات قادمة')}</h3>
          <div className="card" style={{ padding: 0 }}>
            {upcoming.map((s, i) => {
              const c = SOIC_DATA.courses.find(x => x.id === s.courseId);
              return (
                <div key={s.id} style={{ padding: 16, borderBottom: i < upcoming.length - 1 ? '1px solid var(--border)' : 'none', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 8, background: c.tint + '22', color: c.tint, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <div style={{ fontSize: 9, letterSpacing: '0.1em' }}>{new Date(s.date).toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}</div>
                    <div className="display" style={{ fontSize: 18 }}>{s.date.split('-')[2]}</div>
                  </div>
                  <div className="grow">
                    <h4 style={{ fontSize: 14, fontWeight: 600 }}>{s.title}</h4>
                    <div className="muted" style={{ fontSize: 12, marginTop: 2 }}>{c.title}</div>
                    <div className="muted mono" style={{ fontSize: 11, marginTop: 6 }}>{s.time} · {s.duration} min</div>
                  </div>
                  {s.status === 'upcoming-soon' && <div className="row" style={{ gap: 4, color: 'var(--gold)', fontSize: 11 }}><Icon name="bell" size={12} />{tr('Email sent', 'تم إرسال البريد')}</div>}
                </div>
              );
            })}
          </div>

          <h3 className="h3" style={{ marginTop: 28, marginBottom: 14 }}>{tr('Wishlist', 'قائمة الرغبات')} <span className="muted" style={{ fontWeight: 400, fontSize: 13 }}>· {wishlist.length}</span></h3>
          <div className="col" style={{ gap: 10 }}>
            {wishlist.map(id => {
              const c = SOIC_DATA.courses.find(x => x.id === id);
              return (
                <div key={c.id} className="card flat" style={{ padding: 14, display: 'flex', gap: 12, alignItems: 'center', cursor: 'pointer' }} onClick={() => go('course-' + c.id)}>
                  <div className="ph-img" style={{ width: 48, height: 48, borderRadius: 6, background: `linear-gradient(135deg, ${c.tint}55, ${c.tint}15)`, position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
                    {c.coverImage && <img src={c.coverImage} alt={c.title} onError={e => e.target.style.display='none'} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />}
                  </div>
                  <div className="grow">
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{c.title}</div>
                    <div className="muted" style={{ fontSize: 11 }}>{tr('Starts', 'يبدأ')} {fmtShortDate(c.startDate)}</div>
                  </div>
                  <Icon name="bell" size={14} style={{ color: 'var(--gold)' }} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const StudentBrowse = ({ go, enrolled, wishlist }) => {
  const { tr } = useT();
  const [q, setQ] = useStateS('');
  const [cat, setCat] = useStateS('All');
  const cats = [
    { id: 'All', en: 'All', ar: 'الكل' },
    { id: 'Diploma', en: 'Diploma', ar: 'دبلومة' },
    { id: 'Workshop', en: 'Workshop', ar: 'ورشة' },
    { id: 'Short Course', en: 'Short Course', ar: 'كورس قصير' },
  ];
  const filtered = SOIC_DATA.courses.filter(c =>
    (cat === 'All' || c.category === cat) &&
    (q === '' || c.title.toLowerCase().includes(q.toLowerCase()))
  );
  return (
    <div>
      <PageHeader title={tr('Browse courses', 'تصفّح الكورسات')} subtitle={tr('Find your next program', 'اكتشف برنامجك التالي')} />
      <div className="row" style={{ marginBottom: 20, gap: 12 }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: 360 }}>
          <input className="input" placeholder={tr('Search courses…', 'ابحث عن كورسات…')} value={q} onChange={e => setQ(e.target.value)} style={{ paddingLeft: 38 }} />
          <span style={{ position: 'absolute', left: 12, top: 12, color: 'var(--text-dim)' }}><Icon name="search" size={16} /></span>
        </div>
        <div className="row" style={{ gap: 8 }}>
          {cats.map(c => (
            <button key={c.id} className={`btn ${cat === c.id ? 'btn-primary' : 'btn-secondary'} btn-sm`} onClick={() => setCat(c.id)}>{tr(c.en, c.ar)}</button>
          ))}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {filtered.map(c => (
          <CourseCard key={c.id} course={c} onClick={() => go('course-' + c.id)} footerSlot={
            enrolled.includes(c.id) ? <span className="badge badge-success">{tr('Enrolled', 'مسجَّل')}</span> :
            wishlist.includes(c.id) ? <span className="badge badge-gold">{tr('Wishlisted', 'في الرغبات')}</span> : null
          } />
        ))}
      </div>
    </div>
  );
};

const StudentCalendar = ({ go }) => {
  const { tr } = useT();
  const [view, setView] = useStateS('month');
  const viewLabels = { month: tr('Month', 'شهر'), week: tr('Week', 'أسبوع'), agenda: tr('Agenda', 'جدول') };
  return (
    <div>
      <PageHeader title={tr('My calendar', 'تقويمي')} subtitle={tr('All your enrolled lectures, auto-synced. Email reminder 15 min before each session.', 'كل محاضراتك المسجّلة، متزامنة تلقائيًا. تذكير بالبريد قبل كل محاضرة بـ 15 دقيقة.')}
        actions={
          <div className="row" style={{ gap: 6 }}>
            {['month', 'week', 'agenda'].map(v => (
              <button key={v} className={`btn ${view === v ? 'btn-primary' : 'btn-secondary'} btn-sm`} onClick={() => setView(v)}>{viewLabels[v]}</button>
            ))}
          </div>
        } />
      {view === 'month' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 20 }}>
          <CalendarMonth events={SOIC_DATA.schedule} year={2025} month={11} onEventClick={(e) => go('live-student')} />
          <div className="col" style={{ gap: 14 }}>
            <div className="card">
              <div className="row" style={{ gap: 8, marginBottom: 12 }}>
                <span className="live-dot"></span>
                <span className="display" style={{ fontSize: 12, color: 'var(--danger)', letterSpacing: '0.2em' }}>NEXT UP</span>
              </div>
              <h4 className="h4">Camera Movement & Blocking</h4>
              <div className="muted" style={{ fontSize: 12, marginTop: 4 }}>Tomorrow · 19:00 · 90 min</div>
              <button className="btn btn-primary btn-sm" style={{ width: '100%', marginTop: 14 }} onClick={() => go('live-student')}>Join live room</button>
            </div>
            <div className="card flat">
              <h4 className="h4" style={{ marginBottom: 10 }}>Calendar feeds</h4>
              <div className="muted" style={{ fontSize: 13, marginBottom: 12 }}>Subscribe so SOIC events sync to your phone.</div>
              <button className="btn btn-secondary btn-sm" style={{ width: '100%', marginBottom: 8 }}><Icon name="download" size={13} /> Apple Calendar (.ics)</button>
              <button className="btn btn-secondary btn-sm" style={{ width: '100%', marginBottom: 8 }}><Icon name="download" size={13} /> Google Calendar</button>
              <button className="btn btn-secondary btn-sm" style={{ width: '100%' }}><Icon name="mail" size={13} /> Email reminders ON</button>
            </div>
            <div className="card flat">
              <h4 className="h4" style={{ marginBottom: 10 }}>Legend</h4>
              <div className="col" style={{ gap: 8 }}>
                {SOIC_DATA.courses.filter(c => ['c1','c4'].includes(c.id)).map(c => (
                  <div key={c.id} className="row" style={{ gap: 8, fontSize: 13 }}>
                    <span style={{ width: 12, height: 12, borderRadius: 3, background: c.tint }}></span>{c.title}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {view === 'agenda' && (
        <div className="card" style={{ padding: 0 }}>
          {SOIC_DATA.schedule.map((s, i) => {
            const c = SOIC_DATA.courses.find(x => x.id === s.courseId);
            return (
              <div key={s.id} style={{ display: 'grid', gridTemplateColumns: '120px 6px 1fr auto', gap: 18, padding: '20px 24px', alignItems: 'center', borderBottom: i < SOIC_DATA.schedule.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <div>
                  <div className="muted" style={{ fontSize: 11, letterSpacing: '0.1em' }}>{new Date(s.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short' }).toUpperCase()}</div>
                  <div className="display" style={{ fontSize: 30 }}>{s.date.split('-')[2]}</div>
                  <div className="muted mono" style={{ fontSize: 12 }}>{s.time}</div>
                </div>
                <div style={{ alignSelf: 'stretch', background: c.tint, borderRadius: 3 }}></div>
                <div>
                  <h4 className="h4">{s.title}</h4>
                  <div className="muted" style={{ fontSize: 13, marginTop: 4 }}>{c.title} · {c.instructor}</div>
                </div>
                <button className="btn btn-secondary btn-sm" onClick={() => go('live-student')}>Open</button>
              </div>
            );
          })}
        </div>
      )}
      {view === 'week' && (
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '60px repeat(7, 1fr)', gap: 0 }}>
            <div></div>
            {['MON 8', 'TUE 9', 'WED 10', 'THU 11', 'FRI 12', 'SAT 13', 'SUN 14'].map(d => (
              <div key={d} style={{ padding: '0 8px 12px', fontSize: 12, fontWeight: 600, borderBottom: '1px solid var(--border)' }}>{d}</div>
            ))}
            {[18, 19, 20, 21].map(h => (
              <React.Fragment key={h}>
                <div style={{ padding: '12px 8px', fontSize: 11, color: 'var(--text-dim)' }}>{h}:00</div>
                {[0,1,2,3,4,5,6].map(d => {
                  const slot = SOIC_DATA.schedule.find(s => parseInt(s.date.split('-')[2], 10) === 8 + d && parseInt(s.time, 10) === h);
                  const c = slot ? SOIC_DATA.courses.find(x => x.id === slot.courseId) : null;
                  return (
                    <div key={d} style={{ minHeight: 60, padding: 4, borderBottom: '1px solid var(--border)', borderRight: '1px solid var(--border)' }}>
                      {slot && (
                        <div style={{ background: c.tint + '30', borderLeft: '3px solid ' + c.tint, padding: '6px 8px', borderRadius: 4, fontSize: 11, cursor: 'pointer' }} onClick={() => go('live-student')}>
                          <div style={{ fontWeight: 600 }}>{slot.title}</div>
                          <div className="muted">{c.title}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const StudentWallet = ({ wallet }) => {
  const transactions = [
    { id: 't1', title: 'Filmmaking Diploma', amount: -8400, status: 'completed', date: '2025-11-24', method: 'InstaPay' },
    { id: 't2', title: 'Screenwriting Intensive', amount: -3200, status: 'completed', date: '2025-11-20', method: 'Card' },
    { id: 't3', title: 'Wallet top-up', amount: 5000, status: 'completed', date: '2025-11-15', method: 'InstaPay' },
    { id: 't4', title: 'Referral bonus', amount: 200, status: 'completed', date: '2025-11-10', method: 'Promo' },
  ];
  return (
    <div>
      <PageHeader title="My learning wallet" subtitle="Top up once, enroll in anything — or pay per-course." />
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20 }}>
        <div>
          <div className="card frame-corners cinema-card" style={{ background: 'linear-gradient(135deg, #1d2960, #0d1233)', padding: 28, marginBottom: 20 }}>
            <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div className="display" style={{ fontSize: 12, color: 'var(--gold)', letterSpacing: '0.2em' }}>WALLET BALANCE</div>
                <div className="display" style={{ fontSize: 56, marginTop: 8 }}>EGP {wallet.toLocaleString()}</div>
                <div className="muted mono" style={{ marginTop: 8, fontSize: 12 }}>•••• •••• •••• 2026 · Layla Khalid</div>
              </div>
              <Icon name="wallet" size={28} style={{ color: 'var(--gold)' }} />
            </div>
            <div className="row" style={{ gap: 10, marginTop: 28 }}>
              <button className="btn btn-gold">Top up wallet</button>
              <button className="btn btn-secondary">Request refund</button>
            </div>
          </div>

          <h3 className="h3" style={{ marginBottom: 14 }}>Recent transactions</h3>
          <div className="card" style={{ padding: 0 }}>
            <table className="table">
              <thead>
                <tr><th>Description</th><th>Method</th><th>Date</th><th style={{ textAlign: 'right' }}>Amount</th></tr>
              </thead>
              <tbody>
                {transactions.map(t => (
                  <tr key={t.id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{t.title}</div>
                      <div className="dim" style={{ fontSize: 12 }}>Receipt #{t.id.toUpperCase()}</div>
                    </td>
                    <td>{t.method}</td>
                    <td className="muted">{fmtDate(t.date)}</td>
                    <td style={{ textAlign: 'right', fontWeight: 700, color: t.amount > 0 ? 'var(--success)' : 'var(--text)' }}>
                      {t.amount > 0 ? '+' : ''}{fmtEGP(t.amount).replace('EGP -', 'EGP -')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <div className="card">
            <h4 className="h4" style={{ marginBottom: 14 }}>Payment methods</h4>
            <div className="col" style={{ gap: 10 }}>
              <div className="card flat" style={{ padding: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 42, height: 28, borderRadius: 4, background: 'linear-gradient(135deg, #1a73e8, #0d47a1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#fff' }}>InstaPay</div>
                <div className="grow">
                  <div style={{ fontSize: 13, fontWeight: 600 }}>+20 12 00 ••• 583</div>
                  <div className="muted" style={{ fontSize: 11 }}>Connected · 2 days ago</div>
                </div>
                <span className="badge badge-success">Default</span>
              </div>
              <div className="card flat" style={{ padding: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 42, height: 28, borderRadius: 4, background: 'linear-gradient(135deg, #eb001b, #f79e1b)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#fff' }}>VISA</div>
                <div className="grow">
                  <div style={{ fontSize: 13, fontWeight: 600 }}>•••• 4429</div>
                  <div className="muted" style={{ fontSize: 11 }}>Expires 09/27</div>
                </div>
              </div>
              <button className="btn btn-secondary btn-sm" style={{ width: '100%' }}><Icon name="plus" size={13} /> Add payment method</button>
            </div>
          </div>

          <div className="card flat" style={{ marginTop: 16, padding: 18 }}>
            <h4 className="h4" style={{ marginBottom: 10 }}>How payments work</h4>
            <ol className="muted" style={{ fontSize: 13, paddingLeft: 18, lineHeight: 1.6 }}>
              <li>Pay via InstaPay or card from your wallet or per-course.</li>
              <li>Admin verifies InstaPay receipts within 24h.</li>
              <li>Course unlocks automatically on approval.</li>
              <li>7-day refund window after first lecture.</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

const PaymentModal = ({ open, course, onClose, onConfirm }) => {
  const [method, setMethod] = useStateS('instapay');
  if (!course) return null;
  return (
    <Modal open={open} onClose={onClose} title="Complete your enrollment" size="lg"
      footer={
        <>
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={() => onConfirm(method)}>
            {method === 'instapay' ? "I've sent the InstaPay" : `Pay ${fmtEGP(course.price)}`}
          </button>
        </>
      }>
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 24 }}>
        <div>
          <label className="label">Pay with</label>
          <div className="col" style={{ gap: 10 }}>
            {[
              { id: 'instapay', name: 'InstaPay', sub: 'Send to +20 12 00 409 583 and we approve within 24h', icon: '⚡' },
              { id: 'card', name: 'Credit / Debit card', sub: 'Instant unlock · Visa, Mastercard, Meeza', icon: '💳' },
            ].map(m => (
              <div key={m.id} onClick={() => !m.disabled && setMethod(m.id)} className="card flat" style={{
                padding: 14, display: 'flex', alignItems: 'center', gap: 12, cursor: m.disabled ? 'not-allowed' : 'pointer',
                opacity: m.disabled ? 0.5 : 1, borderColor: method === m.id ? 'var(--accent-bright)' : 'var(--border)',
                background: method === m.id ? 'var(--accent-soft)' : 'var(--surface-2)',
              }}>
                <div style={{ fontSize: 22 }}>{m.icon}</div>
                <div className="grow">
                  <div style={{ fontWeight: 600 }}>{m.name}</div>
                  <div className="muted" style={{ fontSize: 12 }}>{m.sub}</div>
                </div>
                <div style={{ width: 18, height: 18, borderRadius: 50, border: '2px solid var(--border-strong)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {method === m.id && <div style={{ width: 8, height: 8, borderRadius: 50, background: 'var(--accent-bright)' }}></div>}
                </div>
              </div>
            ))}
          </div>

          {method === 'instapay' && (
            <div className="card flat" style={{ marginTop: 16, padding: 16 }}>
              <h4 className="h4" style={{ marginBottom: 12 }}>InstaPay instructions</h4>
              <ol className="muted" style={{ fontSize: 13, paddingLeft: 18, lineHeight: 1.8 }}>
                <li>Open your InstaPay app and send <strong style={{ color: 'var(--text)' }}>{fmtEGP(course.price)}</strong> to <strong className="mono" style={{ color: 'var(--accent-bright)' }}>+20 12 00 409 583</strong></li>
                <li>Use reference: <strong className="mono">{course.id.toUpperCase()}-LAYLA</strong></li>
                <li>Upload the receipt below.</li>
              </ol>
              <button className="btn btn-secondary btn-sm" style={{ marginTop: 12 }}><Icon name="upload" size={13} /> Upload receipt</button>
            </div>
          )}

          {method === 'card' && (
            <div style={{ marginTop: 16 }}>
              <label className="label">Card number</label>
              <input className="input" placeholder="1234 5678 9012 3456" />
              <div className="row" style={{ gap: 10, marginTop: 10 }}>
                <div className="grow"><label className="label">Expiry</label><input className="input" placeholder="MM/YY" /></div>
                <div className="grow"><label className="label">CVC</label><input className="input" placeholder="123" /></div>
              </div>
            </div>
          )}
        </div>

        <div>
          <div className="card flat" style={{ padding: 16 }}>
            <h4 className="h4" style={{ marginBottom: 12 }}>Order summary</h4>
            <div className="ph-img" style={{ height: 90, marginBottom: 14, background: `linear-gradient(135deg, ${course.tint}55, ${course.tint}15)`, position: 'relative', overflow: 'hidden' }}>
              {course.coverImage && <img src={course.coverImage} alt={course.title} onError={e => e.target.style.display='none'} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />}
              {!course.coverImage && <span style={{ fontFamily: 'Anton', fontSize: 11, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.7)' }}>{course.cover}</span>}
            </div>
            <div style={{ fontWeight: 700 }}>{course.title}</div>
            <div className="muted" style={{ fontSize: 12, marginTop: 4 }}>{course.instructor}</div>
            <div style={{ borderTop: '1px solid var(--border)', marginTop: 14, paddingTop: 14, display: 'grid', gap: 8, fontSize: 13 }}>
              {course.originalPrice && (
                <div className="row" style={{ justifyContent: 'space-between' }}>
                  <span className="muted">Subtotal</span><span style={{ textDecoration: 'line-through' }}>{fmtEGP(course.originalPrice)}</span>
                </div>
              )}
              {course.originalPrice && (
                <div className="row" style={{ justifyContent: 'space-between' }}>
                  <span className="muted">Cohort discount</span><span style={{ color: 'var(--success)' }}>−{fmtEGP(course.originalPrice - course.price)}</span>
                </div>
              )}
              <div className="row" style={{ justifyContent: 'space-between', paddingTop: 8, borderTop: '1px solid var(--border)' }}>
                <strong>Total</strong>
                <div className="display" style={{ fontSize: 24 }}>{fmtEGP(course.price)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

const RecordingPlayer = ({ recordingId, go }) => {
  const r = SOIC_DATA.recordings.find(x => x.id === recordingId) || SOIC_DATA.recordings[1];
  const c = SOIC_DATA.courses.find(x => x.id === r.courseId);
  const [notes, setNotes] = useStateS(SOIC_DATA.notes.filter(n => n.recordingId === r.id));
  const [draft, setDraft] = useStateS('');
  const { toast } = useToast();

  const addNote = () => {
    if (!draft.trim()) return;
    const newNote = { id: 'n' + Date.now(), recordingId: r.id, timestamp: '24:18', text: draft };
    setNotes([...notes, newNote]);
    setDraft('');
    toast('Note saved at 24:18', 'success');
  };

  return (
    <div>
      <div className="row" style={{ marginBottom: 16, cursor: 'pointer' }} onClick={() => go('dashboard')}>
        <span className="muted" style={{ fontSize: 13 }}>← Back to dashboard</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
        <div>
          <div className="ph-img" style={{ aspectRatio: '16/9', position: 'relative', background: `repeating-linear-gradient(135deg, rgba(255,255,255,0.04) 0 12px, rgba(255,255,255,0.06) 12px 24px), linear-gradient(135deg, ${c.tint}66, ${c.tint}11)` }}>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 80, height: 80, borderRadius: 50, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer' }}>
                <Icon name="play" size={32} />
              </div>
            </div>
            {/* Player chrome */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 14, background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.75))' }}>
              <div style={{ height: 4, background: 'rgba(255,255,255,0.2)', borderRadius: 2, marginBottom: 10, position: 'relative' }}>
                <div style={{ width: r.watched + '%', height: '100%', background: 'var(--danger)', borderRadius: 2 }}></div>
                {notes.map((n, i) => (
                  <div key={n.id} style={{ position: 'absolute', top: -3, left: (15 + i*12) + '%', width: 10, height: 10, borderRadius: 50, background: 'var(--gold)', border: '2px solid var(--bg)', cursor: 'pointer' }} title={n.text}></div>
                ))}
              </div>
              <div className="row" style={{ justifyContent: 'space-between', color: '#fff', fontSize: 12 }}>
                <div className="row" style={{ gap: 14 }}>
                  <Icon name="play" size={16} />
                  <span className="mono">24:18 / {r.duration}</span>
                </div>
                <div className="row" style={{ gap: 12 }}>
                  <span className="mono">1.0x</span>
                  <span>HD</span>
                  <span>CC</span>
                  <Icon name="screen" size={16} />
                </div>
              </div>
            </div>
          </div>
          <div className="row" style={{ justifyContent: 'space-between', marginTop: 16 }}>
            <div>
              <div className="muted" style={{ fontSize: 12 }}>{c.title} · Lecture {r.id.replace('r','')}</div>
              <h2 className="h2" style={{ marginTop: 4 }}>{r.title}</h2>
            </div>
            <div className="row" style={{ gap: 8 }}>
              <button className="btn btn-secondary btn-sm"><Icon name="download" size={13} /> Materials</button>
              <button className="btn btn-secondary btn-sm">Lecture 4 →</button>
            </div>
          </div>
          <div className="card" style={{ marginTop: 18, padding: 18 }}>
            <h4 className="h4" style={{ marginBottom: 8 }}>About this lecture</h4>
            <p className="muted" style={{ fontSize: 14, lineHeight: 1.6 }}>
              In this session we cover the foundations of visual storytelling — how shot composition, camera height, and lens choice
              communicate emotion to the audience. We watch clips from <em>Roma</em>, <em>The Tree of Life</em>, and a short Egyptian
              indie called <em>Yomeddine</em> to break down what's working frame-by-frame.
            </p>
          </div>
        </div>

        {/* Notes panel */}
        <div>
          <div className="card" style={{ padding: 0, position: 'sticky', top: 24 }}>
            <div style={{ padding: '16px 18px', borderBottom: '1px solid var(--border)' }}>
              <div className="row" style={{ justifyContent: 'space-between' }}>
                <div>
                  <h4 className="h4">My notes</h4>
                  <div className="muted" style={{ fontSize: 12, marginTop: 2 }}>{notes.length} notes · Click a timestamp to jump</div>
                </div>
                <Icon name="note" size={16} style={{ color: 'var(--gold)' }} />
              </div>
            </div>
            <div style={{ padding: 18, maxHeight: 360, overflowY: 'auto' }}>
              <div className="col" style={{ gap: 12 }}>
                {notes.map(n => (
                  <div key={n.id} className="card flat" style={{ padding: 12 }}>
                    <div className="row" style={{ justifyContent: 'space-between', marginBottom: 6 }}>
                      <span className="badge badge-gold mono">{n.timestamp}</span>
                      <button className="btn-ghost" style={{ padding: 2, opacity: 0.5 }}><Icon name="x" size={12} /></button>
                    </div>
                    <div style={{ fontSize: 13, lineHeight: 1.5 }}>{n.text}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ padding: 14, borderTop: '1px solid var(--border)' }}>
              <textarea className="textarea" placeholder="Type a note at 24:18…" value={draft} onChange={e => setDraft(e.target.value)} rows={2} style={{ resize: 'none', marginBottom: 8 }} />
              <button className="btn btn-primary btn-sm" style={{ width: '100%' }} onClick={addNote} disabled={!draft.trim()}>Save note at current time</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export { StudentDashboard, StudentBrowse, StudentCalendar, PaymentModal, RecordingPlayer };
