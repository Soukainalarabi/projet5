const span = document.querySelector("span , #orderId");
function getIdFromParam() {
  /**Récuuper get parameteres **/
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get("orderId");
}

span.textContent = getIdFromParam();
