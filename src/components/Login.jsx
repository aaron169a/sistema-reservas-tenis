import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const [name, setName] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim().length >= 3) {
      login(name.trim());
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
            Inicia sesión para reservar tu cancha
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Nombre completo</label>
            <input
              id="name"
              type="text"
              className="input"
              placeholder="Ej. Roger Federer"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              minLength={3}
              autoFocus
            />
          </div>
          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%' }}
            disabled={name.trim().length < 3}
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
