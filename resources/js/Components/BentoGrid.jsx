import { motion } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';

const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const hoverCard = {
    whileHover: { scale: 1.02, y: -5, transition: { duration: 0.25 } },
};

export default function BentoGrid() {
    return (
        <section className="py-24 px-8">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-12 grid-rows-2 gap-6 h-auto md:h-[600px]"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ staggerChildren: 0.1 }}
                >
                    {/* Large card — Expertise */}
                    <motion.div
                        variants={cardVariants}
                        {...hoverCard}
                        className="md:col-span-8 md:row-span-1 bg-surface-container rounded-2xl p-10 flex flex-col justify-end relative overflow-hidden group"
                        style={{ borderColor: 'transparent' }}
                        whileHover={{ scale: 1.02, y: -5, borderColor: 'rgba(255,143,115,0.3)', transition: { duration: 0.25 } }}
                    >
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
                    </motion.div>

                    {/* Stats card */}
                    <motion.div
                        variants={cardVariants}
                        whileHover={{ scale: 1.02, y: -5, transition: { duration: 0.25 } }}
                        className="md:col-span-4 md:row-span-1 bg-gradient-to-br from-primary-container to-primary-dim rounded-2xl p-10 flex flex-col items-center justify-center text-center"
                    >
                        <div className="text-6xl font-black text-on-primary-fixed mb-2">
                            <AnimatedCounter target={40} suffix="%" />
                        </div>
                        <p className="text-on-primary font-bold text-lg">
                            Gain de productivité moyen constaté par nos clients
                        </p>
                    </motion.div>

                    {/* Quality card */}
                    <motion.div
                        variants={cardVariants}
                        whileHover={{ scale: 1.02, y: -5, borderColor: 'rgba(255,143,115,0.3)', transition: { duration: 0.25 } }}
                        className="md:col-span-4 md:row-span-1 bg-surface-container-high rounded-2xl p-10 flex flex-col justify-between"
                        style={{ borderColor: 'transparent' }}
                    >
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
                    </motion.div>

                    {/* Security card */}
                    <motion.div
                        variants={cardVariants}
                        whileHover={{ scale: 1.02, y: -5, borderColor: 'rgba(255,143,115,0.3)', transition: { duration: 0.25 } }}
                        className="md:col-span-8 md:row-span-1 bg-surface-container rounded-2xl p-10 flex items-center gap-12"
                        style={{ borderColor: 'transparent' }}
                    >
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
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
