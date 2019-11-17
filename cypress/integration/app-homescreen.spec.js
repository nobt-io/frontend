/// <reference types="Cypress" />

describe('The app homescreen', function() {
  it('should navigate to homescreen', function() {
    // Need to fix date otherwise would show different timestamps for the feed item
    cy.clock(new Date(2019, 1, 5));
    cy.visit('/', {
      nobtFixture: 'nobt-with-one-bill',
    });

    cy.document().toMatchImageSnapshot();
  });

  it('should navigate to bill detail page', function() {
    cy.contains('li', 'My first bill')
      .should('exist')
      .click();

    cy.url().should('contain', '/1');
    cy.document().toMatchImageSnapshot();
    cy.go('back');
  });

  it('should navigate to balances page', function() {
    cy.get('[data-cy=show-balances-button]').click();

    cy.url().should('contain', '/balances');
    cy.document().toMatchImageSnapshot();
    cy.go('back');
  });
});
