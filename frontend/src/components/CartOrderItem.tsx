import { OrderCart, Pizza } from '../types';

interface CartOrderItemProps {
    order: OrderCart,
    pizza: Pizza;
    onRemove: () => void;
    onQuantityChange: (newQuantity: number) => void;
}

export const CartOrderItem = ({ order, pizza, onRemove, onQuantityChange }: CartOrderItemProps) => {
    const handleDecrease = () => {
        if (order.quantity > 1) {
            onQuantityChange(order.quantity - 1);
        }
    };

    const handleIncrease = () => {
        onQuantityChange(order.quantity + 1);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value > 0) {
            onQuantityChange(value);
        }
    };

    return (
        <div className="flex items-center justify-between py-3 border-b">

            <div className="flex-1">
                <h3 className="font-medium">{pizza.name}</h3>
                <p className="text-sm text-gray-500">${pizza.price.toFixed(2)} c/u</p>
            </div>

            <div className="flex items-center mx-4">
                <button
                    onClick={handleDecrease}
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-l hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={order.quantity <= 1}
                >
                    -
                </button>

                <input
                    type="number"
                    min="1"
                    value={order.quantity}
                    onChange={handleChange}
                    className="w-12 h-8 text-center border-t border-b border-gray-200 focus:outline-none"
                />

                <button
                    onClick={handleIncrease}
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-r hover:bg-gray-300"
                >
                    +
                </button>
            </div>

            <div className="flex items-center">
                <span className="w-20 text-right font-medium">
                    ${(pizza.price * order.quantity).toFixed(2)}
                </span>
                <button
                    onClick={onRemove}
                    className="ml-3 text-red-500 hover:text-red-700"
                    aria-label="Eliminar"
                >
                    X
                </button>
            </div>
        </div>
    );
};