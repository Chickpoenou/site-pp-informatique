// produits.js - données du catalogue (source UNIQUE pour tout le site)
// Catalogue fictif mais réaliste : prix indicatifs en FCFA, fourchettes observées
// sur le marché béninois (boutiques de Cotonou, annonces en ligne).
// Le même catalogue doit apparaître dans la maquette Canva et dans le devis.

// Les 4 catégories du site
const CATEGORIES = [
  { id: "portables",    nom: "Ordinateurs portables",       visuel: "portable",
    accroche: "Pour les études, le bureau et le télétravail." },
  { id: "postes-fixes", nom: "Unités centrales et écrans",  visuel: "ecran",
    accroche: "Postes de travail fixes pour la maison ou le commerce." },
  { id: "imprimantes",  nom: "Imprimantes et logiciels",    visuel: "imprimante",
    accroche: "Imprimer, numériser et protéger vos ordinateurs." },
  { id: "accessoires",  nom: "Accessoires",                 visuel: "souris",
    accroche: "Souris, claviers, chargeurs et sacs." }
];

// Les fourchettes de prix proposées dans le filtre (en FCFA)
const FOURCHETTES_PRIX = [
  { id: "tous", nom: "Tous les prix",      min: 0,      max: Infinity },
  { id: "p1",   nom: "Moins de 50 000",    min: 0,      max: 49999 },
  { id: "p2",   nom: "50 000 à 150 000",   min: 50000,  max: 150000 },
  { id: "p3",   nom: "150 001 à 300 000",  min: 150001, max: 300000 },
  { id: "p4",   nom: "Plus de 300 000",    min: 300001, max: Infinity }
];

