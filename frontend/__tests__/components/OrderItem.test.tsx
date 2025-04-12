import React from "react";
import { render, screen } from "@testing-library/react";
import { OrderItem } from "../../src/components/OrderItem";
import { Order } from "../../src/types";

describe("<OrderItem />", () => {
    const mockOrder: Order = {
        id: 101,
        items: [
            {
                pizzaId: 1,
                quantity: 2,
                pizza: {
                    id: 1,
                    name: "Margherita",
                    price: 5,
                    ingredients: ["tomato", "mozzarella"],

                },
            }
        ],
    };

    test("should display the order number correctly", () => {
        render(<OrderItem order={mockOrder} />);
        expect(screen.getByText("Order: N# 101")).toBeInTheDocument();
    });

    test("should render all pizza items with their quantities", () => {
        render(<OrderItem order={mockOrder} />);
        expect(screen.getByText(`Pizza ${mockOrder.items[0].pizza.name}`)).toBeInTheDocument();
        expect(screen.getByText(`Quantity: ${mockOrder.items[0].quantity}`)).toBeInTheDocument();
    });
});
