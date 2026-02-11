"use client";

export default function Footer() {
    return (
        <footer className="py-12 bg-black border-t border-white/5 text-center">
            <h2 className="text-4xl font-bold text-white tracking-tighter mb-4">GYMLAND</h2>
            <div className="flex justify-center gap-6 mb-8 text-sm text-gray-500 uppercase tracking-widest">
                <a href="#" className="hover:text-[#E3FF00] transition-colors">Instagram</a>
                <a href="#" className="hover:text-[#E3FF00] transition-colors">Twitter</a>
                <a href="#" className="hover:text-[#E3FF00] transition-colors">Contact</a>
            </div>
            <p className="text-gray-700 text-xs text-balance">
                © {new Date().getFullYear()} GymLand Inc. All rights reserved. <br />
                Designed for greatness.
            </p>
        </footer>
    );
}
