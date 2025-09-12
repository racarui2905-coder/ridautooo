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
    return new Intl.NumberFormat('es-ES').format(km) + ' km';
  };

  return (
    <div className="vehicle-card card hover-lift">
      {/* Status Badge */}
      {vehicle.status === 'sold' && (
        <div className="badge-vendido absolute top-2 left-2 z-10">
          VENDIDO
        </div>
      )}

      {/* Image */}
      <Link to={`/vehiculos/${vehicle.slug}`} className="card-image block">
        <img
          src={imageUrl}
          alt={`${vehicle.brand} ${vehicle.model}`}
          loading="lazy"
          onError={(e) => {
            e.target.src = '/placeholder-car.jpg';
          }}
        />
      </Link>

      {/* Content */}
      <div className="card-content">
        {/* Meta information */}
        <div className="vehicle-meta">
          <span>{vehicle.year}</span>
          <span>{vehicle.warranty_months} meses garantía</span>
          <span>{formatKilometers(vehicle.kilometers)}</span>
        </div>

        {/* Title */}
        <h3 className="vehicle-title">
          <Link to={`/vehiculos/${vehicle.slug}`}>
            {vehicle.year} {vehicle.brand} {vehicle.model}
          </Link>
        </h3>

        {/* Additional details */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            {vehicle.fuel_type}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {vehicle.transmission}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {vehicle.power_hp} CV
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="vehicle-price">
            {formatPrice(vehicle.price)}
          </div>
          
          <Link
            to={`/vehiculos/${vehicle.slug}`}
            className="btn btn-sm btn-primary"
          >
            Ver Detalles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;