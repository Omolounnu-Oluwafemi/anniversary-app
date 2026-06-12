import { motion } from 'framer-motion';
import { anniversaryDate, bgPhotos } from '../data';

const PETALS = Array.from({ length: 32 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 105 - 2.5}%`,
  duration: 6 + Math.random() * 9,
  delay: Math.random() * 14,
  size: 6 + Math.random() * 11,
  hue: 332 + Math.random() * 32,
  sat: 58 + Math.random() * 28,
  lit: 46 + Math.random() * 24,
  drift: (Math.random() - 0.5) * 90,
}));

function Petals() {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {PETALS.map(p => (
        <motion.div
          key={p.id}
          style={{
            position: 'absolute',
            left: p.left,
            top: '-24px',
            width: p.size,
            height: p.size * 1.65,
            borderRadius: '50% 50% 50% 0',
            background: `hsl(${p.hue}, ${p.sat}%, ${p.lit}%)`,
          }}
          animate={{
            y: ['0vh', '112vh'],
            x: [0, p.drift],
            rotate: [0, 380],
            opacity: [0, 0.75, 0.55, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.3 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.4, 0, 0.2, 1] } },
};

export default function HeroPage({ onNext }) {
  const bg = bgPhotos.hero
    ? `radial-gradient(ellipse at 50% 55%, rgba(74,13,34,0.82) 0%, rgba(32,6,19,0.88) 58%, rgba(12,2,8,0.94) 100%), url(${bgPhotos.hero}) center 20% / cover no-repeat`
    : 'radial-gradient(ellipse at 50% 55%, #4a0d22 0%, #200613 58%, #0c0208 100%)';

  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative',
      background: bg,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      textAlign: 'center', padding: '2rem',
    }}>
      <Petals />

      {/* Deep rose bloom glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 65% 52% at 50% 50%, rgba(210,50,95,0.2) 0%, transparent 70%)',
      }} />
      {/* Vignette */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 120% 100% at 50% 50%, transparent 40%, rgba(6,1,5,0.55) 100%)',
      }} />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        style={{ position: 'relative', zIndex: 2, maxWidth: 560 }}
      >
        <motion.p variants={fadeUp} style={{
          fontFamily: 'var(--sans)', fontSize: 10, letterSpacing: '0.32em',
          textTransform: 'uppercase', color: '#d4748e', marginBottom: '1.5rem',
        }}>
          ♥ one whole year with you ♥
        </motion.p>

        <motion.h1 variants={fadeUp} style={{
          fontFamily: 'var(--serif)', fontSize: 'clamp(3.5rem, 10vw, 7rem)',
          fontWeight: 300, lineHeight: 1.05, color: '#fff0f3', marginBottom: '1rem',
        }}>
          To my<br />
          <em style={{
            fontStyle: 'italic',
            background: 'linear-gradient(135deg, #f5aac0 0%, #d95880 45%, #b0304e 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>favourite<br />person</em>
        </motion.h1>

        {/* Heartbeat */}
        <motion.div variants={fadeUp} style={{ marginBottom: '0.8rem' }}>
          <motion.span
            animate={{ scale: [1, 1.35, 1, 1.2, 1, 1] }}
            transition={{
              duration: 2.4,
              times: [0, 0.08, 0.18, 0.26, 0.36, 1],
              repeat: Infinity,
              repeatDelay: 1.2,
              ease: 'easeInOut',
            }}
            style={{ display: 'inline-block', fontSize: '1.4rem', color: '#c43560' }}
          >
            ♥
          </motion.span>
        </motion.div>

        <motion.p variants={fadeUp} style={{
          fontFamily: 'var(--serif)', fontStyle: 'italic',
          fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
          color: 'rgba(255,228,235,0.58)', marginBottom: '2.5rem', lineHeight: 1.7,
        }}>
          Every day with you has been a gift<br />I didn't know I needed.
        </motion.p>

        <motion.div variants={fadeUp} style={{
          display: 'inline-block',
          borderTop: '0.5px solid rgba(210,100,140,0.35)',
          borderBottom: '0.5px solid rgba(210,100,140,0.35)',
          padding: '0.5rem 2rem', marginBottom: '3rem',
          fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'rgba(255,210,225,0.48)',
        }}>
          {anniversaryDate}
        </motion.div>

        <motion.div variants={fadeUp}>
          <button
            onClick={onNext}
            style={{
              fontFamily: 'var(--sans)', fontSize: 11, letterSpacing: '0.22em',
              textTransform: 'uppercase', color: '#ffe0ea',
              border: '0.5px solid rgba(210,90,130,0.5)',
              padding: '0.85rem 2.5rem', borderRadius: 2,
              background: 'rgba(200,50,90,0.12)',
              cursor: 'pointer',
              transition: 'background 0.25s, border-color 0.25s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(200,50,90,0.28)';
              e.currentTarget.style.borderColor = 'rgba(210,90,130,0.9)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(200,50,90,0.12)';
              e.currentTarget.style.borderColor = 'rgba(210,90,130,0.5)';
            }}
          >
            Open surprise →
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
