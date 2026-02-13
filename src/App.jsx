import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Landing from './components/Landing';
import FloatingHearts from './components/FloatingHearts';
import DatePlanner from './components/DatePlanner';
import LoveMeter from './components/LoveMeter';
import MusicPlayer from './components/MusicPlayer';
import LoveNotes from './components/LoveNotes';
import { Heart } from 'lucide-react';

function App() {
  const [loveLevel, setLoveLevel] = useState(0);
  const [started, setStarted] = useState(false);

  // Increase love level on plan
  const handlePlanUpdate = (count) => {
    setLoveLevel(prev => Math.min(100, Math.max(prev, 30 + (count * 10))));
  };

  return (
    <div className="min-h-screen font-sans overflow-x-hidden relative text-white selection:bg-romantic-DEFAULT selection:text-white">

      {/* Music & Hearts Persist */}
      <MusicPlayer />
      <FloatingHearts />

      <AnimatePresence mode="wait">
        {!started ? (
          <Landing key="landing" onComplete={() => setStarted(true)} />
        ) : (
          <motion.div
            key="experience"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative z-10"
          >
            <LoveMeter progress={loveLevel} />

            {/* Main Content after YES */}
            <main className="max-w-7xl mx-auto px-4 py-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-romantic-light mb-4">
                  Every Love Story is Beautiful...
                </h2>
                <p className="text-xl text-gray-400">But ours is my favorite. Let's plan our forever. ❤️</p>
              </motion.div>

              <DatePlanner onPlanUpdate={handlePlanUpdate} />

              <div className="my-20">
                <LoveNotes />
              </div>
            </main>

            <footer className="py-12 text-center text-white/30 relative z-10 font-serif italic border-t border-white/5 mt-12 mb-20 pointer-events-none flex justify-center">
              <p className="flex items-center gap-2 text-lg">
                Made with <Heart size={16} fill="currentColor" /> for my Valentine
              </p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
