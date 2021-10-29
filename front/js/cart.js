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
    });
}
function initialiserPanier() {
  ///recuperer les cookies///
  res = localStorage.panier;
  let panier = JSON.parse(res ? res : "[]");
  let total = 0;
  let totalQte = 0;

  let cart__items = document.getElementById("cart__items");
  // on vide les balises enfants de cart_items
  cart__items.innerHTML = "";
  // total = achat.quantite * achat.produit.price;
  panier.forEach((achat) => {
    let article = document.createElement("article");
    article.setAttribute("class", "cart__item");
    article.setAttribute("data-id", achat.produit._id);
    article.setAttribute("data-couleur", achat.couleur);

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
    titleH2.textContent = achat.produit.name + "(" + achat.couleur + ")";
    titleDiv2.appendChild(titleH2);
    let textP = document.createElement("p");
    textP.textContent = achat.produit.price + "€";
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
    /////modifier la quantite dans le panier

    let delet = document.createElement("div");
    delet.setAttribute("class", "cart__item__content__settings__delete");
    settings.appendChild(delet);
    let textDelete = document.createElement("p");
    textDelete.setAttribute("class", "deleteItem");
    delet.appendChild(textDelete);
    cart__items.appendChild(article);
    textDelete.textContent = "supprimer";
    textDelete.addEventListener("click", (e) => {
      removeArticle(e, panier);
    });

    let valeur = achat.quantite * achat.produit.price;
    total += valeur;
    totalQte += parseInt(achat.quantite);
    let totalQuantity = document.getElementById("totalQuantity");
    totalQuantity.textContent = totalQte;
    let totalPrice = document.getElementById("totalPrice");
    totalPrice.textContent = total;

    input.addEventListener("change", (e) => {
      total = 0;
      // on récupère la nouvelle valeur quanité
      let newQtyValue = e.target.value;
      // on récupère l'article  ou le qantité à été changé
      let articleBalise = e.target.closest(".cart__item");
      let idProduit = articleBalise.getAttribute("data-id");
      let couleurChoisi = articleBalise.getAttribute("data-couleur");

      // on cherche l'achat dans le panier
      modifPanier = panier.find(
        (achat) =>
          achat.produit._id == idProduit && achat.couleur == couleurChoisi
      );
      // on va modifier la valeur qty du modifP
      modifPanier.quantite = newQtyValue;
      // on sevaugarde le panier
      localStorage.panier = JSON.stringify(panier);
      //reinitialiser les infos de la page
      initialiserPanier();

      console.log(achat.quantite);
    });
  });
}

//validation formulaire
function ValidationMail(e) {
  var regex1 =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let isValid = true;

  var mail = document.getElementById("email").value;

  if (regex1.test(mail)) {
    errMsg.textContent = "";
  } else {
    errMsg.textContent = "Adresse mail non valide";
    isValid = false;
  }
  return isValid;
}
function ValidationFirstName(e) {
  let regex2 = /^[A-Za-z]+$/;
  let isValid = true;
  let nameForm = document.getElementById("firstName").value;
  let nameLastForm = document.getElementById("lastName").value;
  if (!regex2.test(nameForm)) {
    errMsgFirst.textContent = "Prénom non valide";
    isValid = false;
  } else {
    errMsgFirst.textContent = "";
  }
  if (!regex2.test(nameLastForm)) {
    errMsgLast.textContent = "Nom non valide";
    isValid = false;
  } else {
    errMsgLast.textContent = "";
  }
  return isValid;
}

let nameFirst = document.querySelector("input#firstName");
let nameLast = document.querySelector("input#lastName");
let adresse = document.querySelector("input#address");
let city = document.querySelector("input#city");
let email = document.querySelector("input#email");

function send(e) {
  res = localStorage.panier;
  let panier = JSON.parse(res ? res : "[]");
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contact: {
        firstName: nameFirst.value,
        lastName: nameLast.value,
        address: adresse.value,
        city: city.value,
        email: email.value,
      },
      products: panier.map((a) => a.produit._id),
    }),
  })
    .then((res) => res.json())
    .then((order) => {
      console.log(order);
      localStorage.panier = [];
      window.location = "confirmation.html?orderId=" + order.orderId;
    });
}

let form = document.querySelector(".cart__order__form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  res = localStorage.panier;
  let panier = JSON.parse(res ? res : "[]");
  let isMailValid = ValidationMail(e);
  let isNameValid = ValidationFirstName(e);
  if (panier.length == 0) {
    alert("Veuillez remplir votre panier");
  }
  //si le contenu du formulaire est valide et le panier n'est pas vide la commande sera envoyer
  if (isMailValid && isNameValid && panier.length != 0) {
    send(e);
  }
});

function removeArticle(e, panier) {
  let articleBalise = e.target.closest(".cart__item");
  let id = articleBalise.getAttribute("data-id");
  let couleurChoisi = articleBalise.getAttribute("data-couleur");

  newPanier = panier.filter(
    (achat) => achat.produit._id != id || achat.couleur != couleurChoisi
  );
  localStorage.panier = JSON.stringify(newPanier);
  initialiserPanier();
}

//code execution here:
initialiserPanier();
let a = 0;
console.log(a);
