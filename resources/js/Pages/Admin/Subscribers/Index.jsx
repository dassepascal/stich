import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

function formatDate(iso) {
    if (!iso) return '—';
    return new Date(iso).toLocaleDateString('fr-FR', {
        day: '2-digit', month: 'short', year: 'numeric',
    });
}

export default function Index({ auth, subscribers }) {
    return (
        <AuthenticatedLayout user={auth.user} header="Abonnés Newsletter">
            <Head title="Abonnés — Admin" />

            <div className="max-w-4xl mx-auto py-10 px-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <p className="text-xs uppercase tracking-widest text-on-surface-variant font-bold mb-1">
                            Newsletter
                        </p>
                        <h1 className="font-headline text-2xl font-extrabold text-on-surface">
                            {subscribers.length} abonné{subscribers.length !== 1 ? 's' : ''}
                        </h1>
                    </div>

                    {subscribers.length > 0 && (
                        <a
                            href="/admin/subscribers/export"
                            className="inline-flex items-center gap-2 bg-surface-container border border-outline-variant/20 text-on-surface font-bold px-4 py-2.5 rounded-xl text-sm hover:bg-surface-container-high transition-colors"
                        >
                            <span className="material-symbols-outlined text-base">download</span>
                            Exporter CSV
                        </a>
                    )}
                </div>

                {/* Table */}
                {subscribers.length === 0 ? (
                    <div className="text-center py-24 text-on-surface-variant">
                        <span className="material-symbols-outlined text-6xl opacity-20 block mb-4">mail</span>
                        <p className="text-lg">Aucun abonné pour l'instant.</p>
                        <p className="text-sm opacity-60 mt-1">Le widget newsletter est visible sur toutes les pages publiques.</p>
                    </div>
                ) : (
                    <div className="bg-surface-container rounded-2xl border border-outline-variant/10 overflow-hidden">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-outline-variant/10">
                                    <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                                        Email
                                    </th>
                                    <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                                        Inscrit le
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {subscribers.map((sub, i) => (
                                    <tr
                                        key={sub.id}
                                        className={`border-b border-outline-variant/5 last:border-0 hover:bg-surface-container-high transition-colors ${
                                            i % 2 === 0 ? '' : 'bg-surface-container-low/30'
                                        }`}
                                    >
                                        <td className="px-6 py-4 text-on-surface font-medium">
                                            {sub.email}
                                        </td>
                                        <td className="px-6 py-4 text-on-surface-variant">
                                            {formatDate(sub.subscribed_at)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
