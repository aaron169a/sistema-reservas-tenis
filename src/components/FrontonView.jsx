import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, ArrowLeft } from 'lucide-react';

const FrontonView = ({ onBack }) => {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard-layout">
      <nav className="navbar">
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

      <main className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <div style={{ fontSize: '6rem', marginBottom: '1rem' }}>🚧</div>
        <h1 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Próximamente</h1>
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', maxWidth: '500px', fontSize: '1.1rem', lineHeight: '1.5' }}>
          El módulo de reservas para las canchas de Frontón se encuentra en desarrollo. 
          ¡Muy pronto podrás reservar tu espacio aquí!
        </p>
      </main>
    </div>
  );
};

export default FrontonView;
