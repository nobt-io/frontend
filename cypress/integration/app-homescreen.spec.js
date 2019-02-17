/// <reference types="Cypress" />

describe('App homescreen with feed', function() {
  beforeEach(() => {
    cy.fixture("nobt-with-one-bill").as("nobt")
  });

  it('should navigate to homescreen', function() {
    cy.server();
    cy.route({
      method: 'GET',
      url: '/nobts/' + this.nobt.id,
      status: 200,
      delay: 500,
      response: '@nobt',
    });
    cy.visit('http://localhost:3000/' + this.nobt.id)
  });

  it('should navigate to bill detail page', function() {
    cy.contains('li', 'My first bill').should("exist").click();

    cy.url().should('contain', '/1');
    cy.go("back")
  });

  it('should navigate to balances page', function() {
    cy.contains('button', 'Show balances').click()

    cy.url().should('contain', '/balances');
    cy.go("back")
  });
});
