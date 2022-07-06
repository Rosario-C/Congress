let chamber = document.querySelector(".senate") ? "senate" : "house";

let URLAPI = `https://api.propublica.org/congress/v1/113/${chamber}/members.json`;

let bodyhtml = document.querySelector("body");

let init = {
    method: "GET",
    headers: {
        "X-API-Key": "ournQsaUKTYWSA4QpHLPfKbMzR66B6sqWrOtIXek",
    },
};
Vue.createApp({
    data() {
        return {
            message: 'Hello Vue!', //esto es una variable y la podemos usar en html
            miembros: [], 

            miembrosFiltrados: [],

            checkeador: [],

            sortedStates: [],
            alreadyFiltered: [],
            chosenSelector: "all",
            myLastFilter: [],
            
            contadorR: 0,
            contadorD: 0,
            contadorID: 0,

            votosR: 0,
            votosD: 0,
            votosID: 0,

            miembrosTotal: 0,
            porcentajeTotal: 0,

            resultadoR: 0,
            resultadosD: 0,
            resultadosID: 0,

            arrayCortadoMa: [],
            arrayCortadoMe: [],
            arrayMostLoyal: [],
            arrayLeastLoyal: [],

        }
    },
    created() { //van los datos que se reciben
        fetch(URLAPI, init)
            .then(response => response.json())
            .then(data => {
                this.miembros = data.results[0].members
                this.estadosOrdenados(this.miembros)
                this.contarMiembrosPorPartido()
                this.tablas()
            })

    },

    methods: { //declaro las funciones

        estadosOrdenados(array) { //enotnecs acá abren una funcion flecha, le dan arraystate como parametro
            let stateFilter = []; //aca creamos un array nuevo porque vamos a usar filter y necesitamos donde meter nuestros elementos del array que pasen las condiciones que nosotros queremos que tengan
            array.forEach(miembro => {
                if (!stateFilter.includes(miembro.state)) {
                    stateFilter.push(miembro.state)
                };
            });
            this.sortedStates = stateFilter.sort()
        },
        filtrarPorPartidos() {
            let miembrosFiltradosPorPartido = []
            if (this.checkeador.length == 0) {

                miembrosFiltradosPorPartido = this.miembros
            } else {
                this.miembros.forEach(miembros => {
                    this.checkeador.forEach(arrayCheckValores => miembros.party == arrayCheckValores ? miembrosFiltradosPorPartido.push(miembros) : "");
                })
            }
            this.alreadyFiltered = miembrosFiltradosPorPartido
        },

        filtrarPorEstados() {

            let filtrarMiembrosPorEstado = [];
            this.alreadyFiltered.forEach(miembros => {
                if (this.chosenSelector == "all") {
                    filtrarMiembrosPorEstado.push(miembros)
                } else if (this.chosenSelector == miembros.state) {
                    filtrarMiembrosPorEstado.push(miembros);
                };
            });
            this.myLastFilter = filtrarMiembrosPorEstado
        },
        contarMiembrosPorPartido() {
            this.miembros.forEach(miembro => {
                if (miembro.party == "ID") {
                    this.contadorID++;
                    this.votosID = this.votosID + miembro.votes_with_party_pct;

                };
                if (miembro.party == "R") {
                    this.contadorR++;
                    this.votosR = this.votosR + miembro.votes_with_party_pct;

                };
                if (miembro.party == "D") {
                    this.contadorD++;
                    this.votosD = this.votosD + miembro.votes_with_party_pct;

                };

            });

            this.resultadoR = Math.floor(this.votosR / this.contadorR);
            this.resultadosD = Math.floor(this.votosD / this.contadorD);
            this.resultadosID = Math.floor(this.votosID / this.contadorID);

            if (this.contadorID == 0) {
                this.resultadosID = 0
            };
            this.miembrosTotal = Math.floor(this.contadorD + this.contadorID + this.contadorR)

            this.porcentajeTotal = Math.floor(this.votosR + this.votosD + this.votosID)

        },

        //___PRIMER PASO: SACAR EL 10%___
        tablas() {
            let porcenjateDiez = Math.floor(this.miembros.length * 0.10);

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
            //__MENORES__
            let menores = this.miembros.sort(ordenarMenor);
            this.arrayCortadoMe = cortarArray(menores);


            //__MAYORES__
            let mayores = this.miembros.sort(ordenarMayor);
            this.arrayCortadoMa = cortarArray(mayores); // creo una variable xq la necesito, y ahí llamo a mi función con su respectivo parámetro 


            let masLeales = this.miembros.sort(lealtadMayor);
            this.arrayMostLoyal = cortarArray(masLeales);


            let menosLeales = this.miembros.sort(lealtadMenor);
            this.arrayLeastLoyal = cortarArray(menosLeales);


        },
    },
    computed: { //las funciones que quiero que se esten ejecutancdo constantemente(((add.event.listener)))
        actualizarTablas() {
            this.filtrarPorPartidos(),
                this.filtrarPorEstados()

        }
    }
}).mount('#app')
