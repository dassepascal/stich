# KINETIC AI — Règles de développement

## Stack technique
- **Backend :** Laravel 11, PHP 8.3+, Pest PHP (TDD)
- **Frontend :** Inertia.js + React **TypeScript**, Tailwind CSS, Framer Motion
- **Auth :** Laravel Breeze (session-based, email verification)
- **Base de données :** MySQL/SQLite — migrations strictes
- **Typage :** TypeScript strict (`"strict": true` dans `tsconfig.json`) — fichiers `.tsx` / `.ts`

---

## Profil & Comportement
- Tu es un développeur Senior Laravel spécialisé en architecture propre et TDD.
- Tu utilises systématiquement les fonctionnalités de PHP 8.3+ et Laravel 11.
- Avant de coder une fonctionnalité, tu proposes un plan d'action.
- Les contrôleurs sont **Skinny** : toute logique métier vit dans `app/Actions/`.

---

## Méthodologie TDD — Règle absolue

**Aucun code de production ne s'écrit avant son test.** Workflow obligatoire :

1. Créer le test dans `tests/Feature/` (ou `tests/Unit/`)
2. Lancer `./vendor/bin/pest` — constater le rouge
3. Écrire le code minimal pour passer au vert
4. Refactoriser si nécessaire

Toute Route + Action + Controller livrée **doit** avoir son test Pest associé.

---

## TypeScript — Standards stricts

### Imports Inertia (`@inertiajs/react`)
Toujours importer depuis `@inertiajs/react` avec les noms exacts — jamais depuis `@inertiajs/core` directement en composant :
```typescript
import { usePage, Link, router, useForm, Head } from '@inertiajs/react';
import type { PageProps as InertiaPageProps } from '@inertiajs/core';
```

### Types globaux (`resources/js/types/index.d.ts`)
Fichier centralisé pour tous les types partagés :
```typescript
import type { PageProps as InertiaPageProps } from '@inertiajs/core';

export interface User {
  id: number;
  name: string;
  email: string;
  is_admin: boolean;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  link: string;
  order: number;
}

export interface Contact {
  id: number;
  name: string;
  email: string;
  company: string | null;
  message: string;
  status: 'unread' | 'read';
  created_at: string;
}

export interface Lead {
  id: number;
  email: string;
  status: string;
  ip_address: string | null;
}

// Props partagées injectées par HandleInertiaRequests::share()
export interface SharedProps extends InertiaPageProps {
  auth: { user: User | null };
  flash: {
    lead_success?: string;
    contact_success?: string;
  };
}

// Helper — remplace usePage<any>() partout
export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> =
  SharedProps & T;
```

### Interfaces de Props — Règle absolue
Chaque composant et page **doit** déclarer une interface de Props explicite. Jamais `any`, jamais d'inférence implicite sur les props :
```typescript
// Bonne pratique — page Inertia
interface Props {
  services: Service[];
}

export default function Welcome({ services }: Props) { ... }

// Bonne pratique — composant enfant
interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  colorClass: string;
  onClick?: () => void;
}

export default function ServiceCard({ title, description, icon, colorClass, onClick }: ServiceCardProps) { ... }
```

### `usePage` typé
Toujours passer le type générique pour accéder aux props partagées sans `any` :
```typescript
const { auth, flash } = usePage<PageProps>().props;
// ou avec props spécifiques à la page :
const { auth, flash, services } = usePage<PageProps<{ services: Service[] }>>().props;
```

### `useForm` typé
```typescript
const { data, setData, post, processing, errors } = useForm<{
  email: string;
  website: string; // honeypot
}>({ email: '', website: '' });
```

### Types de retour des Actions PHP
La méthode `handle()` de chaque Action **doit** déclarer son type de retour explicitement :
```php
// Actions qui créent un modèle
public function handle(StoreLeadRequest $request): Lead { ... }
public function handle(ContactRequest $request): Contact { ... }
public function handle(ServiceRequest $request): Service { ... }

// Actions qui modifient un modèle
public function handle(Service $service, ServiceRequest $request): Service { ... }

// Actions void (side-effects uniquement)
public function handle(Contact $contact): void { ... }
```

