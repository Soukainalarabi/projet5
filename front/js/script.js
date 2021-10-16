const items = document.getElementById("items");
// console.log(arr);
function products() {
  fetch("http://localhost:3000/api/products/")
    .then((res) => res.json())
    .then((kanapes) => {
      //   for (i = 0; i < kanapes.length; i++) {
      //     console.log(kanapes[i].name);
      //   }
      //   for (index in kanapes) {
      //     console.log("name2: " + kanapes[index].name);
      //   }
      kanapes.forEach((kn) => {
        let a = document.createElement("a");
        a.href = "./product.html?id=" + kn._id;
        let article = document.createElement("article");
        let img = document.createElement("img");
        let h3 = document.createElement("h3");
        let p = document.createElement("p");

        img.src = kn.imageUrl;
        img.alt = kn.altTxt;
        h3.textContent = kn.name;
        p.textContent = kn.description;
        article.appendChild(img);
        article.appendChild(h3);
        article.appendChild(p);
        a.appendChild(article);
        items.appendChild(a);
      });
    });
}
products();
// function detailProduct() {
//   fetch("http://localhost:3000/api/products/_id").then((res) => res.json());
// }

// detailProduct();

