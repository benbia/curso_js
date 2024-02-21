function recuperarCarrito() {
    return JSON.parse(localStorage.getItem("miCarrito")) || [] // falsy (operador logico ||)
}

const productos = []
const carrito = recuperarCarrito()
const URL = "script/productos.json"

const botonCarrito = document.querySelector("#boton-carrito")
const container = document.getElementById("container")
const inputBuscar = document.querySelector("input#input-search")

const imagenLoading = `<img class="loading-img" src="img/loading.gif" alt="#">`

function notificar(producto) {
    Toastify({
        text: `${producto.nombre} ha sido agregado a tu carrito`,
        duration: 3000,
        style: {
            background: "linear-gradient(90deg, rgba(92,195,40,1) 0%, rgba(42,191,38,1) 100%)",
            padding: "2rem 2.5rem",
        },
        gravity: "bottom",
        close: true,

        }).showToast();
}

function retornarCardError () {
    return container.innerHTML = `<div class="cardError animate__animated animate__zoomIn">
    <i class='bx bx-error-circle errorIcon'></i>
    <p class="p-error">Los sentimos, pero no hemos podido encontrar el producto que buscaste</p>
    </div>`
}

function mostrarCardHTML(arrayProductos) {
    container.innerHTML = ""

    arrayProductos.forEach(producto => {
        container.innerHTML += `<div class="card card-shadow animate__animated animate__zoomIn ">
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
            notificar(productoElegido)
        })
        
    }
}

function cargarProductos(arrayProductos) {
    if (arrayProductos.length > 0) {
        mostrarCardHTML(arrayProductos)
        activarBotonesCompra()
    } else {
        setTimeout(()=> {
            retornarCardError()
        }, Math.random()*900) 
    }
}


async function obtenerProductos() {
    try {
        const response = await fetch(URL)
        if(response.ok === true) {
            const data = await response.json() // encuentra el array de objetos y lo retorna como js (lo transforma de json a js)
            productos.push(...data)
            cargarProductos(productos)
        } else {
            throw new Error("No se pudo obtener los productos " + "(" + response.status + ")")
        }
        
    } catch (error) {
        console.error(error)
    }
}

obtenerProductos()

// function obtenerProductos() { // como son todas cosas asincronicas espera a que se termine una para pasar a la otra, por eso el then
//     fetch(URL)
//     .then(response => {
//         if(response.ok === true) {
//             return response.json() // encuentra el array de objetos y lo retorna como js (lo transforma de json a js)
//         } else {
//             throw new Error("No se pudo obtener los productos " + "(" + response.status + ")")
//         }
//     }) 
//     .then(data => productos.push(...data)) // los tres puntitos es para subir todos los objetos del array de una (ya estaba en js)
//     .then(() => cargarProductos(productos))
//     .catch(error => console.error(error)) // por si pasa algo con error --> comunmente no deberia verse solamente en la consola el error
// }

// obtenerProductos()

// boton del carrito

botonCarrito.addEventListener("mousemove", () => {
    if (carrito.length > 1) {
        botonCarrito.title = "Ir al Carrito"
    } else {
        botonCarrito.title = "No hay productos en el carrito"
    }
})

function carritoVacio() {
    Swal.fire({
        icon:'warning',
        title: "Debes agregar al menos un producto a tu carrito",
        confirmButtonText: 'Entendido'
    })
}

botonCarrito.addEventListener("click", () => {
    if (carrito.length > 0) {
        location.href = "checkout.html"
    } else {
        carritoVacio()
    }
})

// busqueda

inputBuscar.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && inputBuscar.value.trim() !== "") {
        const productosFiltrados = productos.filter(producto => producto.nombre.toUpperCase().includes(inputBuscar.value.toUpperCase().trim()))
        container.innerHTML = imagenLoading

        setTimeout(()=> {
            cargarProductos(productosFiltrados)
        }, Math.random()*900)

    }
})

inputBuscar.addEventListener("input", () => {
    inputBuscar.value.trim() == "" && cargarProductos(productos) // si se cumple lo de elvalor "" entonces... (operador logico &&)
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









