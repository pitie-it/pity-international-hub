# Retrait de l’emploi et actualisation automatique

## Résultat attendu
- Supprimer la page Emploi, son lien dans les menus et sa gestion dans l’espace d’administration.
- Retirer les contenus de recrutement visibles dans les actualités.
- Garder les pages publiques reliées aux textes, témoignages et coordonnées enregistrés.
- Actualiser automatiquement ces contenus à intervalles réguliers, au retour sur la page et après une reconnexion réseau.

## Mise en œuvre
- Retirer la route `/emploi` et toutes ses références visibles.
- Simplifier les données et fonctions de contenu pour ne plus charger les offres d’emploi.
- Régler la synchronisation des contenus publics avec un rafraîchissement périodique en arrière-plan.
- Vérifier l’accueil, la navigation, les actualités, le contact et l’administration sur ordinateur et mobile.

## Limite
- La table historique des offres restera archivée dans la base, mais ne sera plus chargée ni accessible depuis le site.
