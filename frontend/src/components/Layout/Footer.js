import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Company Info */}
          <div className="footer-section">
            <h3>Ridauto Motor</h3>
            <p>
              Con más de 25 años de experiencia en la venta de automóviles, 
              somos tu concesionario de confianza en Camas, Sevilla.
            </p>
            <div className="mt-4">
              <p><strong>Dirección:</strong></p>
              <p>Calle de La Sta. Cruz, 13</p>
              <p>41900 Camas, Sevilla</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3>Enlaces Rápidos</h3>
            <Link to="/vehiculos">Vehículos</Link>
            <Link to="/servicios">Servicios</Link>
            <Link to="/financiacion">Financiación</Link>
            <Link to="/nosotros">Nosotros</Link>
            <Link to="/contacto">Contacto</Link>
          </div>

          {/* Services */}
          <div className="footer-section">
            <h3>Nuestros Servicios</h3>
            <a href="/servicios#compra-venta">Compra y Venta</a>
            <a href="/servicios#financiacion">Financiación</a>
            <a href="/servicios#tasacion">Tasación</a>
            <a href="/servicios#garantia">Garantía</a>
            <a href="/servicios#mantenimiento">Mantenimiento</a>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h3>Contacto</h3>
            <p><strong>Teléfono:</strong></p>
            <a href="tel:+34954123456">+34 954 123 456</a>
            
            <p className="mt-2"><strong>Email:</strong></p>
            <a href="mailto:info@ridautomotor.com">info@ridautomotor.com</a>
            
            <p className="mt-2"><strong>Horario:</strong></p>
            <p>Lun - Vie: 9:00 - 19:00</p>
            <p>Sab: 9:00 - 14:00</p>
            <p>Dom: Cerrado</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 Ridauto Motor. Todos los derechos reservados.</p>
          <div className="flex gap-6 mt-4 justify-center">
            <Link to="/legal/privacidad" className="text-gray-400 hover:text-ridauto-accent">
              Política de Privacidad
            </Link>
            <Link to="/legal/cookies" className="text-gray-400 hover:text-ridauto-accent">
              Política de Cookies
            </Link>
            <Link to="/legal/terminos" className="text-gray-400 hover:text-ridauto-accent">
              Términos y Condiciones
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;