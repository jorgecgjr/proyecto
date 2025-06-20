<template>
<div id="login" class="card bg-trasparent mb-3 record-card" >
    <div class="card-body">
    <div class="text-center">
        <h4 class="card-title" title="Plataforma para monitoreo de Sistemas de Bombeo">Registro Dispositivo</h4>
        <hr />
    </div>
    <div class="row p-1"> 
        <form>
              <div class="form-floating p-1">
                <input type="text" id="identificador" ref="identificador" class="form-control" v-model="dispositivo.identifica.identificador" v-on:keyup.enter="tfPassword()" aria-describedby="Id" placeholder="Identificador"/>
                <label id="identificador" class="form-text text-muted">Identificador</label>
              </div>            
              <div class="form-floating p-1">
                <input type="text" id="nombreDisp" ref="nombreDisp" class="form-control" v-model="dispositivo.identifica.nombre" v-on:keyup.enter="" aria-describedby="Nombre" placeholder="Nombre del dispositivo"/>
                <label id="nombreDisp" class="form-text text-muted">Nombre del dispositivo</label>
              </div>
              <div class="form-floating p-1">
                <input type="text" id="ubicacion" ref="ubicacion" class="form-control" v-model="dispositivo.identifica.ubicacion" v-on:keyup.enter="" aria-describedby="Ubicacion" placeholder="Ubicacion"/>
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
      dispositivo: {
        nombre: '',
        ubicacion: '',
        coordenadas: '',
        potencia: { nominal: 0, medido: 0 },
        voltaje: { nominal: 0, medido: 0 },
        corriente: { nominal: 0, medido: 0 },
        caudal: { nominal: 0, medido: 0 },
        estado: 1
      },
      alerta: ''
    };
  },
  methods: {
    async guardar() {
      this.alerta = '';
      try {
        const url = 'http://localhost:3000/api/dispositivos';
        // El backend espera que potencia, voltaje, etc., sean objetos JSON
        // y nuestro 'this.dispositivo' ya tiene esa estructura.
        const response = await axios.post(url, this.dispositivo);

        console.log('Dispositivo guardado:', response.data);
        
        // Opcional: Emitir un evento para que la lista de dispositivos se actualice
        this.$emit('dispositivo-agregado');

        // Cerrar el modal o limpiar el formulario (depende de tu implementación)
        // Por ejemplo, si usas un modal de Bootstrap, puedes ocultarlo:
        const modalElement = this.$refs.modal; // Asegúrate de tener un ref="modal" en tu elemento modal
        if (modalElement) {
          const modal = bootstrap.Modal.getInstance(modalElement);
          if (modal) modal.hide();
        }
        
      } catch (error) {
        console.error('Error al guardar el dispositivo:', error);
        this.alerta = 'No se pudo guardar el dispositivo. Verifique los datos.';
      }
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
      