<template>
	<div class="app">
    <Navbar v-if="showNavbar" />
		<!-- Sidebar -->
		<SideNav v-if="showSideNav" />

		<router-view />
	</div>
</template>

<script setup>
import SideNav from './components/SideNav.vue'
import Navbar from './components/Navbar.vue'
import { useRouter } from 'vue-router';
import { computed } from 'vue';

const router = useRouter();


const showNavbar = computed(() => {
  const allowedRoutes = ['/dashboard', '/manage-users', '/manage-divisions', '/manage-tickets'];
  return allowedRoutes.includes(router.currentRoute.value.path);
});

const showSideNav = computed(() => {
  const allowedRoutes = ['/dashboard', '/manage-users', '/manage-divisions', '/manage-tickets'];
  return allowedRoutes.includes(router.currentRoute.value.path);
});
</script>
