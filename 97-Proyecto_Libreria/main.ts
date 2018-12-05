const inquirer = require('inquirer');
const fs = require('fs');
const rxjs = require('rxjs');
const mergeMap = require('rxjs/operators').mergeMap;
const map = require('rxjs/operators').map;
declare var Promise;

const preguntaMenu = {
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

const preguntaBuscarLibro = [
    {
        type: 'input',
        name: 'idLibro',
        message: 'Ingrese el ISB den Libro',
    }
];

const preguntaLibro = [
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
const preguntaCategoria = [
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

const preguntaEdicionLibro = [
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

    return new Promise(
        (resolve, reject) => {
            fs.readFile(
                'bdd.json',
                'utf-8',
                (error, contenidoArchivo) => {
                    if (error) {

                        fs.writeFile(
                            'bdd.json',
                            '{"libros":[],"categorias":[]}',
                            (error) => {
                                if (error) {
                                    reject({
                                        mensaje: 'Error creando',
                                        error: 500
                                    })
                                } else {
                                    resolve({
                                        mensaje: 'BDD leida',
                                        bdd: JSON.parse('{"libros":[],"categorias":[]}')
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

async function main() {

    const respuestaBDD$ = rxjs.from(inicialiarBDD());

    respuestaBDD$
        .pipe(
            preguntarOpcionesMenu(),
            opcionesRespuesta(),
            ejecutarAcccion(),
            guardarBaseDeDatos()
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


main();


function preguntarOpcionesMenu() {
    return mergeMap( // Respuesta Anterior Observable
        (respuestaBDD: RespuestaBDD) => {

            return rxjs
                .from(inquirer.prompt(preguntaMenu))
                .pipe(
                    map( // respuesta ant obs
                        (respuesta: OpcionMenu) => {
                            respuestaBDD.opcionMenu = respuesta;
                            return respuestaBDD
                        }
                    )
                );

        }
    )
}

function opcionesRespuesta() {
    return mergeMap(
        (respuestaBDD: RespuestaBDD) => {
            const opcion = respuestaBDD.opcionMenu.opcionMenu;
            switch (opcion) {
                case 'Crear':

                    return rxjs
                        .from(inquirer.prompt(preguntaLibro))
                        .pipe(
                            mergeMap(
                                (respuesta : VerificarIdCategoria) =>{
                                    console.log(respuesta)
                                    console.log(respuestaBDD.bdd.categorias)
                                    const indiceCategoria = respuestaBDD.bdd
                                        .categorias
                                        .findIndex(
                                            (categoria: any)=>{
                                                return categoria.categoria === respuesta.idCategoria
                                            });
                                    console.log('indice' +indiceCategoria)
                                    if (indiceCategoria === -1){
                                        console.log("No existe esa categoria, preguntando de nuevo")
                                        return rxjs
                                            .from(inquirer.prompt(preguntaLibro))
                                    }
                                    else{
                                        return rxjs.from(promesaCrear(respuesta))
                                            .pipe(
                                                map(
                                                    (libro: Libro) => {
                                                        respuestaBDD.libro = libro;
                                                        return respuestaBDD;

                                                    }
                                                )
                                            )
                                    }
                                })
                        );



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
                        .pipe(
                            map(
                                (categoria: Categoria) => { // resp ant OBS
                                    respuestaBDD.categoria = categoria;
                                    return respuestaBDD;
                                }
                            )
                        );
            }
        }
    )
}

function guardarBaseDeDatos() {
    return mergeMap(// Respuesta del anterior OBS
        (respuestaBDD: RespuestaBDD) => {
            // OBS
            return rxjs.from(guardarBDD(respuestaBDD.bdd))
        }
    )
}

function ejecutarAcccion() {
    return map( // Respuesta del anterior OBS
        (respuestaBDD: RespuestaBDD) => {
            const opcion = respuestaBDD.opcionMenu.opcionMenu;
            switch (opcion) {
                case 'Crear':
                    const libro = respuestaBDD.libro;
                    respuestaBDD.bdd.libros.push(libro);
                    return respuestaBDD;
                case 'Actualizar':
                    const indice = respuestaBDD.ISBNLibro;
                    respuestaBDD.bdd.libros[indice].titulo = respuestaBDD.libro.titulo;
                    respuestaBDD.bdd.libros[indice].autor= respuestaBDD.libro.autor;
                    return respuestaBDD;

                case 'Borrar':
                    return borrarLibro(respuestaBDD);
                case 'Buscar':

                    return buscarLibro(respuestaBDD);
                case 'Agregar Categoria':
                    const categoriar = respuestaBDD.categoria;
                    respuestaBDD.bdd.categorias.push(categoriar);
                    return respuestaBDD;

            }
        }
    )
}

interface RespuestaBDD {
    mensaje: string;
    bdd: BDD;
    opcionMenu?: OpcionMenu;

    ISBNLibro?: number;
    libro?: Libro;
    categoria?: Categoria;
}

interface BDD {
    libros: Libro[] | any;
    categorias: Categoria[] | any;
}


interface Libro {
    ISBN: number;
    titulo: string;
    autor: string;
    idCategoria: number;
}

interface Categoria {
    idCategoria: number;
    nombreCategoria: string;

}

interface OpcionMenu {
    opcionMenu: 'Crear' | 'Borrar' | 'Buscar' | 'Actualizar' | 'Agregar Categoria';
}

interface BuscarLibroporISBN {
    ISBN: string;
}
interface VerificarIdCategoria {
    idCategoria: number;
}

function preguntarISBNLibro(respuestaBDD: RespuestaBDD) {
    return rxjs
        .from(inquirer.prompt(preguntaBuscarLibro))
        .pipe(
            mergeMap( // RESP ANT OBS
                (respuesta: BuscarLibroporISBN) => {
                    const indiceLibro = respuestaBDD.bdd
                        .libros
                        .findIndex( // -1
                            (libro: any) => {

                                return libro.ISBN === respuesta.ISBN
                            }
                        );
                    if (indiceLibro === -1) {
                        console.log('preguntando de nuevo');
                        return preguntarISBNLibro(respuestaBDD);
                    } else {
                        console.log(indiceLibro);

                        respuestaBDD.ISBNLibro = indiceLibro;
                        return rxjs
                            .from(inquirer.prompt(preguntaEdicionLibro))
                            .pipe(
                                map(
                                    (nombre:{titulo:string, autor: string})=>{

                                        // @ts-ignore
                                        respuestaBDD.libro ={
                                            ISBN:null,
                                            titulo:nombre.titulo,
                                            autor:nombre.autor
                                        };
                                        return respuestaBDD;
                                    }
                                )
                            );
                    }
                }
            )
        );
}



function borrarLibro(respuestaBDD: RespuestaBDD) {
    return rxjs
        .from(inquirer.prompt(preguntaBuscarLibro))
        .pipe(
            mergeMap( // RESP ANT OBS
                (respuesta: BuscarLibroporISBN) => {
                    const indiceLibro = respuestaBDD.bdd
                        .libros
                        .findIndex( // -1
                            (libro: any) => {
                                return libro.ISBN === respuesta.ISBN
                            }
                        );
                    if (indiceLibro === -1) {
                        console.log('preguntando de nuevo');
                        return preguntarISBNLibro(respuestaBDD);
                    } else {
                        console.log(indiceLibro);
                        return rxjs.from(promesaEliminar(respuestaBDD.bdd.libros,indiceLibro)
                        )
                            .pipe(
                                map(() =>{
                                        return respuestaBDD

                                    }
                                )
                            )
                    }
                }
            )
        );
}
const promesaEliminar = (respuestaBDD,indiceUsuario) =>{
    return new Promise(
        (resolve, reject) => {
            resolve(respuestaBDD.splice(indiceUsuario, 1))
        }
    )};

function buscarLibro(respuestaBDD: RespuestaBDD) {
    return rxjs
        .from(inquirer.prompt(preguntaBuscarLibro))
        .pipe(
            mergeMap( // RESP ANT OBS
                (respuesta: BuscarLibroporISBN) => {
                    const indiceUsuario = respuestaBDD.bdd
                        .libros
                        .findIndex( // -1
                            (libro: any) => {
                                return libro.ISBN === respuesta.ISBN
                            }
                        );
                    if (indiceUsuario === -1) {
                        console.log('preguntando de nuevo');
                        return preguntarISBNLibro(respuestaBDD);
                    } else {
                        console.log(indiceUsuario);
                        return rxjs.from(promesaBuscar(respuestaBDD.bdd.libros[indiceUsuario])
                        )
                            .pipe(
                                map(() =>{
                                        return respuestaBDD

                                    }


                                )

                            )
                    }
                }
            )
        );
}
const promesaBuscar = (respuestaBDD) =>{
    return new Promise(
        (resolve, reject) => {
            const rspursta ={
                mensage: respuestaBDD
            }
            resolve(rspursta)
        }
    )};
const promesaCrear = (respuestaBDD) =>{
    console.log(JSON.stringify(respuestaBDD))
    return new Promise(
        (resolve, reject) => {
            resolve(respuestaBDD)
        }
    )};