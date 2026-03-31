import { Link, usePage } from '@inertiajs/react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const NAV_LINKS = [
    { label: 'Accueil',       href: '/',              exact: true },
    { label: 'Services',      href: '/#services',     exact: false, anchor: true },
    { label: 'Automatisation',href: '/automatisation', exact: false },
    { label: 'SME Solutions', href: '/sme-solutions',  exact: false },
    { label: 'Blog',          href: '/blog',           exact: false },
    { label: 'Contact',       href: '/contact',        exact: false },
];

const drawer = {
    hidden: { x: '100%' },
    show: {
        x: 0,
        transition: { type: 'tween', duration: 0.35, ease: [0.32, 0.72, 0, 1] },
    },
    exit: {
        x: '100%',
        transition: { type: 'tween', duration: 0.28, ease: [0.32, 0.72, 0, 1] },
    },
};

const stagger = {
    show: { transition: { staggerChildren: 0.05, delayChildren: 0.12 } },
};

const linkItem = {
    hidden: { opacity: 0, x: 24 },
    show:   { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
};

export default function Navbar() {
    const { url, props } = usePage();
    const auth = props.auth;

    const [open, setOpen] = useState(false);

    const { scrollY } = useScroll();
    const bgOpacity   = useTransform(scrollY, [0, 80], [0.7, 0.95]);
    const blurAmount  = useTransform(scrollY, [0, 80], [12, 24]);
    const shadowAlpha = useTransform(scrollY, [0, 80], [0.04, 0.18]);

    // Bloquer le scroll body quand le menu est ouvert
    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [open]);

    // Fermer le menu sur changement de route
    useEffect(() => { setOpen(false); }, [url]);

    const isActive = (link) => {
        if (link.anchor) return false;
        if (link.exact)  return url === '/';
        return url.startsWith(link.href);
    };

    const desktopClass = (link) =>
        isActive(link)
            ? 'text-primary border-b-2 border-primary pb-1'
            : 'text-on-surface-variant hover:text-tertiary transition-colors';

    const mobileClass = (link) =>
        isActive(link)
            ? 'text-primary'
            : 'text-on-surface hover:text-primary transition-colors';

    return (
        <>
            <motion.header
                className="fixed top-0 w-full z-50"
                style={{
                    backgroundColor: useTransform(bgOpacity, (v) => `rgba(14,14,14,${v})`),
                    backdropFilter:       useTransform(blurAmount, (v) => `blur(${v}px)`),
                    WebkitBackdropFilter: useTransform(blurAmount, (v) => `blur(${v}px)`),
                    boxShadow:            useTransform(shadowAlpha, (v) => `0 20px 40px rgba(94,16,0,${v})`),
                }}
            >
                <div className="flex justify-between items-center px-6 lg:px-8 py-4 max-w-7xl mx-auto">
                    {/* Logo */}
                    <Link href="/" className="text-2xl font-black text-tertiary tracking-tighter font-headline">
                        KINETIC AI
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden lg:flex items-center space-x-8 font-headline font-bold tracking-tight">
                        {NAV_LINKS.map((link) =>
                            link.anchor ? (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className="text-on-surface-variant hover:text-tertiary transition-colors"
                                >
                                    {link.label}
                                </a>
                            ) : (
                                <Link key={link.href} href={link.href} className={desktopClass(link)}>
                                    {link.label}
                                </Link>
                            )
                        )}
                    </nav>

                    {/* Desktop CTA */}
                    <div className="hidden lg:flex items-center gap-3">
                        {auth?.user ? (
                            <Link
                                href="/dashboard"
                                className="border border-outline-variant/30 text-on-surface-variant font-bold px-5 py-2 rounded-xl hover:bg-surface-container transition-colors text-sm"
                            >
                                Dashboard
                            </Link>
                        ) : null}
                        <Link
                            href="/contact"
                            className="bg-gradient-to-r from-primary-dim to-primary text-on-primary-fixed font-bold px-6 py-2 rounded-xl active:scale-90 transition-transform text-sm"
                        >
                            Démarrer
                        </Link>
                    </div>

                    {/* Mobile: burger + CTA inline */}
                    <div className="lg:hidden flex items-center gap-3">
                        <Link
                            href="/contact"
                            className="bg-gradient-to-r from-primary-dim to-primary text-on-primary-fixed font-bold px-4 py-2 rounded-xl text-sm"
                        >
                            Démarrer
                        </Link>
                        <button
                            onClick={() => setOpen(true)}
                            className="p-2 rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
                            aria-label="Ouvrir le menu"
                        >
                            <span className="material-symbols-outlined text-2xl">menu</span>
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile drawer */}
            <AnimatePresence>
                {open && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm lg:hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            onClick={() => setOpen(false)}
                        />

                        {/* Drawer */}
                        <motion.div
                            className="fixed top-0 right-0 h-full w-[80vw] max-w-sm z-[70] flex flex-col bg-[#0e0e0e] border-l border-white/10 backdrop-blur-xl lg:hidden"
                            variants={drawer}
                            initial="hidden"
                            animate="show"
                            exit="exit"
                        >
                            {/* Drawer header */}
                            <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
                                <span className="text-lg font-black text-tertiary tracking-tighter font-headline">
                                    KINETIC AI
                                </span>
                                <button
                                    onClick={() => setOpen(false)}
                                    className="p-2 rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
                                    aria-label="Fermer le menu"
                                >
                                    <span className="material-symbols-outlined text-2xl">close</span>
                                </button>
                            </div>

                            {/* Links */}
                            <motion.nav
                                className="flex flex-col px-4 py-6 gap-1 flex-1"
                                variants={stagger}
                                initial="hidden"
                                animate="show"
                            >
                                {NAV_LINKS.map((link) => (
                                    <motion.div key={link.href} variants={linkItem}>
                                        {link.anchor ? (
                                            <a
                                                href={link.href}
                                                onClick={() => setOpen(false)}
                                                className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-bold text-on-surface hover:text-primary hover:bg-surface-container transition-colors"
                                            >
                                                {link.label}
                                            </a>
                                        ) : (
                                            <Link
                                                href={link.href}
                                                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-bold transition-colors ${
                                                    isActive(link)
                                                        ? 'text-primary bg-primary/8'
                                                        : 'text-on-surface hover:text-primary hover:bg-surface-container'
                                                }`}
                                            >
                                                {link.label}
                                                {isActive(link) && (
                                                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                                                )}
                                            </Link>
                                        )}
                                    </motion.div>
                                ))}
                            </motion.nav>

                            {/* Drawer footer — CTAs */}
                            <div className="px-6 py-6 border-t border-white/8 flex flex-col gap-3">
                                {auth?.user ? (
                                    <Link
                                        href="/dashboard"
                                        className="w-full text-center border border-outline-variant/30 text-on-surface font-bold py-3 rounded-xl hover:bg-surface-container transition-colors text-sm"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <Link
                                        href="/login"
                                        className="w-full text-center border border-outline-variant/30 text-on-surface font-bold py-3 rounded-xl hover:bg-surface-container transition-colors text-sm"
                                    >
                                        Connexion
                                    </Link>
                                )}
                                <Link
                                    href="/contact"
                                    className="w-full text-center bg-gradient-to-r from-primary-dim to-primary text-on-primary-fixed font-bold py-3 rounded-xl text-sm"
                                >
                                    Démarrer
                                </Link>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
