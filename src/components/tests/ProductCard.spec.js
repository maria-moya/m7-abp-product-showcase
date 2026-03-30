/**
 * @vitest-environment jsdom
 */
import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import ProductCard from '../ProductCard.vue'
import { useRoute } from 'vuetify/lib/composables/router'

vi.mock('vue-router', () => ({
  useRoute: () => ({ name: 'home', path: '/' }),
  useRouter: () => ({ push: vi.fn() })
}))

describe('ProductCard', () => {
  it('renderiza correctamente los datos', () => {

    const wrapper = mount(ProductCard, {
      props: { 
        producto: { id: 123, nombre: 'Mesa', precio: 50000, stock: 10 } 
      },
      global: {
        plugins: [
          createTestingPinia({ 
            createSpy: vi.fn 
          })
        ],
        mocks: {
          $route: { name: 'home', path: '/' }
        },
        stubs: {
          RouterLink: { template: '<a><slot /></a>' },
          'v-card': { template: '<div><slot /></div>' },
          'v-dialog': { template: '<div><slot /></div>' },
          'v-btn': true,
          'v-icon': true
        },
      },
    })
  
    expect(wrapper.text()).toContain('Mesa')
    expect(wrapper.text()).toContain('50.000')
  })
})
