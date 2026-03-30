import { useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

// ── Helpers ───────────────────────────────────────────────────────────────────

function StatusBadge({ status }) {
    if (status === 'read') {
        return (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-surface-container-high text-on-surface-variant border border-outline-variant/20">
                <span className="material-symbols-outlined text-xs">check</span>
                Lu
            </span>
        );
    }
    return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20">
            <span className="material-symbols-outlined text-xs">circle</span>
            Nouveau
        </span>
    );
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

// ── Modale détail ─────────────────────────────────────────────────────────────

function ContactDetailPanel({ contact, onClose }) {
    if (!contact) return null;

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                onClick={onClose}
            />
            {/* Panel */}
            <div className="fixed inset-y-0 right-0 w-full max-w-lg bg-surface-container-low border-l border-outline-variant/15 z-50 flex flex-col shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant/15">
                    <div>
                        <h2 className="font-headline text-lg font-bold text-on-surface">{contact.name}</h2>
                        <p className="text-sm text-on-surface-variant">{contact.email}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors"
                    >
                        <span className="material-symbols-outlined text-lg">close</span>
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-6 space-y-5">
                    <div className="flex items-center gap-3">
                        <StatusBadge status={contact.status} />
                        <span className="text-xs text-on-surface-variant">{formatDate(contact.created_at)}</span>
                    </div>

                    {contact.company && (
                        <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                            <span className="material-symbols-outlined text-base">corporate_fare</span>
                            {contact.company}
                        </div>
                    )}

                    <div className="bg-surface-container rounded-xl p-5 border border-outline-variant/15">
                        <p className="text-[0.65rem] uppercase tracking-widest font-bold text-on-surface-variant mb-3">
                            Message
                        </p>
                        <p className="text-on-surface text-sm leading-relaxed whitespace-pre-wrap">
                            {contact.message}
                        </p>
                    </div>
                </div>

                {/* Footer actions */}
                <div className="px-6 py-4 border-t border-outline-variant/15 flex gap-3">
                    <a
                        href={`mailto:${contact.email}`}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-primary text-on-primary-fixed font-bold rounded-xl text-sm hover:bg-primary-fixed transition-all"
                    >
                        <span className="material-symbols-outlined text-base">campaign</span>
                        Répondre
                    </a>
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 border border-outline-variant/30 text-on-surface-variant rounded-xl text-sm hover:bg-surface-container transition-all"
                    >
                        Fermer
                    </button>
                </div>
            </div>
        </>
    );
}

// ── Dialog de confirmation suppression ────────────────────────────────────────

function DeleteConfirmDialog({ contact, onConfirm, onCancel }) {
    if (!contact) return null;

    return (
        <>
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50" onClick={onCancel} />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="bg-surface-container rounded-2xl border border-outline-variant/15 p-6 max-w-sm w-full shadow-2xl">
                    <div className="w-12 h-12 rounded-xl bg-error/10 flex items-center justify-center mb-4">
                        <span className="material-symbols-outlined text-error text-2xl">delete</span>
                    </div>
                    <h3 className="font-headline text-lg font-bold mb-2">Supprimer ce message ?</h3>
                    <p className="text-on-surface-variant text-sm mb-6">
                        Le message de <strong className="text-on-surface">{contact.name}</strong> sera supprimé définitivement. Cette action est irréversible.
                    </p>
                    <div className="flex gap-3">
                        <button
                            onClick={onConfirm}
                            className="flex-1 py-2.5 bg-error text-on-error font-bold rounded-xl text-sm hover:opacity-90 transition-all"
                        >
                            Supprimer
                        </button>
                        <button
                            onClick={onCancel}
                            className="flex-1 py-2.5 border border-outline-variant/30 text-on-surface-variant rounded-xl text-sm hover:bg-surface-container-high transition-all"
                        >
                            Annuler
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

// ── Page principale ───────────────────────────────────────────────────────────

export default function Index({ contacts = [] }) {
    const { flash } = usePage().props;
    const [viewing, setViewing]   = useState(null);
    const [deleting, setDeleting] = useState(null);

    function handleView(contact) {
        setViewing(contact);
        if (contact.status === 'new') {
            router.patch(route('admin.contacts.read', contact.id), {}, { preserveScroll: true, preserveState: true });
        }
    }

    function handleDeleteConfirm() {
        router.delete(route('admin.contacts.destroy', deleting.id), {
            onSuccess: () => setDeleting(null),
        });
    }

    const newCount = contacts.filter((c) => c.status === 'new').length;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 font-headline">
                        Messages de contact
                    </h2>
                    {newCount > 0 && (
                        <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-orange-100 text-orange-700">
                            {newCount} nouveau{newCount > 1 ? 'x' : ''}
                        </span>
                    )}
                </div>
            }
        >
            <Head title="Admin — Contacts" />

            <style>{`
                .material-symbols-outlined {
                    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
                }
            `}</style>

            <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

                {flash?.success && (
                    <div className="mb-6 flex items-center gap-2 px-4 py-3 bg-green-50 border border-green-200 rounded-xl text-green-800 text-sm">
                        <span className="material-symbols-outlined text-base text-green-600">check_circle</span>
                        {flash.success}
                    </div>
                )}

                {contacts.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                        <span className="material-symbols-outlined text-5xl text-gray-300 block mb-3">inbox</span>
                        <p className="text-gray-500 font-headline">Aucun message pour l'instant.</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">Statut</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">Nom</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">Email</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500 hidden md:table-cell">Entreprise</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500 hidden lg:table-cell">Date</th>
                                    <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-gray-500">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {contacts.map((contact) => (
                                    <tr
                                        key={contact.id}
                                        className={`hover:bg-gray-50 transition-colors ${contact.status === 'new' ? 'bg-orange-50/30' : ''}`}
                                    >
                                        <td className="px-6 py-4">
                                            <StatusBadge status={contact.status} />
                                        </td>
                                        <td className="px-6 py-4 font-headline font-semibold text-gray-900">
                                            {contact.name}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{contact.email}</td>
                                        <td className="px-6 py-4 text-gray-500 hidden md:table-cell">
                                            {contact.company ?? <span className="text-gray-300">—</span>}
                                        </td>
                                        <td className="px-6 py-4 text-gray-400 text-xs hidden lg:table-cell">
                                            {formatDate(contact.created_at)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleView(contact)}
                                                    title="Voir le message"
                                                    className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-orange-100 flex items-center justify-center text-gray-500 hover:text-orange-600 transition-all"
                                                >
                                                    <span className="material-symbols-outlined text-base">visibility</span>
                                                </button>
                                                <button
                                                    onClick={() => setDeleting(contact)}
                                                    title="Supprimer"
                                                    className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-red-100 flex items-center justify-center text-gray-500 hover:text-red-600 transition-all"
                                                >
                                                    <span className="material-symbols-outlined text-base">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Panels */}
            <ContactDetailPanel contact={viewing} onClose={() => setViewing(null)} />
            <DeleteConfirmDialog
                contact={deleting}
                onConfirm={handleDeleteConfirm}
                onCancel={() => setDeleting(null)}
            />
        </AuthenticatedLayout>
    );
}
