<template>
  <div class="auth-container">
    <div class="auth-wrapper">
      <div class="title"><span>Formulario de Registro</span></div>
      <form @submit.prevent="guardar">
        <div class="row">
          <i class="bi bi-person-badge"></i>
          <input type="text" v-model="usuario.nombre" placeholder="Nombre completo" required>
        </div>
        <div class="row">
          <i class="bi bi-person"></i>
          <input type="text" v-model="usuario.userName" placeholder="Nombre de usuario" required>
        </div>
        <div class="row">
          <i class="bi bi-lock"></i>
          <input type="password" v-model="usuario.password" placeholder="Contraseña" required>
        </div>
        
        <div v-if="alerta.mensaje" class="alert alert-danger">{{ alerta.mensaje }}</div>

        <div class="row button">
          <button type="submit">Registrarse</button>
        </div>
        <div class="signup-link">
          ¿Ya tienes cuenta? <a href="#" @click.prevent="cancelar">Iniciar Sesión</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
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
    async guardar() {
      this.alerta.mensaje = '';
      try {
        const url = 'http://localhost:3000/api/register';
        const response = await axios.post(url, this.usuario);
        console.log('Usuario registrado con éxito:', response.data);
        this.$router.push('/login');
      } catch (error) {
        console.error('Hubo un error al registrar el usuario:', error);
        if (error.response && error.response.data && error.response.data.error) {
          this.alerta.mensaje = error.response.data.error;
        } else {
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
@import '@/assets/login.css';
</style>