<template>
  <div>
    <table class="table table-hover align-middle">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Nombre</th>
          <th scope="col">Imagen</th>
          <th scope="col">Categoría</th>
          <th scope="col">Stock</th>
          <th scope="col">Precio</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="producto in productos" :key="producto.id" class="align-middle">
          <th scope="row">{{ producto.id }}</th>
          <td>{{ producto.nombre }}</td>
          <td>
            <img :src="producto.imagen" :alt="producto.nombre" />
          </td>
          <td>{{ producto.categoria }}</td>
          <td>{{ producto.stock }}</td>
          <td>{{ formatPrice(producto.precio) }}</td>
          <td>
            <button class="btn btn-warning" @click="emit('modoEdicion', producto.id)">
              <i class="bi bi-pencil-square"></i>
            </button>
            <button class="btn btn-danger ms-1" @click="eliminar(producto.id, producto.nombre)">
              <i class="bi bi-trash3"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue'
import { useProductsStore } from '@/stores/products.store.js'
import Swal from 'sweetalert2'

const productsStore = useProductsStore()

const emit = defineEmits(['modoEdicion'])

defineProps(['productos'])

const formatPrice = (price) => {
  return price?.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' }) || '$0';
};

const eliminar = async (id, nombre) => {
  try {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
        actions: 'gap-2',
      },
      buttonsStyling: false,
    });

    const result = await swalWithBootstrapButtons.fire({
        title: `¿Estás seguro que deseas eliminar el producto ${nombre}`,
        text: "¡No podrás revertir esta acción!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true,
      });

      if (result.isConfirmed){
        let respuesta = await productsStore.deleteProduct(id);

        if(respuesta.success){
          await swalWithBootstrapButtons.fire({
            title: '¡Eliminado!',
            text: respuesta.success || 'El producto ha sido borrado.',
            icon: 'success',
          });
        } else {
          await swalWithBootstrapButtons.fire({
            title: 'Error',
            text: respuesta.error || 'No se pudo eliminar el producto.',
            icon: 'error',
          });
        }
      }else if (result.dismiss === Swal.DismissReason.cancel){
        swalWithBootstrapButtons.fire({
          title: 'Cancelado',
          text: 'Tu producto esta a salvo.',
          icon: 'error',
        });
      }
  } catch (error) {
    console.log("Error en la operación: ", error);
    Swal.fire('Error', 'Ocurrió un fallo inesperado', 'error');
  }
}
</script>

<style scoped>
.table img {
  width: 75px;
}
</style>
