import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyD7Jp10AFztBpKy6rth7SbTJQICPMEBGsM',
  authDomain: 'the-cats-space.firebaseapp.com',
  projectId: 'the-cats-space',
  storageBucket: 'the-cats-space.firebasestorage.app',
  messagingSenderId: '656135529146',
  appId: '1:656135529146:web:7b378a6bf70765d6b6d883',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
