import { renderHook, act } from "@testing-library/react";
import { useOrders } from "../../src/hooks/useOrders";
import { createOrder, getOrders } from "../../src/services/api";
import * as orderStoreModule from "../../src/store/orderStore";

jest.mock("../../src/services/api");
jest.mock("../../src/store/orderStore");

const mockClearOrder = jest.fn();
const mockOrders = [
  {
    id: 1,
    items: [
      {
        pizzaId: 1,
        quantity: 2,
        pizza: {
          name: "Margherita",
          price: 5,
          ingredients: ["tomato", "mozzarella"],
        },
      },
    ],
  },
];
const mockCart = [{ pizzaId: 1, quantity: 2 }];

describe("useOrders", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    jest.spyOn(orderStoreModule, "orderStore").mockImplementation(() => ({
      clearOrder: mockClearOrder,
    }));

    (getOrders as jest.Mock).mockResolvedValue(mockOrders);
    (createOrder as jest.Mock).mockResolvedValue({ message: "Success" });
    global.alert = jest.fn();
    console.error = jest.fn();
  });

  test("should load orders when mounting", async () => {
    const { result } = renderHook(() => useOrders());

    await act(async () => {
      await Promise.resolve();
    });

    expect(getOrders).toHaveBeenCalledTimes(1);
    expect(result.current.orders).toEqual(mockOrders);
  });

  test("You should create an order correctly.", async () => {
    const { result } = renderHook(() => useOrders());

    await act(async () => {
      await Promise.resolve();
    });

    await act(async () => {
      expect(await result.current.handleCreateOrder(mockCart)).toBe(true);
    });

    expect(createOrder).toHaveBeenCalledWith(mockCart);
    expect(mockClearOrder).toHaveBeenCalled();
    expect(getOrders).toHaveBeenCalledTimes(2);
  });

  test("should return false with empty command", async () => {
    const { result } = renderHook(() => useOrders());

    await act(async () => {
      expect(await result.current.handleCreateOrder([])).toBe(false);
    });

    expect(createOrder).not.toHaveBeenCalled();
  });
});
