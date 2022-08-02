//precios y cantidades

let Cant = parseInt(prompt("cuantos potes de helado vas a llevar?"));

let PreciosHelados = 0;
let PrecioTotal = 0; 

//calcular precio helados

for ( let j = 0; j < Cant; j++) {
    let preciosinIva = parseFloat(prompt("ingrese el precio del helado elegido"));
    let PreciomasIva = CalculaIva(preciosinIva);
    PreciosHelados += PreciomasIva;
    break;
    
}

//descuento de helados 

if (Cant <= 3 ) {
    PrecioTotal = PreciosHelados;
} else if (Cant >= 3 && Cant <= 10) {
    let Descontar = (PreciosHelados * 10) / 100;
    PrecioTotal = PreciosHelados - Descontar;
}
else if(Cant >= 10) {
    let Descontar = (PreciosHelados * 20) /100;
    PrecioTotal = PreciosHelados - Descontar;    
}else{
    alert("Fatal: ingresa el precio!");
}

//funcion

function CalculaIva(totalimpuesto){
    let PreciomasIva = totalimpuesto * 2.20;
    return PreciomasIva;
}
console.log("total: " + PreciosHelados);
console.log("total con su respectivo descuento: " + PrecioTotal);