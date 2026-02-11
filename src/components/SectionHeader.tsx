"use client";

import TextReveal from "./TextReveal";
import { motion } from "framer-motion";

interface SectionHeaderProps {
    title: string;
    subtitle: string;
    align?: "left" | "center" | "right";
    className?: string;
}

export default function SectionHeader({ title, subtitle, align = "center", className = "" }: SectionHeaderProps) {
    const alignClass = align === "left" ? "items-start text-left" : align === "right" ? "items-end text-right" : "items-center text-center";

    return (
        <div className={`flex flex-col ${alignClass} mb-16 ${className}`}>
            <TextReveal
                text={subtitle}
                tag="span"
                className="text-[#E3FF00] text-sm font-mono tracking-widest uppercase mb-2"
            />
            <div className="overflow-hidden">
                <motion.h2
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-4xl md:text-6xl font-bold text-white uppercase tracking-tight font-oswald"
                >
                    {title}
                </motion.h2>
            </div>
        </div>
    );
}
