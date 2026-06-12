import { motion } from 'framer-motion';
import { names, letter, bgPhotos } from '../data';

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const line = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } },
};

export default function LetterPage() {
  const paragraphs = letter.split('\n\n');
  const bg = bgPhotos.letter
    ? `linear-gradient(rgba(255,248,249,0.88), rgba(255,248,249,0.88)), url(${bgPhotos.letter}) center 15% / cover no-repeat`
    : 'var(--cream)';

  return (
    <div style={{
      width: '100%', height: '100%', overflow: 'auto',
      background: bg,
      display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
      padding: '4rem 2rem 8rem',
    }}>
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        style={{ maxWidth: 640, width: '100%' }}
      >
        <motion.span variants={line} style={{
          display: 'block', fontFamily: 'var(--sans)', fontSize: 10,
          letterSpacing: '0.3em', textTransform: 'uppercase',
          color: 'var(--rose)', marginBottom: '1rem',
        }}>
          A letter from the heart
        </motion.span>

        <motion.h2 variants={line} style={{
          fontFamily: 'var(--serif)', fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 300, color: 'var(--ink)', marginBottom: '0.5rem',
          lineHeight: 1.2,
        }}>
          My dearest{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--rose)' }}>{names.hers},</em>
        </motion.h2>

        <motion.div variants={line} style={{
          width: 48, height: 1, background: 'var(--rose-light)', marginBottom: '2rem',
        }} />

        {paragraphs.map((para, i) => (
          <motion.p key={i} variants={line} style={{
            fontFamily: 'var(--serif)', fontSize: 'clamp(1.05rem, 2.5vw, 1.2rem)',
            lineHeight: 1.95, color: 'var(--ink-soft)', marginBottom: '1.5rem',
            whiteSpace: 'pre-line',
          }}>
            {para}
          </motion.p>
        ))}

        <motion.p variants={line} style={{
          fontFamily: 'var(--serif)', fontSize: '1.4rem', fontStyle: 'italic',
          color: 'var(--rose)', marginTop: '1rem', lineHeight: 1.6,
        }}>
          Forever yours,<br />
          <span style={{ fontSize: '1.6rem' }}>{names.yours} 🌹</span>
        </motion.p>
      </motion.div>
    </div>
  );
}
