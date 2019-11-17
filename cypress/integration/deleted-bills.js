/// <reference types="Cypress" />

describe('Deleted bills', function() {
  it('should show deleted bills in the feed', function() {
    // Need to fix date otherwise would show different timestamps for the feed item
    cy.clock(new Date(2019, 1, 5));
    cy.visit('/', {
      nobtFixture: 'nobt-with-deleted-bill',
    });

    cy.contains('A bill to be deleted').should('exist');
    cy.contains('A valid bill').should('exist');
    cy.document().toMatchImageSnapshot();
  });

  it('should mention the deleted date in the bills details', function() {
    cy.contains('A bill to be deleted').click();

    // We purposely don't match against the formatted date because that might be platform/browser specific
    cy.contains('Deleted on').should('exist');
    cy.document().toMatchImageSnapshot();
  });

  it('should not have a delete action', function() {
    cy.contains('Delete this bill').should('not.exist');
    cy.document().toMatchImageSnapshot();
  });
});
