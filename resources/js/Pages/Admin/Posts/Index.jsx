import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState } from 'react';

function StatusBadge({ published }) {
    return published ? (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-green-500/10 text-green-400">
            <span className="material-symbols-outlined text-xs">check_circle</span> Publié
        </span>
    ) : (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-outline-variant/20 text-on-surface-variant">
            <span className="material-symbols-outlined text-xs">edit_note</span> Brouillon
        </span>
    );
}

function DeleteDialog({ post, onConfirm, onCancel }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-surface-container rounded-2xl p-8 max-w-sm w-full mx-4 border border-outline-variant/15 shadow-xl">
                <h2 className="font-headline text-xl font-bold mb-3 text-on-surface">Supprimer l'article ?</h2>
                <p className="text-on-surface-variant text-sm mb-6">
                    « <span className="text-on-surface font-semibold">{post.title}</span> » sera définitivement
                    supprimé. Cette action est irréversible.
                </p>
                <div className="flex gap-3 justify-end">
                    <button
                        onClick={onCancel}
                        className="px-5 py-2 rounded-xl border border-outline-variant/30 text-on-surface-variant hover:text-on-surface transition-colors text-sm font-bold"
                    >
                        Annuler
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-5 py-2 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 transition-colors text-sm font-bold"
                    >
                        Supprimer
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function Index({ auth, posts }) {
    const [toDelete, setToDelete] = useState(null);

    const confirmDelete = () => {
        router.delete(`/admin/posts/${toDelete.id}`, { preserveScroll: true });
        setToDelete(null);
    };

    return (
        <AuthenticatedLayout user={auth.user} header="Gestion du Blog">
            <Head title="Blog — Admin" />

            {toDelete && (
                <DeleteDialog
                    post={toDelete}
                    onConfirm={confirmDelete}
                    onCancel={() => setToDelete(null)}
                />
            )}

            <div className="max-w-6xl mx-auto py-10 px-6">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="font-headline text-2xl font-extrabold text-on-surface">Articles</h1>
                    <Link
                        href="/admin/posts/create"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-dim to-primary text-on-primary-fixed font-bold px-5 py-2.5 rounded-xl text-sm"
                    >
                        <span className="material-symbols-outlined text-base">add</span>
                        Nouvel article
                    </Link>
                </div>

                <div className="bg-surface-container rounded-2xl border border-outline-variant/10 overflow-hidden">
                    {posts.length === 0 ? (
                        <div className="py-16 text-center text-on-surface-variant">
                            <span className="material-symbols-outlined text-5xl opacity-20 block mb-3">article</span>
                            Aucun article pour l'instant.
                        </div>
                    ) : (
                        <table className="w-full text-sm">
                            <thead className="bg-surface-container-low border-b border-outline-variant/10">
                                <tr>
                                    <th className="text-left px-6 py-4 text-on-surface-variant font-bold uppercase text-xs tracking-widest">
                                        Titre
                                    </th>
                                    <th className="text-left px-6 py-4 text-on-surface-variant font-bold uppercase text-xs tracking-widest">
                                        Statut
                                    </th>
                                    <th className="text-left px-6 py-4 text-on-surface-variant font-bold uppercase text-xs tracking-widest">
                                        Date
                                    </th>
                                    <th className="px-6 py-4" />
                                </tr>
                            </thead>
                            <tbody>
                                {posts.map((post) => (
                                    <tr
                                        key={post.id}
                                        className="border-b border-outline-variant/5 hover:bg-surface-container-high transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-on-surface">{post.title}</div>
                                            <div className="text-on-surface-variant text-xs mt-0.5">/blog/{post.slug}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <StatusBadge published={post.is_published} />
                                        </td>
                                        <td className="px-6 py-4 text-on-surface-variant">
                                            {post.published_at
                                                ? new Date(post.published_at).toLocaleDateString('fr-FR')
                                                : '—'}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3 justify-end">
                                                {post.is_published && (
                                                    <a
                                                        href={`/blog/${post.slug}`}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="text-on-surface-variant hover:text-primary transition-colors"
                                                        title="Voir l'article"
                                                    >
                                                        <span className="material-symbols-outlined text-xl">visibility</span>
                                                    </a>
                                                )}
                                                <Link
                                                    href={`/admin/posts/${post.id}/edit`}
                                                    className="text-on-surface-variant hover:text-secondary transition-colors"
                                                    title="Modifier"
                                                >
                                                    <span className="material-symbols-outlined text-xl">edit</span>
                                                </Link>
                                                <button
                                                    onClick={() => setToDelete(post)}
                                                    className="text-on-surface-variant hover:text-red-400 transition-colors"
                                                    title="Supprimer"
                                                >
                                                    <span className="material-symbols-outlined text-xl">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
