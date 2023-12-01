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

    cy.contains('Bud-pol');
    cy.contains('Dzień dobry.');
  });

  it('shows stats', () => {
    cy.contains('Projekty');
    cy.contains('1');

    cy.contains('Pracownicy');
    cy.contains('4');

    cy.contains('Nieprzypisani');
    cy.contains('3');
  });

  it('shows latests comments', () => {
    cy.contains('test message');
    cy.contains('1.12.2023');

    cy.contains('another message');
    cy.contains('and another');
    cy.contains('last message');
  });
});
