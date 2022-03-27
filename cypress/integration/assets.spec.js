/// <reference types="cypress" />

it('Equality', () => {
  const a = 1;

  expect(a).equal(1);
  expect(1, 'deveria ser 1').equal(1);
  expect(a).not.be.equal(2);
})

it('Truthy', () => {
  const a = true;
  const b = null;
  let c;

  expect(a).to.be.true;

  expect(true).to.be.true;
  expect(b).to.be.null;
  expect(b).not.be.true;

  expect(c).to.be.undefined;
});

it('Object Equality', () => {
  const obj = {
    a: 1,
    b: 2
  };

  expect(obj).equal(obj);
  expect(obj).equals(obj);
  expect(obj).eq(obj);
  expect(obj).to.be.equal(obj);
  expect(obj).to.be.deep.equal({a: 1, b: 2});
  expect(obj).eql({a: 1, b: 2});
  expect(obj).include({ a: 1 }); // verifica se pelo menos tem essa prop com esse valor
  expect(obj).to.have.property('b'); // verifica se tem a propriedade
  expect(obj).to.have.property('b', 2); // verifica se tem a propriedade com o valor

  expect(obj).to.not.be.empty;
  expect({}).to.be.empty;
});

it('Arrays', () => {
    const arr = [1, 2, 3];

    expect(arr).to.have.members([1, 2, 3]);
    expect(arr).to.include.members([1, 3]);
    expect(arr).to.not.be.empty;
    expect([]).to.be.empty;
});

it('Types' , () => {
  const num = 1;
  const str = 'string';

  expect(num).to.be.a('number');
  expect(str).to.be.a('string');
  expect({}).to.be.an('object');
  expect([]).to.be.an('array');
});

it('String', () => {
    const str = 'String de teste';

    expect(str).to.be.equal('String de teste');
    expect(str).to.have.length(15);
    expect(str).to.contain('de');
    expect(str).to.match(/^String/);
    expect(str).to.match(/teste$/);
    expect(str).to.match(/.{15}/);
    expect(str).to.match(/\w+/);
    expect(str).to.match(/\D+/);
});

it('Numbers', () => {
  const number = 4;
  const floatNumber = 5.2123;

  expect(number).to.be.equal(4);
  expect(number).to.be.above(3);
  expect(number).to.be.below(5);
  
  expect(floatNumber).to.be.equal(5.2123);
  expect(floatNumber).to.be.closeTo(5.2, 0.1);
  expect(floatNumber).to.be.above(5);
});