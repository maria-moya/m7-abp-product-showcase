<template>
  <div>
    <HeaderComp>Catálogo de productos</HeaderComp>

    <section class="hero-section">
      <CarruselComp/>
    </section>

    <main class="container py-5">

      <section class="novedades-section py-5 position-relative">
        <div class="Text-center mb-5">
          <h2 class="section-title">Recien agregados</h2>
        </div>

        <div class="position-relative container-fluid px-md-5">
          <button class="nav-btn prev" @click="scroll('left')" aria-label="Anterior">
            <v-icon icon="mdi-chevron-left" size="large"></v-icon>
          </button>

          <div class="scroll-horizontal-container" ref="scrollContainer">
            <div class="d-flex flex-nowrap gap-4 pb-4">
              <div v-for="producto in ultimasNovedades" :key="producto.id" class="product-item-scroll">
                <ProductCard :producto="producto"/>
              </div>
            </div>
          </div>

          <button class="nav-btn next" @click="scroll('right')" aria-label="Siguiente">
            <v-icon icon="mdi-chevron-right" size="large"></v-icon>
          </button>
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

const scrollContainer = ref(null);

const scroll = (direction) => {
  if (scrollContainer.value) {
    const scrollAmount = 300; 
    scrollContainer.value.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  }
};

</script>

<style scoped lang="css">

.section-title{
  font-family: 'Outfit', sans-serif;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: #444;
}

.novedades-section {
  background-color: #fff;
}

.scroll-horizontal-container {
  overflow-x: auto;
  display: block;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; 
}

.scroll-horizontal-container::-webkit-scrollbar {
  display: none;
}

.product-item-scroll {
  flex: 0 0 auto;
  width: 280px; 
}

.nav-btn {
  position: absolute;
  top: 40%;
  transform: translateY(-50%);
  z-index: 10;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid #eee;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  transition: all 0.3s ease;
  cursor: pointer;
}

.nav-btn:hover {
  background: #333;
  color: #fff;
  border-color: #333;
}

.prev { left: 10px; }
.next { right: 10px; }

@media (max-width: 768px) {
  .nav-btn {
    display: none;
  }
}

.section-title-novedades {
  font-family: 'Outfit', sans-serif;
  font-weight: 300;
  letter-spacing: 2px;
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
