const services = [
    {
        icon: 'hub',
        iconColor: 'text-primary',
        bgColor: 'bg-primary/10 group-hover:bg-primary/20',
        hoverBorder: 'hover:border-primary/30',
        linkColor: 'text-primary',
        title: 'Intégration de Systèmes',
        description:
            'Connectez vos outils existants (CRM, ERP, Web) dans un écosystème fluide et synchronisé en temps réel.',
    },
    {
        icon: 'bolt',
        iconColor: 'text-secondary',
        bgColor: 'bg-secondary/10 group-hover:bg-secondary/20',
        hoverBorder: 'hover:border-secondary/30',
        linkColor: 'text-secondary',
        title: 'Automatisation Intelligente',
        description:
            'Éliminez les tâches répétitives. Nos workflows autonomes gèrent vos processus 24/7 sans erreur humaine.',
    },
    {
        icon: 'psychology',
        iconColor: 'text-primary-fixed',
        bgColor: 'bg-primary-fixed/10 group-hover:bg-primary-fixed/20',
        hoverBorder: 'hover:border-primary-fixed/30',
        linkColor: 'text-primary-fixed',
        title: 'IA sur Mesure',
        description:
            "Développement d'agents IA spécialisés capables d'analyser vos données et d'aider à la prise de décision stratégique.",
    },
];

export default function Services() {
    return (
        <section id="services" className="py-24 px-8 bg-surface-container-low">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16">
                    <h2 className="font-headline text-4xl md:text-5xl font-extrabold mb-4">
                        Ingénierie du Futur
                    </h2>
                    <p className="text-on-surface-variant max-w-2xl">
                        Trois piliers pour transformer votre infrastructure numérique en un moteur de
                        performance automatisé.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service) => (
                        <div
                            key={service.title}
                            className={`group p-8 bg-surface-container rounded-2xl border border-outline-variant/5 ${service.hoverBorder} transition-all duration-500`}
                        >
                            <div
                                className={`w-14 h-14 rounded-xl ${service.bgColor} flex items-center justify-center mb-6 transition-colors`}
                            >
                                <span className={`material-symbols-outlined ${service.iconColor} text-3xl`}>
                                    {service.icon}
                                </span>
                            </div>
                            <h3 className="font-headline text-2xl font-bold mb-4">{service.title}</h3>
                            <p className="text-on-surface-variant leading-relaxed mb-6">
                                {service.description}
                            </p>
                            <a
                                href="#"
                                className={`${service.linkColor} font-bold flex items-center gap-2 text-sm group-hover:gap-4 transition-all`}
                            >
                                En savoir plus{' '}
                                <span className="material-symbols-outlined">chevron_right</span>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
