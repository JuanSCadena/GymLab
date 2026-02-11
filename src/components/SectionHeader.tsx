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
            <div className=""> {/* Removed overflow-hidden */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-4xl md:text-6xl font-bold text-white uppercase tracking-tight font-oswald"
                >
                    {title}
                </motion.h2>
            </div>
        </div>
    );
}
