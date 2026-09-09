# Espace d'administration du site

Objectif : une page privée où vous modifiez vous-même les textes, les témoignages, les offres d'emploi et les coordonnées, sans toucher au code. Les changements apparaissent immédiatement sur le site public.

## Ce que vous pourrez faire

1. **Se connecter** sur une page `/admin` protégée par e-mail + mot de passe (un seul compte administrateur, que je crée avec vos identifiants).
2. **Textes des pages** : modifier les titres et paragraphes principaux de l'accueil, À propos, Programmes, Impact, Zones d'intervention, Agir et Contact.
3. **Témoignages** : ajouter, modifier, supprimer et réordonner des citations (texte, nom, fonction/lieu). Une section témoignages sera affichée sur l'accueil.
4. **Offres d'emploi** : créer, modifier, publier/dépublier et supprimer des postes (titre, type, lieu, département, date limite, résumé, missions, profil).
5. **Coordonnées** : e-mail, téléphones, WhatsApp, adresse, devise et liens réseaux sociaux — repris automatiquement dans l'en-tête, le pied de page et la page Contact.

Les photos ne sont pas encore modifiables depuis l'administration (choix retenu : plus tard). Elles restent celles du site.

## Fonctionnement

- Activation de Lovable Cloud pour stocker les contenus et gérer la connexion.
- Le site public lit les contenus enregistrés ; si aucun contenu n'a encore été saisi, il affiche les textes actuels du site comme valeurs de départ (les contenus existants seront pré-remplis à la création).
- Chaque section de l'administration a un formulaire simple avec bouton « Enregistrer » et un message de confirmation.

## Détails techniques

- Tables : `site_texts` (clé/valeur par page), `testimonials`, `job_offers`, `site_settings` (coordonnées, ligne unique), plus `user_roles` + fonction `has_role` pour le rôle `admin`.
- RLS : lecture publique `TO anon/authenticated` sur les contenus publiés ; écriture réservée aux administrateurs via `has_role(auth.uid(),'admin')`. GRANTs explicites sur chaque table.
- Migration initiale contenant le schéma et les INSERT des contenus actuels (`src/lib/site-data.ts` : offres d'emploi, coordonnées, textes de pages) pour que l'admin ne démarre pas vide.
- Lecture publique via `createServerFn` avec client publishable côté serveur ; écritures via `createServerFn` protégées par `requireSupabaseAuth` + vérification du rôle admin.
- Routes : `/auth` (connexion) publique, et l'administration sous `src/routes/_authenticated/admin/*` avec onglets Textes / Témoignages / Emplois / Coordonnées.
- Les pages publiques (accueil, emploi, contact, footer, header) liront les données du serveur avec repli sur les constantes actuelles.

## Ce dont j'ai besoin de vous

L'adresse e-mail à utiliser pour le compte administrateur (le mot de passe pourra être défini par vous à la première connexion).
