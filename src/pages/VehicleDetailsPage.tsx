import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { addToCart } from '../api/cartApi';
import { getVehicleById } from '../api/vehicleApi';
import type { VehicleDetails } from '../types/vehicle';
import { formatCurrency } from '../utils/currency';
import HotDealBadge from '../components/vehicles/HotDealBadge';

export default function VehicleDetailsPage() {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState<VehicleDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [cartMessage, setCartMessage] = useState('');

  useEffect(() => {
    const loadVehicle = async () => {
      if (!id) {
        setError('Vehicle not found.');
        setIsLoading(false);
        return;
      }

      try {
        const data = await getVehicleById(id);
        setVehicle(data);
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
      <main>
        <p>Loading vehicle details...</p>
      </main>
    );
  }

  if (error || !vehicle) {
    return (
      <main>
        <p>{error || 'Vehicle not found.'}</p>
        <Link to="/vehicles">Back to vehicles</Link>
      </main>
    );
  }

  const displayPrice =
    vehicle.isHotDeal && vehicle.hotDealPrice !== null
      ? vehicle.hotDealPrice
      : vehicle.price;

  const handleAddToCart = async () => {
    try {
      await addToCart(vehicle.id);
      setCartMessage('Vehicle added to cart.');
    } catch {
      setCartMessage('Unable to add vehicle to cart.');
    }
  };

  return (
    <main>
      <Link to="/vehicles">Back to vehicles</Link>

      <article>
        <header>
          <h1>{vehicle.name}</h1>

          {vehicle.isHotDeal && <HotDealBadge />}

          <p>
            {vehicle.brand} {vehicle.model} · {vehicle.modelYear}
          </p>
        </header>

        <p>{vehicle.description ?? 'No description available.'}</p>

        <dl>
          <div>
            <dt>Condition</dt>
            <dd>{vehicle.condition}</dd>
          </div>

          <div>
            <dt>Status</dt>
            <dd>{vehicle.status}</dd>
          </div>

          <div>
            <dt>Body style</dt>
            <dd>{vehicle.bodyStyle ?? 'Not specified'}</dd>
          </div>

          <div>
            <dt>Exterior colour</dt>
            <dd>{vehicle.colourExterior ?? 'Not specified'}</dd>
          </div>

          <div>
            <dt>Interior colour</dt>
            <dd>{vehicle.colourInterior ?? 'Not specified'}</dd>
          </div>

          <div>
            <dt>Interior fabric</dt>
            <dd>{vehicle.interiorFabric ?? 'Not specified'}</dd>
          </div>

          <div>
            <dt>Range</dt>
            <dd>
              {vehicle.rangeKm !== null
                ? `${vehicle.rangeKm} km`
                : 'Not specified'}
            </dd>
          </div>

          <div>
            <dt>Battery</dt>
            <dd>
              {vehicle.batteryKwh !== null
                ? `${vehicle.batteryKwh} kWh`
                : 'Not specified'}
            </dd>
          </div>

          <div>
            <dt>Charge time</dt>
            <dd>
              {vehicle.chargeTimeHrs !== null
                ? `${vehicle.chargeTimeHrs} hours`
                : 'Not specified'}
            </dd>
          </div>

          <div>
            <dt>Horsepower</dt>
            <dd>{vehicle.horsepower ?? 'Not specified'}</dd>
          </div>

          <div>
            <dt>Seating capacity</dt>
            <dd>{vehicle.seatingCapacity ?? 'Not specified'}</dd>
          </div>

          <div>
            <dt>Mileage</dt>
            <dd>{vehicle.mileageKm.toLocaleString()} km</dd>
          </div>

          <div>
            <dt>Available quantity</dt>
            <dd>{vehicle.quantity}</dd>
          </div>
        </dl>

        <section>
          {vehicle.isHotDeal && vehicle.hotDealPrice !== null ? (
            <>
              <p>
                Regular price: <s>{formatCurrency(vehicle.price)}</s>
              </p>

              <p>
                <strong>
                  Deal price: {formatCurrency(displayPrice)}
                </strong>
              </p>
            </>
          ) : (
            <p>
              <strong>{formatCurrency(displayPrice)}</strong>
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
      </article>
    </main>
  );
}