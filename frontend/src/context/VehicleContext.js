import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const VehicleContext = createContext();

export const useVehicles = () => {
  const context = useContext(VehicleContext);
  if (!context) {
    throw new Error('useVehicles must be used within a VehicleProvider');
  }
  return context;
};

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const VehicleProvider = ({ children }) => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    brand: '',
    min_price: '',
    max_price: '',
    min_year: '',
    max_year: '',
    fuel_type: '',
    transmission: '',
    vehicle_type: '',
    status: 'available'
  });
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchVehicles = async (reset = false, customFilters = null, customSort = null) => {
    try {
      setLoading(true);
      setError(null);

      const activeFilters = customFilters || filters;
      const activeSortBy = customSort?.sortBy || sortBy;
      const activeSortOrder = customSort?.sortOrder || sortOrder;
      
      const params = {
        skip: reset ? 0 : currentPage * 20,
        limit: 20,
        sort_by: activeSortBy,
        sort_order: activeSortOrder
      };

      // Add filters to params
      Object.keys(activeFilters).forEach(key => {
        if (activeFilters[key] && activeFilters[key] !== '') {
          params[key] = activeFilters[key];
        }
      });

      const response = await axios.get(`${API}/vehicles`, { params });
      const newVehicles = response.data;

      if (reset) {
        setVehicles(newVehicles);
        setCurrentPage(1);
      } else {
        setVehicles(prev => [...prev, ...newVehicles]);
        setCurrentPage(prev => prev + 1);
      }

      setHasMore(newVehicles.length === 20);
    } catch (err) {
      console.error('Error fetching vehicles:', err);
      setError(err.response?.data?.detail || 'Error loading vehicles');
    } finally {
      setLoading(false);
    }
  };

  const fetchVehicleBySlug = async (slug) => {
    try {
      const response = await axios.get(`${API}/vehicles/${slug}`);
      return response.data;
    } catch (err) {
      console.error('Error fetching vehicle:', err);
      throw new Error(err.response?.data?.detail || 'Vehicle not found');
    }
  };

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(0);
    fetchVehicles(true, { ...filters, ...newFilters });
  };

  const updateSort = (newSortBy, newSortOrder = 'desc') => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    setCurrentPage(0);
    fetchVehicles(true, filters, { sortBy: newSortBy, sortOrder: newSortOrder });
  };

  const resetFilters = () => {
    const defaultFilters = {
      brand: '',
      min_price: '',
      max_price: '',
      min_year: '',
      max_year: '',
      fuel_type: '',
      transmission: '',
      vehicle_type: '',
      status: 'available'
    };
    setFilters(defaultFilters);
    setCurrentPage(0);
    fetchVehicles(true, defaultFilters);
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      fetchVehicles(false);
    }
  };

  // Load initial vehicles
  useEffect(() => {
    fetchVehicles(true);
  }, []);

  const value = {
    vehicles,
    loading,
    error,
    filters,
    sortBy,
    sortOrder,
    hasMore,
    fetchVehicles,
    fetchVehicleBySlug,
    updateFilters,
    updateSort,
    resetFilters,
    loadMore,
    refresh: () => fetchVehicles(true)
  };

  return (
    <VehicleContext.Provider value={value}>
      {children}
    </VehicleContext.Provider>
  );
};