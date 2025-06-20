<template>
  <div class="register-container">
    <div class="card register-card">
      <div class="card-body">
        <h3 class="card-title text-center mb-4">Registro</h3>
        <form @submit.prevent="guardar">
          <div class="mb-3">
            <label for="nombre" class="form-label">Nombre</label>
            <input type="text" class="form-control" id="nombre" v-model="usuario.nombre" required>
          </div>
          <div class="mb-3">
            <label for="userName" class="form-label">Usuario</label>
            <input type="text" class="form-control" id="userName" v-model="usuario.userName" required>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Contraseña</label>
            <input type="password" class="form-control" id="password" v-model="usuario.password" required>
          </div>
          <div v-if="alerta.mensaje" class="alert alert-danger">{{ alerta.mensaje }}</div>
          <div class="d-grid">
            <button type="submit" class="btn btn-primary">Registrarse</button>
          </div>
        </form>
        <div class="text-center mt-3">
          <button class="btn btn-link" @click="cancelar">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ViewRegistroUsuario',
  data() {
    return {
      usuario: {
        nombre: '',
        userName: '',
        password: ''
      },
      alerta: {
        mensaje: ''
      }
    };
  },
  methods: {
    guardar() {
      // Logic to call the backend API to register the user
      console.log('Registering user:', this.usuario);
      this.$router.push('/login');
    },
    cancelar() {
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f9fa;
}
.register-card {
  width: 100%;
  max-width: 400px;
}
</style>