// Les 14 produits.
// "visuel" : nom de l'illustration dessinée en SVG (voir ICONES dans app.js).
// "image"  : photo libre de droits (licence Unsplash : usage commercial autorisé, sans obligation de crédit).
//            Elle est chargée depuis le serveur d'Unsplash ; w=800&h=600&fit=crop la recadre en 4:3.
//            Si l'image ne se charge pas, l'illustration SVG "visuel" est affichée à la place.
// "credit" : auteur et page de la photo, affichés sous la photo sur la fiche produit (par respect de l'auteur).
// "phare"  : true = produit mis en avant sur la page d'accueil.
const PRODUITS = [
  { id: 1,  nom: "Portable bureautique 15,6\" - 8 Go / 256 Go SSD", categorie: "portables",
    prix: 215000, visuel: "portable", image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&h=600&fit=crop&auto=format&q=75",
    credit: { auteur: "Erick Cerritos", lien: "https://unsplash.com/photos/ordinateur-portable-dell-sur-surface-blanche-i5UV2HpITYA" }, phare: true,
    description: "Portable d'entrée de gamme pour les cours, la bureautique et internet. Écran 15,6 pouces, 8 Go de mémoire, disque SSD de 256 Go." },
  { id: 2,  nom: "Portable 14\" - 8 Go / 512 Go SSD", categorie: "portables",
    prix: 285000, visuel: "portable", image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=800&h=600&fit=crop&auto=format&q=75",
    credit: { auteur: "Dell", lien: "https://unsplash.com/photos/ordinateur-portable-sur-table-blanche-Gi3iUJ1FwxI" }, phare: false,
    description: "Portable léger de 14 pouces, pratique à transporter. 8 Go de mémoire et SSD de 512 Go pour plus de rapidité." },
  { id: 3,  nom: "Portable 15,6\" - 16 Go / 512 Go SSD", categorie: "portables",
    prix: 390000, visuel: "portable", image: "https://images.unsplash.com/photo-1648197395199-e7f8d3dd0a3c?w=800&h=600&fit=crop&auto=format&q=75",
    credit: { auteur: "Ricardo Resende", lien: "https://unsplash.com/photos/un-ordinateur-portable-pose-sur-un-bureau-en-bois-bf2ZA4oB8-M" }, phare: false,
    description: "Portable plus puissant pour travailler sur plusieurs logiciels à la fois : 16 Go de mémoire et SSD de 512 Go." },

  { id: 4,  nom: "Unité centrale de bureau - 8 Go / 500 Go SSD", categorie: "postes-fixes",
    prix: 175000, visuel: "unite-centrale", image: "https://images.unsplash.com/photo-1660855551550-2696677aaf28?w=800&h=600&fit=crop&auto=format&q=75",
    credit: { auteur: "Anthony Roberts", lien: "https://unsplash.com/photos/une-tour-dordinateur-avec-un-ecran-noir-fMbiAi0rbkA" }, phare: true,
    description: "Ordinateur de bureau pour la maison ou le petit commerce. Écran, clavier et souris vendus séparément." },
  { id: 5,  nom: "Écran 22\" Full HD", categorie: "postes-fixes",
    prix: 65000, visuel: "ecran", image: "https://images.unsplash.com/photo-1517518295033-d5ab8ca078cc?w=800&h=600&fit=crop&auto=format&q=75",
    credit: { auteur: "Ryan Yao", lien: "https://unsplash.com/photos/black-flat-screen-computer-monitor-keyboard-speakers-mouse-on-desk-BDvCewlnbD8" }, phare: false,
    description: "Écran de 22 pouces en Full HD (1920 x 1080), prises HDMI et VGA." },
  { id: 6,  nom: "Écran 24\" Full HD IPS", categorie: "postes-fixes",
    prix: 95000, visuel: "ecran", image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=800&h=600&fit=crop&auto=format&q=75",
    credit: { auteur: "Sebastian Bednarek", lien: "https://unsplash.com/photos/espace-de-travail-informatique-avec-clavier-et-manettes-x2Z0uNj-Quo" }, phare: false,
    description: "Écran de 24 pouces à dalle IPS : couleurs fidèles et grands angles de vision." },

  { id: 7,  nom: "Imprimante jet d'encre multifonction", categorie: "imprimantes",
    prix: 78000, visuel: "imprimante", image: "https://images.unsplash.com/photo-1625961332771-3f40b0e2bdcf?w=800&h=600&fit=crop&auto=format&q=75",
    credit: { auteur: "FilterGrade", lien: "https://unsplash.com/photos/imprimante-canon-noire-sur-table-en-bois-marron-oPyAcpkQch0" }, phare: true,
    description: "Imprime, copie et numérise en couleur. Adaptée à un usage personnel ou scolaire." },
  { id: 8,  nom: "Imprimante laser monochrome", categorie: "imprimantes",
    prix: 120000, visuel: "imprimante", image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800&h=600&fit=crop&auto=format&q=75",
    credit: { auteur: "Mahrous Houses", lien: "https://unsplash.com/photos/imprimante-hp-tout-en-un-blanc-et-gris-5AoOejjRUrA" }, phare: false,
    description: "Impression rapide en noir et blanc, économique pour de gros volumes de documents." },
  { id: 9,  nom: "Antivirus - licence 1 poste, 1 an", categorie: "imprimantes",
    prix: 12000, visuel: "bouclier", image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&h=600&fit=crop&auto=format&q=75",
    credit: { auteur: "FlyD", lien: "https://unsplash.com/photos/cadenas-rouge-sur-clavier-dordinateur-noir-mT7lXZPjk7U" }, phare: false,
    description: "Licence physique (carte) à activer sur un ordinateur. Protection contre les virus pendant un an." },
  { id: 10, nom: "Antivirus - licence 3 postes, 1 an", categorie: "imprimantes",
    prix: 25000, visuel: "bouclier", image: "https://images.unsplash.com/photo-1590065707046-4fde65275b2e?w=800&h=600&fit=crop&auto=format&q=75",
    credit: { auteur: "Dan Nelson", lien: "https://unsplash.com/photos/personne-utilisant-macbook-pro-sur-une-table-blanche-AvSFPw5Tp68" }, phare: false,
    description: "Une seule licence pour protéger 3 ordinateurs pendant un an. Idéale pour une famille ou un petit bureau." },

  { id: 11, nom: "Souris sans fil", categorie: "accessoires",
    prix: 4500, visuel: "souris", image: "https://images.unsplash.com/photo-1658070429465-848c0796abf3?w=800&h=600&fit=crop&auto=format&q=75",
    credit: { auteur: "JL Cabrera", lien: "https://unsplash.com/photos/une-souris-dordinateur-noire-Q-jxVqz0wVQ" }, phare: true,
    description: "Souris sans fil avec récepteur USB, fonctionne avec une pile." },
  { id: 12, nom: "Clavier AZERTY USB", categorie: "accessoires",
    prix: 8000, visuel: "clavier", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&h=600&fit=crop&auto=format&q=75",
    credit: { auteur: "Clay Banks", lien: "https://unsplash.com/photos/clavier-dordinateur-argent-et-blanc-PXaQXThG1FY" }, phare: false,
    description: "Clavier filaire AZERTY avec pavé numérique, branchement USB." },
  { id: 13, nom: "Chargeur universel pour portable 90 W", categorie: "accessoires",
    prix: 12500, visuel: "chargeur", image: "https://images.unsplash.com/photo-1623738244303-a645cef7aafa?w=800&h=600&fit=crop&auto=format&q=75",
    credit: { auteur: "Auguras Pipiras", lien: "https://unsplash.com/photos/macbook-apple-blanc-sur-surface-noire-4xnucLdUPtA" }, phare: false,
    description: "Chargeur livré avec plusieurs embouts, compatible avec la plupart des marques de portables." },
  { id: 14, nom: "Sac à dos pour portable 15,6\"", categorie: "accessoires",
    prix: 15000, visuel: "sac", image: "https://images.unsplash.com/photo-1667411424771-cadd97150827?w=800&h=600&fit=crop&auto=format&q=75",
    credit: { auteur: "Cyberbackpack.com", lien: "https://unsplash.com/photos/un-boitier-dordinateur-noir-B_BVXEQsGog" }, phare: false,
    description: "Sac à dos avec compartiment matelassé pour portable jusqu'à 15,6 pouces." }
];
