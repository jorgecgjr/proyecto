<template>
<div id="login" class="card bg-trasparent mb-3 record-card" >
    <div class="card-body">
    <div class="text-center">
        <h4 class="card-title" title="Plataforma para monitoreo de Sistemas de Bombeo">Registro Dispositivo</h4>
        <hr />
    </div>
    <div class="row p-1"> 
        <form @submit.prevent="guardar">
              <div class="form-floating p-1">
                <input type="text" id="nombreDisp" ref="nombreDisp" class="form-control" v-model="dispositivo.nombre" required/>
                <label id="nombreDisp" class="form-text text-muted">Nombre del dispositivo</label>
              </div>
              <div class="form-floating p-1">
                 <input type="text" id="ubicacion" ref="ubicacion" class="form-control" v-model="dispositivo.ubicacion"/>
                <label id="ubicacion" class="form-text text-muted">Ubicación</label>
              </div>
            </form>
            </div>
            <div class="row p-2">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="alert alert-danger" role="alert" v-if="alerta.mensaje">
                <strong>¡Error!</strong>
                <p v-html="alerta.mensaje"></p>
                </div>
            </div>
        </div>
        <div class="row p-2">
            <div class="col">
                <button class="btn btn-outline-success" type="button" @click="guardar()"> <i class="bi bi-box-arrow-in-right"></i> Guardar </button>
                <button class="btn btn-outline-secondary" type="button" @click="limpiar()"> <i class="bi bi-box-arrow-in-right"></i> Cancelar </button>
            </div>
        </div>
    </div>
</div>
</template>
      
<script>
import axios from 'axios';

export default {
  name: 'RegistroDispositivo',
  data() {
    return {
      // Usamos una estructura de datos completa con valores por defecto
      dispositivo: {
        nombre: '',
        ubicacion: '',
        coordenadas: '19.7060° N, 101.1950° W',
        potencia:  { nominal: 7.400, minimo: 6.200, maximo: 8.600, um: 'KW' },
        voltaje: { nominal: 240, minimo: 230, maximo: 250, um: 'Volts' },
        corriente: { nominal: 30, minimo: 25, maximo: 35, um: 'Amperes' },
        caudal: { nominal: 1, minimo: 0.10, maximo: 1.20, um: 'm3/minuto' },
        estado: 1 // 1: Operacion Normal
      },
      alerta: {
        mensaje: '',
      }
    };
  },
  methods: {
    async guardar() {
      this.alerta.mensaje = '';
      try {
        const url = 'http://localhost:3000/api/dispositivos';
        
        // Enviamos el objeto 'dispositivo' completo. El backend ya espera esta estructura plana.
        const response = await axios.post(url, this.dispositivo);

        console.log('Dispositivo guardado:', response.data);
        
        // Redirigimos al usuario a la lista de dispositivos
        this.$router.push({ name: 'dispositivos' });
        
      } catch (error) {
        console.error('Error al guardar el dispositivo:', error);
        this.alerta.mensaje = 'No se pudo guardar el dispositivo. Verifique los datos e intente de nuevo.';
      }
    },
    limpiar() {
        // Al cancelar, simplemente regresamos a la lista
        this.$router.push({ name: 'dispositivos' });
    }
  }
};
</script>
      
<style scoped>
.record-card {
    max-width: 500px;
    min-width: 400px;
    width: 100%;
    /*background:  url('@/assets/img/background.png') repeat-x scroll;*/
}

</style>
      