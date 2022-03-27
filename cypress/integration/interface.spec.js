/// <reference types="cypress" />

describe("Dinamic tests", () => {
  after(() => {
    cy.clearLocalStorage();
  });

  before(() => {
    cy.visit("https://barrigareact.wcaquino.me");
    cy.intercept(
      {
        method: "POST",
        url: "/signin",
      },
      {
        id: 1000,
        nome: "Usuario falso",
        token: "Uma string muito grande",
      }
    ).as("signin");

    cy.intercept(
      {
        method: "GET",
        url: "/saldo",
      },
      [
        {
          conta_id: 999,
          conta: "Carteira",
          saldo: "100.00",
        },
        {
          conta_id: 9999,
          conta: "Banco",
          saldo: "10000000.00",
        },
      ]
    ).as("saldo");

    cy.login("dsa@321", "dsads");
  });

  beforeEach(() => {});

  it.only("te", () => {});
});
