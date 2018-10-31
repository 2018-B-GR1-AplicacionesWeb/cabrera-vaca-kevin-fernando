// 07-promesas.js
const fs = require('fs');

/*const nuevaPromesaDeLectura = new Promise(
    (resolve , reject)=>{
        fs.readFile('06-texto.txt','utf-8',
            (err,contenidoArchivo)=>{
            if(err){
                reject(err);
            }else{
                resolve(contenidoArchivo);
            }
            })
    }
);

const nuevaPromesaDeEscritura = () => {return new Promise(
    (resolve , reject)=>{

        const contenido = contenidoLeido?contenidoLeido+'otro ola' : 'Otro ola';

        fs.writeFile('06-texto.txt','Web - Gr1',
            (err,contenidoArchivo)=>{
                if(err){
                    reject(err);
                }else{
                    resolve();
                }
            })
    }
)};

console.log(nuevaPromesaDeEscritura);
nuevaPromesaDeLectura.then(
    (contenidoArchivo)=>{
        console.log('Todo bien',contenidoArchivo);
        return nuevaPromesaDeEscritura(contenidoArchivo)
    }
)
    .then(
        (contenidoCompleto)=> {
            console.log('Contenido Completo', contenidoCompleto);
        }
    )
.catch(
    (resultadoError)=>{
        console.log('Algo malo paso',resultadoError);
    }
);*/

const appendFile = (nombreArchivo, newTexto) => {return new Promise(
    (resolve , reject)=>{
        fs.readFile(nombreArchivo,'utf-8',
            (err,contenidoLeido)=>{
                if(err){
                    const parametrosReject = {
                        falla: err,
                        archivo: nombreArchivo,
                        nuevoTexto: newTexto
                    }
                    reject(parametros);
                }else{
                    const parametrosSolve = {
                        archivo: nombreArchivo,
                        contenido: contenidoLeido,
                        nuevoTexto: newTexto
                    }
                    resolve(parametrosSolve);
                }
            })
    }
)};


appendFile()
    .then(
        (paramtrosSolve) => {
            fs.writeFile(
                paramtrosSolve.archivo,
                paramtrosSolve.contenido + paramtrosSolve.nuevoTexto,
                (err) => {
                    if (err) {
                        console.error('Error escribiendo');
                        callback(err);
                    } else {
                        console.log('Archivo creado');
                        //callback(undefined, contenidoArchivoLeido + contenidoArchivo);
                    }
                }
            )
        }
)
    .catch(
        (parametrosReject) => {
            fs.writeFile(parametrosReject.archivo, parametrosReject.nuevoTexto,
                (err) => {
                    if (err) {
                        console.error('Error escribiendo');
                        callback(err);
                    } else {
                        console.log('Archivo creado');
                        //callback(undefined, contenidoArchivo);
                    }
                }
                )
        }
    );
