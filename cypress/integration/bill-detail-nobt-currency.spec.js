/// <reference types="Cypress" />

describe('Details of a bill in nobt currency', function() {
  beforeEach(function() {
    cy.fixture('nobt-with-one-bill').as('nobt');
  });

  it('should navigate to details of bill', function() {
    cy.server();
    cy.route({
      method: 'GET',
      url: 'http://localhost:8080/nobts/' + this.nobt.id,
      status: 200,
      delay: 500,
      response: '@nobt',
    });
    cy.visit(this.nobt.id + '/1');

    // Waits for the page to actually render
    cy.contains('My first bill').should('exist');
    cy.percySnapshot('Details of bill in nobt currency');
  });

  it('should show the correct debtee', function() {
    cy.contains('David paid this bill').should('exist');
  });

  it('should show the correct amount in the nobt currency', function() {
    cy.contains('€20.00').should('exist');
  });

  it('should not say anything about a converted amount', function() {
    cy.contains('Converted from').should('not.exist');
  });

  it('should show two debtors', function() {
    cy.contains('ul', 'Debtors').as('debtorList');

    cy.get('@debtorList')
      .children('li')
      .should('have.length', 2);
  });

  it('should show a delete action', function() {
    cy.contains('ul', 'Actions').as('actionList');

    cy.get('@actionList').contains('li', 'Delete');
  });
});
