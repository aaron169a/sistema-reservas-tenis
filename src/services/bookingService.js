import { format, parseISO, isSameDay } from 'date-fns';

const STORAGE_KEY = 'tennis_bookings';

// Estructura de una reserva:
// { id: string, courtId: number, date: string (YYYY-MM-DD), hour: number (6 to 16), userId: string, userName: string }

export const bookingService = {
  // Obtener todas las reservas de un día específico
  getBookingsByDate: (dateStr) => {
    const allBookings = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return allBookings.filter(b => b.date === dateStr);
  },

  // Obtener reservas de un usuario en un día específico
  getUserBookingsCountForDate: (userId, dateStr) => {
    const allBookings = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return allBookings.filter(b => b.date === dateStr && b.userId === userId).length;
  },

  // Crear una nueva reserva
  createBooking: (courtId, dateStr, hour, user) => {
    const allBookings = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    
    // Verificar que la cancha y hora estén libres
    const isOccupied = allBookings.some(b => b.date === dateStr && b.courtId === courtId && b.hour === hour);
    if (isOccupied) {
      throw new Error('Este horario ya está reservado.');
    }

    // Validar máximo 2 reservas por día
    const userBookings = allBookings.filter(b => b.date === dateStr && b.userId === user.id).length;
    if (userBookings >= 2) {
      throw new Error('Has alcanzado el límite de 2 reservas por día.');
    }

    const newBooking = {
      id: Math.random().toString(36).substring(2, 9),
      courtId,
      date: dateStr,
      hour,
      userId: user.id,
      userName: user.name
    };

    allBookings.push(newBooking);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allBookings));
    return newBooking;
  },

  // Cancelar una reserva
  cancelBooking: (bookingId, userId) => {
    const allBookings = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const bookingIndex = allBookings.findIndex(b => b.id === bookingId);
    
    if (bookingIndex === -1) {
      throw new Error('Reserva no encontrada.');
    }
    
    if (allBookings[bookingIndex].userId !== userId) {
      throw new Error('No tienes permiso para cancelar esta reserva.');
    }

    allBookings.splice(bookingIndex, 1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allBookings));
  }
};
