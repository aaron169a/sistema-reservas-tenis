import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import FrontonView from './components/FrontonView';
import TenisLocations from './components/TenisLocations';

const AppContent = () => {
  const { user } = useAuth();
  const [selectedSport, setSelectedSport] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    if (!user) {
      setSelectedSport(null);
      setSelectedLocation(null);
    }
  }, [user]);

  const handleBackToSports = () => {
    setSelectedSport(null);
    setSelectedLocation(null);
  };

  if (!user) {
    return <Login />;
  }

  // Si seleccionó frontón
  if (selectedSport === 'fronton') {
    return <FrontonView onBack={handleBackToSports} />;
  }

  // Si seleccionó tenis
  if (selectedSport === 'tennis') {
    if (!selectedLocation) {
      return <TenisLocations onSelectLocation={setSelectedLocation} onBack={handleBackToSports} />;
    }

    if (selectedLocation === 'central') {
      return (
        <Dashboard 
          title="Tenis - Sede Central"
          courts={[{ id: 3, name: 'Cancha Principal' }]} 
          onBack={() => setSelectedLocation(null)} 
        />
      );
    }

    if (selectedLocation === 'campestre') {
      return (
        <Dashboard 
          title="Tenis - Sede Campestre"
          courts={[{ id: 1, name: 'Cancha 1' }, { id: 2, name: 'Cancha 2' }]} 
          onBack={() => setSelectedLocation(null)} 
        />
      );
    }
  }

  // Vista por defecto (Selección de deporte)
  return <Home onSelectSport={setSelectedSport} />;
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
