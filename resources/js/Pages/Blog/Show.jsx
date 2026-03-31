import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import CursorFollower from '@/Components/CursorFollower';
import { motion } from 'framer-motion';

export default function Show({ post }) {
    const date = post.published_at
        ? new Date(post.published_at).toLocaleDateString('fr-FR', {
              day: 'numeric', month: 'long', year: 'numeric',
          })
        : null;

    return (
        <>
            <Head title={`${post.title} | KINETIC AI`}>
                <meta head-key="description" name="description" content={post.excerpt || post.title} />
            </Head>

            <CursorFollower />
            <Navbar />

            <main className="pt-32 pb-24 px-8 min-h-screen">
                <motion.article
                    key={post.slug}
                    className="max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                >
                    {/* Back */}
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors mb-10"
                    >
                        <span className="material-symbols-outlined text-base">arrow_back</span>
                        Retour au blog
                    </Link>

                    {/* Cover image */}
                    {post.cover_image_url && (
                        <div className="rounded-2xl overflow-hidden mb-10 h-72 md:h-96">
                            <img
                                src={post.cover_image_url}
                                alt={post.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    {/* Header */}
                    <header className="mb-12 pb-8 border-b border-outline-variant/15">
                        {date && (
                            <p className="text-xs uppercase tracking-widest text-on-surface-variant font-bold mb-4">
                                {date}
                            </p>
                        )}
                        <h1 className="font-headline text-4xl md:text-5xl font-extrabold text-on-surface leading-tight tracking-tight mb-5">
                            {post.title}
                        </h1>
                        {post.excerpt && (
                            <p className="text-on-surface-variant text-lg leading-relaxed">
                                {post.excerpt}
                            </p>
                        )}
                    </header>

                    {/* Body */}
                    <div
                        className="article-content"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Footer nav */}
                    <div className="mt-16 pt-8 border-t border-outline-variant/15">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all"
                        >
                            <span className="material-symbols-outlined text-base">arrow_back</span>
                            Tous les articles
                        </Link>
                    </div>
                </motion.article>
            </main>

            <Footer />
        </>
    );
}
