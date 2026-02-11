"use client";

import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

const testimonials = [
    {
        name: "ALEX STARK",
        quote: "Este lugar me destruyó y me volvió a construir. Es brutal.",
        role: "Powerlifter"
    },
    {
        name: "MARIA V.",
        quote: "No es solo un gimnasio, es mi segunda casa. La comunidad es increíble.",
        role: "CrossFit Athlete"
    },
    {
        name: "JHON DOE",
        quote: "El equipo es de primera clase. Nunca había visto algo así en la ciudad.",
        role: "Bodybuilder"
    },
    {
        name: "SARAH L.",
        quote: "Entrenar aquí cambio mi mentalidad por completo. 100% recomendado.",
        role: "Fitness Enthusiast"
    },
    {
        name: "CHRIS P.",
        quote: "La vibra 'Underground' te motiva a levantar más pesado cada día.",
        role: "Strongman"
    }
];

export default function TestimonialsSection() {
    return (
        <section id="testimonials" className="py-24 bg-[#050505] overflow-hidden border-t border-white/5">
            <SectionHeader title="Lo que dicen" subtitle="Testimonios" align="center" />

            {/* Masked edges for fade effect */}
            <div className="relative w-full max-w-full overflow-hidden mask-gradient-x">
                {/* 
                   Infinite Track:
                   We duplicate the list to ensure seamless looping.
                   Animate x from 0 to -50% (since we doubled the content).
                */}
                <motion.div
                    className="flex gap-8 w-max"
                    animate={{ x: "-50%" }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 30, // Adjust speed here
                    }}
                >
                    {/* Render content TWICE for the loop */}
                    {[...testimonials, ...testimonials].map((t, i) => (
                        <div
                            key={i}
                            className="w-[400px] md:w-[600px] flex-shrink-0 p-8 border border-white/10 bg-white/5 backdrop-blur-sm rounded-xl hover:border-[#E3FF00]/50 transition-colors duration-300 group"
                        >
                            <p className="text-2xl md:text-4xl font-black italic text-white uppercase leading-tight font-oswald mb-6 text-shadow-glow group-hover:text-[#E3FF00] transition-colors">
                                &quot;{t.quote}&quot;
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-1 bg-[#E3FF00]" />
                                <div>
                                    <p className="text-white font-bold tracking-widest uppercase text-sm">
                                        {t.name}
                                    </p>
                                    <p className="text-white/40 text-xs font-mono uppercase">
                                        {t.role}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Side Fade Gradients (Optional/Extra polish) */}
                <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#050505] to-transparent pointer-events-none z-10" />
                <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#050505] to-transparent pointer-events-none z-10" />
            </div>
        </section>
    );
}
