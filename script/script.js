const carrito = []

const productos = [
    {id: 1, marca:"Apple", nombre: "IPhone 15", precio: 1351},
    {id: 2, marca:"Apple", nombre: "IPhone 14", precio: 1149},
    {id: 3, marca:"Apple", nombre: "IPhone 13", precio: 1049},
    {id: 4, marca:"Samsung", nombre: "Galaxy S24", precio: 1300},
    {id: 5, marca:"Samsung", nombre: "Galaxy A15", precio: 259},
    {id: 6, marca:"Samsung", nombre: "Galaxy A54", precio: 448},
    {id: 7, marca:"Apple", nombre: "Apple Watch Series 8", precio: 679},
    {id: 8, marca:"Apple", nombre: "Apple Watch Series 7", precio: 524},
    {id: 9, marca:"Samsung", nombre: "Galaxy Fit 2", precio: 49},
    {id: 10, marca:"Samsung", nombre: "Galaxy Watch 5", precio: 219}
]

const carritoPrueba = [
    {id: 2, marca:"Apple", nombre: "IPhone 14", precio: 1149},
    {id: 3, marca:"Apple", nombre: "IPhone 13", precio: 1049},
    {id: 4, marca:"Samsung", nombre: "Galaxy S24", precio: 1300}
]

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

function buscarPorId(codigo) {
    const articuloSeleccionado = productos.find((producto) => producto.id === codigo)
    return articuloSeleccionado
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













