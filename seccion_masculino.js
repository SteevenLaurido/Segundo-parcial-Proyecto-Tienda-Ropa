const addToShoppingCartButtons = document.querySelectorAll('.agregar-carrito-compras'); //Traera todos los archivos de la clase del boton agregar-carrito-compras

addToShoppingCartButtons.forEach((addToCartButton) => { //funcion flecha
    addToCartButton.addEventListener('click', addToCartClicked);

});
const comprarButton = document.querySelector('.comprarButton')
comprarButton.addEventListener('click', comprarButtonClicked);

const shoppingCartItemsContainer = document.querySelector('.shoppingCartItemsContainer');


function addToCartClicked(event) {
    const button = event.target;//captura el "evento" en la constante button
    //console.log("🚀 ~ file: tienda.js ~ line 11 ~ addToCartClicked ~ button", button) //Ver por consola si se leen los botones
    const item = button.closest('.item');//elemento mas cercan de la clase item.
    //console.log("🚀 ~ file: tienda.js ~ line 13 ~ addToCartClicked ~ item", item) //Ver por consola si se leen los botones

    const itemTitle = item.querySelector('.nombre-producto').textContent;//Captura el item de la clase nombre-producto, osea el titulo
    const itemPrice = item.querySelector('.precio-producto').textContent;//Captura el item de la clase precio-producto, captura el precio
    const itemImage = item.querySelector('.imagen-producto').src;//Captura el item de la clase precio-producto, captura la imagen

    //console.log("🚀 ~ file: tienda.js ~ line 16 ~ addToCartClicked ~ itemTitle", itemTitle, itemPrice)

    addItemToShoppingCart(itemTitle, itemPrice, itemImage); //Funcion que recoge las tres variables creadas antes.

}

function addItemToShoppingCart(itemTitle, itemPrice, itemImage) {

    //console.log(itemTitle,itemPrice,itemImage); //Revisar por consolar que si funciona la funcion.
    const elementsTitle = shoppingCartItemsContainer.getElementsByClassName(
        'shoppingCartItemTitle'
    ); //Coja todas las clases que tengan shoppingCartItemTitle


    for (let i = 0; i < elementsTitle.length; i++) { //Buclefor para comparar los elementos con el itemTitle
        if (elementsTitle[i].innerText === itemTitle) {

            //elementsTitle[i].parentElement.parentElement.parentElement.querySelector('.shoppingCartItemQuantity')
            let elementQuantity = elementsTitle[i].parentElement.parentElement.parentElement.querySelector('.shoppingCartItemQuantity');
            elementQuantity.value++;
            updateShoppingCartTotal();//esta funcion permitira que se sumen correctamente los productos.
            return; //retorna a la funcion para que no se repitan los productos

        }

    }

    const shoppingCartRow = document.createElement('div');//Para meter una fila
    const shoppingCartContent =  //crear elemento.
        `
    <div class="row shoppingCartItem">
          <div class="col-6">
              <div class="carrito-compras-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                  <img src=${itemImage} class="carrito-compras-image">
                  <h6 class="carrito-compras-nombre-producto shoppingCartItemTitle text-truncate ml-3 mb-0">${itemTitle}</h6>
              </div>
          </div>
          <div class="col-2">
              <div class="carrito-compras-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                  <p class="precio-producto mb-0 shoppingCartItemPrice">${itemPrice}</p>
              </div>
          </div>
          <div class="col-4">
              <div
                  class="carrito-compras-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                  <input class="carrito-compras-quantity-input shoppingCartItemQuantity" type="number"
                      value="1">
                  <button class="btn btn-danger buttonDelete" type="button">X</button>
              </div>
          </div>
      </div>`;

    shoppingCartRow.innerHTML = shoppingCartContent;
    shoppingCartItemsContainer.append(shoppingCartRow);

    shoppingCartRow
        .querySelector('.buttonDelete')
        .addEventListener('click', removeShoppingCartItem);
    shoppingCartRow.querySelector('.shoppingCartItemQuantity').
        addEventListener('change', quantityChanged);

    updateShoppingCartTotal() //Funcion para que sume los precios de los productos

}



function updateShoppingCartTotal() {
    let total = 0;
    const shoppingCartTotal = document.querySelector('.shoppingCartTotal');
    //console.log("🚀 ~ file: tienda.js ~ line 63 ~ updateShoppingCartTotal ~ shoppingCartTotal", shoppingCartTotal)
    const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');//selecciona todos los elementos que tenga relacion con shoppingCartItem

    shoppingCartItems.forEach(shoppingCartItem => { //Captura solo el elemento
        const shoppingCartItemPriceElement = shoppingCartItem.querySelector('.shoppingCartItemPrice');
        //console.log("🚀 ~ file: tienda.js ~ line 68 ~ updateShoppingCartTotal ~ shoppingCartItemPriceElement", shoppingCartItemPriceElement)
        const shoppingCartItemPrice = Number(shoppingCartItemPriceElement.textContent.replace('$', ' ')); //Captura el precio
        //console.log("🚀 ~ file: tienda.js ~ line 70 ~ updateShoppingCartTotal ~ shoppingCartItemPrice", shoppingCartItemPrice)
        const shoppingCartItemQuantityElement = shoppingCartItem.querySelector('.shoppingCartItemQuantity');
        const shoppingCartItemQuantity = Number(shoppingCartItemQuantityElement.value);
        //console.log("🚀 ~ file: tienda.js ~ line 73 ~ updateShoppingCartTotal ~ shoppingCartItemQuantity", shoppingCartItemQuantity)

        total = total + shoppingCartItemPrice * shoppingCartItemQuantity;//Realiza la suma de los valores 
        //console.log("🚀 ~ file: tienda.js ~ line 76 ~ updateShoppingCartTotal ~ total", total)
    });
    shoppingCartTotal.innerHTML = `${total.toFixed(2)}$`;//tofixed para dejarlo en 2 decimales
}



function removeShoppingCartItem(event) {
    const buttonClicked = event.target;
    buttonClicked.closest('.shoppingCartItem').remove();
    updateShoppingCartTotal();
}

function quantityChanged(event) {
    const input = event.target;
    if (input.value <= 0) { //validacion para que la cantidad  de productos no sea negativo
        input.value = 1;

    }
    //input.value <= 0 ? (input.value = 1) : null;
    updateShoppingCartTotal();
}

function comprarButtonClicked() {//Estafuncion deja en blanco los valores despues de comprar

    shoppingCartItemsContainer.innerHTML = '';
    updateShoppingCartTotal();
}