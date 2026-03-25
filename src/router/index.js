import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user.store'
import { auth } from '@/firebaseConfig'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: { breadcrumb: 'Inicio' },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: { breadcrumb: 'Nosotros' },
    },
    {
      path: '/product',
      name: 'product',
      component: () => import('../views/ProductView.vue'),
      meta: { breadcrumb: 'Productos' },
    },
    {
      path: '/admin',
      meta: { requiresAuth: true, requiresRole: 'admin' },
      children: [
        {
          path: 'products',
          name: 'crud-products',
          component: () => import('../views/admin/CrudProductView.vue'),
          meta: { breadcrumb: 'CRUD productos' },
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { breadcrumb: 'Inicio sesión' },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
      meta: { breadcrumb: 'Registro' },
    },
    {
      path: '/category/:category',
      name: 'category',
      component: () => import('../views/CategoryView.vue'),
      props: true,
      meta: { breadcrumb: (route) => route.params.category },
    },
    {
      path: '/:pathMatch(.*)',
      name: 'notfound',
      component: () => import('../views/404View.vue'),
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: () => import('../views/FavoritesView.vue'),
      meta: { requiresAuth: true, breadcrumb: 'Favoritos' }
    },
  ],
})

router.beforeEach(async (to, from) => {
  const requiresAuth = to.meta?.requiresAuth
  const requiresRole = to.meta?.requiresRole

  const userStore = useUserStore()

  const firebaseUser = await new Promise((resolve) => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      unsubscribe()
      resolve(u)
    })
  })

  if (firebaseUser && !userStore.user) {
    await userStore.setUserFromAuth(firebaseUser)
  }

  const isAuth = userStore.isAuthenticated || !!firebaseUser

  if (requiresAuth && !isAuth) {
    return { name: 'login' }
  }

  if (requiresRole) {
    const role = userStore.user?.role || null
    if (role !== requiresRole) return { name: 'home' }
  }

  return true
})

export default router
