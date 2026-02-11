"use client";

import GlassCard from "./GlassCard";
import SectionHeader from "./SectionHeader";
import { motion } from "framer-motion";

export default function HistorySection() {
    return (
        <section id="history" className="relative py-24 px-4 md:px-8 max-w-7xl mx-auto">
            <SectionHeader title="Nuestra Historia" subtitle="Desde 2010" align="left" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="space-y-6"
                >
                    <p className="text-2xl font-black italic text-white leading-tight font-oswald tracking-wide">
                        "Fundado en el acero, forjado en el sudor. No somos un gimnasio, somos <motion.span
                            animate={{ color: ["#E3FF00", "#FF00E6", "#00FFF0", "#E3FF00"] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            className="not-italic"
                        >un movimiento</motion.span>."
                    </p>
                    <p className="text-lg text-gray-400 leading-relaxed font-light">
                        GymLand nació con una misión simple: erradicar la mediocridad.
                        Lo que comenzó como un pequeño garaje para powerlifters se ha convertido en el templo del fitness
                        más avanzado de la ciudad.
                    </p>
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                    >
                        <GlassCard className="mt-8 border-l-4 border-l-[#E3FF00]">
                            <p className="text-xl text-white italic">"No vendemos membresías, vendemos transformaciones."</p>
                            <p className="mt-4 text-[#E3FF00] font-bold uppercase tracking-widest text-xs">- The Founder</p>
                        </GlassCard>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative h-[500px] w-full bg-white/5 rounded-2xl overflow-hidden group border border-white/10"
                >
                    <motion.div
                        animate={{
                            background: [
                                "linear-gradient(135deg, rgba(31,41,55,0.8), rgba(0,0,0,0.9))",
                                "linear-gradient(135deg, rgba(88,28,135,0.8), rgba(0,0,0,0.9))",
                                "linear-gradient(135deg, rgba(12,74,110,0.8), rgba(0,0,0,0.9))",
                                "linear-gradient(135deg, rgba(31,41,55,0.8), rgba(0,0,0,0.9))"
                            ]
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 mix-blend-overlay"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white/5 text-9xl font-black italic select-none font-oswald transition-transform duration-700 group-hover:scale-125">GYM</span>
                    </div>
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.7 }}
                        className="w-full h-full bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop')] bg-cover bg-center opacity-60 hover:opacity-100 transition-all duration-500"
                    />
                </motion.div>
            </div>
        </section>
    );
}
