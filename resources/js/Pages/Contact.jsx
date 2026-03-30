import { Head, useForm, usePage } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

// Champ texte stylisé Kinetic
function Field({ label, error, required, children }) {
    return (
        <div>
            <label className="block text-sm font-bold font-headline text-on-surface mb-2">
                {label}
                {required && <span className="text-primary ml-1">*</span>}
            </label>
            {children}
            {error && (
                <p className="mt-2 text-sm text-primary flex items-center gap-1">
                    <span className="material-symbols-outlined text-base">error</span>
                    {error}
                </p>
            )}
        </div>
    );
}

const inputClass =
    'w-full bg-surface-container border border-outline-variant/30 rounded-xl px-5 py-4 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200';

export default function Contact() {
    const { flash } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        website: '', // honeypot — doit rester vide
        name: '',
        email: '',
        company: '',
        message: '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route('contact.store'), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    }

    return (
        <>
            <Head title="Contact | KINETIC AI" />

            <style>{`
                .material-symbols-outlined {
                    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
                }
            `}</style>

            <Navbar />

            <main className="pt-24 min-h-screen bg-background">

                {/* ── Hero ── */}
                <section
                    className="relative py-20 px-8 overflow-hidden"
                    style={{
                        background:
                            'radial-gradient(circle at 80% 20%, rgba(255, 143, 115, 0.1) 0%, rgba(14, 14, 14, 1) 60%)',
                    }}
                >
                    <div className="max-w-7xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container rounded-full mb-6 border border-outline-variant/15">
                            <span
                                className="w-2 h-2 rounded-full bg-primary"
                                style={{ boxShadow: '0 0 12px rgba(255, 143, 115, 0.5)' }}
                            />
                            <span className="text-[0.7rem] uppercase tracking-widest font-bold text-on-surface-variant">
                                Parlons de votre projet
                            </span>
                        </div>
                        <h1 className="font-headline font-extrabold text-5xl md:text-6xl leading-none tracking-tighter mb-4 text-on-surface">
                            Prenons <span className="text-primary italic">contact</span>
                        </h1>
                        <p className="text-on-surface-variant text-lg max-w-xl">
                            Décrivez votre besoin et nous vous recontactons sous 24h pour une première discussion sans engagement.
                        </p>
                    </div>
                </section>

                {/* ── Corps ── */}
                <section className="py-16 px-8">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">

                        {/* Infos latérales */}
                        <aside className="space-y-6">
                            {[
                                {
                                    icon: 'bolt',
                                    title: 'Réponse rapide',
                                    text: 'Nous répondons à chaque message sous 24 heures ouvrées.',
                                },
                                {
                                    icon: 'verified',
                                    title: 'Sans engagement',
                                    text: 'La première consultation est gratuite et sans obligation.',
                                },
                                {
                                    icon: 'shield_lock',
                                    title: 'Données protégées',
                                    text: 'Vos informations sont confidentielles et ne sont jamais revendues.',
                                },
                            ].map((item) => (
                                <div
                                    key={item.title}
                                    className="flex gap-4 p-5 bg-surface-container rounded-2xl border border-outline-variant/15"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-primary text-xl">
                                            {item.icon}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="font-headline font-bold text-sm mb-1">{item.title}</h3>
                                        <p className="text-on-surface-variant text-sm leading-relaxed">{item.text}</p>
                                    </div>
                                </div>
                            ))}
                        </aside>

                        {/* Formulaire */}
                        <div className="lg:col-span-2">
                            {flash?.contact_success ? (
                                /* ── Succès ── */
                                <div className="flex flex-col items-center justify-center gap-4 py-20 px-8 bg-surface-container rounded-2xl border border-primary/20 text-center">
                                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-primary text-4xl">
                                            check_circle
                                        </span>
                                    </div>
                                    <h2 className="font-headline text-2xl font-bold">Message envoyé !</h2>
                                    <p className="text-on-surface-variant max-w-md">
                                        Merci pour votre message. Notre équipe vous contactera dans les prochaines 24 heures ouvrées.
                                    </p>
                                </div>
                            ) : (
                                /* ── Formulaire ── */
                                <form
                                    onSubmit={handleSubmit}
                                    noValidate
                                    className="bg-surface-container rounded-2xl border border-outline-variant/15 p-8 space-y-6"
                                >
                                    {/* Honeypot — caché visuellement, visible pour les bots */}
                                    <div
                                        aria-hidden="true"
                                        style={{
                                            position: 'absolute',
                                            opacity: 0,
                                            left: '-9999px',
                                            height: 0,
                                            overflow: 'hidden',
                                            pointerEvents: 'none',
                                        }}
                                    >
                                        <label htmlFor="website">Website</label>
                                        <input
                                            id="website"
                                            type="text"
                                            name="website"
                                            value={data.website}
                                            onChange={(e) => setData('website', e.target.value)}
                                            tabIndex={-1}
                                            autoComplete="off"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <Field label="Nom complet" error={errors.name} required>
                                            <input
                                                type="text"
                                                placeholder="Pascal Dupont"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                disabled={processing}
                                                className={inputClass}
                                            />
                                        </Field>

                                        <Field label="Email professionnel" error={errors.email} required>
                                            <input
                                                type="email"
                                                placeholder="pascal@entreprise.fr"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                disabled={processing}
                                                className={inputClass}
                                            />
                                        </Field>
                                    </div>

                                    <Field label="Entreprise" error={errors.company}>
                                        <input
                                            type="text"
                                            placeholder="Ma PME SAS (optionnel)"
                                            value={data.company}
                                            onChange={(e) => setData('company', e.target.value)}
                                            disabled={processing}
                                            className={inputClass}
                                        />
                                    </Field>

                                    <Field label="Votre message" error={errors.message} required>
                                        <textarea
                                            rows={6}
                                            placeholder="Décrivez votre besoin, votre secteur d'activité et les processus que vous aimeriez automatiser…"
                                            value={data.message}
                                            onChange={(e) => setData('message', e.target.value)}
                                            disabled={processing}
                                            className={inputClass + ' resize-none'}
                                        />
                                        <p className="mt-1 text-xs text-on-surface-variant text-right">
                                            {data.message.length} / 5000 caractères (min. 10)
                                        </p>
                                    </Field>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full bg-gradient-to-br from-primary-dim to-primary text-on-primary-fixed font-bold py-4 px-10 rounded-xl hover:shadow-[0_0_30px_rgba(255,143,115,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {processing ? (
                                            <>
                                                <span className="material-symbols-outlined text-sm animate-spin">
                                                    progress_activity
                                                </span>
                                                Envoi en cours…
                                            </>
                                        ) : (
                                            <>
                                                Envoyer le message
                                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                            </>
                                        )}
                                    </button>

                                    <p className="text-xs text-on-surface-variant text-center">
                                        En soumettant ce formulaire, vous acceptez notre{' '}
                                        <a href="#" className="text-primary hover:underline">politique de confidentialité</a>.
                                    </p>
                                </form>
                            )}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
