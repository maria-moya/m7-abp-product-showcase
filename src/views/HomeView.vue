<template>
  <div>
    <HeaderComp>Página home</HeaderComp>

    <section>
      <v-container>
        <CarruselComp/>
      </v-container>
    </section>

    <main class="container py-3">
      <section>
        <div class="d-flex justify-content-between">
          <h2 class="text-center">Nuestros productos</h2>

          <div class="py-3 d-flex justify-content-center">
            <RouterLink
              v-for="category in productStore.categories"
              :key="category"
              class="btn btn-outline-secondary mx-2"
              :to="{ name: 'category', params: { category } }"
            >
              {{ category }}
            </RouterLink>
          </div>
        </div>

        <div class="py-5 row">
          <div class="col-12 col-sm-auto">
            <h5>Filtrar por nombre:</h5>
          </div>
          <div class="col-12 col-sm-5">
            <input type="text" class="form-control" v-model="filtro">
          </div>
        </div>
        
        <div>
          <p>Cantidad de productos: </p>
        </div>

        <ProductList v-if="listaFiltrada.length > 0" :productos="listaFiltrada"/>

        <div v-if="productStore.isLoading" class="text-center py-5">
          <div class="spinner-border text-primary"></div>
          <p>Cargando catálogo...</p>
        </div>
        <div v-else-if="productStore.errorMsg" class="alert alert-danger text-center">
          {{ productStore.errorMsg }}
        </div>

      </section>
    </main>
  </div>
</template>

<script setup>
import HeaderComp from '@/components/HeaderComp.vue'
//import ProductCard from '@/components/ProductCard.vue'
import ProductList from '@/components/ProductList.vue';
import CarruselComp from '@/components/vuetify_comp/CarruselComp.vue';
import { useProductsStore } from '@/stores/products.store'
import { computed, onMounted, ref } from 'vue'

const productStore = useProductsStore();

const filtro = ref("");

const listaFiltrada = computed(() => {
  return productStore.productByName(filtro.value)
})

onMounted(async () => {
  await productStore.fetchProducts()
})
</script>

<style scoped lang="css"></style>
