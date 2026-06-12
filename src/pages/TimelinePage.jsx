import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { timeline, bgPhotos } from '../data';

const base = import.meta.env.BASE_URL;

const HEART = "M 50 80 C 20 58, 0 42, 0 25 C 0 10, 12 0, 25 0 C 35 0, 44 6, 50 14 C 56 6, 65 0, 75 0 C 88 0, 100 10, 100 25 C 100 42, 80 58, 50 80 Z";

export default function TimelinePage() {
  const [active, setActive] = useState(null);


  const bg = bgPhotos.timeline
    ? `linear-gradient(160deg, rgba(32,8,18,0.84) 0%, rgba(42,15,26,0.84) 50%, rgba(18,5,13,0.92) 100%), url(${bgPhotos.timeline}) center 15% / cover no-repeat`
    : 'linear-gradient(160deg, #200812 0%, #2a0f1a 50%, #12050d 100%)';

  return (
    <div style={{
      width: '100%', height: '100%', overflow: 'auto',
      background: bg,
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      padding: '4rem 1.5rem 8rem',
    }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{ textAlign: 'center', marginBottom: '2.5rem', maxWidth: 480, width: '100%' }}
      >
        <span style={{
          display: 'block', fontFamily: 'var(--sans)', fontSize: 10,
          letterSpacing: '0.3em', textTransform: 'uppercase',
          color: '#c47890', marginBottom: '0.8rem',
        }}>
          How we got here
        </span>
        <h2 style={{
          fontFamily: 'var(--serif)', fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 300, color: '#fff0f4',
        }}>
          Our <em style={{ fontStyle: 'italic', color: '#e882a8' }}>story,</em> so far
        </h2>
        <p style={{
          fontFamily: 'var(--serif)', fontStyle: 'italic',
          color: 'rgba(255,240,244,0.38)', fontSize: '0.88rem',
          marginTop: '0.6rem',
        }}>
          Tap each heart to relive the moment ♥
        </p>
      </motion.div>

      {/* Heart grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '0.75rem 1rem',
        maxWidth: 420, width: '100%',
        marginBottom: '2rem',
      }}>
        {timeline.map((entry, i) => {
          const isOpen = active === i;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.09, ease: [0.34, 1.2, 0.64, 1] }}
            >
              <button
                onClick={() => setActive(isOpen ? null : i)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: 0, width: '100%',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.45rem',
                }}
              >
                {/* Heart shape */}
                <motion.div
                  style={{ position: 'relative', width: '100%', aspectRatio: '100 / 90' }}
                  animate={{ scale: isOpen ? 1.06 : 1 }}
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                >
                  <svg
                    viewBox="0 0 100 90"
                    style={{
                      width: '100%', height: '100%',
                      filter: isOpen
                        ? 'drop-shadow(0 0 16px rgba(196,53,96,0.8))'
                        : 'drop-shadow(0 2px 8px rgba(0,0,0,0.35))',
                      transition: 'filter 0.35s',
                    }}
                  >
                    <path
                      d={HEART}
                      fill={isOpen ? '#c43560' : 'rgba(196,53,96,0.18)'}
                      stroke={isOpen ? '#e882a8' : 'rgba(196,120,144,0.4)'}
                      strokeWidth="1.5"
                      style={{ transition: 'fill 0.35s, stroke 0.35s' }}
                    />
                  </svg>

                  {/* Label text inside heart */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    paddingBottom: '12%', gap: 3,
                  }}>
                    <span style={{
                      fontFamily: 'var(--sans)', fontSize: 8,
                      letterSpacing: '0.18em',
                      color: isOpen ? 'rgba(255,255,255,0.5)' : 'rgba(255,200,215,0.35)',
                      transition: 'color 0.35s',
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span style={{
                      fontFamily: 'var(--serif)',
                      fontSize: 'clamp(0.65rem, 2.2vw, 0.82rem)',
                      textAlign: 'center', lineHeight: 1.25,
                      color: isOpen ? 'white' : 'rgba(255,220,230,0.55)',
                      padding: '0 10%',
                      transition: 'color 0.35s',
                    }}>
                      {entry.label}
                    </span>
                  </div>
                </motion.div>
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Overlay — portalled to document.body to escape the page stacking context */}
      {createPortal(
      <AnimatePresence>
        {active !== null && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setActive(null)}
              style={{
                position: 'fixed', inset: 0, zIndex: 200,
                background: 'rgba(8,2,10,0.75)',
                backdropFilter: 'blur(6px)',
              }}
            />

            {/* Panel — outer clips the bg media, inner scrolls the content */}
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: 60, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              transition={{ duration: 0.45, ease: [0.34, 1.1, 0.64, 1] }}
              style={{
                position: 'fixed', bottom: 0, left: 0, right: 0,
                zIndex: 201,
                maxHeight: '82vh',
                borderRadius: '20px 20px 0 0',
                overflow: 'hidden',
                background: '#0c0208',
              }}
            >
              {/* Video background */}
              {timeline[active].video && (
                <video
                  key={timeline[active].video}
                  autoPlay muted loop playsInline
                  style={{
                    position: 'absolute', inset: 0,
                    width: '100%', height: '100%',
                    objectFit: 'cover', objectPosition: 'center top',
                  }}
                >
                  <source src={`${base}${timeline[active].video}`} />
                </video>
              )}

              {/* Photo background (used when no video) */}
              {!timeline[active].video && timeline[active].photo && (
                <div style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: `url(${base}${timeline[active].photo})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center top',
                }} />
              )}

              {/* Gradient overlay for text readability */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(8,2,10,0.97) 0%, rgba(20,5,14,0.88) 50%, rgba(40,10,22,0.65) 100%)',
              }} />

              {/* Scrollable content */}
              <div style={{ position: 'relative', zIndex: 1, overflowY: 'auto', maxHeight: '82vh', padding: '2rem 1.75rem 4rem' }}>
                {/* Drag handle */}
                <div style={{
                  width: 36, height: 4, borderRadius: 2,
                  background: 'rgba(255,255,255,0.2)',
                  margin: '0 auto 1.75rem',
                }} />

                {/* Heart accent */}
                <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                  <svg width="36" height="32" viewBox="0 0 100 90">
                    <path d={HEART} fill="#c43560" filter="drop-shadow(0 0 8px rgba(196,53,96,0.8))" />
                  </svg>
                </div>

                <div style={{
                  fontFamily: 'var(--sans)', fontSize: 10, letterSpacing: '0.25em',
                  textTransform: 'uppercase', color: '#c47890',
                  textAlign: 'center', marginBottom: 6,
                }}>
                  {timeline[active].label}
                </div>

                <div style={{
                  fontFamily: 'var(--serif)', fontSize: 'clamp(1.2rem, 4vw, 1.5rem)',
                  color: '#fff0f4', textAlign: 'center',
                  marginBottom: '1.25rem', lineHeight: 1.3,
                }}>
                  {timeline[active].event}
                </div>

                <div style={{
                  width: 32, height: '0.5px',
                  background: 'rgba(196,120,144,0.4)',
                  margin: '0 auto 1.25rem',
                }} />

                <p style={{
                  fontFamily: 'var(--serif)', fontSize: '0.95rem',
                  color: 'rgba(255,240,244,0.75)', lineHeight: 1.85,
                }}>
                  {timeline[active].detail}
                </p>

                {/* Close */}
                <button
                  onClick={() => setActive(null)}
                  style={{
                    display: 'block', margin: '1.75rem auto 0',
                    fontFamily: 'var(--sans)', fontSize: 10,
                    letterSpacing: '0.22em', textTransform: 'uppercase',
                    color: 'rgba(255,240,244,0.35)',
                    background: 'none', border: 'none', cursor: 'pointer',
                  }}
                >
                  tap anywhere to close
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>,
      document.body
      )}
    </div>
  );
}
