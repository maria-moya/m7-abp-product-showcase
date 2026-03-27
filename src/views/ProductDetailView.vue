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
                            <h2 class="display-6 fw-light mb-2 text-dark">{{ product.nombre }}</h2>
                            <p class="text-muted small mb-3">SKU: {{ product.id }}</p>
                            <p class="fs-2 mb-0">{{ formatPrice(product.precio) }}</p>
                        </div>

                        <div class="product-selection-block mb-5">
                            <div class="mb-4">
                                <div class="d-flex justify-content-between align-items-center mb-3">
                                    <label class="small text-uppercase fw-bold mb-0">Cantidad</label>
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
                                <v-expansion-panel-title collapse-icon="mdi-minus" expand-icon="mdi-plus">
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
import BreadcrumbComp from '@/components/BreadcrumbComp.vue'
import HeaderComp from '@/components/HeaderComp.vue'

const route = useRoute();
const productsStore = useProductsStore();

const productId = route.params.id;

const product = ref(null);

const selectedColor = ref('');
const selectedColorName = ref('');
const selectedSize = ref(null);
const quantity = ref(1);
const isWishlisted = ref(false);

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

// En un entorno real, obtendrías esto de un store o una API
// const product = ref({
//   id: '00003',
//   sku: '00003',
//   nombre: 'Soy un producto',
//   precio: 19.99,
//   imagen: 'https://via.placeholder.com/600x600', // URL de tu imagen
//   imagenes: [
//     'https://via.placeholder.com/600x600',
//     'https://via.placeholder.com/200x200'
//   ],
//   colores: [
//     { name: 'Blanco', code: '#fff' },
//     { name: 'Gris', code: '#aaa' },
//     { name: 'Negro', code: '#000' }
//   ],
//   tallas: ['S', 'M', 'L', 'XL'],
//   stock: 12,
//   descripcion_corta: 'Descripción del producto. Es el lugar ideal para agregar más información sobre tu producto.',
//   accordionItems: [
//     { title: 'INFORMACIÓN DEL PRODUCTO', content: 'Detalles completos sobre materiales, cuidado y origen.' },
//     { title: 'POLÍTICA DE DEVOLUCIONES', content: 'Nuestra política de 30 días para cambios y devoluciones.' },
//     { title: 'ENVÍO', content: 'Información sobre tiempos y costos de envío.' }
//   ]
// });

// // Estado Reactivo de Selección
// const selectedColor = ref(product.value.colores[0].code);
// const selectedColorName = ref(product.value.colores[0].name);
// const selectedSize = ref(null);
// const quantity = ref(1);
// const isWishlisted = ref(false);

// Funciones de Cantidad con Lógica de Stock
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

// Validar input manual de cantidad
watch(quantity, (newVal) => {
  if (newVal > product.value.stock) {
    quantity.value = product.value.stock;
  } else if (newVal < 1) {
    quantity.value = 1;
  }
});


// Acciones (simuladas)
const addToCart = () => {
  console.log('Agregando al carrito:', {
    producto_id: product.value.id,
    talla: selectedSize.value,
    color: selectedColorName.value,
    cantidad: quantity.value
  });
  // Aquí llamarías a tu Cart Store
};

const buyNow = () => {
  console.log('Iniciando compra directa:', product.value.nombre);
};

const toggleWishlist = () => {
  isWishlisted.value = !isWishlisted.value;
};
</script>

<style scoped lang="css">
/* GENERAL */
.product-detail-page {
  font-family: 'Montserrat', sans-serif; /* O la fuente que uses en tu proyecto */
  color: #333;
}

/* COLUMNA IZQUIERDA */
.main-image-container {
  background-color: #fcfcfc; /* Fondo muy claro para resaltar la imagen, como en la referencia */
  border: 1px solid #f0f0f0;
}

.thumbnail-container img {
  width: 70px;
  height: 70px;
  object-fit: cover;
  cursor: pointer;
  border-radius: 0;
  border: 1px solid transparent;
}
.thumbnail-container img:hover {
  border-color: #ddd;
}

/* COLUMNA DERECHA */
.product-options-column {
  padding-left: 1.5rem;
}

/* Opciones: Colores */
.color-swatch {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 1px solid #ddd;
  transition: transform 0.2s, border-color 0.2s;
}
.color-swatch:hover {
  transform: scale(1.1);
}
.color-swatch.active {
  border: 2px solid #000;
  transform: scale(1.1);
}

/* Opciones: Tallas (Fixes de Vuetify para diseño minimalista) */
.minimal-select :deep(.v-field__outline) {
  --v-field-border-opacity: 0.15;
  border-radius: 0; /* Bordes rectos */
}
.minimal-select :deep(.v-field--focused .v-field__outline) {
  --v-field-border-opacity: 1;
}

/* Opciones: Cantidad */
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

/* Botones de Acción */
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
  background-color: #dd4e24; /* El color naranja/ocre de tu referencia */
  color: white;
  border-radius: 0;
  transition: background-color 0.3s;
}
.btn-purchase:hover:not(:disabled) {
  background-color: #cc411d;
  color: white;
}
.btn-purchase:disabled {
  background-color: #f2a68c; /* Versión más pálida para deshabilitado */
  opacity: 1;
}

/* Acordeón de Detalles (Fixes de Vuetify para minimalismo) */
.minimal-accordion :deep(.v-expansion-panel) {
  background-color: transparent !important;
  color: #333;
}
.minimal-accordion :deep(.v-expansion-panel-title) {
  padding-left: 0;
  padding-right: 0;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
  font-weight: normal;
}
.minimal-accordion :deep(.v-expansion-panel-text) {
  padding-left: 0;
  padding-right: 0;
  font-size: 0.9rem;
  color: #555;
  line-height: 1.6;
}
.minimal-accordion :deep(.v-expansion-panel-text__wrapper) {
  padding-left: 0;
  padding-right: 0;
  padding-bottom: 2rem;
}
.minimal-accordion :deep(.v-expansion-panel-title__icon) {
  font-size: 0.7rem;
}
</style>
