import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/pages/auth/login/Login.vue';
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import Dashboard from '@/pages/dashboard/Dashboard.vue';

const isAuthenticated = () => !!localStorage.getItem('token');

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'Login', component: Login },
  {
    path: '/dashboard',
    component: DashboardLayout,
    // beforeEnter: (to, from, next) => {
    //   if (isAuthenticated()) {
    //     next();
    //   } else {
    //     next('/login');
    //   }
    // },
    children: [
      { path: '', name: 'Dashboard', component: Dashboard },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
