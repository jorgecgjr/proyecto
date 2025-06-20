<template>
  <div class="card h-100" :class="statusClass">
    <div class="card-body">
      <h5 class="card-title">{{ dispositivo.nombre }}</h5>
      <p class="card-text">{{ dispositivo.ubicacion }}</p>
      <ul class="list-group list-group-flush">
        <li class="list-group-item d-flex justify-content-between align-items-center">
          Potencia
          <span class="badge bg-primary rounded-pill">{{ dispositivo.potencia.nominal }} KW</span>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-center">
          Voltaje
          <span class="badge bg-primary rounded-pill">{{ dispositivo.voltaje.nominal }} V</span>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-center">
          Corriente
          <span class="badge bg-primary rounded-pill">{{ dispositivo.corriente.nominal }} A</span>
        </li>
      </ul>
    </div>
    <div class="card-footer text-center">
      <button class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#detalleDispositivo" @click="$emit('setDispositivo', dispositivo)">
        Ver Detalles
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dispositivo',
  props: {
    dispositivo: {
      type: Object,
      required: true
    }
  },
  computed: {
    statusClass() {
      if (this.dispositivo.estado === 1) return 'border-success';
      if (this.dispositivo.estado === 2) return 'border-warning';
      if (this.dispositivo.estado === 3) return 'border-danger';
      return '';
    }
  }
};
</script>

<style scoped>
.card-footer {
  background-color: transparent;
  border-top: none;
}
</style>