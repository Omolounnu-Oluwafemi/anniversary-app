import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { names, revealMessage, bgPhotos } from '../data';

const CONFETTI_COLORS = ['#c43560', '#e882a8', '#f5a8c4', '#f5d8e4', '#d45878', '#ff9ab8'];
const CONFETTI_PIECES = Array.from({ length: 55 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
  duration: 2 + Math.random() * 3,
  delay: Math.random() * 1.5,
  size: 6 + Math.random() * 6,
  round: Math.random() > 0.5,
  rotate: Math.random() * 360,
}));

function Confetti({ active }) {
  if (!active) return null;
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 1 }}>
      {CONFETTI_PIECES.map(p => (
        <motion.div
          key={p.id}
          initial={{ y: -20, x: `${p.x}vw`, opacity: 1, rotate: p.rotate }}
          animate={{ y: '110vh', opacity: [1, 1, 0], rotate: p.rotate + 720 }}
          transition={{ duration: p.duration, delay: p.delay, ease: 'easeIn' }}
          style={{
            position: 'absolute', top: 0,
            width: p.size, height: p.size,
            background: p.color,
            borderRadius: p.round ? '50%' : 2,
          }}
        />
      ))}
    </div>
  );
}

const FAMILY_SRC = `${import.meta.env.BASE_URL}photos/Family.png`;

