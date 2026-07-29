import { useState } from 'react';
import type { FormEvent } from 'react';

export default function SupportPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('general');
  const [message, setMessage] = useState('');
  const [formMessage, setFormMessage] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setFormMessage(
      'Your support request has been submitted successfully.'
    );

    setName('');
    setEmail('');
    setCategory('general');
    setMessage('');
  };

  return (
    <main className="container mx-auto flex-grow px-4 py-10 sm:px-6">
      <section className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            EVonix Support
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Need assistance with a vehicle, your account, an order, or
            financing? Our support team is here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[360px_minmax(0,1fr)]">
          <aside className="flex flex-col gap-5">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900">
                Contact our team
              </h2>

              <div className="mt-5 space-y-5">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    General support
                  </p>

                  <a
                    href="mailto:support@evonixmotors.com"
                    className="mt-1 block text-sm text-blue-600 hover:text-blue-700"
                  >
                    support@evonixmotors.com
                  </a>
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Sales inquiries
                  </p>

                  <a
                    href="mailto:sales@evonixmotors.com"
                    className="mt-1 block text-sm text-blue-600 hover:text-blue-700"
                  >
                    sales@evonixmotors.com
                  </a>
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Financing assistance
                  </p>

                  <a
                    href="mailto:finance@evonixmotors.com"
                    className="mt-1 block text-sm text-blue-600 hover:text-blue-700"
                  >
                    finance@evonixmotors.com
                  </a>
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Order and payment support
                  </p>

                  <a
                    href="mailto:orders@evonixmotors.com"
                    className="mt-1 block text-sm text-blue-600 hover:text-blue-700"
                  >
                    orders@evonixmotors.com
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-950 p-6 text-white shadow-sm">
              <h2 className="text-xl font-bold">
                Support hours
              </h2>

              <div className="mt-4 space-y-2 text-sm text-slate-300">
                <div className="flex justify-between gap-4">
                  <span>Monday–Friday</span>
                  <span>9:00 AM–6:00 PM</span>
                </div>

                <div className="flex justify-between gap-4">
                  <span>Saturday</span>
                  <span>10:00 AM–4:00 PM</span>
                </div>

                <div className="flex justify-between gap-4">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>

              <p className="mt-5 text-sm text-slate-400">
                Most email requests receive a response within one
                business day.
              </p>
            </div>
          </aside>

          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-slate-900">
              Submit a support request
            </h2>

            <p className="mt-2 text-sm text-slate-600">
              Provide as much information as possible so our team can
              assist you quickly.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-6 flex flex-col gap-5"
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="support-name"
                    className="text-sm font-medium text-slate-700"
                  >
                    Full name
                  </label>

                  <input
                    id="support-name"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                    placeholder="John Smith"
                    className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="support-email"
                    className="text-sm font-medium text-slate-700"
                  >
                    Email address
                  </label>

                  <input
                    id="support-email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    placeholder="john.smith@example.com"
                    className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="support-category"
                  className="text-sm font-medium text-slate-700"
                >
                  Support category
                </label>

                <select
                  id="support-category"
                  value={category}
                  onChange={(event) =>
                    setCategory(event.target.value)
                  }
                  className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="general">
                    General question
                  </option>
                  <option value="vehicle">
                    Vehicle information
                  </option>
                  <option value="account">
                    Account assistance
                  </option>
                  <option value="order">
                    Order or payment
                  </option>
                  <option value="financing">
                    Financing assistance
                  </option>
                  <option value="technical">
                    Technical problem
                  </option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="support-message"
                  className="text-sm font-medium text-slate-700"
                >
                  How can we help?
                </label>

                <textarea
                  id="support-message"
                  value={message}
                  onChange={(event) =>
                    setMessage(event.target.value)
                  }
                  required
                  minLength={10}
                  maxLength={2000}
                  rows={7}
                  placeholder="Describe your question or issue..."
                  className="resize-y rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Submit request
              </button>

              {formMessage && (
                <p className="rounded-lg bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                  {formMessage}
                </p>
              )}
            </form>
          </section>
        </div>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">
            Frequently asked questions
          </h2>

          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            <details className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <summary className="cursor-pointer font-semibold text-slate-900">
                How can I compare vehicles?
              </summary>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Open the Vehicles page, select at least two vehicles,
                and click the Compare selected vehicles button.
              </p>
            </details>

            <details className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <summary className="cursor-pointer font-semibold text-slate-900">
                How does the loan calculator work?
              </summary>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Enter your down payment, annual interest rate, and
                loan term on the vehicle details page to receive an
                estimated monthly payment.
              </p>
            </details>

            <details className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <summary className="cursor-pointer font-semibold text-slate-900">
                Can I remove a vehicle from my cart?
              </summary>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Yes. Open the Cart page and select Remove beside the
                vehicle you no longer want.
              </p>
            </details>

            <details className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <summary className="cursor-pointer font-semibold text-slate-900">
                Are loan estimates final offers?
              </summary>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                No. The calculator provides an estimate only. Final
                financing terms may depend on lender approval, credit
                history, taxes, and additional fees.
              </p>
            </details>
          </div>
        </section>
      </section>
    </main>
  );
}