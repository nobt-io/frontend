/// <reference types="Cypress" />

describe('Deleted bills', function() {
  beforeEach(function() {
    cy.fixture("nobt-with-deleted-bill").as("nobt")
  });

  it('should show deleted bills in the feed', function() {
    cy.server();
    cy.route({
      method: 'GET',
      url: 'http://localhost:8080/nobts/' + this.nobt.id,
      status: 200,
      response: '@nobt',
    });

    cy.visit('http://localhost:3000/' + this.nobt.id)

    // Waits for the page to actually render
    cy.contains("A bill to be deleted").should("exist")
    cy.contains("A valid bill").should("exist")

    // The percy snapshot guarantees we are always rendering deleted bills the same way
    cy.percySnapshot("Feed with a deleted bill")
  });

  it('should mention the deleted date in the bills details', function() {
    cy.contains("A bill to be deleted").click();

    // We purposely don't match against the formatted date because that might be platform/browser specific
    cy.contains("Deleted on").should("exist");
  });

  it('should not have a delete action', function() {
    cy.contains("Delete this bill").should("not.exist");
  });
});
