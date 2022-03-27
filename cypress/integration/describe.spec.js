/// <reference types="cypress" />

it('A external test...' , () => {

});

describe('Should group testes...', () => {
  describe('Should group more specific tests...', () => {
    it.skip('A external test...' , () => {
    
    });
  })
  it.only('A external test...' , () => {
  
  });
});

describe.skip('Should group testes...', () => {
  describe('Should group more specific tests...', () => {
    it('A external test...' , () => {
    
    });
  })
  it('A external test...' , () => {
  
  });
});