var inquirer = require('inquirer');
var rxjs = require('rxjs');
var fs = require('fs');
var map = require('rxjs/operators').map;
var reduce = require('rxjs/operators').reduce;
// Clases
var Cliente = /** @class */ (function () {
    function Cliente() {
    }
    return Cliente;
}());
var Libro = /** @class */ (function () {
    function Libro(titulo, avaluo, stock) {
        this.avaluo = 0.00;
        this.stock = 0;
        this.titulo = titulo;
        this.avaluo = avaluo;
        this.stock = stock;
    }
    return Libro;
}());
// ------------------- Navegacion----------------------
// Menu principal
var menu_principal = [
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
var menu_libros = [
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
        validate: function (respuesta) {
            if (respuesta.crud_op == 'salir') {
                return false;
            }
            else {
                return respuesta;
            }
        }
    },
];
//Sub Menu Clientes
var menu_Clientes = [
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
        validate: function (respuesta) {
            if (respuesta == 'salir') {
                return false;
            }
            else {
                return respuesta;
            }
        }
    },
];
// Pregunta actualizar Libro
var pregunta_actualizarLibro = [
    {
        type: 'input',
        name: "actual",
        message: "Ingrese el nombre del libro a Actualizar:"
    },
    {
        type: 'input',
        name: "nuevoStock",
        message: "Ingrese el nuevo stock del Libro"
    },
    {
        type: 'input',
        name: "nuevoTitulo",
        message: "Ingrese el nuevo titulo del Libro"
    },
    {
        type: 'input',
        name: "nuevoAvaluo",
        message: "Ingrese el nuevo avaluo del Libro"
    }
];
