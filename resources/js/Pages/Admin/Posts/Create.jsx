import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import RichTextEditor from '@/Components/RichTextEditor';

function Field({ label, error, children }) {
    return (
        <div>
            <label className="block text-sm font-bold text-on-surface-variant mb-2">{label}</label>
            {children}
            {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
        </div>
    );
}

const inputClass =
    'w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-3 text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:border-primary/50 transition-colors text-sm';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        title:        '',
        slug:         '',
        content:      '',
        excerpt:      '',
        cover_image:  '',
        is_published: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/posts');
    };

    return (
        <AuthenticatedLayout user={auth.user} header="Nouvel article">
            <Head title="Nouvel article — Admin" />

            <div className="max-w-4xl mx-auto py-10 px-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Field label="Titre *" error={errors.title}>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                placeholder="Mon article sur l'IA..."
                                className={inputClass}
                            />
                        </Field>
                        <Field label="Slug (auto-généré si vide)" error={errors.slug}>
                            <input
                                type="text"
                                value={data.slug}
                                onChange={(e) => setData('slug', e.target.value)}
                                placeholder="mon-article-sur-ia"
                                className={inputClass}
                            />
                        </Field>
                    </div>

                    <Field label="Contenu *" error={errors.content}>
                        <RichTextEditor
                            value={data.content}
                            onChange={(html) => setData('content', html)}
                        />
                    </Field>

                    <Field label="Résumé (extrait)" error={errors.excerpt}>
                        <textarea
                            value={data.excerpt}
                            onChange={(e) => setData('excerpt', e.target.value)}
                            rows={3}
                            placeholder="Un bref résumé affiché dans la liste des articles..."
                            className={inputClass}
                        />
                    </Field>

                    <Field label="Image de couverture (URL)" error={errors.cover_image}>
                        <input
                            type="text"
                            value={data.cover_image}
                            onChange={(e) => setData('cover_image', e.target.value)}
                            placeholder="https://images.unsplash.com/..."
                            className={inputClass}
                        />
                    </Field>

                    <label className="flex items-center gap-3 cursor-pointer">
                        <div
                            className={`w-11 h-6 rounded-full transition-colors relative ${data.is_published ? 'bg-primary' : 'bg-surface-container-high'}`}
                            onClick={() => setData('is_published', !data.is_published)}
                        >
                            <div
                                className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${data.is_published ? 'translate-x-6' : 'translate-x-1'}`}
                            />
                        </div>
                        <span className="text-sm font-bold text-on-surface-variant">
                            {data.is_published ? 'Publier immédiatement' : 'Enregistrer comme brouillon'}
                        </span>
                    </label>

                    <div className="flex items-center gap-4 pt-2">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-gradient-to-r from-primary-dim to-primary text-on-primary-fixed font-bold px-8 py-3 rounded-xl text-sm disabled:opacity-50"
                        >
                            {processing ? 'Enregistrement...' : 'Créer l\'article'}
                        </button>
                        <a href="/admin/posts" className="text-sm text-on-surface-variant hover:text-on-surface transition-colors">
                            Annuler
                        </a>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
