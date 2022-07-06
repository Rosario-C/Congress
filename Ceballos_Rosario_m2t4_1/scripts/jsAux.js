// const estadosOrdenados = (array) => { //enotnecs acá abren una funcion flecha, le dan arraystate como parametro
//     const stateFilter = []; //aca creamos un array nuevo porque vamos a usar filter y necesitamos donde meter nuestros elementos del array que pasen las condiciones que nosotros queremos que tengan
//     members.forEach(estado => {
//         if (!stateFilter.includes(estado.state)) {
//             stateFilter.push(estado.state)
//         };
//     });
//     return stateFilter.sort();
// };
// estadosOrdenados(data)


//         // //  COMIENZO DE MI TABLA CON LOS NOMBRES, APELLIDOS, ESTADOS, PARTIDOS 
//         // let table = document.querySelector("#cuerpoTabla-senate") ? "senate" : "house";

//         const dibujandoTabla = (tablaInfo, id) => { //COMIENZO LLAMANDO UNA FUNCIÓN PARA DIBUJAR LA TABLA EN LA PÁGINA, Y QUIERO USAR LA INFORMACIÓN QUE LE VOY A METER A LA TABLA JUNTO CON EL ID DE LA TABLA QUE SE TIENE QUE CREAR
//             let contenido = document.querySelector(`#${id}`);
//             contenido.innerHTML = ""
//             tablaInfo.forEach(miembro => { //EMPIEZO UNA FUNCION QUE TOMA LOS DATOS QUE NECESITO, LES HACE UN FOREACH PARA RECORRERLO, Y USO UN PARAMETRO MIEMBRO
//                 let listaMiembros = document.createElement("tr"); //LE DIGO QUE CREE UNA VARIABLE, Y EN ESA VARIABLE ESTÁ GUARDADO EL DATO DE CREAR ELEMENTOS 
//                 listaMiembros.innerHTML = `               
//         <td> <a href = "${miembro.url}">${miembro.last_name} 
//         ${miembro.middle_name ? miembro.middle_name :""} 
//         ${miembro.first_name}</a></td>
//             <td>${miembro.party}</td>
//             <td>${miembro.state}</td>
//             <td>${miembro.seniority} years</td>
//             <td>${miembro.votes_with_party_pct} Votes</td>
//             `
//                 contenido.appendChild(listaMiembros); //CONTENIDO ES LA TABLA QUE SACAMOS POR EL ID, POR LO TANTO LE TENEMOS QUE AGREGAR LO QUE HICIMOS EN MIEMBROS

//             });
//         };

//         dibujandoTabla(members, `cuerpoTabla-${chamber}`); //NO ME ACUERDO BIEN POR QUÉ, PERO TUVIMOS QUE BUSCAR LOS DATOS DESDE EL PRINCIPIO XQ SINO SE ROMPE

//         /////////// COMIENZO DE FUNCIÓN Y EVENT PARA FILTRAR ESTADOS Y PARTIDOS 

//         const seleccionar = document.querySelector("form");
//         const estados = document.querySelector("select");
//         ///////////////////////////////////////////////////////////////////////////
//         const checkearTodo = document.querySelectorAll("input[type='checkbox']");
//         const arrayCheck = Array.from(checkearTodo) //quiero que checkear todo sea un array para poder filtrar su contenido, porque el nodelist no tiene esa funcion

//         //-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-/

