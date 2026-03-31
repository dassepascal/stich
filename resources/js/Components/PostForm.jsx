import { useState, useRef, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import RichTextEditor from '@/Components/RichTextEditor';
import axios from 'axios';

/* ── Styles identiques à Blog/Show pour le WYSIWYG ─────────────────────── */
const ARTICLE_STYLES = `
    .preview-content h2 {
        font-family: var(--font-headline, sans-serif);
        font-size: 1.6rem; font-weight: 800; color: #ff8f73;
        margin-top: 2.5rem; margin-bottom: 0.75rem; letter-spacing: -0.02em;
    }
    .preview-content h3 {
        font-size: 1.2rem; font-weight: 700; color: #e5e5e5;
        margin-top: 1.75rem; margin-bottom: 0.5rem;
    }
    .preview-content p   { margin-bottom: 1.25rem; color: #9a9a9a; line-height: 1.8; font-size: 1.05rem; }
    .preview-content ul,
    .preview-content ol  { padding-left: 1.5rem; margin-bottom: 1.25rem; color: #9a9a9a; }
    .preview-content li  { margin-bottom: 0.4rem; line-height: 1.8; }
    .preview-content ul  { list-style: disc; }
    .preview-content ol  { list-style: decimal; }
    .preview-content strong { color: #e5e5e5; font-weight: 700; }
    .preview-content em     { color: #c7c7ff; }
    .preview-content code   {
        background: #1a1a1a; border: 1px solid #333; border-radius: 5px;
        padding: 0.15em 0.4em; font-size: 0.88em; color: #fd9000;
    }
    .preview-content blockquote {
        border-left: 3px solid #ff8f73; padding-left: 1.25rem;
        margin: 1.5rem 0; color: #9a9a9a; font-style: italic;
    }
    .preview-content a { color: #ff8f73; text-decoration: underline; text-underline-offset: 3px; }
`;

const inputClass =
    'w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-3 text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:border-primary/50 transition-colors text-sm';

function Field({ label, error, hint, action, children }) {
    return (
        <div>
            <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-bold text-on-surface-variant">
                    {label}
                    {hint && <span className="ml-2 font-normal opacity-50 text-xs">{hint}</span>}
                </label>
                {action}
            </div>
            {children}
            {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
        </div>
    );
}

function generateExcerpt(html) {
    if (!html) return '';
    const div = document.createElement('div');
    div.innerHTML = html;
    const text = (div.textContent || div.innerText || '').replace(/\s+/g, ' ').trim();

    if (text.length <= 200) return text;

    // Try to end on a sentence boundary within 200 chars
    const slice = text.slice(0, 200);
    const lastDot = Math.max(slice.lastIndexOf('. '), slice.lastIndexOf('! '), slice.lastIndexOf('? '));
    if (lastDot > 80) return text.slice(0, lastDot + 1);

    // Fall back to last word boundary
    const lastSpace = slice.lastIndexOf(' ');
    return slice.slice(0, lastSpace) + '…';
}

/* ── Unsplash modal ──────────────────────────────────────────────────────── */
function UnsplashModal({ defaultQuery, onSelect, onClose }) {
    const [query, setQuery]     = useState(defaultQuery || '');
    const [photos, setPhotos]   = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError]     = useState(null);
    const [pickingId, setPickingId] = useState(null);
    const inputRef = useRef(null);

    const search = useCallback(async (q) => {
        if (!q.trim()) return;
        setLoading(true);
        setError(null);
        setPhotos([]);
        try {
            const { data } = await axios.get('/admin/images/search', { params: { q } });
            setPhotos(data.photos ?? []);
        } catch (e) {
            setError(e.response?.data?.error ?? 'Erreur lors de la recherche.');
        } finally {
            setLoading(false);
        }
    }, []);

    /* auto-search on open if we have a default query */
    useEffect(() => {
        if (defaultQuery) search(defaultQuery);
        inputRef.current?.focus();
    }, []);

    /* close on Escape */
    useEffect(() => {
        const handler = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [onClose]);

    const handlePick = async (photo) => {
        setPickingId(photo.id);
        try {
            const { data } = await axios.post('/admin/images', { url: photo.regular });
            onSelect({ path: data.path, url: data.url, author: photo.author, authorLink: photo.author_link });
        } catch (e) {
            setError("Impossible de télécharger cette image.");
            setPickingId(null);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            {/* Backdrop */}
            <motion.div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            />

            {/* Panel */}
            <motion.div
                className="relative z-10 w-full max-w-3xl bg-[#1a1a1a] border border-outline-variant/20 rounded-2xl shadow-2xl flex flex-col max-h-[85vh]"
                initial={{ opacity: 0, scale: 0.95, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 12 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant/15">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary text-xl">image_search</span>
                        <h2 className="font-bold text-on-surface text-sm">Trouver une image via Unsplash</h2>
                    </div>
                    <button type="button" onClick={onClose} className="text-on-surface-variant hover:text-on-surface transition-colors">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Search bar */}
                <div className="px-6 py-4 border-b border-outline-variant/15">
                    <form
                        onSubmit={(e) => { e.preventDefault(); search(query); }}
                        className="flex gap-3"
                    >
                        <input
                            ref={inputRef}
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="intelligence artificielle, technologie..."
                            className={inputClass + ' flex-1'}
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-primary text-on-primary-fixed font-bold px-5 py-2.5 rounded-xl text-sm disabled:opacity-50 flex items-center gap-2 whitespace-nowrap"
                        >
                            <span className="material-symbols-outlined text-base">search</span>
                            Chercher
                        </button>
                    </form>
                </div>

                {/* Results */}
                <div className="flex-1 overflow-y-auto p-6">
                    {loading && (
                        <div className="flex items-center justify-center py-16 gap-3 text-on-surface-variant">
                            <span className="material-symbols-outlined animate-spin text-primary">progress_activity</span>
                            Recherche en cours…
                        </div>
                    )}

                    {error && (
                        <p className="text-red-400 text-sm text-center py-8">{error}</p>
                    )}

                    {!loading && !error && photos.length === 0 && (
                        <div className="text-center py-16 text-on-surface-variant opacity-40">
                            <span className="material-symbols-outlined text-5xl mb-3 block">image_search</span>
                            <p className="text-sm">Lance une recherche pour trouver des photos</p>
                        </div>
                    )}

                    {photos.length > 0 && (
                        <>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {photos.map((photo) => (
                                    <button
                                        key={photo.id}
                                        type="button"
                                        disabled={pickingId !== null}
                                        onClick={() => handlePick(photo)}
                                        className="group relative aspect-video rounded-xl overflow-hidden border border-outline-variant/10 hover:border-primary/50 transition-all disabled:cursor-wait"
                                    >
                                        <img
                                            src={photo.thumb}
                                            alt={photo.alt || photo.author}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />

                                        {/* Hover overlay */}
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1">
                                            {pickingId === photo.id ? (
                                                <span className="material-symbols-outlined animate-spin text-white text-2xl">progress_activity</span>
                                            ) : (
                                                <>
                                                    <span className="material-symbols-outlined text-white text-2xl">add_photo_alternate</span>
                                                    <span className="text-white text-xs font-bold">Choisir</span>
                                                </>
                                            )}
                                        </div>

                                        {/* Author credit */}
                                        <div className="absolute bottom-0 left-0 right-0 px-2 py-1 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <p className="text-white/70 text-[10px] truncate">{photo.author}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <p className="text-center text-xs text-on-surface-variant/40 mt-4">
                                Photos via{' '}
                                <a href="https://unsplash.com" target="_blank" rel="noreferrer" className="underline hover:text-on-surface-variant/70">
                                    Unsplash
                                </a>
                            </p>
                        </>
                    )}
                </div>
            </motion.div>
        </div>
    );
}

/* ── Image upload + Unsplash button ─────────────────────────────────────── */
function ImageUpload({ preview, onFileChange, onRemove, onUnsplashSelect, defaultQuery }) {
    const inputRef = useRef(null);
    const [showUnsplash, setShowUnsplash] = useState(false);

    const handleUnsplashSelect = (result) => {
        onUnsplashSelect(result);
        setShowUnsplash(false);
    };

    return (
        <div>
            <div
                className="w-full aspect-video rounded-xl overflow-hidden border border-outline-variant/20 bg-surface-container relative group cursor-pointer"
                onClick={() => inputRef.current?.click()}
            >
                {preview ? (
                    <>
                        <img src={preview} alt="Couverture" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                            <span className="text-white text-sm font-bold bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                                Changer
                            </span>
                        </div>
                    </>
                ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-on-surface-variant">
                        <span className="material-symbols-outlined text-4xl opacity-30">add_photo_alternate</span>
                        <p className="text-sm">Cliquer pour choisir une image</p>
                        <p className="text-xs opacity-50">JPEG, PNG ou WEBP — max 2 Mo — format 16:9 recommandé</p>
                    </div>
                )}
            </div>

            <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) => onFileChange(e.target.files[0] ?? null)}
            />

            {/* Action buttons */}
            <div className="flex items-center gap-3 mt-3">
                <button
                    type="button"
                    onClick={() => setShowUnsplash(true)}
                    className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-primary/80 transition-colors bg-primary/10 hover:bg-primary/15 px-3 py-1.5 rounded-lg"
                >
                    <span className="material-symbols-outlined text-sm">image_search</span>
                    Trouver une image via Unsplash
                </button>

                {preview && (
                    <button
                        type="button"
                        onClick={onRemove}
                        className="inline-flex items-center gap-1 text-xs text-red-400 hover:text-red-300 transition-colors"
                    >
                        <span className="material-symbols-outlined text-sm">delete</span>
                        Supprimer
                    </button>
                )}
            </div>

            <AnimatePresence>
                {showUnsplash && (
                    <UnsplashModal
                        defaultQuery={defaultQuery}
                        onSelect={handleUnsplashSelect}
                        onClose={() => setShowUnsplash(false)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

function Preview({ data, imagePreview }) {
    const date = new Date().toLocaleDateString('fr-FR', {
        day: 'numeric', month: 'long', year: 'numeric',
    });

    return (
        <div className="max-w-2xl mx-auto py-6">
            <style>{ARTICLE_STYLES}</style>
            <p className="text-xs uppercase tracking-widest font-bold text-on-surface-variant mb-2 opacity-40">
                Aperçu
            </p>

            {imagePreview && (
                <div className="w-full aspect-video rounded-2xl overflow-hidden mb-8">
                    <img src={imagePreview} alt="Cover" className="w-full h-full object-cover" />
                </div>
            )}

            <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-3">
                {date}
            </p>
            <h1 className="font-headline text-3xl md:text-4xl font-extrabold text-on-surface leading-tight tracking-tight mb-4">
                {data.title || <span className="opacity-20">Titre de l'article</span>}
            </h1>
            {data.excerpt && (
                <p className="text-on-surface-variant text-base leading-relaxed mb-8 border-b border-outline-variant/15 pb-8">
                    {data.excerpt}
                </p>
            )}
            <div
                className="preview-content"
                dangerouslySetInnerHTML={{
                    __html: data.content || '<p class="opacity-20">Le contenu apparaîtra ici…</p>',
                }}
            />
        </div>
    );
}

export default function PostForm({
    data,
    setData,
    errors,
    processing,
    onSubmit,
    submitLabel = "Enregistrer",
    existingCoverUrl = null,
}) {
    const [tab, setTab]           = useState('editor');
    const [imagePreview, setImagePreview] = useState(existingCoverUrl);

    const handleFileChange = (file) => {
        if (!file) return;
        setData('cover_image', file);
        setData('remove_cover_image', false);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleRemoveImage = () => {
        setData('cover_image', null);
        setData('remove_cover_image', true);
        setImagePreview(null);
    };

    const handleUnsplashSelect = ({ path, url }) => {
        // Image already downloaded server-side — pass path via dedicated field
        setData('cover_image', null);
        setData('cover_image_path', path);
        setData('remove_cover_image', false);
        setImagePreview(url);
    };

    return (
        <form onSubmit={onSubmit} encType="multipart/form-data">
            <style>{`
                .material-symbols-outlined {
                    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
                }
            `}</style>

            {/* Tab bar */}
            <div className="flex gap-1 mb-8 bg-surface-container-low p-1 rounded-xl w-fit">
                {[
                    { key: 'editor',  label: 'Éditeur',  icon: 'edit_note' },
                    { key: 'preview', label: 'Aperçu',   icon: 'visibility' },
                ].map(({ key, label, icon }) => (
                    <button
                        key={key}
                        type="button"
                        onClick={() => setTab(key)}
                        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-colors ${
                            tab === key
                                ? 'bg-surface-container text-on-surface shadow-sm'
                                : 'text-on-surface-variant hover:text-on-surface'
                        }`}
                    >
                        <span className="material-symbols-outlined text-base">{icon}</span>
                        {label}
                    </button>
                ))}
            </div>

            {tab === 'editor' ? (
                <div className="space-y-6">
                    {/* Title + Slug */}
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
                        <Field label="Slug" hint="auto-généré si vide" error={errors.slug}>
                            <input
                                type="text"
                                value={data.slug}
                                onChange={(e) => setData('slug', e.target.value)}
                                placeholder="mon-article-sur-ia"
                                className={inputClass}
                            />
                        </Field>
                    </div>

                    {/* Image de couverture */}
                    <Field label="Image de couverture" error={errors.cover_image}>
                        <ImageUpload
                            preview={imagePreview}
                            onFileChange={handleFileChange}
                            onRemove={handleRemoveImage}
                            onUnsplashSelect={handleUnsplashSelect}
                            defaultQuery={data.title || ''}
                        />
                    </Field>

                    {/* Content */}
                    <Field label="Contenu *" error={errors.content}>
                        <RichTextEditor
                            value={data.content}
                            onChange={(html) => setData('content', html)}
                        />
                    </Field>

                    {/* Excerpt */}
                    <Field
                        label="Résumé (extrait)"
                        hint="affiché dans la liste et les cartes"
                        error={errors.excerpt}
                        action={
                            <button
                                type="button"
                                disabled={!data.content}
                                onClick={() => setData('excerpt', generateExcerpt(data.content))}
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary/80 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            >
                                <span className="material-symbols-outlined text-sm">auto_awesome</span>
                                Générer automatiquement
                            </button>
                        }
                    >
                        <textarea
                            value={data.excerpt}
                            onChange={(e) => setData('excerpt', e.target.value)}
                            rows={3}
                            placeholder="Un bref résumé affiché dans la liste des articles..."
                            className={inputClass}
                        />
                    </Field>

                    {/* Publish toggle */}
                    <label className="flex items-center gap-3 cursor-pointer">
                        <div
                            className={`w-11 h-6 rounded-full transition-colors relative ${
                                data.is_published ? 'bg-primary' : 'bg-surface-container-high'
                            }`}
                            onClick={() => setData('is_published', !data.is_published)}
                        >
                            <div
                                className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                                    data.is_published ? 'translate-x-6' : 'translate-x-1'
                                }`}
                            />
                        </div>
                        <span className="text-sm font-bold text-on-surface-variant">
                            {data.is_published ? 'Publier immédiatement' : 'Enregistrer comme brouillon'}
                        </span>
                    </label>
                </div>
            ) : (
                <Preview data={data} imagePreview={imagePreview} />
            )}

            {/* Submit bar */}
            <div className="flex items-center gap-4 pt-8 mt-8 border-t border-outline-variant/10">
                <button
                    type="submit"
                    disabled={processing}
                    className="bg-gradient-to-r from-primary-dim to-primary text-on-primary-fixed font-bold px-8 py-3 rounded-xl text-sm disabled:opacity-50"
                >
                    {processing ? 'Enregistrement...' : submitLabel}
                </button>
                <a
                    href="/admin/posts"
                    className="text-sm text-on-surface-variant hover:text-on-surface transition-colors"
                >
                    Annuler
                </a>
            </div>
        </form>
    );
}
