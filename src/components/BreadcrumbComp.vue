<template>
  <div>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb mb-0">
        <li v-for="(crumb, index) in crumbs" :key="index" class="breadcrumb-item">
          <span v-if="index === crumbs.length - 1" class="active text-dark fw-bold">
            {{ crumb.label }}
          </span>
          <RouterLink v-else :to="crumb.path" class="text-decoration-none text-muted">
            {{ crumb.label }}
          </RouterLink>
        </li>
      </ol>
    </nav>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const crumbs = computed(() => {
  
  let breadcrumbs = [
    { label: 'Inicio', path: '/' }
  ];

  if (route.name === 'category') {
    breadcrumbs.push({ label: 'Productos', path: '/product' });
  }

  const matchedRoutes = route.matched.map((m) => {
    const label = typeof m.meta.breadcrumb === 'function' 
                  ? m.meta.breadcrumb(route) 
                  : m.meta.breadcrumb;

    return {
      label: label || m.name,
      path: m.path.replace(':category', route.params.category)
    };
  });

  const currentCrumbs = matchedRoutes.filter(m => m.label !== 'Inicio');
  
  return [...breadcrumbs, ...currentCrumbs];
})
</script>

<style scoped lang="css">
.breadcrumb {
  font-size: 0.9rem;
  background: transparent;
  padding: 0;
}
.breadcrumb-item + .breadcrumb-item::before {
  content: "›"; 
  color: #999;
}

.breadcrumb-item {
  text-transform: capitalize;
}

.active {
  letter-spacing: 1px;
  color: #222 !important;
}
</style>
