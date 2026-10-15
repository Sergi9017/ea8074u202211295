import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Image from 'primevue/image';
import InputNumber from 'primevue/inputnumber';
import Message from 'primevue/message';
import Select from 'primevue/select';
import SelectButton from 'primevue/selectbutton';
import Toolbar from 'primevue/toolbar';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import App from './app.vue';
import router from './router.js';
import pinia from './pinia.js';
import i18n from './i18n.js';

/**
 * Application entry point.
 * @summary Creates the Vue app, installs plugins, configures the PrimeVue Aura preset
 * and globally registers the PrimeVue components with the "pv-" prefix.
 * @author Firstname Lastname
 */
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(i18n);
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: { darkModeSelector: 'none' }
    }
});

app.component('pv-button', Button);
app.component('pv-card', Card);
app.component('pv-image', Image);
app.component('pv-input-number', InputNumber);
app.component('pv-message', Message);
app.component('pv-select', Select);
app.component('pv-select-button', SelectButton);
app.component('pv-toolbar', Toolbar);

app.mount('#app');
