class Compra {
    constructor(arrayCarrito) {
        this.carrito = arrayCarrito
    }

    obtenerTotal() {
        if(this.carrito.length > 0) {
            let total = this.carrito.reduce((acumulador, item) => acumulador + item.precio, 0)
            return total
        }
    }
}
