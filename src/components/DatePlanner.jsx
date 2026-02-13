import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Film, Gamepad2, Utensils, Music, Star, BookOpen, Plane, X, Check } from "lucide-react";

const dates = [
    { id: 'movie', title: 'Movie Night', icon: Film, description: "Popcorn, blankets, and a movie of your choice!", choices: ["RomCom", "Horror", "Action", "Drama"] },
    { id: 'game', title: 'Online Game', icon: Gamepad2, description: "Let's duo queue or play something chill." },
    { id: 'dinner', title: 'Virtual Dinner', icon: Utensils, description: "Order the same food and eat together on call." },
    { id: 'music', title: 'Music Party', icon: Music, description: "Spotify Jam session or listening to our playlist." },
    { id: 'stars', title: 'Stargazing', icon: Star, description: "Looking at the same sky (digital or real)." },
    { id: 'read', title: 'Reading Date', icon: BookOpen, description: "Reading our own books in comfortable silence." },
    { id: 'trip', title: 'Dream Trip', icon: Plane, description: "Planning our future adventures together." },
];

const DatePlanner = ({ onPlanUpdate }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [plannedDates, setPlannedDates] = useState([]);

    const handlePlan = (dateId) => {
        if (!plannedDates.includes(dateId)) {
            const newPlanned = [...plannedDates, dateId];
            setPlannedDates(newPlanned);
            onPlanUpdate(newPlanned.length); // Update score
        }
        setSelectedDate(null);
    };

    return (
        <section className="py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dates.map((date) => {
                    const isPlanned = plannedDates.includes(date.id);
                    const Icon = date.icon;

                    return (
                        <motion.div
                            key={date.id}
                            whileHover={{ scale: 1.05, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                            className={`backdrop-blur-xl rounded-3xl p-8 border transition-all cursor-pointer group relative overflow-hidden ${isPlanned ? 'bg-romantic-DEFAULT/20 border-romantic-DEFAULT shadow-[0_0_20px_rgba(233,30,99,0.3)]' : 'bg-white/5 border-white/10 hover:border-romantic-light/30 hover:bg-white/10'}`}
                            onClick={() => setSelectedDate(date)}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                            <div className="flex items-center justify-between mb-6">
                                <div className={`p-4 rounded-2xl ${isPlanned ? 'bg-romantic-DEFAULT text-white' : 'bg-white/10 text-romantic-light'}`}>
                                    <Icon size={32} />
                                </div>
                                {isPlanned && <Check className="text-romantic-light" />}
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">{date.title}</h3>
                            <p className="text-gray-400 line-clamp-2 text-sm">{date.description}</p>
                        </motion.div>
                    );
                })}
            </div>

            <AnimatePresence>
                {selectedDate && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                        onClick={() => setSelectedDate(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 50 }}
                            className="bg-[#1a0508] border border-white/10 rounded-[2rem] p-8 max-w-md w-full shadow-2xl relative overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedDate(null)}
                                className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>

                            <div className="flex justify-center mb-8">
                                <div className="p-8 bg-white/5 rounded-full text-romantic-DEFAULT shadow-inner-lg">
                                    <selectedDate.icon size={64} className="drop-shadow-lg" />
                                </div>
                            </div>

                            <h3 className="text-3xl font-serif font-bold text-center text-white mb-4">{selectedDate.title}</h3>
                            <p className="text-gray-400 text-center mb-8 text-lg leading-relaxed">{selectedDate.description}</p>

                            {selectedDate.choices && (
                                <div className="flex flex-wrap gap-2 justify-center mb-8">
                                    {selectedDate.choices.map(c => (
                                        <span key={c} className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-sm text-gray-300">{c}</span>
                                    ))}
                                </div>
                            )}

                            <button
                                onClick={() => handlePlan(selectedDate.id)}
                                className="w-full bg-gradient-to-r from-romantic-DEFAULT to-romantic-dark text-white font-bold py-4 rounded-xl text-xl hover:shadow-[0_0_20px_rgba(233,30,99,0.4)] transition-all active:scale-95 transform duration-100"
                            >
                                Let's Do It! ✨
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default DatePlanner;
