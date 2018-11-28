const inquirer = require('inquirer');
const fs = require('fs');
const rxjs = require('rxjs');
const mergeMap = require('rxjs/operators').mergeMap;
const map = require('rxjs/operators').map;
declare var Promise;

const categoriaLibros=['Drama', 'Ficcion','Salud & Bienestar', 'Humor','Historia','Educacion','Otros'];


const preguntaMenuPrincipal = { type: 'list', name: 'opcionMenuPrincipal', message: 'Elige una opción:', choices: ['Libros', 'Clientes', 'Salir',] };
const preguntaMenuSecundario = { type: 'list',  name: 'opcionMenuSecundario',  message: 'Elige una opción:', choices: ['Crear', 'Buscar', 'Actualizar', 'Borrar',]};

const preguntasBuscarCliente = { type: 'input', name: 'idCliente', message: 'Ingrese el número de cedula del Cliente: ' };
const preguntasBuscarLibro = { type: 'input', name: 'idLibro', message: 'Ingrese el número de ISBN: ' };

const preguntasEliminarCliente = { type: 'input', name: 'idCliente', message: 'Ingrese el número de cedula del Cliente a eliminar: ' };
const preguntasEliminarLibro = { type: 'input', name: 'idLibro', message: 'Ingrese el ISBN del Libro a eliminar: ' };

const preguntasActualizarCliente = { type: 'input', name: 'idCliente', message: 'Ingrese el número de motor del auto a actualizar: ' };
const preguntasActualizarLibro = { type: 'input', name: 'idLibro', message: 'Ingrese el ISBN del Libro a actualizar: ' };

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
    return new Promise(
        (resolve, reject) => {
            fs.readFile(
                'bdd.json',
                'utf-8',
                (error, contenidoArchivo) => { // CALLBACK
                    if (error) {
                        fs.writeFile(
                            'bdd.json',
                            '{"Libros":[],"Clientes":[]}',
                            (error) => {
                                if (error) {
                                    reject({
                                        mensaje: 'Error creando',
                                        error: 500
                                    })
                                } else {
                                    resolve({
                                        mensaje: 'BDD leida',
                                        bdd: JSON.parse('{"usuarios":[],"facultades":[]}')
                                    })
                                }

                            }
                        )

                    } else {
                        resolve({
                            mensaje: 'BDD leida',
                            bdd: JSON.parse(contenidoArchivo)
                        })
                    }
                }
            )
        }
    );

}
function guardarBDD(bdd: BDD) {
    return new Promise(
        (resolve, reject) => {
            fs.writeFile(
                'bdd.json',
                JSON.stringify(bdd),
                (error) => {
                    if (error) {
                        reject({
                            mensaje: 'Error creando',
                            error: 500
                        })
                    } else {
                        resolve({
                            mensaje: 'BDD guardada',
                            bdd: bdd
                        })
                    }

                }
            )
        }
    )
}

//---------------Interfaces
interface BDD {
    usuarios: Usuario[] | any;
    libros: Libro[] | any;
}
interface Usuario {
    idCliente: number;
    nombreCliente: string;
    correoCliente: string;
}
interface Libro {
    idLibro: number;
    tituloLibro: string;
    categoriaLibro: string;
    stockLibro: number;
    avaluoLibro:number;
}
interface RespuestaBDD {
    mensaje: string,
    bdd: BDD
}
interface OpcionesPregunta {
    opcionMenu: 'Crear' | 'Borrar' | 'Buscar' | 'Actualizar'
}
interface OpcionesPreguntaPrincipal {
    opcionMenu: 'Libros' | 'Clientes' | 'Salir'
}
interface RespuestasUsuario {
    respuestaUsuario: OpcionesPregunta,
    respuestasBDD: RespuestaBDD,
    Libro?: Libro,
    Usuario?: Usuario,
    ISBN? : number
}

function preguntarMenu(){
    return rxjs.from(inquirer.prompt(preguntaMenuSecundario));
}

