<template>
  <div>
    <div class="product-card h-100 position-relative text-center d-flex flex-column border-0">
      <button
        v-if="isAuth"
        class="btn-fav position-absolute top-0 end-0 m-3 border-0 bg-transparent"
        :class="isFav ? 'text-danger' : 'text-secondary'"
        @click="favoritesStore.toggleFavorite(producto.id)"
      >
        <i class="bi bi-heart-fill fs-4"></i>
      </button>

      <div class="img-container mb-3">
        <img :src="producto.imagen" class="img-fluid" :alt="producto.imagen" />
      </div>

      <div class="card-content px-3 flex-grow-1 d-flex flex-column align-items-center">
        <span
          v-if="isHomeView"
          @click="showQuickView = true"
          class="quick-view text-decoration-none text-muted small mb-2"
          role="button"
        >
          Vista rápida
        </span>

        <h5 class="product-title fw-light mb-1">{{ producto.nombre }}</h5>
        <p class="product-price fw-normal">{{ producto.precio }}</p>
      </div>

      <button v-if="isProductView" class="btn btn-dark rounded-0 w-100 py-1 mb-2 mt-auto">
        <RouterLink :to="{ name: 'productDetail', params: { id: producto.id } }" class="text-white small text-decoration-none">
          Ver más
        </RouterLink>
      </button>

      <button class="btn btn-outline-dark rounded-0 w-100 py-1 mt-auto">Agregar al carrito</button>
    </div>

    <v-dialog v-model="showQuickView" max-width="900">
      <v-card class="rounded-0">
        <div class="container-fluid p-0">
          <div class="row g-0">
            <div class="col-md-6 bg-light d-flex align-items-center justify-content-center p-4">
              <img
                :src="producto.imagen"
                class="img-fluid"
                :alt="producto.nombre"
                style="max-height: 500px; object-fit: contain"
              />
            </div>

            <div class="col-md-6 p-5 position-relative">
              <button
                @click="showQuickView = false"
                class="btn-close position-absolute top-0 end-0 m-3 shadow-none"
              ></button>
              <h2 class="fw-light mb-2">{{ producto.nombre }}</h2>
              <p class="fs-4 mb-4">${{ producto.precio }}</p>

              <div class="mb-4">
                <span class="small text-muted" :class="{ 'text-danger': producto.stock < 5 }">
                    {{ producto.stock }} unidades disponibles
                  </span>
              </div>

              <div class="mb-4">
                <div class="d-flex justify-content-between align-items-center mb-2">
                  <label class="small text-uppercase fw-bold mb-0">Cantidad</label>
                </div>

                <div class="input-group" style="width: 140px">
                  <button
                    @click="decrementar"
                    class="btn btn-outline-secondary border-dark-subtle rounded-0 shadow-none"
                    :disabled="cantidad <= 1"
                  >
                    <i class="bi bi-dash"></i>
                  </button>

                  <input
                    type="number"
                    v-model.number="cantidad"
                    class="form-control text-center border-dark-subtle shadow-none"
                    :max="producto.stock"
                    min="1"
                  />

                  <button
                    @click="incrementar"
                    class="btn btn-outline-secondary border-dark-subtle rounded-0 shadow-none"
                    :disabled="cantidad >= producto.stock"
                  >
                    <i class="bi bi-plus"></i>
                  </button>
                </div>
              </div>
              
              <div
                v-if="producto.stock === 0"
                class="alert alert-warning rounded-0 small py-2 mt-2"
              >
                Producto temporalmente agotado.
              </div>

              <button class="btn btn-dark w-100 rounded-0 py-3 mb-3">
                Agregar al carrito
              </button>
              
              <RouterLink :to="{ name: 'productDetail', params: { id: producto.id } }" class="text-dark small text-decoration-underline">
                Ver más detalle
              </RouterLink>
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router' 
import { useFavoritesStore } from '@/stores/favorites.store'
import { useUserStore } from '@/stores/user.store'

const props = defineProps(['producto'])
const route = useRoute()
const favoritesStore = useFavoritesStore()
const userStore = useUserStore()

const isProductView = computed(()=> {
  return ['product', 'category', 'favorites']. includes(route.name);
});

const isHomeView = computed(() => {
  return route.name === 'home' || route.path === '/';
});

const showQuickView = ref(false)

const isFav = computed(() => favoritesStore.isFavorite(props.producto.id))
const isAuth = computed(() => userStore.isAuthenticated)

const cantidad = ref(1)

const incrementar = () => {
  if (cantidad.value < props.producto.stock) {
    cantidad.value++
  }
}

const decrementar = () => {
  if (cantidad.value > 1) {
    cantidad.value--
  }
}

watch(cantidad, (nuevoValor) => {
  if (nuevoValor > props.producto.stock) {
    cantidad.value = props.producto.stock
  } else if (nuevoValor < 1) {
    cantidad.value = 1
  }
})
</script>

<style scoped lang="css">
.product-card {
  transition: transform 0.2s ease-in-out;
  background-color: var(--bs-body-bg);
  color: var(--bs-body-color);
  padding-bottom: 1rem;
}

.img-container {
  overflow: hidden;
  background-color: var(--bs-tertiary-bg);
}

.img-container img {
  width: 100%;
  height: auto;
  object-fit: contain;
}

.product-title {
  font-size: 1.1rem;
  color: var(--bs-body-color);
}

.quick-view {
  font-size: 0.85rem;
  letter-spacing: 0.5px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease-in-out;
  transform: translateY(10px);
}

.product-card:hover .quick-view {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.btn-fav {
  z-index: 10;
  cursor: pointer;
}

.btn-outline-dark {
  border: 1px solid var(--bs-border-color);
  color: var(--bs-body-color);
  text-transform: none;
  font-weight: 300;
}

.btn-outline-dark:hover {
  background-color: var(--bs-body-color);
  color: var(--bs-body-bg);
}

.quick-view {
  cursor: pointer;
}

:deep(.v-card) {
  background-color: var(--bs-body-bg) !important;
  color: var(--bs-body-color) !important;
}

:deep(.v-overlay__content) {
  border-radius: 0 !important;
}

.form-select:focus,
.form-control:focus {
  box-shadow: none;
  border-color: #000;
}

.btn-dark {
  background-color: #000;
  border: none;
  transition: opacity 0.3s;
}

.btn-dark:hover {
  opacity: 0.8;
  background-color: #000;
}
</style>