// seleccionar.addEventListener("change", () => {
//     let filtrando = arrayCheck.filter(elPartido => elPartido.checked); //como checkbox no me da otro valor, siempre le tengo que preguntar si es true o false, porque después le pido que me filtre lo que sea true
//     let elPartidoQueQuiero = filtrando.map(elPartido => elPartido.value); //hago un map porque solo quiero los elementos de ese valor 
//     let misPartidos = [];
//     const filtrarPorPartidos = () => { //CREO UNA FUNCION QUE ME FILTRE LOS PARTIDOS, NO SÉ POR QUÉ NO LE DAMOS UN PARÁMETRO, DEBE SER PORQUE NO HACE FALTA 
//         if (elPartidoQueQuiero.length == 0) { //CUANDO HAGO ESTO, LE ESTOY DICIENDO QUE SI NADA DE MI PARTIDO ESTÁ MARCADO, NINGUNA DE LAS POSICIONES ESTÁ CHECK, ME IMPRIMA LO SIGUIENTE 
//             misPartidos = data.results[0].members //LO SIGUIENTE-----> TODO
//         } else { //SINO, SI HAY ALGO MARCADO, VOY A QUERER QUE ME IMPRIMA LO QUE SEA IGUAL AL PARTIDO DEL MEMBER 
//             members.forEach(miembros => {
//                 elPartidoQueQuiero.forEach(arrayCheckValores => miembros.party == arrayCheckValores ? misPartidos.push(miembros) : "");
//             }) //si en el check no hay nada tildado,m que me imprima todo
//         }
//         dibujandoTabla(misPartidos, `cuerpoTabla-${chamber}`);

//     }
//     filtrarPorPartidos()

//             let chosenSelector = estados.value;
//             console.log(chosenSelector)

//             //////FUNCION FILTRAR POR ESTADOS ///////////

//             const filtrarEstados = () => {
//                 let stateFiltrated = [];
//                 misPartidos.forEach(miembros => {
//                     if (chosenSelector == "all") {
//                         stateFiltrated.push(miembros)
//                     } else if (chosenSelector == miembros.state) {
//                         stateFiltrated.push(miembros);
//                     };
//                 });
//                 dibujandoTabla(stateFiltrated, `cuerpoTabla-${chamber}`)
//             };
//             filtrarEstados();
//         });
//         ///////////////////////////////////////////////////////////////////////

//         ///// FUNCIÓN PARA AGREGAR OPTION CON TODOS LOS ESTADOS AL SELECT 

//         const dibujandoSelect = (datosEstado) => {
//             datosEstado.forEach(stateFilter => { // aca empieza la función, con el state filter como paràmetro
//                 let options = document.createElement("option") //
//                 options.innerHTML = stateFilter; // 
//                 options.value = stateFilter;
//                 estados.appendChild(options);
//             });
//         };
//         dibujandoSelect(estadosOrdenados(data));
//     }else{

//         let contadorR = 0;
//         let contadorD = 0;
//         let contadorID = 0;

//         let votosR = 0;
//         let votosD = 0;
//         let votosID = 0;

//         members.forEach(miembro => {
//             if (miembro.party == "ID") {
//                 contadorID++;
//                 votosID = votosID + miembro.votes_with_party_pct;

//             };
//             if (miembro.party == "R") {
//                 contadorR++;
//                 votosR = votosR + miembro.votes_with_party_pct;

//             };
//             if (miembro.party == "D") {
//                 contadorD++;
//                 votosD = votosD + miembro.votes_with_party_pct;

//             };

//         });

//         let resultadoR = Math.floor(votosR / contadorR);
//         let resultadosD = Math.floor(votosD / contadorD);
//         let resultadosID = Math.floor(votosID / contadorID);

//         if (contadorID == 0) {
//             resultadosID = 0
//         };

//         // console.log(contadorR, contadorD, contadorID);
//         let miembrosTotal = contadorD + contadorID + contadorR;

//         let porcentajeTotal = votosD + votosR + votosID;

// TABLA GLANCE
// let tablaGlance = document.querySelector(`#tablaTotal-${chamber}`); //como hago para que un string pueda contener una variable adentro
// tablaGlance.innerHTML = `
// <tr> <td>Democratic</td> <td>${contadorD}</td> <td>${resultadosD}%</td> </tr>
// <tr><td>Republican</td> <td>${contadorR}</td> <td>${resultadoR}%</td> </tr>
// <tr><td>Independent</td> <td>${contadorID}</td> <td>${resultadosID}%</td> </tr>
// <tr><td>Total</td> <td>${miembrosTotal}</td> <td>${Math.floor(porcentajeTotal/miembrosTotal)}%</td> 
//         //___PRIMER PASO: SACAR EL 10%___
//         let porcenjateDiez = Math.floor(miembrosTotal * 0.10);

