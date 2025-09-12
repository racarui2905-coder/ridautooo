import React from 'react';
import PageLayout from '../components/Layout/PageLayout';

const ContactPage = () => {
  return (
    <PageLayout>
      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h1 className="heading-1 mb-4">Contacta con Nosotros</h1>
            <p className="body-large">
              Estamos aquí para ayudarte a encontrar tu vehículo perfecto
            </p>
          </div>

          <div className="grid grid-1 lg:grid-2 gap-12">
            <div>
              <h2 className="heading-3 mb-6">Información de Contacto</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-ridauto-primary mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <h3 className="font-semibold mb-1">Dirección</h3>
                    <p className="text-gray-600">
                      Calle de La Sta. Cruz, 13<br />
                      41900 Camas, Sevilla
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-ridauto-primary mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <h3 className="font-semibold mb-1">Teléfono</h3>
                    <a href="tel:+34954123456" className="text-gray-600 hover:text-ridauto-primary">
                      +34 954 123 456
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-ridauto-primary mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a href="mailto:info@ridautomotor.com" className="text-gray-600 hover:text-ridauto-primary">
                      info@ridautomotor.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-ridauto-primary mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="font-semibold mb-1">Horario</h3>
                    <div className="text-gray-600">
                      <p>Lunes - Viernes: 9:00 - 19:00</p>
                      <p>Sábados: 9:00 - 14:00</p>
                      <p>Domingos: Cerrado</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <form className="card card-content">
                <h2 className="heading-3 mb-6">Envíanos un Mensaje</h2>
                
                <div className="form-group">
                  <label className="form-label">Nombre *</label>
                  <input type="text" className="form-input" required />
                </div>

                <div className="form-group">
                  <label className="form-label">Email *</label>
                  <input type="email" className="form-input" required />
                </div>

                <div className="form-group">
                  <label className="form-label">Teléfono</label>
                  <input type="tel" className="form-input" />
                </div>

                <div className="form-group">
                  <label className="form-label">Vehículo de Interés</label>
                  <input type="text" className="form-input" placeholder="Ej: Mercedes Clase A 2020" />
                </div>

                <div className="form-group">
                  <label className="form-label">Mensaje *</label>
                  <textarea className="form-textarea" rows="5" required></textarea>
                </div>

                <button type="submit" className="btn btn-lg btn-primary w-full">
                  Enviar Mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ContactPage;