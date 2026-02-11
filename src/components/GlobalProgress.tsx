"use client";

import { motion, useScroll, useSpring, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

export default function GlobalProgress() {
    const { scrollYProgress } = useScroll();
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const [percentage, setPercentage] = useState(0);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        setPercentage(Math.round(latest * 100));
    });

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-4 mix-blend-difference pointer-events-none"
        >
            <div className="h-32 w-[1px] bg-white/20 overflow-hidden relative">
                <motion.div
                    className="absolute top-0 w-full bg-[#E3FF00]"
                    style={{ height: "100%", scaleY, transformOrigin: "top" }}
                />
            </div>
            <span className="text-[#E3FF00] font-mono text-xs tracking-widest tabular-nums -rotate-90 origin-center translate-y-4">
                {percentage.toString().padStart(3, '0')}%
            </span>
        </motion.div>
    );
}
