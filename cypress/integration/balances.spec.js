/// <reference types="Cypress" />

describe('The balances page', function() {
  it('should navigate to balances screen', function() {
    cy.visit('/balances', {
      nobtFixture: 'nobt-with-one-bill',
    });

    cy.document().toMatchImageSnapshot();
  });

  it('should show correct balances', function() {
    cy.contains('li', 'Thomas')
      .contains('-€10.00')
      .should('exist');
    cy.contains('li', 'David')
      .contains('€10.00')
      .should('exist');
  });

  it('should show individual debts', function() {
    cy.contains('li', 'Thomas').click();

    cy.url().should('contain', '/Thomas');
    cy.contains('li', 'David')
      .contains('-€10.00')
      .should('exist');
    cy.document().toMatchImageSnapshot("Thomas's account");

    cy.go('back');

    cy.contains('li', 'David').click();

    cy.url().should('contain', '/David');
    cy.contains('li', 'Thomas')
      .contains('€10.00')
      .should('exist');
    cy.document().toMatchImageSnapshot("David's account");

    cy.go('back');
    cy.go('back');
  });
});
