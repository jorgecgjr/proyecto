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
        this.dispositivos = response.data;
        if (this.dispositivos.length > 0) {
          this.selectedDispositivo = this.dispositivos[0];
        }
      } catch (error) {
        console.error('Error fetching devices:', error);
      }
    },
    setDispositivo(dispositivo) {
      this.selectedDispositivo = dispositivo;
      // Esperamos a que Vue actualice el DOM para asegurarnos de que el modal exista
      this.$nextTick(() => {
        const modalElement = document.getElementById('detalleDispositivo');
        if (modalElement) {
          const modal = new Modal(modalElement);
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

    refresh() {
        console.log('Refrescando datos...');
        this.dispositivos.forEach((item) => {
            // Lógica de simulación de datos
            const desv = 0.10; // Desviación del 10%
            
            let v = item.voltaje.nominal * (1 - desv + Math.random() * desv * 2);
            let c = item.corriente.nominal * (1 - desv + Math.random() * desv * 2);
            let p = (v * c) / 1000; // Potencia en KW

            // Actualiza los valores medidos del dispositivo
            item.potencia.medido = p.toFixed(2);
            item.voltaje.medido = v.toFixed(2);
            item.corriente.medido = c.toFixed(2);
        });
    }
  },
  created() {
    this.getDispositivos();
  }
};
</script>