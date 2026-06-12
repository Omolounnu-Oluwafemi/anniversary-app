import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { photos, bgPhotos } from '../data';

const TILTS = [-2.8, 2.2, -1.8, 3.0, -2.4, 1.6, -3.2, 2.8, -1.4, 2.6, -2.0, 3.2];

// Subtle diagonal-stripe texture for card backs
const BACK_PATTERN = `repeating-linear-gradient(
  -45deg,
  transparent,
  transparent 5px,
  rgba(196,53,96,0.05) 5px,
  rgba(196,53,96,0.05) 6px
)`;

export default function GalleryPage() {
  const [flipped, setFlipped] = useState({});
  const [lightbox, setLightbox] = useState(null);

  const bg = bgPhotos.gallery
    ? `radial-gradient(ellipse at 50% 40%, rgba(58,13,32,0.85) 0%, rgba(12,2,8,0.95) 70%), url(${bgPhotos.gallery}) center / cover no-repeat`
    : 'radial-gradient(ellipse at 50% 40%, #3a0d20 0%, #0c0208 70%)';

  function handleCardClick(i) {
    if (!flipped[i]) {
      setFlipped(prev => ({ ...prev, [i]: true }));
    } else if (photos[i].src) {
      setLightbox(i);
    }
  }

  function prev() { setLightbox(i => (i - 1 + photos.length) % photos.length); }
  function next() { setLightbox(i => (i + 1) % photos.length); }

  const portal = createPortal(
    <AnimatePresence>
      {lightbox !== null && (
        <>
          <motion.div
            key="lb-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            style={{
              position: 'fixed', inset: 0, zIndex: 300,
              background: 'rgba(4,1,6,0.94)',
              backdropFilter: 'blur(14px)',
            }}
          />

          <motion.div
            key={`lb-${lightbox}`}
            initial={{ opacity: 0, scale: 0.88, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.34, 1.1, 0.64, 1] }}
            style={{
              position: 'fixed', inset: '5vh 5vw',
              zIndex: 301,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              pointerEvents: 'none',
            }}
          >
            <img
              src={photos[lightbox].src}
              alt={photos[lightbox].month}
              style={{
                maxWidth: '100%',
                maxHeight: 'calc(84vh - 90px)',
                objectFit: 'contain',
                borderRadius: 6,
                boxShadow: '0 32px 100px rgba(0,0,0,0.8)',
                pointerEvents: 'auto',
              }}
            />
            <p style={{
              fontFamily: 'var(--sans)', fontSize: 10,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'rgba(196,120,144,0.7)',
              marginTop: '1.2rem', textAlign: 'center',
              pointerEvents: 'none',
            }}>
              {photos[lightbox].month}
            </p>
            {photos[lightbox].caption && (
              <p style={{
                fontFamily: 'var(--serif)', fontStyle: 'italic',
                color: 'rgba(255,240,244,0.45)', fontSize: '0.9rem',
                marginTop: '0.3rem', textAlign: 'center',
              }}>
                {photos[lightbox].caption}
              </p>
            )}
          </motion.div>

          <div style={{
            position: 'fixed', top: '1.5rem', left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 302,
            fontFamily: 'var(--sans)', fontSize: 11,
            letterSpacing: '0.22em',
            color: 'rgba(255,240,244,0.28)',
          }}>
            {lightbox + 1} / {photos.filter(p => p.src).length}
          </div>

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
      {/* Ambient glow */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(ellipse 70% 50% at 50% 25%, rgba(196,53,96,0.1) 0%, transparent 70%)',
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
            one photo · one month
          </span>
          <h2 style={{
            fontFamily: 'var(--serif)', fontSize: 'clamp(1.8rem, 5vw, 2.6rem)',
            fontWeight: 300, color: 'rgba(255,240,244,0.7)',
            lineHeight: 1.2,
          }}>
            A year in{' '}
            <em style={{
              fontStyle: 'italic',
              background: 'linear-gradient(135deg, #f5aac0 0%, #d95880 50%, #b0304e 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              pictures
            </em>
          </h2>
          <p style={{
            fontFamily: 'var(--serif)', fontStyle: 'italic',
            color: 'rgba(255,240,244,0.28)', fontSize: '0.82rem',
            marginTop: '0.5rem',
          }}>
            tap each card to reveal ♥
          </p>
        </motion.div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1.75rem 1.25rem',
          maxWidth: 560,
          margin: '0 auto',
        }}>
          {photos.map((photo, i) => {
            const isFlipped = !!flipped[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: i * 0.06, ease: [0.34, 1.1, 0.64, 1] }}
                style={{ perspective: '1000px' }}
              >
                {/* Flip wrapper */}
                <motion.div
                  animate={{
                    rotateY: isFlipped ? 180 : 0,
                    rotate: isFlipped ? 0 : TILTS[i],
                  }}
                  transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                  whileHover={!isFlipped
                    ? { scale: 1.06, rotate: 0, y: -6, zIndex: 10, transition: { duration: 0.2 } }
                    : { scale: 1.03, zIndex: 10, transition: { duration: 0.2 } }
                  }
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleCardClick(i)}
                  style={{
                    transformStyle: 'preserve-3d',
                    cursor: 'pointer',
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '3 / 4.5',
                    boxShadow: '0 8px 28px rgba(0,0,0,0.55), 0 2px 6px rgba(0,0,0,0.3)',
                    borderRadius: 2,
                  }}
                >

                  {/* ── BACK FACE ── */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    borderRadius: 2,
                    overflow: 'hidden',
                    background: `linear-gradient(160deg, #3a0d20 0%, #200613 55%, #0c0208 100%)`,
                    backgroundImage: `${BACK_PATTERN}, linear-gradient(160deg, #3a0d20 0%, #200613 55%, #0c0208 100%)`,
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    gap: '0.6rem',
                    padding: '1.5rem',
                  }}>
                    <div style={{ width: 28, height: '0.5px', background: 'rgba(196,120,144,0.35)' }} />

                    <span style={{
                      fontFamily: 'var(--sans)', fontSize: 8,
                      letterSpacing: '0.28em', textTransform: 'uppercase',
                      color: '#c47890',
                    }}>
                      {photo.month}
                    </span>

                    <motion.span
                      animate={{ scale: [1, 1.25, 1], opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }}
                      style={{
                        fontSize: '1.6rem', color: '#c43560',
                        display: 'block', lineHeight: 1,
                      }}
                    >
                      ♥
                    </motion.span>

                    <span style={{
                      fontFamily: 'var(--serif)', fontStyle: 'italic',
                      fontSize: '0.65rem', color: 'rgba(255,220,230,0.35)',
                    }}>
                      tap to reveal
                    </span>

                    <div style={{ width: 28, height: '0.5px', background: 'rgba(196,120,144,0.35)' }} />
                  </div>

                  {/* ── FRONT FACE ── */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    borderRadius: 2,
                    background: 'white',
                    display: 'flex', flexDirection: 'column',
                    padding: '0.55rem 0.55rem 0',
                    overflow: 'hidden',
                  }}>
                    {/* Photo / apology area */}
                    <div style={{
                      flex: 1, overflow: 'hidden',
                      position: 'relative',
                      background: photo.src ? '#1a0810' : '#1c0812',
                    }}>
                      {photo.src ? (
                        <img
                          src={photo.src}
                          alt={photo.month}
                          style={{
                            position: 'absolute', inset: 0,
                            width: '100%', height: '100%',
                            objectFit: 'cover', display: 'block',
                          }}
                        />
                      ) : (
                        // Beautiful apology for missing photos
                        <div style={{
                          position: 'absolute', inset: 0,
                          display: 'flex', flexDirection: 'column',
                          alignItems: 'center', justifyContent: 'center',
                          padding: '1rem 0.85rem',
                          background: 'linear-gradient(160deg, #5c1a32 0%, #3a0d20 60%, #220810 100%)',
                        }}>
                          <span style={{
                            fontSize: '1.2rem', color: '#e882a8',
                            marginBottom: '0.7rem', display: 'block',
                          }}>
                            ♥
                          </span>
                          <p style={{
                            fontFamily: 'var(--serif)', fontStyle: 'italic',
                            fontSize: '0.72rem',
                            color: 'rgba(255,228,238,0.92)',
                            lineHeight: 1.75,
                            textAlign: 'center',
                          }}>
                            {photo.apology}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Month strip */}
                    <div style={{
                      flexShrink: 0,
                      textAlign: 'center',
                      padding: '0.4rem 0.2rem 0.5rem',
                    }}>
                      <span style={{
                        display: 'block',
                        fontFamily: 'var(--sans)', fontSize: 8,
                        letterSpacing: '0.2em', textTransform: 'uppercase',
                        color: '#c43560', fontWeight: 500,
                      }}>
                        {photo.month}
                      </span>
                      {photo.caption && (
                        <span style={{
                          display: 'block',
                          fontFamily: 'var(--serif)', fontStyle: 'italic',
                          fontSize: '0.58rem', color: '#7a4055',
                          lineHeight: 1.3, marginTop: 2,
                        }}>
                          {photo.caption}
                        </span>
                      )}
                      {/* Hint to open full view for photo months */}
                      {photo.src && (
                        <span style={{
                          display: 'block',
                          fontFamily: 'var(--sans)', fontSize: 7,
                          letterSpacing: '0.12em',
                          color: 'rgba(196,67,96,0.4)',
                          marginTop: 3,
                        }}>
                          tap again to expand
                        </span>
                      )}
                    </div>
                  </div>

                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {portal}
    </div>
  );
}
