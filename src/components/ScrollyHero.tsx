"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useTransform, motion, useMotionValueEvent } from "framer-motion";
import TextReveal from "./TextReveal";

export default function ScrollyHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadProgress, setLoadProgress] = useState(0);

    // Scroll Track
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const opacity = useTransform(scrollYProgress, [0.9, 1], [1, 0]);

    // --- STAGE 1: HERO TITLE ---
    // Fade out as we scroll deep
    const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.4], [1, 1.1]);

    const frameCount = 240;

    // Preload images
    useEffect(() => {
        let loadedCount = 0;
        const imgs: HTMLImageElement[] = [];

        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            const src = `/images/sequence/ezgif-frame-${i.toString().padStart(3, "0")}.jpg`;
            img.src = src;
            img.onload = () => {
                loadedCount++;
                setLoadProgress(Math.round((loadedCount / frameCount) * 100));
                if (loadedCount === frameCount) setIsLoaded(true);
            };
            img.onerror = () => {
                loadedCount++;
                if (loadedCount === frameCount) setIsLoaded(true);
            }
            imgs.push(img);
        }
        imagesRef.current = imgs;
    }, []);

    const render = useCallback((index: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const img = imagesRef.current[index];
        if (!img) return;

        const cw = canvas.width;
        const ch = canvas.height;
        const iw = img.width;
        const ih = img.height;

        const scale = Math.max(cw / iw, ch / ih);
        const devWidth = iw * scale;
        const devHeight = ih * scale;
        const x = (cw - devWidth) / 2;
        const y = (ch - devHeight) / 2;

        ctx.drawImage(img, x, y, devWidth, devHeight);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                const dpr = Math.min(window.devicePixelRatio, 2);
                canvasRef.current.width = window.innerWidth * dpr;
                canvasRef.current.height = window.innerHeight * dpr;
                if (isLoaded) {
                    const currentProgress = scrollYProgress.get();
                    const frameIndex = Math.min(frameCount - 1, Math.floor(currentProgress * (frameCount - 1)));
                    render(frameIndex);
                }
            }
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, [isLoaded, scrollYProgress, render]);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (!isLoaded) return;
        const frameIndex = Math.min(frameCount - 1, Math.floor(latest * (frameCount - 1)));
        requestAnimationFrame(() => render(frameIndex));
    });

    useEffect(() => {
        if (isLoaded) render(0);
    }, [isLoaded, render]);

    return (
        <section ref={containerRef} className="relative h-[400vh] bg-[#050505]">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

                {/* --- HERO TITLE (BEHIND CANVAS) --- */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2.5, ease: "easeOut" }} // "Apareciendo poco a poco"
                    style={{
                        opacity: heroOpacity,
                        scale: heroScale,
                    }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center z-0 p-4"
                >
                    <div className="relative">
                        {/* We use a slightly gray text so that 'lighten' mode on canvas covers it 
                            where the image is bright (the body), but shows it where image is dark (bg) 
                        */}
                        <h1
                            className="text-8xl md:text-[12rem] font-black italic tracking-tighter text-[#888] font-oswald leading-[0.8]"
                        // Removed Outline stroke here to ensure solid fill blends correctly with image
                        >
                            GYM LAND
                        </h1>
                    </div>

                    <div className="mt-12 overflow-hidden bg-black/80 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 z-20">
                        <TextReveal
                            text="SCROLL TO START"
                            tag="p"
                            className="text-xs font-mono text-[#E3FF00] tracking-[0.8em] uppercase"
                            delay={1.2}
                        />
                    </div>
                </motion.div>

                {/* --- CANVAS (ON TOP) --- */}
                <motion.canvas
                    ref={canvasRef}
                    style={{ opacity }}
                    className="block w-full h-full object-cover z-10 relative mix-blend-lighten"
                />

                {/* DARK GRADIENT VIGNETTE (ON TOP OF CANVAS) */}
                <div
                    className="absolute inset-0 pointer-events-none z-20"
                    style={{
                        background: `
                            radial-gradient(circle at center, transparent 40%, #050505 95%),
                            linear-gradient(to bottom, transparent 70%, #050505 100%)
                        `
                    }}
                />

                {/* Loading Screen */}
                {!isLoaded && (
                    <div className="absolute inset-0 flex flex-col justify-center items-center bg-[#050505] z-50">
                        <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-[#E3FF00]"
                                initial={{ width: 0 }}
                                animate={{ width: `${loadProgress}%` }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
