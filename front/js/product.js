let itemImage = document.querySelector(".item .item__img");
let name = document.getElementById("title");
let prix = document.getElementById("price");
let description = document.getElementById("description");
let colors = document.getElementById("colors");
const inputQuantite = document.querySelector('input[type = "number"]');
let card = document.getElementById("addToCart");
let quantite = "";
let product;

function getProduct() {
  const id = getIdFromParam();
  //   console.log(id);
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
    .then((kanape) => {
      let imageNode = document.createElement("img");
      imageNode.src = kanape.imageUrl;
      imageNode.alt = imageNode.altTxt;
      itemImage.appendChild(imageNode);
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
    });

  card.addEventListener("click", (e) => {
    const qty = inputQuantite.value;
    const valeurCouleur = colors.value;
    res = getCookie("panier");
    let panier = JSON.parse(res ? res : "[]");
    let achat = {
      quantite: qty,
      couleur: valeurCouleur,
      produit: product,
    };
    panier.push(achat);
    setCookie("panier", JSON.stringify(panier), 10);
  });
}

getProduct();

function getIdFromParam() {
  /**Récuuper get parameteres **/
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get("id");
}
/**
 * recuperer coockies
 * @param {*} cName   le nom du coockie
 * @returns  retourenr la valeur du coc
 */

class Panier {
  constructor() {
    let res = getCookie("panier");
    let panier = res ? JSON.parse(res) : undefined;
    this.achats = panier ? panier.achats : [];
    this.total = panier ? panier.total : 0;
  }
  ajouterProduit(couleur, quantite, produit) {}
  supprimerProduit(couleur, quantite, produit) {
    setCookie(nom, "", -1);
  }

  viderPanier() {
    this.achats = [];
    this.total = 0;
  }
}
getCookie();
setCookie();
