/// <reference types="Cypress" />

describe('Add a bill to the nobt', function() {
  it('should navigate to add bill page', function() {
    cy.visit('/bill', {
      nobtFixture: 'empty-nobt-response',
    });

    cy.document().toMatchImageSnapshot();
  });

  it('should set bill description', function() {
    cy.get('[data-cy=description-input]').type('My first bill');
    cy.document().toMatchImageSnapshot();
  });

  it('should set bill amount', function() {
    cy.get('[data-cy=amount-input]').type('20');
    cy.document().toMatchImageSnapshot();
  });

  it('should open currency conversion page if button is clicked', function() {
    cy.get('[data-cy=change-currency-button]').click();
    cy.url().should('contain', '/convert');
    cy.document().toMatchImageSnapshot();
  });

  it('should autofill amount in currency conversion page', function() {
    cy.get('[data-cy=foreign-amount-input]').should('value', '20');
    cy.document().toMatchImageSnapshot();
  });

  it('should not change state if currency conversion canceled', function() {
    cy.get('[data-cy=foreign-amount-input]').type('{backspace}{backspace}30');
    cy.get('[data-cy=cancel-button]').click();
    cy.get('input[data-cy=amount-input]').should('value', '20');
    cy.document().toMatchImageSnapshot();
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
    cy.document().toMatchImageSnapshot();
  });

  it('should show foreign amount on overview page', function() {
    cy.contains('li', '40').should('exist');
    cy.get('[data-cy=change-currency-button]').should('not.exist');
    cy.document().toMatchImageSnapshot();
  });

  it('should allow to cancel currency conversion', function() {
    cy.get('[data-cy=reset-conversion-button]')
      .contains('clear')
      .click()
      .should('not.exist');
    cy.contains('li', '40').should('not.exist');
    cy.document().toMatchImageSnapshot();
  });

  it('should select bill debtee', function() {
    cy.get('[data-cy=select-debtee]').click();
    cy.url().should('include', '/bill/debtee');

    cy.document().toMatchImageSnapshot();

    cy.contains('li', 'David').click();
    cy.contains('button', 'Back').click();

    cy.url().should('include', '/bill');
  });

  it('should navigate to debtor selection', function() {
    cy.get('[data-cy=select-debtors]').click();
    cy.url().should('contain', '/debtors');
    cy.document().toMatchImageSnapshot();
    cy.go('back');
  });

  it('should be able to submit bill', function() {
    cy.fixture('empty-nobt-response').then(nobt => {
      cy.server();
      cy.route({
        method: 'POST',
        url: '/nobts/' + nobt.id + '/expenses',
        status: 200,
        delay: 4000,
        response: {},
      });

      cy.contains('button', 'add bill')
        .click()
        .should('be.disabled');
    });
  });
});
