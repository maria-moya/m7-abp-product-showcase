<template>
  <div>
    <div v-if="product">
      <HeaderComp>Detalle {{ product.nombre }}</HeaderComp>
      
      <main class="container py-4">
        <BreadcrumbComp />

            <div class="product-detail-page py-5">
            <div class="container">
                <div class="row g-5">
                    <div class="col-md-7 col-lg-8">
                        <div class="main-image-container mb-4 text-center p-3 p-md-5">
                            <img :src="product.imagen" :alt="product.nombre" class="img-fluid" style="max-height: 700px; object-fit: contain;">
                        </div>
                    </div>

                    <div class="col-md-5 col-lg-4 product-options-column">
                        <div class="mb-5 py-4">
                            <h2 class="display-6 fw-light mb-2 text-dark text-estilo">{{ product.nombre }}</h2>
                            <p class="text-muted small mb-3">SKU: {{ product.id }}</p>
                            <p class="fs-2 mb-0">{{ formatPrice(product.precio) }}</p>
                        </div>

                        <div class="product-selection-block mb-5">
                            <div class="mb-4">
                                <div class="d-flex justify-content-between align-items-center mb-3">
                                    <label class="small text-uppercase fw-bold mb-0" >Cantidad</label>
                                    <span class="small" :class="quantityStatusClass">
                                        {{ product.stock > 0 ? `${product.stock} unidades disponibles` : 'Agotado' }}
                                    </span>
                                </div>

                                <div class="input-group quantity-selector" style="width: 140px">
                                    <button @click="decreaseQuantity" class="btn btn-outline-dark border-dark-subtle rounded-0 shadow-none" :disabled="quantity <= 1 || product.stock === 0">
                                        <v-icon size="x-small">mdi-minus</v-icon>
                                    </button>
                                
                                    <input type="number" v-model.number="quantity" class="form-control text-center border-dark-subtle shadow-none" :max="product.stock" min="1" :disabled="product.stock === 0"/>

                                    <button @click="increaseQuantity" class="btn btn-outline-dark border-dark-subtle rounded-0 shadow-none" :disabled="quantity >= product.stock || product.stock === 0">
                                        <v-icon size="x-small">mdi-plus</v-icon>
                                    </button>
                                </div>
                            </div>

                            <div class="action-buttons-block mb-5">
                                <div class="d-flex gap-2 mb-3 align-items-center">
                                    <button class="btn btn-dark w-100 rounded-0 py-2 text-uppercase fw-normal" :disabled="product.stock === 0 || !isSelectionValid" @click="addToCart">
                                        {{ product.stock === 0 ? 'Agotado' : 'Agregar al carrito' }}
                                    </button>
                                    <button class="btn btn-outline-danger rounded-0 p-2 flex-shrink-0" @click="toggleWishlist">
                                        <v-icon>{{ isWishlisted ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
                                    </button>
                                </div>

                                <button class="btn btn-purchase w-100 rounded-0 py-2 text-uppercase fw-normal" :disabled="product.stock === 0 || !isSelectionValid" @click="buyNow">
                                    Realizar compra
                                </button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <v-expansion-panels>
                            <v-expansion-panel>
                                <v-expansion-panel-title collapse-icon="mdi-minus" expand-icon="mdi-plus" class="text-title">
                                    Información del producto
                                </v-expansion-panel-title>
                                <v-expansion-panel-text>
                                    {{ product.descripcion }}
                                </v-expansion-panel-text>
                            </v-expansion-panel>
                        </v-expansion-panels>
                    </div>
                </div>
            </div>
        </div>
      </main>
    </div>
    
    <div v-else-if="productsStore.isLoading" class="text-center py-10">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
        <p>Cargando producto...</p>
    </div>

    <div v-else class="text-center py-10">
        <h2>Producto no encontrado</h2>
        <router-link to="/product" class="btn btn-dark">Volver a la tienda</router-link>
    </div>

  </div>
</template>


<script setup>
import { computed, ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProductsStore } from '@/stores/products.store'
import { useFavoritesStore } from '@/stores/favorites.store'
import BreadcrumbComp from '@/components/BreadcrumbComp.vue'
import HeaderComp from '@/components/HeaderComp.vue'

const route = useRoute();
const productsStore = useProductsStore();
const favoritesStore = useFavoritesStore();

const productId = route.params.id;
const product = ref(null);

const selectedColor = ref('');
const selectedColorName = ref('');
const selectedSize = ref(null);
const quantity = ref(1);

const isWishlisted = computed(() => favoritesStore.isFavorite(productId));

onMounted(async() => {
    if(productsStore.products.length === 0){
        await productsStore.fetchProducts();
    }

    const foundProduct = productsStore.getProductById(productId);

    if(foundProduct){
        product.value = foundProduct;
        if(product.value.colores?.length > 0){
            selectedColor.value = product.value.colores[0].code;
            selectedColorName.value = product.value.colores[0].name;
        }
    }
});

const increaseQuantity = () => {
  if (quantity.value < product.value.stock) quantity.value++;
};

const decreaseQuantity = () => {
  if (quantity.value > 1) quantity.value--;
};

const formatPrice = (price) => {
  return price?.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' }) || '$0';
};

const isSelectionValid = computed(() => {
  return product.value && quantity.value > 0;
});

const quantityStatusClass = computed(() => {
  if (!product.value || product.value.stock === 0) return 'text-danger';
  return product.value.stock < 5 ? 'text-warning' : 'text-muted';
});

watch(quantity, (newVal) => {
  if (newVal > product.value.stock) {
    quantity.value = product.value.stock;
  } else if (newVal < 1) {
    quantity.value = 1;
  }
});

const addToCart = () => {
  console.log('Agregando al carrito:', {
    producto_id: product.value.id,
    talla: selectedSize.value,
    color: selectedColorName.value,
    cantidad: quantity.value
  });
};

const buyNow = () => {
  console.log('Iniciando compra directa:', product.value.nombre);
};

const toggleWishlist = () => {
  favoritesStore.toggleFavorite(productId);
};

</script>


<style scoped lang="css">

.product-detail-page {
  font-family: 'Outfit', sans-serif; 
  color: #333;
  text-transform: capitalize;
  letter-spacing: 1px;
}

.main-image-container {
  background-color: #fcfcfc; 
  border: 1px solid #f0f0f0;
}

.product-options-column {
  padding-left: 1.5rem;
}

.text-title{
  color: #555;
  font-size: 1.5rem;
  letter-spacing: 1px;
}

.quantity-selector .form-control {
  border-radius: 0;
}
.quantity-selector .btn {
  border-radius: 0;
  border-color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
}
.quantity-selector .btn:focus {
  box-shadow: none;
}
.quantity-selector .form-control::-webkit-inner-spin-button,
.quantity-selector .form-control::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.btn-dark {
  background-color: #000;
  border-radius: 0;
  transition: opacity 0.3s;
}
.btn-dark:hover:not(:disabled) {
  opacity: 0.8;
  background-color: #000;
}
.btn-outline-danger {
  border-color: #ffcccc;
  border-radius: 0;
  color: #ff8888;
}
.btn-outline-danger:hover {
  background-color: transparent;
  border-color: #ffaaaa;
  color: #ff6666;
}

.btn-purchase {
  background-color: #dd4e24;
  color: white;
  border-radius: 0;
  transition: background-color 0.3s;
}
.btn-purchase:hover:not(:disabled) {
  background-color: #cc411d;
  color: white;
}
.btn-purchase:disabled {
  background-color: #f2a68c;
  opacity: 1;
}

</style>
