import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import ProductItem from "."
import * as cartSlice from "../../features/cart/cartSlice";
import * as hooks from "../../hooks";

describe('ProductItem', () => {
  beforeAll(() => {
    jest.spyOn(hooks, 'useAppDispatch').mockReturnValue(jest.fn);
    jest.spyOn(hooks, 'useAppSelector').mockReturnValue(false);
  });

  it('shows the price', () => {
    const price = 19.99;

    render(
      <ProductItem 
        id={1}
        name="product"
        price={price}
        availableQuantity={5}
        imageUrl="/none.png"
      />
    );

    expect(screen.getByText(price, {exact: false})).toBeInTheDocument();
  })

  it('adds the product to cart when the cart button is clicked', () => {
    const product = {
      id: 1,
      name: "product",
      price: 19.99,
      availableQuantity: 5,
      imageUrl: "/none.png"
    }

    render(
      <ProductItem {...product} />
    );

    const add = jest.spyOn(cartSlice, 'add');

    fireEvent.click(screen.getByTestId('cartbutton'));
    
    expect(add).toBeCalledWith(product);
  });

  it('removes the product from cart when the cart button is clicked and the product is already in the cart', () => {
    jest.spyOn(hooks, 'useAppSelector').mockReturnValueOnce(true);

    const id = 1;
    
    render(
      <ProductItem 
        id={id}
        name="product"
        price={19.99}
        availableQuantity={5}
        imageUrl="/none.png"
      />
    );

    const remove = jest.spyOn(cartSlice, 'remove');

    fireEvent.click(screen.getByTestId('cartbutton'));
    
    expect(remove).toBeCalledWith(id);
  });

  it('shows the product is unavailable when it is out of stock', () => {
    render(
      <ProductItem 
        id={1}
        name="product"
        price={19.99}
        availableQuantity={0}
        imageUrl="/none.png"
      />
    );
    
    expect(screen.getByText('indisponible')).toBeInTheDocument();
    expect(screen.getByTestId('cartbutton')).toHaveAttribute('disabled');

    cleanup();

    render(
      <ProductItem 
        id={1}
        name="product"
        price={19.99}
        availableQuantity={1}
        imageUrl="/none.png"
      />
    );

    expect(screen.getByTestId('cartbutton')).not.toHaveAttribute('disabled');
  })
})