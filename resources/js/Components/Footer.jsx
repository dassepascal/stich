import { Link } from '@inertiajs/react';
import NewsletterWidget from '@/Components/NewsletterWidget';

export default function Footer() {
    return (
        <footer className="w-full border-t border-outline-variant/15 bg-background">
            <div className="max-w-7xl mx-auto px-8 pt-14 pb-10">
                {/* Newsletter */}
                <NewsletterWidget />

                {/* Bottom bar */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-10 mt-10 border-t border-outline-variant/10 gap-6">
                    <div className="text-lg font-bold text-tertiary font-headline">KINETIC AI</div>

                    <nav className="flex flex-wrap justify-center gap-8 font-body text-sm text-on-surface-variant">
                        <Link href="/confidentialite" className="hover:text-secondary transition-colors">
                            Confidentialité
                        </Link>
                        <Link href="/conditions" className="hover:text-secondary transition-colors">
                            Conditions
                        </Link>
                        <Link href="/mentions-legales" className="hover:text-secondary transition-colors">
                            Mentions Légales
                        </Link>
                        <Link href="/contact" className="hover:text-secondary transition-colors">
                            Support
                        </Link>
                    </nav>

                    <p className="text-on-surface-variant text-sm text-center md:text-right">
                        © 2025 Kinetic Monolith. Automatisation pour PME Françaises.
                    </p>
                </div>
            </div>
        </footer>
    );
}
