import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getSalesReport,
  getUsageReport,
  type SalesGroupBy,
  type SalesReport,
  type UsageReport,
} from '../api/reportApi';
import { formatCurrency } from '../utils/currency';
import { useAuth } from '../context/useAuth';

const groupByLabels: Record<SalesGroupBy, string> = {
  month: 'Month',
  brand: 'Brand',
  vehicle: 'Vehicle',
};

export default function AdminReportsPage() {
  const { session, isLoading: isAuthLoading } = useAuth();

  const [groupBy, setGroupBy] = useState<SalesGroupBy>('month');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const [sales, setSales] = useState<SalesReport | null>(null);
  const [usage, setUsage] = useState<UsageReport | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isForbidden, setIsForbidden] = useState(false);

  const loadReports = useCallback(async () => {
    try {
      setIsLoading(true);
      setError('');
      setIsForbidden(false);

      const range = {
        ...(from ? { from } : {}),
        ...(to ? { to } : {}),
      };

      const [salesData, usageData] = await Promise.all([
        getSalesReport(groupBy, range),
        getUsageReport(range),
      ]);

      setSales(salesData);
      setUsage(usageData);
    } catch (caught) {
      const status = (
        caught as { response?: { status?: number } }
      )?.response?.status;

      if (status === 403) {
        setIsForbidden(true);
      } else if (status === 400) {
        setError('Check the date range and try again.');
      } else {
        setError('Unable to load the reports.');
      }

      setSales(null);
      setUsage(null);
    } finally {
      setIsLoading(false);
    }
  }, [groupBy, from, to]);

  useEffect(() => {
    if (!isAuthLoading && session) {
      loadReports();
    } else if (!isAuthLoading) {
      setIsLoading(false);
    }
  }, [isAuthLoading, session, loadReports]);

  if (isAuthLoading) {
    return (
      <main className="container mx-auto flex-grow px-4 py-12">
        <p className="text-slate-600">Loading...</p>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="container mx-auto flex-grow px-4 py-12">
        <section className="mx-auto max-w-2xl rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="mb-3 text-3xl font-bold text-slate-900">
            Administrator Reports
          </h1>

          <p className="mb-6 text-slate-600">
            Sign in with an administrator account to view sales and
            usage reports.
          </p>

          <Link
            to="/login"
            className="inline-block rounded-lg bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-slate-700"
          >
            Sign In
          </Link>
        </section>
      </main>
    );
  }

  if (isForbidden) {
    return (
      <main className="container mx-auto flex-grow px-4 py-12">
        <section className="mx-auto max-w-2xl rounded-xl border border-amber-200 bg-white p-8 text-center shadow-sm">
          <h1 className="mb-3 text-3xl font-bold text-slate-900">
            Administrator access required
          </h1>

          <p className="text-slate-600">
            This account does not have administrator permissions, so the
            reports cannot be displayed.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="container mx-auto flex-grow px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Administrator Reports
        </h1>

        <p className="mt-2 text-slate-600">
          Vehicle sales performance and website usage statistics.
        </p>
      </div>

      <div className="mb-8 flex flex-wrap items-end gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">
          From
          <input
            type="date"
            value={from}
            onChange={(event) => setFrom(event.target.value)}
            className="rounded-lg border border-slate-300 px-3 py-2 font-normal"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">
          To
          <input
            type="date"
            value={to}
            onChange={(event) => setTo(event.target.value)}
            className="rounded-lg border border-slate-300 px-3 py-2 font-normal"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">
          Group sales by
          <select
            value={groupBy}
            onChange={(event) =>
              setGroupBy(event.target.value as SalesGroupBy)
            }
            className="rounded-lg border border-slate-300 px-3 py-2 font-normal"
          >
            <option value="month">Month</option>
            <option value="brand">Brand</option>
            <option value="vehicle">Vehicle</option>
          </select>
        </label>

        <button
          type="button"
          onClick={loadReports}
          disabled={isLoading}
          className="rounded-lg bg-slate-900 px-5 py-2.5 font-semibold text-white hover:bg-slate-700 disabled:opacity-50"
        >
          {isLoading ? 'Loading...' : 'Apply'}
        </button>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-100 p-4 text-red-700">
          {error}
        </div>
      )}

      {sales && (
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-bold text-slate-900">
            Sales Report
          </h2>

          <div className="mb-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Orders', value: String(sales.totals.orderCount) },
              { label: 'Units Sold', value: String(sales.totals.unitsSold) },
              {
                label: 'Gross Revenue',
                value: formatCurrency(sales.totals.grossRevenue),
              },
              {
                label: 'Average Order',
                value: formatCurrency(sales.totals.averageOrderValue),
              },
            ].map((card) => (
              <div
                key={card.label}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <p className="text-sm text-slate-500">{card.label}</p>
                <p className="mt-1 text-2xl font-bold text-slate-900">
                  {card.value}
                </p>
              </div>
            ))}
          </div>

          <p className="mb-5 text-sm text-slate-600">
            Net revenue {formatCurrency(sales.totals.netRevenue)} plus tax
            collected {formatCurrency(sales.totals.taxCollected)}. The rows
            below total the net figure, because tax is charged on the order
            rather than on an individual line.
          </p>

          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100 text-left">
                  <th className="px-4 py-3 font-semibold text-slate-600">
                    {groupByLabels[sales.groupBy]}
                  </th>
                  <th className="px-4 py-3 font-semibold text-slate-600">
                    Orders
                  </th>
                  <th className="px-4 py-3 font-semibold text-slate-600">
                    Units Sold
                  </th>
                  <th className="px-4 py-3 font-semibold text-slate-600">
                    Revenue
                  </th>
                </tr>
              </thead>
              <tbody>
                {sales.rows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 py-6 text-center text-slate-500"
                    >
                      No sales recorded for this period.
                    </td>
                  </tr>
                ) : (
                  sales.rows.map((row) => (
                    <tr
                      key={row.label}
                      className="border-t border-slate-200 even:bg-slate-50"
                    >
                      <td className="px-4 py-3 text-slate-800">
                        {row.label}
                      </td>
                      <td className="px-4 py-3 text-slate-700">
                        {row.orderCount}
                      </td>
                      <td className="px-4 py-3 text-slate-700">
                        {row.unitsSold}
                      </td>
                      <td className="px-4 py-3 text-slate-700">
                        {formatCurrency(row.revenue)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {usage && (
        <section>
          <h2 className="mb-4 text-xl font-bold text-slate-900">
            Website Usage Report
          </h2>

          <div className="mb-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">Total Events</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">
                {usage.totals.totalEvents}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">Unique Visitors</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">
                {usage.totals.uniqueVisitors}
              </p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <h3 className="border-b border-slate-200 bg-slate-50 px-4 py-3 font-semibold text-slate-700">
                Events by Type
              </h3>

              <table className="w-full text-sm">
                <tbody>
                  {usage.eventsByType.length === 0 ? (
                    <tr>
                      <td className="px-4 py-4 text-slate-500">
                        No events recorded.
                      </td>
                    </tr>
                  ) : (
                    usage.eventsByType.map((row) => (
                      <tr
                        key={row.eventType}
                        className="border-t border-slate-100"
                      >
                        <td className="px-4 py-2.5 capitalize text-slate-700">
                          {row.eventType}
                        </td>
                        <td className="px-4 py-2.5 text-right text-slate-700">
                          {row.eventCount}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <h3 className="border-b border-slate-200 bg-slate-50 px-4 py-3 font-semibold text-slate-700">
                Most Viewed Vehicles
              </h3>

              <table className="w-full text-sm">
                <tbody>
                  {usage.mostViewedVehicles.length === 0 ? (
                    <tr>
                      <td className="px-4 py-4 text-slate-500">
                        No views recorded.
                      </td>
                    </tr>
                  ) : (
                    usage.mostViewedVehicles.map((row) => (
                      <tr
                        key={row.vehicleId}
                        className="border-t border-slate-100"
                      >
                        <td className="px-4 py-2.5 text-slate-700">
                          {row.brand} {row.name}
                        </td>
                        <td className="px-4 py-2.5 text-right text-slate-700">
                          {row.viewCount}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <h3 className="border-b border-slate-200 bg-slate-50 px-4 py-3 font-semibold text-slate-700">
                Top Search Terms
              </h3>

              <table className="w-full text-sm">
                <tbody>
                  {usage.topSearchTerms.length === 0 ? (
                    <tr>
                      <td className="px-4 py-4 text-slate-500">
                        No searches recorded.
                      </td>
                    </tr>
                  ) : (
                    usage.topSearchTerms.map((row) => (
                      <tr
                        key={row.searchTerm}
                        className="border-t border-slate-100"
                      >
                        <td className="px-4 py-2.5 text-slate-700">
                          {row.searchTerm}
                        </td>
                        <td className="px-4 py-2.5 text-right text-slate-700">
                          {row.searchCount}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
