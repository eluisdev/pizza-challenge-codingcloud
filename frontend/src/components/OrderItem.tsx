import { Order } from '../types';

interface OrderItemProps {
    order: Order;
}

export const OrderItem = ({ order }: OrderItemProps) => {
    return (
        <div className="border p-3 mb-3 rounded-lg shadow-sm">
            <h3 className="font-bold text-lg">Order: N# {order.id}</h3>
            <div className="flex justify-between items-center mt-2">
                {order.items.map(items => (
                    <div key={items.pizzaId}>
                        <p >Pizza {items.pizza.name}</p>
                        <p >Quantity: {items.quantity}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};