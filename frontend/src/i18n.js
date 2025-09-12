import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  es: {
    translation: {
      // Navigation
      nav: {
        home: 'Inicio',
        vehicles: 'Vehículos',
        news: 'Noticias',
        services: 'Servicios',
        financing: 'Financiación',
        contact: 'Contacto',
        about: 'Nosotros'
      },
      // Hero section
      hero: {
        typewriter: {
          prefix: 'Los mejores coches para',
          words: ['familias', 'jóvenes', 'profesionales', 'aventureros', 'tu estilo de vida']
        },
        subtitle: 'Con más de 25 años de experiencia en el sector automovilístico',
        cta: 'Ver Catálogo'
      },
      // Vehicles
      vehicles: {
        title: 'Nuestros Vehículos',
        filters: {
          brand: 'Marca',
          priceRange: 'Rango de Precio',
          year: 'Año',
          fuelType: 'Combustible',
          transmission: 'Transmisión',
          type: 'Tipo'
        },
        sort: {
          default: 'Por defecto',
          price: 'Precio',
          year: 'Año',
          kilometers: 'Kilómetros',
          newest: 'Más recientes'
        },
        status: {
          available: 'Disponible',
          sold: 'Vendido',
          hidden: 'Oculto'
        },
        details: {
          year: 'Año',
          kilometers: 'Kilómetros',
          fuel: 'Combustible',
          transmission: 'Transmisión',
          power: 'Potencia',
          doors: 'Puertas',
          seats: 'Plazas',
          warranty: 'Garantía'
        },
        actions: {
          viewDetails: 'Ver Detalles',
          requestInfo: 'Solicitar Información',
          compare: 'Comparar'
        }
      },
      // Contact
      contact: {
        title: 'Contacta con Nosotros',
        form: {
          name: 'Nombre',
          email: 'Email',
          phone: 'Teléfono',
          message: 'Mensaje',
          vehicleInterest: 'Vehículo de Interés',
          send: 'Enviar Mensaje'
        }
      },
      // Common
      common: {
        loading: 'Cargando...',
        error: 'Error',
        success: 'Éxito',
        save: 'Guardar',
        cancel: 'Cancelar',
        delete: 'Eliminar',
        edit: 'Editar',
        view: 'Ver',
        search: 'Buscar',
        filter: 'Filtrar',
        clear: 'Limpiar',
        all: 'Todos',
        none: 'Ninguno'
      }
    }
  },
  en: {
    translation: {
      // Navigation
      nav: {
        home: 'Home',
        vehicles: 'Vehicles',
        news: 'News',
        services: 'Services',
        financing: 'Financing',
        contact: 'Contact',
        about: 'About Us'
      },
      // Hero section
      hero: {
        typewriter: {
          prefix: 'The best cars for',
          words: ['families', 'young people', 'professionals', 'adventurers', 'your lifestyle']
        },
        subtitle: 'With over 25 years of experience in the automotive sector',
        cta: 'View Catalog'
      },
      // Vehicles
      vehicles: {
        title: 'Our Vehicles',
        filters: {
          brand: 'Brand',
          priceRange: 'Price Range',
          year: 'Year',
          fuelType: 'Fuel Type',
          transmission: 'Transmission',
          type: 'Type'
        },
        sort: {
          default: 'Default',
          price: 'Price',
          year: 'Year',
          kilometers: 'Kilometers',
          newest: 'Newest'
        },
        status: {
          available: 'Available',
          sold: 'Sold',
          hidden: 'Hidden'
        },
        details: {
          year: 'Year',
          kilometers: 'Kilometers',
          fuel: 'Fuel',
          transmission: 'Transmission',
          power: 'Power',
          doors: 'Doors',
          seats: 'Seats',
          warranty: 'Warranty'
        },
        actions: {
          viewDetails: 'View Details',
          requestInfo: 'Request Information',
          compare: 'Compare'
        }
      },
      // Contact
      contact: {
        title: 'Contact Us',
        form: {
          name: 'Name',
          email: 'Email',
          phone: 'Phone',
          message: 'Message',
          vehicleInterest: 'Vehicle of Interest',
          send: 'Send Message'
        }
      },
      // Common
      common: {
        loading: 'Loading...',
        error: 'Error',
        success: 'Success',
        save: 'Save',
        cancel: 'Cancel',
        delete: 'Delete',
        edit: 'Edit',
        view: 'View',
        search: 'Search',
        filter: 'Filter',
        clear: 'Clear',
        all: 'All',
        none: 'None'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'es',
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;