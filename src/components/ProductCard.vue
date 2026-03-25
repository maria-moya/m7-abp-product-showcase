<template>
  <div>

    <div class="product-card h-100 position-relative text-center d-flex flex-column">
      <button 
        v-if="isAuth"
        class="btn-fav position-absolute top-0 end-0 m-3 border-0 bg-transparent" 
        :class="isFav ? 'text-danger' : 'text-secondary'" 
        @click="favoritesStore.toggleFavorite(producto.id)">
        <i class="bi bi-heart-fill fs-4"></i>
      </button>

      <div class="img-container mb-3">
        <img :src="producto.imagen" class="img-fluid" :alt="producto.imagen" />
      </div>

      <div class="card-content px-3 flex-grow-1 d-flex flex-column align-items-center">
        <a href="#" class="quick-view text-decoration-none text-muted small mb-2">Vista rápida</a>
        <h5 class="product-title fw-light mb-1">{{ producto.nombre }}</h5>
        <p class="product-price fw-normal">{{ producto.precio }}</p>
      </div>

      <button class="btn btn-outline-dark rounded-0 w-100 py-2 mt-auto">Agregar al carrito</button>

    </div>


  </div>
</template>


<script setup>
import { computed } from 'vue'
import { useFavoritesStore } from '@/stores/favorites.store'
import { useUserStore } from '@/stores/user.store';

const props = defineProps(["producto"]);
const favoritesStore = useFavoritesStore();
const userStore = useUserStore();

const isFav = computed(() => favoritesStore.isFavorite(props.producto.id));
const isAuth = computed(() => userStore.isAuthenticated);

</script>


<style scoped lang="css">
.product-card{
  transition: transform 0.2s ease-in-out;
  background-color: #fff;
}

.img-container{
  overflow: hidden;
  background-color: #f8f9fa;
}

.img-container img{
  width: 100%;
  height: auto;
  object-fit: contain;
  /* aspect-ratio: 1 / 1.2; */
}

.product-title{
  font-size: 1.1rem;
  color: #333;
}

.quick-view{
  font-size: 0.85rem;
  letter-spacing: 0.5px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease-in-out;
  transform: translateY(10px);
}

.product-card:hover .quick-view{
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.btn-fav{
  z-index: 10;
  cursor: pointer;
}

.btn-outline-dark{
  border: 1px solid #333;
  text-transform: none;
  font-weight: 300;
}

.btn-outline-dark:hover{
  background-color: #333;
  color: #fff;
}
</style>
