const produit = document.querySelector(".cart__item ");
// const image = document.querySelector(".cart__item__img");
const name = document.querySelector(".cart__item__content__titlePrice ");
const price = document.querySelector(".cart__item__content__titlePrice , p");
const quantite = document.querySelector(
  ".cart__item__content__settings__quantity , p"
);
const errMsg = document.querySelector("#emailErrorMsg");
const errMsgFirst = document.querySelector("#firstNameErrorMsg");
const errMsgLast = document.querySelector("#lastNameErrorMsg");
function achatproduit() {
  fetch("http://localhost:3000/api/produits")
    .then((res) => res.json())
    .then((kanape) => {
      let imageNode = document.createElement("img");
      imageNode.src = kanape.imageUrl;
      imageNode.alt = imageNode.altTxt;
      image.appendChild(imageNode);
      // name.h2.textContent = kanape.name;
      // name.p.textContent = kanape.price;
      // console.log(kanape);
    });
}

///recuperer les cookies///
res = getCookie("panier");
let panier = JSON.parse(res ? res : "[]");
let total = 0;
let totalQte = 0;
// total = achat.quantite * achat.produit.price;
console.log(panier.length);
panier.forEach((achat) => {
  let cart__items = document.getElementById("cart__items");
  let article = document.createElement("article");
  article.setAttribute("class", "cart__item");
  article.setAttribute("data-id", achat.produit._id);
  let imageDiv = document.createElement("div");
  imageDiv.setAttribute("class", "cart__item__img");
  article.appendChild(imageDiv);
  let imageNode = document.createElement("img");
  imageNode.src = achat.produit.imageUrl;
  imageNode.alt = achat.produit.altTxt;
  imageDiv.appendChild(imageNode);

  let titleDiv1 = document.createElement("div");
  titleDiv1.setAttribute("class", "cart__item__content");
  article.appendChild(titleDiv1);
  let titleDiv2 = document.createElement("div");
  titleDiv2.setAttribute("class", "cart__item__content__titlePrice");
  titleDiv1.appendChild(titleDiv2);
  let titleH2 = document.createElement("h2");
  titleH2.textContent = achat.produit.name;
  titleDiv2.appendChild(titleH2);
  let textP = document.createElement("p");
  textP.textContent = achat.produit.price + "$";
  titleDiv2.appendChild(textP);

  let settings = document.createElement("div");
  settings.setAttribute("class", "cart__item__content__settings");
  article.appendChild(settings);
  let quantite = document.createElement("div");
  quantite.setAttribute("class", "cart__item__content__settings__quantity");

  settings.appendChild(quantite);
  let textQuantite = document.createElement("p");
  textQuantite.textContent = "Qte:";
  quantite.appendChild(textQuantite);
  let input = document.createElement("input");
  input.setAttribute("type", "number");
  input.setAttribute("class", "itemQuantity");
  input.setAttribute("name", "itemQuantity");
  input.setAttribute("min", "1");
  input.setAttribute("max", "100");
  input.setAttribute("value", achat.quantite);
  quantite.appendChild(input);

  let delet = document.createElement("div");
  delet.setAttribute("class", "cart__item__content__settings__delete");
  settings.appendChild(delet);
  let textDelete = document.createElement("p");
  textDelete.setAttribute("class", "deleteItem");
  delet.appendChild(textDelete);
  cart__items.appendChild(article);

  // let totalQuantite = createImageBitmap("div");
  // total.Quantite.setAttribute("class", "cart__price");
  // let pTotalQuantite = createElement("p");
  // pTotalQuantite.setAttribute("span");
  // totalQuantite.appendChild(totalQuantite);
  // const reducer = (previousValue, currentValue) =>
  //   previousValue + currentValue;
  // const totalPanier = valeur.reduce(reducer);
  // let quantiteArticle = achat.quantite;
  let valeur = achat.quantite * achat.produit.price;
  total += valeur;
  totalQte += parseInt(achat.quantite);
  console.log(totalQte);
  let totalQuantity = document.getElementById("totalQuantity");
  totalQuantity.textContent = totalQte;
  let totalPrice = document.getElementById("totalPrice");
  totalPrice.textContent = total;

});

//validation formulaire
function ValidationMail(e) {
  var regex1 =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var mail = document.getElementById("email").value;

  if (!regex1.test(mail)) {
    errMsg.textContent = "Adresse mail non valide";
    //e.preventDefault(): bloquer l'envoie si le mail n'est pas validé
    e.preventDefault();
  }
}
function ValidationFirstName(e) {
  let regex2 = /[A-Za-z]+/;
  let nameForm = document.getElementById("firstName");
  let nameLastForm = document.getElementById("lastName");
  if (!regex2.test(nameForm)) {
    errMsgFirst.textContent = "Prénom non valide";
    e.preventDefault();
  }
  if (!regex2.test(nameLastForm)) {
    errMsgLast.textContent = "Nom non valide";
    e.preventDefault();
  }
}
let form = document.querySelector(".cart__order__form");
form.addEventListener("submit", (e) => {
  ValidationMail(e);
  ValidationFirstName(e);
});
