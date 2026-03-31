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
            <Head>
                <title>{post.title} | KINETIC AI</title>
                <meta name="description" content={post.excerpt ?? post.title} />
            </Head>

            <style>{`
                * { cursor: none !important; }
                .material-symbols-outlined {
                    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
                }
                .article-content h2 {
                    font-family: var(--font-headline, sans-serif);
                    font-size: 1.6rem;
                    font-weight: 800;
                    color: #ff8f73;
                    margin-top: 2.5rem;
                    margin-bottom: 0.75rem;
                    letter-spacing: -0.02em;
                }
                .article-content h3 {
                    font-size: 1.2rem;
                    font-weight: 700;
                    color: #e5e5e5;
                    margin-top: 1.75rem;
                    margin-bottom: 0.5rem;
                }
                .article-content p {
                    margin-bottom: 1.25rem;
                    color: #9a9a9a;
                    line-height: 1.8;
                    font-size: 1.05rem;
                }
                .article-content ul, .article-content ol {
                    padding-left: 1.5rem;
                    margin-bottom: 1.25rem;
                    color: #9a9a9a;
                }
                .article-content li { margin-bottom: 0.4rem; line-height: 1.8; }
                .article-content ul { list-style: disc; }
                .article-content ol { list-style: decimal; }
                .article-content strong { color: #e5e5e5; font-weight: 700; }
                .article-content em { color: #c7c7ff; }
                .article-content s { opacity: 0.5; }
                .article-content code {
                    background: #1a1a1a;
                    border: 1px solid #333;
                    border-radius: 5px;
                    padding: 0.15em 0.4em;
                    font-size: 0.88em;
                    color: #fd9000;
                }
                .article-content blockquote {
                    border-left: 3px solid #ff8f73;
                    padding-left: 1.25rem;
                    margin: 1.5rem 0;
                    color: #9a9a9a;
                    font-style: italic;
                }
                .article-content a { color: #ff8f73; text-decoration: underline; text-underline-offset: 3px; }
            `}</style>

            <CursorFollower />
            <Navbar />

            <main className="pt-32 pb-24 px-8 min-h-screen">
                <motion.article
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
                    {post.cover_image && (
                        <div className="rounded-2xl overflow-hidden mb-10 h-72 md:h-96">
                            <img
                                src={post.cover_image}
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
