(()=>{const t=document.getElementById("items");fetch("http://localhost:3000/api/products/").then((t=>t.json())).then((e=>{e.forEach((e=>{let n=document.createElement("a");n.href="./product.html?id="+e._id;let r=document.createElement("article"),a=document.createElement("img"),i=document.createElement("h3"),l=document.createElement("p");a.src=e.imageUrl,a.alt=e.altTxt,i.textContent=e.name,l.textContent=e.description,r.appendChild(a),r.appendChild(i),r.appendChild(l),n.appendChild(r),t.appendChild(n)}))}))})(),(()=>{document.querySelector(".cart__item "),document.querySelector(".cart__item__content__titlePrice "),document.querySelector(".cart__item__content__titlePrice , p"),document.querySelector(".cart__item__content__settings__quantity , p");const t=document.querySelector("#emailErrorMsg"),e=document.querySelector("#firstNameErrorMsg"),n=document.querySelector("#lastNameErrorMsg");let r=document.querySelector("input#firstName"),a=document.querySelector("input#lastName"),i=document.querySelector("input#address"),l=document.querySelector("input#city"),o=document.querySelector("input#email");document.querySelector(".cart__order__form").addEventListener("submit",(c=>{c.preventDefault(),res=localStorage.panier;let d=JSON.parse(res||"[]"),u=function(e){let n=!0;var r=document.getElementById("email").value;return/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(r)?t.textContent="":(t.textContent="Adresse mail non valide",n=!1),n}(),m=function(t){let r=/^[A-Za-z]+$/,a=!0,i=document.getElementById("firstName").value,l=document.getElementById("lastName").value;return r.test(i)?e.textContent="":(e.textContent="Prénom non valide",a=!1),r.test(l)?n.textContent="":(n.textContent="Nom non valide",a=!1),a}();0==d.length&&alert("Veuillez remplir votre panier"),u&&m&&0!=d.length&&function(t){res=localStorage.panier;let e=JSON.parse(res||"[]");fetch("http://localhost:3000/api/products/order",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({contact:{firstName:r.value,lastName:a.value,address:i.value,city:l.value,email:o.value},products:e.map((t=>t.produit._id))})}).then((t=>t.json())).then((t=>{console.log(t),localStorage.panier=[],window.location="confirmation.html?orderId="+t.orderId}))}()})),function t(){res=localStorage.panier;let e=JSON.parse(res||"[]"),n=0,r=0,a=document.getElementById("cart__items");a.innerHTML="",e.forEach((i=>{let l=document.createElement("article");l.setAttribute("class","cart__item"),l.setAttribute("data-id",i.produit._id),l.setAttribute("data-couleur",i.couleur);let o=document.createElement("div");o.setAttribute("class","cart__item__img"),l.appendChild(o);let c=document.createElement("img");c.src=i.produit.imageUrl,c.alt=i.produit.altTxt,o.appendChild(c);let d=document.createElement("div");d.setAttribute("class","cart__item__content"),l.appendChild(d);let u=document.createElement("div");u.setAttribute("class","cart__item__content__titlePrice"),d.appendChild(u);let m=document.createElement("h2");m.textContent=i.produit.name+"("+i.couleur+")",u.appendChild(m);let s=document.createElement("p");s.textContent=i.produit.price+"€",u.appendChild(s);let p=document.createElement("div");p.setAttribute("class","cart__item__content__settings"),l.appendChild(p);let _=document.createElement("div");_.setAttribute("class","cart__item__content__settings__quantity"),p.appendChild(_);let g=document.createElement("p");g.textContent="Qte:",_.appendChild(g);let h=document.createElement("input");h.setAttribute("type","number"),h.setAttribute("class","itemQuantity"),h.setAttribute("name","itemQuantity"),h.setAttribute("min","1"),h.setAttribute("max","100"),h.setAttribute("value",i.quantite),_.appendChild(h);let y=document.createElement("div");y.setAttribute("class","cart__item__content__settings__delete"),p.appendChild(y);let C=document.createElement("p");C.setAttribute("class","deleteItem"),y.appendChild(C),a.appendChild(l),C.textContent="supprimer",C.addEventListener("click",(n=>{!function(e,n){let r=e.target.closest(".cart__item"),a=r.getAttribute("data-id"),i=r.getAttribute("data-couleur");newPanier=n.filter((t=>t.produit._id!=a||t.couleur!=i)),localStorage.panier=JSON.stringify(newPanier),t()}(n,e)}));let E=i.quantite*i.produit.price;n+=E,r+=parseInt(i.quantite),document.getElementById("totalQuantity").textContent=r,document.getElementById("totalPrice").textContent=n,h.addEventListener("change",(r=>{n=0;let a=r.target.value,l=r.target.closest(".cart__item"),o=l.getAttribute("data-id"),c=l.getAttribute("data-couleur");modifPanier=e.find((t=>t.produit._id==o&&t.couleur==c)),modifPanier.quantite=a,localStorage.panier=JSON.stringify(e),t(),console.log(i.quantite)}))}))}()})();