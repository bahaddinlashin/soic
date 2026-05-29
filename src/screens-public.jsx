// Public-facing screens
import React, { useState, useEffect } from 'react';
import { SOIC_DATA, fmtEGP, fmtDate, fmtShortDate, initials } from './data.js';
import { Icon, Brand, Avatar, CourseCard, CourseImage, useT } from './components.jsx';


const Landing = ({ go, signIn }) => {
  const { tr } = useT();
  const featured = SOIC_DATA.courses.slice(0, 3);
  return (
    <div className="public-page">
      <PublicTopNav go={go} />

      {/* Hero — navy */}
      <section className="section-navy hero-navy" style={{ padding: '120px 56px 100px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 60, alignItems: 'center' }}>
          <div>
            <div className="row" style={{ gap: 10, marginBottom: 24 }}>
              <span className="badge badge-gold">{tr('Cairo · Online · Hybrid', 'القاهرة · أونلاين · هجين')}</span>
              <span className="badge badge-muted">{tr('2026 Cohorts Open', 'دفعات 2026 مفتوحة')}</span>
            </div>
            <h1 style={{ fontFamily: 'Anton, sans-serif', fontSize: 88, lineHeight: 0.95, margin: 0, letterSpacing: '0.01em', color: '#fff' }}>
              {tr('LEARN CINEMA', 'اتعلم سينما')}<br />
              {tr('FROM PEOPLE WHO', 'مع ناس')}<br />
              <span style={{ color: 'var(--gold)' }}>{tr('ACTUALLY MAKE IT.', 'بتصنعها فعلًا.')}</span>
            </h1>
            <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.7)', maxWidth: 560, marginTop: 24, lineHeight: 1.6 }}>
              {tr(
                'SOIC is a live-online cinema academy in Egypt. Diplomas and short workshops in directing, cinematography, editing, sound, and acting — taught by working filmmakers and Cinema Institute faculty.',
                'SOIC أكاديمية سينما بالبث الحي في مصر. دبلومات وورش قصيرة في الإخراج والتصوير والمونتاج والصوت والتمثيل — مع صنّاع أفلام شغّالين وأساتذة معهد السينما.'
              )}
            </p>
            <div className="row" style={{ gap: 12, marginTop: 36 }}>
              <button className="btn btn-primary btn-lg" onClick={() => go('browse')}>
                {tr('Browse courses', 'تصفّح الكورسات')} <Icon name="arrow" size={16} />
              </button>
              <button className="btn btn-secondary btn-lg" onClick={() => go('auth-signup')}>
                {tr('Apply for next cohort', 'قدّم للدفعة القادمة')}
              </button>
            </div>
            <div className="row" style={{ gap: 36, marginTop: 56 }}>
              <div>
                <div style={{ fontFamily: 'Anton', fontSize: 36, color: '#fff' }}>320+</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{tr('Graduates since 2023', 'خريّج منذ 2023')}</div>
              </div>
              <div>
                <div style={{ fontFamily: 'Anton', fontSize: 36, color: '#fff' }}>24</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{tr('Industry instructors', 'محاضر من السوق')}</div>
              </div>
              <div>
                <div style={{ fontFamily: 'Anton', fontSize: 36, color: '#fff' }}>2</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{tr('Branches: Zahraa El Maadi & Katameya', 'فرعين: زهراء المعادي والقطامية')}</div>
              </div>
            </div>
          </div>
          {/* Right poster */}
          <div className="frame-corners" style={{ position: 'relative', aspectRatio: '4/5', borderRadius: 16, overflow: 'hidden',
              background: 'radial-gradient(circle at 30% 20%, #1f2956, #050d2a 60%)',
              border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(180deg, rgba(255,255,255,0) 0 38px, rgba(255,255,255,0.03) 38px 39px)' }} />
            <div style={{ position: 'absolute', bottom: 32, left: 32, right: 32 }}>
              <div className="badge badge-gold" style={{ marginBottom: 12 }}>{tr('NOW SHOOTING', 'تصوير جارٍ')}</div>
              <div style={{ fontFamily: 'Anton', fontSize: 52, lineHeight: 0.95, color: '#fff' }}>{tr('FILMMAKING', 'دبلومة')}<br />{tr('DIPLOMA', 'صناعة الأفلام')}<br /><span style={{ color: 'var(--gold)' }}>2026</span></div>
              <div style={{ marginTop: 10, fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{tr('Dec 8 · 12 weeks · Live online + on-set', '8 ديسمبر · 12 أسبوع · بث حي + بلاتوه')}</div>
            </div>
            <div style={{ position: 'absolute', top: 0, bottom: 0, left: 8, width: 12, background: 'repeating-linear-gradient(180deg, #0a1138 0 14px, transparent 14px 22px)' }} />
            <div style={{ position: 'absolute', top: 0, bottom: 0, right: 8, width: 12, background: 'repeating-linear-gradient(180deg, #0a1138 0 14px, transparent 14px 22px)' }} />
          </div>
        </div>
      </section>

      {/* Featured courses — light */}
      <section className="section-light" style={{ padding: '100px 56px' }}>
        <div className="row" style={{ justifyContent: 'space-between', marginBottom: 40 }}>
          <div>
            <div className="mono" style={{ fontSize: 12, letterSpacing: '0.2em', marginBottom: 6, color: '#8a90a8' }}>// {tr('CURRENT PROGRAMS', 'البرامج الحالية')}</div>
            <h2 className="h1">{tr('Featured cohorts', 'الدفعات المميزة')}</h2>
            <p className="muted" style={{ fontSize: 16, marginTop: 12, maxWidth: 540, lineHeight: 1.6 }}>
              {tr(
                'Live cohorts taught by working filmmakers — every program ends with a real graduation project.',
                'دفعات مباشرة مع صنّاع أفلام شغّالين — كل برنامج بينتهي بمشروع تخرج حقيقي.'
              )}
            </p>
          </div>
          <button className="btn btn-secondary" onClick={() => go('browse')}>{tr('All courses', 'كل الكورسات')} <Icon name="arrow" size={14} /></button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {featured.map(c => <CourseCard key={c.id} course={c} onClick={() => go('course-' + c.id)} />)}
        </div>
      </section>

      {/* Categories — navy strip */}
      <section className="section-navy" style={{ padding: '32px 56px' }}>
        <div className="row" style={{ gap: 36, overflowX: 'auto', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {['Directing', 'Cinematography', 'Editing', 'Sound Design', 'Screenwriting', 'Acting', 'Color Grading', 'Underwater', 'Documentary'].map((c, i) => (
            <div key={c} className="row" style={{ gap: 8, color: 'rgba(255,255,255,0.75)', fontSize: 14, fontWeight: 500 }}>
              <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>0{i+1}</span>
              {c}
            </div>
          ))}
        </div>
      </section>

      {/* How it works — light */}
      <section className="section-light" style={{ padding: '100px 56px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 60, marginBottom: 56, alignItems: 'flex-end' }}>
          <div>
            <div className="mono" style={{ fontSize: 12, letterSpacing: '0.2em', marginBottom: 6, color: '#8a90a8' }}>// {tr('HOW IT WORKS', 'كيف تشتغل')}</div>
            <h2 className="h1" style={{ fontSize: 56, lineHeight: 1.05 }}>{tr('From application', 'من التقديم')}<br />{tr('to graduation reel.', 'لفيلم التخرج.')}</h2>
          </div>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: '#5c6480', maxWidth: 540 }}>
            {tr(
              'Four steps — and at the end of them you walk out with real work to show. No filler, no padding.',
              'أربع خطوات — وفي آخرها بتطلع بشغل حقيقي تعرضه. مفيش حشو، مفيش كلام فاضي.'
            )}
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
          {[
            { n: '01', t: tr('Apply & enroll', 'قدّم وانضم'), d: tr('Pick a course, pay via InstaPay or card. Admin approves your payment in under 24h.', 'اختار الكورس، ادفع بـ InstaPay أو فيزا. الإدارة بتعتمد الدفع في أقل من 24 ساعة.') },
            { n: '02', t: tr('Join live lectures', 'احضر المحاضرات الحية'), d: tr('Auto-added to your calendar. We email you 15 minutes before each session goes live.', 'بتتضاف لتقويمك تلقائيًا. بنرسلك إيميل قبل كل محاضرة بـ 15 دقيقة.') },
            { n: '03', t: tr('Take notes in-class', 'دوّن ملاحظاتك أثناء الحصة'), d: tr('Timestamp notes during the lecture so you can jump straight to that moment in the recording.', 'ملاحظات مرتبطة بالوقت عشان ترجع للحظة دي في التسجيل بضغطة.') },
            { n: '04', t: tr('Build a real reel', 'ابني شو-ريل حقيقي'), d: tr('Final project, certificate, and a path to the Egyptian Film Professions Syndicate.', 'مشروع نهائي وشهادة وطريق لنقابة المهن السينمائية.') },
          ].map(s => (
            <div key={s.n} className="card" style={{ padding: 28 }}>
              <div className="display" style={{ fontSize: 40, color: '#2d4ee0' }}>{s.n}</div>
              <h3 className="h3" style={{ marginTop: 14 }}>{s.t}</h3>
              <p className="muted" style={{ fontSize: 14, marginTop: 8, lineHeight: 1.6 }}>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial — navy */}
      <section className="section-navy" style={{ padding: '100px 56px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ fontFamily: 'Anton, sans-serif', fontSize: 22, color: 'var(--gold)', marginBottom: 24, letterSpacing: '0.4em' }}>★ ★ ★ ★ ★</div>
        <blockquote style={{ fontFamily: 'Anton, sans-serif', fontSize: 44, maxWidth: 900, margin: '0 auto', lineHeight: 1.15, color: '#fff' }}>
          {tr(
            '"I came in not knowing what an f-stop was. Three months later I shot my graduation film on a RED."',
            '"دخلت ومش عارف يعني إيه فتحة عدسة. بعد 3 شهور صوّرت فيلم تخرجي على كاميرا RED."'
          )}
        </blockquote>
        <div style={{ marginTop: 24, fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>{tr('— Mohamed, SOIC graduate, Yemen', '— محمد، خريّج SOIC، اليمن')}</div>
      </section>

      {/* CTA — light */}
      <section className="section-light" style={{ padding: '100px 56px', textAlign: 'center' }}>
        <div style={{ fontFamily: 'JetBrains Mono', fontSize: 12, letterSpacing: '0.2em', marginBottom: 14, color: '#8a90a8' }}>// {tr('READY?', 'مستعد؟')}</div>
        <h2 className="h1" style={{ fontSize: 64, lineHeight: 1.05, maxWidth: 880, margin: '0 auto' }}>
          {tr('Your next cohort starts ', 'دفعتك القادمة بتبدأ ')}<span style={{ color: '#2d4ee0' }}>{tr('December 8.', '8 ديسمبر.')}</span>
        </h2>
        <p style={{ fontSize: 17, marginTop: 18, color: '#5c6480', maxWidth: 580, margin: '18px auto 0', lineHeight: 1.7 }}>
          {tr('Seats are limited — workshop admissions are interview-based and selective.', 'العدد محدود — قبول الورش بيكون بمقابلة شخصية واختيار انتقائي.')}
        </p>
        <div className="row" style={{ gap: 12, marginTop: 36, justifyContent: 'center' }}>
          <button className="btn btn-primary btn-lg" onClick={() => go('auth-signup')}>{tr('Apply now', 'قدّم دلوقتي')} <Icon name="arrow" size={16} /></button>
          <button className="btn btn-secondary btn-lg" onClick={() => go('browse')}>{tr('Browse all courses', 'تصفّح كل الكورسات')}</button>
        </div>
      </section>

      {/* Footer — navy */}
      <footer className="section-navy" style={{ padding: '56px 56px 32px', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40 }}>
        <div>
          <Brand role="SCHOOL OF CINEMA" />
          <p style={{ marginTop: 16, fontSize: 13, maxWidth: 360, lineHeight: 1.7, color: 'rgba(255,255,255,0.6)' }}>
            {tr('Live-online cinema academy. Zahraa El Maadi · Katameya Gardens · streaming everywhere.', 'مدرسة سينما بالبث الحي. زهراء المعادي · القطامية جاردنز · بث في كل مكان.')}
          </p>
        </div>
        {[
          { h: tr('Programs', 'البرامج'), l: [tr('Filmmaking Diploma', 'دبلومة صناعة الأفلام'), tr('Acting Workshop', 'ورشة التمثيل'), tr('Underwater Cinematography', 'التصوير تحت المياه'), tr('Screenwriting', 'كتابة السيناريو')] },
          { h: tr('Company', 'الشركة'), l: [tr('About SOIC', 'عن SOIC'), tr('Instructors', 'المحاضرون'), tr('Press', 'الصحافة'), tr('Careers', 'وظائف')] },
          { h: tr('Contact', 'تواصل'), l: ['+20 12 00 409 583', 'hello@soic.eg', 'WhatsApp', 'Instagram'] },
        ].map(col => (
          <div key={col.h}>
            <h4 className="h4" style={{ marginBottom: 14, color: '#fff' }}>{col.h}</h4>
            <div className="col" style={{ gap: 8 }}>
              {col.l.map(li => <div key={li} style={{ fontSize: 13, cursor: 'pointer', color: 'rgba(255,255,255,0.6)' }}>{li}</div>)}
            </div>
          </div>
        ))}
      </footer>
    </div>
  );
};

const BrowseCourses = ({ go }) => {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('All');
  const cats = ['All', 'Diploma', 'Workshop', 'Short Course'];
  const filtered = SOIC_DATA.courses.filter(c =>
    (cat === 'All' || c.category === cat) &&
    (q === '' || c.title.toLowerCase().includes(q.toLowerCase()) || c.instructor.toLowerCase().includes(q.toLowerCase()))
  );
  return (
    <div className="public-page" style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: 78 }}>
      <PublicTopNav go={go} />
      <div style={{ padding: '40px 56px' }}>
        <div className="row" style={{ justifyContent: 'space-between', marginBottom: 32 }}>
          <div>
            <h1 className="h1">All courses</h1>
            <div className="muted" style={{ marginTop: 4 }}>{filtered.length} programs · 2025–2026 cohorts</div>
          </div>
          <div style={{ position: 'relative' }}>
            <input className="input" placeholder="Search courses or instructors…" value={q} onChange={e => setQ(e.target.value)} style={{ width: 320, paddingLeft: 38 }} />
            <span style={{ position: 'absolute', left: 12, top: 12, color: 'var(--text-dim)' }}><Icon name="search" size={16} /></span>
          </div>
        </div>
        <div className="row" style={{ gap: 8, marginBottom: 24 }}>
          {cats.map(c => (
            <button key={c} className={`btn ${cat === c ? 'btn-primary' : 'btn-secondary'} btn-sm`} onClick={() => setCat(c)}>{c}</button>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {filtered.map(c => <CourseCard key={c.id} course={c} onClick={() => go('course-' + c.id)} />)}
        </div>
      </div>
    </div>
  );
};

const CourseDetail = ({ courseId, go, role, onEnroll, onWishlist, isEnrolled, isWishlisted }) => {
  const { tr, lang } = useT();
  const course = SOIC_DATA.courses.find(c => c.id === courseId);
  if (!course) return <div style={{ padding: 40 }}>Course not found</div>;
  const isPublic = role === 'public';
  const description = lang === 'ar' && course.descriptionAr ? course.descriptionAr : course.description;
  return (
    <div className={isPublic ? "public-page" : ""} style={{ background: isPublic ? 'var(--bg)' : undefined, minHeight: isPublic ? '100vh' : undefined, paddingTop: isPublic ? 78 : 0 }}>
      {isPublic && <PublicTopNav go={go} />}
      <div style={{ padding: isPublic ? '40px 56px' : 0 }}>
        <div className="row" style={{ marginBottom: 20, cursor: 'pointer' }} onClick={() => go(isPublic ? 'browse' : 'browse')}>
          <span className="muted" style={{ fontSize: 13 }}>← Back to courses</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 40 }}>
          <div>
            <div style={{ marginBottom: 24 }}><CourseImage course={course} height={280} radius={10} /></div>
            <div className="row" style={{ gap: 8, marginBottom: 14 }}>
              <span className="badge badge-accent">{course.category}</span>
              <span className="badge badge-muted">{course.level}</span>
              {course.tag && <span className="badge badge-gold">{course.tag}</span>}
            </div>
            <h1 className="h1" style={{ fontSize: 44 }}>{course.title}</h1>
            <div className="muted" style={{ fontSize: 14, marginTop: 6 }}>{course.titleAr}</div>

            <p style={{ marginTop: 22, fontSize: 16, lineHeight: 1.6, color: 'var(--text-muted)' }}>{description}</p>

            {(course.includes || course.locations) && (
              <div style={{ display: 'grid', gridTemplateColumns: course.includes && course.locations ? '1fr 1fr' : '1fr', gap: 14, marginTop: 24 }}>
                {course.includes && (
                  <div className="card flat" style={{ padding: 16 }}>
                    <div className="display" style={{ fontSize: 11, color: 'var(--gold)', letterSpacing: '0.18em', marginBottom: 10 }}>{tr('WHAT\u2019S INCLUDED', 'مشمول مع الكورس')}</div>
                    <ul style={{ paddingInlineStart: 18, margin: 0, fontSize: 13, lineHeight: 1.8, color: 'var(--text)' }}>
                      {course.includes.map((inc, i) => <li key={i}>{inc}</li>)}
                    </ul>
                  </div>
                )}
                {course.locations && (
                  <div className="card flat" style={{ padding: 16 }}>
                    <div className="display" style={{ fontSize: 11, color: 'var(--gold)', letterSpacing: '0.18em', marginBottom: 10 }}>{tr('LOCATIONS', 'الأماكن')}</div>
                    <ul style={{ paddingInlineStart: 18, margin: 0, fontSize: 13, lineHeight: 1.8, color: 'var(--text)' }}>
                      {course.locations.map((loc, i) => <li key={i}>{loc}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {course.requirements && (
              <div className="card flat" style={{ padding: 16, marginTop: 14, borderInlineStart: '3px solid var(--gold)' }}>
                <div className="display" style={{ fontSize: 11, color: 'var(--gold)', letterSpacing: '0.18em', marginBottom: 8 }}>{tr('ADMISSION', 'القبول')}</div>
                <ul style={{ paddingInlineStart: 18, margin: 0, fontSize: 13, lineHeight: 1.8 }}>
                  {course.requirements.map((req, i) => <li key={i}>{req}</li>)}
                </ul>
              </div>
            )}

            <h3 className="h3" style={{ marginTop: 36, marginBottom: 14 }}>{tr('What you\u2019ll learn', 'هتتعلم إيه')}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {course.modules.map((m, i) => (
                <div key={i} className="card flat" style={{ padding: 16, display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontWeight: 600 }}>{lang === 'ar' && m.titleAr ? m.titleAr : m.title}</div>
                    <div className="muted" style={{ fontSize: 12, marginTop: 2 }}>{m.lessons} {tr('lessons', 'درس')}</div>
                  </div>
                  <div className="display" style={{ color: 'var(--text-dim)' }}>0{i+1}</div>
                </div>
              ))}
            </div>

            <h3 className="h3" style={{ marginTop: 36, marginBottom: 14 }}>Instructor</h3>
            <div className="card" style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <Avatar name={course.instructor} size="lg" tint={course.tint} />
              <div className="grow">
                <div style={{ fontWeight: 700, fontSize: 16 }}>{course.instructor}</div>
                <div className="muted" style={{ fontSize: 13 }}>Working filmmaker · 12+ years experience · 4 features credited</div>
              </div>
              <button className="btn btn-secondary btn-sm">View profile</button>
            </div>
          </div>

          {/* Right column — enroll */}
          <div>
            <div className="card" style={{ position: 'sticky', top: 24 }}>
              <div className="display" style={{ fontSize: 14, color: 'var(--gold)', marginBottom: 6 }}>STARTS</div>
              <div className="h2" style={{ marginBottom: 18 }}>{fmtDate(course.startDate)}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 18 }}>
                <div className="card flat" style={{ padding: 12 }}>
                  <div className="muted" style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Duration</div>
                  <div style={{ fontWeight: 700, marginTop: 4 }}>{course.duration}</div>
                </div>
                <div className="card flat" style={{ padding: 12 }}>
                  <div className="muted" style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Lectures</div>
                  <div style={{ fontWeight: 700, marginTop: 4 }}>{course.lectures}</div>
                </div>
                <div className="card flat" style={{ padding: 12 }}>
                  <div className="muted" style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Students</div>
                  <div style={{ fontWeight: 700, marginTop: 4 }}>{course.enrolled}</div>
                </div>
                <div className="card flat" style={{ padding: 12 }}>
                  <div className="muted" style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Format</div>
                  <div style={{ fontWeight: 700, marginTop: 4 }}>Live + On-set</div>
                </div>
              </div>
              <div style={{ padding: '16px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', marginBottom: 18 }}>
                {course.originalPrice && <div className="dim" style={{ fontSize: 13, textDecoration: 'line-through' }}>{fmtEGP(course.originalPrice)}</div>}
                <div className="row" style={{ gap: 10, alignItems: 'baseline' }}>
                  <div style={{ fontFamily: 'Anton', fontSize: 40 }}>{fmtEGP(course.price)}</div>
                  {course.originalPrice && <span className="badge badge-gold">30% OFF</span>}
                </div>
                <div className="muted" style={{ fontSize: 12, marginTop: 4 }}>One-time payment · Includes graduation project</div>
              </div>
              {isEnrolled ? (
                <button className="btn btn-success btn-lg" style={{ width: '100%', background: 'var(--success)', color: '#06180e' }}>
                  ✓ You're enrolled — Open course
                </button>
              ) : (
                <>
                  <button className="btn btn-primary btn-lg" style={{ width: '100%' }} onClick={onEnroll}>
                    {isPublic ? 'Sign up & enroll' : 'Enroll now'}
                  </button>
                  <button className="btn btn-secondary" style={{ width: '100%', marginTop: 10 }} onClick={onWishlist}>
                    <Icon name="heart" size={15} /> {isWishlisted ? 'In wishlist' : 'Add to wishlist'}
                  </button>
                </>
              )}
              <div className="muted" style={{ fontSize: 12, marginTop: 16, lineHeight: 1.5, textAlign: 'center' }}>
                Pay with InstaPay, card, or bank transfer.<br />Refundable within 7 days of first lecture.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Auth = ({ mode, go, onSignIn }) => {
  const { tr, lang } = useT();
  const isSignIn = mode === 'signin';
  const [role, setRole] = useState('student');
  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      {/* Left visual */}
      <div className="frame-corners cinema-card" style={{ background: 'radial-gradient(circle at 30% 30%, #1a2562, #060a1c 70%)', position: 'relative', overflow: 'hidden', padding: 56, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Brand role="SCHOOL OF CINEMA" onClick={() => go('landing')} />

        <div>
          <div className="display" style={{ fontSize: 14, color: 'var(--gold)', marginBottom: 12, letterSpacing: '0.2em' }}>SOIC · CAIRO</div>
          <h2 style={{ fontFamily: 'Anton', fontSize: 56, lineHeight: 1, margin: 0 }}>
            {isSignIn ? (
              <>{tr('WELCOME', 'أهلًا')}<br />{tr('BACK', 'بعودتك')}<br /><span style={{ color: 'var(--gold)' }}>{tr('TO SET.', 'للبلاتوه.')}</span></>
            ) : (
              <>{tr('BREAK INTO', 'ادخل')}<br />{tr('THE INDUSTRY.', 'مجال السينما.')}<br /><span style={{ color: 'var(--gold)' }}>{tr('FOR REAL.', 'فعلًا.')}</span></>
            )}
          </h2>
          <p className="muted" style={{ marginTop: 20, maxWidth: 380, lineHeight: 1.6 }}>
            {tr(
              'Live classes with working filmmakers. Real on-set practice. Real reels. Diplomas recognized by the Egyptian Film Professions Syndicate.',
              'حصص مباشرة مع صنّاع أفلام شغّالين فعلًا. تدريب حقيقي على البلاتوه. شو-ريل حقيقي. شهادات معترفة من نقابة المهن السينمائية.'
            )}
          </p>

          <div className="col" style={{ gap: 14, marginTop: 36 }}>
            {[
              { en: 'Live cohorts — small groups, real feedback', ar: 'دفعات مباشرة — مجموعات صغيرة وفيدباك حقيقي' },
              { en: 'Faculty from the Cinema Institute + working pros', ar: 'أساتذة من معهد السينما + محترفين في السوق' },
              { en: 'Graduation short film on every program', ar: 'فيلم قصير عند التخرج لكل برنامج' },
            ].map((b, i) => (
              <div key={i} className="row" style={{ gap: 10, fontSize: 14 }}>
                <div style={{ width: 22, height: 22, borderRadius: 50, background: 'var(--gold)', color: '#1a1408', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon name="check" size={12} />
                </div>
                <span>{tr(b.en, b.ar)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="row" style={{ gap: 24, color: 'var(--text-dim)', fontSize: 12 }}>
          <span>© 2026 SOIC</span>
          <span>{tr('Zahraa El Maadi · Katameya Gardens', 'زهراء المعادي · القطامية جاردنز')}</span>
        </div>
      </div>

      {/* Right form */}
      <div style={{ background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40, position: 'relative' }}>
        <div style={{ position: 'absolute', top: 24, [lang === 'ar' ? 'left' : 'right']: 24 }}>
          <button className="btn btn-ghost btn-sm" onClick={() => go('landing')}>← {tr('Back to home', 'العودة للرئيسية')}</button>
        </div>

        <div style={{ width: '100%', maxWidth: 440 }}>
          <h1 className="h1" style={{ marginBottom: 8 }}>{isSignIn ? tr('Welcome back', 'أهلًا بعودتك') : tr('Create your account', 'أنشئ حسابك')}</h1>
          <div className="muted" style={{ marginBottom: 28 }}>
            {isSignIn
              ? tr('Sign in to continue learning.', 'سجّل دخول لتكمل تعلّمك.')
              : tr('Tell us who you are. Admin approval is required for instructors.', 'قول لنا مين أنت. حسابات المحاضرين بتحتاج اعتماد من الإدارة.')
            }
          </div>

          {!isSignIn && (
            <div style={{ marginBottom: 18 }}>
              <label className="label">{tr('I am a…', 'أنا…')}</label>
              <div className="row" style={{ gap: 8 }}>
                {[
                  { id: 'student', en: 'Student', ar: 'طالب' },
                  { id: 'instructor', en: 'Instructor', ar: 'محاضر' },
                ].map(r => (
                  <button key={r.id} className={`btn ${role === r.id ? 'btn-primary' : 'btn-secondary'}`} style={{ flex: 1 }} onClick={() => setRole(r.id)}>{tr(r.en, r.ar)}</button>
                ))}
              </div>
            </div>
          )}

          {!isSignIn && (
            <div style={{ marginBottom: 14 }}>
              <label className="label">{tr('Full name', 'الاسم الكامل')}</label>
              <input className="input" placeholder={tr('Your name', 'اسمك')} defaultValue={role === 'student' ? 'Layla Khalid' : 'Hossam Dagher'} />
            </div>
          )}
          <div style={{ marginBottom: 14 }}>
            <label className="label">{tr('Email', 'البريد الإلكتروني')}</label>
            <input className="input" type="email" placeholder="you@example.com" defaultValue={role === 'student' ? 'layla@example.com' : 'hossam@soic.eg'} />
          </div>
          <div style={{ marginBottom: 14 }}>
            <div className="row" style={{ justifyContent: 'space-between', marginBottom: 6 }}>
              <label className="label" style={{ margin: 0 }}>{tr('Password', 'كلمة المرور')}</label>
              {isSignIn && <a style={{ fontSize: 12, color: 'var(--accent-bright)', cursor: 'pointer', fontWeight: 600 }}>{tr('Forgot?', 'نسيتها؟')}</a>}
            </div>
            <input className="input" type="password" placeholder="••••••••" defaultValue="cinema123" />
          </div>
          {!isSignIn && (
            <div style={{ marginBottom: 14 }}>
              <label className="label">{tr('Phone / WhatsApp', 'هاتف / واتساب')}</label>
              <input className="input" placeholder="+20 12 …" defaultValue="+20 12 00 409 583" />
            </div>
          )}

          {isSignIn && (
            <label className="row" style={{ gap: 8, fontSize: 13, color: 'var(--text-muted)', cursor: 'pointer', marginBottom: 18 }}>
              <input type="checkbox" defaultChecked style={{ width: 16, height: 16, accentColor: 'var(--accent-bright)' }} />
              {tr('Keep me signed in on this device', 'ابقني مسجّل دخول على الجهاز ده')}
            </label>
          )}

          {!isSignIn && (
            <label className="row" style={{ gap: 8, fontSize: 13, color: 'var(--text-muted)', cursor: 'pointer', marginBottom: 18, alignItems: 'flex-start' }}>
              <input type="checkbox" defaultChecked style={{ width: 16, height: 16, accentColor: 'var(--accent-bright)', marginTop: 2 }} />
              <span>{tr('I agree to SOIC\u2019s Terms of Service and Privacy Policy', 'موافق على شروط الخدمة وسياسة الخصوصية الخاصة بـ SOIC')}</span>
            </label>
          )}

          <button className="btn btn-primary btn-lg" style={{ width: '100%' }} onClick={() => onSignIn(role)}>
            {isSignIn ? tr('Sign in', 'سجّل دخول') : tr('Create account', 'أنشئ الحساب')}
          </button>

          {!isSignIn && role === 'instructor' && (
            <div className="card flat" style={{ marginTop: 16, padding: 14, fontSize: 13, borderInlineStart: '3px solid var(--gold)' }}>
              <strong style={{ color: 'var(--gold)' }}>{tr('Heads up:', 'انتباه:')}</strong>
              <div className="muted" style={{ marginTop: 4 }}>
                {tr(
                  'Instructor accounts require admin approval. You\u2019ll get an email within 24h. Until then you can browse but not host lectures.',
                  'حسابات المحاضرين بتحتاج اعتماد من الإدارة. هتوصلك رسالة بالبريد خلال 24 ساعة. لحد ما يتم الاعتماد تقدر تتصفح بس مش تبث محاضرات.'
                )}
              </div>
            </div>
          )}

          <div className="row" style={{ alignItems: 'center', gap: 12, margin: '24px 0' }}>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }}></div>
            <span className="dim mono" style={{ fontSize: 11, letterSpacing: '0.12em' }}>{tr('OR', 'أو')}</span>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }}></div>
          </div>

          <div className="row" style={{ gap: 10 }}>
            <button className="btn btn-secondary" style={{ flex: 1 }}>
              <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M22 12c0-.7-.06-1.4-.2-2H12v3.8h5.6c-.2 1.3-1 2.4-2.1 3.1v2.6h3.4c2-1.8 3.1-4.5 3.1-7.5z"/><path fill="#34A853" d="M12 22c2.7 0 5-1 6.6-2.5l-3.4-2.6c-.9.6-2 1-3.2 1-2.5 0-4.6-1.7-5.3-4H3.2v2.6C4.8 19.4 8.2 22 12 22z"/><path fill="#FBBC05" d="M6.7 13.9c-.2-.6-.3-1.2-.3-1.9s.1-1.3.3-1.9V7.5H3.2C2.5 8.9 2 10.4 2 12s.5 3.1 1.2 4.5l3.5-2.6z"/><path fill="#EA4335" d="M12 6c1.4 0 2.7.5 3.7 1.5l2.8-2.8C16.9 3 14.7 2 12 2 8.2 2 4.8 4.6 3.2 7.5L6.7 10c.7-2.3 2.8-4 5.3-4z"/></svg>
              Google
            </button>
            <button className="btn btn-secondary" style={{ flex: 1 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 12.7c0-2.5 2-3.7 2.1-3.8-1.2-1.7-3-2-3.7-2-1.5-.2-3 .9-3.8.9-.8 0-2-.9-3.3-.9C8.4 7 6.5 8 5.6 9.6c-1.9 3.2-.5 8 1.4 10.7.9 1.3 2 2.7 3.4 2.7s1.9-.9 3.6-.9c1.6 0 2.1.9 3.6.8 1.5 0 2.4-1.3 3.3-2.6 1-1.5 1.5-3 1.5-3 0 0-2.9-1.1-3-4.5zm-2.5-8.2C17.3 3.5 18 2.3 17.8 1c-1.1 0-2.4.7-3.1 1.6-.7.8-1.3 2-1.1 3.3 1.2.1 2.5-.6 3-1.4z"/></svg>
              Apple
            </button>
          </div>

          <div className="muted" style={{ textAlign: 'center', marginTop: 24, fontSize: 14 }}>
            {isSignIn ? tr("Don't have an account? ", 'مش عندك حساب؟ ') : tr('Already have one? ', 'عندك حساب بالفعل؟ ')}
            <a style={{ color: 'var(--accent-bright)', cursor: 'pointer', fontWeight: 600 }} onClick={() => go(isSignIn ? 'auth-signup' : 'auth-signin')}>
              {isSignIn ? tr('Sign up', 'سجّل جديد') : tr('Sign in', 'سجّل دخول')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const About = ({ go }) => {
  const { tr } = useT();
  return (
    <div className="public-page" style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: 78 }}>
      <PublicTopNav go={go} />

      {/* Hero */}
      <section style={{ padding: '80px 56px 60px', position: 'relative', overflow: 'hidden' }}>
        <div className="dim mono" style={{ fontSize: 12, letterSpacing: '0.2em', marginBottom: 14 }}>// {tr('ABOUT SOIC', 'عن SOIC')}</div>
        <h1 style={{ fontFamily: 'Anton', fontSize: 88, lineHeight: 1, margin: 0, letterSpacing: '0.01em', maxWidth: 1100, paddingBottom: 6 }}>
          {tr('A CINEMA SCHOOL BUILT BY', 'مدرسة سينما بناها')}<br />
          {tr('PEOPLE WHO ', 'ناس ')}<span style={{ color: 'var(--gold)' }}>{tr('ACTUALLY MAKE', 'بيصنعوا')}</span><br />
          {tr('FILMS FOR A LIVING.', 'الأفلام فعلًا.')}
        </h1>
        <p style={{ fontSize: 18, color: 'var(--text-muted)', maxWidth: 720, marginTop: 36, lineHeight: 1.7 }}>
          {tr(
            'SOIC was founded to close the gap between film school and the working set. We teach the way the industry actually runs — short cohorts, real instructors with credits on screen, hands-on practice from day one, and a graduation project you can put on your reel.',
            'تأسست SOIC لتقفل المسافة بين مدرسة السينما وبلاتوه الشغل. بنعلّم بالطريقة اللي الصناعة شغّالة بيها فعلًا — دفعات قصيرة، أساتذة شغالين بأعمال حقيقية على الشاشة، تطبيق عملي من أول يوم، ومشروع تخرج تقدر تحطه على شو-ريلك.'
          )}
        </p>
      </section>

      {/* Big numbers strip */}
      <section style={{ padding: '40px 56px', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 40 }}>
          {[
            { n: '320+', l: tr('Graduates since 2023', 'خريّج منذ 2023') },
            { n: '24', l: tr('Industry instructors', 'محاضر من السوق') },
            { n: '6', l: tr('Active programs', 'برنامج فعّال') },
            { n: '2', l: tr('Branches across Cairo', 'فرع بالقاهرة') },
          ].map(s => (
            <div key={s.l}>
              <div className="display" style={{ fontSize: 64, lineHeight: 1, color: 'var(--gold)' }}>{s.n}</div>
              <div className="muted" style={{ fontSize: 13, marginTop: 8 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission / Method / Outcome */}
      <section style={{ padding: '80px 56px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 28 }}>
          {[
            {
              n: '01',
              h: tr('Our mission', 'مهمتنا'),
              p: tr(
                'Make a serious cinema education affordable, practical, and reachable for anyone with the work ethic — from Cairo, the rest of Egypt, and the Arab world.',
                'نخلي تعليم سينما جاد متاح وفعّال وفي متناول أي حد عنده استعداد للشغل — من القاهرة وبقية مصر والوطن العربي.'
              )
            },
            {
              n: '02',
              h: tr('Our method', 'طريقتنا'),
              p: tr(
                'Cohorts run live. Instructors are working filmmakers. Every program has a final shoot. We keep groups small enough that you actually get feedback on your work.',
                'الدفعات بـ بث حي. الأساتذة شغّالين فعلًا في السينما. كل برنامج بينتهي بتصوير. بنحافظ على مجموعات صغيرة عشان فعلًا تاخد فيدباك على شغلك.'
              )
            },
            {
              n: '03',
              h: tr('Your outcome', 'هتطلع بإيه'),
              p: tr(
                'A SOIC certificate, eligibility to apply to the Egyptian Film Professions Syndicate, a graduation reel, and a small network of working pros who know your work.',
                'شهادة من SOIC، فرصة للانضمام لنقابة المهن السينمائية، شو-ريل من مشروع التخرج، وشبكة صغيرة من محترفين شايفين شغلك.'
              )
            },
          ].map(b => (
            <div key={b.n} className="card flat" style={{ padding: 28 }}>
              <div className="display" style={{ fontSize: 38, color: 'var(--gold)' }}>{b.n}</div>
              <h3 className="h3" style={{ marginTop: 14 }}>{b.h}</h3>
              <p className="muted" style={{ fontSize: 14, marginTop: 10, lineHeight: 1.7 }}>{b.p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section style={{ padding: '60px 56px 80px', background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 60, alignItems: 'center' }}>
          <div className="frame-corners cinema-card" style={{ aspectRatio: '4/5', borderRadius: 14, overflow: 'hidden', position: 'relative', background: 'radial-gradient(circle at 30% 20%, #1f2956, #0a0e22 60%)' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(180deg, rgba(255,255,255,0) 0 38px, rgba(255,255,255,0.03) 38px 39px)' }} />
            <div style={{ position: 'absolute', bottom: 28, left: 28, right: 28 }}>
              <div className="badge badge-gold" style={{ marginBottom: 12 }}>{tr('SINCE 2023', 'منذ 2023')}</div>
              <div style={{ fontFamily: 'Anton', fontSize: 44, lineHeight: 1, color: '#fff', paddingBottom: 4 }}>{tr('TWO BRANCHES.', 'فرعين.')}<br /><span style={{ color: 'var(--gold)' }}>{tr('ONE STANDARD.', 'مستوى واحد.')}</span></div>
              <div className="muted" style={{ marginTop: 16, fontSize: 13 }}>{tr('Zahraa El Maadi · Katameya Gardens', 'زهراء المعادي · القطامية جاردنز')}</div>
            </div>
          </div>
          <div>
            <div className="dim mono" style={{ fontSize: 12, letterSpacing: '0.2em', marginBottom: 8 }}>// {tr('THE SHORT STORY', 'الحكاية باختصار')}</div>
            <h2 className="h1" style={{ fontSize: 44 }}>{tr('Why we started SOIC', 'ليه بدأنا SOIC')}</h2>
            <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.7, marginTop: 18 }}>
              {tr(
                'Cairo has no shortage of talent and no shortage of cinema. What was missing was a school where actively working filmmakers — directors, DPs, editors, screenwriters — teach the next generation under one roof, with the same standards a real production runs on.',
                'القاهرة مفيهاش نقص في الموهبة ولا في السينما. اللي كان ناقص: مدرسة فيها أساتذة شغالين فعلًا — مخرجين، مديرين تصوير، مونتيرين، كتاب سيناريو — يعلّموا الجيل اللي بعدهم تحت سقف واحد، بنفس مستوى الإنتاج الحقيقي.'
              )}
            </p>
            <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.7, marginTop: 14 }}>
              {tr(
                'SOIC is that school. Three-month diplomas. Short workshops with selective admission. First-of-their-kind formats like our Underwater Cinematography workshop. And a graduation project on every program — because watching films isn\u2019t the same as making one.',
                'SOIC هي المدرسة دي. دبلومات مدتها 3 شهور. ورش مختصرة بقبول انتقائي. صيغ أول من نوعها زي ورشة التصوير تحت المياه. ومشروع تخرج في كل برنامج — لأن مشاهدة الأفلام مش زي صناعتها.'
              )}
            </p>
            <button className="btn btn-primary btn-lg" style={{ marginTop: 28 }} onClick={() => go('browse')}>{tr('Browse the programs', 'اتفرّج على البرامج')} <Icon name="arrow" size={15} /></button>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section style={{ padding: '80px 56px' }}>
        <div className="dim mono" style={{ fontSize: 12, letterSpacing: '0.2em', marginBottom: 8 }}>// {tr('VISIT US', 'زورنا')}</div>
        <h2 className="h1" style={{ marginBottom: 32 }}>{tr('Two campuses, both in Cairo.', 'فرعين، الاتنين في القاهرة.')}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {[
            { name: 'Zahraa El Maadi', nameAr: 'زهراء المعادي', sub: tr('Original campus · classrooms, edit suite, screening room', 'الفرع الأصلي · فصول، أستوديو مونتاج، قاعة عرض'), since: '2023' },
            { name: 'Katameya Gardens Club', nameAr: 'نادي القطامية جاردنز', sub: tr('New branch · 30% discount on diploma cohorts through 2026', 'الفرع الجديد · خصم 30% على دفعات الدبلومة حتى 2026'), since: '2025' },
          ].map(l => (
            <div key={l.name} className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div className="ph-img" style={{ height: 220, borderRadius: 0, background: 'linear-gradient(135deg, #1f2956, #0a0e22)', position: 'relative' }}>
                <Icon name="location" size={32} style={{ color: 'var(--gold)', position: 'absolute', top: 18, left: 18 }} />
                <div style={{ position: 'absolute', bottom: 18, left: 18, right: 18 }}>
                  <div className="display" style={{ color: '#fff', fontSize: 32 }}>{l.name}</div>
                  <div className="muted" style={{ fontSize: 13, marginTop: 4 }}>{l.nameAr} · {tr('Opened', 'افتُتح')} {l.since}</div>
                </div>
              </div>
              <div style={{ padding: 22 }}>
                <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.6 }}>{l.sub}</p>
                <button className="btn btn-secondary btn-sm" style={{ marginTop: 12 }}>{tr('Get directions', 'احصل على الاتجاهات')} <Icon name="arrow" size={12} /></button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact / CTA */}
      <section style={{ padding: '80px 56px', background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 60, alignItems: 'center' }}>
          <div>
            <div className="dim mono" style={{ fontSize: 12, letterSpacing: '0.2em', marginBottom: 8 }}>// {tr('TALK TO US', 'تواصل معانا')}</div>
            <h2 className="h1" style={{ fontSize: 48, marginBottom: 18 }}>{tr('Got a question? Want to apply?', 'عندك سؤال؟ عايز تتقدم؟')}</h2>
            <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: 540 }}>
              {tr(
                'Admissions reply within one working day. For workshop interviews we usually schedule the same week.',
                'بنرد على طلبات الالتحاق في خلال يوم عمل. مقابلات الورش بنحجزها عادةً في نفس الأسبوع.'
              )}
            </p>
            <div className="row" style={{ gap: 12, marginTop: 28 }}>
              <button className="btn btn-primary btn-lg" onClick={() => go('auth-signup')}>{tr('Apply for a course', 'قدّم لكورس')}</button>
              <button className="btn btn-secondary btn-lg">{tr('WhatsApp us', 'كلّمنا واتساب')}</button>
            </div>
          </div>
          <div className="card" style={{ padding: 24 }}>
            <div className="col" style={{ gap: 18 }}>
              <div>
                <div className="muted" style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>{tr('Phone / WhatsApp', 'هاتف / واتساب')}</div>
                <div className="mono" style={{ fontSize: 18, fontWeight: 600 }}>+20 12 00 409 583</div>
              </div>
              <div>
                <div className="muted" style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>{tr('Email', 'بريد إلكتروني')}</div>
                <div style={{ fontSize: 16, fontWeight: 600 }}>hello@soic.eg</div>
              </div>
              <div>
                <div className="muted" style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>{tr('Hours', 'ساعات العمل')}</div>
                <div style={{ fontSize: 14 }}>{tr('Sat–Thu · 2:00 PM — 10:00 PM', 'السبت–الخميس · 2 ظهرًا — 10 مساءً')}</div>
                <div className="muted" style={{ fontSize: 12, marginTop: 2 }}>{tr('Friday closed', 'الجمعة مغلق')}</div>
              </div>
              <div>
                <div className="muted" style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>{tr('Locations', 'الأماكن')}</div>
                <div style={{ fontSize: 14, lineHeight: 1.6 }}>{tr('Zahraa El Maadi · Katameya Gardens Club', 'زهراء المعادي · نادي القطامية جاردنز')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter go={go} />
    </div>
  );
};

const InstructorsPage = ({ go }) => {
  const { tr, lang } = useT();
  const instructors = SOIC_DATA.users.filter(u => u.role === 'instructor' && u.status === 'active' && u.bio);
  return (
    <div className="public-page" style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: 78 }}>
      <PublicTopNav go={go} />
      <section style={{ padding: '80px 56px 40px' }}>
        <div className="dim mono" style={{ fontSize: 12, letterSpacing: '0.2em', marginBottom: 14 }}>// {tr('THE FACULTY', 'هيئة التدريس')}</div>
        <h1 style={{ fontFamily: 'Anton', fontSize: 88, lineHeight: 1, margin: 0, letterSpacing: '0.01em', paddingBottom: 6 }}>
          {tr('THE PEOPLE WHO', 'ناس ')}<br />
          <span style={{ color: 'var(--gold)' }}>{tr('TEACH YOU.', 'بيعلّموك.')}</span>
        </h1>
        <p style={{ fontSize: 17, color: 'var(--text-muted)', maxWidth: 640, marginTop: 32, lineHeight: 1.7 }}>
          {tr(
            'Every instructor at SOIC is actively working — directing, shooting, cutting, writing — when they\u2019re not teaching. The class you sit in is the same standard the working set runs on.',
            'كل محاضر في SOIC شغّال فعلًا — بيخرج، بيصوّر، بيمنتج، بيكتب — لما مش بيعلّم. الحصة اللي بتقعدها هي نفس مستوى البلاتوه الحقيقي.'
          )}
        </p>
      </section>

      <section style={{ padding: '40px 56px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
          {instructors.map(i => (
            <div key={i.id} className="card" style={{ padding: 0, overflow: 'hidden', cursor: 'pointer', display: 'grid', gridTemplateColumns: '180px 1fr', transition: 'border-color 0.15s' }}
              onClick={() => go('instructor-' + i.id)}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-strong)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; }}>
              <div style={{ background: `linear-gradient(135deg, ${i.tint}55, ${i.tint}15)`, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 220 }}>
                <div style={{ width: 100, height: 100, borderRadius: 50, background: i.tint + '33', color: i.tint, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Anton', fontSize: 38 }}>
                  {initials(i.name)}
                </div>
              </div>
              <div style={{ padding: 22 }}>
                <div className="dim mono" style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>{i.yearsExp} {tr('yrs experience', 'سنة خبرة')}</div>
                <h3 className="h3">{lang === 'ar' && i.nameAr ? i.nameAr : i.name}</h3>
                <div className="muted" style={{ fontSize: 13, marginTop: 4 }}>{lang === 'ar' && i.titleAr ? i.titleAr : i.title}</div>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, marginTop: 12, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {lang === 'ar' && i.bioAr ? i.bioAr : i.bio}
                </p>
                <div className="row" style={{ gap: 18, marginTop: 14, fontSize: 12, color: 'var(--text-muted)' }}>
                  <span><strong style={{ color: 'var(--text)' }}>{i.courses.length}</strong> {tr('courses', 'كورس')}</span>
                  <span><strong style={{ color: 'var(--text)' }}>{i.studentsAllTime}</strong> {tr('students', 'طالب')}</span>
                  <span className="row" style={{ gap: 4 }}><Icon name="star" size={12} style={{ color: 'var(--gold)' }} /> {i.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <PublicFooter go={go} />
    </div>
  );
};

const InstructorDetail = ({ instructorId, go }) => {
  const { tr, lang } = useT();
  const i = SOIC_DATA.users.find(u => u.id === instructorId);
  if (!i || i.role !== 'instructor') return <div style={{ padding: 40 }}>Instructor not found</div>;
  const courses = SOIC_DATA.courses.filter(c => (i.courses || []).includes(c.id));
  return (
    <div className="public-page" style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: 78 }}>
      <PublicTopNav go={go} />
      <div style={{ padding: '40px 56px 80px' }}>
        <div className="row" style={{ marginBottom: 20, cursor: 'pointer' }} onClick={() => go('instructors')}>
          <span className="muted" style={{ fontSize: 13 }}>← {tr('Back to faculty', 'العودة لهيئة التدريس')}</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 40, alignItems: 'flex-start' }}>
          <div>
            <div className="dim mono" style={{ fontSize: 12, letterSpacing: '0.2em', marginBottom: 12 }}>// {(lang === 'ar' && i.titleAr ? i.titleAr : i.title || '').toUpperCase()}</div>
            <h1 style={{ fontFamily: 'Anton', fontSize: 72, lineHeight: 0.95, margin: 0 }}>{lang === 'ar' && i.nameAr ? i.nameAr : i.name}</h1>
            <div className="row" style={{ gap: 24, marginTop: 28 }}>
              <div>
                <div className="display" style={{ fontSize: 36, color: 'var(--gold)' }}>{i.yearsExp}</div>
                <div className="muted" style={{ fontSize: 12 }}>{tr('Years working', 'سنوات شغل')}</div>
              </div>
              <div>
                <div className="display" style={{ fontSize: 36 }}>{i.credits}</div>
                <div className="muted" style={{ fontSize: 12 }}>{tr('Screen credits', 'مشاركات على الشاشة')}</div>
              </div>
              <div>
                <div className="display" style={{ fontSize: 36 }}>{i.studentsAllTime}</div>
                <div className="muted" style={{ fontSize: 12 }}>{tr('Students taught', 'طلاب درّسهم')}</div>
              </div>
              <div>
                <div className="display" style={{ fontSize: 36, color: 'var(--gold)' }}>{i.rating}</div>
                <div className="muted" style={{ fontSize: 12 }}>{tr('Avg rating', 'متوسط التقييم')}</div>
              </div>
            </div>
            <p style={{ fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.7, marginTop: 32 }}>
              {lang === 'ar' && i.bioAr ? i.bioAr : i.bio}
            </p>

            {i.specialties && (
              <>
                <div className="dim mono" style={{ fontSize: 12, letterSpacing: '0.2em', marginTop: 36, marginBottom: 12 }}>// {tr('SPECIALTIES', 'التخصصات')}</div>
                <div className="row" style={{ gap: 8, flexWrap: 'wrap' }}>
                  {i.specialties.map(s => <span key={s} className="badge badge-muted" style={{ fontSize: 12, padding: '6px 12px' }}>{s}</span>)}
                </div>
              </>
            )}
          </div>

          <div className="frame-corners cinema-card" style={{ aspectRatio: '3/4', borderRadius: 14, overflow: 'hidden', position: 'relative', background: `linear-gradient(135deg, ${i.tint}66, #0a0e22)` }}>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 180, height: 180, borderRadius: 50, background: 'rgba(255,255,255,0.06)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Anton', fontSize: 72, border: '2px solid rgba(255,255,255,0.15)' }}>
                {initials(i.name)}
              </div>
            </div>
            <div style={{ position: 'absolute', bottom: 20, left: 20 }}>
              <span className="badge badge-gold">SOIC FACULTY</span>
            </div>
          </div>
        </div>

        {/* Courses */}
        <div className="dim mono" style={{ fontSize: 12, letterSpacing: '0.2em', marginTop: 60, marginBottom: 16 }}>// {tr('TEACHES AT SOIC', 'بيعلّم في SOIC')}</div>
        <h2 className="h1" style={{ marginBottom: 24, fontSize: 36 }}>{tr(courses.length + ' programs', courses.length + ' برنامج')}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {courses.map(c => <CourseCard key={c.id} course={c} onClick={() => go('course-' + c.id)} />)}
        </div>
      </div>
      <PublicFooter go={go} />
    </div>
  );
};

// === Public top nav + footer (reusable) ===
const PublicTopNav = ({ go }) => {
  const { tr } = useT();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <header className={`public-header ${scrolled ? 'scrolled' : ''}`}>
      <Brand role="SCHOOL OF CINEMA" onClick={() => go('landing')} />
      <nav className="row" style={{ gap: 28 }}>
        <a className="nav-link" onClick={() => go('browse')}>{tr('Courses', 'الكورسات')}</a>
        <a className="nav-link" onClick={() => go('instructors')}>{tr('Instructors', 'المحاضرون')}</a>
        <a className="nav-link" onClick={() => go('about')}>{tr('About', 'عن SOIC')}</a>
      </nav>
      <div className="row" style={{ gap: 10 }}>
        <button className="btn btn-ghost" onClick={() => go('auth-signin')}>{tr('Sign In', 'تسجيل الدخول')}</button>
        <button className="btn btn-primary" onClick={() => go('auth-signup')}>{tr('Get Started', 'ابدأ الآن')}</button>
      </div>
    </header>
  );
};

const PublicFooter = ({ go }) => {
  const { tr } = useT();
  return (
    <footer style={{ padding: '40px 56px', borderTop: '1px solid var(--border)', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, background: 'var(--surface)' }}>
      <div>
        <Brand role="SCHOOL OF CINEMA" />
        <p className="muted" style={{ marginTop: 16, fontSize: 13, maxWidth: 360, lineHeight: 1.6 }}>
          {tr('Live-online cinema academy. Zahraa El Maadi · Katameya Gardens · streaming everywhere.', 'مدرسة سينما بالبث الحي. زهراء المعادي · القطامية جاردنز · بث في كل مكان.')}
        </p>
      </div>
      {[
        { h: tr('Programs', 'البرامج'), l: [tr('Filmmaking Diploma', 'دبلومة صناعة الأفلام'), tr('Acting Workshop', 'ورشة التمثيل'), tr('Underwater Cinematography', 'التصوير تحت المياه'), tr('Screenwriting', 'كتابة السيناريو')], onClick: () => go('browse') },
        { h: tr('Company', 'الشركة'), l: [tr('About SOIC', 'عن SOIC'), tr('Instructors', 'المحاضرون'), tr('Press', 'الصحافة'), tr('Careers', 'وظائف')], onClick: () => go('about') },
        { h: tr('Contact', 'تواصل'), l: ['+20 12 00 409 583', 'hello@soic.eg', 'WhatsApp', 'Instagram'] },
      ].map(col => (
        <div key={col.h}>
          <h4 className="h4" style={{ marginBottom: 14 }}>{col.h}</h4>
          <div className="col" style={{ gap: 8 }}>
            {col.l.map(li => <div key={li} className="muted" style={{ fontSize: 13, cursor: col.onClick ? 'pointer' : 'default' }} onClick={col.onClick}>{li}</div>)}
          </div>
        </div>
      ))}
    </footer>
  );
};


export { Landing, BrowseCourses, CourseDetail, Auth, About, InstructorsPage, InstructorDetail, PublicTopNav, PublicFooter };
