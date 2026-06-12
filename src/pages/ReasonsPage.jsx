import { motion } from 'framer-motion';
import { reasons, bgPhotos } from '../data';

export default function ReasonsPage() {
  const bg = bgPhotos.reasons
    ? `linear-gradient(160deg, rgba(28,8,18,0.88) 0%, rgba(14,4,10,0.92) 100%), url(${bgPhotos.reasons}) center 15% / cover no-repeat`
    : 'linear-gradient(160deg, #1c0812 0%, #0e040a 100%)';

  return (
    <div style={{
      width: '100%', height: '100%', overflow: 'auto',
      background: bg,
    }}>
      {/* Ambient glow */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(ellipse 65% 45% at 50% 20%, rgba(196,53,96,0.09) 0%, transparent 70%)',
      }} />

      <div style={{ position: 'relative', zIndex: 1, padding: '4rem 1.25rem 8rem', maxWidth: 600, margin: '0 auto' }}>

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
            one thought for every day
          </span>
          <h2 style={{
            fontFamily: 'var(--serif)', fontSize: 'clamp(1.8rem, 5vw, 2.6rem)',
            fontWeight: 300, color: 'rgba(255,240,244,0.75)',
            lineHeight: 1.2,
          }}>
            A month{' '}
            <em style={{
              fontStyle: 'italic',
              background: 'linear-gradient(135deg, #f5aac0 0%, #d95880 50%, #b0304e 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              of you
            </em>
          </h2>
          <p style={{
            fontFamily: 'var(--serif)', fontStyle: 'italic',
            color: 'rgba(255,240,244,0.28)', fontSize: '0.85rem',
            marginTop: '0.6rem', lineHeight: 1.6,
          }}>
            Thirty days. Thirty moments I carry with me.
          </p>
        </motion.div>

        {/* Day cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {reasons.map((r, i) => (
            <motion.div
              key={r.day}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: i * 0.04, ease: [0.34, 1.1, 0.64, 1] }}
              style={{
                display: 'flex',
                gap: '1rem',
                alignItems: 'flex-start',
                background: 'rgba(255,255,255,0.03)',
                border: '0.5px solid rgba(196,120,144,0.13)',
                borderRadius: 8,
                padding: '1rem 1.15rem',
              }}
            >
              {/* Day number */}
              <div style={{
                flexShrink: 0,
                width: 36,
                paddingTop: '0.1rem',
              }}>
                <span style={{
                  display: 'block',
                  fontFamily: 'var(--sans)', fontSize: 8,
                  letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: 'rgba(196,120,144,0.45)',
                  lineHeight: 1,
                  marginBottom: 3,
                }}>
                  day
                </span>
                <span style={{
                  fontFamily: 'var(--serif)',
                  fontSize: '1.35rem',
                  fontWeight: 300,
                  color: '#c43560',
                  lineHeight: 1,
                }}>
                  {String(r.day).padStart(2, '0')}
                </span>
              </div>

              {/* Divider */}
              <div style={{
                width: '0.5px',
                alignSelf: 'stretch',
                background: 'rgba(196,120,144,0.15)',
                flexShrink: 0,
              }} />

              {/* Note */}
              <p style={{
                fontFamily: 'var(--serif)', fontStyle: 'italic',
                fontSize: '0.9rem',
                color: 'rgba(255,228,238,0.72)',
                lineHeight: 1.75,
                margin: 0,
              }}>
                {r.note}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          style={{
            textAlign: 'center', marginTop: '2.5rem',
            fontFamily: 'var(--serif)', fontStyle: 'italic',
            fontSize: '0.88rem', color: 'rgba(196,120,144,0.4)',
          }}
        >
          and every day after this one ♥
        </motion.p>
      </div>
    </div>
  );
}
