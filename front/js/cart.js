const produitContent = document.querySelector("#cart__items");
const image = document.querySelector(".cart__item__img");
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
  produitContent.innerHTML = "";
  // total = article.quantite * achat.produit.price;
  panier.forEach((article) => {
    produitContent.innerHTML += `<article class="cart__item" data-id=${article.produit._id} data-couleur=${article.couleur}>
<div class="cart__item__img">
  <img src=${article.produit.imageUrl} alt=${article.produit.altTxt}> 
 </div>
<div class="cart__item__content">
  <div class="cart__item__content__titlePrice">
    <h2>${article.produit.name}</h2>
    <h3>${article.couleur}</h3>

    <p>${article.produit.price} €</p>
  </div>
  <div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity">
      <p>Qté : </p>
      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${article.quantite}>
    </div>
    <div class="cart__item__content__settings__delete">
      <p class="deleteItem">Supprimer</p>
    </div>
  </div>
</div>
</article>`;
    let valeur = article.quantite * article.produit.price;
    total += valeur;
    totalQte += parseInt(article.quantite);
    let totalQuantity = document.getElementById("totalQuantity");
    totalQuantity.textContent = totalQte;
    let totalPrice = document.getElementById("totalPrice");
    totalPrice.textContent = total;
  });
  const inputQty = document.querySelectorAll(".itemQuantity");
  inputQty.forEach((input) => {
    input.addEventListener("change", (e) => {
      total = 0;
      // on récupère la nouvelle valeur quanité
      let newQtyValue = e.target.value;
      // on récupère l'article  ou le qantité à été changé
      let articleBalise = e.target.closest(".cart__item");
      let idProduit = articleBalise.getAttribute("data-id");
      let couleurChoisi = articleBalise.getAttribute("data-couleur");

      // on cherche l'article dans le panier
      let articleTrouve = panier.find(
        (article) =>
          article.produit._id == idProduit && article.couleur == couleurChoisi
      );
      // on va modifier la valeur qty de l'articleTrouve
      articleTrouve.quantite = newQtyValue;
      // on enregistre les modifications du panier
      localStorage.panier = JSON.stringify(panier);
      //reinitialiser les infos de la page
      initialiserPanier();
    });
  });
  /////Supprimer un article à partir du panier
  const deleteBtns = document.querySelectorAll(".deleteItem");
  deleteBtns.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", (e) => {
      removeArticle(e, panier);
    });
  });
}

///////////////validation formulaire
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
//envoyer la commande vers le back
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

  //on filtre que les produits qui n'ont pas la meme couleur ou   qui n'ont pas le meme id. c'est a dire on supprime les produits qui ont le meme id et la meme couleur.
  panierFiltre = panier.filter(
    (achat) => achat.produit._id != id || achat.couleur != couleurChoisi
  );
  localStorage.panier = JSON.stringify(panierFiltre);
  initialiserPanier();
}

//code execution here:
initialiserPanier();
