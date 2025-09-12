import React from 'react';
import PageLayout from '../components/Layout/PageLayout';

const ServicesPage = () => {
  return (
    <PageLayout>
      <section className="section">
        <div className="container">
          <div className="text-center mb-16">
            <h1 className="heading-1 mb-4">Nuestros Servicios</h1>
            <p className="body-large max-w-2xl mx-auto">
              Ofrecemos una gama completa de servicios para cubrir todas tus necesidades automovilísticas
            </p>
          </div>

          <div className="grid grid-1 md:grid-2 gap-8 mb-16">
            <div className="card card-content">
              <div className="w-12 h-12 bg-ridauto-primary rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="heading-4 mb-3">Compra y Venta</h3>
              <p className="body-regular">
                Amplia selección de vehículos nuevos y de ocasión de todas las marcas. 
                También compramos tu vehículo actual al mejor precio del mercado.
              </p>
            </div>

            <div className="card card-content">
              <div className="w-12 h-12 bg-ridauto-accent rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="heading-4 mb-3">Financiación</h3>
              <p className="body-regular">
                Ofrecemos las mejores condiciones de financiación adaptadas a tu situación. 
                Planes personalizados con las entidades financieras más importantes.
              </p>
            </div>

            <div className="card card-content">
              <div className="w-12 h-12 bg-ridauto-success rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="heading-4 mb-3">Garantía Extendida</h3>
              <p className="body-regular">
                Todos nuestros vehículos incluyen garantía nacional de 12 meses, 
                ampliable hasta 24 meses para tu mayor tranquilidad.
              </p>
            </div>

            <div className="card card-content">
              <div className="w-12 h-12 bg-ridauto-warning rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="heading-4 mb-3">Tasación Gratuita</h3>
              <p className="body-regular">
                Realizamos tasaciones gratuitas de tu vehículo actual. 
                Valoración profesional al mejor precio del mercado.
              </p>
            </div>

            <div className="card card-content">
              <div className="w-12 h-12 bg-ridauto-primary rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="heading-4 mb-3">Mantenimiento</h3>
              <p className="body-regular">
                Servicio técnico especializado con personal cualificado. 
                Mantenimiento preventivo y correctivo de todas las marcas.
              </p>
            </div>

            <div className="card card-content">
              <div className="w-12 h-12 bg-ridauto-accent rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11" />
                </svg>
              </div>
              <h3 className="heading-4 mb-3">Seguros</h3>
              <p className="body-regular">
                Gestionamos tu seguro del automóvil con las mejores compañías. 
                Comparamos precios para ofrecerte la mejor opción.
              </p>
            </div>
          </div>

          <div className="bg-ridauto-primary text-white rounded-lg p-8 text-center">
            <h2 className="heading-2 mb-4">¿Necesitas Más Información?</h2>
            <p className="body-large mb-6">
              Nuestro equipo de profesionales está aquí para ayudarte con cualquier consulta
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contacto" className="btn btn-lg btn-accent">
                Contactar Ahora
              </a>
              <a href="tel:+34954123456" className="btn btn-lg btn-secondary">
                Llamar: +34 954 123 456
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ServicesPage;