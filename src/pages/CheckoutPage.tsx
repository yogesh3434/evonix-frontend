import { FormEvent, useEffect, useState } from 'react';
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

export default function CheckoutPage() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [orderNumber, setOrderNumber] = useState('');

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    province: 'Ontario',
    postalCode: '',
    paymentMethod: 'Credit Card',
  });

  useEffect(() => {
    const loadCart = async () => {
      try {
        const data = await getCart();
        setCart(data);
      } catch {
        setError('Unable to load checkout information.');
      } finally {
        setIsLoading(false);
      }
    };

    loadCart();
  }, []);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const handleCheckout = async (event: FormEvent) => {
    event.preventDefault();

    if (!cart || cart.items.length === 0) {
      setError('Your cart is empty.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      for (const item of cart.items) {
        await removeFromCart(item.vehicleId);
      }

      const confirmationNumber = `EVX-${Date.now()
        .toString()
        .slice(-8)}`;

      setOrderNumber(confirmationNumber);
      setCart({
        ...cart,
        items: [],
        itemCount: 0,
        subtotal: 0,
      });
    } catch {
      setError('Unable to complete checkout. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <main className="container mx-auto flex-grow px-4 py-8">
        <p>Loading checkout...</p>
      </main>
    );
  }

  if (orderNumber) {
    return (
      <main className="container mx-auto flex-grow px-4 py-12">
        <section className="mx-auto max-w-2xl rounded-xl border border-green-200 bg-white p-8 text-center shadow-sm">
          <div className="mb-4 text-5xl">✓</div>

          <h1 className="mb-3 text-3xl font-bold text-slate-900">
            Checkout Complete
          </h1>

          <p className="mb-2 text-lg text-slate-700">
            Thank you, {form.fullName}. Your order has been confirmed.
          </p>

          <p className="mb-6 font-semibold text-green-700">
            Order number: {orderNumber}
          </p>

          <p className="mb-8 text-slate-600">
            A confirmation will be sent to {form.email}.
          </p>

          <Link
            to="/vehicles"
            className="inline-block rounded-lg bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-slate-700"
          >
            Continue Shopping
          </Link>
        </section>
      </main>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <main className="container mx-auto flex-grow px-4 py-12">
        <section className="mx-auto max-w-2xl rounded-xl bg-white p-8 text-center shadow-sm">
          <h1 className="mb-4 text-3xl font-bold">
            Your cart is empty
          </h1>

          <p className="mb-6 text-slate-600">
            Add a vehicle to your cart before checking out.
          </p>

          <Link
            to="/vehicles"
            className="inline-block rounded-lg bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-slate-700"
          >
            Browse Vehicles
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="container mx-auto flex-grow px-4 py-8 sm:px-6">
      <h1 className="mb-8 text-3xl font-bold text-slate-900">
        Checkout
      </h1>

      {error && (
        <div className="mb-6 rounded-lg bg-red-100 p-4 text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-3">
        <form
          onSubmit={handleCheckout}
          className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2"
        >
          <section>
            <h2 className="mb-4 text-xl font-bold">
              Customer Information
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-2">
                Full Name
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                  className="rounded-lg border border-slate-300 px-3 py-2"
                />
              </label>

              <label className="flex flex-col gap-2">
                Email
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="rounded-lg border border-slate-300 px-3 py-2"
                />
              </label>

              <label className="flex flex-col gap-2">
                Phone
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="rounded-lg border border-slate-300 px-3 py-2"
                />
              </label>

              <label className="flex flex-col gap-2">
                Address
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  required
                  className="rounded-lg border border-slate-300 px-3 py-2"
                />
              </label>

              <label className="flex flex-col gap-2">
                City
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  required
                  className="rounded-lg border border-slate-300 px-3 py-2"
                />
              </label>

              <label className="flex flex-col gap-2">
                Province
                <select
                  name="province"
                  value={form.province}
                  onChange={handleChange}
                  required
                  className="rounded-lg border border-slate-300 px-3 py-2"
                >
                  <option value="Ontario">Ontario</option>
                  <option value="Quebec">Quebec</option>
                  <option value="British Columbia">
                    British Columbia
                  </option>
                  <option value="Alberta">Alberta</option>
                </select>
              </label>

              <label className="flex flex-col gap-2">
                Postal Code
                <input
                  type="text"
                  name="postalCode"
                  value={form.postalCode}
                  onChange={handleChange}
                  required
                  className="rounded-lg border border-slate-300 px-3 py-2"
                />
              </label>

              <label className="flex flex-col gap-2">
                Payment Method
                <select
                  name="paymentMethod"
                  value={form.paymentMethod}
                  onChange={handleChange}
                  required
                  className="rounded-lg border border-slate-300 px-3 py-2"
                >
                  <option value="Credit Card">
                    Credit Card
                  </option>
                  <option value="Financing">
                    Vehicle Financing
                  </option>
                  <option value="Pay at Dealership">
                    Pay at Dealership
                  </option>
                </select>
              </label>
            </div>
          </section>

          <div className="rounded-lg bg-amber-50 p-4 text-sm text-amber-800">
            This is a demonstration checkout. No real payment
            information will be processed.
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {isSubmitting
              ? 'Processing Checkout...'
              : `Place Order — ${formatCurrency(cart.subtotal)}`}
          </button>
        </form>

        <aside className="h-fit rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold">
            Order Summary
          </h2>

          <div className="space-y-4">
            {cart.items.map((item) => (
              <div
                key={item.id}
                className="border-b border-slate-200 pb-4"
              >
                <p className="font-semibold">{item.name}</p>

                <p className="text-sm text-slate-600">
                  {item.brand} {item.model}
                </p>

                <div className="mt-2 flex justify-between">
                  <span>Quantity: {item.quantity}</span>
                  <span>{formatCurrency(item.lineTotal)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between text-lg font-bold">
            <span>Subtotal</span>
            <span>{formatCurrency(cart.subtotal)}</span>
          </div>
        </aside>
      </div>
    </main>
  );
}