import { createRouter, createWebHistory } from 'vue-router';
import { useStore } from 'vuex'; // Import Vuex store for authentication state
import Login from '@/pages/auth/login/Login.vue';
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import Dashboard from '@/pages/dashboard/Dashboard.vue';
import Registration from '@/pages/auth/registration/Registration.vue';
import Budget from '@/pages/budget/Budget.vue';
import Transaction from '@/pages/transaction/Transaction.vue';
import NotFound from '@/pages/notFound/NotFound.vue';
import Profile from '@/pages/profile/Profile.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'Login', component: Login },
  { path: '/registration', name: 'Registration', component: Registration },
  {
    path: '/dashboard',
    component: DashboardLayout,
    beforeEnter: (to, from, next) => {
      // Use Vuex to check authentication
      const store = useStore();
      if (store.getters['auth/isAuthenticated']) {
        next();
      } else {
        next('/login');
      }
    },
    children: [
      { path: '', name: 'Dashboard', component: Dashboard },
      { path: 'budget', name: 'Budget', component: Budget },
      { path: 'transaction', name: 'Transaction', component: Transaction },
      { path: 'profile', name: 'Profile', component: Profile },
    ],
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound, // Create a 404 page
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
