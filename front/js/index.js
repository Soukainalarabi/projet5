////on récupère la section a partir du DOM et on va injecter dans cette section la liste des produits qu'on a récupéré a partir de l API
const contentProducts = document.querySelector("section");
///Récupérer tous les produits///
async function afficherProduits() {
  await fetch("http://localhost:3000/api/products/")
    .then((res) => res.json())
    .then(injectProduits);
}
////injecter les produits dans le HTML
function injectProduits(kanapes) {
  kanapes.forEach((kn) => {
    contentProducts.innerHTML += `<a href="./product.html?id=${kn._id}">
    <article>
      <img src=${kn.imageUrl} alt=${kn.altTxt}>
      <h3 class="productName">${kn.name}</h3>
      <p class="productDescription">${kn.description}</p>
    </article>
  </a> `;
  });
}
afficherProduits();
