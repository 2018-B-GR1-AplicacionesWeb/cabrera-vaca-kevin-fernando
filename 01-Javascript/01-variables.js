// Tipados Int edad =1;
var edad = 1; // number
var sueldo = 1.01; //number
var nombre = "Kevin"; //String
var nombre = 'Kevin'; //String
var nombre = `Kevin`; //String
var casado = false; //boolean
var hijos = null; //object
var cuatroBrazos; //undefined
var fecha= new Date(); //object

console.log('fecha',fecha);
console.log(typeof edad);
console.log(typeof sueldo);
console.log(typeof nombre);
console.log(typeof casado);
console.log(typeof hijos);
console.log(typeof fecha);


var kevin = {
    "nombre":"Kevin",
    edad:12,
    "Sueldo":12.2,
    "casado":false,
    "hijos":null,
    deberes: undefined,
    mascota: {
        nombre: 'dana'
    },
};

console.log(kevin.nombre);

//Truthy Todo lo demas
//falsy cero (0) & null & undefined

if(){
    console.log("Si");
}else{
    console.log("No");
}

