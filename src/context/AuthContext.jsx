import React, { createContext, useContext, useState, useEffect } from 'react';
import Papa from 'papaparse';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS5lSaZuaqGq6__PvKz1GhPY3lnr_AAB9ctKZEzVNpRJbmrBE1MsLoj5Vk4ROQJQk-WkX51D8LPqSEF/pub?output=csv';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [sociosData, setSociosData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [csvError, setCsvError] = useState(null);

  useEffect(() => {
    // Check if user is in localStorage
    const storedUser = localStorage.getItem('tennis_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Fetch the CSV data
    Papa.parse(CSV_URL, {
      download: true,
      header: true, // Data will be an array of objects keyed by column names
      skipEmptyLines: true,
      complete: (results) => {
        setSociosData(results.data);
        setLoading(false);
      },
      error: (err) => {
        console.error("Error fetching socios CSV:", err);
        setCsvError("Error cargando la base de datos.");
        setLoading(false);
      }
    });
  }, []);

  const login = async (codigo, dni) => {
    if (csvError) {
      throw new Error('Error de conexión con la base de datos. Intenta nuevamente.');
    }

    if (sociosData.length === 0) {
      throw new Error('La base de datos se está sincronizando, inténtalo en un par de segundos.');
    }

    // Buscar el socio en el CSV
    const socio = sociosData.find(s => 
      s['CodSocio'] && s['CodSocio'].trim().toLowerCase() === codigo.trim().toLowerCase() && 
      s['NumDoc'] && s['NumDoc'].trim() === dni.trim()
    );

    if (socio) {
      const newUser = {
        id: socio['CodSocio'].trim(),
        name: socio['Nombre y Apellido'] ? socio['Nombre y Apellido'].trim() : socio['CodSocio'],
        dni: socio['NumDoc'].trim()
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

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'var(--bg-color)', color: 'var(--text-primary)' }}>
        <h2>Sincronizando socios...</h2>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
