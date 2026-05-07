<x-mail::message>
# Bienvenue dans la newsletter KINETIC AI

Merci de vous être abonné(e) à la newsletter **KINETIC AI**.

Vous recevrez désormais nos derniers articles, nos insights sur l'IA appliquée et nos conseils pour automatiser votre PME.

<x-mail::button :url="config('app.url') . '/blog'" color="primary">
Lire nos derniers articles
</x-mail::button>

À très bientôt,
**L'équipe KINETIC AI**

---
*Vous recevez cet email car vous vous êtes inscrit(e) sur {{ config('app.url') }}.
Pour vous désabonner, répondez à cet email.*
</x-mail::message>
