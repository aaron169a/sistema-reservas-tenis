import { db } from '../firebase/config';
import { collection, addDoc, deleteDoc, doc, query, where, onSnapshot, getDocs } from 'firebase/firestore';

export const bookingService = {
  subscribeToDateBookings: (dateStr, callback) => {
    const q = query(collection(db, 'bookings'), where('date', '==', dateStr));
    return onSnapshot(q, (snapshot) => {
      const bookings = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(bookings);
    });
  },

  createBooking: async (courtId, dateStr, hour, user) => {
    // Verificar si ya está reservado
    const q = query(collection(db, 'bookings'), where('date', '==', dateStr), where('courtId', '==', courtId), where('hour', '==', hour));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      throw new Error('Este horario ya está reservado.');
    }

    // Validar máximo 2 reservas por día
    const limitQ = query(collection(db, 'bookings'), where('date', '==', dateStr), where('userId', '==', user.id));
    const limitSnapshot = await getDocs(limitQ);
    if (limitSnapshot.size >= 2) {
      throw new Error('Has alcanzado el límite de 2 reservas por día.');
    }

    const newBooking = {
      courtId,
      date: dateStr,
      hour,
      userId: user.id,
      userName: user.name,
      createdAt: new Date().toISOString()
    };
    await addDoc(collection(db, 'bookings'), newBooking);
  },

  cancelBooking: async (bookingId, userId) => {
    await deleteDoc(doc(db, 'bookings', bookingId));
  }
};
