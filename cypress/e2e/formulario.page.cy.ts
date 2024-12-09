describe('Prueba completa del formulario', () => {
  beforeEach(() => {
    cy.visit('/registrarse');
  });

  it('Debe mostrar todos los campos del formulario', () => {
    cy.get('[data-testid="rut-input"]').should('exist');
    cy.get('[data-testid="nombre-input"]').should('exist');
    cy.get('[data-testid="apellidop-input"]').should('exist');
    cy.get('[data-testid="apellidom-input"]').should('exist');
    cy.get('[data-testid="correo-input"]').should('exist');
    cy.get('[data-testid="password-input"]').should('exist');
    cy.get('.submit-button').should('exist');
  });

  it('Debe mostrar un mensaje de error si faltan campos obligatorios', () => {
    cy.get('[data-testid="nombre-input"]').type('Juan');
    cy.get('[data-testid="correo-input"]').type('correo@invalido');
    cy.get('.submit-button').click();

    cy.get('.error-message', { timeout: 10000 }).should('exist');
    cy.get('.error-message').contains('Error al registrar el usuario: Error: Por favor, ingrese todos los campos');
  });
});
