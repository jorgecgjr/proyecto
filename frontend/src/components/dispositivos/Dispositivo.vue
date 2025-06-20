<template>
  <div class="card h-100" :class="statusClass">
    <div class="card-body">
      <h5 class="card-title">{{ dispositivo.nombre }}</h5>
      <p class="card-text">{{ dispositivo.ubicacion }}</p>
      <ul class="list-group list-group-flush">
        <li class="list-group-item d-flex justify-content-between align-items-center" :class="statusClassPotencia">
          Potencia
          <span class="badge bg-primary rounded-pill">{{ dispositivo.opera.potencia.valor }} KW</span>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-center" :class="statusClassVoltaje">
          Voltaje
          <span class="badge bg-primary rounded-pill">{{ dispositivo.opera.voltaje.valor }} V</span>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-center" :class="statusClassCorriente">
          Corriente
          <span class="badge bg-primary rounded-pill">{{ dispositivo.opera.corriente.valor }} A</span>
        </li>
      </ul>
      <p class="mt-2" :class="{'text-success':(dispositivo.opera.idEstatus===1), 'text-warning':(dispositivo.opera.idEstatus===2), 'text-danger':(dispositivo.opera.idEstatus===3)}">
        Estatus: {{ dispositivo.opera.estatus }}
      </p>
    </div>
    <div class="card-footer text-center">
      <button class="btn btn-outline-primary" @click="$emit('setDispositivo', dispositivo)">
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
      if (this.dispositivo.opera.idEstatus === 2) return 'border-warning';
      if (this.dispositivo.opera.idEstatus === 3) return 'border-danger';
      return 'border-success';
    },
    statusClassPotencia() {
      if (this.dispositivo.opera.potencia.idEstatus === 2) return 'list-group-item-warning';
      if (this.dispositivo.opera.potencia.idEstatus === 3) return 'list-group-item-danger';
      return '';
    },
    statusClassVoltaje() {
      if (this.dispositivo.opera.voltaje.idEstatus === 2) return 'list-group-item-warning';
      if (this.dispositivo.opera.voltaje.idEstatus === 3) return 'list-group-item-danger';
      return '';
    },
    statusClassCorriente() {
      if (this.dispositivo.opera.corriente.idEstatus === 2) return 'list-group-item-warning';
      if (this.dispositivo.opera.corriente.idEstatus === 3) return 'list-group-item-danger';
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