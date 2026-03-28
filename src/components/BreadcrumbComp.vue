<template>
  <div>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb mb-0">
        <li v-for="(crumb, index) in crumbs" :key="index" class="breadcrumb-item">
          <span v-if="index === crumbs.length - 1" class="active-crumb fw-bold">
            {{ crumb.label }}
          </span>
          <RouterLink v-else :to="crumb.path" class="text-decoration-none crumb-link">
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
  color: var(--bs-secondary-color);
}

.breadcrumb-item {
  text-transform: capitalize;
}

.crumb-link {
  color: var(--bs-secondary-color);
  transition: color 0.3s;
}

.crumb-link:hover {
  color: var(--bs-primary);
}

.active-crumb {
  letter-spacing: 1px;
  color: var(--bs-body-color);
}
</style>
