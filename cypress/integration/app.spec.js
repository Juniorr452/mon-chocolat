import { makeServer } from '../../src/server';

describe('App', () => {
  let server

  beforeEach(() => {
    server = makeServer({ environment: "test" })
  })

  afterEach(() => {
    server.shutdown()
  })

  it('Visits the homepage', () => {
    server.createList("product", 10);
    
    cy.visit('/')
    cy.get('#products-list').find('> div').should('have.length', 10)
  })
})