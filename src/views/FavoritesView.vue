<template>
  <div>

    <div class="container py-5">
      <h2 class="text-center mb-4">Mis Favoritos</h2>
      
      <div v-if="productosFavoritos.length > 0">
        <ProductList :productos="productosFavoritos" />
      </div>
      
      <div v-else class="alert alert-secondary text-center">
        <p class="mb-0">Aún no has agregado ningún producto a tus favoritos.</p>
        <RouterLink to="/" class="btn btn-primary mt-3">Volver al Catálogo</RouterLink>
      </div>
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import ProductList from '@/components/ProductList.vue'
import { useProductsStore } from '@/stores/products.store'
import { useFavoritesStore } from '@/stores/favorites.store'

const productsStore = useProductsStore()
const favoritesStore = useFavoritesStore()

const productosFavoritos = computed(() => {
  return productsStore.products.filter(producto => 
    favoritesStore.favoriteItems.includes(producto.id)
  )
})
</script>

<style scoped lang="css"></style>
