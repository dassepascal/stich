import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import CTA from '@/Components/CTA';
import ProblemSolution from '@/Components/ProblemSolution';

// Grille de cas d'usage
const useCases = [
    {
        icon: 'receipt_long',
        color: 'text-primary',
        bg: 'bg-primary/10 group-hover:bg-primary/20',
        title: 'Automatisation Facturation',
        description: 'Génération, envoi et suivi des factures sans intervention manuelle. Relances automatiques et rapprochement comptable en temps réel.',
        tag: 'Finance',
    },
    {
        icon: 'support_agent',
        color: 'text-secondary',
        bg: 'bg-secondary/10 group-hover:bg-secondary/20',
        title: 'Support Client IA',
        description: 'Agent conversationnel formé sur votre base de connaissances. Répond 24/7 et transfère les cas complexes à vos équipes avec contexte complet.',
        tag: 'Service Client',
    },
    {
        icon: 'analytics',
        color: 'text-primary-fixed',
        bg: 'bg-primary-fixed/10 group-hover:bg-primary-fixed/20',
        title: 'Analyse de Données',
        description: 'Consolidation de vos sources de données et génération de rapports exécutifs automatiques chaque matin. Prise de décision basée sur les faits.',
        tag: 'Business Intelligence',
    },
    {
        icon: 'inventory_2',
        color: 'text-primary',
        bg: 'bg-primary/10 group-hover:bg-primary/20',
        title: 'Gestion des Stocks',
        description: 'Prévision des ruptures, réapprovisionnement automatique et alertes en temps réel. Réduisez les pertes et optimisez votre trésorerie.',
        tag: 'Logistique',
    },
    {
        icon: 'campaign',
        color: 'text-secondary',
        bg: 'bg-secondary/10 group-hover:bg-secondary/20',
        title: 'Marketing Automatisé',
        description: 'Segmentation client, emails personnalisés et campagnes déclenchées par comportement. Votre marketing travaille même quand vous dormez.',
        tag: 'Marketing',
    },
    {
        icon: 'manage_accounts',
        color: 'text-primary-fixed',
        bg: 'bg-primary-fixed/10 group-hover:bg-primary-fixed/20',
        title: 'Onboarding RH',
        description: 'Automatisation du parcours d\'intégration : contrats, accès, formations, rappels. Chaque nouveau collaborateur bénéficie d\'une expérience fluide.',
        tag: 'Ressources Humaines',
    },
];

export default function SmeSolutions() {
    return (
        <>
            <Head title="SME Solutions | KINETIC AI">
                <meta head-key="description" name="description" content="Des solutions IA clé en main pensées pour les PME. Facturation, relation client, RH, logistique : KINETIC AI identifie et automatise vos processus à fort impact." />
            </Head>

            <style>{`
                .material-symbols-outlined {
                    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
                }
            `}</style>

            <Navbar currentPage="sme-solutions" />

            <main className="pt-24">
                {/* Hero */}
                <section
                    className="relative py-28 px-8 overflow-hidden"
                    style={{
                        background:
                            'radial-gradient(circle at 30% 50%, rgba(255, 143, 115, 0.12) 0%, rgba(14, 14, 14, 1) 65%)',
                    }}
                >
                    <div className="max-w-7xl mx-auto">
                        <div className="max-w-3xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container rounded-full mb-6 border border-outline-variant/15">
                                <span className="material-symbols-outlined text-secondary text-sm">corporate_fare</span>
                                <span className="text-[0.7rem] uppercase tracking-widest font-bold text-on-surface-variant">
                                    Pour les PME Françaises
                                </span>
                            </div>

                            <h1 className="font-headline font-extrabold text-5xl md:text-7xl leading-none tracking-tighter mb-8 text-on-surface">
                                Solutions IA{' '}
                                <span className="text-primary italic">sur mesure</span>
                                <br />
                                pour les PME Françaises
                            </h1>

                            <p className="text-on-surface-variant text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
                                Un accompagnement de A à Z — du diagnostic initial jusqu'à l'optimisation continue. Nous construisons avec vous des systèmes qui s'adaptent à votre réalité opérationnelle, pas l'inverse.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <a
                                    href="#use-cases"
                                    className="bg-gradient-to-br from-primary-dim to-primary text-on-primary-fixed font-bold py-4 px-10 rounded-xl hover:shadow-[0_0_30px_rgba(255,143,115,0.3)] transition-all"
                                >
                                    Voir les Solutions
                                </a>
                                <a
                                    href="#contact"
                                    className="border border-outline-variant/30 text-on-surface font-bold py-4 px-10 rounded-xl hover:bg-surface-container transition-all flex items-center gap-2"
                                >
                                    Consultation gratuite
                                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Stats bar */}
                    <div className="max-w-7xl mx-auto mt-20">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-outline-variant/10 rounded-2xl overflow-hidden border border-outline-variant/10">
                            {[
                                { value: '+40%', label: 'Productivité moyenne' },
                                { value: '24/7', label: 'Disponibilité des agents' },
                                { value: '-60%', label: 'Erreurs opérationnelles' },
                                { value: '< 3 mois', label: 'Retour sur investissement' },
                            ].map((stat) => (
                                <div key={stat.label} className="bg-surface-container px-8 py-6 text-center">
                                    <div className="font-headline text-3xl font-black text-primary mb-1">{stat.value}</div>
                                    <div className="text-on-surface-variant text-sm">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Problèmes & Solutions */}
                <ProblemSolution />

                {/* Grille de cas d'usage */}
                <section id="use-cases" className="py-24 px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="mb-16">
                            <h2 className="font-headline text-4xl md:text-5xl font-extrabold mb-4">
                                Cas d'usage concrets
                            </h2>
                            <p className="text-on-surface-variant max-w-2xl">
                                Des solutions prêtes à déployer dans votre secteur, adaptées à votre taille et à vos contraintes.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {useCases.map((uc) => (
                                <div
                                    key={uc.title}
                                    className="group p-8 bg-surface-container rounded-2xl border border-outline-variant/5 hover:border-primary/20 transition-all duration-500 flex flex-col"
                                >
                                    <div className="flex items-start justify-between mb-6">
                                        <div className={`w-12 h-12 rounded-xl ${uc.bg} flex items-center justify-center transition-colors`}>
                                            <span className={`material-symbols-outlined ${uc.color} text-2xl`}>
                                                {uc.icon}
                                            </span>
                                        </div>
                                        <span className="text-[0.65rem] uppercase tracking-wider font-bold text-on-surface-variant bg-surface-container-high px-2 py-1 rounded-full">
                                            {uc.tag}
                                        </span>
                                    </div>
                                    <h3 className="font-headline text-xl font-bold mb-3">{uc.title}</h3>
                                    <p className="text-on-surface-variant text-sm leading-relaxed flex-1">
                                        {uc.description}
                                    </p>
                                    <a
                                        href="#contact"
                                        className={`mt-6 ${uc.color} font-bold flex items-center gap-2 text-sm group-hover:gap-4 transition-all`}
                                    >
                                        En savoir plus
                                        <span className="material-symbols-outlined text-sm">chevron_right</span>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <CTA />
            </main>

            <Footer />
        </>
    );
}
