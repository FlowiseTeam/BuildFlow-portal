describe('Dashboard page', () => {
  beforeEach(() => {
    cy.intercept('**api/projects', {
      projects: [],
      project_count: 1,
    });
    cy.intercept('**api/employees', {
      employees: [
        { assigned_project: ['i am assigned'] },
        { assigned_project: [] },
        { assigned_project: [] },
        { assigned_project: [] },
      ],
      employees_count: 4,
    });
    cy.intercept('**api/projects/comments/latest', [
      {
        created_at: '2023-12-01T12:55:23.702Z',
        images: [],
        message: 'test message',
        project_id: 1,
        _id: 1,
      },
      {
        created_at: '2023-12-01T12:55:23.702Z',
        images: [],
        message: 'another message',
        project_id: 1,
        _id: 2,
      },
      {
        created_at: '2023-12-01T12:55:23.702Z',
        images: [],
        message: 'and another',
        project_id: 1,
        _id: 3,
      },
      {
        created_at: '2023-12-01T12:55:23.702Z',
        images: [],
        message: 'last message',
        project_id: 1,
        _id: 4,
      },
    ]);
    cy.visit('/');
  });

  it('shows company name with morning greeting', () => {
    cy.clock(new Date(2023, 1, 1, 10, 0, 0).getTime());

    cy.contains('Bud-pol').should('be.visible');
    cy.contains('Dzień dobry.').should('be.visible');
  });

  it('shows stats', () => {
    cy.contains('p', 'Projekty').should('be.visible');
    cy.contains('1').should('be.visible');

    cy.contains('p', 'Pracownicy').should('be.visible');
    cy.contains('4').should('be.visible');

    cy.contains('Nieprzypisani').should('be.visible');
    cy.contains('3').should('be.visible');
  });

  it('shows latests comments', () => {
    cy.contains('test message').should('be.visible');
    cy.contains('1.12.2023').should('be.visible');

    cy.contains('another message').should('be.visible');
    cy.contains('and another').should('be.visible');
    cy.contains('last message').should('be.visible');
  });
});
