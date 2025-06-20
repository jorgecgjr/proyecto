<template>
<div class="card">
    <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
    <div class="btn-group me-2" role="group" aria-label="Second group">
        <button type="button" class="btn btn-secondary" @click="refresh">refresh</button>
        <button type="button" class="btn btn-secondary" @click="start">Iniciar</button>
        <button type="button" class="btn btn-secondary" @click="stop">Detener</button>
    </div>
    </div>
    <div class="card-body">
        <div class="row row-cols-1 row-cols-md-3 g-4">
            <Dispositivo  v-for="(item,index) in dispositivos" :key="index" :dispositivo="item" @setDispositivo="setDispositivo" @deleteDispositivo="deleteDispositivo"></Dispositivo>
        </div>
    </div>
    <DispositivoDialogo :dispositivo="dispositivo"/>
</div>
</template>
<script>
//    import DSDispositivos from '@/servicios/dsDispositivos'
    import axios from 'axios'
    import Dispositivo from './Dispositivo.vue'
    import DispositivoDialogo from './DispositivoDialogo.vue'

    export default {
        name: 'ViewDispositivos',
        components: {
            Dispositivo,
            DispositivoDialogo
        },
        data() {
            return {
                uri: 'http://localhost:8080',
                nIntervId: null,
                dispositivo: {
                    identifica: {
                        identificador: 0,
                        nombre: 'Nombre del Dispositivo',
                        ubicacion: 'Ubicación',
                        coordenadas: '19.7060° N, 101.1950° W',
                        potencia:  { nominal: 7.200, minimo: 6.200, maximo: 8.600, um: 'KW' },
                        voltaje: { nominal: 240, minimo: 230, maximo: 250, um: 'Volts' },
                        corriente: { nominal: 30, minimo: 25, maximo: 35, um: 'Amperes' },
                        caudal: { nominal: 1, minimo: 0.10, maximo: 1.20, um: 'm3/minuto' },
                        fechaRegistro: new Date().toUTCString()
                    },
                    opera: {
                        potencia: { valor: 7.200, idEstatus: 1 },
                        voltaje: { valor: 240, idEstatus: 1 },
                        corriente: { valor: 30, idEstatus: 1 },
                        caudal: { valor: 1, idEstatus: 1 },
                        idEstatus: 1,    // {1->Normal, 2->Advertencia, 3->Error}
                        estatus: 'Operacion Normal',
                        fechaRegistro: new Date().toUTCString()
                    },
                    estado: 1   // {1->Encendido, 2->Apagado, 3->Bloqueado}                    
                },
                dispositivos: []
            }
        },
        computed: {
            /*
          dispositivosx() {
            return this.$store.state.dispositivos
          }
            */
        },
        methods:{
            setDispositivo(dispositivo) {
                this.dispositivo = dispositivo
            },
            getDispositivos() {
                axios.get(`${this.uri}/dispositivos`,{
                    params: {}
                })
                .then((response) => {
                    if(response.status === 200){
                        this.dispositivos = response.data
                        //this.refresh()
                    }
                })
                .catch((response) => {
                    console.log(response)
                })
            },           
            deleteDispositivo(id) {
                console.log(`${this.uri}/dispositivos/${id}`)
                axios.delete(`${this.uri}/dispositivos/${id}`)
                .then((response) => {
                    if(response.status === 200){
                        this.getDispositivos()
                    }
                })
                .catch((response) => {
                    console.log(response)
                })
            },
            refresh() {
                this.dispositivos.forEach((item,index)=>{
                    let desviacion=0.02, rangoL=1
                    let voltaje = item.identifica.voltaje.minimo +
                                (((item.identifica.voltaje.maximo - item.identifica.voltaje.minimo) +
                                (item.identifica.voltaje.nominal * desviacion)) * Math.random())
                    let corriente = item.identifica.corriente.minimo +
                                (((item.identifica.corriente.maximo - item.identifica.corriente.minimo) +
                                (item.identifica.corriente.nominal * desviacion)) * Math.random())
                    let caudal = item.identifica.caudal.minimo +
                                (((item.identifica.caudal.maximo - item.identifica.caudal.minimo) +
                                (item.identifica.caudal.nominal * desviacion)) * Math.random())
                    let potencia = (voltaje * corriente)/1000
                    let ideCaudal, ideVoltaje, ideCorriente, idePotencia, idEstatus, estatus

                    if(voltaje < item.identifica.voltaje.minimo || voltaje > item.identifica.voltaje.maximo) {
                        ideVoltaje = 3
                    } else { 
                        if(voltaje < (item.identifica.voltaje.minimo + rangoL) || voltaje > (item.identifica.voltaje.maximo-rangoL)) {
                            ideVoltaje = 2
                        } else { 
                            ideVoltaje = 1
                        }
                    }

                    if(corriente < item.identifica.corriente.minimo || corriente > item.identifica.corriente.maximo) {
                        ideCorriente = 3
                    } else {
                        if(corriente < (item.identifica.corriente.minimo + rangoL) || corriente > (item.identifica.corriente.maximo-rangoL)) {
                            ideCorriente = 2
                        } else { 
                            ideCorriente = 1
                        }
                    }

                    if(potencia < item.identifica.potencia.minimo || potencia > item.identifica.potencia.maximo) {
                        idePotencia = 3
                    } else { 
                        if(potencia < (item.identifica.potencia.minimo + rangoL) || potencia > (item.identifica.potencia.maximo-rangoL)) {
                            idePotencia = 2
                        } else {
                            idePotencia = 1
                        }
                    }

                    if(caudal < item.identifica.caudal.minimo || caudal > item.identifica.caudal.maximo) {
                        ideCaudal = 3
                    } else {
                        if(caudal < (item.identifica.caudal.minimo + rangoL) || caudal > (item.identifica.caudal.maximo-rangoL)) {
                            ideCaudal = 2
                        } else { 
                            ideCaudal = 1
                        }
                    }

                    idEstatus = idePotencia + ideVoltaje + ideCorriente + ideCaudal
                    idEstatus = idEstatus < 6 ? 1 : (idEstatus > 5 && idEstatus < 10 ? 2 : 3)
                    estatus = idEstatus===1 ? 'Operación Normal' : (idEstatus===2 ? 'Advertencia' : 'Error')
                    this.dispositivos[index].opera = {
                        potencia: { valor: this.roundString(potencia), idEstatus: idePotencia },
                        voltaje: { valor: this.roundString(voltaje), idEstatus: ideVoltaje },
                        corriente: { valor: this.roundString(corriente), idEstatus: ideCorriente },
                        caudal: { valor: this.roundString(caudal), idEstatus: ideCaudal },
                        idEstatus: idEstatus,
                        estatus: estatus,
                        fechaRegistro: new Date().toUTCString()
                    }
                })                
            },
            start() {
                if (!this.nIntervId) {
                    this.nIntervId = setInterval(()=>{this.refresh()}, 1000);
                }
            },
            stop() {
                clearInterval(this.nIntervId);
                this.nIntervId = null;
            },
            nuevo(dispositivo) {
                this.dispositivos.push(disppsitovo)
            },
            roundString(n) {
                let nn = Math.floor(n)
                return (''+ nn + ',' + Math.floor((n-nn) * 100))

            }
        },
        created () {
            this.getDispositivos()
          //this.$store.commit('setDispositivos', DSDispositivos.getListaDataStore())
        }
    }
    </script>
    