/// <reference types="cypress" />

describe("Dinamic tests", () => {
  before(() => {
    cy.getToken("cc@cc.co", "123123");
  });

  beforeEach(() => {
    cy.resetRest();
  });

  it("Should created an account", () => {
    cy.request({
      method: "POST",
      url: "/contas",
      body: {
        nome: "Test via request",
      },
    }).as("response");

    cy.get("@response").then((res) => {
      expect(res.status).to.be.equal(201);
      expect(res.body).to.have.property("id");
      expect(res.body).to.have.property("nome", "Test via request");
    });
  });
  it("Should update an account", () => {
    cy.request({
      method: "GET",
      url: "/contas/",
      qs: {
        nome: "Conta para alterar",
      },
    }).then((res) => {
      cy.request({
        method: "PUT",
        url: `/contas/${res.body[0].id}`,
        body: {
          nome: "Test via request",
        },
      }).as("response");
    });

    cy.get("@response").then((res) => {
      expect(res.status).to.be.equal(200);
      expect(res.body).to.have.property("id");
      expect(res.body).to.have.property("nome", "Test via request");
    });
  });
  it("Should update an account", () => {
    cy.request({
      method: "POST",
      url: "/contas",
      body: {
        nome: "Conta mesmo nome",
      },
      failOnStatusCode: false,
    }).as("response");

    cy.get("@response").then((res) => {
      expect(res.status).to.be.equal(400);
      expect(res.body.error).to.be.equal("Já existe uma conta com esse nome!");
    });
  });
});
