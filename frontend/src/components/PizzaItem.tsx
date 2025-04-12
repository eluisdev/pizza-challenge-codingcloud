import { orderStore } from '../store/orderStore';
import { Pizza } from '../types';

interface PizzaItemProps {
    pizza: Pizza
}

export const PizzaItem = ({ pizza }: PizzaItemProps) => {
    const { addOrder } = orderStore()
    return (
        <div key={pizza.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold text-gray-800">{pizza.name}</h3>
            <p className="text-gray-600 mb-3">Price: ${pizza.price.toFixed(2)}</p>
            <p className='uppercase'>Ingredients</p>
            <ul className='mb-3'>
                {pizza.ingredients.map(ingredient => (
                    <li key={ingredient} className='list-disc ml-4'>{ingredient}</li>
                ))}
            </ul>
            <button
                onClick={() => addOrder(pizza.id)}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
                Add to cart
            </button>
        </div>
    );
};