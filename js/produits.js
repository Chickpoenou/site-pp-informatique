// produits.js - données du catalogue (source UNIQUE pour tout le site)
// Catalogue fictif mais réaliste : prix indicatifs en FCFA, fourchettes observées
// sur le marché béninois (boutiques de Cotonou, annonces en ligne).
// Le même catalogue doit apparaître dans la maquette Canva et dans le devis.

// Les 4 catégories du site.
// "photo" : identifiant du produit dont la photo illustre le rayon sur la page d'accueil.
const CATEGORIES = [
  { id: "portables",    nom: "Ordinateurs portables",       visuel: "portable",   photo: 1,
    accroche: "Pour les études, le bureau et le télétravail." },
  { id: "postes-fixes", nom: "Unités centrales et écrans",  visuel: "ecran",      photo: 6,
    accroche: "Postes fixes pour la maison ou le commerce." },
  { id: "imprimantes",  nom: "Imprimantes et logiciels",    visuel: "imprimante", photo: 8,
    accroche: "Imprimer, numériser, protéger vos PC." },
  { id: "accessoires",  nom: "Accessoires",                 visuel: "souris",     photo: 11,
    accroche: "Souris, claviers, chargeurs et sacs." }
];

// Les usages proposés dans le filtre « Par usage » du catalogue (idée reprise de la Fnac :
// le client choisit selon ce qu'il veut faire, sans connaître les termes techniques).
const USAGES = [
  { id: "etudes", nom: "Études" },
  { id: "bureau", nom: "Bureau et entreprise" },
  { id: "maison", nom: "Maison et famille" }
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
// "credit" : auteur et page de la photo. Non affiché sur le site : sert de justificatif de la source.
// "phare"  : true = produit mis en avant sur la page d'accueil.
// "usages" : identifiants de USAGES (ci-dessous) : sert au filtre « Par usage » du catalogue.
// "caracteristiques" : fiche technique affichée sur la page produit, en paires [nom, valeur].
const PRODUITS = [
  { id: 1,  nom: "Portable bureautique 15,6\" - 8 Go / 256 Go SSD", categorie: "portables",
    prix: 215000, visuel: "portable", image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&h=600&fit=crop&auto=format&q=75",
    credit: { auteur: "Erick Cerritos", lien: "https://unsplash.com/photos/ordinateur-portable-dell-sur-surface-blanche-i5UV2HpITYA" }, phare: true,
    usages: ["etudes", "maison"],
    description: "Portable d'entrée de gamme pour les cours, la bureautique et internet. Écran 15,6 pouces, 8 Go de mémoire, disque SSD de 256 Go.",
    caracteristiques: [
      ["Écran", "15,6 pouces, HD"],
      ["Mémoire vive", "8 Go"],
      ["Stockage", "SSD 256 Go"],
      ["Système", "Windows 11"]
    ] },
  { id: 2,  nom: "Portable 14\" - 8 Go / 512 Go SSD", categorie: "portables",
    prix: 285000, visuel: "portable", image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=800&h=600&fit=crop&auto=format&q=75",
    credit: { auteur: "Dell", lien: "https://unsplash.com/photos/ordinateur-portable-sur-table-blanche-Gi3iUJ1FwxI" }, phare: false,
    usages: ["etudes", "bureau"],
    description: "Portable léger de 14 pouces, pratique à transporter. 8 Go de mémoire et SSD de 512 Go pour plus de rapidité.",
    caracteristiques: [
      ["Écran", "14 pouces, Full HD"],
      ["Mémoire vive", "8 Go"],
      ["Stockage", "SSD 512 Go"],
      ["Poids", "environ 1,4 kg"]
    ] },
  { id: 3,  nom: "Portable 15,6\" - 16 Go / 512 Go SSD", categorie: "portables",
    prix: 390000, visuel: "portable", image: "https://images.unsplash.com/photo-1648197395199-e7f8d3dd0a3c?w=800&h=600&fit=crop&auto=format&q=75",
    credit: { auteur: "Ricardo Resende", lien: "https://unsplash.com/photos/un-ordinateur-portable-pose-sur-un-bureau-en-bois-bf2ZA4oB8-M" }, phare: false,
    usages: ["bureau"],
    description: "Portable plus puissant pour travailler sur plusieurs logiciels à la fois : 16 Go de mémoire et SSD de 512 Go.",
    caracteristiques: [
      ["Écran", "15,6 pouces, Full HD"],
      ["Mémoire vive", "16 Go"],
      ["Stockage", "SSD 512 Go"],
      ["Système", "Windows 11"]
    ] },

  { id: 4,  nom: "Unité centrale de bureau - 8 Go / 500 Go SSD", categorie: "postes-fixes",
    prix: 175000, visuel: "unite-centrale", image: "https://images.unsplash.com/photo-1660855551550-2696677aaf28?w=800&h=600&fit=crop&auto=format&q=75",
    credit: { auteur: "Anthony Roberts", lien: "https://unsplash.com/photos/une-tour-dordinateur-avec-un-ecran-noir-fMbiAi0rbkA" }, phare: true,
    usages: ["bureau", "maison"],
    description: "Ordinateur de bureau pour la maison ou le petit commerce. Écran, clavier et souris vendus séparément.",
    caracteristiques: [
      ["Mémoire vive", "8 Go"],
      ["Stockage", "SSD 500 Go"],
      ["Système", "Windows 11"],
      ["Fourni sans", "écran, clavier et souris"]
    ] },
  { id: 5,  nom: "Écran 22\" Full HD", categorie: "postes-fixes",
    prix: 65000, visuel: "ecran", image: "https://images.unsplash.com/photo-1517518295033-d5ab8ca078cc?w=800&h=600&fit=crop&auto=format&q=75",
    credit: { auteur: "Ryan Yao", lien: "https://unsplash.com/photos/black-flat-screen-computer-monitor-keyboard-speakers-mouse-on-desk-BDvCewlnbD8" }, phare: false,
    usages: ["bureau", "maison"],
    description: "Écran de 22 pouces en Full HD (1920 x 1080), prises HDMI et VGA.",
    caracteristiques: [
      ["Taille", "22 pouces"],
      ["Résolution", "Full HD 1920 × 1080"],
      ["Prises", "HDMI et VGA"]
    ] },
  { id: 6,  nom: "Écran 24\" Full HD IPS", categorie: "postes-fixes",
    prix: 95000, visuel: "ecran", image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=800&h=600&fit=crop&auto=format&q=75",
    credit: { auteur: "Sebastian Bednarek", lien: "https://unsplash.com/photos/espace-de-travail-informatique-avec-clavier-et-manettes-x2Z0uNj-Quo" }, phare: false,
    usages: ["bureau"],
    description: "Écran de 24 pouces à dalle IPS : couleurs fidèles et grands angles de vision.",
    caracteristiques: [
      ["Taille", "24 pouces"],
      ["Résolution", "Full HD 1920 × 1080"],
      ["Dalle", "IPS (grands angles)"],
      ["Prises", "HDMI et VGA"]
    ] },

  { id: 7,  nom: "Imprimante jet d'encre multifonction", categorie: "imprimantes",
    prix: 78000, visuel: "imprimante", image: "https://images.unsplash.com/photo-1625961332771-3f40b0e2bdcf?w=800&h=600&fit=crop&auto=format&q=75",
    credit: { auteur: "FilterGrade", lien: "https://unsplash.com/photos/imprimante-canon-noire-sur-table-en-bois-marron-oPyAcpkQch0" }, phare: true,
    usages: ["etudes", "maison"],
    description: "Imprime, copie et numérise en couleur. Adaptée à un usage personnel ou scolaire.",
    caracteristiques: [
      ["Type", "Jet d'encre couleur"],
      ["Fonctions", "Impression, copie, numérisation"],
      ["Connexion", "USB"]
    ] },
  { id: 8,  nom: "Imprimante laser monochrome", categorie: "imprimantes",
    prix: 120000, visuel: "imprimante", image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800&h=600&fit=crop&auto=format&q=75",
    credit: { auteur: "Mahrous Houses", lien: "https://unsplash.com/photos/imprimante-hp-tout-en-un-blanc-et-gris-5AoOejjRUrA" }, phare: false,
    usages: ["bureau"],
    description: "Impression rapide en noir et blanc, économique pour de gros volumes de documents.",
    caracteristiques: [
      ["Type", "Laser noir et blanc"],
      ["Usage conseillé", "Gros volumes de documents"],
      ["Connexion", "USB"]
    ] },
  { id: 9,  nom: "Antivirus - licence 1 poste, 1 an", categorie: "imprimantes",
    prix: 12000, visuel: "bouclier", image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&h=600&fit=crop&auto=format&q=75",
    credit: { auteur: "FlyD", lien: "https://unsplash.com/photos/cadenas-rouge-sur-clavier-dordinateur-noir-mT7lXZPjk7U" }, phare: false,
    usages: ["etudes", "maison"],
    description: "Licence physique (carte) à activer sur un ordinateur. Protection contre les virus pendant un an.",
    caracteristiques: [
      ["Postes protégés", "1 ordinateur"],
      ["Durée", "1 an"],
      ["Format", "Carte d'activation"]
    ] },
  { id: 10, nom: "Antivirus - licence 3 postes, 1 an", categorie: "imprimantes",
    prix: 25000, visuel: "bouclier", image: "https://images.unsplash.com/photo-1590065707046-4fde65275b2e?w=800&h=600&fit=crop&auto=format&q=75",
    credit: { auteur: "Dan Nelson", lien: "https://unsplash.com/photos/personne-utilisant-macbook-pro-sur-une-table-blanche-AvSFPw5Tp68" }, phare: false,
    usages: ["bureau", "maison"],
    description: "Une seule licence pour protéger 3 ordinateurs pendant un an. Idéale pour une famille ou un petit bureau.",
    caracteristiques: [
      ["Postes protégés", "3 ordinateurs"],
      ["Durée", "1 an"],
      ["Format", "Carte d'activation"]
    ] },

  { id: 11, nom: "Souris sans fil", categorie: "accessoires",
    prix: 4500, visuel: "souris", image: "https://images.unsplash.com/photo-1658070429465-848c0796abf3?w=800&h=600&fit=crop&auto=format&q=75",
    credit: { auteur: "JL Cabrera", lien: "https://unsplash.com/photos/une-souris-dordinateur-noire-Q-jxVqz0wVQ" }, phare: true,
    usages: ["etudes", "bureau", "maison"],
    description: "Souris sans fil avec récepteur USB, fonctionne avec une pile.",
    caracteristiques: [
      ["Connexion", "Sans fil, récepteur USB"],
      ["Alimentation", "1 pile"]
    ] },
  { id: 12, nom: "Clavier AZERTY USB", categorie: "accessoires",
    prix: 8000, visuel: "clavier", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&h=600&fit=crop&auto=format&q=75",
    credit: { auteur: "Clay Banks", lien: "https://unsplash.com/photos/clavier-dordinateur-argent-et-blanc-PXaQXThG1FY" }, phare: false,
    usages: ["bureau", "maison"],
    description: "Clavier filaire AZERTY avec pavé numérique, branchement USB.",
    caracteristiques: [
      ["Disposition", "AZERTY avec pavé numérique"],
      ["Connexion", "USB filaire"]
    ] },
  { id: 13, nom: "Chargeur universel pour portable 90 W", categorie: "accessoires",
    prix: 12500, visuel: "chargeur", image: "https://images.unsplash.com/photo-1623738244303-a645cef7aafa?w=800&h=600&fit=crop&auto=format&q=75",
    credit: { auteur: "Auguras Pipiras", lien: "https://unsplash.com/photos/macbook-apple-blanc-sur-surface-noire-4xnucLdUPtA" }, phare: false,
    usages: ["etudes"],
    description: "Chargeur livré avec plusieurs embouts, compatible avec la plupart des marques de portables.",
    caracteristiques: [
      ["Puissance", "90 W"],
      ["Embouts", "Plusieurs, compatibles avec la plupart des marques"]
    ] },
  { id: 14, nom: "Sac à dos pour portable 15,6\"", categorie: "accessoires",
    prix: 15000, visuel: "sac", image: "https://images.unsplash.com/photo-1667411424771-cadd97150827?w=800&h=600&fit=crop&auto=format&q=75",
    credit: { auteur: "Cyberbackpack.com", lien: "https://unsplash.com/photos/un-boitier-dordinateur-noir-B_BVXEQsGog" }, phare: false,
    usages: ["etudes"],
    description: "Sac à dos avec compartiment matelassé pour portable jusqu'à 15,6 pouces.",
    caracteristiques: [
      ["Compatible", "Portables jusqu'à 15,6 pouces"],
      ["Protection", "Compartiment matelassé"]
    ] }
];

// Les étapes du parcours d'achat, affichées dans "Comment commander ?" sur l'accueil.
// Même forme qu'une réponse d'API (tableau d'objets) : on pourrait plus tard la charger
// avec fetch("api/etapes.json") au lieu de l'écrire ici, sans changer le code d'affichage.
// "lien" et "action" : le bouton qui mène à la page où l'on fait cette étape.
const ETAPES_COMMANDE = [
  { numero: "01", titre: "Choisissez",
    description: "Parcourez le catalogue et filtrez par catégorie ou par prix.",
    lien: "catalogue.html", action: "Voir le catalogue" },
  { numero: "02", titre: "Ajoutez au panier",
    description: "Ajustez les quantités : le total en FCFA se calcule tout seul.",
    lien: "catalogue.html", action: "Ajouter des produits" },
  { numero: "03", titre: "Envoyez la commande",
    description: "Indiquez vos coordonnées : la commande part en un message WhatsApp.",
    lien: "panier.html", action: "Valider mon panier" },
  { numero: "04", titre: "Payez à la réception",
    description: "En boutique ou à la livraison, par Mobile Money ou en espèces.",
    lien: "contact.html#titre-faq", action: "Moyens de paiement" }
];

// ---------- Page contact ----------

// Objets de demande : le client en choisit un, le formulaire s'adapte.
// "commande" : "obligatoire", "facultatif" ou "" (champ numéro de commande masqué).
const MOTIFS_CONTACT = [
  { id: "conseil", nom: "Conseil avant achat", commande: "",
    exemple: "Je cherche un portable pour un étudiant, budget 250 000 FCFA." },
  { id: "suivi", nom: "Suivi de commande", commande: "obligatoire",
    exemple: "J'ai commandé hier, quand puis-je récupérer ma commande ?" },
  { id: "devis", nom: "Devis entreprise", commande: "",
    exemple: "Nous équipons un bureau de 5 postes : unités centrales, écrans et une imprimante." },
  { id: "garantie", nom: "Garantie et SAV", commande: "facultatif",
    exemple: "Mon imprimante achetée chez vous ne s'allume plus." }
];

// Questions fréquentes : elles rassurent avant l'achat et évitent des messages.
// Les réponses reprennent les règles du site (paiement à la réception, livraison à Cotonou).
const QUESTIONS_FREQUENTES = [
  { question: "Comment payer ma commande ?",
    reponse: "À la réception, par Mobile Money (MTN, Moov) ou en espèces. Aucun paiement n'est demandé sur le site." },
  { question: "Puis-je voir le produit avant de payer ?",
    reponse: "Oui. Vous payez seulement après avoir vu le produit, en boutique ou au moment de la livraison." },
  { question: "Livrez-vous à domicile ?",
    reponse: "Oui, à Cotonou. Les frais dépendent du quartier et vous sont confirmés sur WhatsApp avant la livraison. Le retrait en boutique est gratuit." },
  { question: "Les produits sont-ils garantis ?",
    reponse: "Les conditions de garantie (durée, ce qui est couvert) vous sont précisées par écrit à la commande, selon le produit. Gardez votre reçu." },
  { question: "Comment suivre ma commande ?",
    reponse: "Après votre commande, un numéro du type PP-20261011-1432 s'affiche. Choisissez « Suivi de commande » ci-dessus et indiquez-le." }
];

// La boutique. ADRESSE ET HORAIRES À CONFIRMER AVEC LE CLIENT (valeurs indicatives).
// jour : 0 = dimanche, 1 = lundi ... 6 = samedi (comme getDay() en JavaScript).
const BOUTIQUE = {
  ville: "Cotonou, Bénin",
  adresse: "Adresse précise à confirmer avec le client",
  horaires: [
    { jour: 1, nom: "Lundi",    ouverture: "08:00", fermeture: "19:00" },
    { jour: 2, nom: "Mardi",    ouverture: "08:00", fermeture: "19:00" },
    { jour: 3, nom: "Mercredi", ouverture: "08:00", fermeture: "19:00" },
    { jour: 4, nom: "Jeudi",    ouverture: "08:00", fermeture: "19:00" },
    { jour: 5, nom: "Vendredi", ouverture: "08:00", fermeture: "19:00" },
    { jour: 6, nom: "Samedi",   ouverture: "09:00", fermeture: "17:00" },
    { jour: 0, nom: "Dimanche", ouverture: "",      fermeture: "" }
  ]
};
