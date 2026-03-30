const items = [
    {
        problem: 'Perte de temps sur les tâches répétitives',
        problemDetail: 'Saisie manuelle, relances clients, génération de rapports — vos équipes passent des heures sur des tâches sans valeur ajoutée.',
        solution: 'Workflows automatisés 24/7',
        solutionDetail: 'Nos agents IA prennent en charge ces processus intégralement, libérant vos équipes pour des missions stratégiques.',
        icon: 'hourglass_empty',
    },
    {
        problem: 'Erreurs de saisie & incohérences de données',
        problemDetail: 'Les interventions humaines répétées multiplient les erreurs : doublons, mauvaises affectations, données obsolètes dans votre CRM.',
        solution: 'Données fiables en temps réel',
        solutionDetail: 'Synchronisation automatique entre vos outils (CRM, ERP, comptabilité) avec contrôle de cohérence à chaque étape.',
        icon: 'error_outline',
    },
    {
        problem: 'Décisions prises à l\'aveugle',
        problemDetail: 'Sans tableaux de bord centralisés, les dirigeants manquent de visibilité pour piloter leur activité efficacement.',
        solution: 'Reporting IA en temps réel',
        solutionDetail: 'Vos données consolidées, analysées et présentées en dashboards actionnables — disponibles à tout moment.',
        icon: 'visibility_off',
    },
    {
        problem: 'Support client débordé & lent',
        problemDetail: 'Les tickets s\'accumulent, les délais de réponse s\'allongent, et la satisfaction client en pâtit.',
        solution: 'Agents IA conversationnels',
        solutionDetail: 'Chatbots intelligents qui répondent instantanément aux questions fréquentes et escaladent les cas complexes à vos équipes.',
        icon: 'support_agent',
    },
];

export default function ProblemSolution() {
    return (
        <section className="py-24 px-8 bg-surface-container-low">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="inline-block px-3 py-1 bg-surface-container rounded-full text-[0.7rem] uppercase tracking-widest font-bold text-on-surface-variant border border-outline-variant/15 mb-4">
                        Défis & Solutions
                    </span>
                    <h2 className="font-headline text-4xl md:text-5xl font-extrabold mb-4">
                        Vos problèmes, nos réponses
                    </h2>
                    <p className="text-on-surface-variant max-w-2xl mx-auto">
                        Chaque PME est unique, mais certains défis opérationnels sont universels. Voici comment Kinetic AI les transforme en avantages compétitifs.
                    </p>
                </div>

                <div className="space-y-6">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-outline-variant/10"
                        >
                            {/* Problème */}
                            <div className="p-8 bg-surface-container flex gap-5 items-start">
                                <div className="w-10 h-10 rounded-lg bg-error/10 flex items-center justify-center shrink-0 mt-1">
                                    <span className="material-symbols-outlined text-error text-xl">{item.icon}</span>
                                </div>
                                <div>
                                    <p className="text-[0.65rem] uppercase tracking-widest font-bold text-error/70 mb-2">
                                        Problème
                                    </p>
                                    <h3 className="font-headline text-lg font-bold mb-2 text-on-surface">
                                        {item.problem}
                                    </h3>
                                    <p className="text-on-surface-variant text-sm leading-relaxed">
                                        {item.problemDetail}
                                    </p>
                                </div>
                            </div>

                            {/* Solution */}
                            <div className="p-8 bg-surface-container-high flex gap-5 items-start border-l border-outline-variant/10">
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                                    <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                                </div>
                                <div>
                                    <p className="text-[0.65rem] uppercase tracking-widest font-bold text-primary/70 mb-2">
                                        Solution Kinetic AI
                                    </p>
                                    <h3 className="font-headline text-lg font-bold mb-2 text-on-surface">
                                        {item.solution}
                                    </h3>
                                    <p className="text-on-surface-variant text-sm leading-relaxed">
                                        {item.solutionDetail}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
