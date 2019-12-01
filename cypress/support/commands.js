// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
  if (!options || !options.nobtFixture) {
    return originalFn(url, options);
  }

  return cy.fixture(options.nobtFixture).then(nobt => {
    cy.server();
    cy.route({
      method: 'GET',
      url: 'http://localhost:8080/nobts/' + nobt.id,
      status: 200,
      response: nobt,
    }).as('fetchNobt');

    originalFn(nobt.id + url, options);

    return cy.wait('@fetchNobt');
  });
});

Cypress.Commands.overwrite(
  'toMatchImageSnapshot',
  (originalFn, subject, options) => {
    cy.wait(1000); // make sure everything is rendered correctly

    cy.viewport('iphone-6+');
    originalFn(subject, { ...options, capture: 'viewport' });

    cy.wait(1000); // make sure everything is rendered correctly

    cy.viewport('macbook-15');
    return originalFn(subject, { ...options, capture: 'viewport' });
  }
);
