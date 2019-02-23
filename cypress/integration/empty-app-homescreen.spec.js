/// <reference types="Cypress" />

describe('The app homescreen with an empty feed', function() {
  beforeEach(function() {
    cy.fixture("empty-nobt-response").as("nobt");
  });

  it('should navigate to empty homescreen', function() {
    cy.server();
    cy.route({
      method: 'GET',
      url: 'http://localhost:8080/nobts/' + this.nobt.id,
      status: 200,
      delay: 500,
      response: '@nobt',
    });
    cy.visit('http://localhost:3000/' + this.nobt.id)
  });

  it('should show empty overview screen', function() {
    cy.contains('No bills found.').should('exist');
    cy.contains('Show balances').should('not.exist');
  });

  it('should have a menu to create new items', function() {
    cy.contains('button', 'add').click();
    cy.contains('button', 'payment')
      .should('exist')
      .should('be.disabled');

    cy.contains('button', 'receipt')
      .should('exist')
      .should('be.enabled');
  });

  it('should navigate to bill wizard', function() {
    cy.contains('button', 'receipt').click();
    cy.url().should('include', '/bill');
    cy.go("back")
  });
});
