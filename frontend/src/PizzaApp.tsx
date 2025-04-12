import { PizzaItem } from "./components/PizzaItem";
import { CartOrderItem } from "./components/CartOrderItem";
import { usePizzas } from "./hooks/usePizzas";
import { orderStore } from "./store/orderStore";


const PizzaApp = () => {
  const { pizzas, getPizzaById } = usePizzas();
  const { orders, removeFromOrder, updateQuantity } = orderStore();

  return (
    <div className="min-h-screen bg-gray-500 py-6">
      <div className="container mx-auto px-4 max-w-7xl">
        <h1 className="text-4xl font-black text-center mb-8 text-yellow-400 mt-4">Pizza Challenge - Coding cloud</h1>
        <div className="flex flex-col lg:flex-row gap-6">

          <section className="lg:w-1/2 bg-white rounded-lg shadow-sm p-5">
            <h2 className="text-xl font-bold mb-5 text-gray-700">Menú</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pizzas.map((pizza) => (
                <PizzaItem key={pizza.id} pizza={pizza} />
              ))}
            </div>
          </section>
          <div className="lg:w-1/2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-5">
              <h2 className="text-xl font-bold mb-4 text-gray-700">Order</h2>
              <div className="space-y-3">
                {orders.length === 0 ? (
                  <p className="text-gray-400 text-center py-4">Add pizzas </p>
                ) : (
                  <>
                    {orders.map((order) => {
                      const pizza = getPizzaById(order.pizzaId);
                      if (!pizza) return null;
                      return (
                        <CartOrderItem
                          key={order.pizzaId}
                          order={order}
                          pizza={pizza}
                          onRemove={() => removeFromOrder(order.pizzaId)}
                          onQuantityChange={(newQuantity: number) => updateQuantity(order.pizzaId, newQuantity)}
                        />
                      );
                    })}
                    <button
                      onClick={() => console.log("order")}
                      className={`w-full mt-4 py-2.5 rounded-md font-medium ${orders.length === 0
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                      disabled={orders.length === 0}
                    >
                      Order pizzas
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PizzaApp;