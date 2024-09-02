import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Auth/Login.vue'
import Register from '@/views/Auth/Register.vue'
import Forget from '@/views/Auth/Forget.vue'
import Dashboard from '@/views/Dashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //Guests
    {
      path: '/',
      name: 'login',
      component: Login,
      meta: { guest: true}
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: { guest: true}
    },
    {
      path: '/Forget',
      name: 'forget',
      component: Forget,
      meta: { guest: true}
    },

     //Authenticated
     {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: { requiresAuth: true}
     },
  ]
})

router.beforeEach((to, from, next) => {
  const loggedIn = !!localStorage.getItem('user');
  const user = JSON.parse(localStorage.getItem('user'));
  
  if (to.meta.requiresAuth && !loggedIn) {
    next({ name: 'login' });
} else if (to.meta.guest && loggedIn) {
    next({ name: 'Dashboard' });
} else if (to.meta.adminOnly && user.acctype !== 'admin') {
    next({ name: 'Dashboard' });
} else {
    next();
}
});

export default router
