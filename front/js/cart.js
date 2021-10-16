const product = document.querySelector(".cart__item ");
const image = document.querySelector(".cart__item__img");
const name = document.querySelector(".cart__item__content__titlePrice ");
const price = document.querySelector(".cart__item__content__titlePrice , p");
const quantite = document.querySelector(
  ".cart__item__content__settings__quantity , p"
);
const input = document.querySelector("input[type=number]");
console.log(name);
achatProduct(() => {
  const myHeaders = new Headers();
  const init = {
    method: "GET",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
  };
  fetch("http://localhost:3000/api/cart/" + id, init)
    .then((res) => res.json())
    .then((kanape) => {
      let imageNode = document.createElement("img");
      imageNode.src = kanape.imageUrl;
      imageNode.alt = imageNode.altTxt;
      image.appendChild(imageNode);
      name.h2.textContent = kanape.name;
      name.p.textContent = kanape.price;
    });
  achatProduct();
  //   const init2 = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       pseudo: "",
  //       message: "",
  //     }),
  //     mode: "cors",
  //     creadentials: "same-origin",
  //   };
  //   document.querySelector("form").addEventListener("submit",()=>{
  //       feetch("http://localhost:3000/api/products/" + id, init2).then(()=>
  //       console.log("message envoyé")
  //   );
  //     });
});
