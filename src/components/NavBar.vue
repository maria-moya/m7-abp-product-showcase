<template>
  <div>
    <nav class="navbar navbar-expand-lg py-3 bg-body-tertiary border-bottom">
      <div class="container-fluid d-flex align-items-center justify-content-between">
       
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="d-flex align-center gap-1 gap-md-2 ms-auto order-lg-last">
          <template v-if="!isAuth">
            <RouterLink to="/login" class="user-link d-none d-sm-flex">
              <v-icon size="small" class="me-1">mdi-account-outline</v-icon>
              <span>Inicia sesión</span>
            </RouterLink>
          </template>

          <template v-else>
            <span class="text-caption me-2 d-none d-sm-inline">Hola, {{ displayName }}</span> <!--d-sm-inline-->
            <v-btn icon="mdi-logout-variant" variant="text" size="small" @click="onLogout"></v-btn>
          </template>

          <v-btn icon variant="text" density="comfortable">
            <v-badge content="0" color="black" offset-x="-10" offset-y="-4">
              <v-icon size="small">mdi-cart-outline</v-icon>
            </v-badge>
          </v-btn>

          <v-btn icon variant="text" density="comfortable" @click="themeStore.toggleTheme()">
            <v-icon size="small">
              {{ themeStore.isDarkMode ? 'mdi-moon-waning-crescent' : 'mdi-white-balance-sunny' }}
            </v-icon>
          </v-btn>
        </div>

        <div class="collapse navbar-collapse" id="navbarNavAltMarkup" ref="navbarCollapse">
          <div class="navbar-nav  d-lg-flex gap-4 align-center">

            <div class="d-lg-block">
              <v-btn icon="mdi-magnify" variant="text" density="comfortable" color="grey-darken-1"></v-btn>
            </div>

            <RouterLink to="/" class="nav-link-custom" @click="closeMenu">Inicio</RouterLink>
            <RouterLink to="/about" class="nav-link-custom" @click="closeMenu">Nosotros</RouterLink>
            <RouterLink to="/product" class="nav-link-custom" @click="closeMenu">Productos</RouterLink>
            <RouterLink v-if="isAdmin" :to="{ name: 'crud-products' }" class="nav-link-custom" @click="closeMenu">Crud productos</RouterLink>
            <RouterLink v-if="isAuth" to="/favorites" class="nav-link-custom" @click="closeMenu">Favoritos</RouterLink>
      
          </div>
        </div>

      </div>
    </nav>
  </div>
</template>

<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/user.store.js'
import { logout } from '@/services/auth.js'
import { useThemeStore } from '@/stores/theme.store'

const themeStore = useThemeStore();
const router = useRouter();
const userStore = useUserStore();

const navbarCollapse = ref(null);

const isAuth = computed(() => userStore.isAuthenticated)
const isAdmin = computed(() => userStore.user?.role === 'admin')

const closeMenu = () => {
  if (navbarCollapse.value?.classList.contains('show')) {
    const bootstrap = window.bootstrap
    const bsCollapse = new bootstrap.Collapse(navbarCollapse.value)
    bsCollapse.hide()
  }
}

const displayName = computed(() => {
  const u = userStore.user;
  return u ? (`${u.firstname || ''} ${u.lastname || ''}`.trim() || u.email) : '';
})

async function onLogout() {
    await logout()
    userStore.clearUser()
    router.push({ name: 'login' })
}
</script>

<style scoped lang="css">
.nav-link-custom{
  text-decoration: none;
  color: var(--bs-body-color);
  opacity: 0.7;
  font-size: 1rem;
  letter-spacing: 1px;
  text-transform: capitalize;
  transition: all 0.3s;
}

.nav-link-custom:hover, .router-link-active {
  color: var(--bs-primary) !important;
  opacity: 1;
}

.user-link{
  text-decoration: none;
  color: var(--bs-secondary-color);
  font-size: 0.75rem;
  display: flex;
  align-items: center;
}

.expanding-search {
  transition: width 0.3s ease;
  width: 250px;
}

@media (max-width: 600px) {
  .expanding-search {
    width: 150px;
  }
}
</style>
