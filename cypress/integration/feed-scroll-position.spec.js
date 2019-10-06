/// <reference types="Cypress" />

describe('The scroll position', function() {
  beforeEach(() => {
    cy.fixture('nobt-with-16-bills').as('nobt');
  });

  it('should be on the same after navigating to bill details and back', function() {
    // Need to fix date otherwise would show different timestamps for the feed item
    cy.clock(new Date(2019, 1, 5));

    cy.server();
    cy.route({
      method: 'GET',
      url: '/nobts/' + this.nobt.id,
      status: 200,
      response: '@nobt',
    });
    cy.visit(this.nobt.id);

    cy.contains('li', 'The last bill')
      .as('lastBill')
      .should('exist')
      .scrollIntoView();

    cy.get('@lastBill').click();
    cy.contains('David paid this bill.').should('exist');
    cy.go('back');

    cy.get('@lastBill').should('be.inViewport');
  });
});
