import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const quotes = [
    {
        id: 1,
        text: "I swear I couldn't love you more than I do right now, and yet I know I will tomorrow.",
        author: "Leo Christopher"
    },
    {
        id: 2,
        text: "If I know what love is, it is because of you.",
        author: "Hermann Hesse"
    },
    {
        id: 3,
        text: "You are my heart, my life, my one and only thought.",
        author: "Conan Doyle"
    }
];

const LoveNotes = () => {
    return (
        <section className="py-20 px-4">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-romantic-light mb-12">
                for my special one
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {quotes.map((q, i) => (
                    <motion.div
                        key={q.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.2 }}
                        whileHover={{ y: -10 }}
                        className="relative bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-2xl flex flex-col items-center text-center group"
                    >
                        <div className="absolute -top-4 bg-romantic-dark p-2 rounded-full border-4 border-[#0F0508]">
                            <Quote size={20} className="text-white" />
                        </div>

                        <p className="text-lg text-gray-200 font-serif italic leading-relaxed mb-6">
                            "{q.text}"
                        </p>
                        <div className="w-12 h-1 bg-romantic-DEFAULT/50 mb-4 rounded-full"></div>

                        <div className="absolute inset-0 bg-romantic-DEFAULT/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none"></div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default LoveNotes;