//         //__SEGUNDO PASO: ORDENAR MIS DATOS (SORT)___
//         const ordenarMenor = (x, y) => y.missed_votes_pct - x.missed_votes_pct;
//         const ordenarMayor = (x, y) => x.missed_votes_pct - y.missed_votes_pct

//         const lealtadMayor = (x, y) => y.votes_with_party_pct - x.votes_with_party_pct; // aca lo estoy ordenando de mayor a menor, siendo x el menor
//         const lealtadMenor = (x, y) => x.votes_with_party_pct - y.votes_with_party_pct;

//         //___TERCER PASO: CORTAR LISTA ORDENADA__ 
//         function cortarArray(array) { //creo una función para todos los array, y con esto las vamos a cortar
//             let arrayCortado = []; //dentro ed la función creo una variable para poder almacenar los datos
//             for (let i = 0; i < porcenjateDiez; i++) { //iteramos, para de iterar cuando recorre el 10% del array original 
//                 arrayCortado.push(array[i]); //pusheo los miembros que iteré
//             };
//             return arrayCortado; //devuelvo con return para luego poder usar esa información feura de mi función
//         };

//         //___CUARTO PASO: DIBUJAR MIS TABLAS___

//         function crearTablas(id, sortedCuttedArray, datoUno, datoDos) {
//             let tabla = document.getElementById(`${id}`); //la id como tal es una variable, la idea es que el id se dinámico, dependiendo de lo que le pase como parametro
//    
//             sortedCuttedArray.forEach(miembro => {   //miembro, parametro de forEach, representa a todos los miembros one by one
//                 let cantidadVotos = (miembro.votes_with_party_pct * miembro.total_votes) / 100;
//                 console.log(cantidadVotos);
//                 let filaMiembros = document.createElement("tr");
//                 filaMiembros.innerHTML = `
//             <td> <a href = "${miembro.url}">${miembro.last_name} 
//             ${miembro.middle_name ? miembro.middle_name :""} 
//             ${miembro.first_name}</a></td>
//             <td>${datoUno == "missed_votes"? miembro[datoUno] : Math.floor(cantidadVotos)} </td>
//             <td>${miembro[datoDos]}%</td>
//             `
//                 tabla.appendChild(filaMiembros);
//             });
//         };

//         const mains = document.querySelector("main");

//         if(mains.id == "attendance"){

//         //__MENORES__
//         let menores = members.sort(ordenarMenor);
//         let arrayCortadoMe = cortarArray(menores);
//         crearTablas("tablaMenorCompromiso", arrayCortadoMe, "missed_votes", "missed_votes_pct");

//         //__MAYORES__
//         let mayores = members.sort(ordenarMayor);
//         let arrayCortadoMa = cortarArray(mayores); // creo una variable xq la necesito, y ahí llamo a mi función con su respectivo parámetro 
//         crearTablas("tablaMayorCompromiso", arrayCortadoMa, "missed_votes", "missed_votes_pct");
//         } 
//         //______LOYALTY______
//         else if (mains.id == "loyalty"){

//         let masLeales = members.sort(lealtadMayor);
//         let arrayMostLoyal = cortarArray(masLeales);
//         crearTablas("tablaMayorLealtad", arrayMostLoyal, "algo", "votes_with_party_pct");

//         let menosLeales = members.sort(lealtadMenor);
//         let arrayLeastLoyal = cortarArray(menosLeales);
//         crearTablas("tablaMenorLealtad", arrayLeastLoyal, "algo", "votes_with_party_pct")
//         };
//         }
//     });