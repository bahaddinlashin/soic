// Instructor screens
import React, { useState } from 'react';
import { SOIC_DATA, fmtEGP, fmtDate, fmtShortDate, initials } from './data.js';
import { Icon, Avatar, StatTile, CalendarMonth, PageHeader, Tabs, useT } from './components.jsx';


const InstructorDashboard = ({ go }) => {
  const myCourses = SOIC_DATA.courses.filter(c => ['c1', 'c2'].includes(c.id));
  return (
    <div>
      <PageHeader title="Hello, Dr. Hossam" subtitle="2 courses, 180 students, next lecture in 14 hours."
        actions={<button className="btn btn-secondary"><Icon name="plus" size={14} /> Propose a course</button>} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <StatTile label="Active courses" value="2" icon="folder" tone="accent" />
        <StatTile label="Total students" value="180" delta="+12" icon="users" tone="success" />
        <StatTile label="Hours taught" value="148" icon="clock" tone="gold" />
        <StatTile label="Avg. rating" value="4.9" delta="+0.1" icon="star" tone="gold" />
      </div>

      {/* Up next live */}
      <div className="card frame-corners cinema-card" style={{ background: 'linear-gradient(135deg, #1a2562, #0d1233)', padding: 28, marginBottom: 24 }}>
        <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div className="row" style={{ gap: 10, marginBottom: 10 }}>
              <span className="badge badge-gold">YOUR NEXT LECTURE</span>
              <span className="badge badge-muted">Filmmaking Diploma</span>
            </div>
            <h2 className="h1" style={{ fontSize: 32 }}>Camera Movement & Blocking</h2>
            <div className="muted" style={{ marginTop: 6 }}>Tomorrow · Dec 8 · 19:00 — 20:30</div>
            <div className="row" style={{ gap: 16, marginTop: 18, fontSize: 13 }}>
              <span className="row" style={{ gap: 6 }}><Icon name="users" size={14} /> 42 students enrolled</span>
              <span className="row" style={{ gap: 6 }}><Icon name="bell" size={14} /> Reminder email scheduled 18:45</span>
              <span className="row" style={{ gap: 6 }}><Icon name="upload" size={14} /> 0 materials uploaded</span>
            </div>
            <div className="row" style={{ gap: 10, marginTop: 24 }}>
              <button className="btn btn-primary btn-lg" onClick={() => go('live-instructor')}><Icon name="video" size={15} /> Start lecture now</button>
              <button className="btn btn-secondary">Upload materials</button>
              <button className="btn btn-ghost">Reschedule</button>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="display" style={{ fontSize: 12, color: 'var(--gold)' }}>STARTS IN</div>
            <div className="display" style={{ fontSize: 64, lineHeight: 1, marginTop: 4 }}>14<span style={{ color: 'var(--text-dim)' }}>:</span>32</div>
            <div className="muted mono" style={{ fontSize: 11 }}>HRS : MIN</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20 }}>
        <div>
          <h3 className="h3" style={{ marginBottom: 14 }}>Your courses</h3>
          <div className="col" style={{ gap: 12 }}>
            {myCourses.map(c => (
              <div key={c.id} className="card" style={{ padding: 0, overflow: 'hidden', display: 'grid', gridTemplateColumns: '120px 1fr', gap: 0 }}>
                <div className="ph-img" style={{ borderRadius: 0, background: `repeating-linear-gradient(135deg, rgba(255,255,255,0.04) 0 12px, rgba(255,255,255,0.06) 12px 24px), linear-gradient(135deg, ${c.tint}66, ${c.tint}22)` }}>
                  <span style={{ fontFamily: 'Anton', fontSize: 10, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.6)' }}>{c.category}</span>
                </div>
                <div style={{ padding: 18 }}>
                  <div className="row" style={{ justifyContent: 'space-between' }}>
                    <h4 className="h4">{c.title}</h4>
                    <span className={`badge ${c.status === 'live' ? 'badge-success' : 'badge-warning'}`}>{c.status === 'live' ? 'In Progress' : 'Upcoming'}</span>
                  </div>
                  <div className="row" style={{ gap: 20, marginTop: 10, fontSize: 12, color: 'var(--text-muted)' }}>
                    <span><strong style={{ color: 'var(--text)' }}>{c.enrolled}</strong> students</span>
                    <span><strong style={{ color: 'var(--text)' }}>{c.lectures}</strong> lectures</span>
                    <span><strong style={{ color: 'var(--text)' }}>{c.rating}</strong> ★</span>
                    <span>Revenue: <strong style={{ color: 'var(--text)' }}>{fmtEGP(c.enrolled * c.price * 0.6)}</strong></span>
                  </div>
                  <div className="row" style={{ gap: 8, marginTop: 14 }}>
                    <button className="btn btn-secondary btn-sm">Manage</button>
                    <button className="btn btn-ghost btn-sm">View public page</button>
                    <button className="btn btn-ghost btn-sm">Analytics</button>
                  </div>
                </div>
              </div>
            ))}
            <div className="card flat" style={{ padding: 24, textAlign: 'center', borderStyle: 'dashed' }}>
              <Icon name="plus" size={18} />
              <div style={{ marginTop: 8, fontWeight: 600 }}>Propose a new course</div>
              <div className="muted" style={{ fontSize: 12, marginTop: 4 }}>Send to admin for review and approval.</div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="h3" style={{ marginBottom: 14 }}>This week</h3>
          <div className="card" style={{ padding: 0 }}>
            {SOIC_DATA.schedule.filter(s => ['c1'].includes(s.courseId)).map((s, i, arr) => {
              const c = SOIC_DATA.courses.find(x => x.id === s.courseId);
              return (
                <div key={s.id} style={{ padding: 14, borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none', display: 'grid', gridTemplateColumns: '44px 1fr', gap: 12 }}>
                  <div style={{ background: c.tint + '22', color: c.tint, borderRadius: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4px 0' }}>
                    <div style={{ fontSize: 9 }}>{new Date(s.date).toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}</div>
                    <div className="display" style={{ fontSize: 16 }}>{s.date.split('-')[2]}</div>
                  </div>
                  <div>
                    <h5 style={{ fontSize: 13, fontWeight: 600 }}>{s.title}</h5>
                    <div className="muted mono" style={{ fontSize: 11, marginTop: 2 }}>{s.time} · 90 min</div>
                  </div>
                </div>
              );
            })}
          </div>
          <h3 className="h3" style={{ marginTop: 24, marginBottom: 14 }}>Student questions</h3>
          <div className="col" style={{ gap: 10 }}>
            {[
              { name: 'Ahmed Farouk', q: 'Can you go over framing in next lecture?', time: '2h ago' },
              { name: 'Salma Ahmed', q: 'Where can I download the storyboard template?', time: '6h ago' },
              { name: 'Reem Magdy', q: 'Will lecture 4 be re-recorded?', time: '1d ago' },
            ].map((m, i) => (
              <div key={i} className="card flat" style={{ padding: 14 }}>
                <div className="row" style={{ gap: 10, alignItems: 'flex-start' }}>
                  <Avatar name={m.name} size="sm" />
                  <div className="grow">
                    <div className="row" style={{ justifyContent: 'space-between' }}>
                      <strong style={{ fontSize: 13 }}>{m.name}</strong>
                      <span className="dim" style={{ fontSize: 11 }}>{m.time}</span>
                    </div>
                    <div className="muted" style={{ fontSize: 13, marginTop: 4 }}>{m.q}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const InstructorCalendar = ({ go }) => {
  return (
    <div>
      <PageHeader title="Teaching schedule" subtitle="You'll be emailed 15 minutes before each lecture goes live."
        actions={<button className="btn btn-secondary"><Icon name="plus" size={14} /> Block off time</button>} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 20 }}>
        <CalendarMonth events={SOIC_DATA.schedule.filter(s => ['c1','c2'].includes(s.courseId))} year={2025} month={11} onEventClick={() => go('live-instructor')} />
        <div className="col" style={{ gap: 14 }}>
          <div className="card frame-corners cinema-card" style={{ background: 'linear-gradient(135deg, #1a2562, #0d1233)' }}>
            <div className="display" style={{ fontSize: 11, color: 'var(--gold)', letterSpacing: '0.2em' }}>READY TO GO LIVE</div>
            <h4 className="h4" style={{ marginTop: 6 }}>Camera Movement & Blocking</h4>
            <div className="muted mono" style={{ fontSize: 12, marginTop: 4 }}>Tomorrow · 19:00</div>
            <button className="btn btn-primary btn-sm" style={{ width: '100%', marginTop: 14 }} onClick={() => go('live-instructor')}><Icon name="video" size={13} /> Start lecture</button>
          </div>
          <div className="card flat">
            <h4 className="h4" style={{ marginBottom: 10 }}>Pre-flight checklist</h4>
            <div className="col" style={{ gap: 8 }}>
              {[
                { t: 'Microphone tested', done: true },
                { t: 'Webcam tested', done: true },
                { t: 'Slides uploaded', done: false },
                { t: 'Sample footage queued', done: false },
              ].map((i, n) => (
                <div key={n} className="row" style={{ gap: 8, fontSize: 13 }}>
                  <div style={{ width: 16, height: 16, borderRadius: 50, background: i.done ? 'var(--success)' : 'var(--surface-3)', border: '1px solid ' + (i.done ? 'var(--success)' : 'var(--border-strong)'), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {i.done && <Icon name="check" size={10} />}
                  </div>
                  <span className={i.done ? 'muted' : ''} style={{ textDecoration: i.done ? 'line-through' : 'none' }}>{i.t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InstructorCourses = ({ go }) => {
  return (
    <div>
      <PageHeader title="My courses" subtitle="Manage content, students, and assignments."
        actions={<button className="btn btn-primary"><Icon name="plus" size={14} /> Propose new course</button>} />

      <Tabs tabs={[{id:'live', label:'Live', count: 1}, {id:'upcoming', label:'Upcoming', count: 1}, {id:'drafts', label:'Drafts', count: 0}, {id:'archived', label:'Archived', count: 3}]} active="live" onChange={() => {}} />

      {SOIC_DATA.courses.filter(c => ['c1','c2'].includes(c.id)).map(c => (
        <div key={c.id} className="card" style={{ marginBottom: 16, padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: 22, display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 20, alignItems: 'center' }}>
            <div className="ph-img" style={{ width: 140, height: 90, background: `linear-gradient(135deg, ${c.tint}55, ${c.tint}11)` }}>
              <span style={{ fontFamily: 'Anton', fontSize: 11, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.5)' }}>{c.cover.split(' · ')[0]}</span>
            </div>
            <div>
              <div className="row" style={{ gap: 8, marginBottom: 6 }}>
                <span className={`badge ${c.status === 'live' ? 'badge-success' : 'badge-warning'}`}>{c.status}</span>
                <span className="badge badge-muted">{c.category}</span>
              </div>
              <h3 className="h3">{c.title}</h3>
              <div className="row" style={{ gap: 20, marginTop: 10, fontSize: 13, color: 'var(--text-muted)' }}>
                <span>{c.enrolled} students</span>
                <span>{c.lectures} lectures</span>
                <span>Starts {fmtShortDate(c.startDate)}</span>
                <span>{c.rating} ★</span>
              </div>
            </div>
            <div className="row" style={{ gap: 8 }}>
              <button className="btn btn-secondary">Manage content</button>
              <button className="btn btn-ghost">⋯</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};


export { InstructorDashboard, InstructorCalendar, InstructorCourses };
