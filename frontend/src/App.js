import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import './App.css';
import i18n from './i18n';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';

// Page components - lazy loaded for better performance
const HomePage = React.lazy(() => import('./pages/HomePage'));
const VehiclesPage = React.lazy(() => import('./pages/VehiclesPage'));
const VehicleDetailPage = React.lazy(() => import('./pages/VehicleDetailPage'));
const NewsPage = React.lazy(() => import('./pages/NewsPage'));
const NewsDetailPage = React.lazy(() => import('./pages/NewsDetailPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const ServicesPage = React.lazy(() => import('./pages/ServicesPage'));
const FinancingPage = React.lazy(() => import('./pages/FinancingPage'));
const AdminLayout = React.lazy(() => import('./pages/admin/AdminLayout'));
const AdminLogin = React.lazy(() => import('./pages/admin/AdminLogin'));

// Context providers
import { AuthProvider } from './context/AuthContext';
import { VehicleProvider } from './context/VehicleContext';

function App() {
  return (
    <ErrorBoundary>
      <I18nextProvider i18n={i18n}>
        <AuthProvider>
          <VehicleProvider>
            <Router>
              <div className="App">
                <Suspense fallback={<LoadingSpinner />}>
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/vehiculos" element={<VehiclesPage />} />
                    <Route path="/vehiculos/:slug" element={<VehicleDetailPage />} />
                    <Route path="/noticias" element={<NewsPage />} />
                    <Route path="/noticias/:id" element={<NewsDetailPage />} />
                    <Route path="/contacto" element={<ContactPage />} />
                    <Route path="/nosotros" element={<AboutPage />} />
                    <Route path="/servicios" element={<ServicesPage />} />
                    <Route path="/financiacion" element={<FinancingPage />} />
                    
                    {/* Admin Routes */}
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/admin/*" element={<AdminLayout />} />
                  </Routes>
                </Suspense>
              </div>
            </Router>
          </VehicleProvider>
        </AuthProvider>
      </I18nextProvider>
    </ErrorBoundary>
  );
}

export default App;