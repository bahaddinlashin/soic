// Admin screens
import React, { useState as useStateS } from 'react';
import { SOIC_DATA, fmtEGP, fmtDate, fmtShortDate, initials } from './data.js';
import { Icon, Avatar, StatTile, MiniChart, PageHeader, Tabs, useT, useToast } from './components.jsx';


const AdminDashboard = ({ go }) => {
  const a = SOIC_DATA.analytics;
  const growth = ((a.revenue30d - a.revenuePrev) / a.revenuePrev * 100).toFixed(1);
  return (
    <div>
      <PageHeader title="Admin overview" subtitle="SOIC platform · December 2025"
        actions={
          <>
            <button className="btn btn-secondary"><Icon name="download" size={14} /> Export</button>
            <button className="btn btn-primary"><Icon name="plus" size={14} /> New course</button>
          </>
        } />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <StatTile label="Revenue · 30d" value={fmtEGP(a.revenue30d).replace('EGP ', '£E ')} delta={'+' + growth + '%'} icon="money" tone="gold" />
        <StatTile label="New students" value={a.newStudents} delta="+9" icon="user" tone="accent" />
        <StatTile label="Active courses" value={a.activeCourses} icon="folder" tone="success" />
        <StatTile label="Completion rate" value={a.completionRate + '%'} delta="+4%" icon="check" tone="success" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
        <div className="card">
          <div className="row" style={{ justifyContent: 'space-between', marginBottom: 18 }}>
            <div>
              <h3 className="h3">Revenue · last 14 days</h3>
              <div className="display" style={{ fontSize: 40, marginTop: 6 }}>{fmtEGP(a.revenue30d).replace('EGP ', '£E ')}</div>
            </div>
            <div className="row" style={{ gap: 6 }}>
              <button className="btn btn-secondary btn-sm">14D</button>
              <button className="btn btn-ghost btn-sm">30D</button>
              <button className="btn btn-ghost btn-sm">90D</button>
            </div>
          </div>
          <MiniChart data={a.revenueChart} height={140} color="var(--gold)" />
          <div className="row" style={{ gap: 28, marginTop: 14, fontSize: 12, color: 'var(--text-muted)' }}>
            <div className="row" style={{ gap: 6 }}><span style={{ width: 10, height: 10, background: 'var(--gold)', borderRadius: 2 }}></span>Course sales</div>
            <div className="row" style={{ gap: 6 }}><span style={{ width: 10, height: 10, background: 'var(--accent-bright)', borderRadius: 2 }}></span>Top-ups</div>
          </div>
        </div>

        <div className="card">
          <h3 className="h3" style={{ marginBottom: 14 }}>Needs your attention</h3>
          <div className="col" style={{ gap: 10 }}>
            <div className="card flat" style={{ padding: 14, display: 'flex', gap: 12, cursor: 'pointer' }} onClick={() => go('payments')}>
              <div style={{ width: 38, height: 38, borderRadius: 8, background: 'var(--gold-soft)', color: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="receipt" size={18} /></div>
              <div className="grow">
                <div style={{ fontWeight: 600, fontSize: 14 }}>2 InstaPay receipts pending</div>
                <div className="muted" style={{ fontSize: 12 }}>EGP 22,400 · Awaiting approval</div>
              </div>
              <Icon name="chevron" size={16} style={{ color: 'var(--text-dim)' }} />
            </div>
            <div className="card flat" style={{ padding: 14, display: 'flex', gap: 12, cursor: 'pointer' }} onClick={() => go('approvals')}>
              <div style={{ width: 38, height: 38, borderRadius: 8, background: 'var(--accent-soft)', color: 'var(--accent-bright)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="folder" size={18} /></div>
              <div className="grow">
                <div style={{ fontWeight: 600, fontSize: 14 }}>2 courses awaiting approval</div>
                <div className="muted" style={{ fontSize: 12 }}>Documentary, Color Grading</div>
              </div>
              <Icon name="chevron" size={16} style={{ color: 'var(--text-dim)' }} />
            </div>
            <div className="card flat" style={{ padding: 14, display: 'flex', gap: 12, cursor: 'pointer' }} onClick={() => go('users')}>
              <div style={{ width: 38, height: 38, borderRadius: 8, background: 'var(--gold-soft)', color: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="instructor" size={18} /></div>
              <div className="grow">
                <div style={{ fontWeight: 600, fontSize: 14 }}>1 instructor application</div>
                <div className="muted" style={{ fontSize: 12 }}>Nour El-Din · 2h ago</div>
              </div>
              <Icon name="chevron" size={16} style={{ color: 'var(--text-dim)' }} />
            </div>
            <div className="card flat" style={{ padding: 14, display: 'flex', gap: 12, cursor: 'pointer' }} onClick={() => go('payments')}>
              <div style={{ width: 38, height: 38, borderRadius: 8, background: 'var(--danger-soft)', color: 'var(--danger)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="refund" size={18} /></div>
              <div className="grow">
                <div style={{ fontWeight: 600, fontSize: 14 }}>1 refund request</div>
                <div className="muted" style={{ fontSize: 12 }}>Tarek Said · EGP 4,500</div>
              </div>
              <Icon name="chevron" size={16} style={{ color: 'var(--text-dim)' }} />
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="h3" style={{ marginBottom: 14 }}>Top courses by revenue</h3>
          <div className="col" style={{ gap: 12 }}>
            {SOIC_DATA.courses.filter(c => c.enrolled > 0).slice(0, 4).map((c, i) => {
              const rev = c.enrolled * c.price;
              const maxRev = 142 * 8400;
              return (
                <div key={c.id} className="row" style={{ gap: 12, alignItems: 'center' }}>
                  <div className="display" style={{ fontSize: 22, color: 'var(--text-dim)', width: 28 }}>{String(i+1).padStart(2, '0')}</div>
                  <div className="grow">
                    <div className="row" style={{ justifyContent: 'space-between', marginBottom: 4 }}>
                      <strong style={{ fontSize: 14 }}>{c.title}</strong>
                      <span className="mono" style={{ fontSize: 13 }}>{fmtEGP(rev)}</span>
                    </div>
                    <div style={{ height: 6, background: 'var(--surface-2)', borderRadius: 3 }}>
                      <div style={{ width: (rev/maxRev * 100) + '%', height: '100%', background: c.tint, borderRadius: 3 }}></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="card">
          <h3 className="h3" style={{ marginBottom: 14 }}>Enrollments · last 14 days</h3>
          <MiniChart data={a.enrollmentChart} height={120} color="var(--accent-bright)" />
          <div className="row" style={{ gap: 24, marginTop: 12 }}>
            <div><div className="display" style={{ fontSize: 26 }}>47</div><div className="muted" style={{ fontSize: 12 }}>Total enrollments</div></div>
            <div><div className="display" style={{ fontSize: 26 }}>73%</div><div className="muted" style={{ fontSize: 12 }}>Completion rate</div></div>
            <div><div className="display" style={{ fontSize: 26 }}>4.8</div><div className="muted" style={{ fontSize: 12 }}>Avg. rating</div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminCourses = ({ go }) => {
  const [tab, setTab] = useStateS('all');
  const tabs = [
    { id: 'all', label: 'All courses', count: SOIC_DATA.courses.length },
    { id: 'pending', label: 'Pending approval', count: 2 },
    { id: 'live', label: 'Live now', count: 2 },
    { id: 'reported', label: 'Reported', count: 0 },
  ];
  return (
    <div>
      <PageHeader title="Course management" subtitle="Approve, edit, assign instructors, feature on homepage"
        actions={<button className="btn btn-primary"><Icon name="plus" size={14} /> Create course</button>} />
      <Tabs tabs={tabs} active={tab} onChange={setTab} />

      {tab === 'pending' && (
        <div className="col" style={{ gap: 14 }}>
          {SOIC_DATA.pendingCourses.map(pc => (
            <div key={pc.id} className="card" style={{ padding: 22, display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 20, alignItems: 'center' }}>
              <div style={{ width: 64, height: 64, borderRadius: 12, background: 'var(--accent-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-bright)' }}><Icon name="film" size={26} /></div>
              <div>
                <div className="row" style={{ gap: 8, marginBottom: 6 }}>
                  <span className="badge badge-warning">Pending</span>
                  <span className="muted" style={{ fontSize: 12 }}>Submitted {pc.submitted}</span>
                </div>
                <h3 className="h3">{pc.title}</h3>
                <div className="row" style={{ gap: 20, marginTop: 8, fontSize: 13, color: 'var(--text-muted)' }}>
                  <span>by {pc.instructor}</span><span>{pc.lectures} lectures</span><span>{fmtEGP(pc.price)}</span>
                </div>
              </div>
              <div className="row" style={{ gap: 8 }}>
                <button className="btn btn-ghost">Preview</button>
                <button className="btn btn-secondary">Request changes</button>
                <button className="btn btn-primary"><Icon name="check" size={13} /> Approve</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {tab === 'all' && (
        <div className="card" style={{ padding: 0 }}>
          <table className="table">
            <thead><tr><th>Course</th><th>Instructor</th><th>Status</th><th>Students</th><th>Revenue</th><th>Featured</th><th></th></tr></thead>
            <tbody>
              {SOIC_DATA.courses.map(c => (
                <tr key={c.id} className="row-hover">
                  <td>
                    <div className="row" style={{ gap: 12 }}>
                      <div className="ph-img" style={{ width: 40, height: 40, borderRadius: 6, background: `linear-gradient(135deg, ${c.tint}66, ${c.tint}22)` }}></div>
                      <div>
                        <div style={{ fontWeight: 600 }}>{c.title}</div>
                        <div className="muted" style={{ fontSize: 12 }}>{c.category}</div>
                      </div>
                    </div>
                  </td>
                  <td>{c.instructor}</td>
                  <td><span className={`badge ${c.status === 'live' ? 'badge-success' : c.status === 'upcoming' ? 'badge-warning' : 'badge-muted'}`}>{c.status}</span></td>
                  <td className="mono">{c.enrolled}</td>
                  <td className="mono">{fmtEGP(c.enrolled * c.price)}</td>
                  <td>
                    <input type="checkbox" defaultChecked={['c1','c2','c3'].includes(c.id)} style={{ width: 16, height: 16, accentColor: 'var(--accent-bright)' }} />
                  </td>
                  <td><button className="btn btn-ghost btn-sm">⋯</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {tab === 'live' && (
        <div className="card" style={{ padding: 40, textAlign: 'center' }}>
          <Icon name="video" size={32} style={{ color: 'var(--success)' }} />
          <h3 className="h3" style={{ marginTop: 14 }}>2 live cohorts in session</h3>
          <div className="muted" style={{ marginTop: 6 }}>Filmmaking Diploma · Screenwriting Intensive</div>
        </div>
      )}
    </div>
  );
};

const AdminPayments = ({ go }) => {
  const [tab, setTab] = useStateS('pending');
  const { toast } = useToast();
  const [items, setItems] = useStateS(SOIC_DATA.payments);
  const filtered = items.filter(p => tab === 'all' || p.status === tab || (tab === 'refunds' && p.status === 'refund-requested'));
  const totals = {
    pending: items.filter(p => p.status === 'pending').reduce((s, p) => s + p.amount, 0),
    approved: items.filter(p => p.status === 'approved').reduce((s, p) => s + p.amount, 0),
    refunds: items.filter(p => p.status === 'refund-requested').reduce((s, p) => s + p.amount, 0),
  };
  return (
    <div>
      <PageHeader title="Payments & refunds" subtitle="Verify InstaPay receipts and handle refund requests" />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        <StatTile label="Pending approval" value={fmtEGP(totals.pending)} tone="gold" icon="clock" />
        <StatTile label="Approved · 30d" value={fmtEGP(184200)} delta="+29%" tone="success" icon="check" />
        <StatTile label="Refunds requested" value={fmtEGP(totals.refunds)} tone="danger" icon="refund" />
      </div>

      <Tabs tabs={[
        { id: 'pending', label: 'Pending', count: items.filter(p => p.status === 'pending').length },
        { id: 'approved', label: 'Approved', count: items.filter(p => p.status === 'approved').length },
        { id: 'refunds', label: 'Refunds', count: items.filter(p => p.status === 'refund-requested').length },
        { id: 'all', label: 'All', count: items.length },
      ]} active={tab} onChange={setTab} />

      <div className="card" style={{ padding: 0 }}>
        <table className="table">
          <thead>
            <tr><th>Student</th><th>Course</th><th>Method</th><th>Reference</th><th>Date</th><th style={{ textAlign: 'right' }}>Amount</th><th>Status</th><th></th></tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id} className="row-hover">
                <td>
                  <div className="row" style={{ gap: 10 }}>
                    <Avatar name={p.user} size="sm" />
                    <div>
                      <div style={{ fontWeight: 600 }}>{p.user}</div>
                      <div className="muted" style={{ fontSize: 12 }}>{p.userId}</div>
                    </div>
                  </div>
                </td>
                <td>{p.course}</td>
                <td><span className="badge badge-muted">{p.method}</span></td>
                <td className="mono dim" style={{ fontSize: 12 }}>{p.ref}</td>
                <td className="muted">{fmtShortDate(p.date)}</td>
                <td className="mono" style={{ textAlign: 'right', fontWeight: 700 }}>{fmtEGP(p.amount)}</td>
                <td>
                  <span className={`badge ${p.status === 'approved' ? 'badge-success' : p.status === 'pending' ? 'badge-warning' : 'badge-danger'}`}>
                    {p.status.replace('-', ' ')}
                  </span>
                </td>
                <td>
                  {p.status === 'pending' && (
                    <div className="row" style={{ gap: 4 }}>
                      <button className="btn btn-primary btn-sm" onClick={() => {
                        setItems(items.map(x => x.id === p.id ? { ...x, status: 'approved' } : x));
                        toast('Payment approved · ' + p.user, 'success');
                      }}><Icon name="check" size={12} /></button>
                      <button className="btn btn-secondary btn-sm"><Icon name="x" size={12} /></button>
                      <button className="btn btn-ghost btn-sm"><Icon name="eye" size={12} /></button>
                    </div>
                  )}
                  {p.status === 'refund-requested' && (
                    <div className="row" style={{ gap: 4 }}>
                      <button className="btn btn-danger btn-sm" onClick={() => {
                        setItems(items.map(x => x.id === p.id ? { ...x, status: 'approved' } : x));
                        toast('Refund processed · ' + p.user, 'success');
                      }}>Refund</button>
                      <button className="btn btn-ghost btn-sm">Decline</button>
                    </div>
                  )}
                  {p.status === 'approved' && <button className="btn btn-ghost btn-sm">⋯</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const AdminUsers = ({ go }) => {
  const [tab, setTab] = useStateS('all');
  const users = SOIC_DATA.users.filter(u => tab === 'all' || u.role === tab || (tab === 'pending' && u.status === 'pending-approval'));
  return (
    <div>
      <PageHeader title="Users" subtitle="Manage students, instructors, and admins"
        actions={<button className="btn btn-primary"><Icon name="plus" size={14} /> Invite user</button>} />
      <Tabs tabs={[
        { id: 'all', label: 'All', count: SOIC_DATA.users.length },
        { id: 'student', label: 'Students', count: SOIC_DATA.users.filter(u => u.role === 'student').length },
        { id: 'instructor', label: 'Instructors', count: SOIC_DATA.users.filter(u => u.role === 'instructor').length },
        { id: 'admin', label: 'Admins', count: SOIC_DATA.users.filter(u => u.role === 'admin').length },
        { id: 'pending', label: 'Pending approval', count: SOIC_DATA.users.filter(u => u.status === 'pending-approval').length },
      ]} active={tab} onChange={setTab} />

      <div className="card" style={{ padding: 0 }}>
        <table className="table">
          <thead>
            <tr><th>User</th><th>Role</th><th>Status</th><th>Joined</th><th>Activity</th><th></th></tr>
          </thead>
          <tbody>
            {users.map(u => (
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
                <td>
                  {u.role === 'admin' ? (
                    <span className="badge badge-gold">{u.adminRole || 'Admin'}</span>
                  ) : (
                    <span className={`badge ${u.role === 'instructor' ? 'badge-accent' : 'badge-muted'}`}>{u.role}</span>
                  )}
                </td>
                <td>
                  <span className={`badge ${u.status === 'active' ? 'badge-success' : u.status === 'pending-approval' ? 'badge-warning' : 'badge-muted'}`}>
                    {u.status.replace('-', ' ')}
                  </span>
                </td>
                <td className="muted">{fmtShortDate(u.joined)}</td>
                <td className="muted" style={{ fontSize: 13 }}>
                  {u.role === 'student' ? `${u.enrolled} course${u.enrolled === 1 ? '' : 's'}` : u.role === 'instructor' ? `${(u.courses||[]).length} courses` : 'Admin'}
                </td>
                <td>
                  {u.status === 'pending-approval' ? (
                    <div className="row" style={{ gap: 4 }}>
                      <button className="btn btn-primary btn-sm"><Icon name="check" size={12} /> Approve</button>
                      <button className="btn btn-secondary btn-sm">Reject</button>
                    </div>
                  ) : (
                    <button className="btn btn-ghost btn-sm">⋯</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const AdminRoles = ({ go }) => {
  const [editing, setEditing] = useStateS(null);
  const perms = ['Courses', 'Payments', 'Users', 'Content', 'Refunds', 'Analytics'];
  const permLevels = [
    { id: 'none', label: 'None', color: 'var(--text-dim)' },
    { id: 'read', label: 'Read', color: 'var(--text-muted)' },
    { id: 'edit', label: 'Edit', color: 'var(--accent-bright)' },
    { id: 'full', label: 'Full', color: 'var(--gold)' },
  ];
  return (
    <div>
      <PageHeader title="Roles & permissions" subtitle="Super Admin can create roles. Other admins inherit only what their role allows."
        actions={<button className="btn btn-primary"><Icon name="plus" size={14} /> Create role</button>} />

      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 20 }}>
        <div className="col" style={{ gap: 10 }}>
          {SOIC_DATA.adminRoles.map(r => (
            <div key={r.id} className="card" style={{
              padding: 18, cursor: 'pointer',
              borderColor: editing === r.id ? 'var(--accent-bright)' : 'var(--border)',
              background: editing === r.id ? 'var(--accent-soft)' : 'var(--surface)',
            }} onClick={() => setEditing(r.id)}>
              <div className="row" style={{ justifyContent: 'space-between', marginBottom: 6 }}>
                <div className="row" style={{ gap: 10 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 50, background: r.color === 'gold' ? 'var(--gold)' : r.color === 'accent' ? 'var(--accent-bright)' : r.color === 'success' ? 'var(--success)' : 'var(--text-dim)' }}></div>
                  <strong style={{ fontSize: 15 }}>{r.name}</strong>
                </div>
                <span className="muted mono" style={{ fontSize: 12 }}>{r.members}</span>
              </div>
              <div className="row" style={{ gap: 6, flexWrap: 'wrap', marginTop: 8 }}>
                {Object.entries(r.permissions).filter(([,v]) => v !== 'none').slice(0,3).map(([k]) => (
                  <span key={k} className="badge badge-muted" style={{ fontSize: 10 }}>{k}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {editing && (() => {
          const role = SOIC_DATA.adminRoles.find(r => r.id === editing);
          return (
            <div className="card">
              <div className="row" style={{ justifyContent: 'space-between', marginBottom: 20 }}>
                <div>
                  <h3 className="h2">{role.name}</h3>
                  <div className="muted" style={{ marginTop: 4 }}>{role.members} member{role.members === 1 ? '' : 's'}</div>
                </div>
                <div className="row" style={{ gap: 8 }}>
                  <button className="btn btn-secondary">Duplicate</button>
                  <button className="btn btn-secondary">Rename</button>
                </div>
              </div>

              <div className="card flat" style={{ padding: 16, marginBottom: 20 }}>
                <h4 className="h4" style={{ marginBottom: 12 }}>Members</h4>
                <div className="row" style={{ gap: 8, flexWrap: 'wrap' }}>
                  {SOIC_DATA.users.filter(u => u.adminRole === role.name).map(u => (
                    <div key={u.id} className="row" style={{ gap: 8, padding: '4px 12px 4px 4px', background: 'var(--surface-3)', borderRadius: 100 }}>
                      <Avatar name={u.name} size="sm" />
                      <span style={{ fontSize: 13 }}>{u.name}</span>
                    </div>
                  ))}
                  <button className="btn btn-ghost btn-sm" style={{ borderRadius: 100, border: '1px dashed var(--border-strong)' }}><Icon name="plus" size={12} /> Add member</button>
                </div>
              </div>

              <h4 className="h4" style={{ marginBottom: 12 }}>Permissions</h4>
              <div className="col" style={{ gap: 8 }}>
                {perms.map(p => {
                  const key = p.toLowerCase();
                  const current = role.permissions[key];
                  return (
                    <div key={p} className="card flat" style={{ padding: '12px 16px' }}>
                      <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 14 }}>{p}</div>
                          <div className="muted" style={{ fontSize: 12, marginTop: 2 }}>
                            {p === 'Payments' && 'Approve InstaPay, view receipts, process refunds'}
                            {p === 'Courses' && 'Create, approve, edit, archive courses'}
                            {p === 'Users' && 'View users, change roles, block/unblock'}
                            {p === 'Content' && 'Homepage blocks, banners, featured items'}
                            {p === 'Refunds' && 'Approve and process refunds'}
                            {p === 'Analytics' && 'View reports and export data'}
                          </div>
                        </div>
                        <div className="row" style={{ gap: 4, background: 'var(--surface-3)', padding: 3, borderRadius: 8 }}>
                          {permLevels.map(lv => (
                            <button key={lv.id} className="btn btn-sm" style={{
                              padding: '4px 12px', fontSize: 12, fontWeight: 600,
                              background: current === lv.id ? 'var(--accent)' : 'transparent',
                              color: current === lv.id ? '#fff' : lv.color,
                            }}>{lv.label}</button>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="row" style={{ justifyContent: 'flex-end', gap: 10, marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
                <button className="btn btn-ghost">Cancel</button>
                <button className="btn btn-primary">Save role</button>
              </div>
            </div>
          );
        })()}

        {!editing && (
          <div className="card" style={{ padding: 56, textAlign: 'center' }}>
            <Icon name="shield" size={32} style={{ color: 'var(--text-dim)' }} />
            <h3 className="h3" style={{ marginTop: 16 }}>Pick a role to edit</h3>
            <div className="muted" style={{ marginTop: 6 }}>Or create a new one — for example, "Refunds-only Manager" or "Read-only auditor".</div>
          </div>
        )}
      </div>
    </div>
  );
};

const AdminContent = ({ go }) => {
  const blocks = [
    { id: 'b1', name: 'Hero — "Learn cinema from people who actually make it"', kind: 'Hero', visible: true },
    { id: 'b2', name: 'Categories strip — 9 disciplines', kind: 'Strip', visible: true },
    { id: 'b3', name: 'Featured cohorts — 3 cards', kind: 'Course grid', visible: true },
    { id: 'b4', name: 'How it works — 4 steps', kind: 'Steps', visible: true },
    { id: 'b5', name: 'Mohamed (Yemen) testimonial', kind: 'Testimonial', visible: true },
    { id: 'b6', name: 'Underwater workshop teaser', kind: 'Promo banner', visible: false },
  ];
  return (
    <div>
      <PageHeader title="Homepage content" subtitle="Drag to reorder. Toggle visibility. Edit copy in place."
        actions={
          <>
            <button className="btn btn-secondary"><Icon name="eye" size={14} /> Preview site</button>
            <button className="btn btn-primary">Publish changes</button>
          </>
        } />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>
        <div className="col" style={{ gap: 10 }}>
          {blocks.map(b => (
            <div key={b.id} className="card" style={{ padding: 16, display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 16, alignItems: 'center' }}>
              <div style={{ color: 'var(--text-dim)', cursor: 'grab' }}>⋮⋮</div>
              <div>
                <div className="row" style={{ gap: 8, marginBottom: 4 }}>
                  <span className="badge badge-muted">{b.kind}</span>
                  {!b.visible && <span className="badge badge-warning">Hidden</span>}
                </div>
                <div style={{ fontWeight: 600 }}>{b.name}</div>
              </div>
              <div className="row" style={{ gap: 8 }}>
                <button className="btn btn-ghost btn-sm"><Icon name="eye" size={13} /></button>
                <button className="btn btn-ghost btn-sm">Edit</button>
                <button className="btn btn-ghost btn-sm"><Icon name="block" size={13} /></button>
              </div>
            </div>
          ))}
          <button className="btn btn-secondary" style={{ padding: 20, justifyContent: 'center', borderStyle: 'dashed' }}>
            <Icon name="plus" size={14} /> Add new homepage block
          </button>
        </div>
        <div>
          <div className="card flat">
            <h4 className="h4" style={{ marginBottom: 12 }}>Block library</h4>
            <div className="col" style={{ gap: 8, fontSize: 13 }}>
              {['Hero with image', 'Course carousel', 'Stat counters', 'Instructor spotlight', 'FAQ accordion', 'Newsletter signup'].map(b => (
                <div key={b} className="row" style={{ padding: '10px 12px', background: 'var(--surface-3)', borderRadius: 6, cursor: 'pointer', justifyContent: 'space-between' }}>
                  <span>{b}</span><Icon name="plus" size={13} style={{ color: 'var(--text-dim)' }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export { AdminDashboard, AdminCourses, AdminPayments, AdminUsers, AdminRoles, AdminContent };
