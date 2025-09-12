import React from 'react';
import PageLayout from '../components/Layout/PageLayout';

const AboutPage = () => {
  return (
    <PageLayout>
      <section className="section">
        <div className="container">
          <div className="text-center mb-16">
            <h1 className="heading-1 mb-4">Sobre Ridauto Motor</h1>
            <p className="body-large max-w-2xl mx-auto">
              Con más de 25 años de experiencia, somos tu concesionario de confianza en Camas, Sevilla
            </p>
          </div>

          <div className="grid grid-1 lg:grid-2 gap-12 items-center mb-16">
            <div>
              <h2 className="heading-2 mb-6">Nuestra Historia</h2>
              <p className="body-regular mb-4">
                Desde 1998, Ridauto Motor ha sido el referente en compra y venta de vehículos 
                en la zona de Sevilla. Lo que comenzó como un pequeño negocio familiar ha 
                crecido hasta convertirse en uno de los concesionarios más respetados de la región.
              </p>
              <p className="body-regular mb-4">
                Nuestra pasión por los automóviles y nuestro compromiso con la excelencia en 
                el servicio al cliente nos han permitido construir relaciones duraderas con 
                miles de clientes satisfechos a lo largo de los años.
              </p>
              <p className="body-regular">
                Hoy, como Agente Oficial de HYUNDAI en Camas, continuamos ofreciendo la misma 
                dedicación y profesionalidad que nos ha caracterizado desde nuestros inicios.
              </p>
            </div>
            <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
              <span className="text-gray-500">Imagen del concesionario</span>
            </div>
          </div>

          <div className="grid grid-1 md:grid-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-ridauto-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">25+</span>
              </div>
              <h3 className="heading-4 mb-2">Años de Experiencia</h3>
              <p className="body-regular">
                Más de dos décadas dedicados al sector automovilístico
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-ridauto-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">500+</span>
              </div>
              <h3 className="heading-4 mb-2">Vehículos Vendidos</h3>
              <p className="body-regular">
                Cientos de clientes satisfechos cada año
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-ridauto-success rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">100%</span>
              </div>
              <h3 className="heading-4 mb-2">Garantía de Calidad</h3>
              <p className="body-regular">
                Todos nuestros vehículos con garantía nacional
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="heading-2 mb-6 text-center">Nuestros Valores</h2>
            <div className="grid grid-1 md:grid-2 gap-8">
              <div>
                <h3 className="heading-4 mb-3">Confianza</h3>
                <p className="body-regular">
                  La confianza es la base de nuestra relación con los clientes. 
                  Trabajamos con transparencia y honestidad en cada transacción.
                </p>
              </div>
              <div>
                <h3 className="heading-4 mb-3">Experiencia</h3>
                <p className="body-regular">
                  Nuestro equipo cuenta con décadas de experiencia en el sector, 
                  lo que nos permite ofrecer el mejor asesoramiento.
                </p>
              </div>
              <div>
                <h3 className="heading-4 mb-3">Calidad</h3>
                <p className="body-regular">
                  Seleccionamos cuidadosamente cada vehículo de nuestro stock para 
                  garantizar la máxima calidad y satisfacción del cliente.
                </p>
              </div>
              <div>
                <h3 className="heading-4 mb-3">Servicio</h3>
                <p className="body-regular">
                  Nuestro compromiso no termina con la venta. Ofrecemos un servicio 
                  integral que incluye mantenimiento y postventa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default AboutPage;