<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3>Dispositivos de Bombeo</h3>
      <div>
        <button class="btn btn-primary me-2" @click="start">Iniciar Monitoreo</button>
        <button class="btn btn-secondary" @click="stop">Detener</button>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4 mb-4" v-for="dispositivo in dispositivos" :key="dispositivo.id">
        <Dispositivo :dispositivo="dispositivo" @setDispositivo="setDispositivo" />
      </div>
    </div>
    <DispositivoDialogo :dispositivo="selectedDispositivo" />
  </div>
</template>

<script>
import axios from 'axios';
import Dispositivo from './Dispositivo.vue';
import DispositivoDialogo from './DispositivoDialogo.vue';
import { Modal } from 'bootstrap';

export default {
  name: 'ViewDispositivos',
  components: {
    Dispositivo,
    DispositivoDialogo
  },
  data() {
  return {
    dispositivos: [],
    // Inicializa con una estructura válida para evitar errores
    selectedDispositivo: {
      identifica: {
        nombre: '',
        ubicacion: '',
        coordenadas: '',
        potencia: {},
        voltaje: {},
        corriente: {},
        caudal: {}
      },
      opera: {
        potencia: {},
        voltaje: {},
        corriente: {},
        caudal: {}
      }
    },
    nIntervId: null
  };
},
  methods: {
    async getDispositivos() {
      try {
        const response = await axios.get('http://localhost:3000/api/dispositivos');
        // Transformar los datos recibidos del backend
        this.dispositivos = response.data.map(dbDevice => ({
          identifica: {
            identificador: dbDevice.id,
            nombre: dbDevice.nombre,
            ubicacion: dbDevice.ubicacion,
            coordenadas: dbDevice.coordenadas,
            potencia: dbDevice.potencia,
            voltaje: dbDevice.voltaje,
            corriente: dbDevice.corriente,
            caudal: dbDevice.caudal,
            fechaRegistro: dbDevice.fecha_registro
          },
          opera: {
            // Inicializamos los valores de operación, la simulación los actualizará
            potencia: { valor: dbDevice.potencia.nominal, idEstatus: 1 },
            voltaje: { valor: dbDevice.voltaje.nominal, idEstatus: 1 },
            corriente: { valor: dbDevice.corriente.nominal, idEstatus: 1 },
            caudal: { valor: dbDevice.caudal.nominal, idEstatus: 1 },
            idEstatus: 1,
            estatus: 'Operacion Normal',
            fechaRegistro: new Date().toUTCString()
          },
          estado: dbDevice.estado
        }));

        if (this.dispositivos.length > 0) {
          // Aseguramos que el dispositivo seleccionado tenga la estructura correcta
          this.selectedDispositivo = this.dispositivos[0];
        }
      } catch (error) {
        console.error('Error fetching devices:', error);
      }
    },
    setDispositivo(dispositivo) {
      this.selectedDispositivo = dispositivo;
      this.$nextTick(() => {
        const modalElement = document.getElementById('detalleDispositivo');
        if (modalElement) {
          const modal = new bootstrap.Modal(modalElement);
          modal.show();
        }
      });
    },
    start() {
      if (!this.nIntervId) {
        console.log('Iniciando monitoreo...');
        this.nIntervId = setInterval(this.refresh, 2000);
      }
    },
    stop() {
      console.log('Deteniendo monitoreo...');
      clearInterval(this.nIntervId);
      this.nIntervId = null;
    },
    // Este método ya estaba corregido en el chat anterior.
    // Lo incluyo aquí para asegurar que tienes la versión correcta.
    refresh() {
        console.log('Refrescando datos...');
        this.dispositivos.forEach((item) => {
            const desv = 0.10; // Desviación del 10%
            const rangoL = 5;

            const voltaje = item.identifica.voltaje.minimo + (((item.identifica.voltaje.maximo - item.identifica.voltaje.minimo) + (item.identifica.voltaje.nominal * desv)) * Math.random());
            const corriente = item.identifica.corriente.minimo + (((item.identifica.corriente.maximo - item.identifica.corriente.minimo) + (item.identifica.corriente.nominal * desv)) * Math.random());
            const caudal = item.identifica.caudal.minimo + (((item.identifica.caudal.maximo - item.identifica.caudal.minimo) + (item.identifica.caudal.nominal * desv)) * Math.random());
            const potencia = (voltaje * corriente) / 1000;

            const getEstatus = (valor, min, max) => {
                if (valor < min || valor > max) return 3; // Error
                if (valor < (min + rangoL) || valor > (max - rangoL)) return 2; // Advertencia
                return 1; // Normal
            };

            const ideVoltaje = getEstatus(voltaje, item.identifica.voltaje.minimo, item.identifica.voltaje.maximo);
            const ideCorriente = getEstatus(corriente, item.identifica.corriente.minimo, item.identifica.corriente.maximo);
            const idePotencia = getEstatus(potencia, item.identifica.potencia.minimo, item.identifica.potencia.maximo);
            const ideCaudal = getEstatus(caudal, item.identifica.caudal.minimo, item.identifica.caudal.maximo);

            const estatusSum = idePotencia + ideVoltaje + ideCorriente + ideCaudal;
            const idEstatus = estatusSum < 6 ? 1 : (estatusSum < 10 ? 2 : 3);
            const estatus = idEstatus === 1 ? 'Operación Normal' : (idEstatus === 2 ? 'Advertencia' : 'Error');

            item.opera = {
                potencia: { valor: potencia.toFixed(2), idEstatus: idePotencia },
                voltaje: { valor: voltaje.toFixed(2), idEstatus: ideVoltaje },
                corriente: { valor: corriente.toFixed(2), idEstatus: ideCorriente },
                caudal: { valor: caudal.toFixed(2), idEstatus: ideCaudal },
                idEstatus: idEstatus,
                estatus: estatus,
                fechaRegistro: new Date().toUTCString()
            };
        });
    }
  },
  created() {
    this.getDispositivos();
  }
};
</script>