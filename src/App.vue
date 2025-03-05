<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(() => {
  router.push('/'); // Redirect to home on app load
});
</script>

<template>
  <router-view></router-view>
</template>

<style>
  html {
    background-color: #072028;
  }

</style>