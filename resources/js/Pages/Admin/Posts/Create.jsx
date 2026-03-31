import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PostForm from '@/Components/PostForm';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        title:               '',
        slug:                '',
        content:             '',
        excerpt:             '',
        cover_image:         null,
        cover_image_path:    null,
        remove_cover_image:  false,
        is_published:        false,
    });

    return (
        <AuthenticatedLayout user={auth.user} header="Nouvel article">
            <Head title="Nouvel article — Admin" />

            <div className="max-w-4xl mx-auto py-10 px-6">
                <PostForm
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    onSubmit={(e) => { e.preventDefault(); post('/admin/posts'); }}
                    submitLabel="Créer l'article"
                />
            </div>
        </AuthenticatedLayout>
    );
}
