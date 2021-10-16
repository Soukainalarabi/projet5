let itemImage = document.querySelector(".item .item__img");
let name = document.getElementById("title");
let prix = document.getElementById("price");
let description = document.getElementById("description");
let colors = document.getElementById("colors");
const inputQuantite = document.querySelector('input[type = "number"]');
// let card = document.getElementById("addToCart");
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
        // on crée l'option a partir de la couleur
        let option = document.createElement("option");
        option.textContent = color;
        option.value = color;
        // on attache l'option créer avec Select colors element
        colors.appendChild(option);
        product = kanape;
      });
    });
  // const init2 = {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     // contact:{}
  //     // produits:[]
  //   }),
  //   mode: "cors",
  //   Credential: "same-origin",
  // };
  document.querySelector("#addToCart").addEventListener("click", () => {
    const qty = inputQuantite.value;
    const valeurCouleur = colors.value;
    console.log(product);
  });
}

function clickEvent() {}

getProduct();

function getIdFromParam() {
  /**Récuuper get parameteres **/
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get("id");
}
