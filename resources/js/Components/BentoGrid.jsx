export default function BentoGrid() {
    return (
        <section className="py-24 px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 grid-rows-2 gap-6 h-auto md:h-[600px]">
                    {/* Large card — Expertise */}
                    <div className="md:col-span-8 md:row-span-1 bg-surface-container rounded-2xl p-10 flex flex-col justify-end relative overflow-hidden group">
                        <img
                            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
                            alt="SME Excellence"
                            className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="relative z-10">
                            <h3 className="font-headline text-3xl font-extrabold mb-4">
                                Expertise Locale, Vision Mondiale
                            </h3>
                            <p className="text-on-surface-variant max-w-lg">
                                Nous comprenons les défis uniques des PME françaises. Notre accompagnement est
                                direct, transparent et orienté résultats.
                            </p>
                        </div>
                    </div>

                    {/* Stats card */}
                    <div className="md:col-span-4 md:row-span-1 bg-gradient-to-br from-primary-container to-primary-dim rounded-2xl p-10 flex flex-col items-center justify-center text-center">
                        <div className="text-6xl font-black text-on-primary-fixed mb-2">40%</div>
                        <p className="text-on-primary font-bold text-lg">
                            Gain de productivité moyen constaté par nos clients
                        </p>
                    </div>

                    {/* Quality card */}
                    <div className="md:col-span-4 md:row-span-1 bg-surface-container-high rounded-2xl p-10 flex flex-col justify-between">
                        <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                            <span className="material-symbols-outlined text-secondary">verified</span>
                        </div>
                        <div>
                            <h4 className="font-headline text-xl font-bold mb-2">Qualité Garantie</h4>
                            <p className="text-on-surface-variant text-sm">
                                Une maintenance continue pour assurer que votre IA reste performante face aux
                                évolutions du marché.
                            </p>
                        </div>
                    </div>

                    {/* Security card */}
                    <div className="md:col-span-8 md:row-span-1 bg-surface-container rounded-2xl p-10 flex items-center gap-12">
                        <div className="flex-1">
                            <h3 className="font-headline text-3xl font-extrabold mb-4">
                                Sécurité &amp; Souveraineté
                            </h3>
                            <p className="text-on-surface-variant">
                                Vos données restent les vôtres. Nous privilégions des solutions respectueuses de
                                la confidentialité et du RGPD.
                            </p>
                        </div>
                        <div className="hidden sm:block">
                            <span className="material-symbols-outlined text-[80px] text-outline-variant opacity-20">
                                shield_lock
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
