/**
 * @vitest-environment jsdom
 */
import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import ProductCard from '../ProductCard.vue'

describe('ProductCard', () => {
  it('renderiza correctamente los datos del producto y el precio formateado', () => {
    const productoMock = {
      id: 123,
      nombre: 'Mesa',
      precio: 50000,
      stock: 10,
      imagen: 'mesa.jpg',
    }

    const wrapper = mount(ProductCard, {
      props: { producto: productoMock },
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              user: { isAuthenticated: true },
              favorites: { ids: [] },
            },
          }),
        ],

        mocks: {
          $route: { name: 'home', path: '/' },
        },
        stubs: {
          'v-card': true,
          'v-dialog': true,
          RouterLink: true,
        },
        renderStubDefaultSlots: true,
      },
    })

    expect(wrapper.text()).toContain('Mesa')
    expect(wrapper.text()).toContain('$')
    expect(wrapper.text()).toContain('50.000')

    const img = wrapper.find('img')
    expect(img.attributes('src')).toBe('mesa.jpg')
  })

  it('no muestra el botón de favoritos si el usuario no está autenticado', () => {
    const productoMock = { nombre: 'Mesa de centro', precio: 50000, stock: 10 }

    const wrapper = mount(ProductCard, {
      props: { producto: productoMock },
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              user: { isAuthenticated: false },
            },
          }),
        ],
        mocks: { $route: { name: 'home' } },
        stubs: { 'v-dialog': true },
      },
    })

    expect(wrapper.find('.btn-fav').exists()).toBe(false)
  })
})
