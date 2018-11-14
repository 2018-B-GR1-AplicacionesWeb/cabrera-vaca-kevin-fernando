const inquirer = require('inquirer');
const rxjs = require('rxjs');
const { Observable } = require('rxjs');
const fs   = require('fs');
const path = require('path');

const observe = Observable.create(function(obs) {
    obs.next({
            type: 'list',
            name: 'menuPrincipal',
            message: 'Que desea manejar?',
            choices: [ 'Libros', 'Clientes', 'Salir'  ],
        }
    );

    obs.next({
        type: 'list',
        name: 'accionLibros',
        message: 'Acción a realizar',
        choices: [ 'Crear Libro', 'Actualizar Libro', 'Eliminar Libro','Leer Libro','Salir' ],
    });

    /*obs.next({
        type: 'list',
        name: 'accionClientes',
        message: 'Acción a realizar',
        choices: [ 'Crear Cliente', 'Actualizar Cliente', 'Eliminar Cliente','Leer Libro','Salir'  ],
    });*/

    obs.next({
        type: 'input',
        name: 'libroTitulo',
        message: "Cual es el titulo del Libro?"

    });
    obs.next({
        type: 'input',
        name: 'libroISBN',
        message: "Cual es el ISBN del Libro?",
    });

    obs.next({
        type: 'input',
        name: 'libroStock',
        message: "Cual es el Stock del Libro?",

    });
    obs.next({
        type: 'input',
        name: 'libroAvaluo',
        message: "Cual es el avaluo del Libro?",
    });
    /*
    obs.next({
        type: 'input',
        name: 'clienteCedula',
        message: "Cual es la Cedula del cliente?",
    });

    obs.next({
        type: 'input',
        name: 'clienteNombres',
        message: "Cuales son los nombres del cliente?",
    });

    obs.next({
        type: 'input',
        name: 'clienteCorreo',
        message: "Cual es el e-mail del cliente?",
    });

    obs.next({
        type: 'input',
        name: 'clienteTelefono',
        message: "Cual es el telefono del cliente?",
    });
    */



    obs.complete();
});

inquirer.prompt(observe).
then(answers => {

   /* if (answers.menuPrincipal == 'Libros'){
        return false;
    }*/
    if (answers.accion == 'Crear Libro' && answers.menuPrincipal == 'Libros'){
        mkdirpath(`${"Libros"}`);
        //string Info
        const promesaEscritura$ = rxjs.from(promesaEscritura(`${'Libros'}/${answers.libroISBN}`, JSON.stringify(answers, null, '  ') ));
        promesaEscritura$
            .subscribe((ok) => {
                console.log('Creación Exitosa', ok);
            }, (error) => {
                console.log('Creación Fallida', error);
            }, () => {
                console.log('completado');
            });

    }
    else if (answers.accion == 'Actualizar Libro'  && answers.menuPrincipal == 'Libros'){

        const respuestasJSON = JSON.stringify(answers, null, '  ');

        const promesaActualizar$ = rxjs.from(promesaActualizar(`${'Libros'}/${answers.libroISBN}`, respuestasJSON));
        promesaActualizar$
            .subscribe((ok) => {
                console.log('Actualización Exitosa', ok);

            }, (error) => {
                console.log('Actualización Fallida', error);
            }, () => {
                console.log('completado');

            });
    }

    else if (answers.accion == 'Leer Libro' && answers.menuPrincipal == 'Libros'){
        const respuestasJSON = JSON.stringify(answers, null, '  ');

        const promesaLectura$ = rxjs.from(promesaLectura(`${'Libros'}/${answers.libroISBN}`, respuestasJSON));
        promesaLectura$
            .subscribe((ok) => {
                console.log('Lectura Exitosa', ok);

            }, (error) => {
                console.log('LEctura Fallida', error);
            }, () => {
                console.log('completado');

            });

    }
    else if (answers.accion == 'Eliminar Libro' && answers.menuPrincipal == 'Libros'){
        const respuestasJSON = JSON.stringify(answers, null, '  ');

        const promesaEliminar$ = rxjs.from(promesaEliminar(`${'Libros'}/${answers.libroISBN}`));
        promesaEliminar$
            .subscribe((ok) => {
                console.log('Eliminación Exitosa', ok);

            }, (error) => {
                console.log('Eliminación Fallida', error);
            }, () => {
                console.log('completado');
            });
    }

    else if (answers.accion == 'crear' && answers.menuPrincipal == 'Clientes'){
        mkdirpath(`${"Clientes"}`);
        //string Info
        const promesaEscritura$ = rxjs.from(promesaEscritura(`${'clientes'}/${answers.clienteCedula}`, JSON.stringify(answers, null, '  ') ));
        promesaEscritura$
            .subscribe((ok) => {
                console.log('Creación Exitosa', ok);
            }, (error) => {
                console.log('Creación Fallida', error);
            }, () => {
                console.log('completado');
            });

    }
    else if (answers.accion == 'actualizar'  && answers.menuPrincipal == 'Clientes'){

        const respuestasJSON = JSON.stringify(answers, null, '  ');

        const promesaActualizar$ = rxjs.from(promesaActualizar(`${'Clientes'}/${answers.clienteCedula}`, respuestasJSON));
        promesaActualizar$
            .subscribe((ok) => {
                console.log('Actualización Exitosa', ok);

            }, (error) => {
                console.log('Actualización Fallida', error);
            }, () => {
                console.log('completado');

            });
    }

    else if (answers.accion == 'leer' && answers.menuPrincipal == 'Clientes'){
        const respuestasJSON = JSON.stringify(answers, null, '  ');

        const promesaLectura$ = rxjs.from(promesaLectura(`${'Clientes'}/${answers.clienteCedula}`, respuestasJSON));
        promesaLectura$
            .subscribe((ok) => {
                console.log('Lectura Exitosa', ok);

            }, (error) => {
                console.log('LEctura Fallida', error);
            }, () => {
                console.log('completado');

            });

    }
    else if (answers.accion == 'eliminar' && answers.menuPrincipal == 'Clientes'){
        const respuestasJSON = JSON.stringify(answers, null, '  ');

        const promesaEliminar$ = rxjs.from(promesaEliminar(`${'Clientes'}/${answers.clienteCedula}`));
        promesaEliminar$
            .subscribe((ok) => {
                console.log('Eliminación Exitosa', ok);

            }, (error) => {
                console.log('Eliminación Fallida', error);
            }, () => {
                console.log('completado');
            });
    }

});


