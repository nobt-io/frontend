/// <reference types="Cypress" />

/*
 * This bug occurs because the name "Blair" was spelt with a space at the end.
 */

describe('Bug #277', function() {
  it('should allow to view balances of Blair', function() {
    cy.visit('/balances/Blair', {
      nobtFixture: 'bug-277',
    });
    cy.contains('Blair').should('exist');
  });
});
