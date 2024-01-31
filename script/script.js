const carrito = []
const botonCarrito = document.querySelector("#boton-carrito")
const container = document.getElementById("container")

function retornarCardError () {
    return container.innerHTML = `<div class="cardError">
    <i class='bx bx-error-circle errorIcon'></i>
    <p class="p-error">Los sentimos, pero no hemos podido encontrar el producto que buscaste</p>
    </div>`
}

function mostrarCardHTML(arrayProductos) {
    container.innerHTML = ""

    arrayProductos.forEach(producto => {
        container.innerHTML += `<div class="card card-shadow">
        <div class="card-image"><img src= ${producto.img} alt="#"></div>
        <div class="card-name">${producto.nombre}</div>
        <div class="card-price">USD ${producto.precio}</div>
        <button id="${producto.id}" class="card-comprar">Comprar</button>
    </div>`
    });

}

function activarBotonesCompra() {
    const botonesComprar = document.querySelectorAll("button.card-comprar")
    for (let boton of botonesComprar) {
        boton.addEventListener("click", () => {
            const productoElegido = productos.find((producto) => producto.id === parseInt(boton.id))
            carrito.push(productoElegido)
        })
        
    }
}

function cargarProductos(arrayProductos) {
    if (arrayProductos.length > 0) {
        mostrarCardHTML(arrayProductos)
        activarBotonesCompra()
    } else {
        return retornarCardError()
    }
}

cargarProductos(productos)

// boton del carrito

botonCarrito.addEventListener("mousemove", () => {
    if (carrito.length > 1) {
        botonCarrito.title = "Hay " + carrito.length + " productos en tu carrito"
    } else if (carrito.length === 1){
        botonCarrito.title = "Hay " + carrito.length + " producto en tu carrito"
    } else {
        botonCarrito.title = "No hay productos en el carrito"
    }
})

botonCarrito.addEventListener("click", () => {
    if (carrito.length > 0) {
        location.href = "checkout.html"
    } else {
        alert("No hay productos en tu carrito")
    }
})


// 

/* 
function filtrarPorMarca() {
    let marcaAFiltrar = prompt("¿Qué marca deseas buscar?")

    if(marcaAFiltrar !== null || marcaAFiltrar !== ""){
        const itemsFiltrados = productos.filter(producto => producto.marca.toUpperCase() === marcaAFiltrar.trim().toUpperCase())
        
        if (itemsFiltrados.length > 0) {
            console.table(itemsFiltrados)
        } else {
            console.warn("Disculpe no tenemos productos de esa marca")
        }

    } else {
        console.alert("Porfavor ingrese una marca válida")
    }
    
}



function comprar() {
    let idUsuario = parseInt(prompt("Ingrese el identificador del artículo a comprar"))

    let articuloSeleccionado = buscarPorId(idUsuario)

    if (articuloSeleccionado === undefined) {
        console.error("Ha habido un error buscando su articulo seleccionado")
    } else {
        carrito.push(articuloSeleccionado)
        alert("Se agregó " + articuloSeleccionado.nombre + " correctamente al carrito")

        let seguirComprando = confirm("¿Desea seguir comprando?")

        if(seguirComprando === true) {
            console.clear()
            console.table(carrito)
            comprar()
        } else {
            console.clear()
            console.table(carrito)
            const compraCompletada = new Compra(carrito)
            console.log("El total de su compra es de US$", compraCompletada.obtenerTotal().toLocaleString("es-UY"))
            alert("Muchas gracias por comprar con nosotros!")
        }
    }
}

*/










