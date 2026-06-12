import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { prayers, bgPhotos } from '../data';

export default function PrayerPage() {
  const [active, setActive] = useState(null);

  const bg = bgPhotos.witness
    ? `radial-gradient(ellipse at 50% 30%, rgba(18,6,30,0.88) 0%, rgba(6,2,14,0.95) 70%), url(${bgPhotos.witness}) center / cover no-repeat`
    : 'radial-gradient(ellipse at 50% 30%, #12061e 0%, #06020e 70%)';

  return (
    <div style={{
      width: '100%', height: '100%', overflow: 'auto',
      background: bg,
      position: 'relative',
    }}>
      {/* Ambient glow */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(ellipse 60% 40% at 50% 20%, rgba(180,100,200,0.1) 0%, transparent 70%)',
      }} />

      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: 540, margin: '0 auto',
        padding: '3.5rem 1.5rem 5rem',
      }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <p style={{
            fontFamily: 'var(--sans)', fontSize: 9, letterSpacing: '0.35em',
            textTransform: 'uppercase', color: 'rgba(196,120,180,0.5)',
            marginBottom: '0.6rem',
          }}>
            a prayer for every month
          </p>
          <h2 style={{
            fontFamily: 'var(--serif)', fontSize: 'clamp(1.9rem, 5vw, 2.8rem)',
            fontWeight: 300, color: 'rgba(255,240,252,0.88)',
            lineHeight: 1.2, marginBottom: '0.75rem',
          }}>
            12 Prayers{' '}
            <em style={{
              fontStyle: 'italic',
              background: 'linear-gradient(135deg, #e8a8d8 0%, #c43580 50%, #8b2050 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Over Us
            </em>
          </h2>
          <p style={{
            fontFamily: 'var(--serif)', fontStyle: 'italic',
            fontSize: '0.88rem', color: 'rgba(255,240,252,0.3)',
            lineHeight: 1.7,
          }}>
            One scripture. One prayer. One month at a time.
          </p>
        </motion.div>

        {/* Prayer cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {prayers.map((p, i) => (
            <motion.div
              key={p.month}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.06 }}
            >
              <motion.button
                onClick={() => setActive(active === i ? null : i)}
                whileHover={{ scale: 1.012 }}
                whileTap={{ scale: 0.99 }}
                style={{
                  width: '100%', textAlign: 'left',
                  background: active === i
                    ? 'rgba(196,53,120,0.08)'
                    : 'rgba(255,240,252,0.03)',
                  border: `0.5px solid ${active === i ? 'rgba(196,53,120,0.35)' : 'rgba(255,240,252,0.08)'}`,
                  borderRadius: 10, padding: '1.1rem 1.3rem',
                  cursor: 'pointer',
                  transition: 'background 0.25s, border-color 0.25s',
                }}
              >
                {/* Row: month + reference + chevron */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{
                      fontFamily: 'var(--sans)', fontSize: 9,
                      letterSpacing: '0.25em', textTransform: 'uppercase',
                      color: active === i ? '#c43580' : 'rgba(196,120,180,0.45)',
                      display: 'block', marginBottom: '0.2rem',
                      transition: 'color 0.25s',
                    }}>
                      {p.month}
                    </span>
                    <span style={{
                      fontFamily: 'var(--serif)', fontStyle: 'italic',
                      fontSize: '0.95rem',
                      color: active === i ? 'rgba(255,240,252,0.88)' : 'rgba(255,240,252,0.55)',
                      transition: 'color 0.25s',
                    }}>
                      {p.reference}
                    </span>
                  </div>
                  <motion.span
                    animate={{ rotate: active === i ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    style={{
                      color: active === i ? '#c43580' : 'rgba(255,240,252,0.2)',
                      fontSize: '1rem', lineHeight: 1, flexShrink: 0,
                    }}
                  >
                    ›
                  </motion.span>
                </div>

                {/* Expanded content */}
                <AnimatePresence initial={false}>
                  {active === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{ paddingTop: '1rem' }}>
                        {/* Scripture verse */}
                        <p style={{
                          fontFamily: 'var(--serif)', fontStyle: 'italic',
                          fontSize: '0.88rem',
                          color: 'rgba(232,168,216,0.65)',
                          lineHeight: 1.7, marginBottom: '1rem',
                          borderLeft: '2px solid rgba(196,53,120,0.3)',
                          paddingLeft: '0.9rem',
                        }}>
                          {p.verse}
                        </p>
                        {/* Prayer text */}
                        <p style={{
                          fontFamily: 'var(--serif)',
                          fontSize: '0.93rem',
                          color: 'rgba(255,240,252,0.72)',
                          lineHeight: 1.8,
                        }}>
                          {p.prayer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          style={{
            fontFamily: 'var(--serif)', fontStyle: 'italic',
            fontSize: '0.82rem', color: 'rgba(255,240,252,0.2)',
            textAlign: 'center', marginTop: '3rem', lineHeight: 1.8,
          }}
        >
          Tap each month to open its prayer
        </motion.p>
      </div>
    </div>
  );
}
