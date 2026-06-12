import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { bgPhotos } from '../data';

// ── WORD SEARCH ───────────────────────────────────────────────────────────────

const SEARCH_WORDS = ['TOYOSI', 'JUNE', 'FEMI', 'HOME', 'LOVE', 'HEART', 'MINE', 'OURS'];

function cellKey(r, c) { return `${r}-${c}`; }

function getLineCells(start, end) {
  const [r1, c1] = start;
  const [r2, c2] = end;
  const dr = r2 - r1, dc = c2 - c1;
  if (dr !== 0 && dc !== 0) return null;
  const cells = [];
  if (dr === 0) {
    const step = dc >= 0 ? 1 : -1;
    for (let c = c1; c !== c2 + step; c += step) cells.push([r1, c]);
  } else {
    const step = dr >= 0 ? 1 : -1;
    for (let r = r1; r !== r2 + step; r += step) cells.push([r, c1]);
  }
  return cells;
}

function buildGrid() {
  const S = 10;
  const g = Array.from({ length: S }, () => Array(S).fill(''));
  const wc = {};
  for (const word of SEARCH_WORDS) {
    let placed = false;
    for (let t = 0; t < 400 && !placed; t++) {
      const horiz = Math.random() < 0.5;
      const r = Math.floor(Math.random() * S);
      const c = Math.floor(Math.random() * S);
      if (horiz && c + word.length > S) continue;
      if (!horiz && r + word.length > S) continue;
      let ok = true;
      for (let i = 0; i < word.length && ok; i++) {
        const cr = horiz ? r : r + i;
        const cc = horiz ? c + i : c;
        if (g[cr][cc] && g[cr][cc] !== word[i]) ok = false;
      }
      if (ok) {
        const cells = [];
        for (let i = 0; i < word.length; i++) {
          const cr = horiz ? r : r + i;
          const cc = horiz ? c + i : c;
          g[cr][cc] = word[i];
          cells.push([cr, cc]);
        }
        wc[word] = cells;
        placed = true;
      }
    }
    if (!placed) return null;
  }
  const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let r = 0; r < S; r++)
    for (let c = 0; c < S; c++)
      if (!g[r][c]) g[r][c] = alpha[Math.floor(Math.random() * alpha.length)];
  return { grid: g, wCells: wc };
}

function makeGridData() {
  for (let i = 0; i < 30; i++) {
    const d = buildGrid();
    if (d) return d;
  }
  return buildGrid();
}

