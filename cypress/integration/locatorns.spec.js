/// <reference types="cypress" />

describe('Work with basic elements', () => {
  before(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html');
  });

  beforeEach(() => {
    cy.reload();
  })

  it('using jquery selector', () => {
    cy.get(':nth-child(2) > :nth-child(1) > :nth-child(3) > input')
    cy.get('table#tabelaUsuarios tbody > tr:eq(0) td:nth-child(3) > input').click()
    cy.get('[onClick*=\'Francisco\']').click()
  })

  it.only('using xpath', () => {
    cy.xpath('//input')
    cy.xpath('//input[contains(@onclick, \'Francisco\')]')
    cy.xpath('//table[@id="tabelaUsuarios"]//td[contains(., "Francisco")]/..//input[@type="text"]')
    
  })
})