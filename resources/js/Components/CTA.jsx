import { useForm, usePage } from '@inertiajs/react';

export default function CTA() {
    const { flash } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm({ email: '' });

    function handleSubmit(e) {
        e.preventDefault();
        post(route('leads.store'), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    }

    const submitted = flash?.lead_success;

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

                {submitted ? (
                    /* Message de succès */
                    <div className="inline-flex items-center gap-3 px-8 py-5 bg-surface-container rounded-2xl border border-primary/20">
                        <span className="material-symbols-outlined text-primary text-3xl">check_circle</span>
                        <div className="text-left">
                            <p className="font-headline font-bold text-on-surface">
                                Inscription confirmée !
                            </p>
                            <p className="text-on-surface-variant text-sm mt-0.5">
                                Nous vous contacterons très prochainement.
                            </p>
                        </div>
                    </div>
                ) : (
                    /* Formulaire */
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="inline-block p-1 bg-surface-container-highest rounded-2xl">
                            <div className="flex flex-col sm:flex-row gap-4 p-2">
                                <div className="flex flex-col items-start">
                                    <input
                                        type="email"
                                        placeholder="votre@email.fr"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        disabled={processing}
                                        className="bg-surface-container border-none rounded-xl px-6 py-4 w-full sm:w-80 text-on-surface focus:ring-2 focus:ring-primary transition-all disabled:opacity-50"
                                    />
                                    {errors.email && (
                                        <p className="text-error text-xs mt-2 ml-1 flex items-center gap-1">
                                            <span className="material-symbols-outlined text-sm">error</span>
                                            {errors.email}
                                        </p>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-primary text-on-primary-fixed font-bold py-4 px-10 rounded-xl hover:bg-primary-fixed transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {processing ? (
                                        <>
                                            <span className="material-symbols-outlined text-sm animate-spin">
                                                progress_activity
                                            </span>
                                            Envoi…
                                        </>
                                    ) : (
                                        'Réserver ma démo'
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                )}
            </div>

            {/* Background decorations */}
            <div className="absolute -bottom-64 -left-64 w-[500px] h-[500px] bg-secondary/5 blur-[100px] rounded-full" />
            <div className="absolute -top-64 -right-64 w-[500px] h-[500px] bg-primary/5 blur-[100px] rounded-full" />
        </section>
    );
}
