const fs = require('fs');

const contenidoAAgregar = 'Kevin\n';
const nombreArchivo = '05-texto.txt';


console.log('Inicio');


fs.readFile(nombreArchivo,
    'utf-8',
    (error, contenidoArchivo) => {  // Callback
        if (error) {
            console.error(error);
            try {
                throw new Error(error);
            } catch (e) {
                console.log(e);
            }
            console.log('Extra')
        } else {
            // Callback Hell!
            //muy dificil de entender
            fs.writeFile(nombreArchivo, contenidoArchivo + contenidoAAgregar, (err) => {
                if (err) throw err;
                console.log('Archivo completado!');
                fs.writeFile(nombreArchivo, contenidoArchivo + contenidoAAgregar, (err) => {
                    if (err) throw err;
                    console.log('Archivo completado!');
                    fs.writeFile(nombreArchivo, contenidoArchivo + contenidoAAgregar, (err) => {
                        if (err) throw err;
                        console.log('Archivo completado!');
                        fs.writeFile(nombreArchivo, contenidoArchivo + contenidoAAgregar, (err) => {
                            if (err) throw err;
                            console.log('Archivo completado!');
                            fs.writeFile(nombreArchivo, contenidoArchivo + contenidoAAgregar, (err) => {
                                if (err) throw err;
                                console.log('Archivo completado!');
                                fs.writeFile(nombreArchivo, contenidoArchivo + contenidoAAgregar, (err) => {
                                    if (err) throw err;
                                    console.log('Archivo completado!');
                                    fs.writeFile(nombreArchivo, contenidoArchivo + contenidoAAgregar, (err) => {
                                        if (err) throw err;
                                        console.log('Archivo completado!');
                                        fs.writeFile(nombreArchivo, contenidoArchivo + contenidoAAgregar, (err) => {
                                            if (err) throw err;
                                            console.log('Archivo completado!');
                                            fs.writeFile(nombreArchivo, contenidoArchivo + contenidoAAgregar, (err) => {
                                                if (err) throw err;
                                                console.log('Archivo completado!');
                                                fs.writeFile(nombreArchivo, contenidoArchivo + contenidoAAgregar, (err) => {
                                                    if (err) throw err;
                                                    console.log('Archivo completado!');
                                                    fs.writeFile(nombreArchivo, contenidoArchivo + contenidoAAgregar, (err) => {
                                                        if (err) throw err;
                                                        console.log('Archivo completado!');
                                                        fs.writeFile(nombreArchivo, contenidoArchivo + contenidoAAgregar, (err) => {
                                                            if (err) throw err;
                                                            console.log('Archivo completado!');
                                                            fs.writeFile(nombreArchivo, contenidoArchivo + contenidoAAgregar, (err) => {
                                                                if (err) throw err;
                                                                console.log('Archivo completado!');
                                                                fs.writeFile(nombreArchivo, contenidoArchivo + contenidoAAgregar, (err) => {
                                                                    if (err) throw err;
                                                                    console.log('Archivo completado!');
                                                                    fs.writeFile(nombreArchivo, contenidoArchivo + contenidoAAgregar, (err) => {
                                                                        if (err) throw err;
                                                                        console.log('Archivo completado!');
                                                                        fs.writeFile(nombreArchivo, contenidoArchivo + contenidoAAgregar, (err) => {
                                                                            if (err) throw err;
                                                                            console.log('Archivo completado!');
                                                                            fs.writeFile(nombreArchivo, contenidoArchivo + contenidoAAgregar, (err) => {
                                                                                if (err) throw err;
                                                                                console.log('Archivo completado!');
                                                                                fs.writeFile(nombreArchivo, contenidoArchivo + contenidoAAgregar, (err) => {
                                                                                    if (err) throw err;
                                                                                    console.log('Archivo completado!');

                                                                                });
                                                                            });
                                                                        });
                                                                    });
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });

        }
    });


console.log('Fin');