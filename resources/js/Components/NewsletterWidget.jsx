import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';

function SubmitButton({ processing, submitted }) {
    return (
        <motion.button
            type="submit"
            disabled={processing || submitted}
            animate={submitted ? { backgroundColor: '#22c55e' } : {}}
            transition={{ duration: 0.3 }}
            className="shrink-0 relative overflow-hidden bg-gradient-to-r from-primary-dim to-primary text-on-primary-fixed font-bold px-6 py-3 rounded-xl text-sm disabled:cursor-default"
            style={{ minWidth: '7.5rem' }}
        >
            <AnimatePresence mode="wait" initial={false}>
                {submitted ? (
                    <motion.span
                        key="check"
                        className="flex items-center justify-center gap-1.5"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                    >
                        <motion.span
                            className="material-symbols-outlined text-base"
                            initial={{ rotate: -30 }}
                            animate={{ rotate: 0 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                        >
                            check_circle
                        </motion.span>
                        Inscrit !
                    </motion.span>
                ) : processing ? (
                    <motion.span
                        key="loading"
                        className="flex items-center justify-center gap-1.5"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.15 }}
                    >
                        <motion.span
                            className="material-symbols-outlined text-base"
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                        >
                            progress_activity
                        </motion.span>
                        Envoi…
                    </motion.span>
                ) : (
                    <motion.span
                        key="idle"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.15 }}
                    >
                        S'abonner
                    </motion.span>
                )}
            </AnimatePresence>
        </motion.button>
    );
}

export default function NewsletterWidget() {
    const { data, setData, post, processing, errors, reset } = useForm({ email: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/newsletter', {
            preserveScroll: true,
            onSuccess: () => {
                setSubmitted(true);
                reset('email');
            },
        });
    };

    return (
        <div className="w-full border-t border-outline-variant/10 pt-10 pb-2">
            <div className="max-w-xl mx-auto text-center">
                <p className="text-xs uppercase tracking-widest font-bold text-on-surface-variant mb-2">
                    Newsletter
                </p>
                <h3 className="font-headline text-2xl font-extrabold text-on-surface mb-2">
                    Restez dans la <span className="text-primary italic">boucle</span>
                </h3>
                <p className="text-on-surface-variant text-sm mb-6">
                    Insights IA, automatisation et stratégie digitale — directement dans votre boîte.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center">
                    <div className="flex-1 min-w-0">
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => { setData('email', e.target.value); setSubmitted(false); }}
                            placeholder="votre@email.com"
                            className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-3 text-on-surface placeholder-on-surface-variant/40 focus:outline-none focus:border-primary/50 transition-colors text-sm"
                        />
                        {errors.email && (
                            <p className="mt-1.5 text-xs text-red-400 text-left">{errors.email}</p>
                        )}
                    </div>

                    <SubmitButton processing={processing} submitted={submitted} />
                </form>
            </div>
        </div>
    );
}
