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