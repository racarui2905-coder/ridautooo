import React from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '../components/Layout/PageLayout';

const NewsDetailPage = () => {
  const { id } = useParams();

  return (
    <PageLayout>
      <section className="section">
        <div className="container">
          <h1 className="heading-1 mb-4">Artículo de Noticias</h1>
          <p className="body-large">ID del artículo: {id}</p>
          <p className="body-regular mt-4">
            Esta página mostrará el contenido completo del artículo de noticias.
          </p>
        </div>
      </section>
    </PageLayout>
  );
};

export default NewsDetailPage;