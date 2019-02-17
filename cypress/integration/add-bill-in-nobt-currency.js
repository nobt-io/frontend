/// <reference types="Cypress" />

describe('Add bill in nobt currency', function() {
  beforeEach(() => {
    cy.server();
    cy.fixture('empty-nobt-response').as('createdNobt');
  });

  it('should show empty overview screen', function() {
    cy.route({
      method: 'GET',
      url: 'http://localhost:8080/nobts/' + this.createdNobt.id,
      status: 200,
      delay: 500,
      response: 'fixture:empty-nobt-response',
    });

    cy.visit('http://localhost:3000/' + this.createdNobt.id);
    cy.contains('No bills found.').should('exist');
  });

  it('should have a menu to create new items', function() {
    cy.contains('button', 'add').click();
    cy.contains('button', 'payment')
      .should('exist')
      .should('be.disabled');

    cy.contains('button', 'receipt')
      .should('exist')
      .should('be.enabled');
  });

  it('should navigate to bill wizard', function() {
    cy.contains('button', 'receipt').click();
    cy.url().should('include', '/bill');
  });

  it('should add bill with nobt currency', function() {
    cy.get('input[name=description]').type('My first bill');
    cy.get('input[name=amount]').type('20');

    cy.contains('Select a Debtee').click();
    cy.url().should('include', '/bill/debtee');

    cy.contains('li', 'David').click();
    cy.contains('button', 'Back').click();

    cy.url().should('include', '/bill');

    cy.route({
      method: 'POST',
      url: '/nobts/' + this.createdNobt.id + '/expenses',
      status: 200,
      delay: 500,
      response: {},
    });

    cy.route({
      method: 'GET',
      url: '/nobts/' + this.createdNobt.id,
      status: 200,
      delay: 500,
      response: 'fixture:nobt-with-one-bill',
    });

    cy.contains('button', 'add bill').click();

    cy.contains('No bills found.').should('not.exist');
    cy.contains('li', "David paid 'My first bill'").should('exist');
    cy.contains('button', 'Show balances').should('exist');
  });

  it('should show correct balances', function() {
    cy.contains('button', 'Show balances').click();
    cy.url().should('contain', '/balances');

    cy.contains('li', 'Thomas')
      .contains('-€10.00')
      .should('exist');
    cy.contains('li', 'David')
      .contains('€10.00')
      .should('exist');
  });

  it('should show individual debts', function() {
    cy.contains('li', 'Thomas').click();

    cy.url().should('contain', '/Thomas');
    cy.contains('li', 'David')
      .contains('-€10.00')
      .should('exist');

    cy.go('back');

    cy.contains('li', 'David').click();

    cy.url().should('contain', '/David');
    cy.contains('li', 'Thomas')
      .contains('€10.00')
      .should('exist');

    cy.go('back');
    cy.go('back');
  });

  it('should navigate to bill detail page', function() {
    cy.contains('li', 'My first bill').click();

    cy.url().should('contain', '/1');
  });

  it('should not say that this bill was converted because it is not', function() {
    cy.contains('li', 'Converted from').should('not.exist');
  });
});
