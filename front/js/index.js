const contentProducts = document.querySelector("section");
///Afficher tous les produits///
async function afficherProduits() {
  await fetch("http://localhost:3000/api/products/")
    .then((res) => res.json())
    .then((kanapes) => {
      kanapes.forEach((kn) => {
        contentProducts.innerHTML += `<a href="./product.html?id=${kn._id}">
        <article>
          <img src=${kn.imageUrl} alt=${kn.altTxt}>
          <h3 class="productName">${kn.name}</h3>
          <p class="productDescription">${kn.description}</p>
        </article>
      </a> `;
      });
    });
}
afficherProduits();
