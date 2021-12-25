import { createApp } from 'vue';
import 'uno.css';
import './style/layout.css';
import { routes } from './router';
import App from './App.vue';

createApp(App).use(routes).mount('#app');
