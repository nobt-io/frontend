/// <reference types="Cypress" />

describe('The balances page', function() {
  beforeEach(() => {
    cy.fixture("nobt-with-one-bill").as("nobt")
  });

  it('should navigate to balances screen', function() {
    cy.server();
    cy.route({
      method: 'GET',
      url: '/nobts/' + this.nobt.id,
      status: 200,
      delay: 500,
      response: 'fixture:nobt-with-one-bill',
    });
    cy.visit(this.nobt.id + "/balances")
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

    cy.go('back');

    cy.contains('li', 'David').click();

    cy.url().should('contain', '/David');
    cy.contains('li', 'Thomas')
      .contains('€10.00')
      .should('exist');

    cy.go('back');
    cy.go('back');
  });
});
