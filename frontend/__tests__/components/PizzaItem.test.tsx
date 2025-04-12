// PizzaItem.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PizzaItem } from "../../src/components/PizzaItem";
import { Pizza } from "../../src/types";

const mockAddOrder = jest.fn();

jest.mock("../../src/store/orderStore", () => ({
    orderStore: () => ({
        addOrder: mockAddOrder,
    }),
}));

describe("<PizzaItem />", () => {
    const mockPizza: Pizza = {
        id: 1,
        name: "Margherita",
        price: 5,
        ingredients: ["tomato", "mozzarella"]
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("should render the pizza name, price, and ingredients correctly", () => {
        render(<PizzaItem pizza={mockPizza} />);

        expect(screen.getByText(mockPizza.name)).toBeInTheDocument();
        expect(screen.getByText(`Price: $${mockPizza.price.toFixed(2)}`)).toBeInTheDocument();
        expect(screen.getByText("Ingredients")).toBeInTheDocument();

        for (const ingredient of mockPizza.ingredients) {
            expect(screen.getByText(ingredient)).toBeInTheDocument();
        }
    });

    test("should call addOrder with correct pizza ID when 'Add to cart' is clicked", async () => {
        const user = userEvent.setup();
        render(<PizzaItem pizza={mockPizza} />);
        const button = screen.getByRole("button", { name: /add to cart/i });
        await user.click(button);
        expect(mockAddOrder).toHaveBeenCalledTimes(1);
        expect(mockAddOrder).toHaveBeenCalledWith(mockPizza.id);
    });
});
