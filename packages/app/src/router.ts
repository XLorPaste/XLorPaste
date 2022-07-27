import { createRouter, createWebHistory } from 'vue-router';

import routes from '~pages';

import { getAdminKey } from './logic/admin';

declare module 'vue-router' {
  interface RouteMeta {
    title: string;
  }
}

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

router.beforeEach((to) => {
  if (to.name === 'Admin') {
    const key = getAdminKey();
    if (!!key && key.length > 0) {
      return true;
    } else {
      return false;
    }
  }
  if (!!to.meta.title) {
    document.title = to.meta.title + ' | XLor Paste';
  } else {
    document.title = 'XLor Paste';
  }
});
