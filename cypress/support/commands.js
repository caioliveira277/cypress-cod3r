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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import loc from "./locators";

Cypress.Commands.add("login", (user, password) => {
  cy.visit("https://barrigareact.wcaquino.me");

  cy.get(loc.login.EMAIL).type(user);
  cy.get(loc.login.PASSWORD).type(password);
  cy.get(loc.login.BTN_LOGIN).click();
});

Cypress.Commands.add("clickAlert", (locator, message) => {
  cy.get(locator).click();
  cy.on("window:alert", (mensagem) => {
    expect(mensagem).to.be.equal(message);
  });
});

Cypress.Commands.add("getToken", (user, password) => {
  cy.request({
    method: "POST",
    url: "/signin",
    body: {
      email: user,
      redirecionar: false,
      senha: password,
    },
  })
    .its("body.token")
    .should("not.be.empty")
    .then((token) => {
      Cypress.env("token", token);
      return token;
    });
});

Cypress.Commands.add("resetRest", (token) => {
  cy.request({
    method: "GET",
    url: "/reset",
    headers: {
      Authorization: `JWT ${token}`,
    },
  })
    .its("status")
    .should("be.equal", 200);
});

Cypress.Commands.overwrite("request", (originalFn, ...options) => {
  if (options.length === 1) {
    if (Cypress.env("token")) {
      options[0].headers = {
        ...options[0].headers,
        Authorization: `JWT ${Cypress.env("token")}`,
      };
    }
  }

  return originalFn(...options);
});