function WordSearch() {
  const gridElRef = useRef(null);

  // Grid regenerated each reset — gdRef kept fresh by reset() directly
  const [gd, setGd] = useState(makeGridData);
  const gdRef       = useRef(gd);

  // Render state
  const [found,     _setFound]     = useState(new Set());
  const [dragCells, _setDragCells] = useState([]);
  const [flash,     setFlash]      = useState(null);

  // Refs so the once-registered native handlers never go stale
  const foundRef     = useRef(new Set());
  const dragCellsRef = useRef([]);
  const draggingRef  = useRef(false);
  const dragStartRef = useRef(null);

  function setFound(v)     { foundRef.current = v;     _setFound(v); }
  function setDragCells(v) { dragCellsRef.current = v; _setDragCells(v); }

  function reset() {
    const fresh = makeGridData();
    gdRef.current = fresh;
    setGd(fresh);
    setFound(new Set());
    setDragCells([]);
    draggingRef.current  = false;
    dragStartRef.current = null;
    setFlash(null);
  }

  // Attach touch listeners as non-passive so preventDefault works
  useEffect(() => {
    const el = gridElRef.current;
    if (!el) return;

    function cellFromPoint(clientX, clientY) {
      const rect = el.getBoundingClientRect();
      const cw   = rect.width / 10;
      const col  = Math.floor((clientX - rect.left) / cw);
      const row  = Math.floor((clientY - rect.top)  / cw);
      if (row < 0 || row >= 10 || col < 0 || col >= 10) return null;
      return [row, col];
    }

    function onStart(e) {
      e.preventDefault(); e.stopPropagation();
      const cell = cellFromPoint(e.touches[0].clientX, e.touches[0].clientY);
      if (!cell) return;
      draggingRef.current  = true;
      dragStartRef.current = cell;
      setDragCells([cell]);
    }

    function onMove(e) {
      e.preventDefault(); e.stopPropagation();
      if (!draggingRef.current || !dragStartRef.current) return;
      const cell = cellFromPoint(e.touches[0].clientX, e.touches[0].clientY);
      if (!cell) return;
      const line = getLineCells(dragStartRef.current, cell);
      if (line) setDragCells(line);
    }

    function onEnd(e) {
      e.preventDefault(); e.stopPropagation();
      const cells          = dragCellsRef.current;
      const { grid } = gdRef.current;
      if (cells.length >= 2) {
        const fwd   = cells.map(([r, c]) => grid[r][c]).join('');
        const bwd   = [...cells].reverse().map(([r, c]) => grid[r][c]).join('');
        const match = SEARCH_WORDS.find(w => w === fwd || w === bwd);
        if (match && !foundRef.current.has(match)) {
          setFound(new Set([...foundRef.current, match]));
          setFlash('ok');
          setTimeout(() => setFlash(null), 700);
        } else if (!match) {
          setFlash('no');
          setTimeout(() => setFlash(null), 400);
        }
      }
      draggingRef.current  = false;
      dragStartRef.current = null;
      setDragCells([]);
    }

    el.addEventListener('touchstart', onStart, { passive: false });
    el.addEventListener('touchmove',  onMove,  { passive: false });
    el.addEventListener('touchend',   onEnd,   { passive: false });
    return () => {
      el.removeEventListener('touchstart', onStart);
      el.removeEventListener('touchmove',  onMove);
      el.removeEventListener('touchend',   onEnd);
    };
  }, []); // empty — refs keep handlers fresh

  const { grid, wCells } = gd;
  const foundCellSet = new Set([...found].flatMap(w => (wCells[w] || []).map(([r, c]) => cellKey(r, c))));
  const dragCellSet  = new Set(dragCells.map(([r, c]) => cellKey(r, c)));
  const allFound     = found.size === SEARCH_WORDS.length;

  return (
    <div>
      <p style={{
        textAlign: 'center', marginBottom: '1.25rem',
        fontFamily: 'var(--serif)', fontStyle: 'italic',
        fontSize: '0.8rem', color: 'rgba(255,240,244,0.3)',
      }}>
        drag to highlight — left to right or top to bottom ♥
      </p>

      {/* Grid + success overlay */}
      <div style={{ position: 'relative', maxWidth: 360, margin: '0 auto' }}>
        <div
          ref={gridElRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(10, 1fr)',
            userSelect: 'none', touchAction: 'none',
            borderRadius: 10,
            overflow: 'hidden',
            border: `1px solid ${flash === 'ok' ? 'rgba(196,53,96,0.4)' : flash === 'no' ? 'rgba(200,80,80,0.3)' : 'rgba(255,255,255,0.06)'}`,
            transition: 'border-color 0.2s',
          }}
        >
          {grid.map((row, r) =>
            row.map((letter, c) => {
              const key     = cellKey(r, c);
              const isFound = foundCellSet.has(key);
              const isDrag  = dragCellSet.has(key);
              return (
                <div
                  key={key}
                  style={{
                    aspectRatio: '1',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: isFound ? 'rgba(196,53,96,0.3)' : isDrag ? 'rgba(232,130,168,0.18)' : 'rgba(255,255,255,0.03)',
                    borderRight:  c < 9 ? '0.5px solid rgba(255,255,255,0.04)' : 'none',
                    borderBottom: r < 9 ? '0.5px solid rgba(255,255,255,0.04)' : 'none',
                    transition: 'background 0.12s',
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--sans)',
                    fontSize: 'clamp(0.62rem, 2.8vw, 0.85rem)',
                    fontWeight: 600, letterSpacing: '0.02em',
                    color: isFound ? '#f5aac0' : isDrag ? '#e882a8' : 'rgba(255,240,244,0.4)',
                    transition: 'color 0.12s',
                  }}>
                    {letter}
                  </span>
                </div>
              );
            })
          )}
        </div>

        {/* Success overlay */}
        <AnimatePresence>
          {allFound && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, ease: [0.34, 1.1, 0.64, 1] }}
              style={{
                position: 'absolute', inset: 0, borderRadius: 10,
                background: 'rgba(14,4,10,0.84)',
                backdropFilter: 'blur(10px)',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                gap: '0.7rem',
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                style={{ fontSize: '2rem', lineHeight: 1 }}
              >
                ♥
              </motion.div>
              <p style={{
                fontFamily: 'var(--serif)', fontStyle: 'italic',
                fontSize: 'clamp(1rem, 4vw, 1.2rem)',
                color: '#f5aac0', textAlign: 'center',
                margin: 0, padding: '0 1rem',
              }}>
                You found every single one
              </p>
              <p style={{
                fontFamily: 'var(--serif)', fontStyle: 'italic',
                fontSize: '0.78rem', color: 'rgba(255,200,220,0.38)',
                margin: 0,
              }}>
                all {SEARCH_WORDS.length} words ♥
              </p>
              <motion.button
                onClick={reset}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  marginTop: '0.25rem',
                  fontFamily: 'var(--sans)', fontSize: 9,
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: 'rgba(255,240,244,0.4)',
                  background: 'rgba(255,255,255,0.05)',
                  border: '0.5px solid rgba(255,255,255,0.1)',
                  borderRadius: 2, padding: '0.45rem 1.2rem',
                  cursor: 'pointer',
                }}
              >
                play again ↺
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Word list */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: '0.6rem 1rem',
        justifyContent: 'center', marginTop: '1.5rem', padding: '0 1rem',
      }}>
        {SEARCH_WORDS.map(w => (
          <span key={w} style={{
            fontFamily: 'var(--sans)', fontSize: 10,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: found.has(w) ? '#c43560' : 'rgba(255,240,244,0.28)',
            textDecoration: found.has(w) ? 'line-through' : 'none',
            transition: 'color 0.3s',
          }}>
            {w}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── SENTENCE PUZZLE ───────────────────────────────────────────────────────────

// The sentence to reconstruct, word by word
const SENTENCE_WORDS = [
  'Oluwatoyosi,', 'I', 'patiently', 'wait', 'for',
  'the', 'day', 'I', 'finally','get', 'to', 'call', 'you', 'my', 'wife',
];

// Same words in a shuffled display order (fixed — no Math.random)
const CHIPS = [
  'the', 'for', 'I', 'my', 'call', 'patiently',
  'wife', 'day', 'I', 'wait', 'Oluwatoyosi,',
  'to', 'get', 'you', 'finally'
];

function WordScramble() {
  const [picked, setPicked] = useState([]);  // chip indices placed so far
  const [wrong, setWrong]   = useState(null); // chip index currently shaking

  const usedSet  = new Set(picked);
  const complete = picked.length === SENTENCE_WORDS.length;

  function tap(chipIdx) {
    if (usedSet.has(chipIdx) || complete) return;
    const word     = CHIPS[chipIdx];
    const expected = SENTENCE_WORDS[picked.length];
    if (word === expected) {
      setPicked(prev => [...prev, chipIdx]);
    } else {
      setWrong(chipIdx);
      setTimeout(() => setWrong(null), 420);
    }
  }

  function undo() {
    if (picked.length === 0) return;
    setPicked(prev => prev.slice(0, -1));
  }

  if (complete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{ textAlign: 'center', padding: '1.5rem 1rem 2rem', maxWidth: 380, margin: '0 auto' }}
      >
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ fontSize: '2rem', marginBottom: '1.25rem' }}
        >
          ♥
        </motion.div>

        {/* Full sentence with "wife" highlighted */}
        <p style={{
          fontFamily: 'var(--serif)', fontStyle: 'italic',
          fontSize: 'clamp(1.1rem, 4vw, 1.4rem)',
          lineHeight: 1.65,
          color: 'rgba(255,228,238,0.82)',
        }}>
          {SENTENCE_WORDS.slice(0, -1).join(' ')}{' '}
          <em style={{
            background: 'linear-gradient(135deg, #f5c0d0 0%, #e8608a 50%, #c43560 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            fontStyle: 'normal', fontWeight: 600,
          }}>
            {SENTENCE_WORDS[SENTENCE_WORDS.length - 1]}
          </em>
        </p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          style={{
            marginTop: '1.25rem',
            fontFamily: 'var(--serif)', fontStyle: 'italic',
            fontSize: '0.82rem', color: 'rgba(255,200,220,0.38)',
            lineHeight: 1.6,
          }}
        >
          I mean every word ♥
        </motion.p>
      </motion.div>
    );
  }

  return (
    <div style={{ maxWidth: 420, margin: '0 auto' }}>

      {/* Hint */}
      <p style={{
        textAlign: 'center', marginBottom: '1.5rem',
        fontFamily: 'var(--serif)', fontStyle: 'italic',
        fontSize: '0.8rem', color: 'rgba(255,240,244,0.3)',
      }}>
        tap the words in the right order to reveal what I want to say ♥
      </p>

      {/* Sentence building area */}
      <div style={{
        minHeight: 72,
        background: 'rgba(255,255,255,0.03)',
        border: '0.5px solid rgba(196,120,144,0.12)',
        borderRadius: 10,
        padding: '0.85rem 1rem',
        marginBottom: '1.25rem',
        display: 'flex', flexWrap: 'wrap', alignItems: 'center',
        gap: '0 0.35rem',
      }}>
        {picked.length === 0 ? (
          <span style={{
            fontFamily: 'var(--serif)', fontStyle: 'italic',
            fontSize: '0.8rem', color: 'rgba(255,240,244,0.16)',
          }}>
            your sentence will appear here…
          </span>
        ) : (
          Array.from({ length: picked.length }, (_, i) => {
            const isLast = i === picked.length - 1;
            const isWife = SENTENCE_WORDS[i] === 'wife';
            return (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 5, scale: 0.88 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.22 }}
                style={{
                  fontFamily: 'var(--serif)',
                  fontSize: 'clamp(0.88rem, 3.5vw, 1.05rem)',
                  fontWeight: isLast ? 500 : 400,
                  color: isWife
                    ? 'transparent'
                    : isLast
                    ? 'rgba(255,228,238,0.9)'
                    : 'rgba(255,228,238,0.65)',
                  background: isWife
                    ? 'linear-gradient(135deg, #f5c0d0 0%, #e8608a 50%, #c43560 100%)'
                    : 'none',
                  WebkitBackgroundClip: isWife ? 'text' : 'unset',
                  backgroundClip: isWife ? 'text' : 'unset',
                  WebkitTextFillColor: isWife ? 'transparent' : 'unset',
                  lineHeight: 1.7,
                }}
              >
                {SENTENCE_WORDS[i]}
                {i < picked.length - 1 ? ' ' : ''}
              </motion.span>
            );
          })
        )}
      </div>

      {/* Progress fraction */}
      <p style={{
        textAlign: 'right', marginBottom: '1rem',
        fontFamily: 'var(--sans)', fontSize: 9,
        letterSpacing: '0.2em', color: 'rgba(255,240,244,0.2)',
      }}>
        {picked.length} / {SENTENCE_WORDS.length}
      </p>

      {/* Scrambled word chips */}
      <div style={{
        display: 'flex', flexWrap: 'wrap',
        justifyContent: 'center', gap: 8,
        marginBottom: '1rem',
      }}>
        {CHIPS.map((word, i) => {
          const used   = usedSet.has(i);
          const shakes = wrong === i;
          return (
            <motion.button
              key={i}
              onClick={() => tap(i)}
              animate={shakes ? { x: [-6, 6, -5, 5, -3, 3, 0] } : { x: 0 }}
              transition={shakes ? { duration: 0.38 } : { duration: 0.12 }}
              whileHover={!used ? { scale: 1.07, y: -2 } : {}}
              whileTap={!used ? { scale: 0.93 } : {}}
              style={{
                padding: '0.42rem 0.78rem',
                fontFamily: 'var(--sans)',
                fontSize: word.length > 7 ? '0.7rem' : '0.8rem',
                fontWeight: 600,
                letterSpacing: '0.03em',
                color: used ? 'rgba(255,240,244,0.15)' : shakes ? '#e8608a' : 'rgba(255,240,244,0.88)',
                background: used
                  ? 'rgba(255,255,255,0.01)'
                  : shakes
                  ? 'rgba(220,60,80,0.12)'
                  : 'rgba(196,53,96,0.13)',
                border: `1px solid ${
                  used    ? 'rgba(255,255,255,0.04)'  :
                  shakes  ? 'rgba(220,60,80,0.38)'    :
                            'rgba(196,53,96,0.36)'
                }`,
                borderRadius: 6,
                cursor: used ? 'default' : 'pointer',
                transition: 'color 0.15s, background 0.15s, border-color 0.15s',
                whiteSpace: 'nowrap',
              }}
            >
              {word}
            </motion.button>
          );
        })}
      </div>

      {/* Undo last word */}
      {picked.length > 0 && (
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={undo}
            style={{
              fontFamily: 'var(--sans)', fontSize: 9,
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'rgba(255,240,244,0.22)',
              background: 'none', border: 'none', cursor: 'pointer',
            }}
          >
            ← undo last
          </button>
        </div>
      )}
    </div>
  );
}

