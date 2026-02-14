import { useState, useRef, useEffect } from "react";
import { Music, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    // Using YouTube embed for "Dandelions" - Ruth B
    // Video ID: w8vPqM7326E

    // Note: Modern browsers block autoplay often. We need user interaction.
    // We'll use a hidden iframe approach where we basically can't control it easily via custom play buttons 
    // without the IFrame API, but for simplicity/reliability of just "hearing music", 
    // we might want to try a simple audio tag if we can find a source, 
    // OR use the IFrame API. 

    // Let's stick to the previous Audio tag approach but with a better source if possible.
    // Since I can't browse for MP3s easily, I will use a reliable placeholder but user might need to swap it.
    // wait, I can try to use a direct raw link from a repo if I knew one.
    // Let's use a public domain or permissible sample for now to ensure it WORKS, 
    // but label it clearly.
    // ACTUALLY, let's use a YouTube wrapper.

    const iframeRef = useRef(null);

    // Set volume on load
    useEffect(() => {
        const timer = setInterval(() => {
            if (iframeRef.current && iframeRef.current.contentWindow) {
                iframeRef.current.contentWindow.postMessage('{"event":"command","func":"setVolume","args":[25]}', '*');
            }
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const togglePlay = () => {
        const iframe = iframeRef.current;
        if (!iframe) return;

        if (isPlaying) {
            iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        } else {
            iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
            iframe.contentWindow.postMessage('{"event":"command","func":"setVolume","args":[25]}', '*');
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-3">
            {/* Hidden YouTube Player - Changed from 'hidden' to opacity-0 to ensure it loads */}
            <div className="absolute opacity-0 pointer-events-none w-1 h-1 overflow-hidden -z-10">
                <iframe
                    ref={iframeRef}
                    id="youtube-audio"
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/w8vPqM7326E?enablejsapi=1&autoplay=1&loop=1&playlist=w8vPqM7326E&controls=0&showinfo=0&origin=http://localhost:5173"
                    title="Dandelions - Ruth B"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                ></iframe>
            </div>

            <button
                onClick={togglePlay}
                className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all text-romantic-dark border border-romantic-light group relative z-50"
            >
                <div className="absolute inset-0 bg-romantic-light/20 rounded-full animate-ping opacity-0 group-hover:opacity-75 duration-300"></div>
                {isPlaying ? <Volume2 size={24} className="" /> : <VolumeX size={24} />}
            </button>

            {/* Modern Music Waveform Animation */}
            <AnimatePresence>
                {isPlaying && (
                    <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        className="flex items-center gap-[2px] h-8 overflow-hidden"
                    >
                        {[1, 2, 3, 4, 5].map((i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    height: [10, 24, 10],
                                    backgroundColor: ["#E91E63", "#FF4081", "#E91E63"]
                                }}
                                transition={{
                                    duration: 0.8,
                                    repeat: Infinity,
                                    delay: i * 0.1,
                                    ease: "easeInOut"
                                }}
                                className="w-1 rounded-full opacity-80"
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MusicPlayer;
