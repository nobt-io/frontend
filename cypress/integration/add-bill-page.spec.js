/// <reference types="Cypress" />

describe('Add a bill to the nobt', function() {
  beforeEach(function() {
    cy.fixture('empty-nobt-response').as('nobt');
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
    cy.visit(this.nobt.id + '/bill');

    // Waits for the page to actually render
    cy.contains('Add a bill').should('exist');
    cy.percySnapshot('Empty Add-Bill page');
  });

  it('should set bill description', function() {
    cy.get('[data-cy=description-input]').type('My first bill');
  });

  it('should set bill amount', function() {
    cy.get('[data-cy=amount-input]').type('20');
  });

  it('should open currency conversion page if button is clicked', function() {
    cy.get('[data-cy=change-currency-button]').click();
    cy.url().should('contain', '/convert');
    cy.percySnapshot('Currency conversion page');
  });

  it('should autofill amount in currency conversion page', function() {
    cy.get('[data-cy=foreign-amount-input]').should('value', '20');
  });

  it('should not change state if currency conversion canceled', function() {
    cy.get('[data-cy=foreign-amount-input]').type('{backspace}{backspace}30');
    cy.get('[data-cy=cancel-button]').click();
    cy.get('input[data-cy=amount-input]').should('value', '20');
  });

  it('should convert amount', function() {
    cy.get('[data-cy=change-currency-button]').click();
    cy.get('.Select-placeholder')
      .click()
      .get('.Select-input')
      .find('input')
      .type('australia{enter}', { force: true });
    cy.get('input[data-cy=rate-input]').type('0.5');
    cy.get('[data-cy=accept-button]').click();
  });

  it('should show foreign amount on overview page', function() {
    cy.contains('li', '40').should('exist');
    cy.get('[data-cy=change-currency-button]').should('not.exist');
  });

  it('should allow to cancel currency conversion', function() {
    cy.get('[data-cy=reset-conversion-button]')
      .contains('clear')
      .click()
      .should('not.exist');
    cy.contains('li', '40').should('not.exist');
  });

  it('should select bill debtee', function() {
    cy.get('[data-cy=select-debtee]').click();
    cy.url().should('include', '/bill/debtee');

    cy.percySnapshot('Debtee selection page');

    cy.contains('li', 'David').click();
    cy.contains('button', 'Back').click();

    cy.url().should('include', '/bill');
  });

  it('should navigate to debtor selection', function() {
    cy.get('[data-cy=select-debtors]').click();
    cy.url().should('contain', '/debtors');
    cy.percySnapshot('Debtor selection page');
    cy.go('back');
  });

  it('should be able to submit bill', function() {
    cy.server();
    cy.route({
      method: 'POST',
      url: '/nobts/' + this.nobt.id + '/expenses',
      status: 200,
      delay: 4000,
      response: {},
    });

    cy.contains('button', 'add bill')
      .click()
      .should('be.disabled');
  });
});
