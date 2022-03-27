/// <reference types="cypress" />

describe('Work with basic elements', () => {
    before(() => {
      cy.visit('https://wcaquino.me/cypress/componentes.html');
    });
  
    beforeEach(() => {
      cy.reload();
    })

    it('Alert', () => {
        // cy.get('#alert').click();
        // cy.on('window:alert', mensagem => {
        //     expect(mensagem).to.be.equal('Alert Simples')
        // })
        cy.clickAlert('#alert', 'Alert Simples') // modo usando commands
    })

    it('Alert com mock', () => {
        const stub = cy.stub().as('alerta')
        cy.on('window:alert', stub);
        cy.get('#alert').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Alert Simples')
        });

    })

    it('Confirm', () => {
        cy.on('window:confirm', mensagem => {
            expect(mensagem).to.be.equal('Confirm Simples')
        })
        cy.on('window:alert', mensagem => {
            expect(mensagem).to.be.equal('Confirmado')
        })
        
        cy.get('#confirm').click();
    })

    it('Deny', () => {
        cy.on('window:confirm', mensagem => {
            expect(mensagem).to.be.equal('Confirm Simples')
            return false
        })
        cy.on('window:alert', mensagem => {
            expect(mensagem).to.be.equal('Negado')
        })
        
        cy.get('#confirm').click();
    })


    it('Prompt', () => {
        cy.window().then(win => {
            cy.stub(win, 'prompt').returns('42')
        })
        cy.on('window:confirm', mensagem => {
            expect(mensagem).to.be.equal('Era 42?')
        })
        cy.on('window:alert', mensagem => {
            expect(mensagem).to.be.equal(':D')
        })    
        cy.get('#prompt').click();
    })

    it.only('Validando mensagens', () => {
        const stub = cy.stub().as('alerta')
        cy.on('window:alert', stub);
        cy.get('#formCadastrar').click()
            .then(() => {
                expect(stub.getCall(0)).to.be.calledWith('Nome eh obrigatorio')           
            })

        cy.get('#formNome').type('Amanda')
        cy.get('#formCadastrar').click()
            .then(() => {
                expect(stub.getCall(1)).to.be.calledWith('Sobrenome eh obrigatorio')            
            })
        
        cy.get('[data-cy=dataSobrenome]').type('Cleto')
        cy.get('#formCadastrar').click()
            .then(() => {
                expect(stub.getCall(2)).to.be.calledWith('Sexo eh obrigatorio')            
            })

        cy.get('#formSexoMasc').click()
        cy.get('#formCadastrar').click()

        cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')
    })
})
  