function mkdirpath(dirPath)
{
    if(!fs.existsSync(dirPath))
    {
        try
        {
            fs.mkdirSync(dirPath);
        }
        catch(e)
        {
            mkdirpath(path.dirname(dirPath));
            mkdirpath(dirPath);
        }
    }
}
const promesaEscritura = (nombreArchivo,contenidoArchivo) =>{
    return new Promise(
        (resolve, reject) => {
            fs.writeFile(
                nombreArchivo,contenidoArchivo,
                (error)=>{
                    if(error){
                        reject(error)
                    }
                    else {
                        resolve(contenidoArchivo)
                    }
                }
            );
        }
    )};
const promesaActualizar = (nombreArchivo, contenidoArchivo) => {
    return new Promise(
        (resolve, reject) => {
            fs.readFile(
                nombreArchivo,
                'utf-8',
                (error, contenidoLeidoDelArchivo) => {
                    if (error) {
                        console.log("El archivo no existe, no se puede actualizar");
                        reject(error)
                    } else {
                        var f = new Date();
                        fs.writeFile(
                            nombreArchivo,
                            contenidoArchivo + 'actualizado el: ' +f.getDate() ,
                            (err) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    // Devolver el contenido
                                    var f = new Date();
                                    resolve(contenidoArchivo )
                                }
                            }
                        )
                    }
                }
            );
        }
    )

};

const promesaLectura = (nombreArchivo) =>{
    return new Promise(
        (resolve, reject) => {
            fs.readFile(
                nombreArchivo,'utf-8',
                (error, contenidoArchivo)=>{
                    if(error){
                        reject(error)
                    }
                    else {
                        resolve(contenidoArchivo)
                    }
                }
            );
        }
    )};
const promesaEliminar = (nombreArchivo) =>{
    return new Promise(
        (resolve, reject) => {
            fs.readFile(
                nombreArchivo,
                (error)=>{
                    if(error){
                        reject(error)
                        console.log("el archivo no existe no se puede eliminar")
                    }
                    else {
                        resolve(fs.unlinkSync(nombreArchivo))
                    }
                }
            );
        }
    )};