import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function LatestPosts({ posts = [] }) {
    if (posts.length === 0) return null;

    return (
        <section className="py-24 px-8 bg-surface-container-low">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-end justify-between mb-14">
                    <div>
                        <p className="text-xs uppercase tracking-widest text-on-surface-variant font-bold mb-3">
                            Ressources
                        </p>
                        <h2 className="font-headline text-4xl md:text-5xl font-extrabold">
                            Derniers <span className="text-primary italic">Articles</span>
                        </h2>
                    </div>
                    <Link
                        href="/blog"
                        className="hidden sm:inline-flex items-center gap-2 text-sm font-bold text-on-surface-variant hover:text-primary transition-colors"
                    >
                        Voir tout le blog
                        <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </Link>
                </div>

                {/* Cards */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ staggerChildren: 0.12 }}
                >
                    {posts.map((post) => {
                        const date = post.published_at
                            ? new Date(post.published_at).toLocaleDateString('fr-FR', {
                                  day: 'numeric', month: 'long', year: 'numeric',
                              })
                            : null;

                        return (
                            <motion.article
                                key={post.id}
                                variants={cardVariants}
                                whileHover={{
                                    scale: 1.02,
                                    y: -5,
                                    borderColor: 'rgba(255,143,115,0.3)',
                                    transition: { duration: 0.25 },
                                }}
                                className="group bg-surface-container rounded-2xl border border-outline-variant/5 overflow-hidden flex flex-col"
                                style={{ borderColor: 'transparent' }}
                            >
                                {post.cover_image_url ? (
                                    <div className="h-44 overflow-hidden">
                                        <img
                                            src={post.cover_image_url}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                ) : (
                                    <div className="h-44 bg-gradient-to-br from-primary-container to-surface-container-high flex items-center justify-center">
                                        <span className="material-symbols-outlined text-4xl text-primary/30">
                                            article
                                        </span>
                                    </div>
                                )}

                                <div className="p-6 flex flex-col flex-1">
                                    {date && (
                                        <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">
                                            {date}
                                        </p>
                                    )}
                                    <h3 className="font-headline text-lg font-extrabold text-on-surface mb-3 leading-snug flex-1">
                                        {post.title}
                                    </h3>
                                    {post.excerpt && (
                                        <p className="text-on-surface-variant text-sm leading-relaxed mb-4 line-clamp-2">
                                            {post.excerpt}
                                        </p>
                                    )}
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="inline-flex items-center gap-2 text-sm font-bold text-primary group-hover:gap-3 transition-all"
                                    >
                                        Lire l'article
                                        <span className="material-symbols-outlined text-base">arrow_forward</span>
                                    </Link>
                                </div>
                            </motion.article>
                        );
                    })}
                </motion.div>

                {/* Mobile — voir tout */}
                <div className="sm:hidden mt-8 text-center">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-sm font-bold text-primary"
                    >
                        Voir tout le blog
                        <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
