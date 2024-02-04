const carrito = []
const botonCarrito = document.querySelector("#boton-carrito")
const container = document.getElementById("container")
const inputBuscar = document.querySelector("input#input-search")




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
            localStorage.setItem("miCarrito", JSON.stringify(carrito))
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

// busqueda

inputBuscar.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && inputBuscar.value.trim() !== "") {
        const productosFiltrados = productos.filter(producto => producto.nombre.toUpperCase().includes(inputBuscar.value.toUpperCase().trim()))
        cargarProductos(productosFiltrados)
    } else {
        cargarProductos(productos)
    }
})

inputBuscar.addEventListener("input", () => {
    if(inputBuscar.value.trim() == "") {
        cargarProductos(productos)
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

*/










