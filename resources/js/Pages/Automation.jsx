import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import CTA from '@/Components/CTA';

// ─── Données ────────────────────────────────────────────────────────────────

const workflows = [
    {
        id: '01',
        color: 'text-primary',
        accentBg: 'bg-primary/10',
        accent: 'border-primary/20',
        title: "De l'email client à la facture ERP",
        description:
            "Un client envoie un bon de commande par email. L'IA extrait les données clés (produits, quantités, coordonnées), crée automatiquement la facture dans votre ERP et envoie un accusé de réception au client.",
        steps: [
            { icon: 'campaign', label: 'Email entrant détecté' },
            { icon: 'psychology', label: 'Extraction IA des données' },
            { icon: 'receipt_long', label: 'Création facture ERP' },
            { icon: 'check_circle', label: 'Confirmation client envoyée' },
        ],
        tools: ['Gmail / Outlook', 'GPT-4o', 'SAP / Sage / Dolibarr'],
    },
    {
        id: '02',
        color: 'text-secondary',
        accentBg: 'bg-secondary/10',
        accent: 'border-secondary/20',
        title: 'Synchronisation CRM ↔ Calendrier',
        description:
            "Chaque nouveau contact qualifié dans votre CRM déclenche la création automatique d'un créneau de découverte dans le calendrier du commercial dédié, avec invitation envoyée au prospect.",
        steps: [
            { icon: 'manage_accounts', label: 'Nouveau lead dans le CRM' },
            { icon: 'verified', label: 'Qualification automatique' },
            { icon: 'bolt', label: 'Créneau créé dans le calendrier' },
            { icon: 'arrow_forward', label: 'Invitation envoyée au prospect' },
        ],
        tools: ['HubSpot / Salesforce', 'Google Calendar / Outlook', 'Make / n8n'],
    },
    {
        id: '03',
        color: 'text-primary-fixed',
        accentBg: 'bg-primary-fixed/10',
        accent: 'border-primary-fixed/20',
        title: 'Tri et classement de documents par IA',
        description:
            "Vos documents entrants (contrats, devis, RIB, factures) sont automatiquement classés par type, indexés dans votre GED et les informations critiques sont extraites pour alimenter vos bases de données.",
        steps: [
            { icon: 'inventory_2', label: 'Document reçu (email / scan)' },
            { icon: 'psychology', label: 'Classification IA du type' },
            { icon: 'hub', label: 'Archivage dans la GED' },
            { icon: 'analytics', label: 'Données extraites en base' },
        ],
        tools: ['Google Drive / SharePoint', 'Claude / GPT Vision', 'Notion / Airtable'],
    },
];

const tools = [
    { name: 'n8n', icon: 'hub', color: 'text-primary' },
    { name: 'Make', icon: 'settings_suggest', color: 'text-secondary' },
    { name: 'Zapier', icon: 'bolt', color: 'text-primary-fixed' },
    { name: 'APIs REST', icon: 'shield_lock', color: 'text-primary' },
    { name: 'Webhooks', icon: 'arrow_forward', color: 'text-secondary' },
    { name: 'Claude AI', icon: 'psychology', color: 'text-primary-fixed' },
    { name: 'GPT-4o', icon: 'support_agent', color: 'text-primary' },
    { name: 'Zapier MCP', icon: 'verified', color: 'text-secondary' },
    { name: 'Google Workspace', icon: 'analytics', color: 'text-primary-fixed' },
    { name: 'Microsoft 365', icon: 'inventory_2', color: 'text-primary' },
    { name: 'Airtable', icon: 'manage_accounts', color: 'text-secondary' },
    { name: 'Notion', icon: 'campaign', color: 'text-primary-fixed' },
];

// ─── Composant ───────────────────────────────────────────────────────────────

