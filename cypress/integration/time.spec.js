/// <reference types="cypress" />

describe('Dinamic tests', () => {
  before(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html');
  });

  beforeEach(() => {
    cy.reload();
  })

  it('Going back to the past', () => {
    
    // cy.clock();
    // cy.get('#resultado > span').should('contain', '31/12/1969')
    
    const dt = new Date(2012, 3, 10, 15, 23, 50)
    cy.clock(dt.getTime())
    
    cy.get('#buttonNow').click()
    cy.get('#resultado > span').should('contain', '10/04/2012')
  })

  it.only('Goes to the future', () => {
    cy.get('#buttonTimePassed').click()
    // cy.get('#resultado > span').should('contain', '16478')
    cy.get('#resultado > span').then($el => {
      const val = Number($el.text());
      expect(val).be.gt(1647894128486)
    })


    cy.clock()
    cy.get('#buttonTimePassed').click()
    cy.get('#resultado > span').then($el => {
      const val = Number($el.text());
      expect(val).be.lte(0)
    })

    cy.wait(1000)
    cy.get('#buttonTimePassed').click()
    cy.get('#resultado > span').then($el => {
      const val = Number($el.text());
      expect(val).be.lte(1000)
    })

    cy.tick(4000)
    cy.get('#buttonTimePassed').click()
    cy.get('#resultado > span').then($el => {
      const val = Number($el.text());
      expect(val).be.gte(4000)
    })
  })
})