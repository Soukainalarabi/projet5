(()=>{const e=document.getElementById("items");fetch("http://localhost:3000/api/products/").then((e=>e.json())).then((t=>{t.forEach((t=>{let n=document.createElement("a");n.href="./product.html?id="+t._id;let d=document.createElement("article"),c=document.createElement("img"),l=document.createElement("h3"),a=document.createElement("p");c.src=t.imageUrl,c.alt=t.altTxt,l.textContent=t.name,a.textContent=t.description,d.appendChild(c),d.appendChild(l),d.appendChild(a),n.appendChild(d),e.appendChild(n)}))}))})();