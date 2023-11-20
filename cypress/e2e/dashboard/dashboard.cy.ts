describe('Dashboard page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('shows stats', () => {
    cy.contains('Pracownicy');
    cy.contains('Projekty');
    cy.contains('Nieprzypisani');
  });
});
