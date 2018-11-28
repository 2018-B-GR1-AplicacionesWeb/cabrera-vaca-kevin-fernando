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
var categoriaLibros = ['Drama', 'Ficcion', 'Salud & Bienestar', 'Humor', 'Historia', 'Educacion', 'Otros'];
var preguntaMenuPrincipal = { type: 'list', name: 'opcionMenuPrincipal', message: 'Elige una opción:', choices: ['Libros', 'Clientes', 'Salir',] };
var preguntaMenuSecundario = { type: 'list', name: 'opcionMenuSecundario', message: 'Elige una opción:', choices: ['Crear', 'Buscar', 'Actualizar', 'Borrar',] };
var preguntasBuscarCliente = { type: 'input', name: 'idCliente', message: 'Ingrese el número de cedula del Cliente: ' };
var preguntasBuscarLibro = { type: 'input', name: 'idLibro', message: 'Ingrese el número de ISBN: ' };
var preguntasEliminarCliente = { type: 'input', name: 'idCliente', message: 'Ingrese el número de cedula del Cliente a eliminar: ' };
var preguntasEliminarLibro = { type: 'input', name: 'idLibro', message: 'Ingrese el ISBN del Libro a eliminar: ' };
var preguntasActualizarCliente = { type: 'input', name: 'idCliente', message: 'Ingrese el número de motor del auto a actualizar: ' };
var preguntasActualizarLibro = { type: 'input', name: 'idLibro', message: 'Ingrese el ISBN del Libro a actualizar: ' };
var preguntasIngresarCliente = [
    { type: 'input', name: 'idCliente', message: 'Ingrese el numero de la cedula del Cliente: ' },
    { type: 'input', name: 'nombreCliente', message: 'Ingrese el nombre del Cliente: ' },
    { type: 'input', name: 'correoCliente', message: 'Ingrese el correo electronico: ' }
];
var preguntasIngresarLibro = [
    { type: 'input', name: 'idLibro', message: 'Ingrese el ISBN del Libro: ' },
    { type: 'input', name: 'tituloLibro', message: 'Ingrese el titulo del Libro' },
    { type: 'list', name: 'categoriaLibro', message: 'Selecciome la categoria: ', choices: categoriaLibros },
    { type: 'input', name: 'stockLibro', message: 'Ingrese el stock del Libro' },
    { type: 'input', name: 'avaluoLibro', message: 'Ingrese el avaluo del Libro: ' }
];
var preguntasEditarCliente = [
    { type: 'input', name: 'nombreCliente', message: 'Ingrese el nuevo nombre del Cliente' },
    { type: 'input', name: 'stockLibro', message: 'Ingrese el nuevo correo electronico del Cliente' },
];
var preguntasEditarLibro = [
    { type: 'input', name: 'tituloLibro', message: 'Ingrese el nuevo titulo del Libro' },
    { type: 'input', name: 'stockLibro', message: 'Ingrese el nuevo stock del Libro' },
];
function inicializarBDD() {
    return new Promise(function (resolve, reject) {
        fs.readFile('bdd.json', 'utf-8', function (error, contenidoArchivo) {
            if (error) {
                fs.writeFile('bdd.json', '{"Libros":[],"Clientes":[]}', function (error) {
                    if (error) {
                        reject({
                            mensaje: 'Error creando',
                            error: 500
                        });
                    }
                    else {
                        resolve({
                            mensaje: 'BDD leida',
                            bdd: JSON.parse('{"usuarios":[],"facultades":[]}')
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
function preguntarMenu() {
    return rxjs.from(inquirer.prompt(preguntaMenuSecundario));
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var respuestaBDD$;
        return __generator(this, function (_a) {
            respuestaBDD$ = rxjs.from(inicializarBDD());
            respuestaBDD$
                .pipe(mergeMap(function (respuestaBDD$) {
                return preguntarMenu()
                    .pipe(map(function (respuesta) {
                    console.log("Su opcion es ", respuesta);
                    return {
                        respuestaUsuario: respuesta,
                        respuestasBDD: respuestaBDD$
                    };
                }));
            }), mergeMap(function (respuesta) {
                console.log('Selecciono', respuesta);
                switch (respuesta.respuestaUsuario.opcionMenu) {
                    case 'Crear':
                        return rxjs.from(inquirer.prompt(preguntasIngresarLibro))
                            .pipe(map(function (Libro) {
                            respuesta.Libro = Libro;
                            return respuesta;
                        }))
                            .pipe(map(function (respuesta) {
                            //console.log('respuesta en accion', respuesta);
                            switch (respuesta.respuestaUsuario.opcionMenu) {
                                case 'Crear':
                                    var LibroNuevo = respuesta.Libros;
                                    respuesta.respuestasBDD.Libros.push(LibroNuevo);
                                    return respuesta;
                            }
                        }), mergeMap(function (respuesta) {
                            return guardarBDD(respuesta.respuestasBDD.bdd);
                        }));
                        break;
                    case 'Buscar':
                        return rxjs.from(inquirer.prompt(preguntasBuscarLibro))
                            .pipe(map(function (respuestaSeleccionada) {
                            respuesta.ISBN = respuestaSeleccionada.idLibro;
                            return respuesta;
                        }))
                            .pipe(map(function (respuesta) {
                            var bdd = respuesta.respuestasBDD.bdd.libros;
                            var libroEncontrado = bdd
                                .find(function (libroObtenidos) {
                                return libroObtenidos.ISBN === respuesta.ISBN;
                            });
                            return libroEncontrado;
                        }));
                        break;
                    case 'Borrar':
                        return rxjs.from(inquirer.prompt(preguntasEliminarLibro))
                            .pipe(map(function (respuestaIngresada) {
                            respuesta.ISBN = respuestaIngresada.idLibro;
                            return respuesta;
                        }))
                            .pipe(map(function (respuesta) {
                            var bdd = respuesta.respuestasBDD.bdd.libros;
                            var libroEncontrado = bdd
                                .findIndex(function (librosObtenidos) {
                                return librosObtenidos.idLibro === respuesta.ISBN;
                            });
                            respuesta.respuestasBDD.bdd.libros.splice(libroEncontrado, 1);
                            return respuesta;
                        }), mergeMap(function (respuesta) {
                            return guardarBDD(respuesta.respuestasBDD.bdd);
                        }));
                        break;
                    case 'Actualizar':
                        return rxjs.from(inquirer.prompt(preguntasActualizarLibro))
                            .pipe(map(function (respuestaIngresada) {
                            respuesta.ISBN = respuestaIngresada.idLibro;
                            return respuesta;
                        }))
                            .pipe(map(function (respuesta) {
                            var bdd = respuesta.respuestasBDD.bdd.libros;
                            var libroEncontrado = bdd
                                .find(function (libroObtenido) {
                                return libroObtenido.idLibro === respuesta.ISBN;
                            });
                        }));
                        break;
                }
            }))
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
main();
