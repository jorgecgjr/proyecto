// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import ViewLogin from '../components/sesion/ViewLogin.vue';
import ViewRegistroUsuario from '../components/sesion/ViewRegistroUsuario.vue';
import ViewMenu from '../components/principal/ViewMenu.vue';
import ViewDispositivos from '../components/dispositivos/ViewDispositivos.vue';
// ... importa otros componentes

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Rutas públicas/de sesión en el nivel superior
    {
      path: '/login',
      name: 'login',
      component: ViewLogin
    },
    {
      path: '/registro',
      name: 'registro',
      component: ViewRegistroUsuario
    },
    // Ruta protegida que usa el layout del Menú
    {
      path: '/menu',
      name: 'menu',
      component: ViewMenu,
      // Las vistas que aparecen DENTRO del menú van como hijas
      children: [
        {
          path: 'dispositivos', // La ruta completa será /menu/dispositivos
          name: 'dispositivos',
          component: ViewDispositivos
        },
        // ... otras vistas del menú aquí
      ],
      // Opcional: Redirección por defecto para /menu
      redirect: '/menu/dispositivos' 
    },
    // Redirección para la ruta raíz
    {
      path: '/',
      redirect: '/login'
    }
  ]
});

export default router;