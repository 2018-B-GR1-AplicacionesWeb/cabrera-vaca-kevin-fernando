function ejemplo() {}
var ejemploDos = function () {};//anonymous funtion
var ronald ={
    trabajar:function () {
        return 'Trabajando';
    }
};
var arregloFunciones =[function () {//Anonymous funtion
}];
var variableUno;//NUNCA USAR
let variableDos=2;//USAR mutable(este se asigna a otro valor)
variableDos=variableDos+1;
const pi=3.1416;//Intente usar const siempre

console.log( typeof ejemplo);//tipo de dato -> funtion
console.log( ejemplo);//definicion de la funcion
console.log( ejemplo());//ejecucion de la funtion
//operadores

const arregloDeNombre =['A','b','C'];
arregloDeNombre [1] ='B';
arregloDeNombre.push('D');
//arregloDeNombre ={};
//arregloDeNombre =[];

const vicente={
    nombre:'Vicente'
}
vicente.nombre='Adrian';
vicente.edad=24;
const casado =true;
//casado = false; Cambiar booleanos
const  apellido ='';
//apellido = '123'; Cambiar Strings
const edad =12;
//edad =22 Cambiar numeros
const variableNull= null
//variableNull =1; Cambiar null
arregloDeNombre.forEach(//escribir codigo que se entienda
    function (valorActual,indiceAcutal,arreglo) {
        console.log('Valor Actual',valorActual)
        console.log('Indice Actual',indiceAcutal)
        console.log('Arreglo',arreglo)
    }
);
//funtion con nombre
//funtion anonymous
//fat arrow funtion
arregloDeNombre.forEach(//escribir codigo que se entienda
    (valorActual,indiceAcutal,arreglo)=> {
        console.log('Valor Actual',valorActual)
        console.log('Indice Actual',indiceAcutal)
        console.log('Arreglo',arreglo)
    }
);
const sumarDosNumeros = (numUno,numDos) => {return numUno+numDos};
const sumarDosNumerosV2 = (numUno,numDos) => numUno+numDos;
const elevarAlCuadrado = (numero) => numero * numero;
const elevarAlCuadradoV2 = numero => numero * numero;


const arregloNombreDos =['E','F','G','H'];
const  resultado = arregloDeNombre.map(//muta cada elemento del arreglo
    valorActual=>{
        return valorActual + '.';
    }
)//devolver un arreglo
    .forEach(//undefined
        (valorNuvo)=>console.log(valorNuvo)
    );
console.log(resultado)
const  arregloNumeros=[2,3,1,5,6,4,7,8,9,10];
const resultadoFilter = arregloNumeros
    .filter(valorActual=> (valorActual % 2)===0 );//exprecion
console.log(resultadoFilter)
//triple igual
if ('1' === 1){
    console.log('es verdad')
}else{
    console.log('es falso')
}
//every
const resultadoEvery = arregloNumeros
    .every(n=>n>1);// si cumle todos True/false
console.log(resultadoEvery);
//some
const resultadoSome= arregloNumeros
    .some(n=>n>0);// si uno cumple condicion TRUE/FALSe
console.log(resultadoSome);
//findIndex
const resultadoFindIndex= arregloNumeros
    .findIndex(n=>n===7);

console.log(resultadoFindIndex);
console.log(arregloNumeros.indexOf(7));
//find
const  resultadFind = arregloNumeros
    .find(n=>n===7);
console.log(resultadFind);

//reduce
const resultadoReduce = arregloNumeros
    .reduce(
        (valorActualDelNumero, valorActualDelArreglo)=>{//1er parametro una funtion
            return valorActualDelNumero-valorActualDelArreglo;
        },
        100 //Acepta un valor
    );
console.log(resultadoReduce);

const resultadoReduce2 = arregloNumeros.reduceRight((a, b,indice)=>{
    if (indice>4){
        return a+b
    }else {
        return a
    }
});
console.log(resultadoReduce2);
const cloneArregloNumeros = JSON.parse(JSON.stringify(arregloNumeros));
console.log(cloneArregloNumeros);

const  resultadoSort = arregloNumeros.sort((a,b)=>a-b);
console.log(resultadoSort);
const  resultadoSort2 = cloneArregloNumeros .sort((a,b)=>b-a);
console.log(resultadoSort2);
