/// <reference types="Cypress" />

/*
 * This bug occurs because the name "Blair" was spelt with a space at the end.
 */

describe('Bug #277', function() {
  beforeEach(function() {
    cy.fixture('bug-277').as('nobt');
  });

  it('should allow to view balances of Blair', function() {
    cy.server();
    cy.route({
      method: 'GET',
      url: 'http://localhost:8080/nobts/' + this.nobt.id,
      status: 200,
      response: '@nobt',
    });
    cy.visit(this.nobt.id + '/balances/Blair');
    cy.contains('Blair').should('exist');
  });
});
