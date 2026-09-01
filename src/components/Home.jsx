import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut } from 'lucide-react';
import './Home.css';

const Home = ({ onSelectSport }) => {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard-layout">
      <div className="home-background"></div>
      
      <nav className="navbar" style={{ position: 'relative', zIndex: 10 }}>
        <div className="logo">
          <img src="/logo.webp" alt="Club Logo" style={{ height: '32px', objectFit: 'contain' }} />
          <span>Club</span> Tenis
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
          <h1 className="glass-title">Selecciona tu disciplina</h1>
          
          <div className="sport-cards-container">
            {/* Card Tenis */}
            <div 
              className="sport-card active-card" 
              onClick={() => onSelectSport('tennis')}
            >
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="sport-icon">
                <path d="M16.5 3.5a5.5 5.5 0 0 0-7.8 7.8l-5.4 5.4a2.1 2.1 0 0 0 3 3l5.4-5.4a5.5 5.5 0 0 0 7.8-7.8Z" />
                <path d="m11 13-3 3" />
                <path d="m8 6 6 6" />
                <path d="m14 8-6 6" />
              </svg>
              <h2>Canchas de Tenis</h2>
              <p>Reserva tu cancha para jugar tenis</p>
            </div>

            {/* Card Frontón */}
            <div 
              className="sport-card"
              onClick={() => onSelectSport('fronton')}
            >
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="sport-icon">
                <rect x="7" y="3" width="10" height="12" rx="4" />
                <path d="M10 15v6a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6" />
                <circle cx="16" cy="6" r="1.5" fill="currentColor" />
              </svg>
              <h2>Canchas de Frontón</h2>
              <p>Próximamente disponibles</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
