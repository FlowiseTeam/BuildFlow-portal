describe('Projects page', () => {
  beforeEach(() => {
    cy.intercept('**api/projects', {
      projects: [
        {
          client: 'Bud-pol',
          created_at: '2024-01-07T14:38:12.795Z',
          end_date: '2024-01-08T14:38:12.795Z',
          name: 'Kościół',
          start_date: '2024-01-07T14:38:12.795Z',
          status: 'W trakcie',
          street: 'Wierzbięcice',
          zipcode: '60-688',
          city: 'Poznań',
          employees: [],
          updated_at: '2024-01-07T14:38:12.795Z',
          _id: 1,
          vehicles: [],
        },
      ],
      project_count: 1,
    });

    cy.visit('#/app/projects');
  });

  it('shows menu', () => {
    cy.contains('h2', 'Projekty').should('be.visible');
    cy.get('input[placeholder="Wyszukaj"]').should('be.visible');
    cy.contains('lista').should('be.visible');
    cy.contains('button', 'Dodaj projekt').should('be.visible');
    cy.get("[data-testid='list-button']").should('be.visible');
  });

  it('shows project table', () => {
    cy.contains('Kościół');
    cy.contains('7.01.2024');
    cy.contains('8.01.2024');
    cy.contains('Poznań, Wierzbięcice');
    cy.contains('0');
    cy.contains('W trakcie');
  });

  it('project table search', () => {
    cy.get('input[name="filter"]').type('Kościół');
    cy.contains('Poznań, Wierzbięcice');
  });
});
