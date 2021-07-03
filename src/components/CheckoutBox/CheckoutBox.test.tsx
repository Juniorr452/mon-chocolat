import { render, screen } from "@testing-library/react"
import CheckoutBox from "."

describe('CheckoutBox', () => {
  it("sums all prices + shipping cost", () => {
    const shipping = {
      name: 'shipping',
      price: 10
    };

    render(
      <CheckoutBox
        shipping={shipping}
        products={[{
          price: 10,
          quantity: 1
        }]}
      />
    );
 
    expect(screen.getByText('20.00', {exact: false})).toBeInTheDocument();

    render(
      <CheckoutBox
        shipping={shipping}
        products={[
          {
            price: 10,
            quantity: 1
          },
          {
            price: 20,
            quantity: 2
          }
        ]}
      />
    );

    expect(screen.getByText('60.00', {exact: false})).toBeInTheDocument();
  });

  it('shows total --.-- when there are no products in the list', () => {
    const shipping = {
      name: 'shipping',
      price: 10
    };

    render(
      <CheckoutBox
        shipping={shipping}
        products={[]}
      />
    );
 
    expect(screen.getByText('--.--', {exact: false})).toBeInTheDocument();
  });

  it('shows free shipping when the shipping cost is zero', () => {
    const shipping = {
      name: 'shipping',
      price: 0
    };

    render(
      <CheckoutBox
        shipping={shipping}
        products={[]}
      />
    );

    expect(screen.getByText('Gratuite', {exact: false})).toBeInTheDocument();
  })
})