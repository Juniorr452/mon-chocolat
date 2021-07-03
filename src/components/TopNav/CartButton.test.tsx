import { render, screen } from "@testing-library/react";
import CartButton from "./CartButton";
import * as hooks from "../../hooks";

describe("CartButton", () => {
  it("does not show quantity when there are no items in the cart", () => {
    jest.spyOn(hooks, 'useAppSelector').mockReturnValueOnce(0);

    render(<CartButton />);
    expect(screen.queryByText("0")).toBeNull()
  });

  it("shows the quantity when there are items in the cart", () => {
    jest.spyOn(hooks, 'useAppSelector').mockReturnValueOnce(1);

    render(<CartButton />);
    expect(screen.getByText("1")).toBeInTheDocument();

    jest.spyOn(hooks, 'useAppSelector').mockReturnValueOnce(9);

    render(<CartButton />);
    expect(screen.getByText("9")).toBeInTheDocument();
  });

  it("shows '9+' when there are more than 9 items in the cart", () => {
    jest.spyOn(hooks, 'useAppSelector').mockReturnValueOnce(10);

    render(<CartButton />);
    expect(screen.getByText("9+")).toBeInTheDocument();
  });
});