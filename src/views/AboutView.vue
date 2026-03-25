<template>
  <div>
    <header-comp>Nuestra Historia</header-comp>
    
    <v-container>
      <div class="mb-5 ">
        <BreadcrumbComp />
      </div>

      <v-timeline side="end">
        <v-timeline-item v-for="item in items" :key="item.id" :dot-color="item.color" size="small">
          <v-alert :color="item.color" :icon="item.icon" :value="true">
            {{ item.message }}
          </v-alert>
        </v-timeline-item>
      </v-timeline>
    </v-container>
  </div>
</template>

<script setup>
import HeaderComp from '@/components/HeaderComp.vue'
import BreadcrumbComp from '@/components/BreadcrumbComp.vue'

const items = [
  {
    id: 1,
    color: 'info',
    icon: 'mdi-account',
    message: "Texto 1...",
  },
  {
    id: 2,
    color: 'error',
    icon: 'mdi-account',
    message: "Texto 2...",
  },
  {
    id: 3,
    color: 'success',
    icon: 'mdi-alpha-a-circle',
    message: "Texto 3...",
  },
]
</script>

<style scope lang="css"></style>
