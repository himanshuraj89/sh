import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

const FloatingHearts = () => {
    const [hearts, setHearts] = useState([]);

    useEffect(() => {
        // Generate hearts on mount
        const newHearts = Array.from({ length: 15 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100, // Random percentage for left position
            delay: Math.random() * 5, // Random delay
            duration: 5 + Math.random() * 5, // Random duration between 5-10s
        }));
        setHearts(newHearts);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {hearts.map((heart) => (
                <motion.div
                    key={heart.id}
                    initial={{ y: "110vh", opacity: 0, x: `${heart.x}vw` }}
                    animate={{
                        y: "-10vh",
                        opacity: [0, 1, 0],
                        rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                        duration: heart.duration,
                        repeat: Infinity,
                        delay: heart.delay,
                        ease: "linear",
                    }}
                    className="absolute text-romantic-light/40"
                >
                    <Heart fill="currentColor" size={24 + Math.random() * 24} />
                </motion.div>
            ))}
        </div>
    );
};

export default FloatingHearts;
