const fs = require ('fs');

fs.readFile('04-operadores.js','utf-8',(err,data)=> {
    if (err) {
        console.error(err);
        try {
            throw new Error(err);
        } catch (e) {
            console.log(e);
        }

        }
        //throw  new Error(err);
    }
    else {
        console.log(data);
    }
});
