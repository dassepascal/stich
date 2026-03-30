import { motion } from 'framer-motion';

// Palette cyclique : les couleurs sont de la présentation, pas des données métier.
const palette = [
    {
        iconColor: 'text-primary',
        bgColor: 'bg-primary/10 group-hover:bg-primary/20',
        hoverBorder: 'hover:border-primary/30',
        linkColor: 'text-primary',
    },
    {
        iconColor: 'text-secondary',
        bgColor: 'bg-secondary/10 group-hover:bg-secondary/20',
        hoverBorder: 'hover:border-secondary/30',
        linkColor: 'text-secondary',
    },
    {
        iconColor: 'text-primary-fixed',
        bgColor: 'bg-primary-fixed/10 group-hover:bg-primary-fixed/20',
        hoverBorder: 'hover:border-primary-fixed/30',
        linkColor: 'text-primary-fixed',
    },
];

const cardVariants = {
    hidden: { opacity: 0, y: 28 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Services({ services = [] }) {
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

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ staggerChildren: 0.12 }}
                >
                    {services.map((service, index) => {
                        const colors = palette[index % palette.length];
                        return (
                            <motion.div
                                key={service.id}
                                variants={cardVariants}
                                whileHover={{
                                    scale: 1.02,
                                    y: -5,
                                    borderColor: '#ff8f73',
                                    transition: { duration: 0.25 },
                                }}
                                className={`group p-8 bg-surface-container rounded-2xl border border-outline-variant/5 transition-colors duration-500`}
                            >
                                <div
                                    className={`w-14 h-14 rounded-xl ${colors.bgColor} flex items-center justify-center mb-6 transition-colors`}
                                >
                                    <span className={`material-symbols-outlined ${colors.iconColor} text-3xl`}>
                                        {service.icon}
                                    </span>
                                </div>
                                <h3 className="font-headline text-2xl font-bold mb-4">{service.title}</h3>
                                <p className="text-on-surface-variant leading-relaxed mb-6">
                                    {service.description}
                                </p>
                                <a
                                    href={service.link ?? '#'}
                                    className={`${colors.linkColor} font-bold flex items-center gap-2 text-sm group-hover:gap-4 transition-all`}
                                >
                                    En savoir plus{' '}
                                    <span className="material-symbols-outlined">chevron_right</span>
                                </a>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
