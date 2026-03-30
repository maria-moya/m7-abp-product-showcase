/**
 * @vitest-environment jsdom
 */
import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import ProductView from '@/views/ProductView.vue'

describe('ProductView - Gestión de Error', () => {
  it('Debe mostrar el mensaje de error cuando falla la carga de productos', async () => {
    const wrapper = mount(ProductView, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              products: { 
                errorMsg: 'Error 500: No se pudo conectar con el servidor',
                isLoading: false,
                products: [] 
              } 
            }
          })
        ],
        
        stubs: ['RouterLink', 'HeaderComp', 'ProductList', 'v-progress-circular', 'BreadcrumbComp'] 
      }
    })

    const errorAlert = wrapper.find('.border-danger') 
    
    expect(errorAlert.exists()).toBe(true)
    expect(errorAlert.text()).toContain('Error 500: No se pudo conectar con el servidor')
    
    const loader = wrapper.find('v-progress-circular-stub')
    expect(loader.exists()).toBe(false)
  })
})