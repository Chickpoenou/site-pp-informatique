// app.js - comportements des pages (menu, catalogue, fiche produit, panier, commande, contact)
// Chargé APRÈS produits.js et panier.js : il utilise leurs données et leurs fonctions.

// ---------- 1. Réglages ----------

// Numéro WhatsApp qui reçoit les commandes, au format international sans "+" ni espaces.
// (+229 01 99 00 23 93 devient 2290199002393)
const NUMERO_WHATSAPP = "2290199002393";

// Illustrations des produits, dessinées en SVG (aucune image à télécharger, net à toutes les tailles).
// Chaque valeur contient les tracés d'une icône de 24 x 24.
const ICONES = {
  "portable":       '<rect x="4" y="5" width="16" height="11" rx="1.5"/><path d="M2 19h20"/><path d="M10 8.5h4"/>',
  "ecran":          '<rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M8 20h8M12 16v4"/>',
  "unite-centrale": '<rect x="7" y="2" width="10" height="20" rx="1.5"/><path d="M10 6h4M10 9h4"/><circle cx="12" cy="17" r="1"/>',
  "imprimante":     '<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="1.5"/><path d="M7 14h10v7H7z"/><path d="M17.5 12h.01"/>',
  "bouclier":       '<path d="M12 3l8 3v6c0 4.5-3.4 8.2-8 9-4.6-.8-8-4.5-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
  "souris":         '<rect x="7" y="3" width="10" height="18" rx="5"/><path d="M12 7v4"/>',
  "clavier":        '<rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10"/>',
  "chargeur":       '<path d="M13 2L5 14h6l-1 8 8-12h-6z"/>',
  "sac":            '<path d="M8 7V5a4 4 0 0 1 8 0v2"/><rect x="5" y="7" width="14" height="14" rx="3"/><path d="M9 14h6"/>'
};

// ---------- 2. Menu burger (mobile) ----------

const boutonBurger = document.getElementById("bouton-burger");
const menu = document.getElementById("menu");

function ouvrirFermerMenu(ouvrir) {
  menu.classList.toggle("ouvert", ouvrir);
  // aria-expanded informe les lecteurs d'écran de l'état du menu
  boutonBurger.setAttribute("aria-expanded", String(ouvrir));
  boutonBurger.setAttribute("aria-label", ouvrir ? "Fermer le menu" : "Ouvrir le menu");
}

if (boutonBurger && menu) {
  boutonBurger.addEventListener("click", function () {
    ouvrirFermerMenu(!menu.classList.contains("ouvert"));
  });
  // La touche Échap ferme le menu
  document.addEventListener("keydown", function (evenement) {
    if (evenement.key === "Escape" && menu.classList.contains("ouvert")) {
      ouvrirFermerMenu(false);
      boutonBurger.focus();
    }
  });
}

// ---------- 3. Petites fonctions réutilisées partout ----------

function trouverCategorie(idCategorie) {
  return CATEGORIES.find(function (c) { return c.id === idCategorie; });
}

// Crée un élément avec une classe et un texte (textContent : pas de risque d'injection HTML)
function creerElement(balise, classe, texte) {
  const element = document.createElement(balise);
  if (classe) element.className = classe;
  if (texte !== undefined) element.textContent = texte;
  return element;
}

// Crée un bouton avec un texte visible et une étiquette pour les lecteurs d'écran
function creerBouton(classe, texte, etiquette, action) {
  const bouton = creerElement("button", classe, texte);
  bouton.type = "button";
  if (etiquette) bouton.setAttribute("aria-label", etiquette);
  bouton.addEventListener("click", action);
  return bouton;
}

