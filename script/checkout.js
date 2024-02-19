

function recuperarCarrito() {
    return JSON.parse(localStorage.getItem("miCarrito"))
}

const carrito = recuperarCarrito()
const containerCheckout = document.querySelector(".table-div")
const containerTotal = document.querySelector(".total-div")
const btnComprar = document.querySelector(".boton-comprar")
const btnVolver = document.querySelector(".goBack")

btnVolver.addEventListener("click", () => history.back())

function mostrarFilaHTMLCheckout(arrayProductos) {
    containerCheckout.innerHTML = ""

    arrayProductos.forEach(producto => {
        containerCheckout.innerHTML += `<div class="checkout-product">
        <div class="checkout-data checkout-img no-seleccionable"><img src="${producto.img}" alt=""></div>
        <div class="checkout-data checkout-name no-seleccionable">${producto.nombre}</div>
        <div class="checkout-data checkout-price no-seleccionable">USD ${producto.precio}</div>
        <!-- <div class="checkout-data checkout-cantidad no-seleccionable"><div class="plus">+</div><div class="number">1</div><div class="less">-</div></div> -->
    </div>`
    });

    const newCarrito = new Compra(arrayProductos)
    containerTotal.innerHTML = `Total:<div class="div-precio-total">USD ${newCarrito.obtenerTotal()}</div>`


}

// agregar boton de eliminar <div id="${producto.id}" class="checkout-data checkout-delete no-seleccionable"><i class='bx bxs-trash delete-icon'></i></div>

function compraFinalizada() {
    Swal.fire({
        icon:'success',
        title: "Compra finalizada!",
        text: "Gracias por comprar con nosotros"
    })
}

btnComprar.addEventListener("click", () => {
        compraFinalizada()
        localStorage.removeItem("miCarrito")
        carrito.lenght = 0
        btnComprar.setAttribute("disabled", "true")
})


mostrarFilaHTMLCheckout(carrito)