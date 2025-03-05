import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '@/views/LandingPage.vue'
import XpTracker from '@/views/XpTracker.vue'

const routes = [
    { 
        path: '/',
        name: "home",
        component: LandingPage
    },
    {
        path: '/tracker/:gamertag',
        name: "tracker",
        component: XpTracker
    },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;