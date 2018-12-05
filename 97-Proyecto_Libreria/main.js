var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var inquirer = require('inquirer');
var fs = require('fs');
var rxjs = require('rxjs');
var mergeMap = require('rxjs/operators').mergeMap;
var map = require('rxjs/operators').map;
var preguntaMenu = {
    type: 'list',
    name: 'opcionMenu',
    message: 'Que quieres hacer',
    choices: [
        'Crear',
        'Borrar',
        'Buscar',
        'Actualizar',
        'Agregar Categoria'
    ]
};
var preguntaBuscarLibro = [
    {
        type: 'input',
        name: 'idLibro',
        message: 'Ingrese el ISB den Libro',
    }
];
var preguntaLibro = [
    {
        type: 'input',
        name: 'ISBN',
        message: 'Cual es el ISBN del libro?'
    },
    {
        type: 'input',
        name: 'titulo',
        message: 'Cual es el titulo del Libro'
    },
    {
        type: 'input',
        name: 'autor',
        message: 'Cual es el autor del Libro?'
    },
    {
        type: 'input',
        name: 'categoria',
        message: 'Cual es la categoria del Libro?'
    },
];
var preguntaCategoria = [
    {
        type: 'input',
        name: 'idCategoria',
        message: 'Cual es el id de la categoria?'
    },
    {
        type: 'input',
        name: 'nombreCategoria',
        message: 'Cual es el nombre de la categoria?'
    },
];
var preguntaEdicionLibro = [
    {
        type: 'input',
        name: 'tituloLibro',
        message: 'Cual es el nuevo titulo del Libro?'
    },
    {
        type: 'input',
        name: 'autorLibro',
        message: 'Cual es el nuevo autor del Libro?'
    },
];
function inicialiarBDD() {
    return new Promise(function (resolve, reject) {
        fs.readFile('bdd.json', 'utf-8', function (error, contenidoArchivo) {
            if (error) {
                fs.writeFile('bdd.json', '{"libros":[],"categorias":[]}', function (error) {
                    if (error) {
                        reject({
                            mensaje: 'Error creando',
                            error: 500
                        });
                    }
                    else {
                        resolve({
                            mensaje: 'BDD leida',
                            bdd: JSON.parse('{"libros":[],"categorias":[]}')
                        });
                    }
                });
            }
            else {
                resolve({
                    mensaje: 'BDD leida',
                    bdd: JSON.parse(contenidoArchivo)
                });
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var respuestaBDD$;
        return __generator(this, function (_a) {
            respuestaBDD$ = rxjs.from(inicialiarBDD());
            respuestaBDD$
                .pipe(preguntarOpcionesMenu(), opcionesRespuesta(), ejecutarAcccion(), guardarBaseDeDatos())
                .subscribe(function (data) {
                //
                console.log(data);
            }, function (error) {
                //
                console.log(error);
            }, function () {
                main();
                console.log('Complete');
            });
            return [2 /*return*/];
        });
    });
}
function guardarBDD(bdd) {
    return new Promise(function (resolve, reject) {
        fs.writeFile('bdd.json', JSON.stringify(bdd), function (error) {
            if (error) {
                reject({
                    mensaje: 'Error creando',
                    error: 500
                });
            }
            else {
                resolve({
                    mensaje: 'BDD guardada',
                    bdd: bdd
                });
            }
        });
    });
}
main();
function preguntarOpcionesMenu() {
    return mergeMap(// Respuesta Anterior Observable
    function (respuestaBDD) {
        return rxjs
            .from(inquirer.prompt(preguntaMenu))
            .pipe(map(// respuesta ant obs
        function (respuesta) {
            respuestaBDD.opcionMenu = respuesta;
            return respuestaBDD;
        }));
    });
}
function opcionesRespuesta() {
    return mergeMap(function (respuestaBDD) {
        var opcion = respuestaBDD.opcionMenu.opcionMenu;
        switch (opcion) {
            case 'Crear':
                return rxjs
                    .from(inquirer.prompt(preguntaLibro))
                    .pipe(mergeMap(function (respuesta) {
                    console.log(respuesta);
                    console.log(respuestaBDD.bdd.categorias);
                    var indiceCategoria = respuestaBDD.bdd
                        .categorias
                        .findIndex(function (categoria) {
                        return categoria.categoria === respuesta.idCategoria;
                    });
                    console.log('indice' + indiceCategoria);
                    if (indiceCategoria === -1) {
                        console.log("No existe esa categoria, preguntando de nuevo");
                        return rxjs
                            .from(inquirer.prompt(preguntaLibro));
                    }
                    else {
                        return rxjs.from(promesaCrear(respuesta))
                            .pipe(map(function (libro) {
                            respuestaBDD.libro = libro;
                            return respuestaBDD;
                        }));
                    }
                }));
            case 'Buscar':
                return buscarLibro(respuestaBDD);
                break;
            case 'Actualizar':
                return preguntarISBNLibro(respuestaBDD);
            case 'Borrar':
                return borrarLibro(respuestaBDD);
                break;
            case 'Agregar Categoria':
                return rxjs
                    .from(inquirer.prompt(preguntaCategoria))
                    .pipe(map(function (categoria) {
                    respuestaBDD.categoria = categoria;
                    return respuestaBDD;
                }));
        }
    });
}
function guardarBaseDeDatos() {
    return mergeMap(// Respuesta del anterior OBS
    function (respuestaBDD) {
        // OBS
        return rxjs.from(guardarBDD(respuestaBDD.bdd));
    });
}
function ejecutarAcccion() {
    return map(// Respuesta del anterior OBS
    function (respuestaBDD) {
        var opcion = respuestaBDD.opcionMenu.opcionMenu;
        switch (opcion) {
            case 'Crear':
                var libro = respuestaBDD.libro;
                respuestaBDD.bdd.libros.push(libro);
                return respuestaBDD;
            case 'Actualizar':
                var indice = respuestaBDD.ISBNLibro;
                respuestaBDD.bdd.libros[indice].titulo = respuestaBDD.libro.titulo;
                respuestaBDD.bdd.libros[indice].autor = respuestaBDD.libro.autor;
                return respuestaBDD;
            case 'Borrar':
                return borrarLibro(respuestaBDD);
            case 'Buscar':
                return buscarLibro(respuestaBDD);
            case 'Agregar Categoria':
                var categoriar = respuestaBDD.categoria;
                respuestaBDD.bdd.categorias.push(categoriar);
                return respuestaBDD;
        }
    });
}
function preguntarISBNLibro(respuestaBDD) {
    return rxjs
        .from(inquirer.prompt(preguntaBuscarLibro))
        .pipe(mergeMap(// RESP ANT OBS
    function (respuesta) {
        var indiceLibro = respuestaBDD.bdd
            .libros
            .findIndex(// -1
        function (libro) {
            return libro.ISBN === respuesta.ISBN;
        });
        if (indiceLibro === -1) {
            console.log('preguntando de nuevo');
            return preguntarISBNLibro(respuestaBDD);
        }
        else {
            console.log(indiceLibro);
            respuestaBDD.ISBNLibro = indiceLibro;
            return rxjs
                .from(inquirer.prompt(preguntaEdicionLibro))
                .pipe(map(function (nombre) {
                // @ts-ignore
                respuestaBDD.libro = {
                    ISBN: null,
                    titulo: nombre.titulo,
                    autor: nombre.autor
                };
                return respuestaBDD;
            }));
        }
    }));
}
function borrarLibro(respuestaBDD) {
    return rxjs
        .from(inquirer.prompt(preguntaBuscarLibro))
        .pipe(mergeMap(// RESP ANT OBS
    function (respuesta) {
        var indiceLibro = respuestaBDD.bdd
            .libros
            .findIndex(// -1
        function (libro) {
            return libro.ISBN === respuesta.ISBN;
        });
        if (indiceLibro === -1) {
            console.log('preguntando de nuevo');
            return preguntarISBNLibro(respuestaBDD);
        }
        else {
            console.log(indiceLibro);
            return rxjs.from(promesaEliminar(respuestaBDD.bdd.libros, indiceLibro))
                .pipe(map(function () {
                return respuestaBDD;
            }));
        }
    }));
}
var promesaEliminar = function (respuestaBDD, indiceUsuario) {
    return new Promise(function (resolve, reject) {
        resolve(respuestaBDD.splice(indiceUsuario, 1));
    });
};
function buscarLibro(respuestaBDD) {
    return rxjs
        .from(inquirer.prompt(preguntaBuscarLibro))
        .pipe(mergeMap(// RESP ANT OBS
    function (respuesta) {
        var indiceUsuario = respuestaBDD.bdd
            .libros
            .findIndex(// -1
        function (libro) {
            return libro.ISBN === respuesta.ISBN;
        });
        if (indiceUsuario === -1) {
            console.log('preguntando de nuevo');
            return preguntarISBNLibro(respuestaBDD);
        }
        else {
            console.log(indiceUsuario);
            return rxjs.from(promesaBuscar(respuestaBDD.bdd.libros[indiceUsuario]))
                .pipe(map(function () {
                return respuestaBDD;
            }));
        }
    }));
}
var promesaBuscar = function (respuestaBDD) {
    return new Promise(function (resolve, reject) {
        var rspursta = {
            mensage: respuestaBDD
        };
        resolve(rspursta);
    });
};
var promesaCrear = function (respuestaBDD) {
    console.log(JSON.stringify(respuestaBDD));
    return new Promise(function (resolve, reject) {
        resolve(respuestaBDD);
    });
};
