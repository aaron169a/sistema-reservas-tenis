import React, { createContext, useContext, useState, useEffect } from 'react';
import sociosData from '../data/socios.json';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is in localStorage
    const storedUser = localStorage.getItem('tennis_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (codigo, dni) => {
    // Buscar el socio en el JSON
    const socio = sociosData.find(s => 
      s.codigo.trim().toLowerCase() === codigo.trim().toLowerCase() && 
      s.dni.trim() === dni.trim()
    );

    if (socio) {
      const newUser = {
        id: socio.codigo,
        name: `${socio.nombre} ${socio.apellido}`,
        dni: socio.dni
      };
      setUser(newUser);
      localStorage.setItem('tennis_user', JSON.stringify(newUser));
      return true;
    } else {
      throw new Error('Código de socio o DNI incorrectos');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('tennis_user');
  };

  const value = {
    user,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
