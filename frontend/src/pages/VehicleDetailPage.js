import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageLayout from '../components/Layout/PageLayout';
import LoadingSpinner from '../components/LoadingSpinner';
import { useVehicles } from '../context/VehicleContext';

const VehicleDetailPage = () => {
  const { slug } = useParams();
  const { t } = useTranslation();
  const { fetchVehicleBySlug } = useVehicles();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    const loadVehicle = async () => {
      try {
        setLoading(true);
        setError(null);
        const vehicleData = await fetchVehicleBySlug(slug);
        setVehicle(vehicleData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadVehicle();
  }, [slug, fetchVehicleBySlug]);

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

  if (loading) {
    return (
      <PageLayout>
        <LoadingSpinner size="large" />
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout>
        <div className="container section text-center">
          <h1 className="heading-2 mb-4">Vehículo no encontrado</h1>
          <p className="body-large mb-8">{error}</p>
          <Link to="/vehiculos" className="btn btn-primary">
            Ver Todos los Vehículos
          </Link>
        </div>
      </PageLayout>
    );
  }

  const images = vehicle.images || [];
  const hasImages = images.length > 0;

  return (
    <PageLayout>
      {/* Breadcrumbs */}
      <div className="bg-gray-50 py-4">
        <div className="container">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-ridauto-primary">Inicio</Link>
            <span className="text-gray-400">›</span>
            <Link to="/vehiculos" className="text-gray-500 hover:text-ridauto-primary">Vehículos</Link>
            <span className="text-gray-400">›</span>
            <span className="text-gray-900">{vehicle.brand} {vehicle.model}</span>
          </nav>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="grid grid-1 lg:grid-2 gap-12 mb-12">
            {/* Image Gallery */}
            <div>
              {hasImages ? (
                <div>
                  {/* Main Image */}
                  <div className="relative mb-4 rounded-lg overflow-hidden bg-gray-200">
                    {vehicle.status === 'sold' && (
                      <div className="badge-vendido absolute top-4 left-4 z-10">
                        VENDIDO
                      </div>
                    )}
                    <img
                      src={`${process.env.REACT_APP_BACKEND_URL}${images[currentImageIndex]?.url}`}
                      alt={`${vehicle.brand} ${vehicle.model}`}
                      className="w-full h-96 object-cover"
                    />
                    
                    {/* Navigation Arrows */}
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={() => setCurrentImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1)}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button
                          onClick={() => setCurrentImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </>
                    )}
                  </div>

                  {/* Thumbnail Strip */}
                  {images.length > 1 && (
                    <div className="grid grid-cols-4 gap-2">
                      {images.map((image, index) => (
                        <button
                          key={image.id}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`relative rounded overflow-hidden border-2 ${
                            index === currentImageIndex ? 'border-ridauto-primary' : 'border-gray-200'
                          }`}
                        >
                          <img
                            src={`${process.env.REACT_APP_BACKEND_URL}${image.url}`}
                            alt={`${vehicle.brand} ${vehicle.model} ${index + 1}`}
                            className="w-full h-20 object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
                  <span className="text-gray-500">Sin imágenes disponibles</span>
                </div>
              )}
            </div>

            {/* Vehicle Info */}
            <div>
              <h1 className="heading-1 mb-4">
                {vehicle.year} {vehicle.brand} {vehicle.model}
              </h1>

              <div className="vehicle-price mb-6">
                {formatPrice(vehicle.price)}
              </div>

              {/* Quick Specs */}
              <div className="grid grid-2 gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <span className="text-sm text-gray-500">Año</span>
                    <p className="font-semibold">{vehicle.year}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <div>
                    <span className="text-sm text-gray-500">Kilómetraje</span>
                    <p className="font-semibold">{formatKilometers(vehicle.kilometers)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  <div>
                    <span className="text-sm text-gray-500">Combustible</span>
                    <p className="font-semibold">{vehicle.fuel_type}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <span className="text-sm text-gray-500">Transmisión</span>
                    <p className="font-semibold">{vehicle.transmission}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-4">
                <Link
                  to={`/contacto?vehiculo=${vehicle.id}`}
                  className="btn btn-lg btn-primary text-center"
                >
                  Solicitar Información
                </Link>
                <a
                  href="tel:+34954123456"
                  className="btn btn-lg btn-secondary text-center"
                >
                  Llamar: +34 954 123 456
                </a>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="mb-12">
            {/* Tab Navigation */}
            <div className="border-b border-gray-200 mb-8">
              <nav className="flex space-x-8">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'description'
                      ? 'border-ridauto-primary text-ridauto-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Descripción
                </button>
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'specs'
                      ? 'border-ridauto-primary text-ridauto-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Especificaciones
                </button>
                {vehicle.features && vehicle.features.length > 0 && (
                  <button
                    onClick={() => setActiveTab('features')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'features'
                        ? 'border-ridauto-primary text-ridauto-primary'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Equipamiento
                  </button>
                )}
              </nav>
            </div>

            {/* Tab Content */}
            <div>
              {activeTab === 'description' && (
                <div className="prose max-w-none">
                  <p className="body-large">{vehicle.description}</p>
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="grid grid-1 md:grid-2 gap-8">
                  <div>
                    <h3 className="heading-4 mb-4">Datos Técnicos</h3>
                    <dl className="space-y-3">
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Marca:</dt>
                        <dd className="font-semibold">{vehicle.brand}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Modelo:</dt>
                        <dd className="font-semibold">{vehicle.model}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Año:</dt>
                        <dd className="font-semibold">{vehicle.year}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Color:</dt>
                        <dd className="font-semibold">{vehicle.color}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Potencia:</dt>
                        <dd className="font-semibold">{vehicle.power_hp} CV</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Puertas:</dt>
                        <dd className="font-semibold">{vehicle.doors}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Plazas:</dt>
                        <dd className="font-semibold">{vehicle.seats}</dd>
                      </div>
                      {vehicle.trunk_volume && (
                        <div className="flex justify-between">
                          <dt className="text-gray-500">Maletero:</dt>
                          <dd className="font-semibold">{vehicle.trunk_volume}L</dd>
                        </div>
                      )}
                    </dl>
                  </div>

                  <div>
                    <h3 className="heading-4 mb-4">Garantía y Servicios</h3>
                    <dl className="space-y-3">
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Garantía:</dt>
                        <dd className="font-semibold">{vehicle.warranty_months} meses</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Tipo:</dt>
                        <dd className="font-semibold capitalize">{vehicle.vehicle_type}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Estado:</dt>
                        <dd className={`font-semibold ${
                          vehicle.status === 'available' ? 'text-green-600' : 
                          vehicle.status === 'sold' ? 'text-red-600' : 'text-gray-600'
                        }`}>
                          {vehicle.status === 'available' ? 'Disponible' : 
                           vehicle.status === 'sold' ? 'Vendido' : 'No disponible'}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              )}

              {activeTab === 'features' && vehicle.features && vehicle.features.length > 0 && (
                <div>
                  <h3 className="heading-4 mb-4">Equipamiento y Extras</h3>
                  <div className="grid grid-1 md:grid-2 lg:grid-3 gap-3">
                    {vehicle.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Contact CTA */}
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <h3 className="heading-3 mb-4">¿Te interesa este vehículo?</h3>
            <p className="body-large mb-6">
              Contacta con nosotros para más información, financiación o para programar una visita
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to={`/contacto?vehiculo=${vehicle.id}`}
                className="btn btn-lg btn-primary"
              >
                Solicitar Información
              </Link>
              <a
                href="tel:+34954123456"
                className="btn btn-lg btn-secondary"
              >
                Llamar Ahora
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default VehicleDetailPage;