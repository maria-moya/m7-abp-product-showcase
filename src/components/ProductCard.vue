<template>
  <div>

    <div class="card h-100 shadow-sm position-relative">
      <button 
        class="btn position-absolute top-0 end-0 m-2 rounded-circle" 
        :class="isFav ? 'btn-danger' : 'btn-light'" 
        @click="favoritesStore.toggleFavorite(producto.id)">
        ♥
      </button>

      <img :src="producto.imagen" class="card-img-top" :alt="producto.imagen" />
      <div class="card-body">
        <h5 class="card-title">{{ producto.nombre }}</h5>
        <p class="card-text">{{ producto.descripcion }}</p>
        <p class="card-text"> Precio: {{ producto.precio }}</p>
        <p class="card-text">Stock: {{ producto.stock }}</p>
        <p class="card-text">Categoria: {{ producto.categoria }}</p>
        <a href="#" class="btn btn-primary">Ver más</a>
      </div>
    </div>

  </div>
</template>


<script setup>
import { computed } from 'vue'
import { useFavoritesStore } from '@/stores/favorites.store'

const props = defineProps(["producto"]);
const favoritesStore = useFavoritesStore();

const isFav = computed(() => favoritesStore.isFavorite(props.producto.id));

</script>


<style scoped lang="css">
.card-img-top{
    aspect-ratio: 3/2;
}

.card-body{
    min-height: 300px;
}
</style>
