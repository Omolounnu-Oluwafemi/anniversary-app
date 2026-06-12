import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { screenshots, bgPhotos } from '../data';

// Flat list for lightbox navigation
const ALL = [...screenshots.sisterSeries, screenshots.mentor];

export default function WitnessPage() {
  const [lightbox, setLightbox] = useState(null);

  const bg = bgPhotos.witness
    ? `linear-gradient(160deg, rgba(28,8,16,0.88) 0%, rgba(18,5,13,0.9) 100%), url(${bgPhotos.witness}) center / cover no-repeat`
    : 'linear-gradient(160deg, #1c0810 0%, #12050d 100%)';

  const LAST_SISTER = screenshots.sisterSeries.length - 1; // index of ss6
  const MENTOR_IDX  = screenshots.sisterSeries.length;    // index of Lastone

  function prev() {
    setLightbox(cur => {
      if (cur === 'wait')       return LAST_SISTER; // wait → back to ss6
      if (cur === MENTOR_IDX)   return 'wait';      // Lastone → back to wait
      if (typeof cur === 'number') return (cur - 1 + ALL.length) % ALL.length;
      return cur;
    });
  }

  function next() {
    setLightbox(cur => {
      if (cur === LAST_SISTER)  return 'wait';      // ss6 → interstitial
      if (cur === 'wait')       return MENTOR_IDX;  // wait → Lastone
      if (typeof cur === 'number') return (cur + 1) % ALL.length;
      return cur;
    });
  }

  const portal = createPortal(
    <AnimatePresence>
      {lightbox !== null && (
        <>
          <motion.div
            key="lb-bd"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            style={{
              position: 'fixed', inset: 0, zIndex: 300,
              background: 'rgba(4,1,6,0.95)',
              backdropFilter: 'blur(14px)',
            }}
          />

          {/* ── "Wait for it" interstitial ── */}
          {lightbox === 'wait' && (
            <motion.div
              key="wait"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, ease: [0.34, 1.1, 0.64, 1] }}
              style={{
                position: 'fixed', inset: 0, zIndex: 301,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                gap: '0.9rem', pointerEvents: 'none',
              }}
            >
              <motion.span
                animate={{ scale: [1, 1.35, 1], opacity: [0.55, 1, 0.55] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                style={{ fontSize: '2.8rem', color: '#c43560', display: 'block', lineHeight: 1 }}
              >
                ♥
              </motion.span>

              <p style={{
                fontFamily: 'var(--serif)',
                fontSize: 'clamp(1.6rem, 5vw, 2.2rem)',
                fontWeight: 300, fontStyle: 'italic',
                color: 'rgba(255,240,244,0.85)',
                letterSpacing: '0.03em',
              }}>
                wait for it
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  …
                </motion.span>
              </p>

              <p style={{
                fontFamily: 'var(--serif)', fontStyle: 'italic',
                fontSize: '0.8rem', color: 'rgba(255,200,220,0.4)',
                letterSpacing: '0.05em',
              }}>
                the last one gets me every time
              </p>

              <motion.p
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                style={{
                  fontFamily: 'var(--sans)', fontSize: 10,
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: 'rgba(196,120,144,0.4)',
                  marginTop: '0.5rem',
                }}
              >
                tap › to reveal
              </motion.p>
            </motion.div>
          )}

          {/* ── Photo ── */}
          {typeof lightbox === 'number' && (
            <motion.div
              key={`lb-${lightbox}`}
              initial={{ opacity: 0, scale: 0.9, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.38, ease: [0.34, 1.1, 0.64, 1] }}
              style={{
                position: 'fixed', inset: '3vh 4vw',
                zIndex: 301,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                pointerEvents: 'none',
              }}
            >
              <img
                src={ALL[lightbox].src}
                alt=""
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                  borderRadius: 14,
                  boxShadow: '0 24px 80px rgba(0,0,0,0.85)',
                  pointerEvents: 'auto',
                }}
              />
            </motion.div>
          )}

          {typeof lightbox === 'number' && (
          <div style={{
            position: 'fixed', top: '1.5rem', left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 302,
            fontFamily: 'var(--sans)', fontSize: 11,
            letterSpacing: '0.22em',
            color: 'rgba(255,240,244,0.28)',
          }}>
            {lightbox + 1} / {ALL.length}
          </div>
          )}

          <button
            onClick={() => setLightbox(null)}
            style={{
              position: 'fixed', top: '1.25rem', right: '1.25rem',
              zIndex: 302,
              background: 'rgba(255,255,255,0.07)',
              border: '0.5px solid rgba(255,255,255,0.12)',
              borderRadius: '50%',
              width: 40, height: 40,
              cursor: 'pointer',
              color: 'rgba(255,240,244,0.55)',
              fontSize: '1.3rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            ×
          </button>

          {[{ side: 'left', label: '‹', fn: prev }, { side: 'right', label: '›', fn: next }].map(({ side, label, fn }) => (
            <button
              key={side}
              onClick={fn}
              style={{
                position: 'fixed', [side]: '0.75rem', top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 302,
                background: 'rgba(255,255,255,0.06)',
                border: '0.5px solid rgba(255,255,255,0.1)',
                borderRadius: '50%',
                width: 46, height: 46,
                cursor: 'pointer',
                color: 'rgba(255,240,244,0.55)',
                fontSize: '1.5rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              {label}
            </button>
          ))}
        </>
      )}
    </AnimatePresence>,
    document.body
  );

  return (
    <div style={{
      width: '100%', height: '100%',
      overflow: 'auto',
      background: bg,
    }}>
      {/* Glow */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(ellipse 65% 45% at 50% 20%, rgba(196,53,96,0.1) 0%, transparent 70%)',
      }} />

      <div style={{ position: 'relative', zIndex: 1, padding: '4rem 1.25rem 8rem' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <span style={{
            display: 'block',
            fontFamily: 'var(--sans)', fontSize: 9,
            letterSpacing: '0.3em', textTransform: 'uppercase',
            color: 'rgba(196,120,144,0.55)',
            marginBottom: '0.5rem',
          }}>
            love has a way of showing
          </span>
          <h2 style={{
            fontFamily: 'var(--serif)', fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
            fontWeight: 300, color: 'rgba(255,240,244,0.75)',
            lineHeight: 1.2,
          }}>
            When they{' '}
            <em style={{
              fontStyle: 'italic',
              background: 'linear-gradient(135deg, #f5aac0 0%, #d95880 50%, #b0304e 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              all knew
            </em>
          </h2>
        </motion.div>

        {/* ── Section 1: Sister ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ marginBottom: '1.5rem' }}
        >
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            marginBottom: '0.35rem',
          }}>
            <div style={{ flex: 1, height: '0.5px', background: 'rgba(196,120,144,0.2)' }} />
            <span style={{
              fontFamily: 'var(--sans)', fontSize: 9,
              letterSpacing: '0.28em', textTransform: 'uppercase',
              color: '#c47890', whiteSpace: 'nowrap',
            }}>
              I told my sister
            </span>
            <div style={{ flex: 1, height: '0.5px', background: 'rgba(196,120,144,0.2)' }} />
          </div>
          <p style={{
            textAlign: 'center',
            fontFamily: 'var(--serif)', fontStyle: 'italic',
            fontSize: '0.82rem', color: 'rgba(255,240,244,0.3)',
            marginBottom: '1.25rem',
          }}>
            Some things are too good to keep to yourself
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '0.75rem',
            maxWidth: 520,
            margin: '0 auto',
          }}>
            {screenshots.sisterSeries.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.07, ease: [0.34, 1.1, 0.64, 1] }}
                whileHover={{ scale: 1.03, y: -3, zIndex: 5, transition: { duration: 0.18 } }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setLightbox(i)}
                style={{
                  cursor: 'pointer',
                  borderRadius: 12,
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.07)',
                  boxShadow: '0 6px 24px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.3)',
                  background: '#0c0208',
                }}
              >
                <img
                  src={item.src}
                  alt={`screenshot ${i + 1}`}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Section 2: Mentor ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          style={{ marginTop: '2.5rem' }}
        >
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            marginBottom: '0.35rem',
          }}>
            <div style={{ flex: 1, height: '0.5px', background: 'rgba(196,120,144,0.2)' }} />
            <span style={{
              fontFamily: 'var(--sans)', fontSize: 9,
              letterSpacing: '0.28em', textTransform: 'uppercase',
              color: '#c47890', whiteSpace: 'nowrap',
            }}>
              my mentor saw right through me
            </span>
            <div style={{ flex: 1, height: '0.5px', background: 'rgba(196,120,144,0.2)' }} />
          </div>
          <p style={{
            textAlign: 'center',
            fontFamily: 'var(--serif)', fontStyle: 'italic',
            fontSize: '0.82rem', color: 'rgba(255,240,244,0.3)',
            marginBottom: '1.5rem',
          }}>
            Deeply in love — and everyone could tell
          </p>

          <motion.div
            whileHover={{ scale: 1.02, y: -4, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setLightbox(screenshots.sisterSeries.length)}
            style={{
              cursor: 'pointer',
              maxWidth: 320,
              margin: '0 auto',
              borderRadius: 16,
              overflow: 'hidden',
              border: '1px solid rgba(196,53,96,0.35)',
              boxShadow: '0 0 0 1px rgba(196,53,96,0.15), 0 12px 40px rgba(196,53,96,0.2), 0 4px 12px rgba(0,0,0,0.5)',
              background: '#0c0208',
            }}
          >
            <img
              src={screenshots.mentor.src}
              alt="mentor screenshot"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </motion.div>

          {/* Rose glow accent below the featured card */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            style={{
              textAlign: 'center', marginTop: '1.25rem',
              fontFamily: 'var(--serif)', fontStyle: 'italic',
              fontSize: '0.85rem', color: 'rgba(255,200,220,0.45)',
            }}
          >
            ♥ deeply in love ♥
          </motion.p>
        </motion.div>

      </div>

      {portal}
    </div>
  );
}
