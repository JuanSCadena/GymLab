"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useMotionValueEvent, motion, useTransform } from "framer-motion";

export default function AnimacionScroll() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadProgress, setLoadProgress] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // We bind to the window scroll for the global effect, 
    // but the component itself is sticky within the parent.
    const { scrollYProgress } = useScroll();

    // Optional: Subtle scale effect as user scrolls
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
    const opacity = useTransform(scrollYProgress, [0.9, 1], [1, 0.5]); // Fade out at very end

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
                // Fallback or retry logic could go here
                console.warn(`Failed to load frame ${i}`);
                loadedCount++; // Count it anyway to avoid stalling
                if (loadedCount === frameCount) setIsLoaded(true);
            }
            imgs.push(img);
        }
        imagesRef.current = imgs;
    }, []);

    // Canvas drawing logic
    const render = useCallback((index: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Ensure canvas size matches display size for sharpness
        // But we rely on the resize handler for setting width/height

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const img = imagesRef.current[index];
        if (!img) return;

        // Image fit 'cover' logic
        const cw = canvas.width;
        const ch = canvas.height;
        const iw = img.width;
        const ih = img.height;

        const scale = Math.max(cw / iw, ch / ih); // Changed to max for 'cover' effect, min for 'contain'

        const devWidth = iw * scale;
        const devHeight = ih * scale;

        const x = (cw - devWidth) / 2;
        const y = (ch - devHeight) / 2;

        ctx.drawImage(img, x, y, devWidth, devHeight);
    }, []);

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                // High DPI displays
                const dpr = Math.min(window.devicePixelRatio, 2); // Cap at 2x for performance
                canvasRef.current.width = window.innerWidth * dpr;
                canvasRef.current.height = window.innerHeight * dpr;

                // Redraw immediately
                if (isLoaded) {
                    const currentProgress = scrollYProgress.get();
                    const frameIndex = Math.min(
                        frameCount - 1,
                        Math.floor(currentProgress * (frameCount - 1))
                    );
                    render(frameIndex);
                }
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, [isLoaded, scrollYProgress, render]);

    // Animation Loop
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (!isLoaded) return;
        const frameIndex = Math.min(
            frameCount - 1,
            Math.floor(latest * (frameCount - 1))
        );
        requestAnimationFrame(() => render(frameIndex));
    });

    // Initial render
    useEffect(() => {
        if (isLoaded) render(0);
    }, [isLoaded, render]);

    return (
        <motion.div
            ref={containerRef}
            style={{ scale, opacity }}
            className="sticky top-0 h-screen w-full overflow-hidden bg-[#050505]"
        >
            <canvas
                ref={canvasRef}
                className="block w-full h-full object-cover"
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
                    <p className="mt-4 text-white/40 font-mono text-xs tracking-widest uppercase">
                        Loading Experience {loadProgress}%
                    </p>
                </div>
            )}
        </motion.div>
    );
}
