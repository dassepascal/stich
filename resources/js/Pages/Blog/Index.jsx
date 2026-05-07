import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import CursorFollower from '@/Components/CursorFollower';
import { motion } from 'framer-motion';

const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

function PostCard({ post }) {
    const date = post.published_at
        ? new Date(post.published_at).toLocaleDateString('fr-FR', {
              day: 'numeric', month: 'long', year: 'numeric',
          })
        : null;

    return (
        <motion.article
            variants={cardVariants}
            whileHover={{ scale: 1.02, y: -5, borderColor: 'rgba(255,143,115,0.3)', transition: { duration: 0.25 } }}
            className="group bg-surface-container rounded-2xl border border-outline-variant/5 overflow-hidden flex flex-col"
            style={{ borderColor: 'transparent' }}
        >
            {post.cover_image_url ? (
                <div className="h-52 overflow-hidden">
                    <img
                        src={post.cover_image_url}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </div>
            ) : (
                <div className="h-52 bg-gradient-to-br from-primary-container to-surface-container-high flex items-center justify-center">
                    <span className="material-symbols-outlined text-5xl text-primary/30">article</span>
                </div>
            )}

            <div className="p-7 flex flex-col flex-1">
                {date && (
                    <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-3">
                        {date}
                    </p>
                )}
                <h2 className="font-headline text-xl font-extrabold text-on-surface mb-3 leading-snug">
                    {post.title}
                </h2>
                {post.excerpt && (
                    <p className="text-on-surface-variant text-sm leading-relaxed mb-5 flex-1">
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
}

export default function Index({ posts }) {
    return (
        <>
            <Head title="Blog | KINETIC AI">
                <meta head-key="description" name="description" content="Automatisation, IA appliquée et stratégie digitale : les ressources et insights de KINETIC AI pour les PME françaises." />
            </Head>
            <style>{`
                * { cursor: none !important; }
                .material-symbols-outlined {
                    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
                }
            `}</style>

            <CursorFollower />
            <Navbar />

            <main className="pt-32 pb-24 px-8 min-h-screen">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <motion.div
                        className="mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45 }}
                    >
                        <p className="text-xs uppercase tracking-widest text-on-surface-variant font-bold mb-3">
                            Ressources & Insights
                        </p>
                        <h1 className="font-headline text-5xl md:text-6xl font-extrabold text-on-surface mb-4">
                            Le <span className="text-primary italic">Blog</span> Kinetic
                        </h1>
                        <p className="text-on-surface-variant text-lg max-w-xl">
                            Automatisation, IA appliquée et stratégie digitale pour les PME françaises.
                        </p>
                    </motion.div>

                    {/* Grid */}
                    {posts.length === 0 ? (
                        <div className="text-center py-24 text-on-surface-variant">
                            <span className="material-symbols-outlined text-6xl opacity-20 block mb-4">newspaper</span>
                            <p className="text-lg">Aucun article publié pour l'instant.</p>
                        </div>
                    ) : (
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                            initial="hidden"
                            animate="show"
                            transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
                        >
                            {posts.map((post) => (
                                <PostCard key={post.id} post={post} />
                            ))}
                        </motion.div>
                    )}
                </div>
            </main>

            <Footer />
        </>
    );
}
