<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-withe sticky-top py-3">
      <div class="container position-relative justify-content-center">
        
        <div class="position-absolute start-0 d-none d-md-block">
          <v-btn icon="mdi-magnify" variant="text" density="comfortable" color="grey-darken-1"></v-btn>
        </div>

        <div class="d-flex gap-4 align-center">
          <RouterLink to="/" class="nav-link-custom">Inicio</RouterLink>
          <RouterLink to="/about" class="nav-link-custom">Nosotros</RouterLink>
          <RouterLink to="/product" class="nav-link-custom">Productos</RouterLink>
          <RouterLink v-if="isAdmin" :to="{ name: 'crud-products' }" class="nav-link-custom">Crud productos</RouterLink>
          <RouterLink v-if="isAuth" to="/favorites" class="nav-link-custom ">Favoritos</RouterLink>
        </div>

        <div class="position-absolute end-0 d-flex align-center gap-2">
          <template v-if="!isAuth">
            <RouterLink to="/login" class="user-link">
              <v-icon size="small" class="me-1">mdi-account-outline</v-icon>
              <span>Inicia sesión</span>
            </RouterLink>
          </template>

          <template v-else>
            <span class="text-caption me-2 d-none d-sm-inline">Hola, {{ displayName }}</span>
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

      </div>
    </nav>
  
  </div>
</template>

<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { computed } from 'vue'
import { useUserStore } from '@/stores/user.store.js'
import { logout } from '@/services/auth.js'
import { useThemeStore } from '@/stores/theme.store'

const themeStore = useThemeStore();

const router = useRouter()
const userStore = useUserStore()

const isAuth = computed(() => userStore.isAuthenticated)
const isAdmin = computed(() => userStore.user?.role === 'admin')

const displayName = computed(() => {
  const u = userStore.user
  if (!u) return ''
  return `${u.firstname || ''} ${u.lastname || ''}`.trim() || u.email
})

async function onLogout() {
  try {
    await logout()
    userStore.clearUser()
    router.push({ name: 'login' })
  } catch (e) {
    console.error(e)
  }
}
</script>

<style scoped lang="css">
.nav-link-custom{
  text-decoration: none;
  color: #555;
  font-size: 1rem;
  letter-spacing: 1px;
  text-transform: capitalize;
  transition: color 0.3s;
}

.nav-lik-custom:hover{
  color: #000;
}

.user-link{
  text-decoration: none;
  color: #666;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
}

.router-link-active{
  font-weight: 500;
  color: #000 !important;
}
</style>
