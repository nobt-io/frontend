/// <reference types="Cypress" />

describe('The app homescreen', function() {
  beforeEach(() => {
    cy.fixture('nobt-with-one-bill').as('nobt');
  });

  it('should navigate to homescreen', function() {
    // Need to fix date otherwise would show different timestamps for the feed item
    cy.clock(new Date(2019, 1, 5));

    cy.server();
    cy.route({
      method: 'GET',
      url: '/nobts/' + this.nobt.id,
      status: 200,
      delay: 500,
      response: '@nobt',
    });
    cy.visit(this.nobt.id);

    // Waits for the page to actually render
    cy.contains('Cypress UI Test').should('exist');
    cy.percySnapshot('Feed');
  });

  it('should navigate to bill detail page', function() {
    cy.contains('li', 'My first bill')
      .should('exist')
      .click();

    cy.url().should('contain', '/1');
    cy.go('back');
  });

  it('should navigate to balances page', function() {
    cy.get('[data-cy=show-balances-button]').click();

    cy.url().should('contain', '/balances');
    cy.go('back');
  });
});
