import { Head } from '@inertiajs/react';
import LegalLayout from '@/Layouts/LegalLayout';

export default function Confidentialite() {
    return (
        <LegalLayout title="Politique de Confidentialité" lastUpdated="1er janvier 2025">
            <Head title="Politique de Confidentialité | KINETIC AI" />

            <p>
                Kinetic Monolith (ci-après « nous », « notre société ») accorde une importance primordiale à la
                protection de vos données personnelles. La présente politique décrit quelles données nous
                collectons, pourquoi, et comment nous les protégeons, conformément au{' '}
                <strong>Règlement Général sur la Protection des Données (RGPD – UE 2016/679)</strong>.
            </p>

            <h2>1. Responsable du traitement</h2>
            <p>
                Le responsable du traitement est <strong>Kinetic Monolith</strong>, société française dont le
                siège social est situé en France. Pour toute question relative à vos données personnelles,
                contactez-nous à : <a href="mailto:privacy@kineticai.fr">privacy@kineticai.fr</a>
            </p>

            <h2>2. Données collectées</h2>
            <p>Nous collectons uniquement les données strictement nécessaires à nos services :</p>
            <ul>
                <li>
                    <strong>Formulaire de contact :</strong> nom, adresse e-mail, nom d'entreprise (optionnel),
                    message.
                </li>
                <li>
                    <strong>Formulaire de capture d'intérêt :</strong> adresse e-mail uniquement.
                </li>
                <li>
                    <strong>Données techniques :</strong> adresse IP (pseudonymisée), horodatage des
                    soumissions — à des fins de sécurité et de lutte contre le spam.
                </li>
            </ul>
            <p>Nous ne collectons <strong>aucune donnée de navigation</strong> (cookies de traçage, pixels).</p>

            <h2>3. Finalités et bases légales</h2>
            <ul>
                <li>
                    <strong>Traitement de vos demandes :</strong> intérêt légitime (art. 6.1.f RGPD).
                </li>
                <li>
                    <strong>Envoi de communications commerciales :</strong> consentement explicite (art. 6.1.a
                    RGPD) — vous pouvez vous désabonner à tout moment.
                </li>
                <li>
                    <strong>Sécurité :</strong> intérêt légitime — prévention de la fraude et du spam.
                </li>
            </ul>

            <h2>4. Non-revente et non-cession des données</h2>
            <p>
                <strong>
                    Kinetic Monolith ne vend, ne loue et ne cède jamais vos données personnelles à des tiers à
                    des fins commerciales.
                </strong>{' '}
                Vos données ne sont en aucun cas utilisées pour entraîner des modèles d'intelligence
                artificielle tiers ou constituer des jeux de données (datasets) revendus.
            </p>

            <h2>5. Hébergement et transferts</h2>
            <p>
                Vos données sont hébergées sur des serveurs situés dans l'<strong>Union Européenne</strong>.
                Aucun transfert vers un pays tiers n'est effectué sans garanties adéquates (clauses
                contractuelles types de la Commission européenne).
            </p>

            <h2>6. Durée de conservation</h2>
            <ul>
                <li>Messages de contact : <strong>3 ans</strong> à compter de la dernière interaction.</li>
                <li>Adresses e-mail (intérêt commercial) : jusqu'au désabonnement ou <strong>2 ans</strong> d'inactivité.</li>
                <li>Logs de sécurité (IP) : <strong>12 mois</strong>.</li>
            </ul>

            <h2>7. Vos droits</h2>
            <p>Conformément au RGPD, vous disposez des droits suivants :</p>
            <ul>
                <li><strong>Droit d'accès</strong> — obtenir une copie de vos données.</li>
                <li><strong>Droit de rectification</strong> — corriger des données inexactes.</li>
                <li><strong>Droit à l'effacement</strong> — demander la suppression de vos données.</li>
                <li><strong>Droit à la portabilité</strong> — recevoir vos données dans un format structuré.</li>
                <li><strong>Droit d'opposition</strong> — vous opposer à un traitement basé sur l'intérêt légitime.</li>
            </ul>
            <p>
                Pour exercer vos droits, contactez-nous à{' '}
                <a href="mailto:privacy@kineticai.fr">privacy@kineticai.fr</a>. Vous pouvez également
                introduire une réclamation auprès de la <strong>CNIL</strong> (
                <a href="https://www.cnil.fr" target="_blank" rel="noreferrer">www.cnil.fr</a>).
            </p>

            <h2>8. Sécurité</h2>
            <p>
                Nous mettons en œuvre des mesures techniques et organisationnelles appropriées : chiffrement
                TLS en transit, accès restreint aux données, surveillance continue des accès. En cas de
                violation de données, nous notifierons la CNIL dans les 72 heures et les personnes concernées
                sans délai injustifié.
            </p>
        </LegalLayout>
    );
}
