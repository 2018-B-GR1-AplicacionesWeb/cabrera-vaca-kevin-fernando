const calculadora = require('02-calculadora');
const util = require('../05-nodejs-02/01-util');
const tiempo = require('./tiempo/01-tiempo');
const fs = require('fs');


console.log('calculadora',calculadora.nombreCalculadora);
console.log('calculadora',calculadora.sumarDosNumeros(1,2));
console.log(tiempo);
console.log(fs);
console.log('util',util);
