import { motion } from 'framer-motion';

export default function NavBar({ current, total, onNext, onPrev, dark }) {
  const fg = dark ? 'rgba(255,255,255,0.4)' : 'rgba(26,12,18,0.4)';
  const fgActive = dark ? '#f5d8e4' : '#c43560';
  const borderColor = dark ? 'rgba(255,255,255,0.1)' : 'rgba(196,53,96,0.22)';

  return (
    <div style={{
      position: 'fixed', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
      zIndex: 100, display: 'flex', alignItems: 'center', gap: '1.5rem',
      background: dark ? 'rgba(18,5,13,0.65)' : 'rgba(255,248,249,0.75)',
      backdropFilter: 'blur(12px)',
      border: `0.5px solid ${borderColor}`,
      borderRadius: '100px',
      padding: '0.5rem 1.25rem',
    }}>
      <button
        onClick={onPrev}
        disabled={current === 0}
        style={{
          color: current === 0 ? (dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)') : fgActive,
          fontSize: '18px', padding: '2px 6px', transition: 'color 0.2s',
          lineHeight: 1,
        }}
        aria-label="Previous page"
      >←</button>

      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
        {Array.from({ length: total }).map((_, i) => (
          <motion.div
            key={i}
            animate={{ width: i === current ? 20 : 6, background: i === current ? fgActive : fg }}
            transition={{ duration: 0.3 }}
            style={{ height: 6, borderRadius: 3 }}
          />
        ))}
      </div>

      <button
        onClick={onNext}
        disabled={current === total - 1}
        style={{
          color: current === total - 1 ? (dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)') : fgActive,
          fontSize: '18px', padding: '2px 6px', transition: 'color 0.2s',
          lineHeight: 1,
        }}
        aria-label="Next page"
      >→</button>
    </div>
  );
}
