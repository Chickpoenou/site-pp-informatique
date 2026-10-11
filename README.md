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

## Mise en ligne (gratuite)
- **Netlify** : glisser-déposer le dossier `site-pp-informatique` sur https://app.netlify.com/drop
- **GitHub Pages** : pousser le dossier dans un dépôt, puis Settings > Pages > branche `main`, dossier `/ (root)`.

## À compléter
- Remplacer le logo texte « PP Informatique » par le vrai logo du client (fichier dans `images/`).
- Adresse et horaires de la boutique (page contact).
- Photos : si vous ajoutez des photos Unsplash ou Pexels, renseignez `image` dans `produits.js` et citez la source dans le pied de page.
