
const dataBase = data.results[0].members;

let contadorR = 0;
let contadorD = 0;
let contadorID = 0;

let votosR = 0;
let votosD = 0;
let votosID = 0;

dataBase.forEach(miembro => {
    if (miembro.party == "ID") {
        contadorID++;
        votosID = votosID + miembro.votes_with_party_pct;

    };
    if (miembro.party == "R") {
        contadorR++;
        votosR = votosR + miembro.votes_with_party_pct;

    };
    if (miembro.party == "D") {
        contadorD++;
        votosD = votosD + miembro.votes_with_party_pct;

    };

});

let resultadoR = Math.floor(votosR / contadorR);
let resultadosD = Math.floor(votosD / contadorD);
let resultadosID = Math.floor(votosID / contadorID);

if (contadorID == 0) {
    resultadosID = 0
};

// console.log(contadorR, contadorD, contadorID);
let miembrosTotal = contadorD + contadorID + contadorR;

let porcentajeTotal = votosD + votosR + votosID;

//TABLA GLANCE
let tablaGlance = document.querySelector("#tablaTotal"); //como hago para que un string pueda contener una variable adentro
tablaGlance.innerHTML = `
<tr> <td>Democratic</td> <td>${contadorD}</td> <td>${resultadosD}%</td> </tr>
<tr><td>Republican</td> <td>${contadorR}</td> <td>${resultadoR}%</td> </tr>
<tr><td>Independent</td> <td>${contadorID}</td> <td>${resultadosID}%</td> </tr>
<tr><td>Total</td> <td>${miembrosTotal}</td> <td>${Math.floor(porcentajeTotal/miembrosTotal)}%</td> </tr>
`

//___PRIMER PASO: SACAR EL 10%___
let porcenjateDiez = Math.floor(miembrosTotal * 0.10);

//__SEGUNDO PASO: ORDENAR MIS DATOS (SORT)___
const ordenarMenor = (x, y) => y.missed_votes_pct - x.missed_votes_pct;
const ordenarMayor = (x, y) => x.missed_votes_pct - y.missed_votes_pct

const lealtadMayor = (x, y) => y.votes_with_party_pct - x.votes_with_party_pct; // aca lo estoy ordenando de mayor a menor, siendo x el menor
const lealtadMenor = (x, y) => x.votes_with_party_pct - y.votes_with_party_pct;

//___TERCER PASO: CORTAR LISTA ORDENADA__ 
function cortarArray(array) { //creo una función para todos los array, y con esto las vamos a cortar
    let arrayCortado = []; //dentro ed la función creo una variable para poder almacenar los datos
    for (let i = 0; i < porcenjateDiez; i++) { //iteramos, para de iterar cuando recorre el 10% del array original 
        arrayCortado.push(array[i]); //pusheo los miembros que iteré
    };
    return arrayCortado; //devuelvo con return para luego poder usar esa información feura de mi función
};

//___CUARTO PASO: DIBUJAR MIS TABLAS___

function crearTablas(id, sortedCuttedArray, datoUno, datoDos) {
    let tabla = document.getElementById(`${id}`); //la id como tal es una variable, la idea es que el id se dinámico, dependiendo de lo que le pase como parametro
    console.log(tabla);
    console.log(sortedCuttedArray);
    sortedCuttedArray.forEach(miembro => {   //miembro, parametro de forEach, representa a todos los miembros one by one
        let cantidadVotos = (miembro.votes_with_party_pct * miembro.total_votes) / 100;
        console.log(cantidadVotos);
        let filaMiembros = document.createElement("tr");
        filaMiembros.innerHTML = `
    <td> <a href = "${miembro.url}">${miembro.last_name} 
    ${miembro.middle_name ? miembro.middle_name :""} 
    ${miembro.first_name}</a></td>
    <td>${datoUno == "missed_votes"? miembro[datoUno] : Math.floor(cantidadVotos)} </td>
    <td>${miembro[datoDos]}%</td>
    `
        tabla.appendChild(filaMiembros);
    });
};

const mains = document.querySelector("main");

if(mains.id == "attendance"){

//__MENORES__
let menores = dataBase.sort(ordenarMenor);
let arrayCortadoMe = cortarArray(menores);
crearTablas("tablaMenorCompromiso", arrayCortadoMe, "missed_votes", "missed_votes_pct");

//__MAYORES__
let mayores = dataBase.sort(ordenarMayor);
let arrayCortadoMa = cortarArray(mayores); // creo una variable xq la necesito, y ahí llamo a mi función con su respectivo parámetro 
crearTablas("tablaMayorCompromiso", arrayCortadoMa, "missed_votes", "missed_votes_pct");
} 
//______LOYALTY______
else if (mains.id == "loyalty"){

let masLeales = dataBase.sort(lealtadMayor);
let arrayMostLoyal = cortarArray(masLeales);
crearTablas("tablaMayorLealtad", arrayMostLoyal, "algo", "votes_with_party_pct");

let menosLeales = dataBase.sort(lealtadMenor);
let arrayLeastLoyal = cortarArray(menosLeales);
crearTablas("tablaMenorLealtad", arrayLeastLoyal, "algo", "votes_with_party_pct")
};
