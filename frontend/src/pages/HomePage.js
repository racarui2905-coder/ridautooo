import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageLayout from '../components/Layout/PageLayout';
import Typewriter from '../components/Typewriter';
import VehicleCard from '../components/VehicleCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { useVehicles } from '../context/VehicleContext';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const HomePage = () => {
  const { t } = useTranslation();
  const { vehicles, loading: vehiclesLoading } = useVehicles();
  const [testimonials, setTestimonials] = useState([]);
  const [news, setNews] = useState([]);
  const [stats, setStats] = useState(null);

  // Get featured vehicles (first 6)
  const featuredVehicles = vehicles.slice(0, 6);

  useEffect(() => {
    // Load testimonials
    const loadTestimonials = async () => {
      try {
        const response = await axios.get(`${API}/testimonials`);
        setTestimonials(response.data.slice(0, 6)); // Get first 6
      } catch (error) {
        console.error('Error loading testimonials:', error);
      }
    };

    // Load latest news
    const loadNews = async () => {
      try {
        const response = await axios.get(`${API}/news?limit=3`);
        setNews(response.data);
      } catch (error) {
        console.error('Error loading news:', error);
      }
    };

    loadTestimonials();
    loadNews();
  }, []);

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content fade-in">
          <h1 className="hero-title">
            <Typewriter />
          </h1>
          <p className="hero-subtitle">
            {t('hero.subtitle')}
          </p>
          <Link to="/vehiculos" className="btn btn-lg btn-accent hover-lift">
            {t('hero.cta')}
          </Link>
        </div>
        
        {/* Background overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      </section>

      {/* Services Section */}
      <section className="section bg-gray-50 dark:bg-gray-800">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4 text-gray-900 dark:text-gray-100">¿Por qué elegir Ridauto Motor?</h2>
            <p className="body-large max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              Con más de 25 años de experiencia, ofrecemos el mejor servicio en compra y venta de vehículos
            </p>
          </div>

          <div className="grid grid-4 gap-8">
            <div className="text-center card card-content hover-lift bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
              <div className="w-16 h-16 bg-ridauto-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="heading-4 mb-3 text-gray-900 dark:text-gray-100">Todas las Marcas</h3>
              <p className="body-regular text-gray-600 dark:text-gray-300">
                Disponemos de una extensa flota de vehículos de todas las marcas. 
                Entrega en cualquier punto del país.
              </p>
            </div>

            <div className="text-center card card-content hover-lift bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
              <div className="w-16 h-16 bg-ridauto-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="heading-4 mb-3 text-gray-900 dark:text-gray-100">Asesoramiento</h3>
              <p className="body-regular text-gray-600 dark:text-gray-300">
                Te asesoramos personalmente en la compra de tu nuevo coche. 
                Experiencia y confianza garantizadas.
              </p>
            </div>

            <div className="text-center card card-content hover-lift bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
              <div className="w-16 h-16 bg-ridauto-success rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="heading-4 mb-3 text-gray-900 dark:text-gray-100">Garantía</h3>
              <p className="body-regular text-gray-600 dark:text-gray-300">
                Garantía, seriedad y confianza. Disponibilidad de mantenimientos 
                de nuestros vehículos.
              </p>
            </div>

            <div className="text-center card card-content hover-lift bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
              <div className="w-16 h-16 bg-ridauto-warning rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="heading-4 mb-3 text-gray-900 dark:text-gray-100">Financiación</h3>
              <p className="body-regular text-gray-600 dark:text-gray-300">
                Financiación a tu medida. Ofrecemos las mejores condiciones 
                del mercado adaptadas a tus necesidades.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Vehicles */}
      <section className="section bg-white dark:bg-gray-900">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4 text-gray-900 dark:text-gray-100">Vehículos Destacados</h2>
            <p className="body-large text-gray-600 dark:text-gray-300">
              Descubre nuestra selección de vehículos más populares
            </p>
          </div>

          {vehiclesLoading ? (
            <LoadingSpinner size="large" />
          ) : (
            <div className="grid grid-3 gap-8">
              {featuredVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/vehiculos" className="btn btn-lg btn-primary hover-lift">
              Ver Todos los Vehículos
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="section bg-gray-50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="heading-2 mb-4">Lo que Dicen Nuestros Clientes</h2>
              <p className="body-large">
                La confianza de nuestros clientes es nuestra mejor garantía
              </p>
            </div>

            <div className="grid grid-3 gap-8">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="card card-content text-center">
                  <div className="flex justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="body-regular mb-4 italic">"{testimonial.content}"</p>
                  <p className="font-semibold text-ridauto-primary">{testimonial.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest News */}
      {news.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="heading-2 mb-4">Últimas Noticias</h2>
              <p className="body-large">
                Mantente al día de las últimas novedades del sector
              </p>
            </div>

            <div className="grid grid-3 gap-8">
              {news.map((article) => (
                <article key={article.id} className="card hover-lift">
                  {article.image_url && (
                    <div className="card-image">
                      <img 
                        src={article.image_url} 
                        alt={article.title}
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="card-content">
                    <h3 className="heading-4 mb-3">
                      <Link 
                        to={`/noticias/${article.id}`}
                        className="text-gray-900 hover:text-ridauto-primary"
                      >
                        {article.title}
                      </Link>
                    </h3>
                    <p className="body-regular mb-4">{article.excerpt}</p>
                    <Link 
                      to={`/noticias/${article.id}`}
                      className="text-ridauto-primary font-semibold hover:text-ridauto-accent"
                    >
                      Leer más →
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link to="/noticias" className="btn btn-lg btn-secondary hover-lift">
                Ver Todas las Noticias
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Contact CTA */}
      <section className="section bg-ridauto-primary text-white">
        <div className="container text-center">
          <h2 className="heading-2 mb-4">¿Listo para Encontrar tu Próximo Coche?</h2>
          <p className="body-large mb-8 max-w-2xl mx-auto">
            Contacta con nosotros y te ayudaremos a encontrar el vehículo perfecto 
            para ti con las mejores condiciones de financiación.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contacto" className="btn btn-lg btn-accent hover-lift">
              Contactar Ahora
            </Link>
            <a href="tel:+34954123456" className="btn btn-lg btn-secondary hover-lift">
              Llamar: +34 954 123 456
            </a>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default HomePage;