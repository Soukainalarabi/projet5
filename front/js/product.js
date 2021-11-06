let image = document.querySelector(".item .item__img");
let name = document.getElementById("title");
let prix = document.getElementById("price");
let description = document.getElementById("description");
let colors = document.getElementById("colors");
const inputQuantite = document.querySelector('input[type = "number"]');
let card = document.getElementById("addToCart");
let quantite = "";
let product;
///on récupère la valeur de l'id a partir de l'urlsearch
/**Récuperer get parameteres **/
function getIdFromParam() {
  const queryString = window.location.search; // récuperer l'url depuis la page
  const urlParams = new URLSearchParams(queryString); // construire
  return urlParams.get("id");
}

function injectProduit(kanape) {
  image.innerHTML = `<img src=${kanape.imageUrl} alt=${kanape.altTxt}>`;
  name.textContent = kanape.name;
  prix.textContent = kanape.price;
  description.textContent = kanape.description;
  kanape.colors.forEach((color) => {
    // on crée l'option à partir de la couleur
    let option = document.createElement("option");
    option.textContent = color;
    option.value = color;
    // on attache l'option créer avec Select colors element
    colors.appendChild(option);
    product = kanape;
  });
}

function afficherProduit() {
  const id = getIdFromParam();
  // si l'id n'est pas dans URLSearchParams on annule et  on sort
  if (!id) {
    console.log("no id found in parameters");
    return;
  }
  //on récupere le produit depuis l' API
  const myHeaders = new Headers();
  const init = {
    method: "GET",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
  };
  fetch("http://localhost:3000/api/products/" + id, init)
    .then((res) => res.json())
    .then(injectProduit);
  //OnClick
  card.addEventListener("click", (e) => {
    const qty = inputQuantite.value;
    const valeurCouleur = colors.value;
    ///choisir une quantité et une couleur
    if (qty == 0 || !valeurCouleur) {
      alert("veuillez définir la quantité  et la couleur");
      return;
    }
    //on récupère  le panier depuis localStorage
    res = localStorage.panier;
    //si le panier est encore vide on initialise la var panier par un tableau vide  (ternary operator)
    let panier = JSON.parse(res ? res : "[]");
    //chercher un element à l'aide de la méthode find du tableau
    let articleTrouve = panier.find(
      (a) => a.produit._id == product._id && a.couleur == valeurCouleur
    );
    if (!articleTrouve) {
      //si articleTrouve est vide on crée un nouvel article
      let article = {
        quantite: parseInt(qty),
        couleur: valeurCouleur,
        produit: product,
      };
      panier.push(article);
    } else {
      //sinon on modifie l'article existant en ajoutant la quantité saisie
      articleTrouve.quantite += parseInt(qty);
    }

    //Enregistrer le panier dans localStroage
    localStorage.panier = JSON.stringify(panier);
    // on se redirige vers la page d'accueil
    window.location = "index.html";
  });
}

afficherProduit();
