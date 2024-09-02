<script setup>
import { computed } from 'vue';

import Adminboard from '@/components/Admin/Adminboard.vue'
import Userboard from '@/components/User/Userboard.vue'

const user = JSON.parse(localStorage.getItem('user')) || {}

const isAdmin = computed(() => user.role === 'admin');

</script>

<template>
     <div>
    <Adminboard v-if="isAdmin" />
    
    <Userboard v-else />
  </div>
</template>