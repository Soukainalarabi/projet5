let image = document.querySelector(".item .item__img");
let name = document.getElementById("title");
let prix = document.getElementById("price");
let description = document.getElementById("description");
let colors = document.getElementById("colors");
const inputQuantite = document.querySelector('input[type = "number"]');
let card = document.getElementById("addToCart");
let quantite = "";
let product;

/**Récuperer get parameteres **/
function getIdFromParam() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
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
  // si l'id n'et dans URLSearchParams on annule et  on sort
  if (!id) {
    console.log("no id found in parameters");
    return;
  }

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
    //on récupère  le panier depuis localStorage
    res = localStorage.panier;
    //si le panier est encore vide on initialise la var panier par un tableau vide  (ternary operator)
    let panier = JSON.parse(res ? res : "[]");
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
    ///choisir une quantité et une couleur
    if (qty == 0 || !valeurCouleur) {
      alert("veuillez définir la quantité  et la couleur");
      return;
    }
    //Enregistrer le panier dans localStroage
    localStorage.panier = JSON.stringify(panier);
    // on se redirige vers la page d'accueil
    window.location = "index.html";
  });
}

afficherProduit();
