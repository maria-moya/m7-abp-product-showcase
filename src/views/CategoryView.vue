<template>
  <div>
    <HeaderComp>Categoría: {{ props.category }}</HeaderComp>

    <main class="container py-3">
      <section>
        <div class="d-flex justify-content-between align-items-center mb-4">
          <!-- <nav
            style="
              --bs-breadcrumb-divider: url(
                &#34;data:image/svg + xml,
                %3Csvgxmlns='http://www.w3.org/2000/svg'width='8'height='8'%3E%3Cpathd='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z'fill='%236c757d'/%3E%3C/svg%3E&#34;
              );
            "
            aria-label="breadcrumb"
          >
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><RouterLink to="/">Home</RouterLink></li>
              <li class="breadcrumb-item active" aria-current="page">Category</li>
            </ol>
          </nav>
          <button class="btn btn-primary" @click="atras">Volver atrás</button> -->
          
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
