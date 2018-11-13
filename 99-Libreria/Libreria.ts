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