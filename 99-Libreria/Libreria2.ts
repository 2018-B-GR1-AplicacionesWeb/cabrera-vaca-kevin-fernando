declare var require:any;
var inquirer = require('inquirer');
const rxjs = require('rxjs');
const fs = require('fs');
const map = require('rxjs/operators').map;
const reduce = require('rxjs/operators').reduce;



// Clases
class Cliente{
    nombres: string;
    direccion:string;
    fecha:string;
    correo: string;
}

class Libro{
    titulo: string;
    avaluo=0.00;
    stock =0;
    constructor(titulo:string,avaluo,stock){
        this.titulo=titulo;
        this.avaluo=avaluo;
        this.stock =stock;
    }
}

// ------------------- Navegacion----------------------

// Menu principal
let menu_principal = [
    {
        type: "list",
        name: "menuPrincipal",
        message: "Que desea manejar?",
        choices: [
            "Libros",
            "Clientes",
            "Salir",
        ],
    },
];

// Sub Menu Libros

let menu_libros = [
    {
        type: "list",
        name: "menuLibros",
        message: "Que desea hacer?",
        choices: [
            "Registrar un Libro",
            "Buscar un Libro",
            "Actualizar un Libro",
            "Eliminar un Libro",
            "Salir",
        ],
        validate:(respuesta)=>{
            if(respuesta.crud_op=='salir'){
                return false;
            }else{
                return respuesta
            }
        }
    },
];

//Sub Menu Clientes

let menu_Clientes = [
    {
        type: "list",
        name: "menuClientes",
        message: "Que desea hacer?",
        choices: [
            "Registrar un Cliente",
            "Buscar un Cliente",
            "Actualizar un Cliente",
            "Eliminar un Cliente",
            "Salir",
        ],
        validate:(respuesta)=>{
            if(respuesta=='salir'){
                return false;
            }else{
                return respuesta
            }
        }
    },
];

// Pregunta actualizar Libro

let pregunta_actualizarLibro = [
    {
        type:'input',
        name:"actual",
        message:"Ingrese el nombre del libro a Actualizar:"
    },
    {
        type:'input',
        name:"nuevoStock",
        message:"Ingrese el nuevo stock del Libro"
    },
    {
        type:'input',
        name:"nuevoTitulo",
        message:"Ingrese el nuevo titulo del Libro"
    },
    {
        type:'input',
        name:"nuevoAvaluo",
        message:"Ingrese el nuevo avaluo del Libro"
    }
];
