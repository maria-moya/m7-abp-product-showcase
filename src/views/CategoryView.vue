<template>
  <div>
    <HeaderComp>Categoría: {{ props.category }}</HeaderComp>

    <main class="container py-3">
      <section>
        <div class="d-flex justify-content-between align-items-center mb-4">
          
          <BreadcrumbComp/>

          <button class="btn btn-outline-dark btn-sm rounded-0" @click="atras">
            <v-icon start size="x-small">mdi-arrow-left</v-icon>
            Volver
          </button>
        </div>

        <div
          class="row justify-content-evenly g-3 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4"
          v-if="productStore.productByCategory(props.category).length > 0"
        >
          <div class="col" v-for="producto in productStore.productByCategory(props.category)">
            <ProductCard :producto />
          </div>
        </div>

        <div v-else>
          <p>No hay productos para mostrar.</p>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import BreadcrumbComp from '@/components/BreadcrumbComp.vue'
import HeaderComp from '@/components/HeaderComp.vue'
import ProductCard from '@/components/ProductCard.vue'
import { useProductsStore } from '@/stores/products.store'
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps(['category'])
const router = useRouter()

const productStore = useProductsStore()

const atras = () => {
  window.history.length > 1 ? router.go(-1) : router.push({ name: 'product' });
}

onMounted(async () => {
  await productStore.fetchProducts()
})
</script>

<style scoped lang="css"></style>
