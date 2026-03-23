import { mount } from '@vue/test-utils'
import ProductCard from '../ProductCard.vue'

describe('ProductCard', () => {
  it('renderiza correctamente los datos del producto', () => {
    const productoMock = { nombre: 'Mesa', precio: 50000, stock: 10 }
    const wrapper = mount(ProductCard, { props: { producto: productoMock } })
    expect(wrapper.text()).toContain('Mesa')
    expect(wrapper.text()).toContain('50000')
  })
})
