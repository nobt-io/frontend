/// <reference types="Cypress" />

describe('The wizard for creating a new nobt', function() {
  it('should go to wizard from landing page', function() {
    cy.visit('http://localhost:3000');

    cy.contains('Get started - Create a Nobt').click();

    cy.url().should('include', '/create/name');
  });

  it('should complete first page', function() {
    cy.get('input[data-cy=nobt-name-input]')
      .type('Cypress UI Test');

    cy.contains('Continue').click();

    // TODO: Test different languages here

    cy.url().should('include', '/create/members');
  });

  it('should add member with enter key', function() {
    cy.get('input').type('Thomas{enter}');
    cy.contains('li', 'Thomas').should('exist');
  });

  it('should add member when clicking on button', function() {
    cy.get('input').type('David');
    cy.contains('button', 'David').click();
    cy.contains('li', 'David').should('exist');
  });

  it('should change button from create nobt if user starts typing', function() {
    cy.contains('button', 'Create Nobt')
      .should('exist');

    cy.get('input').type('Matthias');

    cy.contains('button', 'Create Nobt').should('not.exist');
    cy.contains('button', 'Matthias')
      .should('exist')
      .click();
  });

  it('should not allow to add person with same name', function() {
    cy.get('input').type('Matthias');

    cy.contains('button', 'Matthias').should('be.disabled');
    // TODO: Test error message here?

    cy.get('input').clear();
  });

  it('should remove person from list', function() {
    cy.contains('li', 'Matthias')
      .contains('button', 'clear')
      .click();
    cy.contains('li', 'Matthias').should('not.exist');
  });

  it('should create nobt when clicking on button', async function() {
    cy.server();

    cy.route({
      method: 'POST',
      url: 'http://localhost:8080/nobts',
      status: 201,
      delay: 500,
      response: 'fixture:empty-nobt-response',
    }).as('createNobt');

    cy.contains('button', 'Create Nobt').click();
    cy.wait('@createNobt');
    cy.url().should('include', '/create/done');
  });
});
