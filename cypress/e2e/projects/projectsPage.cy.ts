describe('Projects page', () => {
  beforeEach(() => {
    cy.intercept('**api/projects', {
      projects: [],
      project_count: 1,
    });

    cy.visit('#/app/projects');
  });

  it('shows menu', () => {
    cy.contains('h2', 'Projekty').should('be.visible');
    cy.get('input[placeholder="Wyszukaj"]').should('be.visible');
    cy.contains('lista').should('be.visible');
    cy.contains('button', 'dodaj projekt').should('be.visible');
    cy.get("[data-testid='list-button']").should('be.visible');
  });

  it('shows project table', () => {});
});
