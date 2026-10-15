import { createRouter, createWebHistory } from 'vue-router';
import showroomRoutes from './showroom/presentation/showroom-routes.js';

const PageNotFound = () => import('./shared/presentation/views/page-not-found.vue');

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/', redirect: '/home' },
        ...showroomRoutes,
        { path: '/:pathMatch(.*)*', name: 'not-found', component: PageNotFound }
    ]
});

export default router;
