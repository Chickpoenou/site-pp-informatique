# PP Informatique - site e-commerce (Tâche 2, MIDEESSI Learn)

Site statique HTML / CSS / JavaScript, sans framework ni serveur.

## Pages
| Page | Rôle |
|---|---|
| `index.html` | Accueil : promesse, engagements, catégories, produits phares, parcours d'achat |
| `catalogue.html` | Catalogue : filtres par catégorie, budget, recherche, tri par prix |
| `produit.html?id=N` | Fiche produit : description, prix, quantité, ajout au panier, produits similaires |
| `panier.html` | Panier : quantité +/−, suppression, total FCFA, formulaire de commande (WhatsApp) |
| `contact.html` | Coordonnées et message WhatsApp |

## Fichiers JavaScript (ordre de chargement important)
1. `js/produits.js` : catalogue (4 catégories, 14 produits, prix en FCFA), la seule source de données.
2. `js/panier.js` : logique du panier, sauvegardé dans `localStorage` (il reste après rechargement).
3. `js/app.js` : affichage des pages, filtres, fiche produit, page panier, commande WhatsApp.

## Points testés
- Affichage à 360, 768 et 1280 px sans défilement horizontal.
- Panier : ajout, modification de la quantité, suppression, total en FCFA, conservation après rechargement.

## Maquette (Tâche 1)
- Lien Canva : https://canva.link/d6n1z1t87uyznzn
- Export PDF : `maquette/Maquette_PP_Informatique.pdf` (4 écrans en mobile 360 px et ordinateur 1440 px)

## Mise en ligne (gratuite)
- **Netlify** : glisser-déposer le dossier `site-pp-informatique` sur https://app.netlify.com/drop
- **GitHub Pages** : pousser le dossier dans un dépôt, puis Settings > Pages > branche `main`, dossier `/ (root)`.

## À compléter
- Remplacer le logo texte « PP Informatique » par le vrai logo du client (fichier dans `images/`).
- Adresse et horaires de la boutique (page contact).

## Sources des images
Photos libres de droits issues d'Unsplash (licence : https://unsplash.com/license, usage commercial autorisé,
crédit non obligatoire). Elles ne sont pas créditées sur le site ; les sources sont listées ici.
Ce sont des photos d'illustration, pas les produits réels de la boutique.

| Produit | Nom | Photographe | Page de la photo |
|---|---|---|---|
| 1 | Portable bureautique 15,6" - 8 Go / 256 Go SSD | Erick Cerritos | https://unsplash.com/photos/ordinateur-portable-dell-sur-surface-blanche-i5UV2HpITYA |
| 2 | Portable 14" - 8 Go / 512 Go SSD | Dell | https://unsplash.com/photos/ordinateur-portable-sur-table-blanche-Gi3iUJ1FwxI |
| 3 | Portable 15,6" - 16 Go / 512 Go SSD | Ricardo Resende | https://unsplash.com/photos/un-ordinateur-portable-pose-sur-un-bureau-en-bois-bf2ZA4oB8-M |
| 4 | Unité centrale de bureau - 8 Go / 500 Go SSD | Anthony Roberts | https://unsplash.com/photos/une-tour-dordinateur-avec-un-ecran-noir-fMbiAi0rbkA |
| 5 | Écran 22" Full HD | Ryan Yao | https://unsplash.com/photos/black-flat-screen-computer-monitor-keyboard-speakers-mouse-on-desk-BDvCewlnbD8 |
| 6 | Écran 24" Full HD IPS | Sebastian Bednarek | https://unsplash.com/photos/espace-de-travail-informatique-avec-clavier-et-manettes-x2Z0uNj-Quo |
| 7 | Imprimante jet d'encre multifonction | FilterGrade | https://unsplash.com/photos/imprimante-canon-noire-sur-table-en-bois-marron-oPyAcpkQch0 |
| 8 | Imprimante laser monochrome | Mahrous Houses | https://unsplash.com/photos/imprimante-hp-tout-en-un-blanc-et-gris-5AoOejjRUrA |
| 9 | Antivirus - licence 1 poste, 1 an | FlyD | https://unsplash.com/photos/cadenas-rouge-sur-clavier-dordinateur-noir-mT7lXZPjk7U |
| 10 | Antivirus - licence 3 postes, 1 an | Dan Nelson | https://unsplash.com/photos/personne-utilisant-macbook-pro-sur-une-table-blanche-AvSFPw5Tp68 |
| 11 | Souris sans fil | JL Cabrera | https://unsplash.com/photos/une-souris-dordinateur-noire-Q-jxVqz0wVQ |
| 12 | Clavier AZERTY USB | Clay Banks | https://unsplash.com/photos/clavier-dordinateur-argent-et-blanc-PXaQXThG1FY |
| 13 | Chargeur universel pour portable 90 W | Auguras Pipiras | https://unsplash.com/photos/macbook-apple-blanc-sur-surface-noire-4xnucLdUPtA |
| 14 | Sac à dos pour portable 15,6" | Cyberbackpack.com | https://unsplash.com/photos/un-boitier-dordinateur-noir-B_BVXEQsGog |
| Accueil | Photo principale | Jass Hernandez | https://unsplash.com/photos/un-homme-utilise-un-ordinateur-portable-sur-une-table-IxbNrHCYXm0 |
