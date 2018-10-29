// 06-callback-propio.js

const fs = require('fs');

let totalArchivo = 'INICIO';

function appendFile(nombreArchivo, contenidoArchivo, callback) {

    fs.readFile(nombreArchivo, 'utf-8',
        (error, contenidoArchivoLeido) => {
            if (error) {
                fs.writeFile(nombreArchivo, contenidoArchivo,
                    (err) => {
                        if (err) {
                            console.error('Error escribiendo');
                            callback(undefined,'err');
                        } else {
                            console.log('Archivo creado');
                            callback( contenidoArchivo);
                        }
                    }
                );
            } else {
                fs.writeFile(
                    nombreArchivo,
                    contenidoArchivoLeido + contenidoArchivo,
                    (err) => {
                        if (err) {
                            console.error('Error escribiendo');
                            callback(undefined,err)
                        } else {
                            console.log('Archivo creado');
                            callback( contenidoArchivoLeido + contenidoArchivo);
                        }
                    }
                );
            }
        }
    );
}

appendFile('06-texto.txt',
    '\n Adios mundo',
    (contenidoArchivo) => {
    if(error){
        console.log('Error',error)
    }else{
        //se imprime el archivo
    }
    }
);