async function main() {
    const respuestaBDD$ = rxjs.from(inicializarBDD());

    respuestaBDD$
        .pipe(
            mergeMap(
            (respuestaBDD$) => {
                return preguntarMenu()
                    .pipe(
                        map((respuesta : OpcionesPregunta) => {
                            console.log("Su opcion es ", respuesta);
                            return {
                                respuestaUsuario: respuesta,
                                respuestasBDD: respuestaBDD$
                            }
                        }))}),
    mergeMap(
    (respuesta : RespuestasUsuario) =>{
        console.log('Selecciono',respuesta);
        switch (respuesta.respuestaUsuario.opcionMenu) {
            case 'Crear':
                return rxjs.from(inquirer.prompt(preguntasIngresarLibro))
                    .pipe(map((Libro) => {
                    respuesta.Libro = Libro;
                return respuesta;
        }))
                    .pipe(map(
                        (respuesta) => {
                            //console.log('respuesta en accion', respuesta);
                            switch (respuesta.respuestaUsuario.opcionMenu) {
                                case 'Crear':
                                    const LibroNuevo = respuesta.Libros;
                                    respuesta.respuestasBDD.Libros.push(LibroNuevo);
                                    return respuesta;
                            }
                        }),
                    mergeMap((respuesta : RespuestasUsuario) => {
                        return guardarBDD(respuesta.respuestasBDD.bdd);
                    }));
                break;


            case 'Buscar':
                return rxjs.from(inquirer.prompt(preguntasBuscarLibro))
                    .pipe(
                        map(
                            (respuestaSeleccionada)=>{
                                respuesta.ISBN=respuestaSeleccionada.idLibro;
                                return respuesta
                            }))
                    .pipe(
                        map(
                            (respuesta: RespuestasUsuario)=>{
                                const bdd =  respuesta.respuestasBDD.bdd.libros;
                                const libroEncontrado= bdd
                                    .find(
                                        (libroObtenidos)=>{
                                            return libroObtenidos.ISBN===respuesta.ISBN
                                        }
                                    );
                                return libroEncontrado;
                            }
                        ));

                break;

            case 'Borrar':
                return rxjs.from(inquirer.prompt(preguntasEliminarLibro))
                    .pipe(
                        map(
                            (respuestaIngresada)=>{
                                respuesta.ISBN=respuestaIngresada.idLibro;
                                return respuesta
                            })
                    )
                    .pipe(
                        map(
                            (respuesta : RespuestasUsuario)=>{
                                const bdd =  respuesta.respuestasBDD.bdd.libros;
                                const libroEncontrado= bdd
                                    .findIndex(
                                        (librosObtenidos)=>{
                                            return librosObtenidos.idLibro===respuesta.ISBN
                                        }
                                    );

                                respuesta.respuestasBDD.bdd.libros.splice(libroEncontrado,1)
                                return respuesta
                            }

                        ),
                        mergeMap(
                            (respuesta: RespuestasUsuario) => {
                                return guardarBDD(respuesta.respuestasBDD.bdd);
                            } )
                    );

                break;

            case 'Actualizar':
                return rxjs.from(inquirer.prompt(preguntasActualizarLibro))
                    .pipe(
                        map(
                            (respuestaIngresada)=>{
                                respuesta.ISBN=respuestaIngresada.idLibro;
                                return respuesta
                            })
                    )
                    .pipe(
                        map(
                            (respuesta : RespuestasUsuario)=>{
                                const bdd =  respuesta.respuestasBDD.bdd.libros;
                                const libroEncontrado= bdd
                                    .find(
                                        (libroObtenido)=>{
                                            return libroObtenido.idLibro===respuesta.ISBN
                                        }
                                    );
                            }
                        )
                    );
                break;

        } })
        )

        .subscribe(
            (data) => {
                //
                console.log(data);
            },
            (error) => {
                //
                console.log(error);
            },
            () => {
                main();
                console.log('Complete');
            }
        )



}
main();


