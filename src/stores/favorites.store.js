import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useFavoritesStore = defineStore('favorites', () => {
  const favoriteItems = ref([])
  const isFavorite = computed(() => {
    return (id) => favoriteItems.value.includes(id);
  })
  
  const toggleFavorite = (productId) => {
    const index = favoriteItems.value.indexOf(productId);
    if (index === -1) {
      favoriteItems.value.push(productId); // Agregar a favoritos
    } else {
      favoriteItems.value.splice(index, 1); // Quitar de favoritos
    }
  }

  return { favoriteItems, isFavorite, toggleFavorite }
})