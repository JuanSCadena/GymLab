"use client";

import GlassCard from "./GlassCard";
import SectionHeader from "./SectionHeader";
import { motion } from "framer-motion";

export default function PlansSection() {
    const plans = [
        {
            name: "Basic",
            price: "$29",
            period: "/mes",
            features: ["Acceso 24/7", "Zona de Pesas", "Vestuarios", "App de Seguimiento"],
            highlight: false
        },
        {
            name: "Pro",
            price: "$49",
            period: "/mes",
            features: ["Todo en Basic", "Acceso a Clases Grupales", "1 Sesión PT Mensual", "Sauna & Spa"],
            highlight: true
        },
        {
            name: "Elite",
            price: "$89",
            period: "/mes",
            features: ["Todo en Pro", "Entrenador Personal Dedicado", "Nutrición Personalizada", "Acceso VIP"],
            highlight: false
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const cardVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
    };

    return (
        <section id="plans" className="relative py-24 px-4 md:px-8 bg-black/40">
            <div className="max-w-7xl mx-auto">
                <SectionHeader title="Planes de Membresía" subtitle="Invierte en Ti" />

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {plans.map((plan, index) => (
                        <motion.div key={plan.name} variants={cardVariants}>
                            <GlassCard
                                delay={0} // Managed by parent stagger
                                className={`flex flex-col h-full relative transition-all duration-300 group hover:border-[#E3FF00]/50 hover:shadow-[0_0_30px_rgba(227,255,0,0.15)] ${plan.highlight ? 'border-[#E3FF00]/50 shadow-[0_0_30px_rgba(227,255,0,0.1)]' : ''}`}
                            >
                                {plan.highlight && (
                                    <div className="absolute top-0 right-0 bg-[#E3FF00] text-black text-xs font-bold px-3 py-1 rounded-bl-lg">
                                        POPULAR
                                    </div>
                                )}
                                <h3 className="text-2xl font-bold text-white mb-2 font-oswald uppercase">{plan.name}</h3>
                                <div className="flex items-baseline mb-8">
                                    <span className="text-5xl font-bold text-[#E3FF00]">{plan.price}</span>
                                    <span className="text-gray-400 ml-1">{plan.period}</span>
                                </div>

                                <ul className="space-y-4 mb-8 flex-grow">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-center text-gray-300 group-hover:text-white transition-colors">
                                            <span className="text-[#E3FF00] mr-2">✓</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <button className={`w-full py-4 font-bold tracking-wider uppercase transition-all transform group-hover:-translate-y-1 ${plan.highlight
                                    ? 'bg-[#E3FF00] text-black hover:bg-white hover:scale-105'
                                    : 'bg-white/10 text-white hover:bg-[#E3FF00] hover:text-black'
                                    }`}>
                                    Elegir Plan
                                </button>
                            </GlassCard>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
