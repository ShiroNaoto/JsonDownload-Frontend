<script setup>
import { computed, reactive, inject } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const swal = inject('$swal');

const userData = reactive({
    user: JSON.parse(localStorage.getItem('user')) || {}
});

const type = JSON.parse(localStorage.getItem('user')) || {}

const isAdmin = computed(() => type.role === 'admin');

async function signOut() 
{
      swal.fire({ icon: 'info', title: 'Logging out...', showConfirmButton: false, timer: 3000 });
      axios.post('logout').finally(() => {
      swal.fire({ icon: 'success', title: 'Logged out!', showConfirmButton: false, timer: 3000 });

      // Clear localStorage and Axios headers
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      axios.defaults.headers.common['Authorization'] = '';
      router.push({ name: 'login' });
    });
}

const logoPath = '/dist/img/logotickets.png';
const userImagePath = '/dist/img/user9.jpg';

const isActive = (path) => {
  return router.currentRoute.value.path === path;
};

</script>

<template> 
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <a href="#" class="brand-link bg-warning">
      <img :src="logoPath" alt="AdminLTE Logo" class="brand-image" style="opacity: 1">
      <span class="brand-text font-weight-light"><b>Client Demo</b></span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img :src="userImagePath" class="img-circle elevation-2" alt="User Image">
        </div>
        <div class="info">
          <p class="d-block text-warning">{{ userData.user.name }}</p>
        </div>
      </div>

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <li class="nav-header" v-if="isAdmin"><b>Admin Page</b></li>
          <li class="nav-header" v-else><b>User Page</b></li>

          <li class="nav-item" :class="{ active: isActive('/dashboard') }">
            <router-link to="/dashboard" class="nav-link">
              <i class="nav-icon fas fa-tachometer-alt"></i>
              <p>Home</p>
            </router-link>
          </li>

          <li class="nav-item" :class="{ active: isActive('/') }">
            <a href="#" @click="signOut" class="nav-link">
              <i class="nav-icon fas fa-sign-out-alt"></i>
              <p>Sign out</p>
            </a>
          </li>
          
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>
</template>

<style lang="scss" scoped>
// Add scoped styles here
.nav-item.active {
  background-color: #f39821; // Change to your desired active color
}
</style>