export default function Automation() {
    return (
        <>
            <Head title="Automatisation | KINETIC AI" />

            <style>{`
                .material-symbols-outlined {
                    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
                }
            `}</style>

            <Navbar />

            <main className="pt-24">

                {/* ── Hero ── */}
                <section
                    className="relative py-28 px-8 overflow-hidden"
                    style={{
                        background:
                            'radial-gradient(circle at 60% 40%, rgba(253, 144, 0, 0.1) 0%, rgba(14, 14, 14, 1) 60%)',
                    }}
                >
                    {/* Glow blob */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/5 blur-[120px] rounded-full pointer-events-none" />

                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="max-w-3xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container rounded-full mb-6 border border-outline-variant/15">
                                <span
                                    className="w-2 h-2 rounded-full bg-secondary"
                                    style={{ boxShadow: '0 0 15px rgba(253, 144, 0, 0.4)' }}
                                />
                                <span className="text-[0.7rem] uppercase tracking-widest font-bold text-on-surface-variant">
                                    Automatisation Intelligente
                                </span>
                            </div>

                            <h1 className="font-headline font-extrabold text-5xl md:text-7xl leading-none tracking-tighter mb-8 text-on-surface">
                                Libérez votre{' '}
                                <span className="text-secondary italic">potentiel</span>
                                <br />
                                humain
                            </h1>

                            <p className="text-on-surface-variant text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
                                Vos équipes passent trop de temps sur des tâches répétitives à faible valeur ajoutée. Nos workflows d'automatisation prennent le relais — pour que vos collaborateurs se concentrent sur ce qui compte vraiment.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <a
                                    href="#workflows"
                                    className="bg-gradient-to-br from-secondary-dim to-secondary text-on-secondary font-bold py-4 px-10 rounded-xl hover:shadow-[0_0_30px_rgba(253,144,0,0.3)] transition-all"
                                >
                                    Voir les Workflows
                                </a>
                                <a
                                    href="#contact"
                                    className="border border-outline-variant/30 text-on-surface font-bold py-4 px-10 rounded-xl hover:bg-surface-container transition-all flex items-center gap-2"
                                >
                                    Audit gratuit
                                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </a>
                            </div>
                        </div>

                        {/* Indicateurs */}
                        <div className="grid grid-cols-3 gap-6 mt-20 max-w-xl">
                            {[
                                { value: '200+', label: 'Intégrations disponibles' },
                                { value: '< 48h', label: 'Premier workflow en prod' },
                                { value: '∞', label: 'Exécutions par mois' },
                            ].map((s) => (
                                <div key={s.label} className="bg-surface-container rounded-xl p-5 border border-outline-variant/15 text-center">
                                    <div className="font-headline text-2xl font-black text-secondary mb-1">{s.value}</div>
                                    <div className="text-on-surface-variant text-xs">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Automation Showcase ── */}
                <section id="workflows" className="py-24 px-8 bg-surface-container-low">
                    <div className="max-w-7xl mx-auto">
                        <div className="mb-16">
                            <h2 className="font-headline text-4xl md:text-5xl font-extrabold mb-4">
                                Workflows en action
                            </h2>
                            <p className="text-on-surface-variant max-w-2xl">
                                Trois exemples concrets de ce que nos automatisations font au quotidien pour nos clients.
                            </p>
                        </div>

                        <div className="space-y-8">
                            {workflows.map((wf) => (
                                <div
                                    key={wf.id}
                                    className={`rounded-2xl border border-outline-variant/15 bg-background overflow-hidden`}
                                >
                                    {/* Header */}
                                    <div className={`px-8 py-6 border-b border-outline-variant/10 flex items-center gap-4`}>
                                        <span className={`font-headline font-black text-3xl ${wf.color} opacity-30`}>
                                            {wf.id}
                                        </span>
                                        <h3 className="font-headline text-xl font-bold">{wf.title}</h3>
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                                        {/* Description + tools */}
                                        <div className="p-8 border-b lg:border-b-0 lg:border-r border-outline-variant/10">
                                            <p className="text-on-surface-variant leading-relaxed mb-6">
                                                {wf.description}
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {wf.tools.map((t) => (
                                                    <span
                                                        key={t}
                                                        className="text-xs font-mono bg-surface-container px-3 py-1 rounded-full text-on-surface-variant border border-outline-variant/15"
                                                    >
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Steps pipeline */}
                                        <div className="p-8">
                                            <p className="text-[0.65rem] uppercase tracking-widest font-bold text-on-surface-variant mb-5">
                                                Étapes du workflow
                                            </p>
                                            <ol className="space-y-3">
                                                {wf.steps.map((step, i) => (
                                                    <li key={i} className="flex items-center gap-3">
                                                        <div className={`w-8 h-8 rounded-lg ${wf.accentBg} flex items-center justify-center shrink-0`}>
                                                            <span className={`material-symbols-outlined ${wf.color} text-base`}>
                                                                {step.icon}
                                                            </span>
                                                        </div>
                                                        <span className="text-sm text-on-surface">{step.label}</span>
                                                        {i < wf.steps.length - 1 && (
                                                            <span className="material-symbols-outlined text-outline text-sm ml-auto">
                                                                arrow_downward
                                                            </span>
                                                        )}
                                                    </li>
                                                ))}
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Stack Technique ── */}
                <section className="py-24 px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="font-headline text-4xl md:text-5xl font-extrabold mb-4">
                                Les outils que nous connectons
                            </h2>
                            <p className="text-on-surface-variant max-w-2xl mx-auto">
                                Nous travaillons avec les meilleures plateformes d'automatisation et d'IA du marché — ou avec vos APIs internes sur mesure.
                            </p>
                        </div>

                        <div className="flex flex-wrap justify-center gap-4">
                            {tools.map((tool) => (
                                <div
                                    key={tool.name}
                                    className="group flex items-center gap-3 px-5 py-3 bg-surface-container rounded-xl border border-outline-variant/15 hover:border-outline-variant/40 transition-all duration-300"
                                >
                                    <span className={`material-symbols-outlined ${tool.color} text-xl`}>
                                        {tool.icon}
                                    </span>
                                    <span className="font-headline font-bold text-sm text-on-surface">
                                        {tool.name}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Note intégration sur mesure */}
                        <div className="mt-12 text-center">
                            <p className="text-on-surface-variant text-sm">
                                Votre outil n'est pas dans la liste ?{' '}
                                <a href="#contact" className="text-primary font-bold hover:underline">
                                    Nous intégrons n'importe quelle API REST ou webhook.
                                </a>
                            </p>
                        </div>
                    </div>
                </section>

                {/* ── CTA ── */}
                <CTA />
            </main>

            <Footer />
        </>
    );
}
