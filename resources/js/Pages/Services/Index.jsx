import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';

export default function ServicesIndex({ services = [] }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        description: '',
        icon: '',
        link: '',
        order: 0,
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route('services.store'), { onSuccess: () => reset() });
    }

    function handleDelete(id) {
        router.delete(route('services.destroy', id));
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Gestion des Services
                </h2>
            }
        >
            <Head title="Services — Admin" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-8">

                    {/* Liste */}
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-bold mb-4 text-gray-900">Services existants</h3>
                            {services.length === 0 ? (
                                <p className="text-gray-500 text-sm">Aucun service pour l'instant.</p>
                            ) : (
                                <table className="w-full text-sm text-left text-gray-700">
                                    <thead className="text-xs uppercase bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-3">Icône</th>
                                            <th className="px-4 py-3">Titre</th>
                                            <th className="px-4 py-3">Description</th>
                                            <th className="px-4 py-3">Lien</th>
                                            <th className="px-4 py-3">Ordre</th>
                                            <th className="px-4 py-3" />
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {services.map((service) => (
                                            <tr key={service.id} className="border-t">
                                                <td className="px-4 py-3 font-mono text-xs">{service.icon}</td>
                                                <td className="px-4 py-3 font-semibold">{service.title}</td>
                                                <td className="px-4 py-3 max-w-xs truncate">{service.description}</td>
                                                <td className="px-4 py-3 text-blue-600">{service.link}</td>
                                                <td className="px-4 py-3">{service.order}</td>
                                                <td className="px-4 py-3">
                                                    <button
                                                        onClick={() => handleDelete(service.id)}
                                                        className="text-red-600 hover:underline text-xs"
                                                    >
                                                        Supprimer
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>

                    {/* Formulaire d'ajout */}
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-bold mb-4 text-gray-900">Ajouter un service</h3>
                            <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Titre <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        className="w-full border-gray-300 rounded-md shadow-sm text-sm"
                                    />
                                    {errors.title && <p className="text-red-600 text-xs mt-1">{errors.title}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Description <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        rows={3}
                                        className="w-full border-gray-300 rounded-md shadow-sm text-sm"
                                    />
                                    {errors.description && <p className="text-red-600 text-xs mt-1">{errors.description}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Icône Material Symbols <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="ex: hub, bolt, psychology"
                                        value={data.icon}
                                        onChange={(e) => setData('icon', e.target.value)}
                                        className="w-full border-gray-300 rounded-md shadow-sm text-sm font-mono"
                                    />
                                    {errors.icon && <p className="text-red-600 text-xs mt-1">{errors.icon}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Lien</label>
                                    <input
                                        type="text"
                                        placeholder="/services/mon-service"
                                        value={data.link}
                                        onChange={(e) => setData('link', e.target.value)}
                                        className="w-full border-gray-300 rounded-md shadow-sm text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Ordre</label>
                                    <input
                                        type="number"
                                        min={0}
                                        value={data.order}
                                        onChange={(e) => setData('order', parseInt(e.target.value, 10))}
                                        className="w-24 border-gray-300 rounded-md shadow-sm text-sm"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-indigo-600 text-white px-6 py-2 rounded-md text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50"
                                >
                                    {processing ? 'Enregistrement…' : 'Ajouter'}
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
