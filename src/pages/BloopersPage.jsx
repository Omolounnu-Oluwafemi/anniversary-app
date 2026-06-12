import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { bloopers, bgPhotos } from '../data';

export default function BloopersPage() {
  const [active, setActive] = useState(null); // index into bloopers

  const bg = bgPhotos.bloopers
    ? `linear-gradient(160deg, rgba(18,5,13,0.9) 0%, rgba(8,2,10,0.94) 100%), url(${bgPhotos.bloopers}) center / cover no-repeat`
    : 'linear-gradient(160deg, #12050d 0%, #08020a 100%)';

  function prev() {
    setActive(i => (i - 1 + bloopers.length) % bloopers.length);
  }
  function next() {
    setActive(i => (i + 1) % bloopers.length);
  }

  const item = active !== null ? bloopers[active] : null;

  const portal = createPortal(
    <AnimatePresence>
      {active !== null && item && (
        <>
          {/* Backdrop */}
          <motion.div
            key="bl-bd"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            style={{
              position: 'fixed', inset: 0, zIndex: 300,
              background: 'rgba(2,0,4,0.97)',
              backdropFilter: 'blur(18px)',
            }}
          />

          {/* Media */}
          <motion.div
            key={`bl-${active}`}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.38, ease: [0.34, 1.1, 0.64, 1] }}
            style={{
              position: 'fixed', inset: '3vh 3vw',
              zIndex: 301,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: '0.75rem', pointerEvents: 'none',
            }}
          >
            {item.type === 'video' ? (
              <video
                key={item.src}
                src={item.src}
                controls
                autoPlay
                playsInline
                style={{
                  maxWidth: '100%',
                  maxHeight: 'calc(90vh - 70px)',
                  borderRadius: 14,
                  boxShadow: '0 24px 80px rgba(0,0,0,0.92)',
                  background: '#000',
                  pointerEvents: 'auto',
                }}
              />
            ) : (
              <img
                src={item.src}
                alt=""
                style={{
                  maxWidth: '100%',
                  maxHeight: 'calc(90vh - 70px)',
                  objectFit: 'contain',
                  borderRadius: 14,
                  boxShadow: '0 24px 80px rgba(0,0,0,0.88)',
                  pointerEvents: 'auto',
                }}
              />
            )}

            {item.caption && (
              <p style={{
                fontFamily: 'var(--serif)', fontStyle: 'italic',
                color: 'rgba(255,240,244,0.45)', fontSize: '0.9rem',
                textAlign: 'center', pointerEvents: 'none',
              }}>
                {item.caption}
              </p>
            )}
          </motion.div>

          {/* Counter */}
          <div style={{
            position: 'fixed', top: '1.5rem', left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 302,
            fontFamily: 'var(--sans)', fontSize: 11,
            letterSpacing: '0.22em',
            color: 'rgba(255,240,244,0.28)',
            display: 'flex', alignItems: 'center', gap: '0.4rem',
          }}>
            {item.type === 'video' && (
              <span style={{ fontSize: 9, color: 'rgba(196,53,96,0.6)' }}>▶</span>
            )}
            {active + 1} / {bloopers.length}
          </div>

          {/* Close */}
          <button
            onClick={() => setActive(null)}
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

          {/* Prev / Next */}
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
      {/* Ambient glow */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(ellipse 60% 45% at 50% 20%, rgba(196,53,96,0.08) 0%, transparent 70%)',
      }} />

      <div style={{ position: 'relative', zIndex: 1, padding: '4rem 1.25rem 8rem' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '2.5rem' }}
        >
          <span style={{
            display: 'block',
            fontFamily: 'var(--sans)', fontSize: 9,
            letterSpacing: '0.3em', textTransform: 'uppercase',
            color: 'rgba(196,120,144,0.55)',
            marginBottom: '0.4rem',
          }}>
            the unfiltered ones
          </span>
          <h2 style={{
            fontFamily: 'var(--serif)', fontSize: 'clamp(1.8rem, 5vw, 2.6rem)',
            fontWeight: 300, color: 'rgba(255,240,244,0.7)',
            lineHeight: 1.2,
          }}>
            Bloopers{' '}
            <em style={{
              fontStyle: 'italic',
              background: 'linear-gradient(135deg, #f5aac0 0%, #d95880 50%, #b0304e 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              &amp; Clips
            </em>
          </h2>
          <p style={{
            fontFamily: 'var(--serif)', fontStyle: 'italic',
            color: 'rgba(255,240,244,0.28)', fontSize: '0.82rem',
            marginTop: '0.5rem',
          }}>
            tap to watch or view ♥
          </p>
        </motion.div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '0.75rem',
          maxWidth: 560,
          margin: '0 auto',
        }}>
          {bloopers.map((bl, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.34, 1.1, 0.64, 1] }}
              whileHover={{ scale: 1.03, y: -3, zIndex: 5, transition: { duration: 0.18 } }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActive(i)}
              style={{
                cursor: 'pointer',
                borderRadius: 12,
                overflow: 'hidden',
                aspectRatio: '9 / 16',
                position: 'relative',
                background: '#0c0208',
                border: '0.5px solid rgba(255,255,255,0.06)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.55)',
              }}
            >
              {bl.type === 'video' ? (
                <>
                  {/* First-frame thumbnail via preload="metadata" */}
                  <video
                    src={bl.src}
                    preload="metadata"
                    muted
                    playsInline
                    style={{
                      position: 'absolute', inset: 0,
                      width: '100%', height: '100%',
                      objectFit: 'cover', opacity: 0.72,
                      pointerEvents: 'none',
                    }}
                  />

                  {/* Bottom-fade gradient */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(8,2,10,0.75) 0%, rgba(8,2,10,0.1) 55%, transparent 100%)',
                    pointerEvents: 'none',
                  }} />

                  {/* Rose play button */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    pointerEvents: 'none',
                  }}>
                    <div style={{
                      width: 46, height: 46, borderRadius: '50%',
                      background: 'rgba(196,53,96,0.82)',
                      backdropFilter: 'blur(4px)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: '0 0 24px rgba(196,53,96,0.45)',
                    }}>
                      <span style={{
                        color: 'white', fontSize: '1rem',
                        marginLeft: 3, lineHeight: 1,
                      }}>
                        ▶
                      </span>
                    </div>
                  </div>

                  {/* Caption */}
                  {bl.caption && (
                    <p style={{
                      position: 'absolute', bottom: 0, left: 0, right: 0,
                      padding: '0.45rem 0.6rem',
                      fontFamily: 'var(--serif)', fontStyle: 'italic',
                      fontSize: '0.62rem', color: 'rgba(255,240,244,0.75)',
                      textAlign: 'center', pointerEvents: 'none',
                    }}>
                      {bl.caption}
                    </p>
                  )}
                </>
              ) : (
                <>
                  <img
                    src={bl.src}
                    alt=""
                    style={{
                      position: 'absolute', inset: 0,
                      width: '100%', height: '100%',
                      objectFit: 'cover', display: 'block',
                    }}
                  />

                  {bl.caption && (
                    <>
                      <div style={{
                        position: 'absolute', bottom: 0, left: 0, right: 0,
                        height: '40%',
                        background: 'linear-gradient(to top, rgba(8,2,10,0.8) 0%, transparent 100%)',
                        pointerEvents: 'none',
                      }} />
                      <p style={{
                        position: 'absolute', bottom: 0, left: 0, right: 0,
                        padding: '0.45rem 0.6rem',
                        fontFamily: 'var(--serif)', fontStyle: 'italic',
                        fontSize: '0.62rem', color: 'rgba(255,240,244,0.75)',
                        textAlign: 'center', pointerEvents: 'none',
                      }}>
                        {bl.caption}
                      </p>
                    </>
                  )}
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {portal}
    </div>
  );
}