// Construit le visuel d'un produit : la photo si elle existe, sinon l'illustration SVG.
// La classe "teinte-xxx" donne la couleur de fond propre à chaque catégorie.
function creerVisuel(balise, classe, produit) {
  const zone = creerElement(balise, classe + " teinte-" + produit.categorie);
  if (produit.image) {
    const img = document.createElement("img");
    img.src = produit.image;
    img.alt = produit.nom;
    img.loading = "lazy";
    img.width = 800;           // dimensions connues : la page ne "saute" pas pendant le chargement
    img.height = 600;
    // Si la photo ne se charge pas (pas de connexion, lien cassé), on affiche l'illustration
    img.addEventListener("error", function () { afficherIcone(zone, produit.visuel); });
    zone.appendChild(img);
  } else {
    afficherIcone(zone, produit.visuel);
  }
  return zone;
}

// Remplace le contenu d'une zone par l'illustration SVG du produit.
// ICONES est une constante écrite par nous : on peut l'insérer avec innerHTML sans danger.
function afficherIcone(zone, visuel) {
  zone.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" '
    + 'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">'
    + ICONES[visuel] + "</svg>";
}

// Petite ligne "Photo : Auteur / Unsplash" sous la photo de la fiche produit
function creerCredit(produit) {
  const credit = creerElement("p", "credit-photo", "Photo : ");
  const lien = creerElement("a", "", produit.credit.auteur + " / Unsplash");
  lien.href = produit.credit.lien;
  lien.target = "_blank";
  lien.rel = "noopener";
  credit.appendChild(lien);
  return credit;
}

// ---------- 4. Carte produit (accueil, catalogue, produits similaires) ----------

function creerCarteProduit(produit) {
  const categorie = trouverCategorie(produit.categorie);
  const adresse = "produit.html?id=" + produit.id;

  const carte = creerElement("article", "carte-produit");

  // Le visuel est aussi un lien, mais caché aux lecteurs d'écran (le titre suffit)
  const visuel = creerVisuel("a", "carte-visuel", produit);
  visuel.href = adresse;
  visuel.tabIndex = -1;
  visuel.setAttribute("aria-hidden", "true");

  const corps = creerElement("div", "carte-corps");
  const titre = creerElement("h3", "carte-titre");
  const lien = creerElement("a", "", produit.nom);
  lien.href = adresse;
  titre.appendChild(lien);

  const boutonAjout = creerBouton("bouton bouton-petit", "Ajouter au panier",
    "Ajouter " + produit.nom + " au panier", function () {
      ajouterEtPrevenir(produit, 1, boutonAjout);
    });

  corps.append(
    creerElement("p", "surtitre", categorie.nom),
    titre,
    creerElement("p", "carte-prix", formaterPrix(produit.prix)),
    boutonAjout
  );
  carte.append(visuel, corps);
  return carte;
}

// ---------- 5. Volet "Produit ajouté" ----------

let minuterieVolet;

function afficherVoletAjout(message) {
  const volet = document.getElementById("volet-ajout");
  if (!volet) return;
  document.getElementById("volet-message").textContent = message;
  volet.hidden = false;
  // Le volet se referme tout seul après 6 secondes
  clearTimeout(minuterieVolet);
  minuterieVolet = setTimeout(function () { volet.hidden = true; }, 6000);
}

const boutonFermerVolet = document.getElementById("volet-fermer");
if (boutonFermerVolet) {
  boutonFermerVolet.addEventListener("click", function () {
    document.getElementById("volet-ajout").hidden = true;
  });
}

// Ajoute au panier, change le texte du bouton un instant et affiche le volet
function ajouterEtPrevenir(produit, quantite, bouton) {
  const quantiteAvant = quantiteDansPanier(produit.id);
  const quantiteApres = ajouterAuPanier(produit.id, quantite);

  if (quantiteApres === quantiteAvant + quantite) {
    afficherVoletAjout(quantite + " × " + produit.nom + " ajouté à votre panier.");
  } else {
    // La limite par produit a été atteinte : on le dit clairement
    afficherVoletAjout(produit.nom + " : quantité limitée à " + QUANTITE_MAX
      + " par produit. Dans votre panier : " + quantiteApres + ".");
  }

  const texteInitial = bouton.textContent;
  bouton.textContent = "Ajouté ✓";
  bouton.classList.add("est-ajoute");
  setTimeout(function () {
    bouton.textContent = texteInitial;
    bouton.classList.remove("est-ajoute");
  }, 1500);
}

