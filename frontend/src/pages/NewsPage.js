import React from 'react';
import PageLayout from '../components/Layout/PageLayout';

const NewsPage = () => {
  return (
    <PageLayout>
      <section className="section">
        <div className="container">
          <div className="text-center mb-16">
            <h1 className="heading-1 mb-4">Noticias y Novedades</h1>
            <p className="body-large">
              Mantente al día de las últimas noticias del sector automovilístico
            </p>
          </div>

          <div className="text-center py-16">
            <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-6-3a2 2 0 00-2 2v1H5" />
            </svg>
            <h3 className="heading-4 mb-2">Próximamente</h3>
            <p className="body-regular text-gray-500">
              Estamos preparando contenido interesante para ti. Vuelve pronto para ver las últimas noticias.
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default NewsPage;