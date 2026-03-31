import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PostForm from '@/Components/PostForm';

export default function Edit({ auth, post }) {
    const { data, setData, post: submit, processing, errors } = useForm({
        _method:             'PATCH',
        title:               post.title,
        slug:                post.slug,
        content:             post.content,
        excerpt:             post.excerpt  ?? '',
        cover_image:         null,          // null = garder l'existante
        cover_image_path:    null,          // chemin si sélectionné via Unsplash
        remove_cover_image:  false,
        is_published:        post.is_published,
    });

    const existingCoverUrl = post.cover_image_url ?? null;

    return (
        <AuthenticatedLayout user={auth.user} header="Modifier l'article">
            <Head title={`Modifier — ${post.title}`} />

            <div className="max-w-4xl mx-auto py-10 px-6">
                <PostForm
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    onSubmit={(e) => { e.preventDefault(); submit(`/admin/posts/${post.id}`); }}
                    submitLabel="Mettre à jour"
                    existingCoverUrl={existingCoverUrl}
                />
            </div>
        </AuthenticatedLayout>
    );
}