// ---------- 6. Page d'accueil ----------

// Tuiles des catégories (avec le nombre de produits calculé depuis PRODUITS)
function afficherCategoriesAccueil() {
  const grille = document.getElementById("grille-categories");
  CATEGORIES.forEach(function (categorie) {
    const nb = PRODUITS.filter(function (p) { return p.categorie === categorie.id; }).length;

    const tuile = creerElement("a", "tuile-categorie");
    tuile.href = "catalogue.html?categorie=" + categorie.id;
    const visuel = creerVisuel("span", "tuile-visuel", { categorie: categorie.id, visuel: categorie.visuel });
    const texte = creerElement("span", "tuile-texte");
    texte.append(
      creerElement("strong", "", categorie.nom),
      creerElement("span", "", categorie.accroche),
      creerElement("span", "tuile-nombre", nb + " produits →")
    );
    tuile.append(visuel, texte);
    grille.appendChild(tuile);
  });
}

if (document.getElementById("grille-categories")) {
  afficherCategoriesAccueil();
}

if (document.getElementById("produits-phares")) {
  const grillePhares = document.getElementById("produits-phares");
  PRODUITS.filter(function (p) { return p.phare; }).forEach(function (p) {
    grillePhares.appendChild(creerCarteProduit(p));
  });
}

// ---------- 7. Page catalogue : filtres, recherche et tri ----------

// L'état des filtres : une seule variable qui décrit ce que le visiteur a choisi
const etatFiltres = {
  categorie: "toutes",
  prix: "tous",
  tri: "aucun",
  recherche: ""
};

