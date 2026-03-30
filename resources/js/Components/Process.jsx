const steps = [
    {
        number: '01',
        color: 'text-primary',
        title: 'Audit Stratégique',
        description: 'Analyse de vos processus actuels pour identifier les gisements de valeur.',
    },
    {
        number: '02',
        color: 'text-secondary',
        title: 'Conception',
        description: 'Architecture de votre solution personnalisée et choix des technologies.',
    },
    {
        number: '03',
        color: 'text-primary-fixed',
        title: 'Implémentation',
        description: 'Développement agile et intégration progressive dans vos flux de travail.',
    },
    {
        number: '04',
        color: 'text-secondary',
        title: 'Optimisation',
        description: 'Monitoring, ajustement et formation de vos équipes pour une autonomie totale.',
    },
];

export default function Process() {
    return (
        <section className="py-24 px-8 bg-surface-container-low overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <h2 className="font-headline text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
                        Le Chemin vers l'IA
                    </h2>
                    <p className="text-on-surface-variant text-lg">
                        Un processus structuré pour une transition technologique sans friction.
                    </p>
                </div>

                <div className="relative">
                    <div className="absolute top-1/2 left-0 w-full h-px bg-outline-variant/20 hidden lg:block" />
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {steps.map((step) => (
                            <div
                                key={step.number}
                                className="relative bg-background p-8 rounded-2xl border border-outline-variant/10 z-10"
                            >
                                <div className={`${step.color} font-black text-4xl mb-4 opacity-30`}>
                                    {step.number}
                                </div>
                                <h4 className="font-headline text-xl font-bold mb-3">{step.title}</h4>
                                <p className="text-on-surface-variant text-sm">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
