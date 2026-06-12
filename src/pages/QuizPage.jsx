import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { quizQuestions, bgPhotos } from '../data';

const RESULT_MSGS = [
  "We're still learning each other — and I love that journey 💕",
  "Not bad at all! But the best is still ahead of us 🌹",
  "You know us well, my love ❤️",
  "Perfect score. Just like you. ✨",
];

export default function QuizPage({ onNext }) {
  const [open,   setOpen]   = useState(false);
  const [idx,    setIdx]    = useState(0);
  const [score,  setScore]  = useState(0);
  const [chosen, setChosen] = useState(null);
  const [done,   setDone]   = useState(false);

  const q        = quizQuestions[idx];
  const answered = chosen !== null;

  const bg = bgPhotos.quiz
    ? `linear-gradient(160deg, rgba(30,8,18,0.88) 0%, rgba(40,10,24,0.88) 100%), url(${bgPhotos.quiz}) center 15% / cover no-repeat`
    : 'linear-gradient(160deg, #1e0812 0%, #280a18 100%)';

  function start() {
    setIdx(0); setScore(0); setChosen(null); setDone(false);
    setOpen(true);
  }

  function choose(i) {
    if (answered) return;
    setChosen(i);
    if (i === q.correct) setScore(s => s + 1);
  }

  function next() {
    if (idx + 1 < quizQuestions.length) {
      setIdx(i => i + 1);
      setChosen(null);
    } else {
      setDone(true);
    }
  }

  function close() {
    setOpen(false);
    setTimeout(() => { setIdx(0); setScore(0); setChosen(null); setDone(false); onNext?.(); }, 450);
  }

  const modal = createPortal(
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="qz-bd"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 300,
              background: 'rgba(4,0,8,0.9)',
              backdropFilter: 'blur(18px)',
            }}
          />

          {/* Centering wrapper — keeps transform free for Framer Motion */}
          <div
            key="qz-center"
            style={{
              position: 'fixed', inset: 0, zIndex: 301,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '1.5rem',
              pointerEvents: 'none',
            }}
          >
          <motion.div
            key="qz-card"
            initial={{ opacity: 0, y: 48, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.97 }}
            transition={{ duration: 0.42, ease: [0.34, 1.1, 0.64, 1] }}
            style={{
              pointerEvents: 'auto',
              width: 'min(92vw, 460px)',
              background: q.photo && !done
                ? `linear-gradient(160deg, rgba(12,3,8,0.86) 0%, rgba(20,5,14,0.82) 100%), url(${q.photo}) center / cover no-repeat`
                : 'rgba(20,5,14,0.97)',
              border: '0.5px solid rgba(196,120,144,0.2)',
              borderRadius: 18,
              padding: '2rem 1.75rem',
              boxShadow: '0 40px 90px rgba(0,0,0,0.88), 0 0 0 0.5px rgba(196,53,96,0.08)',
              overflow: 'hidden',
              transition: 'background 0.4s',
            }}
          >
            <AnimatePresence mode="wait">
              {!done ? (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.28 }}
                >
                  {/* Progress dots */}
                  <div style={{
                    display: 'flex', justifyContent: 'center', gap: 7,
                    marginBottom: '1.5rem',
                  }}>
                    {quizQuestions.map((_, i) => (
                      <div key={i} style={{
                        width: 8, height: 8, borderRadius: '50%',
                        background: i < idx
                          ? '#c43560'
                          : i === idx
                          ? 'rgba(196,53,96,0.5)'
                          : 'rgba(255,255,255,0.1)',
                        transition: 'background 0.3s',
                      }} />
                    ))}
                  </div>

                  {/* Question */}
                  <p style={{
                    fontFamily: 'var(--serif)',
                    fontSize: 'clamp(1.05rem, 3.5vw, 1.25rem)',
                    color: 'rgba(255,240,244,0.88)',
                    lineHeight: 1.55, marginBottom: '1.5rem',
                    textAlign: 'center',
                  }}>
                    {q.q}
                  </p>

                  {/* Options */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                    {q.options.map((opt, i) => {
                      let bg   = 'rgba(255,240,244,0.04)';
                      let bdr  = 'rgba(255,240,244,0.1)';
                      let col  = 'rgba(255,240,244,0.7)';
                      if (answered) {
                        if (i === q.correct)    { bg = 'rgba(80,140,80,0.18)';  bdr = '#7dab7d'; col = '#c8e6c8'; }
                        else if (i === chosen)  { bg = 'rgba(180,80,60,0.18)';  bdr = '#c06050'; col = '#f0b8b0'; }
                        else                   { col = 'rgba(255,240,244,0.22)'; }
                      }
                      return (
                        <motion.button
                          key={i}
                          onClick={() => choose(i)}
                          whileHover={!answered ? { x: 4, background: 'rgba(255,240,244,0.08)' } : {}}
                          whileTap={!answered ? { scale: 0.98 } : {}}
                          style={{
                            background: bg, border: `0.5px solid ${bdr}`,
                            borderRadius: 8, padding: '0.82rem 1.1rem',
                            textAlign: 'left', fontFamily: 'var(--sans)',
                            fontSize: '0.88rem', color: col,
                            cursor: answered ? 'default' : 'pointer',
                            transition: 'background 0.18s, border-color 0.18s, color 0.18s',
                          }}
                        >
                          {opt}
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Feedback + next */}
                  <AnimatePresence>
                    {answered && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ marginTop: '1.25rem', textAlign: 'center' }}
                      >
                        <p style={{
                          fontFamily: 'var(--serif)', fontStyle: 'italic',
                          color: 'rgba(245,216,228,0.65)', fontSize: '0.88rem',
                          marginBottom: '1rem', lineHeight: 1.6,
                        }}>
                          {chosen === q.correct ? q.feedback : "Not quite — but I love that you tried 💕"}
                        </p>
                        <motion.button
                          onClick={next}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.96 }}
                          style={{
                            background: '#c43560', color: 'white', border: 'none',
                            fontFamily: 'var(--sans)', fontSize: 10,
                            letterSpacing: '0.2em', textTransform: 'uppercase',
                            padding: '0.65rem 2rem', borderRadius: 2, cursor: 'pointer',
                          }}
                        >
                          {idx + 1 < quizQuestions.length ? 'Next →' : 'See your score →'}
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.42, ease: [0.34, 1.1, 0.64, 1] }}
                  style={{ textAlign: 'center', padding: '0.5rem 0' }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    style={{
                      fontFamily: 'var(--serif)', fontSize: '5rem', fontWeight: 300,
                      color: '#c43560', lineHeight: 1,
                    }}
                  >
                    {score}
                    <span style={{ fontSize: '1.8rem', color: 'rgba(196,53,96,0.4)' }}>
                      /{quizQuestions.length}
                    </span>
                  </motion.div>

                  <p style={{
                    fontFamily: 'var(--serif)', fontStyle: 'italic',
                    fontSize: '1rem', color: 'rgba(245,216,228,0.75)',
                    marginTop: '1rem', lineHeight: 1.7,
                  }}>
                    {RESULT_MSGS[Math.min(score, RESULT_MSGS.length - 1)]}
                  </p>

                  <motion.button
                    onClick={close}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                    style={{
                      marginTop: '1.5rem',
                      background: 'rgba(196,53,96,0.1)',
                      border: '0.5px solid rgba(196,53,96,0.35)',
                      color: '#c43560',
                      fontFamily: 'var(--sans)', fontSize: 10,
                      letterSpacing: '0.2em', textTransform: 'uppercase',
                      padding: '0.65rem 2rem', borderRadius: 2, cursor: 'pointer',
                    }}
                  >
                    Close ♥
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );

  return (
    <div style={{
      width: '100%', height: '100%', overflow: 'auto',
      background: bg,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '2rem',
    }}>
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(ellipse 65% 45% at 50% 35%, rgba(196,53,96,0.09) 0%, transparent 70%)',
      }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}
      >
        <span style={{
          display: 'block', fontFamily: 'var(--sans)', fontSize: 9,
          letterSpacing: '0.3em', textTransform: 'uppercase',
          color: 'rgba(196,120,144,0.55)', marginBottom: '0.4rem',
        }}>
          how well do you know us?
        </span>
        <h2 style={{
          fontFamily: 'var(--serif)', fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
          fontWeight: 300, color: 'rgba(255,240,244,0.75)', lineHeight: 1.2,
          marginBottom: '0.5rem',
        }}>
          The{' '}
          <em style={{
            fontStyle: 'italic',
            background: 'linear-gradient(135deg, #f5aac0 0%, #d95880 50%, #b0304e 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            us
          </em>{' '}
          quiz
        </h2>
        <p style={{
          fontFamily: 'var(--serif)', fontStyle: 'italic',
          fontSize: '0.85rem', color: 'rgba(255,240,244,0.28)',
          marginBottom: '2rem', lineHeight: 1.6,
        }}>
          {quizQuestions.length} questions — answer honestly ♥
        </p>

        <motion.button
          onClick={start}
          whileHover={{ scale: 1.06, y: -2 }}
          whileTap={{ scale: 0.97 }}
          style={{
            background: '#c43560', color: 'white', border: 'none',
            fontFamily: 'var(--sans)', fontSize: 11,
            letterSpacing: '0.22em', textTransform: 'uppercase',
            padding: '0.88rem 2.5rem', borderRadius: 2, cursor: 'pointer',
            boxShadow: '0 8px 28px rgba(196,53,96,0.35)',
          }}
        >
          Start ♥
        </motion.button>
      </motion.div>

      {modal}
    </div>
  );
}
