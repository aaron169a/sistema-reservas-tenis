import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, ArrowLeft, TreePine, Building2 } from 'lucide-react';
import './Home.css'; // Reuse the same CSS

const TenisLocations = ({ onSelectLocation, onBack }) => {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard-layout">
      <div className="home-background"></div>
      
      <nav className="navbar" style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <button className="btn btn-secondary btn-sm" onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ArrowLeft size={16} /> Volver
          </button>
          <div className="logo">
            <img src="/logo.webp" alt="Club Logo" style={{ height: '32px', objectFit: 'contain' }} />
            <span>Club</span> Tenis
          </div>
        </div>
        <div className="user-menu">
          <div className="user-info">
            <span>Hola, {user.name}</span>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={logout}>
            <LogOut size={16} /> Salir
          </button>
        </div>
      </nav>

      <main className="home-container">
        <div className="glass-card">
          <h1 className="glass-title">¿En qué sede jugarás Tenis?</h1>
          
          <div className="sport-cards-container">
            {/* Card Sede Central */}
            <div 
              className="sport-card active-card" 
              onClick={() => onSelectLocation('central')}
            >
              <Building2 size={48} className="sport-icon" />
              <h2>Sede Central</h2>
              <p>Cancha principal exclusiva</p>
            </div>

            {/* Card Sede Campestre */}
            <div 
              className="sport-card active-card" 
              onClick={() => onSelectLocation('campestre')}
            >
              <TreePine size={48} className="sport-icon" />
              <h2>Sede Campestre</h2>
              <p>2 canchas disponibles</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TenisLocations;
