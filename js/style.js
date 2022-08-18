class Productos{
    constructor(id, nombre, precio, foto){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.foto = foto;
    }
}

class ContenidoDelcarro{
    constructor(producto, cantidad) {
        this.producto = producto;
        this.cantidad = cantidad;
    }
}

//array del carro

const Producto = [];
const contenidosDelcarro = [];

const contenedordeProductos = 
    document.getElementById('contenedor-productos').getElementsByClassName('row');

const rowContenedorProductos = contenedordeProductos[0];

const contenedorDeCarrito = document.querySelector("#items");

//ejecucion de funciones

agregarProductos();
meterAlCarrito();
cargarAlcarrito();
crearCatalogoProductos();

//funciones

function agregarProductos() {
    Producto.push(new Productos(1, "Helados", 1000, "../img/frutos del bosque.jpg"));
    Producto.push(new Productos(2, "Paletas", 800, "../img/paleta 2.jpg"));
    Producto.push(new Productos(3, "Tortas heladas", 2500, "../img/torta oreo.jpg"));
    Producto.push(new Productos(4, "Trufas", 900, "../img/trufas 2.jpg"));
}

function meterAlCarrito() {
    let contenidoCarro = new ContenidoDelcarro(
        new Productos(1, "Helados", 1000, "../img/frutos del bosque.jpg"),
        1
    );

    contenidosDelcarro.push(contenidoCarro);
}

function cargarAlcarrito() {
    let renglonesDecarrito = "";
   
    contenidosDelcarro.forEach(
        (elemento) => {
            renglonesDecarrito+=`
                <tr>
                    <td${elemento.producto.id}></td>
                    <td${elemento.producto.nombre}></td>
                    <td${elemento.cantidad}></td>
                    <td$ ${elemento.producto.precio}></td>
                </tr>
            `;
        }
    
    );
    
    contenedorDeCarrito.innerHTML = renglonesDecarrito;
}

//cartas Dom y eventos

function crearCarta(cartaProducto) {
    //boton
    let agregarBoton = document.createElement("button");
    agregarBoton.className = "btn btn-primary";
    agregarBoton.innerText = "Agregar";
    
    //cuerpo de carta

    let cuerpoDecarta = document.createElement ("div");
    cuerpoDecarta.className = "card-body";
    cuerpoDecarta.innerHTML = `
    <h5>${cartaProducto.nombre}</h5>
    <p>$${cartaProducto.precio}</p>
    `;
    cuerpoDecarta.append(agregarBoton);

    //foto
    let FotoProducto = document.createElement("img");
    FotoProducto.src = cartaProducto.foto;
    FotoProducto.className = "card-img-top";
    FotoProducto.alt = cartaProducto.nombre;
    
    //card

    let carta = document.createElement("div");
    carta.className = "card";
    carta.append(FotoProducto);
    carta.append(cuerpoDecarta);

    //contenedor de la carta
    let contenedorDecarta = document.createElement("div");
    contenedorDecarta.className = "col-xs-6 col-sm-3 col-md-2";
    contenedorDecarta.append(carta);
    
    //eventos
    agregarBoton.onclick = () =>{
       let carritoElemento = new ContenidoDelcarro(cartaProducto, 1);
       contenidosDelcarro.push(carritoElemento);
       
       cargarAlcarrito();
    }

    return contenedorDecarta;

}

function crearCatalogoProductos() {
    rowContenedorProductos.innerHTML = "";
    Producto.forEach(
        (elementoProdu) => {
            let contenedorDecarta = crearCarta(elementoProdu);
            
            rowContenedorProductos.append(contenedorDecarta);
        }
    );
}