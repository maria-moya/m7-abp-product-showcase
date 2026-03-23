<template>

  <NavBar/>

  <RouterView />

  <FooterComp/>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue';
import FooterComp from './components/FooterComp.vue';
</script>

<style scoped lang="css">

</style>
