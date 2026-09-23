import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { bookingService } from '../services/bookingService';
import { format, addDays, startOfToday, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar, LogOut, User as UserIcon, ArrowLeft } from 'lucide-react';
import './Dashboard.css';

const HOURS = Array.from({ length: 11 }, (_, i) => i + 6); // 6 to 16 (4:00 PM)

const Dashboard = ({ onBack, courts, title }) => {
  const { user, logout } = useAuth();
  const [selectedDate, setSelectedDate] = useState(startOfToday());
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  // Generar fechas disponibles (hoy + 7 días)
  const availableDates = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => addDays(startOfToday(), i));
  }, []);

  const [loadingSlot, setLoadingSlot] = useState(null);

  useEffect(() => {
    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    const unsubscribe = bookingService.subscribeToDateBookings(dateStr, (newBookings) => {
      setBookings(newBookings);
      setError(null);
    });
    
    return () => unsubscribe();
  }, [selectedDate]);

  const handleBooking = async (courtId, hour) => {
    try {
      setLoadingSlot(`${courtId}-${hour}`);
      const dateStr = format(selectedDate, 'yyyy-MM-dd');
      await bookingService.createBooking(courtId, dateStr, hour, user);
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoadingSlot(null);
    }
  };

  const handleCancel = async (bookingId) => {
    if (window.confirm('¿Seguro que deseas cancelar esta reserva?')) {
      try {
        await bookingService.cancelBooking(bookingId, user.id);
      } catch (err) {
        setError(err.message);
        setTimeout(() => setError(null), 3000);
      }
    }
  };

  return (
    <div className="dashboard-layout">
      <nav className="navbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          {onBack && (
            <button className="btn btn-secondary btn-sm" onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ArrowLeft size={16} /> Volver
            </button>
          )}
          <div className="logo">
            <img src="/logo.webp" alt="Club Tenis Logo" style={{ height: '32px', objectFit: 'contain' }} />
            <span>Club</span> Tenis
          </div>
        </div>
        <div className="user-menu">
          <div className="user-info">
            <UserIcon size={20} />
            <span>{user.name}</span>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={logout}>
            <LogOut size={16} /> Salir
          </button>
        </div>
      </nav>

      <main className="container dashboard-main">
        {title && <h1 style={{ marginBottom: '2rem', color: 'var(--text-primary)' }}>{title}</h1>}
        {error && (
          <div className="alert-error mb-4">
            {error}
          </div>
        )}

        <div className="date-selector card mb-4">
          <div className="flex items-center gap-2 mb-4">
            <Calendar size={24} color="var(--accent-color)" />
            <h2 style={{ margin: 0 }}>Seleccionar Fecha</h2>
          </div>
          
          <div className="dates-scroll">
            {availableDates.map(date => {
              const isSelected = format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
              return (
                <button
                  key={date.toString()}
                  className={`date-btn ${isSelected ? 'selected' : ''}`}
                  onClick={() => setSelectedDate(date)}
                >
                  <span className="date-day">{format(date, 'EEEE', { locale: es })}</span>
                  <span className="date-num">{format(date, 'd')}</span>
                  <span className="date-month">{format(date, 'MMM', { locale: es })}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="courts-grid">
          {courts.map(court => (
            <div key={court.id} className="card court-card">
              <div className="court-header">
                <h3>{court.name}</h3>
                <div className="court-surface-indicator"></div>
              </div>
              
              <div className="time-slots">
                {HOURS.map(hour => {
                  const booking = bookings.find(b => b.courtId === court.id && b.hour === hour);
                  const isMine = booking?.userId === user.id;
                  
                  return (
                    <div key={hour} className={`time-slot ${booking ? (isMine ? 'mine' : 'occupied') : 'free'}`}>
                      <div className="slot-time">
                        {hour}:00 - {hour + 1}:00
                      </div>
                      
                      <div className="slot-action">
                        {!booking && (
                          <button 
                            className="btn btn-primary btn-sm"
                            onClick={() => handleBooking(court.id, hour)}
                            disabled={loadingSlot === `${court.id}-${hour}`}
                          >
                            {loadingSlot === `${court.id}-${hour}` ? 'Reservando...' : 'Reservar'}
                          </button>
                        )}
                        {isMine && (
                          <button 
                            className="btn btn-danger btn-sm"
                            onClick={() => handleCancel(booking.id)}
                          >
                            Cancelar
                          </button>
                        )}
                        {booking && !isMine && (
                          <span className="occupant-name">{booking.userName}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
