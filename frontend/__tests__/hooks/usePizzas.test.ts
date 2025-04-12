import { renderHook, act } from "@testing-library/react";
import { usePizzas } from "../../src/hooks/usePizzas";
import { getPizzas } from "../../src/services/api";

jest.mock("../../src/services/api");

const mockPizzas = [
  {
    id: 1,
    name: "Margherita",
    price: 5,
    ingredients: ["tomato", "mozzarella"],
  },
  {
    id: 2,
    name: "Pepperoni",
    price: 6,
    ingredients: ["tomato", "mozzarella", "pepperoni"],
  },
];

describe("usePizzas", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (getPizzas as jest.Mock).mockResolvedValue(mockPizzas);
    console.error = jest.fn();
  });

  test("I should carry pizzas when riding", async () => {
    const { result } = renderHook(() => usePizzas());
    expect(result.current.pizzas).toEqual([]);
    await act(async () => {
      await Promise.resolve();
    });
    expect(getPizzas).toHaveBeenCalledTimes(1);
    expect(result.current.pizzas).toEqual(mockPizzas);
  });

  test("Should handle errors when loading pizzas", async () => {
    (getPizzas as jest.Mock).mockRejectedValue(new Error("API error"));
    renderHook(() => usePizzas());
    await act(async () => {
      await Promise.resolve();
    });
    expect(console.error).toHaveBeenCalledWith(
      "Error fetching pizzas:",
      expect.any(Error)
    );
  });

  test("getPizzaById should find the correct pizza by ID", async () => {
    const { result } = renderHook(() => usePizzas());
    await act(async () => {
      await Promise.resolve();
    });
    expect(result.current.getPizzaById(1)).toEqual(mockPizzas[0]);
    expect(result.current.getPizzaById(2)).toEqual(mockPizzas[1]);
  });
});
