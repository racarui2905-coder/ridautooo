import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner, { InlineLoading } from '../../components/LoadingSpinner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Admin Dashboard Component
const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await axios.get(`${API}/dashboard/stats`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setStats(response.data);
      } catch (error) {
        console.error('Error loading stats:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return <InlineLoading message="Cargando estadísticas..." />;
  }

  return (
    <div>
      <h1 className="heading-2 mb-6">Panel de Administración</h1>
      <div className="grid grid-1 md:grid-3 gap-6">
        <div className="card card-content text-center">
          <h3 className="heading-4 mb-2">Vehículos</h3>
          <p className="text-3xl font-bold text-ridauto-primary mb-2">
            {stats?.total_vehicles || 0}
          </p>
          <p className="text-gray-600">Total en stock</p>
        </div>
        <div className="card card-content text-center">
          <h3 className="heading-4 mb-2">Disponibles</h3>
          <p className="text-3xl font-bold text-ridauto-success mb-2">
            {stats?.available_vehicles || 0}
          </p>
          <p className="text-gray-600">Para la venta</p>
        </div>
        <div className="card card-content text-center">
          <h3 className="heading-4 mb-2">Vendidos</h3>
          <p className="text-3xl font-bold text-ridauto-accent mb-2">
            {stats?.sold_vehicles || 0}
          </p>
          <p className="text-gray-600">Este mes</p>
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="heading-3 mb-4">Acciones Rápidas</h2>
        <div className="grid grid-1 md:grid-2 gap-4">
          <Link to="/admin/vehicles" className="card card-content hover-lift">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-ridauto-primary rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <div>
                <h3 className="heading-4">Gestionar Vehículos</h3>
                <p className="text-gray-600">Añadir, editar y eliminar vehículos</p>
              </div>
            </div>
          </Link>
          
          <Link to="/admin/messages" className="card card-content hover-lift">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-ridauto-accent rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <h3 className="heading-4">Ver Mensajes</h3>
                <p className="text-gray-600">Consultas de clientes</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

// Admin Vehicles Component
const AdminVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        const response = await axios.get(`${API}/vehicles?limit=50`);
        setVehicles(response.data);
      } catch (error) {
        console.error('Error loading vehicles:', error);
        setError('Error al cargar los vehículos');
      } finally {
        setLoading(false);
      }
    };

    loadVehicles();
  }, []);

  const handleStatusChange = async (vehicleId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${API}/vehicles/${vehicleId}`,
        { status: newStatus },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      setVehicles(vehicles.map(vehicle => 
        vehicle.id === vehicleId 
          ? { ...vehicle, status: newStatus }
          : vehicle
      ));
    } catch (error) {
      console.error('Error updating vehicle status:', error);
      alert('Error al actualizar el estado del vehículo');
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  if (loading) {
    return <InlineLoading message="Cargando vehículos..." />;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="heading-2">Gestión de Vehículos</h1>
        <div className="text-sm text-gray-600">
          Total: {vehicles.length} vehículos
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      <div className="card card-content">
        {vehicles.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No hay vehículos registrados</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold">Vehículo</th>
                  <th className="text-left py-3 px-4 font-semibold">Precio</th>
                  <th className="text-left py-3 px-4 font-semibold">Año</th>
                  <th className="text-left py-3 px-4 font-semibold">Km</th>
                  <th className="text-left py-3 px-4 font-semibold">Estado</th>
                  <th className="text-left py-3 px-4 font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map((vehicle) => (
                  <tr key={vehicle.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        {vehicle.images && vehicle.images.length > 0 && (
                          <img
                            src={`${BACKEND_URL}${vehicle.images[0].url}`}
                            alt={`${vehicle.brand} ${vehicle.model}`}
                            className="w-12 h-12 rounded object-cover"
                          />
                        )}
                        <div>
                          <p className="font-semibold">{vehicle.brand} {vehicle.model}</p>
                          <p className="text-sm text-gray-600">{vehicle.version}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-semibold">
                      {formatPrice(vehicle.price)}
                    </td>
                    <td className="py-3 px-4">{vehicle.year}</td>
                    <td className="py-3 px-4">
                      {vehicle.kilometers.toLocaleString()} km
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={vehicle.status}
                        onChange={(e) => handleStatusChange(vehicle.id, e.target.value)}
                        className={`px-2 py-1 rounded text-sm border ${
                          vehicle.status === 'available' 
                            ? 'bg-green-100 text-green-800 border-green-300'
                            : vehicle.status === 'sold'
                            ? 'bg-red-100 text-red-800 border-red-300'
                            : 'bg-gray-100 text-gray-800 border-gray-300'
                        }`}
                      >
                        <option value="available">Disponible</option>
                        <option value="sold">Vendido</option>
                        <option value="hidden">Oculto</option>
                      </select>
                    </td>
                    <td className="py-3 px-4">
                      <a
                        href={`/vehiculos/${vehicle.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-ridauto-primary hover:text-ridauto-accent text-sm"
                      >
                        Ver Detalles →
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

// Admin Messages Component
const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API}/contacts`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setMessages(response.data);
      } catch (error) {
        console.error('Error loading messages:', error);
        setError('Error al cargar los mensajes');
      } finally {
        setLoading(false);
      }
    };

    loadMessages();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return <InlineLoading message="Cargando mensajes..." />;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="heading-2">Mensajes de Contacto</h1>
        <div className="text-sm text-gray-600">
          Total: {messages.length} mensajes
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      <div className="space-y-4">
        {messages.length === 0 ? (
          <div className="card card-content text-center py-8">
            <p className="text-gray-500">No hay mensajes de contacto</p>
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className="card card-content">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="heading-4 mb-1">{message.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{message.email}</span>
                    {message.phone && <span>{message.phone}</span>}
                    <span>{formatDate(message.created_at)}</span>
                  </div>
                </div>
              </div>
              
              {message.vehicle_interest && (
                <div className="mb-3">
                  <span className="text-sm font-semibold text-ridauto-primary">
                    Vehículo de interés: {message.vehicle_interest}
                  </span>
                </div>
              )}
              
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 whitespace-pre-wrap">{message.message}</p>
              </div>
              
              <div className="mt-4 flex gap-2">
                <a
                  href={`mailto:${message.email}?subject=Re: Consulta sobre vehículo`}
                  className="btn btn-sm btn-primary"
                >
                  Responder por Email
                </a>
                {message.phone && (
                  <a
                    href={`tel:${message.phone}`}
                    className="btn btn-sm btn-secondary"
                  >
                    Llamar
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

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