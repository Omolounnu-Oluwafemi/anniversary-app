import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import NavBar from './components/NavBar';
import HeroPage from './pages/HeroPage';
import LetterPage from './pages/LetterPage';
import TimelinePage from './pages/TimelinePage';
import GalleryPage from './pages/GalleryPage';
import WitnessPage from './pages/WitnessPage';
import BloopersPage from './pages/BloopersPage';
// import ReasonsPage from './pages/ReasonsPage';
import PuzzlePage from './pages/PuzzlePage';
import QuizPage from './pages/QuizPage';
import RevealPage from './pages/RevealPage';

const PAGES = [
  { id: 'hero',     dark: true,  Component: HeroPage },
  { id: 'letter',   dark: false, Component: LetterPage },
  { id: 'timeline', dark: true,  Component: TimelinePage },
  { id: 'gallery',  dark: false, Component: GalleryPage },
  { id: 'witness',  dark: true,  Component: WitnessPage },
  { id: 'bloopers', dark: true,  Component: BloopersPage },
  // { id: 'reasons',  dark: true,  Component: ReasonsPage },
  { id: 'puzzle',   dark: true,  Component: PuzzlePage },
  { id: 'quiz',     dark: true,  Component: QuizPage },
  { id: 'reveal',   dark: true,  Component: RevealPage },
];

const pageVariants = {
  enter: (dir) => ({
    clipPath: dir > 0 ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)',
    opacity: 0.5,
  }),
  center: {
    clipPath: 'inset(0 0% 0 0)',
    opacity: 1,
  },
  exit: (dir) => ({
    clipPath: dir > 0 ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)',
    opacity: 0.5,
  }),
};

export default function App() {
  const [[page, dir], setPage] = useState([0, 0]);

  const goTo = useCallback((next) => {
    if (next < 0 || next >= PAGES.length) return;
    setPage(([cur]) => [next, next > cur ? 1 : -1]);
  }, []);

  const next = useCallback(() => goTo(page + 1), [page, goTo]);
  const prev = useCallback(() => goTo(page - 1), [page, goTo]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [next, prev]);

  useEffect(() => {
    let startX = 0;
    const onStart = (e) => { startX = e.touches[0].clientX; };
    const onEnd = (e) => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 60) dx < 0 ? next() : prev();
    };
    window.addEventListener('touchstart', onStart, { passive: true });
    window.addEventListener('touchend', onEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', onStart);
      window.removeEventListener('touchend', onEnd);
    };
  }, [next, prev]);

  const { id, dark, Component } = PAGES[page];

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <AnimatePresence initial={false} custom={dir} mode="wait">
        <motion.div
          key={id}
          custom={dir}
          variants={pageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          style={{ position: 'absolute', inset: 0, willChange: 'clip-path, opacity' }}
        >
          <Component onNext={next} onPrev={prev} />
        </motion.div>
      </AnimatePresence>

      <NavBar current={page} total={PAGES.length} onNext={next} onPrev={prev} dark={dark} />
    </div>
  );
}
