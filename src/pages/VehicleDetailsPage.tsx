import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { addToCart } from '../api/cartApi';
import {
  createReview,
  getVehicleReviews,
  type Review,
} from '../api/reviewApi';
import { getVehicleById } from '../api/vehicleApi';
import {
  getLoanEstimate,
  type LoanEstimate,
} from '../api/loanApi';
import HotDealBadge from '../components/vehicles/HotDealBadge';
import {
  defaultVehicleImage,
  vehicleImages,
} from '../data/vehicleImages';
import type { VehicleDetails } from '../types/vehicle';
import { formatCurrency } from '../utils/currency';

export default function VehicleDetailsPage() {
  const { id } = useParams();

  const [vehicle, setVehicle] =
    useState<VehicleDetails | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [cartMessage, setCartMessage] = useState('');
  const [reviewMessage, setReviewMessage] = useState('');
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [downPayment, setDownPayment] = useState(0);
  const [interestRate, setInterestRate] = useState(5);
  const [loanTerm, setLoanTerm] = useState(60);
  const [loanEstimate, setLoanEstimate] =
    useState<LoanEstimate | null>(null);
  const [loanMessage, setLoanMessage] = useState('');
  const [isCalculatingLoan, setIsCalculatingLoan] =
    useState(false);

  useEffect(() => {
    const loadVehicle = async () => {
      if (!id) {
        setError('Vehicle not found.');
        setIsLoading(false);
        return;
      }

      try {
        const vehicleData = await getVehicleById(id);
        const reviewData = await getVehicleReviews(id);

        setVehicle(vehicleData);
        setReviews(reviewData.data);
        setAverageRating(reviewData.averageRating);
      } catch {
        setError('Unable to load vehicle details.');
      } finally {
        setIsLoading(false);
      }
    };

    loadVehicle();
  }, [id]);

  if (isLoading) {
    return (
      <main className="container mx-auto flex-grow px-4 py-8 sm:px-6">
        <p>Loading vehicle details...</p>
      </main>
    );
  }

  if (error || !vehicle) {
    return (
      <main className="container mx-auto flex-grow px-4 py-8 sm:px-6">
        <p>{error || 'Vehicle not found.'}</p>

        <Link
          to="/vehicles"
          className="mt-4 inline-block font-medium text-blue-600 hover:text-blue-700"
        >
          Back to vehicles
        </Link>
      </main>
    );
  }

  const displayPrice =
    vehicle.isHotDeal && vehicle.hotDealPrice !== null
      ? vehicle.hotDealPrice
      : vehicle.price;

  const imageUrl =
    vehicleImages[vehicle.name] ?? defaultVehicleImage;

  const handleAddToCart = async () => {
    try {
      await addToCart(vehicle.id);
      setCartMessage('Vehicle added to cart.');
    } catch {
      setCartMessage('Unable to add vehicle to cart.');
    }
  };

  const handleReviewSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      await createReview(vehicle.id, rating, title, body);

      const reviewData = await getVehicleReviews(vehicle.id);

      setReviews(reviewData.data);
      setAverageRating(reviewData.averageRating);
      setRating(5);
      setTitle('');
      setBody('');
      setReviewMessage('Review submitted successfully.');
    } catch {
      setReviewMessage('Unable to submit review.');
    }
  };

  const handleLoanCalculation = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const principal = displayPrice - downPayment;

    if (principal <= 0) {
      setLoanEstimate(null);
      setLoanMessage(
        'Down payment must be less than the vehicle price.'
      );
      return;
    }

    try {
      setIsCalculatingLoan(true);
      setLoanMessage('');

      const estimate = await getLoanEstimate(
        principal,
        interestRate,
        loanTerm
      );

      setLoanEstimate(estimate);
    } catch (error) {
      console.error('Loan calculation error:', error);
      setLoanEstimate(null);
      setLoanMessage(
        'Unable to calculate the loan estimate.'
      );
    } finally {
      setIsCalculatingLoan(false);
    }
  };

  return (
    <main className="container mx-auto flex-grow px-4 py-8 sm:px-6">
      <Link
        to="/vehicles"
        className="font-medium text-blue-600 hover:text-blue-700"
      >
        Back to vehicles
      </Link>

      <article className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <img
          src={imageUrl}
          alt={`${vehicle.name} electric vehicle`}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.src = defaultVehicleImage;
          }}
          className="h-96 w-full bg-slate-100 object-contain"
        />

        <div className="p-6">
          <header>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <h1 className="text-3xl font-bold text-slate-900">
                {vehicle.name}
              </h1>

              {vehicle.isHotDeal && <HotDealBadge />}
            </div>

            <p className="mt-2 text-slate-600">
              {vehicle.brand} {vehicle.model} ·{' '}
              {vehicle.modelYear}
            </p>
          </header>

          <p className="mt-6 text-slate-700">
            {vehicle.description ??
              'No description available.'}
          </p>

          <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <dt className="font-semibold">Condition</dt>
              <dd>{vehicle.condition}</dd>
            </div>

            <div>
              <dt className="font-semibold">Status</dt>
              <dd>{vehicle.status}</dd>
            </div>

            <div>
              <dt className="font-semibold">Body style</dt>
              <dd>
                {vehicle.bodyStyle ?? 'Not specified'}
              </dd>
            </div>

            <div>
              <dt className="font-semibold">
                Exterior colour
              </dt>
              <dd>
                {vehicle.colourExterior ?? 'Not specified'}
              </dd>
            </div>

            <div>
              <dt className="font-semibold">
                Interior colour
              </dt>
              <dd>
                {vehicle.colourInterior ?? 'Not specified'}
              </dd>
            </div>

            <div>
              <dt className="font-semibold">
                Interior fabric
              </dt>
              <dd>
                {vehicle.interiorFabric ?? 'Not specified'}
              </dd>
            </div>

            <div>
              <dt className="font-semibold">Range</dt>
              <dd>
                {vehicle.rangeKm !== null
                  ? `${vehicle.rangeKm} km`
                  : 'Not specified'}
              </dd>
            </div>

            <div>
              <dt className="font-semibold">Battery</dt>
              <dd>
                {vehicle.batteryKwh !== null
                  ? `${vehicle.batteryKwh} kWh`
                  : 'Not specified'}
              </dd>
            </div>

            <div>
              <dt className="font-semibold">
                Charge time
              </dt>
              <dd>
                {vehicle.chargeTimeHrs !== null
                  ? `${vehicle.chargeTimeHrs} hours`
                  : 'Not specified'}
              </dd>
            </div>

            <div>
              <dt className="font-semibold">Horsepower</dt>
              <dd>
                {vehicle.horsepower ?? 'Not specified'}
              </dd>
            </div>

            <div>
              <dt className="font-semibold">
                Seating capacity
              </dt>
              <dd>
                {vehicle.seatingCapacity ??
                  'Not specified'}
              </dd>
            </div>

            <div>
              <dt className="font-semibold">Mileage</dt>
              <dd>
                {vehicle.mileageKm.toLocaleString()} km
              </dd>
            </div>

            <div>
              <dt className="font-semibold">
                Available quantity
              </dt>
              <dd>{vehicle.quantity}</dd>
            </div>
          </dl>

          <section className="mt-6">
            {vehicle.isHotDeal &&
            vehicle.hotDealPrice !== null ? (
              <>
                <p>
                  Regular price:{' '}
                  <s>{formatCurrency(vehicle.price)}</s>
                </p>

                <p className="text-xl">
                  <strong>
                    Deal price:{' '}
                    {formatCurrency(displayPrice)}
                  </strong>
                </p>
              </>
            ) : (
              <p className="text-xl">
                <strong>
                  {formatCurrency(displayPrice)}
                </strong>
              </p>
            )}
          </section>

          <button
            type="button"
            onClick={handleAddToCart}
            className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Add to cart
          </button>

          {cartMessage && (
            <p className="mt-3 text-sm font-medium text-slate-700">
              {cartMessage}
            </p>
          )}
        </div>
      </article>

      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">
          Customer Reviews
        </h2>

        <p className="mt-2 text-slate-600">
          Average rating: {averageRating.toFixed(1)} out of 5
        </p>

        {reviews.length === 0 ? (
          <p className="mt-4">No reviews available.</p>
        ) : (
          <div className="mt-6 flex flex-col gap-4">
            {reviews.map((review) => (
              <article
                key={review.id}
                className="rounded-lg border border-slate-200 p-4"
              >
                <p className="text-xl text-amber-500">
                  {'★'.repeat(review.rating)}
                  {'☆'.repeat(5 - review.rating)}
                </p>

                {review.title && (
                  <h3 className="mt-2 font-bold text-slate-900">
                    {review.title}
                  </h3>
                )}

                {review.body && (
                  <p className="mt-2 text-slate-700">
                    {review.body}
                  </p>
                )}
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">
          Write a Review
        </h2>

        <form
          onSubmit={handleReviewSubmit}
          className="mt-6 flex flex-col gap-4"
        >
          <div>
            <p className="mb-2 font-medium text-slate-700">
              Rating
            </p>

            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="text-3xl text-amber-500"
                >
                  {star <= rating ? '★' : '☆'}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="review-title"
              className="text-sm font-medium text-slate-700"
            >
              Title
            </label>

            <input
              id="review-title"
              type="text"
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
              required
              maxLength={120}
              className="rounded-lg border border-slate-300 px-4 py-2.5"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="review-body"
              className="text-sm font-medium text-slate-700"
            >
              Review
            </label>

            <textarea
              id="review-body"
              value={body}
              onChange={(event) =>
                setBody(event.target.value)
              }
              required
              maxLength={2000}
              rows={5}
              className="rounded-lg border border-slate-300 px-4 py-2.5"
            />
          </div>

          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Submit review
          </button>

          {reviewMessage && (
            <p className="text-sm font-medium text-slate-700">
              {reviewMessage}
            </p>
          )}
        </form>
      </section>

      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">
          Loan Calculator
        </h2>

        <p className="mt-2 text-slate-600">
          Estimate the monthly payment for this vehicle.
        </p>

        <form
          onSubmit={handleLoanCalculation}
          className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3"
        >
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="down-payment"
              className="text-sm font-medium text-slate-700"
            >
              Down payment
            </label>

            <input
              id="down-payment"
              type="number"
              min="0"
              step="0.01"
              value={downPayment}
              onChange={(event) =>
                setDownPayment(Number(event.target.value))
              }
              className="rounded-lg border border-slate-300 px-4 py-2.5"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="interest-rate"
              className="text-sm font-medium text-slate-700"
            >
              Annual interest rate (%)
            </label>

            <input
              id="interest-rate"
              type="number"
              min="0"
              max="100"
              step="0.01"
              value={interestRate}
              onChange={(event) =>
                setInterestRate(
                  Number(event.target.value)
                )
              }
              required
              className="rounded-lg border border-slate-300 px-4 py-2.5"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="loan-term"
              className="text-sm font-medium text-slate-700"
            >
              Loan term
            </label>

            <select
              id="loan-term"
              value={loanTerm}
              onChange={(event) =>
                setLoanTerm(Number(event.target.value))
              }
              className="rounded-lg border border-slate-300 px-4 py-2.5"
            >
              <option value={12}>12 months</option>
              <option value={24}>24 months</option>
              <option value={36}>36 months</option>
              <option value={48}>48 months</option>
              <option value={60}>60 months</option>
              <option value={72}>72 months</option>
              <option value={84}>84 months</option>
              <option value={96}>96 months</option>
              <option value={120}>120 months</option>
            </select>
          </div>

          <div className="md:col-span-3">
            <p className="text-sm text-slate-600">
              Vehicle price:{' '}
              {formatCurrency(displayPrice)}
            </p>

            <p className="mt-1 text-sm text-slate-600">
              Estimated loan amount:{' '}
              {formatCurrency(
                Math.max(
                  displayPrice - downPayment,
                  0
                )
              )}
            </p>
          </div>

          <div className="md:col-span-3">
            <button
              type="submit"
              disabled={isCalculatingLoan}
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isCalculatingLoan
                ? 'Calculating...'
                : 'Calculate payment'}
            </button>
          </div>
        </form>

        {loanMessage && (
          <p className="mt-4 text-sm font-medium text-red-600">
            {loanMessage}
          </p>
        )}

        {loanEstimate && (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-slate-100 p-4">
              <p className="text-sm text-slate-600">
                Monthly payment
              </p>

              <p className="mt-1 text-xl font-bold text-slate-900">
                {formatCurrency(
                  loanEstimate.monthlyPayment
                )}
              </p>
            </div>

            <div className="rounded-lg bg-slate-100 p-4">
              <p className="text-sm text-slate-600">
                Total interest
              </p>

              <p className="mt-1 text-xl font-bold text-slate-900">
                {formatCurrency(
                  loanEstimate.totalInterest
                )}
              </p>
            </div>

            <div className="rounded-lg bg-slate-100 p-4">
              <p className="text-sm text-slate-600">
                Total amount paid
              </p>

              <p className="mt-1 text-xl font-bold text-slate-900">
                {formatCurrency(
                  loanEstimate.totalPaid
                )}
              </p>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}