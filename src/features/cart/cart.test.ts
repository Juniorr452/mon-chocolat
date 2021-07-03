import { cartReducer, add, remove, clear, changeQuantity } from "./cartSlice"

describe('Cart', () => {
  it('adds a new item with quantity being equal as 1', () => {
    const previousState = {
      products: {}
    };

    const newState = cartReducer(previousState, add({
      id: 1,
      name: 'chocolat',
      price: 10,
      availableQuantity: 5
    }));

    expect(newState.products[1]).toEqual(
      expect.objectContaining({quantity: 1})
    )
  });

  it('adds the quantity to an already existing item', () => {
    const previousState = {
      products: {
        1: {
          id: 1,
          name: 'chocolat',
          price: 10,
          quantity: 1,
          availableQuantity: 5
        }
      }
    };

    const newState = cartReducer(previousState, add({
      id: 1,
      name: 'chocolat',
      price: 10,
      availableQuantity: 5
    }));

    expect(newState.products).toEqual({
      1: {
        id: 1,
        name: 'chocolat',
        price: 10,
        quantity: 2,
        availableQuantity: 5
      }
    });
  });

  it('changes the quantity of an item', () => {
    const previousState = {
      products: {
        1: {
          id: 1,
          name: 'chocolat',
          price: 10,
          quantity: 1,
          availableQuantity: 5
        }
      }
    };

    const newState = cartReducer(previousState, changeQuantity({
      id: 1,
      quantity: 4
    }));

    expect(newState.products[1]).toEqual({
      id: 1,
      name: 'chocolat',
      price: 10,
      quantity: 4,
      availableQuantity: 5
    })
  });

  it('removes an item from the cart', () => {
    const previousState = {
      products: {
        1: {
          id: 1,
          name: 'chocolat',
          price: 10,
          quantity: 2,
          availableQuantity: 5
        },
        2: {
          id: 2,
          name: 'chocolat',
          price: 10,
          quantity: 2,
          availableQuantity: 5
        }
      }
    };

    const newState = cartReducer(previousState, remove(1));

    expect(newState.products).toEqual({
      2: {
        id: 2,
        name: 'chocolat',
        price: 10,
        quantity: 2,
        availableQuantity: 5
      },
    })
  });

  it('clears the cart', () => {
    const previousState = {
      products: {
        1: {
          id: 1,
          name: 'chocolat',
          price: 10,
          quantity: 2,
          availableQuantity: 5
        },
        2: {
          id: 2,
          name: 'chocolat',
          price: 10,
          quantity: 2,
          availableQuantity: 5
        }
      }
    };

    const newState = cartReducer(previousState, clear());

    expect(newState.products).toEqual({});
  });
})