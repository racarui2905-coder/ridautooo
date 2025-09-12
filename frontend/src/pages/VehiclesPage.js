import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageLayout from '../components/Layout/PageLayout';
import VehicleCard from '../components/VehicleCard';
import LoadingSpinner, { SectionLoading, InlineLoading } from '../components/LoadingSpinner';
import { useVehicles } from '../context/VehicleContext';

const VehiclesPage = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    vehicles,
    loading,
    error,
    filters,
    sortBy,
    sortOrder,
    hasMore,
    updateFilters,
    updateSort,
    resetFilters,
    loadMore
  } = useVehicles();

  const [showFilters, setShowFilters] = useState(false);

  // Handle URL search params
  useEffect(() => {
    const params = Object.fromEntries(searchParams);
    if (Object.keys(params).length > 0) {
      updateFilters(params);
    }
  }, []);

  // Update URL when filters change
  useEffect(() => {
    const activeFilters = Object.entries(filters)
      .filter(([key, value]) => value && value !== '')
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    setSearchParams(activeFilters);
  }, [filters, setSearchParams]);

  const handleFilterChange = (key, value) => {
    updateFilters({ [key]: value });
  };

  const handleSortChange = (newSortBy) => {
    const newOrder = sortBy === newSortBy && sortOrder === 'desc' ? 'asc' : 'desc';
    updateSort(newSortBy, newOrder);
  };

  const clearFilters = () => {
    resetFilters();
    setSearchParams({});
  };

  return (
    <PageLayout>
      {/* Page Header */}
      <section className="section-sm bg-gray-50">
        <div className="container">
          <div className="text-center">
            <h1 className="heading-1 mb-4">{t('vehicles.title')}</h1>
            <p className="body-large">
              Encuentra el vehículo perfecto entre nuestra amplia selección
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                {/* Mobile Filter Toggle */}
                <div className="lg:hidden mb-4">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="btn btn-secondary w-full flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                    </svg>
                    Filtros
                  </button>
                </div>

                {/* Filters Panel */}
                <div className={`card card-content ${showFilters ? 'block' : 'hidden lg:block'}`}>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="heading-4">Filtros</h3>
                    <button
                      onClick={clearFilters}
                      className="text-sm text-ridauto-primary hover:text-ridauto-accent"
                    >
                      Limpiar
                    </button>
                  </div>

                  {/* Brand Filter */}
                  <div className="form-group">
                    <label className="form-label">Marca</label>
                    <select
                      value={filters.brand || ''}
                      onChange={(e) => handleFilterChange('brand', e.target.value)}
                      className="form-select"
                    >
                      <option value="">Todas las marcas</option>
                      <option value="audi">Audi</option>
                      <option value="bmw">BMW</option>
                      <option value="mercedes">Mercedes</option>
                      <option value="toyota">Toyota</option>
                      <option value="volkswagen">Volkswagen</option>
                      <option value="hyundai">Hyundai</option>
                      <option value="kia">KIA</option>
                    </select>
                  </div>

                  {/* Price Range */}
                  <div className="form-group">
                    <label className="form-label">Precio</label>
                    <div className="grid grid-2 gap-2">
                      <input
                        type="number"
                        placeholder="Mín €"
                        value={filters.min_price || ''}
                        onChange={(e) => handleFilterChange('min_price', e.target.value)}
                        className="form-input"
                      />
                      <input
                        type="number"
                        placeholder="Máx €"
                        value={filters.max_price || ''}
                        onChange={(e) => handleFilterChange('max_price', e.target.value)}
                        className="form-input"
                      />
                    </div>
                  </div>

                  {/* Year Range */}
                  <div className="form-group">
                    <label className="form-label">Año</label>
                    <div className="grid grid-2 gap-2">
                      <input
                        type="number"
                        placeholder="Desde"
                        min="2000"
                        max="2025"
                        value={filters.min_year || ''}
                        onChange={(e) => handleFilterChange('min_year', e.target.value)}
                        className="form-input"
                      />
                      <input
                        type="number"
                        placeholder="Hasta"
                        min="2000"
                        max="2025"
                        value={filters.max_year || ''}
                        onChange={(e) => handleFilterChange('max_year', e.target.value)}
                        className="form-input"
                      />
                    </div>
                  </div>

                  {/* Fuel Type */}
                  <div className="form-group">
                    <label className="form-label">Combustible</label>
                    <select
                      value={filters.fuel_type || ''}
                      onChange={(e) => handleFilterChange('fuel_type', e.target.value)}
                      className="form-select"
                    >
                      <option value="">Todos</option>
                      <option value="gasolina">Gasolina</option>
                      <option value="diesel">Diesel</option>
                      <option value="hibrido">Híbrido</option>
                      <option value="electrico">Eléctrico</option>
                    </select>
                  </div>

                  {/* Transmission */}
                  <div className="form-group">
                    <label className="form-label">Transmisión</label>
                    <select
                      value={filters.transmission || ''}
                      onChange={(e) => handleFilterChange('transmission', e.target.value)}
                      className="form-select"
                    >
                      <option value="">Todas</option>
                      <option value="manual">Manual</option>
                      <option value="automatico">Automático</option>
                    </select>
                  </div>

                  {/* Vehicle Type */}
                  <div className="form-group">
                    <label className="form-label">Tipo</label>
                    <select
                      value={filters.vehicle_type || ''}
                      onChange={(e) => handleFilterChange('vehicle_type', e.target.value)}
                      className="form-select"
                    >
                      <option value="">Todos</option>
                      <option value="nuevo">Nuevo</option>
                      <option value="ocasion">Ocasión</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-3">
              {/* Results Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
                <p className="body-regular text-gray-500">
                  {vehicles.length} vehículos encontrados
                </p>

                {/* Sort Options */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSortChange('price')}
                    className={`btn btn-sm ${
                      sortBy === 'price' ? 'btn-primary' : 'btn-secondary'
                    }`}
                  >
                    Precio {sortBy === 'price' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </button>
                  <button
                    onClick={() => handleSortChange('year')}
                    className={`btn btn-sm ${
                      sortBy === 'year' ? 'btn-primary' : 'btn-secondary'
                    }`}
                  >
                    Año {sortBy === 'year' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </button>
                  <button
                    onClick={() => handleSortChange('kilometers')}
                    className={`btn btn-sm ${
                      sortBy === 'kilometers' ? 'btn-primary' : 'btn-secondary'
                    }`}
                  >
                    Km {sortBy === 'kilometers' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </button>
                </div>
              </div>

              {/* Error State */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
                  <p className="text-red-600">{error}</p>
                </div>
              )}

              {/* Loading State */}
              {loading && vehicles.length === 0 && (
                <SectionLoading message="Cargando vehículos..." />
              )}

              {/* Empty State */}
              {!loading && vehicles.length === 0 && !error && (
                <div className="text-center py-16">
                  <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="heading-4 mb-2">No se encontraron vehículos</h3>
                  <p className="body-regular text-gray-500 mb-4">
                    Intenta ajustar tus filtros de búsqueda
                  </p>
                  <button onClick={clearFilters} className="btn btn-primary">
                    Limpiar Filtros
                  </button>
                </div>
              )}

              {/* Vehicles Grid */}
              {vehicles.length > 0 && (
                <>
                  <div className="grid grid-1 md:grid-2 xl:grid-3 gap-8">
                    {vehicles.map((vehicle) => (
                      <VehicleCard key={vehicle.id} vehicle={vehicle} />
                    ))}
                  </div>

                  {/* Load More */}
                  {hasMore && (
                    <div className="text-center mt-12">
                      {loading ? (
                        <InlineLoading message="Cargando más vehículos..." />
                      ) : (
                        <button
                          onClick={loadMore}
                          className="btn btn-lg btn-primary hover-lift"
                        >
                          Cargar Más Vehículos
                        </button>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default VehiclesPage;