/// <reference types="cypress" />

import loc from '../support/locators';

describe('Tests for account', () => {
  before(() => {
    cy.visit('https://barrigareact.wcaquino.me');

    cy.fixture('login.json').then((login) => {
      cy.get(loc.login.EMAIL).type(login.email);
      cy.get(loc.login.PASSWORD).type(login.password);

      cy.get(loc.login.BTN_LOGIN).click();

      cy.get('[data-test="menu-settings"]').click()
      cy.wait(300)
      cy.get('[href="/contas"]').click();
    });
  });

  beforeEach(() => {
    cy.get('.toast-close-button').click({ multiple: true })
  })

  it('Should insert a new account', () => {
    const account_title = 'New account';

    cy.get('[data-test="nome"]').type(account_title)
    cy.get('.btn').click();
    cy.get('#toast-container .toast-success')
      .should('contain.text', 'inserida com sucesso!')

    cy.get(`td:contains(${account_title})`)
      .closest('tr')
      .find('.fa-trash-alt')
      .click()
  });

  it('Should change a account', () => {
    const account_title = 'Account to change';
    const account_title_changed = 'Account changed';

    cy.get('[data-test="nome"]').type(account_title)
    cy.get('.btn').click();

    cy.get(`td:contains(${account_title})`)
      .closest('tr')
      .find('.fa-edit')
      .click()

    cy.get('[data-test="nome"]')
      .clear()
      .type(account_title_changed);
    cy.get('.btn').click();
    
    cy.get('#toast-container .toast-success')
      .should('contain.text', 'atualizada com sucesso!')
    
    cy.get(`td:contains(${account_title_changed})`)
      .closest('tr')
      .find('.fa-trash-alt')
      .click()
  });
  it('Should show an error when a duplicate account is provided', () => {
    const account_title = 'Duplicate account';

    cy.get('[data-test="nome"]').type(account_title)
    cy.get('.btn').click();

    cy.wait(300)

    cy.get('[data-test="nome"]').type(account_title)
    cy.get('.btn').click();

    cy.get('#toast-container .toast-error')
      .should('contain.text', 'Error')
    
    cy.get(`td:contains(${account_title})`)
      .closest('tr')
      .find('.fa-trash-alt')
      .click()
    cy.get('[data-test="nome"]').clear();
  });


});