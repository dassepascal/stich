import { Link, usePage } from '@inertiajs/react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Navbar() {
    const { url } = usePage();
    const { scrollY } = useScroll();

    // 0→1 over first 80px of scroll
    const bgOpacity   = useTransform(scrollY, [0, 80], [0.7, 0.95]);
    const blurAmount  = useTransform(scrollY, [0, 80], [12, 24]);
    const shadowAlpha = useTransform(scrollY, [0, 80], [0.04, 0.18]);

    const isActive = (href) => url.startsWith(href);

    const linkClass = (href) =>
        isActive(href)
            ? 'text-primary border-b-2 border-primary pb-1'
            : 'text-on-surface-variant hover:text-tertiary transition-colors';

    return (
        <motion.header
            className="fixed top-0 w-full z-50"
            style={{
                backgroundColor: useTransform(bgOpacity, (v) => `rgba(14,14,14,${v})`),
                backdropFilter: useTransform(blurAmount, (v) => `blur(${v}px)`),
                WebkitBackdropFilter: useTransform(blurAmount, (v) => `blur(${v}px)`),
                boxShadow: useTransform(shadowAlpha, (v) => `0 20px 40px rgba(94,16,0,${v})`),
            }}
        >
            <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
                <Link href="/" className="text-2xl font-black text-tertiary tracking-tighter font-headline">
                    KINETIC AI
                </Link>

                <nav className="hidden md:flex items-center space-x-8 font-headline font-bold tracking-tight">
                    <a href="/#services" className="text-on-surface-variant hover:text-tertiary transition-colors">
                        Services
                    </a>
                    <Link href="/automatisation" className={linkClass('/automatisation')}>
                        Automatisation
                    </Link>
                    <Link href="/sme-solutions" className={linkClass('/sme-solutions')}>
                        SME Solutions
                    </Link>
                    <Link href="/contact" className={linkClass('/contact')}>
                        Contact
                    </Link>
                </nav>

                <Link
                    href="/contact"
                    className="bg-gradient-to-r from-primary-dim to-primary text-on-primary-fixed font-bold px-6 py-2 rounded-xl scale-95 active:scale-90 transition-transform"
                >
                    Démarrer
                </Link>
            </div>
        </motion.header>
    );
}
