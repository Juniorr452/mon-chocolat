import { makeServer } from './server'

describe('Mirage Server', () => {
  let server

  beforeEach(() => {
    server = makeServer({ environment: "test" })
  })

  afterEach(() => {
    server.shutdown()
  })

  it('GET /products', async () => {
    const length = 3
    
    server.createList("product", length)

    const response = await fetch('/api/products');
    const data = await response.json();

    expect(data.products.length).toBe(length)
  })

  it('POST /checkout', async () => {
    const products = [
      {
        id: 1,
        availableQuantity: 5,
        quantityToBuy: 3,
      },
      {
        id: 2,
        availableQuantity: 7,
        quantityToBuy: 7
      },
    ];

    const expectedProducts = products.map(({id, availableQuantity, quantityToBuy}) => ({
      id,
      availableQuantity: availableQuantity - quantityToBuy
    }))

    products.forEach(({availableQuantity}) => {
      server.create("product", {
        availableQuantity
      })
    })

    await fetch('/api/checkout', {
      method: 'POST',
      body: JSON.stringify(products.map(({id, quantityToBuy}) => ({
        id,
        quantity: quantityToBuy
      })))
    });

    const response = await fetch('/api/products');
    const data = await response.json();

    expectedProducts.forEach((product, i) => {
      expect(data.products[i].availableQuantity).toEqual(product.availableQuantity)
    });
  })

  it('POST /checkout returns 400 if quantity is not available', async () => {
    const products = [
      {
        id: 1,
        availableQuantity: 5,
        quantityToBuy: 10,
      },
    ];

    products.forEach(({availableQuantity}) => {
      server.create("product", {
        availableQuantity
      })
    })

    const response = await fetch('/api/checkout', {
      method: 'POST',
      body: JSON.stringify(products.map(({id, quantityToBuy}) => ({
        id,
        quantity: quantityToBuy
      })))
    });

    expect(response.status).toBe(400);
  })
})