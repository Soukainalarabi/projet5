const span = document.querySelector("span , #orderId");
/**Récuuper get parameteres **/
function getIdFromParam() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get("orderId");
}
span.textContent = getIdFromParam();
