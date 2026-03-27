<template>
  <div>
    <div
      class="row justify-content-evenly g-3 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4"
    >
      <div class="col gy-5" v-for="producto in productos" :key="producto.id">
        <ProductCard :producto="producto" />
      </div>
    </div>
  </div>
</template>

<script setup>
import ProductCard from '@/components/ProductCard.vue'

defineProps({
  productos: {
    type: Array,
    required: true,
  },
})
</script>

<style scoped lang="css"></style>
