describe('Filtro de productos', () => {
  it('filtra exitosamente un producto por nombre', () => {
    cy.visit('http://localhost:5173/') // Asegurate de correr en este puerto tu vite app.
    // Simulamos tener un producto llamado "Silla" en la db
    cy.get('input[type="text"]').type('Silla')
    cy.get('.card-title').should('contain', 'Silla')
  })
})