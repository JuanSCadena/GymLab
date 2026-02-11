"use client";

import { motion, useInView, Variant } from "framer-motion";
import { useRef } from "react";

interface TextRevealProps {
    text: string;
    className?: string;
    tag?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
    delay?: number;
    direction?: "up" | "down" | "none";
}

export default function TextReveal({
    text,
    className = "",
    tag: Tag = "p",
    delay = 0,
    direction = "up",
}: TextRevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

    const container: Record<string, Variant> = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: delay,
            },
        },
    };

    const item: Record<string, Variant> = {
        hidden: {
            opacity: 0,
            y: direction === "up" ? 20 : direction === "down" ? -20 : 0,
            filter: "blur(10px)",
        },
        show: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                duration: 0.8,
                ease: [0.2, 0.65, 0.3, 0.9], // Custom cubic-bezier for "premium" feel
            },
        },
    };

    // Split text into words for animation
    const words = text.split(" ");

    return (
        <Tag ref={ref} className={`${className} inline-block`}>
            <motion.span
                variants={container}
                initial="hidden"
                animate={isInView ? "show" : "hidden"}
                className="inline-block"
            >
                {words.map((word, i) => (
                    <motion.span
                        key={i}
                        variants={item}
                        className="inline-block mr-[0.25em] whitespace-nowrap"
                    >
                        {word}
                    </motion.span>
                ))}
            </motion.span>
        </Tag>
    );
}
