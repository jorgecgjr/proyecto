<template>
  <div class="auth-container">
    <div class="auth-wrapper">
      <div class="title"><span>Inicio de Sesión</span></div>
      <form @submit.prevent="validar">
        <div class="row">
          <i class="bi bi-person"></i>
          <input type="text" v-model="login.userName" placeholder="Nombre de usuario" required>
        </div>
        <div class="row">
          <i class="bi bi-lock"></i>
          <input type="password" v-model="login.password" placeholder="Contraseña" required>
        </div>
        
        <div v-if="alerta.mensaje" class="alert alert-danger">{{ alerta.mensaje }}</div>

        <div class="row button">
          <button type="submit">Entrar</button>
        </div>
        <div class="signup-link">
          ¿No tienes usuario? <a href="#" @click.prevent="registrar">Registrarse</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ViewLogin',
  data() {
    return {
      login: {
        userName: '',
        password: ''
      },
      alerta: {
        mensaje: ''
      }
    };
  },
  methods: {
    async validar() {
      this.alerta.mensaje = '';
      try {
        const url = 'http://localhost:3000/api/login';
        const response = await axios.post(url, this.login);
        console.log('Login exitoso:', response.data);
        this.$router.push('/menu');
      } catch (error) {
        console.error('Error en el login:', error);
        this.alerta.mensaje = 'Usuario o contraseña incorrectos.';
      }
    },
    registrar() {
      this.$router.push('/registro');
    }
  }
};
</script>

<style scoped>
@import '@/assets/login.css';
</style>