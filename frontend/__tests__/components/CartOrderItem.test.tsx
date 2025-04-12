import React from 'react'
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CartOrderItem } from "../../src/components/CartOrderItem";
import { OrderCart, Pizza } from "../../src/types";

describe("<CartOrderItem />", () => {
  const mockPizza: Pizza = {
    id: 1,
    name: "Margherita",
    price: 5,
    ingredients: ["tomato", "mozzarella"],
  };

  const mockOrder: OrderCart = {
    pizzaId: 1,
    quantity: 2,
  };

  const mockHandlers = {
    onRemove: jest.fn(),
    onQuantityChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should display the pizza information correctly", () => {
    render(
      <CartOrderItem order={mockOrder} pizza={mockPizza} {...mockHandlers} />
    );

    expect(screen.getByText(mockPizza.name)).toBeInTheDocument();
    expect(screen.getByText(`$${mockPizza.price.toFixed(2)} c/u`)).toBeInTheDocument();
  });

  test("should increase and decrease quantity when buttons are clicked", async () => {
    const user = userEvent.setup();
    render(
      <CartOrderItem order={mockOrder} pizza={mockPizza} {...mockHandlers} />
    );

    await user.click(screen.getByRole("button", { name: "+" }));
    expect(mockHandlers.onQuantityChange).toHaveBeenCalledWith(3);

    await user.click(screen.getByRole("button", { name: "-" }));
    expect(mockHandlers.onQuantityChange).toHaveBeenCalledWith(1);
  });

  test("deletes the item when the X button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <CartOrderItem order={mockOrder} pizza={mockPizza} {...mockHandlers} />
    );

    await user.click(screen.getByRole("button", { name: "Eliminar" }));
    expect(mockHandlers.onRemove).toHaveBeenCalledTimes(1);
  });
});
