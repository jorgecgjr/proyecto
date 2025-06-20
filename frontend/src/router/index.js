import { createRouter, createWebHistory } from 'vue-router'
import ViewLogin from '../components/sesion/ViewLogin.vue'
import ViewRegistroUsuario from '../components/sesion/ViewRegistroUsuario.vue'
import ViewMenu from '../components/principal/ViewMenu.vue'
import ViewDispositivos from '../components/dispositivos/ViewDispositivos.vue'
import RegistroDispositivo from '../components/dispositivos/RegistroDispositivo.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
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
    {
      path: '/menu',
      component: ViewMenu,
      // Al navegar a /menu, redirige automáticamente a la vista de dispositivos
      redirect: '/menu/dispositivos', 
      children: [
        {
          path: 'dispositivos', // Se renderiza en el <router-view> de ViewMenu
          name: 'dispositivos',
          component: ViewDispositivos
        },
        {
          path: 'agregar', // Se renderiza en el <router-view> de ViewMenu
          name: 'agregar',
          component: RegistroDispositivo
        }
      ]
    }
  ]
})

export default router