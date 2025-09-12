import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const VehicleCard = ({ vehicle }) => {
  const { t } = useTranslation();

  const primaryImage = vehicle.images?.find(img => img.is_primary) || vehicle.images?.[0];
  const imageUrl = primaryImage ? `${process.env.REACT_APP_BACKEND_URL}${primaryImage.url}` : '/placeholder-car.jpg';

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const formatKilometers = (km) => {
    return new Intl.NumberFormat('es-ES').format(km);
  };

  return (
    <div className="card hover-lift">
      {/* Vehicle Image */}
      <Link to={`/vehiculos/${vehicle.slug}`} className="card-image relative">
        <img
          src={imageUrl}
          alt={`${vehicle.brand} ${vehicle.model}`}
          loading="lazy"
          onError={(e) => {
            e.target.src = '/placeholder-car.jpg';
          }}
        />
        
        {/* Status Badge */}
        {vehicle.status === 'sold' && (
          <div className="vehicle-badge sold">
            VENDIDO
          </div>
        )}
        
        {vehicle.status === 'available' && vehicle.vehicle_type === 'nuevo' && (
          <div className="vehicle-badge available">
            NUEVO
          </div>
        )}
      </Link>

      {/* Vehicle Info */}
      <div className="card-content">
        <div className="mb-4">
          <Link to={`/vehiculos/${vehicle.slug}`}>
            <h3 className="heading-4 mb-2 text-gray-900 dark:text-gray-100 hover:text-ridauto-primary dark:hover:text-ridauto-primary-light">
              {vehicle.brand} {vehicle.model}
            </h3>
          </Link>
          {vehicle.version && (
            <p className="body-small text-gray-600 dark:text-gray-400">
              {vehicle.version}
            </p>
          )}
        </div>

        {/* Price */}
        <div className="mb-4">
          <p className="text-2xl font-bold text-ridauto-primary dark:text-ridauto-primary-light">
            {formatPrice(vehicle.price)}
          </p>
        </div>

        {/* Key Specs */}
        <div className="grid grid-2 gap-4 mb-6 text-sm">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{vehicle.year}</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>{formatKilometers(vehicle.kilometers)} km</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
            </svg>
            <span>{vehicle.fuel_type}</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{vehicle.transmission}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link
            to={`/vehiculos/${vehicle.slug}`}
            className="btn btn-primary flex-1"
          >
            Ver Detalles
          </Link>
          <Link
            to={`/contacto?vehiculo=${encodeURIComponent(`${vehicle.brand} ${vehicle.model}`)}`}
            className="btn btn-secondary px-3"
            title="Solicitar información"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;