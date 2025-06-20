<template>
  <div class="login-container">
    <div class="card login-card">
      <div class="card-body">
        <h3 class="card-title text-center mb-4">Iniciar Sesión</h3>
        <form @submit.prevent="validar">
          <div class="mb-3">
            <label for="userName" class="form-label">Usuario</label>
            <input type="text" class="form-control" id="userName" v-model="login.userName" required>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Contraseña</label>
            <input type="password" class="form-control" id="password" v-model="login.password" required>
          </div>
          <div v-if="alerta.mensaje" class="alert alert-danger">{{ alerta.mensaje }}</div>
          <div class="d-grid">
            <button type="submit" class="btn btn-primary">Entrar</button>
          </div>
        </form>
        <div class="text-center mt-3">
          <button class="btn btn-link" @click="registrar">Registrarse</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
      // This will be replaced with a call to the backend
      if (this.login.userName === 'admin' && this.login.password === 'password') {
        this.$router.push('/menu');
      } else {
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
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f9fa;
}
.login-card {
  width: 100%;
  max-width: 400px;
}
</style>