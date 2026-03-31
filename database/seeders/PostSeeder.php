<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Post;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    public function run(): void
    {
        Post::firstOrCreate(
            ['slug' => 'ia-pas-un-gadget'],
            [
                'title'        => "L'IA n'est pas un gadget",
                'excerpt'      => "L'intelligence artificielle est souvent perçue comme une tendance passagère. Voici pourquoi c'est une erreur stratégique majeure pour les entreprises qui n'agissent pas maintenant.",
                'cover_image'  => 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
                'is_published' => true,
                'published_at' => now(),
                'content'      => <<<HTML
<h2>L'IA n'est pas une mode, c'est un levier de compétitivité</h2>
<p>Depuis quelques années, l'intelligence artificielle s'est imposée dans tous les discours. Conférences, médias, réseaux sociaux — le mot est partout. Et pourtant, beaucoup d'entreprises la traitent encore comme un gadget technologique, une curiosité à tester puis à ranger dans un tiroir.</p>
<p>C'est une erreur stratégique. Et elle peut coûter cher.</p>

<h2>Ce que l'IA fait concrètement pour une entreprise</h2>
<p>L'IA ne remplace pas les humains. Elle amplifie ce qu'ils font de mieux. Concrètement, elle permet de :</p>
<ul>
<li><strong>Automatiser les tâches répétitives</strong> — traitement de documents, réponses aux demandes courantes, saisie de données.</li>
<li><strong>Analyser des volumes d'informations inaccessibles à l'œil humain</strong> — tendances clients, signaux faibles, anomalies dans vos flux.</li>
<li><strong>Personnaliser l'expérience à grande échelle</strong> — communications, offres, accompagnement client.</li>
<li><strong>Prendre de meilleures décisions, plus vite</strong> — grâce à des tableaux de bord augmentés et des prévisions fiables.</li>
</ul>

<h2>Le vrai risque : l'inaction</h2>
<p>Le danger ne vient pas de l'IA elle-même. Il vient du décalage qui se creuse entre ceux qui l'intègrent aujourd'hui et ceux qui attendent de voir. Dans deux ans, ce fossé sera difficile à combler.</p>
<blockquote>« Les entreprises qui n'adoptent pas l'IA maintenant ne seront pas en retard. Elles seront hors course. »</blockquote>
<p>Ce n'est pas une question de taille d'entreprise. Les PME ont autant à gagner que les grands groupes — souvent plus, car chaque gain d'efficacité a un impact proportionnellement plus fort.</p>

<h2>Par où commencer ?</h2>
<p>La bonne question n'est pas <em>« Faut-il faire de l'IA ? »</em> mais <em>« Quel problème concret puis-je résoudre avec l'IA cette année ? »</em></p>
<p>Commencez petit. Identifiez une tâche chronophage, un goulot d'étranglement dans votre activité, une donnée que vous collectez mais n'exploitez pas. C'est là que l'IA crée de la valeur immédiate.</p>
<p>Chez <strong>KINETIC AI</strong>, nous aidons les entreprises à franchir ce premier pas sans jargon technique ni projet interminable. Un diagnostic, une solution ciblée, des résultats mesurables.</p>

<h2>Conclusion</h2>
<p>L'IA n'est pas un gadget. Ce n'est pas non plus une baguette magique. C'est un outil — puissant, accessible, et déjà en train de remodeler les marchés. La vraie question, c'est de quel côté de cette transformation vous voulez être.</p>
HTML,
            ]
        );
    }
}
