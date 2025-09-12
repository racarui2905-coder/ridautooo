import React from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/LoadingSpinner';

// Admin components (we'll create basic ones)
const AdminDashboard = () => (
  <div>
    <h1 className="heading-2 mb-6">Panel de Administración</h1>
    <div className="grid grid-1 md:grid-3 gap-6">
      <div className="card card-content text-center">
        <h3 className="heading-4 mb-2">Vehículos</h3>
        <p className="text-3xl font-bold text-ridauto-primary mb-2">--</p>
        <p className="text-gray-600">Total en stock</p>
      </div>
      <div className="card card-content text-center">
        <h3 className="heading-4 mb-2">Mensajes</h3>
        <p className="text-3xl font-bold text-ridauto-accent mb-2">--</p>
        <p className="text-gray-600">Sin leer</p>
      </div>
      <div className="card card-content text-center">
        <h3 className="heading-4 mb-2">Ventas</h3>
        <p className="text-3xl font-bold text-ridauto-success mb-2">--</p>
        <p className="text-gray-600">Este mes</p>
      </div>
    </div>
  </div>
);

const AdminVehicles = () => (
  <div>
    <h1 className="heading-2 mb-6">Gestión de Vehículos</h1>
    <div className="card card-content">
      <p className="text-center py-8 text-gray-500">
        Funcionalidad en desarrollo. Aquí podrás gestionar todos los vehículos, 
        subir imágenes y actualizar información.
      </p>
    </div>
  </div>
);

const AdminMessages = () => (
  <div>
    <h1 className="heading-2 mb-6">Mensajes de Contacto</h1>
    <div className="card card-content">
      <p className="text-center py-8 text-gray-500">
        Aquí aparecerán todos los mensajes de contacto recibidos a través del formulario web.
      </p>
    </div>
  </div>
);

const AdminLayout = () => {
  const { user, loading, logout, isAdmin } = useAuth();

  if (loading) {
    return <LoadingSpinner size="large" />;
  }

  if (!user || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">
              Ridauto Motor - Admin
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">Hola, {user.username}</span>
              <button
                onClick={logout}
                className="btn btn-sm btn-secondary"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-white shadow-sm min-h-screen">
          <div className="p-6">
            <ul className="space-y-2">
              <li>
                <Link
                  to="/admin"
                  className="block px-4 py-2 text-gray-700 rounded hover:bg-gray-100"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/vehicles"
                  className="block px-4 py-2 text-gray-700 rounded hover:bg-gray-100"
                >
                  Vehículos
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/messages"
                  className="block px-4 py-2 text-gray-700 rounded hover:bg-gray-100"
                >
                  Mensajes
                </Link>
              </li>
              <li>
                <a
                  href="/"
                  className="block px-4 py-2 text-gray-700 rounded hover:bg-gray-100"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver Sitio Web
                </a>
              </li>
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Routes>
            <Route index element={<AdminDashboard />} />
            <Route path="vehicles" element={<AdminVehicles />} />
            <Route path="messages" element={<AdminMessages />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;