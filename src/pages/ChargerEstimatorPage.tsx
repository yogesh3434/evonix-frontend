import { useState } from 'react';
import type { FormEvent } from 'react';
import {
  getChargerEstimate,
  type ChargerEstimate,
  type ChargerLevel,
  type PropertyType,
} from '../api/chargerApi';
import { formatCurrency } from '../utils/currency';

export default function ChargerEstimatorPage() {
  const [propertyType, setPropertyType] =
    useState<PropertyType>('house');
  const [chargerLevel, setChargerLevel] =
    useState<ChargerLevel>('level2');
  const [distanceToPanel, setDistanceToPanel] = useState(10);
  const [estimate, setEstimate] =
    useState<ChargerEstimate | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      setError('');

      const data = await getChargerEstimate(
        propertyType,
        chargerLevel,
        distanceToPanel
      );

      setEstimate(data);
    } catch {
      setEstimate(null);
      setError('Unable to calculate the charger installation cost.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container mx-auto flex-grow px-4 py-10 sm:px-6">
      <section className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Charger Cost Estimator
          </h1>

          <p className="mt-2 text-slate-600">
            Estimate the installation cost of an electric vehicle
            charger for your property.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="property-type"
                className="text-sm font-medium text-slate-700"
              >
                Property type
              </label>

              <select
                id="property-type"
                value={propertyType}
                onChange={(event) =>
                  setPropertyType(
                    event.target.value as PropertyType
                  )
                }
                className="rounded-lg border border-slate-300 bg-white px-4 py-2.5"
              >
                <option value="house">House</option>
                <option value="condo">Condo</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="charger-level"
                className="text-sm font-medium text-slate-700"
              >
                Charger level
              </label>

              <select
                id="charger-level"
                value={chargerLevel}
                onChange={(event) =>
                  setChargerLevel(
                    event.target.value as ChargerLevel
                  )
                }
                className="rounded-lg border border-slate-300 bg-white px-4 py-2.5"
              >
                <option value="level1">Level 1</option>
                <option value="level2">Level 2</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="distance-to-panel"
                className="text-sm font-medium text-slate-700"
              >
                Distance to electrical panel
              </label>

              <input
                id="distance-to-panel"
                type="number"
                min={0}
                max={200}
                value={distanceToPanel}
                onChange={(event) =>
                  setDistanceToPanel(Number(event.target.value))
                }
                required
                className="rounded-lg border border-slate-300 px-4 py-2.5"
              />

              <p className="text-xs text-slate-500">
                Enter the approximate distance in feet.
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading
                ? 'Calculating...'
                : 'Calculate installation cost'}
            </button>

            {error && (
              <p className="text-sm font-medium text-red-600">
                {error}
              </p>
            )}
          </form>

          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">
              Estimated Cost
            </h2>

            {!estimate ? (
              <p className="mt-4 text-slate-600">
                Complete the form to view an installation estimate.
              </p>
            ) : (
              <div className="mt-6 flex flex-col gap-4">
                <div className="rounded-lg bg-blue-50 p-5">
                  <p className="text-sm text-slate-600">
                    Estimated total
                  </p>

                  <p className="mt-1 text-3xl font-bold text-blue-700">
                    {formatCurrency(estimate.estimatedTotal)}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Base charger cost</span>
                    <strong>
                      {formatCurrency(estimate.baseCost)}
                    </strong>
                  </div>

                  <div className="flex justify-between">
                    <span>Wiring cost</span>
                    <strong>
                      {formatCurrency(estimate.wiringCost)}
                    </strong>
                  </div>

                  <div className="flex justify-between">
                    <span>Property adjustment</span>
                    <strong>
                      {formatCurrency(
                        estimate.propertyAdjustment
                      )}
                    </strong>
                  </div>
                </div>

                {estimate.breakdown.length > 0 && (
                  <div className="border-t border-slate-200 pt-4">
                    <h3 className="font-semibold text-slate-900">
                      Cost breakdown
                    </h3>

                    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600">
                      {estimate.breakdown.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <p className="text-xs text-slate-500">
                  This estimate is for demonstration purposes. Actual
                  installation costs may vary.
                </p>
              </div>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}