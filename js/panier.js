// panier.js - logique du panier : ajout, quantité, suppression, total, sauvegarde
// Le panier est une liste de lignes { id, quantite }.
// On ne stocke PAS les prix : ils sont relus dans PRODUITS, donc toujours à jour.

const CLE_PANIER = "ppinformatique_panier";
const QUANTITE_MAX = 10;   // limite par produit (au-delà : commande pro, à voir avec la boutique)

// ---------- Fonctions utilitaires (utilisées par panier.js ET app.js) ----------
// Elles sont ici, et non dans app.js, car panier.js est chargé AVANT app.js.

// Formate un nombre en prix FCFA : 125000 devient "125 000 FCFA"
function formaterPrix(montant) {
  const texte = String(Math.round(montant)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return texte + " FCFA";
}

function trouverProduit(id) {
  return PRODUITS.find(function (p) { return p.id === id; });
}

// ---------- Sauvegarde et chargement ----------

// Lit le panier dans localStorage. En cas de problème, retourne un panier vide.
function chargerPanier() {
  try {
    const texte = localStorage.getItem(CLE_PANIER);
    if (!texte) return [];
    const donnees = JSON.parse(texte);
    if (!Array.isArray(donnees)) return [];
    // On garde seulement les lignes valides dont le produit existe encore au catalogue
    return donnees.filter(function (ligne) {
      return ligne && Number.isInteger(ligne.id) && Number.isInteger(ligne.quantite)
        && ligne.quantite >= 1 && trouverProduit(ligne.id) !== undefined;
    }).map(function (ligne) {
      return { id: ligne.id, quantite: Math.min(ligne.quantite, QUANTITE_MAX) };
    });
  } catch (erreur) {
    // stockage bloqué (navigation privée...) ou texte illisible : on repart de zéro
    return [];
  }
}

// Écrit le panier dans localStorage (sans planter si c'est impossible)
function sauvegarderPanier() {
  try {
    localStorage.setItem(CLE_PANIER, JSON.stringify(panier));
  } catch (erreur) {
    // Le panier reste en mémoire pour cette page, mais ne survivra pas au rechargement
  }
}

// Copie du panier gardée en mémoire (sert aussi si localStorage est indisponible)
let panier = chargerPanier();

// ---------- Fonctions du panier ----------

// Quantité d'un produit déjà présente dans le panier (0 s'il n'y est pas)
function quantiteDansPanier(id) {
  const ligne = panier.find(function (l) { return l.id === id; });
  return ligne ? ligne.quantite : 0;
}

// Ajoute un produit (ou augmente sa quantité). Retourne la quantité de cette ligne.
function ajouterAuPanier(id, quantite) {
  if (!trouverProduit(id)) return 0;
  const ligne = panier.find(function (l) { return l.id === id; });
  if (ligne) {
    ligne.quantite = Math.min(ligne.quantite + quantite, QUANTITE_MAX);
  } else {
    panier.push({ id: id, quantite: Math.min(quantite, QUANTITE_MAX) });
  }
  sauvegarderPanier();
  mettreAJourIndicateurs();
  return quantiteDansPanier(id);
}

// Fixe la quantité d'une ligne (entre 1 et QUANTITE_MAX)
function modifierQuantite(id, quantite) {
  const ligne = panier.find(function (l) { return l.id === id; });
  if (!ligne) return;
  ligne.quantite = Math.max(1, Math.min(quantite, QUANTITE_MAX));
  sauvegarderPanier();
  mettreAJourIndicateurs();
}

// Retire complètement une ligne
function supprimerLigne(id) {
  panier = panier.filter(function (l) { return l.id !== id; });
  sauvegarderPanier();
  mettreAJourIndicateurs();
}

// Vide tout le panier
function viderPanier() {
  panier = [];
  sauvegarderPanier();
  mettreAJourIndicateurs();
}

// Total en FCFA : somme de prix x quantité pour chaque ligne
function calculerTotal() {
  return panier.reduce(function (somme, ligne) {
    return somme + trouverProduit(ligne.id).prix * ligne.quantite;
  }, 0);
}

// Nombre d'articles (somme des quantités)
function compterArticles() {
  return panier.reduce(function (somme, ligne) { return somme + ligne.quantite; }, 0);
}

// ---------- Badge de l'en-tête et barre fixe du bas (toutes les pages) ----------

function mettreAJourIndicateurs() {
  const nb = compterArticles();
  const badge = document.getElementById("badge-panier");
  const lienPanier = document.getElementById("lien-panier");
  const barre = document.getElementById("barre-panier");
  const barreNb = document.getElementById("barre-nb-articles");
  const barreTotal = document.getElementById("barre-total");

  if (badge) {
    badge.textContent = nb;
    badge.hidden = nb === 0;
  }
  if (lienPanier) lienPanier.setAttribute("aria-label", "Voir mon panier : " + nb + " article(s)");
  if (barreNb) barreNb.textContent = nb + (nb > 1 ? " articles" : " article");
  if (barreTotal) barreTotal.textContent = formaterPrix(calculerTotal());
  // La barre du bas n'apparaît que si le panier contient quelque chose
  if (barre) barre.hidden = nb === 0;
}

// Si le panier est modifié dans un autre onglet, on se met à jour ici aussi
window.addEventListener("storage", function (evenement) {
  if (evenement.key === CLE_PANIER) {
    panier = chargerPanier();
    mettreAJourIndicateurs();
    if (typeof afficherPanier === "function" && document.getElementById("liste-panier")) {
      afficherPanier();
    }
    if (typeof afficherEtapes === "function" && document.getElementById("etapes-commande")) {
      afficherEtapes(ETAPES_COMMANDE);
    }
  }
});
