// Live lecture screens
import React, { useState as useStateS, useEffect as useEffectS } from 'react';
import { SOIC_DATA, fmtEGP, fmtDate, fmtShortDate, initials } from './data.js';
import { Icon, Avatar, Modal, useToast, useT } from './components.jsx';


const LiveStudent = ({ go }) => {
  const [chat, setChat] = useStateS(SOIC_DATA.liveChat);
  const [draft, setDraft] = useStateS('');
  const [notes, setNotes] = useStateS([
    { id: 'n1', timestamp: '00:08:42', text: 'Blocking always serves the story, never the other way around.' },
    { id: 'n2', timestamp: '00:14:20', text: 'Match cut on motion — direction must continue across cuts.' },
  ]);
  const [noteDraft, setNoteDraft] = useStateS('');
  const [muted, setMuted] = useStateS(true);
  const [video, setVideo] = useStateS(false);
  const [handRaised, setHandRaised] = useStateS(false);
  const [showChat, setShowChat] = useStateS(true);
  const [showNotes, setShowNotes] = useStateS(true);
  const [elapsed, setElapsed] = useStateS(872);
  const { toast } = useToast();

  useEffectS(() => {
    const t = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const fmtTime = (s) => `${String(Math.floor(s/3600)).padStart(2,'0')}:${String(Math.floor(s%3600/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;
  const currentTimestamp = fmtTime(elapsed);

  const send = () => {
    if (!draft.trim()) return;
    setChat([...chat, { id: Date.now(), user: 'Layla Khalid (you)', message: draft, time: '19:20' }]);
    setDraft('');
  };

  const addNote = () => {
    if (!noteDraft.trim()) return;
    setNotes([...notes, { id: Date.now(), timestamp: currentTimestamp, text: noteDraft }]);
    setNoteDraft('');
    toast('Saved at ' + currentTimestamp, 'success');
  };

  return (
    <div style={{ background: '#05070f', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top bar */}
      <div style={{ padding: '14px 24px', borderBottom: '1px solid #1a1f3a', background: '#0a0d1c', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div className="row" style={{ gap: 16 }}>
          <button className="btn btn-ghost btn-sm" onClick={() => go('dashboard')}>← Leave</button>
          <div className="row" style={{ gap: 10 }}>
            <span className="live-dot"></span>
            <span className="display" style={{ fontSize: 11, color: 'var(--danger)', letterSpacing: '0.2em' }}>LIVE</span>
            <span className="mono" style={{ fontSize: 12, color: 'var(--text-muted)' }}>{currentTimestamp}</span>
          </div>
          <div style={{ width: 1, height: 18, background: 'var(--border)' }}></div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Camera Movement & Blocking</div>
            <div className="muted" style={{ fontSize: 11 }}>Filmmaking Diploma · Dr. Hossam Dagher</div>
          </div>
        </div>
        <div className="row" style={{ gap: 8 }}>
          <button className="btn btn-secondary btn-sm" onClick={() => setShowNotes(!showNotes)}><Icon name="note" size={13} /> Notes</button>
          <button className="btn btn-secondary btn-sm" onClick={() => setShowChat(!showChat)}><Icon name="chat" size={13} /> Chat ({chat.length})</button>
          <button className="btn btn-secondary btn-sm"><Icon name="users" size={13} /> 43</button>
        </div>
      </div>

      {/* Main */}
      <div style={{ display: 'grid', gridTemplateColumns: `1fr ${showNotes ? '340px' : '0px'} ${showChat ? '320px' : '0px'}`, flex: 1, overflow: 'hidden' }}>
        {/* Stage */}
        <div style={{ padding: 16, overflow: 'auto' }}>
          {/* Main video (instructor + screen share) */}
          <div style={{ background: '#000', borderRadius: 12, overflow: 'hidden', position: 'relative', aspectRatio: '16/9' }}>
            {/* Screen share placeholder */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #0d1429, #1a2540)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 14 }}>
              <Icon name="screen" size={48} style={{ color: 'rgba(255,255,255,0.3)' }} />
              <div className="display" style={{ fontSize: 16, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em' }}>SLIDE 12 / 28 · BLOCKING DIAGRAMS</div>
              <div style={{ fontFamily: 'JetBrains Mono', fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>HOSSAM IS SHARING THEIR SCREEN</div>
            </div>
            {/* Instructor PiP */}
            <div style={{ position: 'absolute', bottom: 16, right: 16, width: 200, aspectRatio: '16/9', background: 'linear-gradient(135deg, #2d4ee0, #1a2570)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--gold)' }}>
              <Avatar name="Hossam Dagher" size="lg" tint="#fff" />
              <div style={{ position: 'absolute', bottom: 6, left: 8, fontSize: 11, fontWeight: 600, color: '#fff' }}>Hossam Dagher · Host</div>
            </div>
            {/* Live time top-left */}
            <div style={{ position: 'absolute', top: 12, left: 12, gap: 8 }} className="row">
              <span className="live-dot"></span>
              <span style={{ fontSize: 11, color: '#fff', fontWeight: 700, letterSpacing: '0.15em' }}>LIVE · 14:32</span>
            </div>
          </div>

          {/* Bottom controls */}
          <div className="row" style={{ justifyContent: 'center', gap: 8, marginTop: 18, padding: 10, background: 'var(--surface)', borderRadius: 100, border: '1px solid var(--border)', maxWidth: 'max-content', margin: '18px auto 0' }}>
            <button className="btn" style={{ width: 48, height: 48, borderRadius: 50, background: muted ? 'var(--danger)' : 'var(--surface-3)' }} onClick={() => setMuted(!muted)}>
              <Icon name={muted ? 'micOff' : 'mic'} size={18} />
            </button>
            <button className="btn" style={{ width: 48, height: 48, borderRadius: 50, background: video ? 'var(--surface-3)' : 'var(--danger)' }} onClick={() => setVideo(!video)}>
              <Icon name={video ? 'video' : 'videoOff'} size={18} />
            </button>
            <button className="btn" style={{ width: 48, height: 48, borderRadius: 50, background: handRaised ? 'var(--gold)' : 'var(--surface-3)', color: handRaised ? '#1a1408' : 'var(--text)' }} onClick={() => { setHandRaised(!handRaised); if (!handRaised) toast('Hand raised — instructor notified', 'success'); }}>
              <Icon name="hand" size={18} />
            </button>
            <div style={{ width: 1, alignSelf: 'stretch', background: 'var(--border)' }}></div>
            <button className="btn btn-danger" style={{ borderRadius: 24 }} onClick={() => go('dashboard')}>Leave class</button>
          </div>

          {/* Status line */}
          <div className="row" style={{ justifyContent: 'space-between', maxWidth: 'max-content', margin: '12px auto 0', fontSize: 12, color: 'var(--text-muted)' }}>
            <span>{muted ? 'You are muted' : 'You are unmuted'} · Hand {handRaised ? 'raised ✋' : 'down'}</span>
          </div>
        </div>

        {/* Notes panel */}
        {showNotes && (
          <div style={{ background: 'var(--surface)', borderLeft: '1px solid var(--border)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border)' }}>
              <div className="row" style={{ justifyContent: 'space-between' }}>
                <h4 className="h4">Live notes</h4>
                <span className="badge badge-gold mono">{currentTimestamp}</span>
              </div>
              <div className="muted" style={{ fontSize: 12, marginTop: 4 }}>Notes are timestamped — jump back in the recording.</div>
            </div>
            <div style={{ flex: 1, padding: 14, overflowY: 'auto' }}>
              <div className="col" style={{ gap: 10 }}>
                {notes.map(n => (
                  <div key={n.id} className="card flat" style={{ padding: 12 }}>
                    <div className="row" style={{ justifyContent: 'space-between', marginBottom: 6 }}>
                      <span className="badge badge-gold mono">{n.timestamp}</span>
                    </div>
                    <div style={{ fontSize: 13, lineHeight: 1.5 }}>{n.text}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ padding: 14, borderTop: '1px solid var(--border)' }}>
              <textarea className="textarea" placeholder={`Note at ${currentTimestamp}…`} value={noteDraft} onChange={e => setNoteDraft(e.target.value)} rows={3} style={{ resize: 'none', marginBottom: 8 }} />
              <button className="btn btn-primary btn-sm" style={{ width: '100%' }} onClick={addNote} disabled={!noteDraft.trim()}>Save note</button>
            </div>
          </div>
        )}

        {/* Chat panel */}
        {showChat && (
          <div style={{ background: 'var(--surface)', borderLeft: '1px solid var(--border)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border)' }}>
              <h4 className="h4">Class chat</h4>
              <div className="muted" style={{ fontSize: 12, marginTop: 4 }}>43 students · 1 instructor</div>
            </div>
            <div style={{ flex: 1, padding: 14, overflowY: 'auto' }}>
              <div className="col" style={{ gap: 14 }}>
                {chat.map(m => (
                  <div key={m.id}>
                    <div className="row" style={{ justifyContent: 'space-between', marginBottom: 2 }}>
                      <strong style={{ fontSize: 12, color: 'var(--accent-bright)' }}>{m.user}</strong>
                      <span className="dim mono" style={{ fontSize: 10 }}>{m.time}</span>
                    </div>
                    <div style={{ fontSize: 13, lineHeight: 1.45 }}>{m.message}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ padding: 14, borderTop: '1px solid var(--border)', display: 'flex', gap: 8 }}>
              <input className="input" placeholder="Send a message…" value={draft} onChange={e => setDraft(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} />
              <button className="btn btn-primary btn-sm" onClick={send}>Send</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const LiveInstructor = ({ go }) => {
  const [participants, setParticipants] = useStateS(SOIC_DATA.liveParticipants);
  const [chat, setChat] = useStateS(SOIC_DATA.liveChat);
  const [draft, setDraft] = useStateS('');
  const [recording, setRecording] = useStateS(true);
  const [screenSharing, setScreenSharing] = useStateS(true);
  const [muted, setMuted] = useStateS(false);
  const [video, setVideo] = useStateS(true);
  const [showChat, setShowChat] = useStateS(true);
  const [elapsed, setElapsed] = useStateS(872);
  const [confirmEnd, setConfirmEnd] = useStateS(false);
  const { toast } = useToast();

  useEffectS(() => {
    const t = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const fmtTime = (s) => `${String(Math.floor(s/3600)).padStart(2,'0')}:${String(Math.floor(s%3600/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;
  const handsUp = participants.filter(p => p.isHandRaised).length;

  const muteOne = (id) => {
    setParticipants(participants.map(p => p.id === id ? { ...p, isMuted: !p.isMuted } : p));
    toast('Updated', 'success');
  };
  const removeOne = (id) => {
    const p = participants.find(x => x.id === id);
    setParticipants(participants.filter(x => x.id !== id));
    toast(`${p.name} removed from class`, 'error');
  };
  const muteAll = () => {
    setParticipants(participants.map(p => ({ ...p, isMuted: true })));
    toast('All students muted', 'success');
  };
  const send = () => {
    if (!draft.trim()) return;
    setChat([...chat, { id: Date.now(), user: 'Hossam Dagher (host)', message: draft, time: '19:20' }]);
    setDraft('');
  };

  return (
    <div style={{ background: '#05070f', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top bar */}
      <div style={{ padding: '14px 24px', borderBottom: '1px solid #1a1f3a', background: '#0a0d1c', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div className="row" style={{ gap: 16 }}>
          <button className="btn btn-ghost btn-sm" onClick={() => go('dashboard')}>← Back</button>
          <div className="row" style={{ gap: 10 }}>
            {recording && (
              <>
                <span className="live-dot"></span>
                <span className="display" style={{ fontSize: 11, color: 'var(--danger)', letterSpacing: '0.2em' }}>REC · LIVE</span>
              </>
            )}
            <span className="mono" style={{ fontSize: 12, color: 'var(--text-muted)' }}>{fmtTime(elapsed)}</span>
          </div>
          <div style={{ width: 1, height: 18, background: 'var(--border)' }}></div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Camera Movement & Blocking</div>
            <div className="muted" style={{ fontSize: 11 }}>Filmmaking Diploma · {participants.length} students in room {handsUp > 0 && <span style={{ color: 'var(--gold)' }}>· ✋ {handsUp} hand{handsUp > 1 ? 's' : ''}</span>}</div>
          </div>
        </div>
        <div className="row" style={{ gap: 8 }}>
          <button className="btn btn-secondary btn-sm" onClick={muteAll}><Icon name="micOff" size={13} /> Mute all</button>
          <button className="btn btn-secondary btn-sm" onClick={() => setShowChat(!showChat)}><Icon name="chat" size={13} /> Chat</button>
          <button className="btn btn-danger" onClick={() => setConfirmEnd(true)}>End lecture</button>
        </div>
      </div>

      {/* Main */}
      <div style={{ display: 'grid', gridTemplateColumns: `260px 1fr ${showChat ? '320px' : '0'}`, flex: 1, overflow: 'hidden' }}>
        {/* Participants list */}
        <div style={{ background: 'var(--surface)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border)' }}>
            <h4 className="h4">Participants <span className="muted" style={{ fontWeight: 400, fontSize: 13 }}>· {participants.length + 1}</span></h4>
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {/* Host row */}
            <div className="row" style={{ padding: '12px 18px', gap: 10, borderBottom: '1px solid var(--border)' }}>
              <Avatar name="Hossam Dagher" size="sm" tint="#d4a356" />
              <div className="grow">
                <div style={{ fontSize: 13, fontWeight: 600 }}>You (host)</div>
                <span className="badge badge-gold" style={{ fontSize: 9, padding: '1px 6px' }}>Instructor</span>
              </div>
              <Icon name={muted ? 'micOff' : 'mic'} size={14} style={{ color: muted ? 'var(--danger)' : 'var(--success)' }} />
            </div>
            {participants.map(p => (
              <div key={p.id} className="row" style={{ padding: '10px 18px', gap: 10, borderBottom: '1px solid var(--border)' }}>
                <Avatar name={p.name} size="sm" />
                <div className="grow">
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{p.name}</div>
                  {p.isHandRaised && <div style={{ fontSize: 10, color: 'var(--gold)' }}>✋ Hand raised</div>}
                </div>
                <div className="row" style={{ gap: 4 }}>
                  <button className="btn-ghost" style={{ padding: 5, borderRadius: 6 }} onClick={() => muteOne(p.id)} title={p.isMuted ? 'Unmute' : 'Mute'}>
                    <Icon name={p.isMuted ? 'micOff' : 'mic'} size={13} style={{ color: p.isMuted ? 'var(--text-dim)' : 'var(--success)' }} />
                  </button>
                  <button className="btn-ghost" style={{ padding: 5, borderRadius: 6, color: 'var(--danger)' }} onClick={() => removeOne(p.id)} title="Remove">
                    <Icon name="x" size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stage */}
        <div style={{ padding: 16, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
          <div style={{ background: '#000', borderRadius: 12, overflow: 'hidden', position: 'relative', aspectRatio: '16/9', flexShrink: 0 }}>
            {screenSharing ? (
              <>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #0d1429, #1a2540)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 14 }}>
                  <Icon name="screen" size={48} style={{ color: 'rgba(255,255,255,0.3)' }} />
                  <div className="display" style={{ fontSize: 16, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em' }}>SLIDE 12 / 28 · BLOCKING DIAGRAMS</div>
                  <div style={{ fontFamily: 'JetBrains Mono', fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>YOU ARE SHARING YOUR SCREEN</div>
                </div>
                <div style={{ position: 'absolute', bottom: 16, right: 16, width: 200, aspectRatio: '16/9', background: 'linear-gradient(135deg, #2d4ee0, #1a2570)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--gold)' }}>
                  <Avatar name="Hossam Dagher" size="lg" tint="#fff" />
                  <div style={{ position: 'absolute', bottom: 6, left: 8, fontSize: 11, fontWeight: 600, color: '#fff' }}>You</div>
                </div>
              </>
            ) : (
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #2d4ee0, #1a2570)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Avatar name="Hossam Dagher" size="lg" tint="#fff" />
              </div>
            )}
            <div style={{ position: 'absolute', top: 12, left: 12, gap: 8 }} className="row">
              <span className="live-dot"></span>
              <span style={{ fontSize: 11, color: '#fff', fontWeight: 700, letterSpacing: '0.15em' }}>BROADCASTING TO {participants.length}</span>
            </div>
          </div>

          {/* Host controls */}
          <div className="row" style={{ justifyContent: 'center', gap: 8, marginTop: 18, padding: 10, background: 'var(--surface)', borderRadius: 100, border: '1px solid var(--border)', maxWidth: 'max-content', margin: '18px auto 0' }}>
            <button className="btn" style={{ width: 48, height: 48, borderRadius: 50, background: muted ? 'var(--danger)' : 'var(--surface-3)' }} onClick={() => setMuted(!muted)}>
              <Icon name={muted ? 'micOff' : 'mic'} size={18} />
            </button>
            <button className="btn" style={{ width: 48, height: 48, borderRadius: 50, background: video ? 'var(--surface-3)' : 'var(--danger)' }} onClick={() => setVideo(!video)}>
              <Icon name={video ? 'video' : 'videoOff'} size={18} />
            </button>
            <button className="btn" style={{ width: 48, height: 48, borderRadius: 50, background: screenSharing ? 'var(--accent)' : 'var(--surface-3)' }} onClick={() => setScreenSharing(!screenSharing)} title="Screen share">
              <Icon name="screen" size={18} />
            </button>
            <div style={{ width: 1, alignSelf: 'stretch', background: 'var(--border)' }}></div>
            <button className="btn" style={{ width: 48, height: 48, borderRadius: 50, background: recording ? 'var(--danger-soft)' : 'var(--surface-3)', color: recording ? 'var(--danger)' : 'var(--text-muted)' }} onClick={() => setRecording(!recording)} title="Recording">
              <span style={{ width: 10, height: 10, borderRadius: 50, background: 'currentColor' }}></span>
            </button>
            <button className="btn" style={{ width: 48, height: 48, borderRadius: 50, background: 'var(--surface-3)' }} title="More">⋯</button>
          </div>
          <div className="row" style={{ justifyContent: 'space-between', maxWidth: 720, margin: '12px auto 0', fontSize: 12, color: 'var(--text-muted)' }}>
            <span>{screenSharing ? 'Sharing your screen' : 'Camera only'} · {recording ? 'Recording on' : 'Not recording'} · {handsUp > 0 ? <span style={{ color: 'var(--gold)' }}>{handsUp} student{handsUp > 1 ? 's have' : ' has'} a question</span> : 'No questions queued'}</span>
          </div>
        </div>

        {/* Chat */}
        {showChat && (
          <div style={{ background: 'var(--surface)', borderLeft: '1px solid var(--border)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border)' }}>
              <h4 className="h4">Class chat</h4>
              <div className="muted" style={{ fontSize: 12, marginTop: 4 }}>You're the host</div>
            </div>
            <div style={{ flex: 1, padding: 14, overflowY: 'auto' }}>
              <div className="col" style={{ gap: 14 }}>
                {chat.map(m => (
                  <div key={m.id}>
                    <div className="row" style={{ justifyContent: 'space-between', marginBottom: 2 }}>
                      <strong style={{ fontSize: 12, color: m.user.includes('host') ? 'var(--gold)' : 'var(--accent-bright)' }}>{m.user}</strong>
                      <span className="dim mono" style={{ fontSize: 10 }}>{m.time}</span>
                    </div>
                    <div style={{ fontSize: 13, lineHeight: 1.45 }}>{m.message}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ padding: 14, borderTop: '1px solid var(--border)', display: 'flex', gap: 8 }}>
              <input className="input" placeholder="Message students…" value={draft} onChange={e => setDraft(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} />
              <button className="btn btn-primary btn-sm" onClick={send}>Send</button>
            </div>
          </div>
        )}
      </div>

      <Modal open={confirmEnd} onClose={() => setConfirmEnd(false)} title="End lecture for everyone?"
        footer={
          <>
            <button className="btn btn-ghost" onClick={() => setConfirmEnd(false)}>Cancel</button>
            <button className="btn btn-danger" onClick={() => { toast('Lecture ended. Recording is being processed.', 'success'); go('dashboard'); }}>End lecture</button>
          </>
        }>
        <div className="muted" style={{ lineHeight: 1.6 }}>
          This will disconnect all {participants.length} students. The recording will be auto-uploaded and made available in their course library within 15 minutes.
        </div>
      </Modal>
    </div>
  );
};


export { LiveStudent, LiveInstructor };
