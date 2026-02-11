"use client";

import SectionHeader from "./SectionHeader";
import GlassCard from "./GlassCard";
import { motion } from "framer-motion";

export default function LocationSection() {
    return (
        <section id="location" className="relative py-24 px-4 md:px-8 max-w-7xl mx-auto">
            <SectionHeader title="Ubicación" subtitle="Encuéntranos" align="right" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[500px]">

                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="space-y-6 flex flex-col justify-center order-2 md:order-1"
                >
                    <GlassCard className="hover:border-white/30 transition-colors duration-300">
                        <h3 className="text-2xl font-bold text-white mb-4 font-oswald uppercase">GymLand HQ</h3>
                        <p className="text-gray-400 mb-2">Av. Siempre Viva 742</p>
                        <p className="text-gray-400 mb-6">Springfield, CP 12345</p>

                        <div className="space-y-2">
                            <p className="text-sm text-[#E3FF00] uppercase tracking-widest">Horario</p>
                            <p className="text-white">Lunes - Viernes: 24 Horas</p>
                            <p className="text-white">Fines de Semana: 06:00 - 22:00</p>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-8 px-8 py-3 border border-white/20 text-white hover:bg-white hover:text-black transition-colors w-full md:w-auto uppercase tracking-wider text-sm font-bold"
                        >
                            Cómo Llegar
                        </motion.button>
                    </GlassCard>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative order-1 md:order-2 h-full w-full rounded-2xl overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-700"
                >
                    {/* Iframe placeholder for Google Maps */}
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1576.7!2d-74.006!3d40.7128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM40wMCc1My41Ik4gNzTCsDAwJzIxLjYiVw!5e0!3m2!1sen!2sus!4v1600000000000!5m2!1sen!2sus"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        className="absolute inset-0 w-full h-full"
                    />

                    {/* Overlay to indicate interactivity */}
                    <div className="absolute inset-0 bg-black/20 pointer-events-none group-hover:bg-transparent transition-colors" />
                </motion.div>
            </div>
        </section>
    );
}