// Retire les accents et met en minuscules : "Écran" et "ecran" deviennent identiques
function normaliser(texte) {
  return texte.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

// Applique les filtres et le tri, puis retourne la liste des produits à afficher
function filtrerProduits() {
  const fourchette = FOURCHETTES_PRIX.find(function (f) { return f.id === etatFiltres.prix; });
  const recherche = normaliser(etatFiltres.recherche.trim());

  // filter garde uniquement les produits qui respectent les trois filtres
  const resultat = PRODUITS.filter(function (p) {
    const bonneCategorie = etatFiltres.categorie === "toutes" || p.categorie === etatFiltres.categorie;
    const bonPrix = p.prix >= fourchette.min && p.prix <= fourchette.max;
    const bonTexte = recherche === "" || normaliser(p.nom + " " + p.description).includes(recherche);
    return bonneCategorie && bonPrix && bonTexte;
  });

  if (etatFiltres.tri === "croissant") {
    resultat.sort(function (a, b) { return a.prix - b.prix; });
  } else if (etatFiltres.tri === "decroissant") {
    resultat.sort(function (a, b) { return b.prix - a.prix; });
  }
  return resultat;
}

// Redessine la grille et le compteur de résultats
function afficherCatalogue() {
  const grille = document.getElementById("grille-produits");
  const compteur = document.getElementById("nb-resultats");
  const produits = filtrerProduits();

  grille.replaceChildren();   // vide la grille avant de la remplir

  if (produits.length === 0) {
    grille.appendChild(creerElement("p", "message-vide",
      "Aucun produit ne correspond à ces filtres. Essayez une autre catégorie ou un autre prix."));
  } else {
    produits.forEach(function (p) { grille.appendChild(creerCarteProduit(p)); });
  }

  compteur.textContent = produits.length + (produits.length > 1 ? " produits" : " produit");
}

// Met à jour les puces : une seule est "appuyée" à la fois
function marquerPuceActive() {
  document.querySelectorAll("#puces-categories .puce").forEach(function (b) {
    b.setAttribute("aria-pressed", String(b.dataset.categorie === etatFiltres.categorie));
  });
}

function initialiserCatalogue() {
  const conteneurPuces = document.getElementById("puces-categories");
  const selectPrix = document.getElementById("filtre-prix");
  const selectTri = document.getElementById("tri-prix");
  const champRecherche = document.getElementById("recherche");

  // Catégorie passée dans l'adresse depuis l'accueil : catalogue.html?categorie=portables
  const categorieAdresse = new URLSearchParams(window.location.search).get("categorie");
  if (trouverCategorie(categorieAdresse)) {
    etatFiltres.categorie = categorieAdresse;
  }

  // Puces : "Toutes" + une puce par catégorie
  [{ id: "toutes", nom: "Toutes" }].concat(CATEGORIES).forEach(function (cat) {
    const bouton = creerElement("button", "puce", cat.nom);
    bouton.type = "button";
    bouton.dataset.categorie = cat.id;
    conteneurPuces.appendChild(bouton);
  });
  marquerPuceActive();

  // Un seul écouteur sur le conteneur (délégation d'événements)
  conteneurPuces.addEventListener("click", function (evenement) {
    const bouton = evenement.target.closest(".puce");
    if (!bouton) return;
    etatFiltres.categorie = bouton.dataset.categorie;
    marquerPuceActive();
    afficherCatalogue();
  });

  // Liste des fourchettes de prix
  FOURCHETTES_PRIX.forEach(function (f) {
    const option = creerElement("option", "", f.nom);
    option.value = f.id;
    selectPrix.appendChild(option);
  });

  selectPrix.addEventListener("change", function () {
    etatFiltres.prix = selectPrix.value;
    afficherCatalogue();
  });
  selectTri.addEventListener("change", function () {
    etatFiltres.tri = selectTri.value;
    afficherCatalogue();
  });
  // "input" se déclenche à chaque lettre tapée
  champRecherche.addEventListener("input", function () {
    etatFiltres.recherche = champRecherche.value;
    afficherCatalogue();
  });

  // Bouton "Réinitialiser" : on remet l'état et les champs à zéro
  document.getElementById("reinitialiser-filtres").addEventListener("click", function () {
    etatFiltres.categorie = "toutes";
    etatFiltres.prix = "tous";
    etatFiltres.tri = "aucun";
    etatFiltres.recherche = "";
    selectPrix.value = "tous";
    selectTri.value = "aucun";
    champRecherche.value = "";
    marquerPuceActive();
    afficherCatalogue();
  });

  afficherCatalogue();
}

if (document.getElementById("grille-produits")) {
  initialiserCatalogue();
}

// ---------- 8. Page produit : fiche détaillée ----------

// Lit l'identifiant dans l'adresse : produit.html?id=3 donne 3
function lireIdProduit() {
  return Number(new URLSearchParams(window.location.search).get("id"));
}

function afficherFicheProduit(produit) {
  const zone = document.getElementById("fiche-produit");
  const categorie = trouverCategorie(produit.categorie);
  document.title = produit.nom + " - PP Informatique";
  document.getElementById("fil-categorie").textContent = categorie.nom;
  document.getElementById("fil-categorie").href = "catalogue.html?categorie=" + categorie.id;

  zone.replaceChildren();
  zone.className = "fiche";

  const infos = creerElement("div", "fiche-infos");
  const titre = creerElement("h1", "fiche-titre", produit.nom);

  // Choix de la quantité : bouton -, champ numérique, bouton +
  const groupeQuantite = creerElement("div", "champ");
  const etiquette = creerElement("label", "", "Quantité");
  etiquette.htmlFor = "quantite";

  const selecteur = creerElement("div", "selecteur-quantite");
  const champQuantite = document.createElement("input");
  champQuantite.type = "number";
  champQuantite.id = "quantite";
  champQuantite.min = "1";
  champQuantite.max = String(QUANTITE_MAX);
  champQuantite.value = "1";
  champQuantite.inputMode = "numeric";

  // Lit la quantité saisie et la ramène entre 1 et QUANTITE_MAX
  function lireQuantite() {
    let q = parseInt(champQuantite.value, 10);
    if (isNaN(q) || q < 1) q = 1;
    if (q > QUANTITE_MAX) q = QUANTITE_MAX;
    champQuantite.value = q;
    return q;
  }

  const boutonMoins = creerBouton("", "−", "Diminuer la quantité", function () {
    champQuantite.value = lireQuantite() - 1;
    lireQuantite();
  });
  const boutonPlus = creerBouton("", "+", "Augmenter la quantité", function () {
    champQuantite.value = lireQuantite() + 1;
    lireQuantite();
  });
  champQuantite.addEventListener("change", lireQuantite);

  selecteur.append(boutonMoins, champQuantite, boutonPlus);
  groupeQuantite.append(etiquette, selecteur);

  const boutonAjout = creerBouton("bouton bouton-large", "Ajouter au panier", "", function () {
    ajouterEtPrevenir(produit, lireQuantite(), boutonAjout);
  });

  // Les arguments qui rassurent avant d'acheter en ligne
  const garanties = creerElement("ul", "liste-garanties");
  ["Paiement à la réception : Mobile Money ou espèces",
   "Retrait en boutique ou livraison à Cotonou",
   "Conditions de garantie précisées à la commande"].forEach(function (texte) {
    garanties.appendChild(creerElement("li", "", texte));
  });

  infos.append(
    creerElement("p", "surtitre", categorie.nom),
    titre,
    creerElement("p", "fiche-prix", formaterPrix(produit.prix)),
    creerElement("p", "fiche-description", produit.description),
    groupeQuantite,
    boutonAjout,
    garanties
  );
  // Colonne de gauche : la photo, puis le nom de son auteur
  const colonneVisuel = creerElement("div", "fiche-colonne-visuel");
  colonneVisuel.appendChild(creerVisuel("div", "fiche-visuel", produit));
  if (produit.image && produit.credit) {
    colonneVisuel.appendChild(creerCredit(produit));
  }
  zone.append(colonneVisuel, infos);

  // Produits similaires : même catégorie, sans le produit affiché (3 au maximum)
  const similaires = PRODUITS.filter(function (p) {
    return p.categorie === produit.categorie && p.id !== produit.id;
  }).slice(0, 3);
  if (similaires.length > 0) {
    const grille = document.getElementById("produits-similaires");
    similaires.forEach(function (p) { grille.appendChild(creerCarteProduit(p)); });
    document.getElementById("zone-similaires").hidden = false;
  }
}

// Affiche un message si l'identifiant est absent ou inconnu
function afficherProduitIntrouvable() {
  const zone = document.getElementById("fiche-produit");
  document.title = "Produit introuvable - PP Informatique";
  const lien = creerElement("a", "bouton", "Retour au catalogue");
  lien.href = "catalogue.html";
  zone.replaceChildren(
    creerElement("h1", "", "Produit introuvable"),
    creerElement("p", "", "Ce produit n'existe pas ou n'est plus au catalogue."),
    lien
  );
}

if (document.getElementById("fiche-produit")) {
  const produitTrouve = trouverProduit(lireIdProduit());
  if (produitTrouve) {
    afficherFicheProduit(produitTrouve);
  } else {
    afficherProduitIntrouvable();
  }
}

// ---------- 9. Page panier : lignes, quantités, total ----------

// Construit une ligne du panier (un produit, sa quantité et son sous-total)
function creerLignePanier(ligne) {
  const produit = trouverProduit(ligne.id);
  const element = creerElement("li", "ligne-panier");

  const visuel = creerVisuel("div", "ligne-visuel", produit);
  visuel.setAttribute("aria-hidden", "true");

  const infos = creerElement("div", "ligne-infos");
  const titre = creerElement("h3", "ligne-titre");
  const lien = creerElement("a", "", produit.nom);
  lien.href = "produit.html?id=" + produit.id;
  titre.appendChild(lien);

  // Sélecteur de quantité : - [ n ] +
  const selecteur = creerElement("div", "selecteur-quantite");
  const boutonMoins = creerBouton("", "−", "Diminuer la quantité de " + produit.nom, function () {
    modifierQuantite(produit.id, ligne.quantite - 1);
    afficherPanier('[data-moins="' + produit.id + '"]');
  });
  boutonMoins.dataset.moins = produit.id;
  boutonMoins.disabled = ligne.quantite <= 1;

  const valeur = creerElement("span", "valeur-quantite", String(ligne.quantite));
  valeur.setAttribute("aria-label", "Quantité : " + ligne.quantite);

  const boutonPlus = creerBouton("", "+", "Augmenter la quantité de " + produit.nom, function () {
    modifierQuantite(produit.id, ligne.quantite + 1);
    afficherPanier('[data-plus="' + produit.id + '"]');
  });
  boutonPlus.dataset.plus = produit.id;
  boutonPlus.disabled = ligne.quantite >= QUANTITE_MAX;

  selecteur.append(boutonMoins, valeur, boutonPlus);
  infos.append(titre, creerElement("p", "ligne-prix-unitaire", formaterPrix(produit.prix) + " l'unité"), selecteur);

  const fin = creerElement("div", "ligne-fin");
  fin.append(
    creerElement("p", "ligne-sous-total", formaterPrix(produit.prix * ligne.quantite)),
    creerBouton("bouton-lien", "Supprimer", "Supprimer " + produit.nom + " du panier", function () {
      supprimerLigne(produit.id);
      afficherPanier(".ligne-titre a");
    })
  );

  element.append(visuel, infos, fin);
  return element;
}

// Redessine toute la page panier.
// selecteurFocus : élément qui doit récupérer le focus après le redessin (confort clavier)
function afficherPanier(selecteurFocus) {
  const zone = document.getElementById("liste-panier");
  zone.replaceChildren();

  // Panier vide : message avec un lien pour continuer
  if (panier.length === 0) {
    const vide = creerElement("div", "message-vide");
    vide.appendChild(creerElement("p", "", "Votre panier est vide."));
    const lien = creerElement("a", "bouton", "Voir le catalogue");
    lien.href = "catalogue.html";
    vide.appendChild(lien);
    zone.appendChild(vide);
    mettreAJourZoneCommande();
    return;
  }

  const liste = creerElement("ul", "liste-panier");
  panier.forEach(function (ligne) { liste.appendChild(creerLignePanier(ligne)); });

  const actions = creerElement("div", "panier-actions");
  const continuer = creerElement("a", "lien-retour", "← Continuer mes achats");
  continuer.href = "catalogue.html";
  actions.append(continuer, creerBouton("bouton-lien", "Vider le panier", "Vider tout le panier", function () {
    if (window.confirm("Vider tout le panier ?")) {
      viderPanier();
      afficherPanier();
    }
  }));

  zone.append(liste, actions);

  // Récapitulatif (colonne de droite sur ordinateur)
  const nb = compterArticles();
  document.getElementById("recap-nb").textContent = "Sous-total (" + nb + (nb > 1 ? " articles)" : " article)");
  document.getElementById("recap-sous-total").textContent = formaterPrix(calculerTotal());
  document.getElementById("recap-total").textContent = formaterPrix(calculerTotal());

  mettreAJourZoneCommande();

  if (selecteurFocus) {
    const cible = zone.querySelector(selecteurFocus) || zone.querySelector(".selecteur-quantite button:not([disabled])");
    if (cible) cible.focus();
  }
}

if (document.getElementById("liste-panier")) {
  afficherPanier();
}

// ---------- 10. Page panier : formulaire de commande et envoi par WhatsApp ----------
// Pas de serveur : la commande part dans un message WhatsApp déjà rédigé.
// Le paiement se fait à la réception (voir la note 02 sur l'encaissement en ligne).

// Vérifie les champs. Retourne un objet { champ: "message d'erreur" } (vide si tout va bien).
function validerCommande(donnees) {
  const erreurs = {};

  if (donnees.nom.trim().length < 2) {
    erreurs.nom = "Indiquez votre nom et prénom.";
  }

  // On retire espaces, points, tirets et parenthèses, puis on accepte 8 à 13 chiffres (+ facultatif)
  const telephoneNettoye = donnees.telephone.replace(/[\s.\-()]/g, "");
  if (!/^\+?\d{8,13}$/.test(telephoneNettoye)) {
    erreurs.telephone = "Indiquez un numéro valide, par exemple 01 97 00 00 00.";
  }

  if (donnees.mode === "livraison" && donnees.adresse.trim().length < 5) {
    erreurs.adresse = "Indiquez l'adresse de livraison (quartier et repère).";
  }

  if (!donnees.paiement) {
    erreurs.paiement = "Choisissez comment vous paierez à la réception.";
  }
  return erreurs;
}

// Numéro de commande lisible, basé sur la date et l'heure : PP-20261007-1432
function creerNumeroCommande() {
  const d = new Date();
  const deuxChiffres = function (n) { return String(n).padStart(2, "0"); };
  return "PP-" + d.getFullYear() + deuxChiffres(d.getMonth() + 1) + deuxChiffres(d.getDate())
    + "-" + deuxChiffres(d.getHours()) + deuxChiffres(d.getMinutes());
}

// Rédige le message envoyé à la boutique à partir du panier et du formulaire
function construireMessage(donnees, numero) {
  const lignes = ["Bonjour PP Informatique, je souhaite commander :", "Commande " + numero, ""];

  panier.forEach(function (ligne) {
    const produit = trouverProduit(ligne.id);
    lignes.push("- " + ligne.quantite + " × " + produit.nom + " : " + formaterPrix(produit.prix * ligne.quantite));
  });

  lignes.push("");
  lignes.push("Total des articles : " + formaterPrix(calculerTotal()));
  lignes.push(donnees.mode === "livraison"
    ? "Livraison à : " + donnees.adresse.trim() + " (frais à confirmer)"
    : "Retrait en boutique");
  lignes.push("Paiement à la réception : " + donnees.paiement);
  lignes.push("");
  lignes.push("Nom : " + donnees.nom.trim());
  lignes.push("Téléphone : " + donnees.telephone.trim());
  return lignes.join("\n");
}

// Lien WhatsApp avec le message prérempli (encodeURIComponent protège les accents et espaces)
function construireLienWhatsApp(message) {
  return "https://wa.me/" + NUMERO_WHATSAPP + "?text=" + encodeURIComponent(message);
}

// Affiche ou efface le message d'erreur d'un champ
function afficherErreurChamp(nomChamp, message) {
  const zoneErreur = document.getElementById("erreur-" + nomChamp);
  const champ = document.getElementById(nomChamp);
  zoneErreur.textContent = message || "";
  zoneErreur.hidden = !message;
  if (champ) champ.setAttribute("aria-invalid", message ? "true" : "false");
}

// Lit les valeurs saisies dans le formulaire
function lireFormulaire() {
  const formulaire = document.getElementById("formulaire-commande");
  const paiementChoisi = formulaire.querySelector('input[name="paiement"]:checked');
  return {
    nom: formulaire.elements.nom.value,
    telephone: formulaire.elements.telephone.value,
    mode: formulaire.querySelector('input[name="mode"]:checked').value,
    adresse: formulaire.elements.adresse.value,
    paiement: paiementChoisi ? paiementChoisi.value : ""
  };
}

// Écran de confirmation : aperçu du message + bouton WhatsApp
function afficherConfirmation(message, numero) {
  const zone = document.getElementById("confirmation-commande");
  zone.replaceChildren();

  const titre = creerElement("h2", "", "Dernière étape : envoyer votre commande");
  titre.tabIndex = -1;
  zone.append(
    creerElement("p", "surtitre", "Commande " + numero),
    titre,
    creerElement("p", "", "Votre commande n'est transmise à la boutique qu'une fois ce message envoyé sur WhatsApp. "
      + "Un conseiller vous répond pour confirmer la disponibilité et le rendez-vous. Voici le message :"),
    creerElement("pre", "apercu-message", message)
  );

  const lien = creerElement("a", "bouton bouton-whatsapp", "Envoyer sur WhatsApp");
  lien.href = construireLienWhatsApp(message);
  lien.target = "_blank";
  lien.rel = "noopener";

  const actions = creerElement("div", "confirmation-actions");
  actions.append(
    lien,
    creerBouton("bouton bouton-secondaire", "J'ai envoyé le message", "J'ai envoyé le message, vider le panier", function () {
      viderPanier();
      const retour = creerElement("a", "bouton", "Retour au catalogue");
      retour.href = "catalogue.html";
      const merci = creerElement("h2", "", "Merci pour votre commande !");
      merci.tabIndex = -1;
      zone.replaceChildren(
        merci,
        creerElement("p", "", "PP Informatique vous contacte rapidement sur WhatsApp pour confirmer. Votre panier a été vidé."),
        retour
      );
      merci.focus();
    }),
    creerBouton("bouton-lien-neutre", "Modifier mon panier", "Revenir modifier mon panier", function () {
      zone.hidden = true;
      afficherPanier();
    })
  );
  zone.appendChild(actions);

  zone.hidden = false;
  mettreAJourZoneCommande();
  titre.focus();
}

// Affiche le panier et le formulaire, ou la confirmation, selon la situation
function mettreAJourZoneCommande() {
  const zone = document.getElementById("zone-commande");
  if (!zone) return;
  const confirmation = document.getElementById("confirmation-commande");
  zone.hidden = panier.length === 0 || !confirmation.hidden;
  document.getElementById("liste-panier").hidden = !confirmation.hidden;
}

// Branche les événements du formulaire (appelée une seule fois)
function initialiserCommande() {
  const formulaire = document.getElementById("formulaire-commande");
  const champAdresse = document.getElementById("champ-adresse");

  // Le champ adresse n'apparaît que pour la livraison
  formulaire.querySelectorAll('input[name="mode"]').forEach(function (radio) {
    radio.addEventListener("change", function () {
      champAdresse.hidden = lireFormulaire().mode !== "livraison";
      afficherErreurChamp("adresse", "");
    });
  });

  formulaire.addEventListener("submit", function (evenement) {
    evenement.preventDefault();              // on empêche l'envoi classique de la page
    const donnees = lireFormulaire();
    const erreurs = validerCommande(donnees);

    ["nom", "telephone", "adresse", "paiement"].forEach(function (champ) {
      afficherErreurChamp(champ, erreurs[champ]);
    });

    // En cas d'erreur, le focus va sur le premier champ à corriger
    const premier = ["nom", "telephone", "adresse"].find(function (champ) { return erreurs[champ]; });
    if (premier) {
      document.getElementById(premier).focus();
      return;
    }
    if (erreurs.paiement) {
      formulaire.querySelector('input[name="paiement"]').focus();
      return;
    }

    const numero = creerNumeroCommande();
    afficherConfirmation(construireMessage(donnees, numero), numero);
  });
}

if (document.getElementById("formulaire-commande")) {
  initialiserCommande();
  mettreAJourZoneCommande();
}

// ---------- 11. Page contact : message envoyé par WhatsApp ----------

const formulaireContact = document.getElementById("formulaire-contact");
if (formulaireContact) {
  formulaireContact.addEventListener("submit", function (evenement) {
    evenement.preventDefault();
    const nom = formulaireContact.elements["contact-nom"].value.trim();
    const texte = formulaireContact.elements["contact-message"].value.trim();

    afficherErreurChamp("contact-nom", nom.length < 2 ? "Indiquez votre nom." : "");
    afficherErreurChamp("contact-message", texte.length < 5 ? "Écrivez votre question." : "");
    if (nom.length < 2) { document.getElementById("contact-nom").focus(); return; }
    if (texte.length < 5) { document.getElementById("contact-message").focus(); return; }

    const message = "Bonjour PP Informatique, je suis " + nom + ".\n\n" + texte;
    window.open(construireLienWhatsApp(message), "_blank", "noopener");
  });
}

// ---------- 12. Au chargement de chaque page ----------

// Affiche le nombre d'articles dès l'ouverture de la page (panier relu depuis localStorage)
mettreAJourIndicateurs();

// Année du copyright toujours à jour
document.querySelectorAll(".annee").forEach(function (el) { el.textContent = new Date().getFullYear(); });