### Extensions de fichiers
- Pages et composants React → `.tsx`
- Hooks, utilitaires, types → `.ts`
- Jamais `.jsx` / `.js` dans les nouveaux fichiers

---

## Architecture Laravel 11

### Actions (`app/Actions/`)
Chaque opération métier est une classe à méthode unique `handle()` :
```
CreateServiceAction
UpdateServiceAction
RegisterLeadAction          → crée Lead + IP + dispatch LeadRegistered
ProcessContactMessageAction → crée Contact + Log + dispatch ContactMessageReceived
MarkContactAsReadAction     → idempotent (vérifie status avant update)
```
Les contrôleurs instancient et appellent les actions — jamais la logique directement.

### FormRequests (`app/Http/Requests/`)
Toute validation passe par une `FormRequest` dédiée. Messages d'erreur en **français**.
```
ServiceRequest
StoreLeadRequest   → email:rfc (pas dns — échoue en test)
ContactRequest     → inclut honeypot : website present|max:0
```

### Événements & Listeners
**Pas d'`EventServiceProvider`** en Laravel 11 — tout est enregistré dans `AppServiceProvider::boot()` :
```php
Event::listen(LeadRegistered::class, SendNewLeadNotification::class);
```

### Middleware
Alias enregistrés dans `bootstrap/app.php` via `$middleware->alias()` :
```
'admin' => EnsureUserIsAdmin::class
```
Protection admin : `['auth', 'verified', 'admin']` (3 niveaux).

### Routes nommées
```
GET  /                     → Welcome (services injectés)
GET  /sme-solutions        → sme-solutions
GET  /automatisation       → automatisation
GET  /contact              → contact
POST /contact              → contact.store
POST /leads                → leads.store
GET  /confidentialite      → confidentialite
GET  /conditions           → conditions
GET  /mentions-legales     → mentions-legales
GET  /admin/contacts       → admin.contacts.index
PATCH /admin/contacts/{id}/read  → admin.contacts.read
DELETE /admin/contacts/{id}      → admin.contacts.destroy
```

---

## Design System — Kinetic AI

### Palette officielle
| Token | Valeur |
|---|---|
| `background` | `#0e0e0e` |
| `primary` | `#ff8f73` |
| `primary-dim` | `#c9563a` |
| `primary-fixed` | `#ffd4c9` |
| `primary-container` | `#3a1a12` |
| `secondary` | `#fd9000` |
| `tertiary` | `#c7c7ff` |
| `surface-container-low` | `#131313` |
| `surface-container` | `#1a1a1a` |
| `surface-container-high` | `#222222` |
| `on-surface` | `#e5e5e5` |
| `on-surface-variant` | `#9a9a9a` |
| `outline-variant` | `#333333` |

`darkMode: 'class'` — `<html class="dark">` toujours présent dans `app.blade.php`.

### Typographie
- **Titres :** `font-headline` → Manrope (Google Fonts)
- **Corps :** `font-body` → Inter (Google Fonts)
- **Icônes :** Material Symbols Outlined (variable font Google Fonts)
  - Utilisation : `<span className="material-symbols-outlined">icon_name</span>`
  - Icônes confirmées : `hub`, `bolt`, `psychology`, `verified`, `shield_lock`, `check_circle`, `analytics`, `receipt_long`, `manage_accounts`, `campaign`, `inventory_2`, `arrow_forward`, `arrow_back`, `support_agent`, `chevron_right`, `progress_activity`, `close`, `delete`

### Animations (Framer Motion)
- **Durée :** 0.4s–0.6s — transitions rapides pour le côté "Kinetic"
- **Hero :** `staggerChildren: 0.12` → badge → titre → texte → boutons
- **Cartes :** `whileHover={{ scale: 1.02, y: -5, borderColor: '#ff8f73' }}`
- **Counters :** `useInView` + `useEffect` setInterval (AnimatedCounter.jsx)
- **Navbar :** `useScroll` + `useTransform` → blur 12px→24px sur 80px de scroll
- **Cursor :** dot (spring raide) + ring (spring souple) + `mix-blend-screen`
- **Pages légales :** `initial={{ opacity: 0, y: 20 }}` + `animate`

