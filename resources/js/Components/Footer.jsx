export default function Footer() {
    return (
        <footer className="w-full border-t border-outline-variant/15 bg-background">
            <div className="flex flex-col md:flex-row justify-between items-center px-12 py-10 gap-6 max-w-7xl mx-auto">
                <div className="text-lg font-bold text-tertiary font-headline">KINETIC AI</div>

                <nav className="flex flex-wrap justify-center gap-8 font-body text-sm text-on-surface-variant">
                    <a href="#" className="hover:text-secondary transition-colors">Confidentialité</a>
                    <a href="#" className="hover:text-secondary transition-colors">Conditions</a>
                    <a href="#" className="hover:text-secondary transition-colors">Mentions Légales</a>
                    <a href="#" className="hover:text-secondary transition-colors">Support</a>
                </nav>

                <p className="text-on-surface-variant text-sm text-center md:text-right">
                    © 2024 Kinetic Monolith. Automatisation pour PME Françaises.
                </p>
            </div>
        </footer>
    );
}
