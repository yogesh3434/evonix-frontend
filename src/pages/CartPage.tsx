import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCart, removeFromCart } from '../api/cartApi';
import { formatCurrency } from '../utils/currency';

interface CartItem {
  id: string;
  vehicleId: string;
  name: string;
  brand: string;
  model: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
}

interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  itemCount: number;
  subtotal: number;
}

export default function CartPage() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadCart = async () => {
      try {
        const data = await getCart();
        setCart(data);
      } catch {
        setError('Unable to load cart.');
      } finally {
        setIsLoading(false);
      }
    };

    loadCart();
  }, []);

  const handleRemove = async (vehicleId: string) => {
    try {
      const data = await removeFromCart(vehicleId);
      setCart(data);
    } catch {
      setError('Unable to remove vehicle from cart.');
    }
  };

  if (isLoading) {
    return (
      <main>
        <p>Loading cart...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <p>{error}</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 sm:px-6 py-8 flex-grow">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">
        Shopping Cart
      </h1>

      {!cart || cart.items.length === 0 ? (
        <div>
          <p>Your cart is empty.</p>
          <Link to="/vehicles">Browse vehicles</Link>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {cart.items.map((item) => (
            <article
              key={item.id}
              className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm"
            >
              <h2 className="text-xl font-bold text-slate-900">
                {item.name}
              </h2>

              <p className="text-slate-600">
                {item.brand} {item.model}
              </p>

              <p>Quantity: {item.quantity}</p>

              <p>
                Unit price: {formatCurrency(item.unitPrice)}
              </p>

              <p>
                <strong>
                  Total: {formatCurrency(item.lineTotal)}
                </strong>
              </p>

              <button
                type="button"
                onClick={() => handleRemove(item.vehicleId)}
                className="mt-4 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
              >
                Remove
              </button>
            </article>
          ))}

          <section className="rounded-xl bg-slate-100 p-6">
            <p>Total items: {cart.itemCount}</p>

            <p className="text-xl font-bold">
                Subtotal: {formatCurrency(cart.subtotal)}
            </p>

            <Link
                to="/checkout"
                className="mt-4 inline-block rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
            >
                Proceed to Checkout
            </Link>
            </section>
        </div>
      )}
    </main>
  );
}