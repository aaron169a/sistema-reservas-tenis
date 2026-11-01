import { db } from '../firebase/config';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

const TOURNAMENT_DOC_ID = 'primera_categoria';

export const tournamentService = {
  subscribeToTournament: (callback) => {
    const tournamentRef = doc(db, 'tournaments', TOURNAMENT_DOC_ID);
    return onSnapshot(tournamentRef, (docSnap) => {
      if (docSnap.exists()) {
        callback(docSnap.data());
      } else {
        callback(null);
      }
    }, (error) => {
      console.error('Error fetching tournament bracket:', error);
      callback(null);
    });
  },

  getTournament: async () => {
    try {
      const tournamentRef = doc(db, 'tournaments', TOURNAMENT_DOC_ID);
      const docSnap = await getDoc(tournamentRef);
      if (docSnap.exists()) {
        return docSnap.data();
      }
      return null;
    } catch (error) {
      console.error('Error getting tournament:', error);
      return null;
    }
  },

  saveTournament: async (tournamentData) => {
    const tournamentRef = doc(db, 'tournaments', TOURNAMENT_DOC_ID);
    await setDoc(tournamentRef, {
      ...tournamentData,
      updatedAt: new Date().toISOString()
    });
  }
};
