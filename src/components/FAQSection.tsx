"use client";

import { useState } from "react";
import SectionHeader from "./SectionHeader";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
    {
        q: "¿Necesito experiencia previa para unirme?",
        a: "No. GymLand está diseñado para todos los niveles. Ofrecemos inducciones gratuitas y planes de entrenamiento para principiantes."
    },
    {
        q: "¿Puedo congelar mi membresía?",
        a: "Sí, permitimos congelar membresías por motivos de viaje o salud hasta por 3 meses al año sin costo adicional."
    },
    {
        q: "¿Tienen duchas y lockers?",
        a: "Absolutamente. Contamos con vestuarios de lujo, duchas privadas, secadores y lockers digitales de alta seguridad."
    },
    {
        q: "¿Ofrecen entrenamiento personal?",
        a: "Contamos con un equipo de entrenadores de élite disponibles para sesiones privadas o diseño de programas personalizados."
    }
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="faq" className="relative py-24 px-4 md:px-8 max-w-4xl mx-auto">
            <SectionHeader title="Preguntas Frecuentes" subtitle="Dudas Comunes" />

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8 }}
                className="space-y-4"
            >
                {faqs.map((faq, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="border-b border-white/10 pb-4"
                    >
                        <button
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            className="w-full flex justify-between items-center text-left py-4 focus:outline-none group"
                        >
                            <span className={`text-xl font-medium transition-all duration-300 ${openIndex === index ? 'text-[#E3FF00] pl-2' : 'text-white group-hover:text-gray-300 group-hover:pl-2'}`}>
                                {faq.q}
                            </span>
                            <span className={`text-2xl transition-transform duration-300 ${openIndex === index ? 'rotate-45 text-[#E3FF00]' : 'text-white/40 group-hover:text-white'}`}>
                                +
                            </span>
                        </button>

                        <AnimatePresence>
                            {openIndex === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="overflow-hidden"
                                >
                                    <p className="text-gray-400 pb-4 leading-relaxed pl-2">
                                        {faq.a}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
