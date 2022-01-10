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
    },
    {
      path: '/admin',
      name: 'Admin',
      component: () => import('./pages/Admin/Admin.vue'),
      meta: {
        title: '管理'
      },
      beforeEnter(to, from) {
        const key = window.localStorage.getItem('ADMIN_KEY');
        if (!!key && key.length > 0) {
          return true;
        } else {
          return false;
        }
      }
    },
    {
      path: '/help',
      name: 'Help',
      component: () => import('./pages/About.vue'),
      meta: {
        title: '帮助'
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
