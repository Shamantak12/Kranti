// Content Service for Firebase Backend
// This service handles all content-related operations

import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  query, 
  where, 
  orderBy,
  limit,
  addDoc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
import { db } from './firebase';
import { MeditationTrack, MantraData, Session } from '../types';

export class ContentService {
  
  // Get all meditation tracks
  static async getMeditationTracks(filters?: {
    category?: string;
    difficulty?: string;
    language?: string;
    subscriptionTier?: 'free' | 'plus' | 'pro';
  }): Promise<MeditationTrack[]> {
    try {
      let q = collection(db, 'meditationTracks');
      
      if (filters?.category) {
        q = query(q, where('category', '==', filters.category));
      }
      if (filters?.difficulty) {
        q = query(q, where('difficulty', '==', filters.difficulty));
      }
      if (filters?.language) {
        q = query(q, where('language', '==', filters.language));
      }
      
      const querySnapshot = await getDocs(q);
      const tracks: MeditationTrack[] = [];
      
      querySnapshot.forEach((doc) => {
        tracks.push({ id: doc.id, ...doc.data() } as MeditationTrack);
      });
      
      return tracks;
    } catch (error) {
      console.error('Error fetching meditation tracks:', error);
      throw error;
    }
  }

  // Get specific meditation track
  static async getMeditationTrack(id: string): Promise<MeditationTrack | null> {
    try {
      const docRef = doc(db, 'meditationTracks', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as MeditationTrack;
      }
      return null;
    } catch (error) {
      console.error('Error fetching meditation track:', error);
      throw error;
    }
  }

  // Get mantras
  static async getMantras(category?: string): Promise<MantraData[]> {
    try {
      let q = collection(db, 'mantras');
      
      if (category) {
        q = query(q, where('category', '==', category));
      }
      
      const querySnapshot = await getDocs(q);
      const mantras: MantraData[] = [];
      
      querySnapshot.forEach((doc) => {
        mantras.push({ id: doc.id, ...doc.data() } as MantraData);
      });
      
      return mantras;
    } catch (error) {
      console.error('Error fetching mantras:', error);
      throw error;
    }
  }

  // Get sessions
  static async getSessions(category?: string): Promise<Session[]> {
    try {
      let q = collection(db, 'sessions');
      
      if (category) {
        q = query(q, where('category', '==', category));
      }
      
      const querySnapshot = await getDocs(q);
      const sessions: Session[] = [];
      
      querySnapshot.forEach((doc) => {
        sessions.push({ id: doc.id, ...doc.data() } as Session);
      });
      
      return sessions;
    } catch (error) {
      console.error('Error fetching sessions:', error);
      throw error;
    }
  }

  // Add new content (Admin only)
  static async addMeditationTrack(track: Omit<MeditationTrack, 'id'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'meditationTracks'), {
        ...track,
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding meditation track:', error);
      throw error;
    }
  }

  static async addMantra(mantra: Omit<MantraData, 'id'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'mantras'), {
        ...mantra,
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding mantra:', error);
      throw error;
    }
  }

  static async addSession(session: Omit<Session, 'id'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'sessions'), {
        ...session,
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding session:', error);
      throw error;
    }
  }

  // Update content
  static async updateMeditationTrack(id: string, updates: Partial<MeditationTrack>): Promise<void> {
    try {
      const docRef = doc(db, 'meditationTracks', id);
      await updateDoc(docRef, { ...updates, updatedAt: new Date() });
    } catch (error) {
      console.error('Error updating meditation track:', error);
      throw error;
    }
  }

  // Delete content
  static async deleteMeditationTrack(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, 'meditationTracks', id));
    } catch (error) {
      console.error('Error deleting meditation track:', error);
      throw error;
    }
  }

  // Get featured content
  static async getFeaturedContent(): Promise<{
    tracks: MeditationTrack[];
    mantras: MantraData[];
    sessions: Session[];
  }> {
    try {
      const [tracks, mantras, sessions] = await Promise.all([
        getDocs(query(collection(db, 'meditationTracks'), 
          where('featured', '==', true), limit(5))),
        getDocs(query(collection(db, 'mantras'), 
          where('featured', '==', true), limit(3))),
        getDocs(query(collection(db, 'sessions'), 
          where('featured', '==', true), limit(3)))
      ]);

      return {
        tracks: tracks.docs.map(doc => ({ id: doc.id, ...doc.data() } as MeditationTrack)),
        mantras: mantras.docs.map(doc => ({ id: doc.id, ...doc.data() } as MantraData)),
        sessions: sessions.docs.map(doc => ({ id: doc.id, ...doc.data() } as Session))
      };
    } catch (error) {
      console.error('Error fetching featured content:', error);
      throw error;
    }
  }
}
