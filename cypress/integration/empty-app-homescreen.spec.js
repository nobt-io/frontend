/// <reference types="Cypress" />

describe('The app homescreen with an empty feed', function() {
  it('should navigate to empty homescreen', function() {
    cy.visit('/', {
      nobtFixture: 'empty-nobt-response',
    });

    cy.document().toMatchImageSnapshot();
  });

  it('should show empty overview screen', function() {
    cy.contains('No bills found.').should('exist');
    cy.get('[data-cy=show-balances-button]').should('not.exist');
  });

  it('should have a menu to create new items', function() {
    cy.get('[data-cy=toggle-menu-button]').click({ force: true });
    cy.get('[data-cy=add-payment-button]')
      .should('exist')
      .should('be.disabled');

    cy.get('[data-cy=add-bill-button]')
      .should('exist')
      .should('be.enabled');

    cy.document().toMatchImageSnapshot();
  });

  it('should navigate to bill wizard', function() {
    cy.get('[data-cy=add-bill-button]').click();
    cy.url().should('include', '/bill');
    cy.go('back');
  });

  it('should navigate to bill wizard through link', function() {
    cy.get('[data-cy=add-bill-link]').click();
    cy.url().should('include', '/bill');
    cy.go('back');
  });
});
