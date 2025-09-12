import React from 'react';
import PageLayout from '../components/Layout/PageLayout';

const FinancingPage = () => {
  return (
    <PageLayout>
      <section className="section">
        <div className="container">
          <div className="text-center mb-16">
            <h1 className="heading-1 mb-4">Financiación a tu Medida</h1>
            <p className="body-large max-w-2xl mx-auto">
              Ofrecemos las mejores condiciones de financiación para que puedas adquirir tu vehículo ideal
            </p>
          </div>

          <div className="grid grid-1 lg:grid-2 gap-12 mb-16">
            <div>
              <h2 className="heading-2 mb-6">Ventajas de Financiar con Nosotros</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h3 className="font-semibold mb-1">Aprobación Rápida</h3>
                    <p className="text-gray-600">Respuesta en menos de 24 horas</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h3 className="font-semibold mb-1">Sin Entrada</h3>
                    <p className="text-gray-600">Posibilidad de financiar hasta el 100%</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h3 className="font-semibold mb-1">Plazos Flexibles</h3>
                    <p className="text-gray-600">Desde 12 hasta 84 meses</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h3 className="font-semibold mb-1">TIN Competitivo</h3>
                    <p className="text-gray-600">Las mejores condiciones del mercado</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card card-content">
              <h3 className="heading-4 mb-6">Simulador de Financiación</h3>
              <form className="space-y-4">
                <div className="form-group">
                  <label className="form-label">Precio del Vehículo (€)</label>
                  <input type="number" className="form-input" placeholder="20000" />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Entrada (€)</label>
                  <input type="number" className="form-input" placeholder="5000" />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Plazo (meses)</label>
                  <select className="form-select">
                    <option value="12">12 meses</option>
                    <option value="24">24 meses</option>
                    <option value="36">36 meses</option>
                    <option value="48">48 meses</option>
                    <option value="60">60 meses</option>
                    <option value="72">72 meses</option>
                    <option value="84">84 meses</option>
                  </select>
                </div>
                
                <button type="button" className="btn btn-primary w-full">
                  Calcular Cuota
                </button>
                
                <div className="bg-gray-50 p-4 rounded-lg mt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Cuota mensual estimada:</span>
                    <span className="text-2xl font-bold text-ridauto-primary">€ XXX</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    * Cálculo orientativo. Sujeto a aprobación de la entidad financiera.
                  </p>
                </div>
              </form>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-8 mb-16">
            <h2 className="heading-2 mb-8 text-center">Nuestras Entidades Colaboradoras</h2>
            <div className="grid grid-2 md:grid-4 gap-8 items-center justify-items-center">
              <div className="bg-white p-6 rounded-lg shadow-sm w-full text-center">
                <span className="font-semibold">Banco Santander</span>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm w-full text-center">
                <span className="font-semibold">BBVA</span>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm w-full text-center">
                <span className="font-semibold">CaixaBank</span>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm w-full text-center">
                <span className="font-semibold">Banco Sabadell</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="heading-2 mb-4">¿Listo para Financiar tu Vehículo?</h2>
            <p className="body-large mb-8">
              Contacta con nuestros especialistas en financiación para obtener la mejor oferta
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contacto" className="btn btn-lg btn-primary">
                Solicitar Financiación
              </a>
              <a href="tel:+34954123456" className="btn btn-lg btn-secondary">
                Llamar Ahora
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default FinancingPage;