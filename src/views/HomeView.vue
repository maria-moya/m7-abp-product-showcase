<template>
  <div>
    <HeaderComp>Catálogo de productos</HeaderComp>

    <!-- <section>
      <v-container>
        <CarruselComp/>
      </v-container>
    </section> -->

    <section class="hero-section">
      <CarruselComp/>
    </section>

    <main class="container py-5">

      <section class="novedades-container py-5">
        <div class="Text-center mb-4">
          <h2 class="section-title">Recien agregados</h2>
        </div>

        <div class="scroll-horizontal-container">
          <div class="d-flex flex-nowrap gap-4 pb-4 px-3">
            <div v-for="producto in ultimasNovedades" :key="producto.id" class="col-item">
              <ProductCard :producto="producto"/>
              <!-- <ProductList :productos="productosNuevos"/> -->
            </div>
          </div>
        </div>

        <div class="text-center mt-5">
          <button class="btn btn-dark rounded-0 px-5 py-2 btn-ver-todo">Ver todo</button>
        </div>
      </section>

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

    <!-- <main class="container py-3">
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
    </main> -->

  </div>
</template>

<script setup>
import HeaderComp from '@/components/HeaderComp.vue'
import ProductCard from '@/components/ProductCard.vue';
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

const ultimasNovedades = computed(() => {
  return [...productStore.products].reverse().slice(0, 8);
});

</script>

<style scoped lang="css">

.section-title{
  font-family: 'Outfit', sans-serif;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: #444;
}

.section-title-novedades {
  font-family: 'Outfit', sans-serif;
  font-weight: 300;
  letter-spacing: 2px;
  font-size: 1.6rem;
}

.scroll-horizontal-container {
  overflow-x: auto; 
  scrollbar-width: thin; 
  -webkit-overflow-scrolling: touch; 
}

.scroll-horizontal-container::-webkit-scrollbar {
  height: 6px;
}

.scroll-horizontal-container::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.scroll-horizontal-container::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 10px;
}

.scroll-horizontal-container::-webkit-scrollbar-thumb:hover {
  background: #999;
}

.col-item {
  flex: 0 0 auto;
  width: 280px;
}

@media (max-width: 576px) {
  .col-item {
    width: 220px; 
  }
}

.btn-ver-todo {
  background-color: #222;
  font-size: 0.85rem;
  letter-spacing: 1px;
}

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

.hero-section{
  margin-top: -1px;
}
</style>
