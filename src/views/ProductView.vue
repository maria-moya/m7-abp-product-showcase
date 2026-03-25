<template>
    <div>
        <HeaderComp>Productos</HeaderComp>

        <main class="container py-5">
                  <section>
        <div class="text-center mb-5">
          <h2 class="section-title">Nuestros productos</h2>
          <hr class="mx-auto" style="width: 50px; border-top: 2px solid #333;">
        </div>

        <div class="d-flex justify-content-center flex-wrap gap-2 mb-4">
          <RouterLink v-for="category in productStore.categories" :key="category" class="btn-category" :to="{name: 'category', params: {category}}">
            {{ category }}
          </RouterLink>
        </div>

        <div class="row justify-content-center mb-5">
          <div class="col-md-6">
            <div class="input-group input-group-sm">
              <span class="input-group-text bg-transparent border-end-0">
                <v-icon size="x-small">mid-magnify</v-icon>
              </span>
              <input type="text" class="form-control border-start-0 ps-0 shadow-none" placeholder="Buscar" v-model="filtro">
            </div>
          </div>
        </div>

        <ProductList v-if="listaFiltrada.length > 0" :productos="listaFiltrada"/>

        <div v-if="productStore.isLoading" class="text-center py-5">
          <v-progress-circular indeterminate color="grey-darken-1"></v-progress-circular>
          <p class="mt-3 text-caption">Cargando catálogo...</p>
        </div>
        
        <div v-else-if="productStore.errorMsg" class="alert alert-light border-danger text-center">
          {{ productStore.errorMsg }}
        </div>
      </section>
        </main>
    </div>
</template>

<script setup>
import HeaderComp from '@/components/HeaderComp.vue'
import ProductCard from '@/components/ProductCard.vue';
import ProductList from '@/components/ProductList.vue';
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

<style scoped lang="css">

.btn-category{
  text-decoration: none;
  color: #666;
  border: 1px solid #bbb;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 1rem;
  transition: 0.3s;
}

.btn-category:hover{
  background-color: #f8f8f8;
  border-color: #333;
  color: #333;
}

</style>