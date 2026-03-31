import { Head } from '@inertiajs/react';
import LegalLayout from '@/Layouts/LegalLayout';

export default function Conditions() {
    return (
        <LegalLayout title="Conditions Générales de Vente & d'Utilisation" lastUpdated="1er janvier 2025">
            <Head title="CGV & CGU | KINETIC AI" />

            <p>
                Les présentes Conditions Générales de Vente et d'Utilisation (ci-après « CGV/CGU ») régissent
                l'accès au site <strong>kineticai.fr</strong> et la fourniture des services proposés par{' '}
                <strong>Kinetic Monolith</strong> aux entreprises clientes (ci-après « le Client »).
            </p>

            <h2>1. Objet</h2>
            <p>
                Kinetic Monolith propose des services d'automatisation et d'intégration de l'intelligence
                artificielle destinés aux PME françaises : audit de processus, déploiement de workflows
                automatisés, formation et maintenance.
            </p>

            <h2>2. Acceptation</h2>
            <p>
                Toute demande de devis, signature de bon de commande ou utilisation des services implique
                l'acceptation sans réserve des présentes CGV/CGU. Ces conditions prévalent sur tout document
                émanant du Client.
            </p>

            <h2>3. Accès au site</h2>
            <p>
                L'accès au site <strong>kineticai.fr</strong> est gratuit. Kinetic Monolith se réserve le
                droit de suspendre, modifier ou interrompre l'accès au site à tout moment, sans préavis ni
                indemnité.
            </p>
            <p>
                L'utilisateur s'engage à ne pas utiliser le site à des fins illicites ou portant atteinte aux
                droits de tiers, et à ne pas tenter d'accéder à des ressources non autorisées.
            </p>

            <h2>4. Prestations et devis</h2>
            <ul>
                <li>Toute prestation fait l'objet d'un devis détaillé, valable <strong>30 jours</strong>.</li>
                <li>Les prestations sont confirmées par la signature du devis ou d'un bon de commande.</li>
                <li>
                    Les délais indiqués sont estimatifs ; Kinetic Monolith ne saurait être tenu responsable
                    de retards liés à des causes extérieures (accès aux systèmes Client, force majeure).
                </li>
            </ul>

            <h2>5. Tarifs et paiement</h2>
            <ul>
                <li>Les prix sont exprimés en euros HT. La TVA applicable est ajoutée sur la facture.</li>
                <li>Sauf accord contraire, les factures sont payables à <strong>30 jours</strong> net.</li>
                <li>
                    Tout retard de paiement entraîne des pénalités au taux légal en vigueur majoré de 5
                    points, ainsi qu'une indemnité forfaitaire de recouvrement de 40 €.
                </li>
            </ul>

            <h2>6. Propriété intellectuelle</h2>
            <p>
                Les livrables spécifiquement développés pour le Client deviennent sa propriété après complet
                paiement. Les outils, frameworks et composants génériques développés par Kinetic Monolith
                restent sa propriété exclusive. Kinetic Monolith conserve le droit de mentionner le Client
                dans ses références commerciales, sauf refus exprès.
            </p>

            <h2>7. Données et IA — engagements spécifiques</h2>
            <p>
                <strong>
                    Kinetic Monolith s'engage formellement à ne jamais utiliser les données du Client pour
                    entraîner, affiner ou enrichir des modèles d'intelligence artificielle tiers.
                </strong>{' '}
                Les données traitées dans le cadre d'une mission restent la propriété exclusive du Client et
                sont supprimées des systèmes Kinetic Monolith au terme de la prestation, sauf obligation
                légale de conservation.
            </p>

            <h2>8. Responsabilité</h2>
            <p>
                La responsabilité de Kinetic Monolith est limitée au montant des sommes effectivement perçues
                au titre de la prestation concernée. Kinetic Monolith ne saurait être tenu responsable des
                dommages indirects (perte de chiffre d'affaires, perte de données, atteinte à l'image).
            </p>

            <h2>9. Résiliation</h2>
            <p>
                En cas de manquement grave non réparé dans les <strong>15 jours</strong> suivant une mise en
                demeure, chaque partie peut résilier le contrat de plein droit. Les prestations réalisées
                restent dues.
            </p>

            <h2>10. Droit applicable et litiges</h2>
            <p>
                Les présentes CGV/CGU sont soumises au <strong>droit français</strong>. En cas de litige, les
                parties s'engagent à rechercher une solution amiable avant toute action judiciaire. À défaut,
                le tribunal compétent sera celui du siège social de Kinetic Monolith.
            </p>
        </LegalLayout>
    );
}
