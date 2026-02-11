"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
        damping: 60,
        stiffness: 70,
    });
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (isInView) {
            motionValue.set(value);
        }
    }, [motionValue, isInView, value]);

    useEffect(() => {
        return springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = Intl.NumberFormat("en-US").format(Math.floor(latest)) + suffix;
            }
        });
    }, [springValue, suffix]);

    return <span ref={ref} className="tabular-nums" />;
}

export default function StatsSection() {
    const currentYear = new Date().getFullYear();
    const yearsSince2010 = currentYear - 2010;

    const stats = [
        {
            label: "Vidas Cambiadas",
            value: 12500,
            suffix: "+"
        },
        {
            label: "Años de Legado",
            value: yearsSince2010,
            suffix: ""
        },
        {
            label: "Calorías Quemadas",
            value: 84000000,
            suffix: "+"
        },
        {
            label: "Atletas de Elite",
            value: 450,
            suffix: ""
        }
    ];

    return (
        <section id="stats" className="py-24 bg-[#050505] border-y border-white/5 relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex flex-col items-center justify-center space-y-4 group">
                            <div className="space-y-2">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    className="text-4xl md:text-5xl lg:text-6xl font-black italic text-white font-oswald text-shadow-glow"
                                >
                                    <Counter value={stat.value} suffix={stat.suffix} />
                                </motion.div>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                                    className="text-[#E3FF00] font-mono uppercase tracking-widest text-sm"
                                >
                                    {stat.label}
                                </motion.p>
                            </div>

                            {/* Reactive "Live" Loading Bar */}
                            <div className="w-12 h-1 bg-white/10 rounded-full overflow-hidden relative">
                                <motion.div
                                    className="absolute inset-0 bg-[#E3FF00]"
                                    initial={{ x: "-100%" }}
                                    animate={{ x: ["-100%", "100%"] }} // Slide constantly
                                    transition={{
                                        repeat: Infinity,
                                        duration: 2,
                                        ease: "easeInOut",
                                        delay: index * 0.5 // Stagger the "thinking" effect
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
