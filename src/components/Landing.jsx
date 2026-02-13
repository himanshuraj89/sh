import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ChevronRight } from "lucide-react";
import confetti from "canvas-confetti";

const Landing = ({ onComplete }) => {
    const [noCount, setNoCount] = useState(0);
    // Default cute sticker
    const [currentSticker, setCurrentSticker] = useState("https://media.tenor.com/oqMFx5ZhOtwAAAAi/cat-love.gif");

    const sadStickers = [
        "https://media.tenor.com/fA71wD2t3i8AAAAi/cute-cat.gif", // Cat begging
        "https://media.tenor.com/-pMvxzX7hKAAAAAi/cat-cute.gif", // Cat staring
        "https://media.tenor.com/_uB5t5D5l4AAAAAi/cat-sad.gif", // Sad cat
        "https://media.tenor.com/5KjH5Wk8D4AAAAAi/cat-pleading.gif", // Pleading cat
    ];

    const happySticker = "https://media.tenor.com/lHK9XFf9WnUAAAAi/peach-goma-love-kiss.gif"; // Kissing/Happy

    const persuasiveTexts = [
        "Are you sure? 🥺",
        "Let me plan something special… ✨",
        "I promise unlimited movie nights 🍿",
        "Just give me one chance ❤️",
        "What if I say pretty please? 💕",
        "Don't break my heart 💔",
        "Okay, I'm waiting... 🕰️",
    ];

    const handleNo = () => {
        setNoCount((prev) => prev + 1);
        const randomSticker = sadStickers[Math.floor(Math.random() * sadStickers.length)];
        setCurrentSticker(randomSticker);
    };

    const handleYes = () => {
        setCurrentSticker(happySticker);

        // Flower Confetti & Standard Confetti
        const scalar = 2;
        const rose = confetti.shapeFromText({ text: '🌹', scalar });
        const tulip = confetti.shapeFromText({ text: '🌷', scalar });
        const heart = confetti.shapeFromText({ text: '💖', scalar });

        const defaults = {
            spread: 360,
            ticks: 100,
            gravity: 0,
            decay: 0.96,
            startVelocity: 45,
            shapes: [rose, tulip, heart],
            scalar
        };

        const shoot = () => {
            confetti({
                ...defaults,
                particleCount: 30,
                scalar: 2,
            });
            confetti({
                ...defaults,
                particleCount: 20,
                scalar: 3,
                shapes: ['circle'],
                colors: ['#FFC0CB', '#FF69B4', '#E91E63'] // Pink/Red petals
            });
        };

        setTimeout(shoot, 0);
        setTimeout(shoot, 100);
        setTimeout(shoot, 200);

        // Standard confetti rain
        confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#E91E63', '#FFD700', '#FFFFFF']
        });

        // Delay transition to show the effect
        setTimeout(() => {
            onComplete();
        }, 2000);
    };

    const getNoText = () => {
        return persuasiveTexts[Math.min(noCount, persuasiveTexts.length - 1)];
    };

    // Yes button grows faster: 0.15 increment instead of 0.05
    // Cap at 2.5x to prevent total breakage, but it's huge enough
    const yesScale = Math.min(2.5, 1 + (noCount * 0.15));

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 1 }}
            className="min-h-screen flex flex-col items-center justify-center text-center relative z-20 overflow-hidden px-4"
        >
            {/* Cinematic Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-black via-[#1a0508] to-[#2d0a12] z-0"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] z-0 pointer-events-none"></div>

            {/* Floating Particles/Glows */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-romantic-DEFAULT/20 rounded-full blur-[100px] animate-pulse-slow"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

            <div className="z-10 max-w-4xl w-full flex flex-col items-center h-full justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="mb-12"
                >
                    <Heart className="w-16 h-16 text-romantic-DEFAULT mx-auto mb-6 drop-shadow-[0_0_15px_rgba(233,30,99,0.5)]" fill="currentColor" />
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-romantic-light via-white to-romantic-light mb-6 leading-tight">
                        Will You Be My Valentine?
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 font-light tracking-wide mb-12">
                        In a world full of temporary things… <br className="hidden md:block" />
                        I want something forever — <span className="text-romantic-light font-medium italic">with you.</span>
                    </p>
                </motion.div>

                {/* Dynamic Emotion Sticker */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSticker}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        className="mb-8 h-40 flex items-center justify-center relative z-20"
                    >
                        <img
                            src={currentSticker}
                            alt="Emotion sticker"
                            className="h-full object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Buttons Container - Changed to protect layout from overlap */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full relative min-h-[120px]">
                    {/* YES BUTTON */}
                    <motion.button
                        whileHover={{ scale: yesScale + 0.05, boxShadow: "0 0 30px rgba(233,30,99,0.6)" }}
                        whileTap={{ scale: yesScale - 0.05 }}
                        animate={{ scale: yesScale }}
                        className="relative overflow-hidden group bg-gradient-to-r from-romantic-DEFAULT to-romantic-dark text-white font-medium py-4 px-12 rounded-full shadow-[0_0_20px_rgba(233,30,99,0.3)] transition-all duration-500 border border-white/10 z-20 whitespace-nowrap"
                        onClick={handleYes}
                    >
                        <span className="relative z-10 flex items-center gap-3 text-lg md:text-xl font-serif tracking-wider">
                            Say Yes 💖
                        </span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                    </motion.button>

                    {/* NO BUTTON - Wrapped in div to prevent it being pushed weirdly */}
                    <div className="relative">
                        <AnimatePresence mode="wait">
                            <motion.button
                                key={noCount} // Re-render animation on click
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-3 rounded-full text-gray-400 border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all backdrop-blur-sm text-sm md:text-base whitespace-nowrap"
                                onClick={handleNo}
                            >
                                {noCount === 0 ? "I'm Not Sure 🤍" : getNoText()}
                            </motion.button>
                        </AnimatePresence>
                    </div>
                </div>



                {/* Quotes */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 2 }}
                    className="mt-20 space-y-4 text-gray-500/60 text-sm font-sans tracking-widest uppercase"
                >
                    <p>“I didn’t fall for you. I walked into love with my eyes open.”</p>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default Landing;
