import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const LoveMeter = ({ progress }) => {
    return (
        <div className="fixed top-4 left-4 z-50 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-romantic-light w-64">
            <div className="flex items-center gap-2 mb-2">
                <Heart className="text-romantic-dark fill-romantic-dark animate-pulse" size={20} />
                <span className="font-bold text-gray-700">Winning My Heart</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden relative">
                <motion.div
                    className="bg-romantic-dark h-full absolute left-0 top-0"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, progress)}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                />
                {/* Striped pattern overlay optional */}
                <div className="w-full h-full opacity-20 bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem]" />
            </div>

        </div>
    );
};

export default LoveMeter;
