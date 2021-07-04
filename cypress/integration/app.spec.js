import { makeServer } from '../../src/server'

describe('App', () => {
  let server

  beforeEach(() => {
    server = makeServer({ environment: "test" })
  })

  afterEach(() => {
    server.shutdown()
  })

  it('lists all products in the homepage', () => {
    const length = 10
    server.createList("product", length)
    
    cy.visit('/')

    cy.get('[data-testid="products-list"]').find('> div').should('have.length', length)
  })

  it('lists products added to the cart in the cart page', () => {
    const length = 3
    server.createList("product", length)

    cy.visit('/')

    cy.get('[data-testid=products-list]').find('> div').each($product => {
      cy.wrap($product).find('button').click()
    })

    cy.get('[data-testid=cart-link]').click()

    cy.get('[data-testid=cart-list]').find('> div').should('have.length', length)
  })

  it('buys a product', () => {
    server.create("product", {
      availableQuantity: 1
    });

    cy.visit('/')
    cy.get('[data-testid=products-list]').find('> div').find('button').click()
    cy.get('[data-testid=cart-link]').click()
    cy.get('button[type=submit]').click()
    cy.get('[data-testid=home-link]').click()

    cy.get('[data-testid=products-list]').find('> div').contains('indisponible')
  })
})