import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Heart, PartyPopper } from "lucide-react";
import confetti from "canvas-confetti";

const Proposal = ({ onYes }) => {
    const [accepted, setAccepted] = useState(false);
    const [noCount, setNoCount] = useState(0);
    const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef(null);

    const persuasiveTexts = [
        "No",
        "Are you sure? 🥺",
        "Think again ❤️",
        "I'll bring chocolates 🍫",
        "I'll plan movie nights 🍿",
        "I'll massage your feet 💆‍♂️",
        "Pretty please? 💕",
        "Don't break my heart 💔",
        "Okay, I'm crying now 😭",
    ];

    const handleNoHover = () => {
        // Move slightly
        moveNoButton();
    };

    const handleNoClick = () => {
        moveNoButton();
        setNoCount((prev) => prev + 1);
    };

    const moveNoButton = () => {
        const x = Math.random() * 200 - 100; // -100 to 100
        const y = Math.random() * 200 - 100;
        setNoBtnPosition({ x, y });
    };

    const handleYes = () => {
        setAccepted(true);
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#D90429', '#FFD1DC', '#FFD700']
        });
        if (onYes) onYes();
    };

    const getNoText = () => {
        return persuasiveTexts[Math.min(noCount, persuasiveTexts.length - 1)];
    };

    // Yes button scale based on no interactions
    const yesScale = 1 + noCount * 0.1;
    // No button scale
    const noScale = Math.max(0.5, 1 - noCount * 0.05);

    return (
        <section id="proposal" className="min-h-screen flex flex-col items-center justify-center py-20 relative overflow-hidden">
            {accepted ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                >
                    <h2 className="text-5xl md:text-7xl font-bold text-romantic-dark mb-4">Yay! I knew it! 🎉</h2>
                    <p className="text-2xl text-gray-700">You've made me the happiest person alive! ❤️</p>
                    <div className="mt-8 flex justify-center gap-4">
                        <Heart className="text-romantic-dark w-20 h-20 animate-pulse" fill="#D90429" />
                    </div>
                </motion.div>
            ) : (
                <div className="text-center z-10" ref={containerRef}>
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-8">
                        Will you be my Valentine?
                    </h2>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 mt-10 relative h-40">
                        {/* Yes Button */}
                        <motion.button
                            whileHover={{ scale: yesScale + 0.1 }}
                            whileTap={{ scale: yesScale - 0.1 }}
                            animate={{ scale: yesScale }}
                            className="bg-romantic-dark text-white font-bold py-4 px-10 rounded-full shadow-lg text-xl hover:bg-opacity-90 transition-colors z-20"
                            onClick={handleYes}
                        >
                            Yes, I will! 💖
                        </motion.button>

                        {/* No Button */}
                        <motion.button
                            animate={{
                                x: noBtnPosition.x,
                                y: noBtnPosition.y,
                                scale: noScale
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="bg-gray-300 text-gray-700 font-semibold py-3 px-8 rounded-full shadow-md text-lg absolute md:relative z-10"
                            style={{ top: 'auto', left: 'auto' }} // Ensure it starts relatively positioned in flow if possible, or use absolute if tricky
                            onMouseEnter={handleNoHover}
                            onClick={handleNoClick}
                        >
                            {getNoText()}
                        </motion.button>
                    </div>

                    <div className="mt-12 text-sm text-gray-500 min-h-[20px]">
                        {noCount > 0 && <span className="animate-bounce inline-block">You can't catch me! 😜</span>}
                    </div>
                </div>
            )}
        </section>
    );
};

export default Proposal;
