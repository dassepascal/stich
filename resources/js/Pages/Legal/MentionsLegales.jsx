import { Head } from '@inertiajs/react';
import LegalLayout from '@/Layouts/LegalLayout';

export default function MentionsLegales() {
    return (
        <LegalLayout title="Mentions Légales" lastUpdated="1er janvier 2025">
            <Head title="Mentions Légales | KINETIC AI" />

            <p>
                Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la Confiance en
                l'Économie Numérique (LCEN), les présentes mentions légales s'appliquent au site{' '}
                <strong>kineticai.fr</strong>.
            </p>

            <h2>1. Éditeur du site</h2>
            <ul>
                <li><strong>Raison sociale :</strong> Kinetic Monolith</li>
                <li><strong>Forme juridique :</strong> SAS (Société par Actions Simplifiée)</li>
                <li><strong>Siège social :</strong> France</li>
                <li><strong>Capital social :</strong> 10 000 €</li>
                <li><strong>SIRET :</strong> [en cours d'immatriculation]</li>
                <li><strong>RCS :</strong> [en cours]</li>
                <li>
                    <strong>Contact :</strong>{' '}
                    <a href="mailto:contact@kineticai.fr">contact@kineticai.fr</a>
                </li>
                <li><strong>Directeur de la publication :</strong> Le représentant légal de Kinetic Monolith</li>
            </ul>

            <h2>2. Hébergement</h2>
            <ul>
                <li><strong>Hébergeur :</strong> OVHcloud</li>
                <li><strong>Adresse :</strong> 2 rue Kellermann, 59100 Roubaix, France</li>
                <li><strong>Site :</strong> <a href="https://www.ovhcloud.com" target="_blank" rel="noreferrer">www.ovhcloud.com</a></li>
            </ul>
            <p>
                Les serveurs hébergeant le site et les données sont situés dans l'<strong>Union Européenne</strong>.
            </p>

            <h2>3. Propriété intellectuelle</h2>
            <p>
                L'ensemble du contenu de ce site (textes, images, graphismes, logo, icônes, sons, logiciels)
                est la propriété exclusive de <strong>Kinetic Monolith</strong> ou de ses partenaires, et est
                protégé par les lois françaises et internationales relatives à la propriété intellectuelle.
            </p>
            <p>
                Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie
                des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans
                autorisation écrite préalable de Kinetic Monolith.
            </p>

            <h2>4. Technologies utilisées</h2>
            <p>Ce site utilise des technologies open source :</p>
            <ul>
                <li><strong>Laravel</strong> — framework PHP (licence MIT)</li>
                <li><strong>React</strong> — bibliothèque JavaScript (licence MIT)</li>
                <li><strong>Inertia.js</strong> — stack SPA (licence MIT)</li>
                <li><strong>Framer Motion</strong> — animations (licence MIT)</li>
                <li><strong>Tailwind CSS</strong> — framework CSS (licence MIT)</li>
            </ul>
            <p>Aucun cookie de traçage publicitaire n'est utilisé sur ce site.</p>

            <h2>5. Limitation de responsabilité</h2>
            <p>
                Kinetic Monolith s'efforce de maintenir les informations publiées sur ce site à jour et
                exactes. Toutefois, la société ne saurait garantir l'exactitude, la complétude ou
                l'actualité des informations diffusées et décline toute responsabilité pour les erreurs,
                omissions ou résultats obtenus par un usage inadapté de ces informations.
            </p>
            <p>
                Kinetic Monolith ne saurait être tenue responsable de dommages directs ou indirects résultant
                de l'accès ou de l'utilisation du site, y compris l'inaccessibilité, les pertes de données
                ou l'introduction de virus.
            </p>

            <h2>6. Liens hypertextes</h2>
            <p>
                Ce site peut contenir des liens vers des sites tiers. Kinetic Monolith n'exerce aucun
                contrôle sur ces sites et décline toute responsabilité quant à leur contenu ou leurs
                pratiques en matière de confidentialité.
            </p>

            <h2>7. Droit applicable</h2>
            <p>
                Les présentes mentions légales sont régies par le <strong>droit français</strong>. En cas de
                litige, les tribunaux français seront seuls compétents.
            </p>
        </LegalLayout>
    );
}
