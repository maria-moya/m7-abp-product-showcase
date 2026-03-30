describe('Filtro de productos', () => {
  it('filtra exitosamente un producto por nombre', () => {
    // 1. Visitar la Home 
    cy.visit('http://localhost:5173/m7-abp-product-showcase/') 

    // 2. Navegar a Productos 
    cy.contains('product').click() 

    // 3. ¡ESPERA AQUÍ! Verifica que cargó el título de la página
    cy.contains('Productos').should('be.visible') 

    // 4. Ahora sí, busca el input. Ya es seguro.
    cy.get('input').first().type('Silla')

    // 5. Verificar el resultado
    cy.contains('Silla').should('be.visible')
  })
})