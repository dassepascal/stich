import { Link, usePage } from '@inertiajs/react';

export default function Navbar() {
    const { url } = usePage();

    const isActive = (href) => url.startsWith(href);

    const linkClass = (href) =>
        isActive(href)
            ? 'text-primary border-b-2 border-primary pb-1'
            : 'text-on-surface-variant hover:text-tertiary transition-colors';

    return (
        <header className="fixed top-0 w-full z-50 bg-[#0e0e0e]/80 backdrop-blur-xl shadow-[0_20px_40px_rgba(94,16,0,0.08)]">
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
        </header>
    );
}
