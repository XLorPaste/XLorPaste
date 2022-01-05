import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import View from './pages/View.vue';

export const routes = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/view/:token',
      name: 'View',
      component: View
    }
  ]
});
