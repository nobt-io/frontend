/// <reference types="Cypress" />

describe('The wizard for creating a new nobt', function() {
  it('should go to wizard from landing page', function() {
    cy.visit('http://localhost:3000');

    cy.get("[data-cy=start-button]").click();

    cy.url().should('include', '/create/name');
  });

  it('should complete first page', function() {
    cy.get('[data-cy=nobt-name-input]')
      .type('Cypress UI Test');

    cy.get("[data-cy=continue-button]").click();

    // TODO: Test different languages here

    cy.url().should('include', '/create/members');
  });

  it('should add member with enter key', function() {
    cy.get('[data-cy=name-input]').type('Thomas{enter}');
    cy.contains('li', 'Thomas').should('exist');
  });

  it('should add member when clicking on button', function() {
    cy.get('[data-cy=name-input]').type('David');
    cy.get('[data-cy=add-person-button]').click();
    cy.contains('li', 'David').should('exist');
  });

  it('should change button from create nobt if user starts typing', function() {
    cy.get('[data-cy=create-nobt-button]')
      .should('exist');

    cy.get('[data-cy=name-input]').type('Matthias');

    cy.get('[data-cy=create-nobt-button]').should('not.exist');
    cy.get('[data-cy=add-person-button]')
      .should('exist')
      .click();
  });

  it('should not allow to add person with same name', function() {
    cy.get('[data-cy=name-input]').type('Matthias');

    cy.get('[data-cy=add-person-button]').should('be.disabled');
    // TODO: Test error message here?

    cy.get('[data-cy=name-input]').clear();
  });

  it('should remove person from list', function() {
    cy.contains('li', 'Matthias')
      .find("[data-cy=remove-person-button]")
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

    cy.get('[data-cy=create-nobt-button]').click();
    cy.wait('@createNobt');
    cy.url().should('include', '/create/done');
  });
});
