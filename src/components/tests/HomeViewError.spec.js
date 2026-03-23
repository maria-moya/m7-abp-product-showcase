import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import HomeView from '@/views/HomeView.vue'
import { useProductsStore } from '@/stores/products.store'

describe('HomeView - Gestión de Error', () => {
  it('Debe mostrar una alerta roja cuando existe un error desde la API (Store)', async () => {
    
    const wrapper = mount(HomeView, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
        stubs: ['RouterLink', 'HeaderComp', 'CarruselComp', 'ProductCard', 'ProductList'] 
      }
    })
    
    const store = useProductsStore()
    store.errorMsg = 'Error críto 500: API caída'

    await wrapper.vm.$nextTick()
    
    const errorAlert = wrapper.find('.alert.alert-danger')
    expect(errorAlert.exists()).toBe(true)
    expect(errorAlert.text()).toContain('Error críto 500: API caída')
  })
})