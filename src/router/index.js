import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/pages/auth/login/Login.vue';
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import Dashboard from '@/pages/dashboard/Dashboard.vue';
import Registration from '@/pages/auth/registration/Registration.vue';
import Budget from '@/pages/budget/Budget.vue';
import Transaction from '@/pages/transaction/Transaction.vue';
import Insight from '@/pages/insight/Insight.vue';
import NotFound from '@/pages/notFound/NotFound.vue';

const isAuthenticated = () => !!localStorage.getItem('token');

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'Login', component: Login },
  { path: '/registration', name: 'Registration', component: Registration },
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
      { path: 'budget', name: 'Budget', component: Budget },
      // { path: '/budgets/:id', name: 'BudgetDetail', component: BudgetDetail },
      { path: 'transaction', name: 'Transaction', component: Transaction },
      { path: 'insight', name: 'Insight', component: Insight },
      { path: 'profile', name: 'Profile', component: '' },
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
