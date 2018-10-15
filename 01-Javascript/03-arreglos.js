var arreglo = [];

arreglo = [
    1,
    "Kevin",
    false,
    null,
    new Date(),
    {
        nombre:"Vicente"
    },
    [1,2,false,true]
];

console.log(arreglo);
arreglo.push(3);
console.log(arreglo);
arreglo.pop();
console.log(arreglo);
var arregloNumeros = [1,2,3,4,5];
arregloNumeros.splice(1,0,1.1);
console.log(arregloNumeros);
arregloNumeros.splice(4,1);
console.log(arregloNumeros);
var indiceDelNumeroDos = arregloNumeros.indexOf(2);
console.log(indiceDelNumeroDos);
arregloNumeros.splice(indiceDelNumeroDos,0,1.2,1.3,1.4,1.5,1.6,1.8,1.9);
var indiceUnoSierte= arregloNumeros.indexOf(1.7);
console.log(arregloNumeros[indiceUnoSierte]);
var posicionUnoUno = arregloNumeros.indexOf(1);
var posicionUnoNueve = arregloNumeros.indexOf(1.9);
var  desdeElUnoUnoAlUnoNueve = (posicionUnoNueve - posicionUnoUno);

arregloNumeros.splice(1,desdeElUnoUnoAlUnoNueve);
console.log(arregloNumeros);
// Destructuracion de Arreglos
var arregloUno =[1,2,3];
var arregloDos =[1,2,3];

console.log(1,2,3);
console.log(...arregloUno);

var arregloCompleto = [...arregloUno,...arregloDos];
console.log(arregloCompleto);

//Destructuracion de Objetos

var kevin = {
    nombre: 'kevin',
    apellido:'Cabrera',
    direccion:'Orquideas',
    casado: false,
    edad:29
};

var vicente = {
    mascota:{
        nombre:'Dana'
    },
    fechaNacimiento: new Date('1996-06-01')
};

var datosDelUsuario = {
    ...kevin,
    ...vicente
};


// Objetos
var atributosDelObjeto = Object.keys(datosDelUsuario);

console.log(datosDelUsuario);
console.log(datosDelUsuario['nombre']);
console.log(datosDelUsuario[atributosDelObjeto[0]]);