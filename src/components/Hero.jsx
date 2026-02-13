import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

const Hero = () => {
    const messages = [
        "I have a question for you...",
        "But first, let me tell you something...",
        "You are my everything. ❤️"
    ];

    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentFullText = messages[currentMessageIndex];
        let timer;
        if (isDeleting) {
            timer = setTimeout(() => {
                setDisplayText(currentFullText.substring(0, displayText.length - 1));
            }, 50);
        } else {
            timer = setTimeout(() => {
                setDisplayText(currentFullText.substring(0, displayText.length + 1));
            }, 100);
        }

        if (!isDeleting && displayText === currentFullText) {
            if (currentMessageIndex === messages.length - 1) return;
            setTimeout(() => setIsDeleting(true), 2000);
        } else if (isDeleting && displayText === "") {
            setIsDeleting(false);
            setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
        }
        return () => clearTimeout(timer);
    }, [displayText, isDeleting, currentMessageIndex]);

    return (
        <section className="min-h-screen flex flex-col items-center justify-center text-center relative z-10 py-20">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="mb-8 relative"
            >
                <div className="absolute inset-0 bg-romantic-light/50 blur-xl rounded-full animate-pulse-slow"></div>
                <Heart className="text-romantic-dark w-24 h-24 relative z-10 drop-shadow-xl" fill="#880E4F" />
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-4 -right-4"
                >
                    <Sparkles className="text-romantic-accent w-8 h-8" />
                </motion.div>
            </motion.div>

            <div className="h-32 mb-6 flex items-center justify-center">
                <h1 className="text-5xl md:text-7xl font-bold font-serif text-romantic-dark drop-shadow-sm tracking-tight">
                    <span className="typewriter-cursor">{displayText}</span>
                </h1>
            </div>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1 }}
                className="text-xl md:text-2xl text-gray-600 font-light max-w-2xl mx-auto leading-relaxed font-sans"
            >
                Every moment with you is like a beautiful dream... <br />
                <span className="text-romantic font-medium italic">Scroll down to continue</span>
            </motion.p>

            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-10 opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            >
                <div className="flex flex-col items-center gap-2">
                    <span className="text-xs tracking-widest uppercase text-romantic-dark">Begin</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-romantic-dark to-transparent"></div>
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
