import { fireEvent, render, screen } from "@testing-library/react";
import CartItem from ".";
import * as cartSlice from "../../features/cart/cartSlice";
import * as hooks from "../../hooks";

describe('CartItem', () => {
  beforeAll(() => {
    jest.spyOn(hooks, 'useAppDispatch').mockReturnValue(jest.fn);
  });

  it('displays the total price', () => {
    let price = 10;
    let quantity = 2;

    render(
      <CartItem
        id={1}
        name="product"
        price={price}
        quantity={quantity}
        availableQuantity={10}
        imageUrl=""
      />
    );

    expect(screen.getByText(price * quantity, {exact: false})).toBeInTheDocument();

    price = 40;
    quantity = 3;

    render(
      <CartItem
        id={1}
        name="product"
        price={price}
        quantity={quantity}
        availableQuantity={10}
        imageUrl=""
      />
    );

    expect(screen.getByText(price * quantity, {exact: false})).toBeInTheDocument();
  });

  it('removes itself when the remove button is clicked', () => {    
    const remove = jest.spyOn(cartSlice, 'remove');

    const id = 1;

    render(
      <CartItem
        id={id}
        name="product"
        price={10}
        quantity={2}
        availableQuantity={3}
        imageUrl=""
      />
    );

    fireEvent.click(screen.getByRole('button'))

    expect(remove).toHaveBeenCalledWith(id)
  })

  it('changes the quantity when the selected value changes', () => {
    const changeQuantity = jest.spyOn(cartSlice, 'changeQuantity');

    const id = 1;
    const quantity = 3;

    render(
      <CartItem
        id={id}
        name="product"
        price={10}
        quantity={2}
        availableQuantity={3}
        imageUrl=""
      />
    );

    fireEvent.change(screen.getByTestId('select'), {target: {value: quantity}})

    expect(changeQuantity).toHaveBeenCalledWith({
      id: id,
      quantity: quantity
    })
  })
});