describe('Pruebas para HomePage', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://cors-anywhere.herokuapp.com/https://www.freetogame.com/api/games', { fixture: 'games.json' }).as('getGames'); // Mock del servicio
    cy.visit('/'); // Asegúrate de que esta ruta sea correcta
  });

  it('Debe cargar los juegos iniciales', () => {
    cy.wait('@getGames');
    cy.get('mat-list-item').should('have.length', 15); // Verifica que se cargan 10 juegos
  });

  it('Debe filtrar los juegos correctamente', () => {
    cy.wait('@getGames');
    cy.get('input[placeholder="Buscar..."]').type('Overwatch 2'); // Cambia el texto según tus datos
    cy.get('mat-list-item').should('contain.text', 'Overwatch 2');
  });

  it('Debe mostrar todos los juegos si se borra el filtro', () => {
    cy.wait('@getGames');
    cy.get('input[placeholder="Buscar..."]').type('Overwatch 2');
    cy.get('mat-list-item').should('contain.text', 'Overwatch 2');
    cy.get('input[placeholder="Buscar..."]').clear();
    cy.get('mat-list-item').should('have.length', 15); // Vuelve a mostrar todos los juegos
  });

  it('Debe redirigir al detalle del juego al hacer clic', () => {
    cy.wait('@getGames');
    cy.get('mat-list-item.game-item').eq(0).click(); // Haz clic en el primer juego
    cy.url().should('include', '/detalle-juego'); // Asegúrate de que navega al detalle
  });
});