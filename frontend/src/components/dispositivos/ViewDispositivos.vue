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

export default {
  name: 'ViewDispositivos',
  components: {
    Dispositivo,
    DispositivoDialogo
  },
  data() {
    return {
      dispositivos: [],
      selectedDispositivo: null,
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
    },
    start() {
      if (!this.nIntervId) {
        this.nIntervId = setInterval(this.refresh, 2000);
      }
    },
    stop() {
      clearInterval(this.nIntervId);
      this.nIntervId = null;
    },
    refresh() {
        this.dispositivos.forEach(d => {
            // Your existing refresh logic
        });
    }
  },
  created() {
    this.getDispositivos();
  }
};
</script>