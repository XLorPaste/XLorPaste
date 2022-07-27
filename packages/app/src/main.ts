import { createApp } from 'vue';

import 'uno.css';
import '@unocss/reset/tailwind.css';
import './styles/main.css';

import { routes } from './router';
import App from './App.vue';

createApp(App).use(routes).mount('#app');
