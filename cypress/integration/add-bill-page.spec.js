/// <reference types="Cypress" />

describe('Add a bill to the nobt', function() {
  beforeEach(function() {
    cy.fixture("empty-nobt-response").as("nobt")
  });

  it('should navigate to add bill page', function() {
    cy.server();
    cy.route({
      method: 'GET',
      url: 'http://localhost:8080/nobts/' + this.nobt.id,
      status: 200,
      delay: 500,
      response: '@nobt',
    });
    cy.visit(this.nobt.id + "/bill")
  });

  it('should set bill description', function() {
    cy.get('input[data-cy=description-input]').type('My first bill');
  });

  it('should set bill amount', function() {
    cy.get('input[data-cy=amount-input]').type('20');
  });

  it('should open currency conversion page if button is clicked', function() {
    cy.contains("button", "Change currency").click()
    cy.url().should("contain", "/convert")
  });

  it('should autofill amount in currency conversion page', function() {
    cy.get("input[data-cy=foreign-amount-input]").should("value", "20")
  });

  it('should not change state if currency conversion canceled', function() {
    cy.get("input[data-cy=foreign-amount-input]").type("{backspace}{backspace}30")
    cy.contains("button", "Cancel").click()
    cy.get('input[data-cy=amount-input]').should("value", '20');
  });

  it('should convert amount', function() {
    cy.contains("button", "Change currency").click()
    cy.get(".Select-placeholder").click().get(".Select-input").find("input").type("australia{enter}", {force: true})
    cy.get('input[data-cy=rate-input]').type( '0.5');
    cy.contains("button", "Accept").click()
  });

  it('should show foreign amount on overview page', function() {
    cy.contains("li", "40").should("exist")
    cy.contains("button", "Change currency").should("not.exist")
  });

  it('should allow to cancel currency conversion', function() {
    cy.contains("li", "40").as("foreignAmount").contains("clear").click()
    cy.contains("li", "40").should("not.exist")
  });

  it('should select bill debtee', function() {
    cy.contains('Select a Debtee').click();
    cy.url().should('include', '/bill/debtee');

    cy.contains('li', 'David').click();
    cy.contains('button', 'Back').click();

    cy.url().should('include', '/bill');
  });

  it('should navigate to debtor selection', function() {
    cy.contains("2 persons are involved").click()
    cy.url().should("contain", "/debtors")
    cy.go("back")
  });

  it('should be able to submit bill', function() {

    cy.server();
    cy.route({
      method: 'POST',
      url: '/nobts/' + this.nobt.id + '/expenses',
      status: 200,
      delay: 500,
      response: {},
    });

    cy.contains('button', 'add bill').click();
  });
});
