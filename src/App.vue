<template>


    <NavBar /> 

      <RouterView />


    <FooterComp />


</template>

<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue';
import FooterComp from './components/FooterComp.vue';
</script>

<style>
body {
  background-color: var(--bs-body-bg);
  color: var(--bs-body-color);
  transition: background-color 0.3s ease;
}

.card, .product-card, .novedades-section, .v-card {
  background-color: var(--bs-body-bg) !important;
  color: var(--bs-body-color) !important;
  border-color: var(--bs-border-color) !important;
}

.text-muted {
  color: var(--bs-secondary-color) !important;
}


</style>
