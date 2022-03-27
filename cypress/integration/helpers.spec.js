/// <reference types="cypress" />

describe('Helpers', () => {
  it('Wrap', () => {
    const obj = {
      nome: 'User',
      idade: 20
    }

    expect(obj).to.have.property('nome');
    cy.wrap(obj).should('have.property', 'nome');

    cy.visit('https://wcaquino.me/cypress/componentes.html');
    // cy.get('#formNome').type('funciona?')
    cy.get('#formNome').then($el => {
      cy.wrap($el).type('funciona??')
    })

    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(10)
      }, 500)
    });

    cy.get('#buttonSimple').then(() => {
      console.log('Encontrei o primeiro')
    })

    // promise.then(num => console.log(num))
    cy.wrap(promise).then(console.log) // sincronizado pelo cypress

    cy.get('#buttonList').then(() => {
      console.log('Encontrei o segundo')
    })

    cy.wrap(1).then(num => {
      return 2
    }).should('be.equal', 2) // só funciona com o then porque o should ignora o retorno
  })

  it('Its...', () => {
    let obj = {
      nome: 'User',
      idade: 20
    }

    cy.wrap(obj).should('have.property', 'nome', 'User')
    cy.wrap(obj).its('nome').should('be.equal', 'User')

    obj = {
      nome: 'User',
      idade: 20,
      endereco: {
        rua: 'brasilia'
      }
    }

    cy.wrap(obj).its('endereco').should('have.property', 'rua')
    cy.wrap(obj).its('endereco').its('rua').should('contain', 'bra')
    cy.wrap(obj).its('endereco.rua').should('contain', 'silia')

    cy.visit('https://wcaquino.me/cypress/componentes.html');
    cy.title().its('length').should('be.equal', 20)
  })

  it.only('Invoke...', () => {
    const getValue = () => 1;
    const soma = (a, b) => a + b;

    cy.wrap({getValue}).invoke('getValue').should('be.equal', 1)
    cy.wrap({soma}).invoke('soma', 2, 5).should('be.equal', 7)

    cy.visit('https://wcaquino.me/cypress/componentes.html');
    cy.get('#formNome').invoke('val', 'Texto via invoke')
    cy.window().invoke('alert', 'Dá para ver?')
    cy.get('#resultado')
      .invoke('html', '<button>hacked!</button>')
  })
});