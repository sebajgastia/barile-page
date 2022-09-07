class Producto {
    constructor(id, nombre, precio, foto) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.foto = foto;
    }
}

class ElementoCarrito {
    constructor(producto, cantidad) {
        this.producto = producto;
        this.cantidad = cantidad;
    }
}


 // Definiciones

const estandarPesosArgentinos = Intl.NumberFormat('en-AR');

//Arrays del carro
const productos = [];

let elementosCarrito = [];

const contenedorProductos = document.getElementById('contenedor-productos');

const contenedorCarritoCompras = document.querySelector("#items")

const contenedorFooterCarrito = document.querySelector("#footer");

//ejecucion funcion

cargarProductos();
cargarCarrito();
dibujarCarrito();
dibujarCatalogoProductos();

//funciones

function cargarProductos() {
    productos.push(new Producto(1, 'Helados', 1000, '../img/frutos del bosque.jpg'));
    productos.push(new Producto(2, 'Paletas', 600, '../img/paleta 2.jpg'));
    productos.push(new Producto(3, 'Postres', 2500, '../img/torta oreo.jpg'));
    productos.push(new Producto(4, 'Trufas', 800, '../img/trufas 2.jpg'));
}
function cargarCarrito() {
}

function dibujarCarrito() {

    let sumaCarrito = 0;
    contenedorCarritoCompras.innerHTML = "";

    elementosCarrito.forEach(
        (elemento) => {
            let renglonesCarrito= document.createElement("tr");
            
            renglonesCarrito.innerHTML = `
                <td>${elemento.producto.id}</td>
                <td>${elemento.producto.nombre}</td>
                <td><input id="cantidad-producto-${elemento.producto.id}" type="number" value="${elemento.cantidad}" min="1" max="100" step="1" style="width: 55px;"/></td>
                <td>$ ${elemento.producto.precio}</td>
                <td>$ ${estandarPesosArgentinos.format(elemento.producto.precio*elemento.cantidad)}</td>
                <td><button id="eliminar-producto-${elemento.producto.id}" type="button" class="btn btn-danger"><i class="bi bi-trash-fill"></i></button></td>
            `;

            contenedorCarritoCompras.append(renglonesCarrito);

            sumaCarrito+=elemento.cantidad*elemento.producto.precio;

            //agregamos evento a carrito
            let cantidadProductos = document.getElementById(`cantidad-producto-${elemento.producto.id}`);
            
            cantidadProductos.addEventListener("change", (e) => {
                let nuevaCantidad = e.target.value;
                elemento.cantidad = nuevaCantidad;
                dibujarCarrito();
            });

            let borrarProducto = document.getElementById(`eliminar-producto-${elemento.producto.id}`);

            borrarProducto.addEventListener("click", () => {
                removerProductoCarrito(elemento);
                dibujarCarrito();
            });

        }
    );

    //contenedorCarritoDecompras = renglonesCarrito;
    
   /* if(elementosCarrito.length == 0) {
        contenedorFooterCarrito.innerHTML = `
            <th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>
        `;
    } else {
        contenedorFooterCarrito.innerHTML = `
            <th scope="row" colspan="5">Total de la compra: $${estandarPesosArgentinos.format(sumaCarrito)}</th>
        `;
    }*/
    
    //Operadores ternarios

    elementosCarrito.length == 0 ? contenedorFooterCarrito.innerHTML=`
    <th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>
    `:contenedorFooterCarrito.innerHTML = `
    <th scope="row" colspan="5">Total de su compra:$${estandarPesosArgentinos.format(sumaCarrito)}</th>

    `;

    //storage

    localStorage.setItem("carro", JSON.stringify (elementosCarrito));
    
    if(localStorage.getItem("carro") !=null){
        elementosCarrito=JSON.parse(localStorage.getItem("carro"));
    }
}

//funcion para carta  

function removerProductoCarrito(elementoAEliminar) {
    const elementosAMantener = elementosCarrito.filter((elemento) => elementoAEliminar.producto.id != elemento.producto.id);
    elementosCarrito.length = 0;

    elementosAMantener.forEach((elemento) => elementosCarrito.push(elemento));
}

function crearCard(producto) {
    //Botón
    let botonAgregar = document.createElement("button");
    botonAgregar.className = "btn btn-success";
    botonAgregar.innerText = "Agregar al carro";


    //Card body
    let cuerpoCarta = document.createElement("div");
    cuerpoCarta.className = "card-body";
    cuerpoCarta.innerHTML = `
        <h5>${producto.nombre}</h5>
        <p>$ ${producto.precio}</p>
    `;
    cuerpoCarta.append(botonAgregar);

    //Imagen
    let imagen = document.createElement("img");
    imagen.src = producto.foto;
    imagen.className = "card-img-top";
    imagen.alt = producto.nombre;

    //Card
    let carta = document.createElement("div");
    carta.className = "card m-2 p-2";
    carta.style = "width: 18rem";
    carta.append(imagen);
    carta.append(cuerpoCarta);


    //Eventos y Librerias
    botonAgregar.onclick = () => {

        let elementoExistente = elementosCarrito.find((elemento) => elemento.producto.id == producto.id);

        if(elementoExistente) {
            elementoExistente.cantidad+=1;
        } else {
            let elementoCarrito = new ElementoCarrito(producto, 1);
            elementosCarrito.push(elementoCarrito);
        }

        dibujarCarrito();

        swal.fire({
            title: "¡Agregaste un producto al carro!",
            text: `Agregaste el producto: ${producto.nombre} `,
            icon: "success",

        }).then((irACarrito) => {

            if(irACarrito) {
                //swal("Vamos al carrito!");
                const myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {keyboard: true});
                const modalToggle = document.getElementById('toggleMyModal'); 
                myModal.show(modalToggle);

            }
        });

    } 
    
    return carta;

}

function dibujarCatalogoProductos() {
    contenedorProductos.innerHTML = "";

    productos.forEach(
        (producto) => {
            let contenedorCarta = crearCard(producto);
            contenedorProductos.append(contenedorCarta);
        }
    );

}


let finalizar=document.getElementById("finalizar");
finalizar.onclick=()=>{
    Swal.fire({
        title: 'Gracias!!',
        text: 'En breve te contactamos!',
        imageUrl: '../img/graciasportucompra.jpg',
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: 'Custom image',
      })
}    

/*const $form = document.getElementById('formulario')

$form.addEventListener('submit', handleSubmit)

async function handleSubmit(e) {
    e.preventDefault()
    const form = new FormData(this)
    const response = await fetch(this.action, {
        method:this.method,
        body:form,
        headers: {
            'Accept': 'application/json'
        }
    })
    if (response.ok) {
        $form.reset()
        alert('gracias por contactar')
    }
    
}*/

//API FORMULARIO

const btn = document.getElementById('button');

document.getElementById('formulario')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'ENVIANDO...';

   const serviceID = 'default_service';
   const templateID = 'template_ul5fg4h';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Send Email';
      alert('Enviado! En breve te contactamos :)');
    }, (err) => {
      btn.value = 'Send Email';
      alert(JSON.stringify(err));
    });
});