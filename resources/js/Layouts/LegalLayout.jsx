import { Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import CursorFollower from '@/Components/CursorFollower';
import { motion } from 'framer-motion';

export default function LegalLayout({ title, lastUpdated, children }) {
    return (
        <>
            <style>{`
                * { cursor: none !important; }
                .material-symbols-outlined {
                    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
                }
            `}</style>

            <CursorFollower />
            <Navbar />

            <main className="pt-32 pb-24 px-8 min-h-screen">
                <motion.div
                    className="max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                >
                    {/* Back link */}
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors mb-10"
                    >
                        <span className="material-symbols-outlined text-base">arrow_back</span>
                        Retour à l'accueil
                    </Link>

                    {/* Header */}
                    <div className="mb-12 pb-8 border-b border-outline-variant/15">
                        <p className="text-xs uppercase tracking-widest text-on-surface-variant mb-3 font-bold">
                            Document légal
                        </p>
                        <h1 className="font-headline text-4xl md:text-5xl font-extrabold text-on-surface mb-4">
                            {title}
                        </h1>
                        {lastUpdated && (
                            <p className="text-sm text-on-surface-variant">
                                Dernière mise à jour : <span className="text-primary">{lastUpdated}</span>
                            </p>
                        )}
                    </div>

                    {/* Content */}
                    <div className="legal-content text-on-surface-variant leading-relaxed">
                        {children}
                    </div>
                </motion.div>
            </main>

            <Footer />

            <style>{`
                .legal-content h2 {
                    font-family: var(--font-headline, sans-serif);
                    font-size: 1.4rem;
                    font-weight: 700;
                    color: var(--color-primary, #ff8f73);
                    margin-top: 2.5rem;
                    margin-bottom: 0.75rem;
                }
                .legal-content h3 {
                    font-size: 1rem;
                    font-weight: 700;
                    color: #e5e5e5;
                    margin-top: 1.5rem;
                    margin-bottom: 0.5rem;
                }
                .legal-content p {
                    margin-bottom: 1rem;
                }
                .legal-content ul {
                    list-style: disc;
                    padding-left: 1.5rem;
                    margin-bottom: 1rem;
                }
                .legal-content ul li {
                    margin-bottom: 0.4rem;
                }
                .legal-content a {
                    color: #ff8f73;
                    text-decoration: underline;
                    text-underline-offset: 3px;
                }
                .legal-content strong {
                    color: #e5e5e5;
                    font-weight: 600;
                }
            `}</style>
        </>
    );
}
