# Site X-IA — version 1 (bilingue FR / EN)

Site statique (Eleventy) avec un petit CMS (Decap CMS) et un formulaire de contact (Netlify Forms).
Hébergement prévu : Netlify. Aucune base de données, aucun serveur à maintenir.

## Ce que contient le site

Une seule page par langue, avec cinq zones :

1. Accueil : X-IA en quelques mots, quatre chiffres clés
2. Qui sommes-nous : la vocation « No bullshit », la mission, la fiche d'identité
3. Nos événements : une carte par événement (visuel, description, intervenants, lien YouTube)
4. Ils soutiennent notre action : grille de logos
5. Contacts : « Comment nous rejoindre ? » (anciens de l'X) et formulaire de contact

Le français est à la racine (`/`), l'anglais sous `/en/`. Le bouton FR / EN garde la rubrique en cours.

## Mettre en ligne (une fois)

1. Déposer ce dossier dans un dépôt GitHub (ou GitLab / Bitbucket).
2. Sur Netlify : « Add new site » > « Import an existing project », choisir le dépôt.
   Les réglages de build sont déjà dans `netlify.toml` (commande `npm run build`, dossier `_site`).
3. Formulaire : Netlify le détecte tout seul au premier déploiement.
   Pour recevoir les messages par e-mail : Site configuration > Forms > Form notifications > Add notification > Email.
4. CMS : Site configuration > Identity > Enable Identity, puis dans Identity > Registration choisir « Invite only ».
   Dans la même page, activer Git Gateway (Services > Git Gateway > Enable).
5. Inviter les éditeurs : Identity > Invite users. La personne reçoit un e-mail, crée son mot de passe,
   puis se connecte sur `https://votre-site.netlify.app/admin/`.

## Modifier le site

### Avec le CMS (/admin)

- Événements : une fiche par événement. Les champs sont : numéro, date, horaires, lieu, visuel,
  titre et description en français et en anglais, intervenants (nom + précision), lien YouTube.
  Ajouter une fiche suffit, le site range les événements du plus récent au plus ancien. Les six plus récents sont
  affichés, les autres sont rangés dans « Événements précédents ».
- Ils soutiennent notre action : ajouter une entreprise, son logo et son lien. Sans logo, le nom s'affiche en lettres.
- Textes du site : tous les textes, en français et en anglais.
- Réglages : logo, e-mail de contact, liens YouTube, LinkedIn et AX.

Chaque enregistrement crée une modification dans le dépôt, et Netlify republie le site en une minute environ.

### À la main

- Un événement = un fichier dans `src/events/`. Copier un fichier existant, changer les valeurs entre les `---`.
  Le nom conseillé est `NUMERO-titre.md` (ex. `32-agents-2.md`).
- Les visuels vont dans `src/assets/img/events/` (format conseillé 3:1, par exemple 1100 × 367 px, en JPG).
- Les logos des soutiens vont dans `src/assets/img/supporters/` (PNG ou SVG, fond transparent, de préférence en couleur neutre ou en noir).
- Les textes sont dans `src/_data/i18n/fr.yaml` et `en.yaml`.
- Les soutiens sont dans `src/_data/supporters.yaml`, les réglages communs dans `src/_data/site.yaml`.

### Tester sur son ordinateur

    npm install
    npm start            # http://localhost:8080

Pour tester le CMS en local : décommenter `local_backend: true` dans `admin/config.yml`, lancer `npx decap-server`
dans un second terminal, puis ouvrir `http://localhost:8080/admin/`.

## Structure

    admin/                CMS (index.html + config.yml)
    src/_data/            textes (i18n), soutiens, réglages
    src/_includes/        gabarits (base, accueil, cartes d'événement)
    src/events/           une fiche .md par événement
    src/assets/           CSS, JS, polices (hébergées localement), images
    src/index.njk         page française
    src/en/index.njk      page anglaise
    netlify.toml          réglages de build

## Choix techniques

- Polices hébergées sur le site (pas de Google Fonts) : pas de transfert de données vers un tiers, donc plus simple côté RGPD.
- Pas de cookies, pas d'outil de mesure d'audience.
- Le widget Netlify Identity n'est chargé que pour les invitations au CMS.
