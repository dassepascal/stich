import { Link, usePage } from '@inertiajs/react';
import Dropdown from '@/Components/Dropdown';
import { useState } from 'react';

const NAV_ITEMS = [
    { label: 'Dashboard',       href: '/dashboard',        icon: 'dashboard',   match: '/dashboard' },
    { label: 'Messages',        href: '/admin/contacts',   icon: 'mail',        match: '/admin/contacts' },
    { label: 'Services',        href: '/dashboard/services', icon: 'hub',       match: '/dashboard/services' },
    { label: 'Gestion du Blog', href: '/admin/posts',      icon: 'article',     match: '/admin/posts' },
    { label: 'Abonnés',        href: '/admin/subscribers', icon: 'group',       match: '/admin/subscribers' },
];

function NavItem({ item, url, mobile = false }) {
    const active = url.startsWith(item.match);

    if (mobile) {
        return (
            <Link
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-bold transition-colors ${
                    active
                        ? 'text-primary bg-primary/5'
                        : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                }`}
            >
                <span className="material-symbols-outlined text-xl">{item.icon}</span>
                {item.label}
            </Link>
        );
    }

    return (
        <Link
            href={item.href}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold transition-colors ${
                active
                    ? 'text-primary bg-primary/10'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
            }`}
        >
            <span className="material-symbols-outlined text-lg">{item.icon}</span>
            {item.label}
        </Link>
    );
}

export default function AuthenticatedLayout({ header, children }) {
    const { url, props: { auth } } = usePage();
    const user = auth.user;
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background text-on-surface">
            <style>{`
                .material-symbols-outlined {
                    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
                }
            `}</style>

            {/* Top nav */}
            <nav className="fixed top-0 w-full z-50 border-b border-outline-variant/15 bg-[#0e0e0e]/90 backdrop-blur-xl">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="flex h-16 items-center justify-between gap-6">
                        {/* Logo */}
                        <Link
                            href="/"
                            className="text-xl font-black text-tertiary tracking-tighter font-headline shrink-0"
                        >
                            KINETIC AI
                        </Link>

                        {/* Desktop nav */}
                        <div className="hidden md:flex items-center gap-1 flex-1">
                            {NAV_ITEMS.map((item) => (
                                <NavItem key={item.href} item={item} url={url} />
                            ))}
                        </div>

                        {/* User dropdown */}
                        <div className="hidden md:block shrink-0">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button
                                        type="button"
                                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-outline-variant/20 text-sm font-bold text-on-surface-variant hover:text-on-surface hover:border-outline-variant/40 transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-lg">account_circle</span>
                                        {user.name}
                                        <span className="material-symbols-outlined text-base opacity-60">expand_more</span>
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <Dropdown.Link href={route('profile.edit')}>
                                        Profil
                                    </Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button">
                                        Déconnexion
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>

                        {/* Mobile burger */}
                        <button
                            className="md:hidden p-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
                            onClick={() => setMobileOpen((v) => !v)}
                        >
                            <span className="material-symbols-outlined">
                                {mobileOpen ? 'close' : 'menu'}
                            </span>
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {mobileOpen && (
                    <div className="md:hidden border-t border-outline-variant/15 bg-surface-container-low">
                        <div className="py-2">
                            {NAV_ITEMS.map((item) => (
                                <NavItem key={item.href} item={item} url={url} mobile />
                            ))}
                        </div>
                        <div className="border-t border-outline-variant/10 px-4 py-4">
                            <p className="text-sm font-bold text-on-surface">{user.name}</p>
                            <p className="text-xs text-on-surface-variant mb-3">{user.email}</p>
                            <div className="flex gap-3">
                                <Link
                                    href={route('profile.edit')}
                                    className="text-sm text-on-surface-variant hover:text-on-surface transition-colors"
                                >
                                    Profil
                                </Link>
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="text-sm text-on-surface-variant hover:text-red-400 transition-colors"
                                >
                                    Déconnexion
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {/* Page header */}
            {header && (
                <div className="pt-16">
                    <div className="border-b border-outline-variant/10 bg-surface-container-low">
                        <div className="mx-auto max-w-7xl px-6 py-5">
                            <h1 className="font-headline text-xl font-extrabold text-on-surface">
                                {header}
                            </h1>
                        </div>
                    </div>
                </div>
            )}

            <main className={header ? '' : 'pt-16'}>{children}</main>
        </div>
    );
}
