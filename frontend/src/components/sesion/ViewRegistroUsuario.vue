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
// 1. Importa axios para hacer las llamadas a la API
import axios from 'axios';

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
    // 2. Convierte el método en asíncrono y añade la lógica de la API
    async guardar() {
      this.alerta.mensaje = ''; // Limpia cualquier alerta anterior

      try {
        // La URL completa de tu API de registro en el backend
        const url = 'http://localhost:3000/api/register';

        // Envía los datos del formulario al backend
        const response = await axios.post(url, this.usuario);

        console.log('Usuario registrado con éxito:', response.data);

        // Si el registro es exitoso, redirige al usuario a la página de login
        this.$router.push('/login');

      } catch (error) {
        console.error('Hubo un error al registrar el usuario:', error);
        
        // Si el backend envía un mensaje de error específico (ej. "usuario ya existe"), muéstralo
        if (error.response && error.response.data && error.response.data.error) {
          this.alerta.mensaje = error.response.data.error;
        } else {
          // Si no, muestra un error genérico
          this.alerta.mensaje = 'No se pudo completar el registro. Inténtalo de nuevo.';
        }
      }
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