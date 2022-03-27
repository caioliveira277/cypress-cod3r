/// <reference types="cypress" />

describe('Work with iframe', () => {
    it('IFrame', () => {
      cy.visit('https://wcaquino.me/cypress/componentes.html');
      cy.get('#frame1').then((iframe) => {
        const body = iframe.contents().find('body')
        cy.wrap(body).find('#tfield')
          .type('funciona?')
          .should('have.value', 'funciona?')
          
        cy.on('window:alert', mensagem => {
          expect(mensagem).to.be.equal('Alert Simples')
        })
        // cy.wrap(body).find('#otherButton').click()
      })

    })
    it('IFrame 2', () => {
      cy.visit('https://wcaquino.me/cypress/frame.html');
      cy.get('#otherButton').click()

      cy.on('window:alert', mensagem => {
        expect(mensagem).to.be.equal('Click OK!')
      })
    })
})