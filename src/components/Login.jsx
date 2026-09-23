import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const [codigo, setCodigo] = useState('');
  const [dni, setDni] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await login(codigo, dni);
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="card login-card">
        <div className="text-center mb-4">
          <div className="logo justify-center mb-2">
            <img src="/logo.webp" alt="Club Tenis Logo" style={{ height: '40px', objectFit: 'contain' }} />
            <span>Club</span> Tenis
          </div>
          <h2 style={{ color: 'var(--text-secondary)', fontSize: '1rem', fontWeight: 400 }}>
            Acceso exclusivo para socios
          </h2>
        </div>

        {error && <div style={{ color: '#ef4444', backgroundColor: '#fef2f2', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.875rem', textAlign: 'center' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="codigo">Código del socio</label>
            <input
              id="codigo"
              type="text"
              className="input"
              placeholder="Ej. A123"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="dni">Número de DNI (Contraseña)</label>
            <input
              id="dni"
              type="password"
              className="input"
              placeholder="Tu número de DNI"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', marginBottom: '1rem' }}
            disabled={isLoading || !codigo || !dni}
          >
            {isLoading ? 'Verificando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