// ── PAGE ──────────────────────────────────────────────────────────────────────

export default function PuzzlePage() {
  const [tab, setTab] = useState('search');

  const bg = bgPhotos.quiz
    ? `linear-gradient(160deg, rgba(28,8,18,0.88) 0%, rgba(14,4,10,0.92) 100%), url(${bgPhotos.quiz}) center / cover no-repeat`
    : 'linear-gradient(160deg, #1c0812 0%, #0e040a 100%)';

  return (
    <div style={{ width: '100%', height: '100%', overflow: 'auto', background: bg }}>
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(ellipse 65% 45% at 50% 20%, rgba(196,53,96,0.09) 0%, transparent 70%)',
      }} />

      <div style={{ position: 'relative', zIndex: 1, padding: '4rem 1.25rem 8rem' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '2rem' }}
        >
          <span style={{
            display: 'block', fontFamily: 'var(--sans)', fontSize: 9,
            letterSpacing: '0.3em', textTransform: 'uppercase',
            color: 'rgba(196,120,144,0.55)', marginBottom: '0.4rem',
          }}>
            a little game for you
          </span>
          <h2 style={{
            fontFamily: 'var(--serif)', fontSize: 'clamp(1.8rem, 5vw, 2.6rem)',
            fontWeight: 300, color: 'rgba(255,240,244,0.75)', lineHeight: 1.2,
          }}>
            Our{' '}
            <em style={{
              fontStyle: 'italic',
              background: 'linear-gradient(135deg, #f5aac0 0%, #d95880 50%, #b0304e 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              little puzzles
            </em>
          </h2>
        </motion.div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: '2.25rem' }}>
          {[['search', 'Word Search'], ['scramble', 'Build the Message']].map(([id, label]) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              style={{
                fontFamily: 'var(--sans)', fontSize: 10,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: tab === id ? 'white' : 'rgba(255,240,244,0.35)',
                background: tab === id ? '#c43560' : 'rgba(255,255,255,0.04)',
                border: `0.5px solid ${tab === id ? '#c43560' : 'rgba(255,255,255,0.1)'}`,
                borderRadius: 2, padding: '0.55rem 1.25rem',
                cursor: 'pointer', transition: 'all 0.2s',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Game panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28 }}
          >
            {tab === 'search' ? <WordSearch /> : <WordScramble />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
