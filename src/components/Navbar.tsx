"use client";

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState } from "react";
// import { Menu, X } from "lucide-react"; // Unused

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 100) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    });

    const navItems = [
        { name: "Historia", href: "#history" },
        { name: "Estadísticas", href: "#stats" },
        { name: "Planes", href: "#plans" },
        { name: "Testimonios", href: "#testimonials" },
        { name: "Ubicación", href: "#location" },
        { name: "FAQ", href: "#faq" }
    ];

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            setIsMobileOpen(false);
        }
    };

    // Determine if we should show the full compact menu
    const showFullMenu = !isScrolled || isHovered || isMobileOpen;

    return (
        <>
            {/* 
              1. INDEPENDENT FIXED LOGO 
              Always stays in the top-left corner.
              Uses mix-blend-difference to be visible against any background.
            */}
            <div
                className="fixed top-6 left-8 z-50 mix-blend-difference text-white cursor-pointer pointer-events-auto"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
                <span className="text-xl md:text-2xl font-black italic tracking-tighter uppercase font-oswald">
                    GYM LAND
                </span>
            </div>

            {/* 
              2. DYNAMIC CENTERED NAVIGATION
              Wraps only the links/menu interaction.
            */}
            <motion.nav
                className={`fixed top-0 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 ease-in-out ${isScrolled ? 'pt-4' : 'w-full pt-6'
                    /* Note: width is controlled by the inner container logic mostly, 
                       but we need z-index lower than the logo if they overlap (improbable here) */
                    }`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className={`relative flex items-center justify-center transition-all duration-500 mx-auto ${isScrolled
                    ? 'bg-black/80 backdrop-blur-md rounded-full border border-white/10 shadow-2xl shadow-[#E3FF00]/10 px-6 py-3 min-w-[120px]'
                    : 'bg-transparent' /* At top, no background */
                    }`}>

                    {/* 
                        DESKTOP STATE LOGIC 
                        - Top: Show Links directly (Centered)
                        - Scrolled: Show "MENU" Icon -> Expand to Links on Hover
                    */}

                    {/* MENU ICON (Collapsed State) */}
                    <AnimatePresence mode="wait">
                        {isScrolled && !isHovered && !isMobileOpen && (
                            <motion.div
                                key="menu-icon"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                className="text-white font-bold tracking-widest uppercase text-xs flex items-center gap-2"
                            >
                                <span className="w-2 h-2 bg-[#E3FF00] rounded-full animate-pulse" />
                                MENU
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* LINKS (Expanded or Top State) */}
                    <div className="hidden lg:flex items-center gap-6 overflow-hidden">
                        <AnimatePresence>
                            {showFullMenu && (
                                <motion.div
                                    initial={{ opacity: 0, width: 0 }}
                                    animate={{ opacity: 1, width: "auto" }}
                                    exit={{ opacity: 0, width: 0 }}
                                    className="flex gap-6"
                                >
                                    {navItems.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            onClick={(e) => handleScroll(e, item.href)}
                                            className={`text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-colors ${isScrolled ? 'text-white/80 hover:text-[#E3FF00]' : 'text-white mix-blend-difference hover:text-[#E3FF00]'
                                                }`}
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* MOBILE TOGGLE (Right side, but in this layout we might need to position it differently or keep it centered) */}
                    {/* 
                        For mobile, we usually want the burger menu on the right. 
                        Since this container is centered, let's put the mobile button absolute right?
                        Actually, let's keep the Desktop focus. For mobile, we can just use a fixed button top-right.
                     */}
                </div>
            </motion.nav>

            {/* 3. MOBILE MENU BUTTON (Fixed Top Right independently) */}
            <button
                className="lg:hidden fixed top-6 right-8 z-50 text-white mix-blend-difference focus:outline-none pointer-events-auto"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
                {isMobileOpen ? (
                    <div className="text-[#E3FF00] font-bold">CLOSE</div>
                ) : (
                    <div className="space-y-1.5 p-1 flex flex-col items-end">
                        <div className="w-8 h-[2px] bg-white"></div>
                        <div className="w-6 h-[2px] bg-white"></div>
                    </div>
                )}
            </button>


            {/* MOBILE MENU FULLSCREEN OVERLAY */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center pt-24 lg:hidden"
                    >
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                onClick={(e) => handleScroll(e, item.href)}
                                className="text-3xl font-black italic text-white hover:text-[#E3FF00] py-4 uppercase font-oswald"
                            >
                                {item.name}
                            </a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
