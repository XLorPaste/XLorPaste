import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import View from './pages/View.vue';

declare module 'vue-router' {
  interface RouteMeta {
    title: string;
  }
}

export const routes = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: '上传'
      }
    },
    {
      path: '/editor',
      name: 'Editor',
      component: () => import('./pages/Editor.vue'),
      meta: {
        title: '编辑器'
      }
    },
    {
      path: '/view/:token',
      name: 'View',
      component: View,
      meta: {
        title: '代码'
      }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

routes.beforeEach((to) => {
  if (!!to.meta.title) {
    document.title = to.meta.title + ' - XLor Paste';
  } else {
    document.title = 'XLor Paste';
  }
});