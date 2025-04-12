import { PizzaItem } from "./components/PizzaItem";
import { usePizzas } from "./hooks/usePizzas";


const PizzaApp = () => {
  const { pizzas } = usePizzas();

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


        </div>
      </div>
    </div>
  );
};

export default PizzaApp;