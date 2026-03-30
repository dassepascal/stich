export default function CTA() {
    return (
        <section id="contact" className="py-32 px-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/5" />

            <div className="max-w-4xl mx-auto text-center relative z-10">
                <h2 className="font-headline text-5xl md:text-7xl font-extrabold mb-8 leading-tight">
                    Prêt à franchir le <span className="text-primary">pas ?</span>
                </h2>
                <p className="text-xl text-on-surface-variant mb-12 max-w-2xl mx-auto">
                    Prenez rendez-vous avec un de nos experts pour une démonstration gratuite des capacités
                    d'automatisation pour votre secteur.
                </p>

                <div className="inline-block p-1 bg-surface-container-highest rounded-2xl">
                    <div className="flex flex-col sm:flex-row gap-4 p-2">
                        <input
                            type="email"
                            placeholder="votre@email.fr"
                            className="bg-surface-container border-none rounded-xl px-6 py-4 w-full sm:w-80 text-on-surface focus:ring-2 focus:ring-primary transition-all"
                        />
                        <button className="bg-primary text-on-primary-fixed font-bold py-4 px-10 rounded-xl hover:bg-primary-fixed transition-all">
                            Réserver ma démo
                        </button>
                    </div>
                </div>
            </div>

            {/* Background decorations */}
            <div className="absolute -bottom-64 -left-64 w-[500px] h-[500px] bg-secondary/5 blur-[100px] rounded-full" />
            <div className="absolute -top-64 -right-64 w-[500px] h-[500px] bg-primary/5 blur-[100px] rounded-full" />
        </section>
    );
}