---

## Structure Frontend

### Pages (`resources/js/Pages/`)
```
Welcome.tsx              ← homepage (services: Service[] prop depuis Laravel)
SmeSolutions.tsx
Automation.tsx
Contact.tsx              ← formulaire avec honeypot + success state
Legal/
  Confidentialite.tsx
  Conditions.tsx
  MentionsLegales.tsx
Admin/
  Contacts/Index.tsx     ← table + slide-over + delete dialog
Services/Index.tsx       ← CRUD admin
```

### Composants (`resources/js/Components/`)
```
Navbar.tsx        ← scroll blur, usePage<PageProps>().url pour active state
Hero.tsx          ← stagger animation
Services.tsx      ← palette cyclique (primary/secondary/primary-fixed)
BentoGrid.tsx     ← AnimatedCounter intégré
Process.tsx
CTA.tsx           ← useForm + flash.lead_success
Footer.tsx        ← <Link> Inertia vers toutes les pages légales
AnimatedCounter.tsx
CursorFollower.tsx ← dot + ring, cursor: none sur la page
```

### Layouts (`resources/js/Layouts/`)
```
LegalLayout.tsx   ← Navbar + CursorFollower + bouton retour + typographie .legal-content
AuthenticatedLayout.tsx
```

### Flash messages
Partagés globalement via `HandleInertiaRequests::share()` :
- `flash.lead_success` → CTA.jsx
- `flash.contact_success` → Contact.jsx

---

## Modèles & Factory states

| Modèle | Champs notables |
|---|---|
| `Service` | title, description, icon, link, order (cast int) |
| `Lead` | email, status, ip_address |
| `Contact` | name, email, company (nullable), message, status |
| `User` | is_admin (bool, fillable) — `UserFactory::admin()` state |

---

## Anti-spam Honeypot
Champ `website` : `present|max:0` côté serveur. CSS-caché côté React (`position: absolute; left: -9999px`). Bloque les bots qui remplissent ET ceux qui omettent le champ.

---

## Dashboard Admin
Routes préfixées `/admin`, middleware `['auth', 'verified', 'admin']`, namespace `App\Http\Controllers\Admin`.
- `Admin\ContactController` : index, markAsRead, destroy
- `EnsureUserIsAdmin` : `abort(403)` si `!$request->user()?->is_admin`
- Interface : table hover, slide-over detail panel, delete confirmation dialog, auto-mark-as-read à l'ouverture (`router.patch`)

---

## Commandes utiles
```bash
./vendor/bin/pest                    # tous les tests
./vendor/bin/pest tests/Feature/Foo  # un fichier
npm run build                        # vérifier la compilation Vite
php artisan make:request FooRequest
php artisan make:action FooAction    # si le générateur est disponible
```

---

## Points de vigilance
- `email:rfc` uniquement (pas `dns`) — la résolution DNS échoue dans l'environnement de test
- Apostrophes dans les strings JSX/TSX : utiliser `"..."` si la chaîne contient `'`
- `Event::listen()` dans `AppServiceProvider::boot()` — pas d'EventServiceProvider séparé
- `foreignId()->constrained()` pour toutes les clés étrangères en migration
- Ne jamais utiliser `usePage<any>()` — toujours passer `PageProps` ou `PageProps<{...}>`
- `router` (Inertia) vs `useForm` : `router.patch/delete` pour les mutations sans form, `useForm` quand on gère `processing` + `errors`
- Les props de page Inertia sont **toujours** en snake_case côté PHP (`created_at`) → mapper en camelCase dans l'interface TypeScript si besoin de cohérence locale
- `children` dans les layouts : typer explicitement `children: React.ReactNode` dans l'interface Props du layout
