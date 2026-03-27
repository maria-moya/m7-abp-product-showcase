<template>
  <div>

    <div class="container py-5">
      <HeaderComp>Favoritos</HeaderComp>

      <div class="mb-5 py-4">
        <BreadcrumbComp />
      </div>
      
      <div v-if="productosFavoritos.length > 0">
        <ProductList :productos="productosFavoritos" />
      </div>
      
      <div v-else class="alert alert-secondary text-center text-estilo">
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
import HeaderComp from '@/components/HeaderComp.vue'
import BreadcrumbComp from '@/components/BreadcrumbComp.vue'


const productsStore = useProductsStore()
const favoritesStore = useFavoritesStore()

const productosFavoritos = computed(() => {
  return productsStore.products.filter(producto => 
    favoritesStore.favoriteItems.includes(producto.id)
  )
})
</script>

<style scoped lang="css">
.text-estilo{
  font-family: 'Outfit', sans-serif;
  letter-spacing: 1px;
}
</style>