export default function RevealPage() {
  const [opened, setOpened] = useState(false);
  const [showRing, setShowRing] = useState(false);
  const [showFamily, setShowFamily] = useState(false);

  const bg = bgPhotos.reveal
    ? `radial-gradient(ellipse at 50% 40%, rgba(58,13,32,0.82) 0%, rgba(12,2,8,0.92) 70%), url(${bgPhotos.reveal}) center 15% / cover no-repeat`
    : 'radial-gradient(ellipse at 50% 40%, #3a0d20 0%, #0c0208 70%)';

  function open() {
    setOpened(true);
    setTimeout(() => setShowRing(true), 600);
    setTimeout(() => setShowFamily(true), 3400);
  }

  const familyPortal = createPortal(
    <AnimatePresence>
      {showFamily && (
        <>
          {/* Dim backdrop — tap to dismiss */}
          <motion.div
            key="fam-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            onClick={() => setShowFamily(false)}
            style={{
              position: 'fixed', inset: 0, zIndex: 390,
              background: 'rgba(4,0,8,0.72)',
              backdropFilter: 'blur(6px)',
              cursor: 'pointer',
            }}
          />

          {/* Centering shell — flex keeps Framer Motion transform-free */}
          <div
            key="fam-shell"
            style={{
              position: 'fixed', inset: 0, zIndex: 391,
              display: 'flex', justifyContent: 'center', alignItems: 'flex-start',
              pointerEvents: 'none',
            }}
          >
            {/* Slide down from above the viewport */}
            <motion.div
              initial={{ y: '-105%' }}
              animate={{ y: 0 }}
              exit={{ y: '-105%' }}
              transition={{ duration: 1.05, ease: [0.34, 1.05, 0.64, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                pointerEvents: 'auto',
              }}
            >
              {/* ── Hanger ── */}
              {/* Nail / hook dot */}
              <div style={{
                width: 14, height: 14, borderRadius: '50%',
                background: 'linear-gradient(135deg, #d4b483 0%, #a07840 100%)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.6)',
                marginBottom: 0, zIndex: 1,
              }} />
              {/* String */}
              <div style={{
                width: 2, height: 44,
                background: 'linear-gradient(to bottom, rgba(212,180,131,0.7) 0%, rgba(212,180,131,0.25) 100%)',
              }} />
              {/* Cross-bar */}
              <div style={{
                width: 72, height: 3,
                background: 'linear-gradient(90deg, transparent 0%, rgba(212,180,131,0.55) 20%, rgba(212,180,131,0.55) 80%, transparent 100%)',
                borderRadius: 2,
                marginBottom: 2,
              }} />

              {/* Swinging photo — spring damping creates pendulum settle */}
              <motion.div
                initial={{ rotate: -14 }}
                animate={{ rotate: 0 }}
                transition={{ type: 'spring', damping: 5, stiffness: 55, mass: 1.8, delay: 0.9 }}
                style={{ transformOrigin: 'top center' }}
              >
                {/* Polaroid frame */}
                <div style={{
                  background: 'white',
                  padding: '0.7rem 0.7rem 3rem',
                  borderRadius: 3,
                  width: 'min(86vw, 360px)',
                  boxShadow: '0 32px 90px rgba(0,0,0,0.8), 0 6px 24px rgba(196,53,96,0.18)',
                }}>
                  <img
                    src={FAMILY_SRC}
                    alt="Our family"
                    style={{ width: '100%', display: 'block', borderRadius: 1 }}
                  />
                  <p style={{
                    fontFamily: 'var(--serif)', fontStyle: 'italic',
                    fontSize: '1.05rem', color: '#c43560',
                    textAlign: 'center', marginTop: '0.75rem',
                    lineHeight: 1.4,
                  }}>
                    I already see it ♥
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );

  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative', overflow: 'auto',
      background: bg,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      textAlign: 'center', padding: '3rem 2rem',
    }}>
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: opened
          ? 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(196,53,96,0.22) 0%, transparent 70%)'
          : 'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(196,53,96,0.1) 0%, transparent 70%)',
        transition: 'background 1.5s ease',
      }} />

      <Confetti active={opened} />

      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.div
            key="locked"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, filter: 'blur(8px)' }}
            transition={{ duration: 0.7 }}
            style={{ position: 'relative', zIndex: 2 }}
          >
            {/* Lock button */}
            <motion.button
              onClick={open}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              style={{
                width: 72, height: 72, borderRadius: '50%',
                border: '1px solid rgba(196,53,96,0.45)',
                background: 'rgba(196,53,96,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 2rem',
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                stroke="#e882a8" strokeWidth="1.5" strokeLinecap="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </motion.button>

            <p style={{
              fontFamily: 'var(--sans)', fontSize: 10, letterSpacing: '0.3em',
              textTransform: 'uppercase', color: '#c47890', marginBottom: '0.75rem',
            }}>
              Something just for you
            </p>

            <h2 style={{
              fontFamily: 'var(--serif)', fontSize: 'clamp(1.6rem, 4vw, 2.5rem)',
              fontWeight: 300, color: 'rgba(255,240,244,0.85)',
              lineHeight: 1.3, maxWidth: 440,
            }}>
              Tap the lock to open<br />
              your surprise,{' '}
              <em style={{ fontStyle: 'italic', color: '#e882a8' }}>{names.hers}</em>
            </h2>
          </motion.div>
        ) : (
          <motion.div
            key="opened"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ position: 'relative', zIndex: 2, maxWidth: 520 }}
          >
            <AnimatePresence>
              {showRing && (
                <motion.div
                  initial={{ scale: 0, rotate: -20, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                  style={{ fontSize: '4.5rem', marginBottom: '1.5rem', lineHeight: 1 }}
                >
                  💍
                </motion.div>
              )}
            </AnimatePresence>

            {revealMessage.split('\n\n').map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 + i * 0.25 }}
                style={{
                  fontFamily: 'var(--serif)',
                  fontSize: i === 0 ? '1.05rem' : i === 2 ? '1.6rem' : '1.2rem',
                  fontStyle: i === 2 ? 'normal' : 'italic',
                  fontWeight: i === 2 ? 400 : 300,
                  color: i === 2
                    ? '#f5d8e4'
                    : i === revealMessage.split('\n\n').length - 1
                    ? '#e882a8'
                    : 'rgba(255,240,244,0.65)',
                  lineHeight: 1.75,
                  marginBottom: '1.2rem',
                  whiteSpace: 'pre-line',
                }}
              >
                {para}
              </motion.p>
            ))}

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2, duration: 1 }}
              style={{
                fontFamily: 'var(--serif)', fontSize: '1.5rem',
                fontStyle: 'italic', color: '#c47890',
                marginTop: '0.5rem',
              }}
            >
              You're the one, {names.hers}. 🌹
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {familyPortal}
    </div>
  );
}
