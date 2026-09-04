const fs = require('fs');
let code = fs.readFileSync('src/services/sscTestService.ts', 'utf-8');

const newSyncFunc = `export function syncAllAttemptsFromFirestore() {
  try {
    return onSnapshot(collection(db, 'attempts'), (snapshot) => {
      const attempts = snapshot.docs.map(d => d.data() as SSCTestAttempt);
      localStorage.setItem(ATTEMPTS_STORAGE_KEY, JSON.stringify(attempts));
      window.dispatchEvent(new Event('storage'));
    }, (error) => {
      console.error('Failed to sync attempts in real-time', error);
    });
  } catch (e) {
    console.error('Failed to setup real-time sync for attempts', e);
    return () => {};
  }
}`;

code = code.replace(/import \{ doc, setDoc, getDocs, collection, query, where, deleteDoc \} from 'firebase\/firestore';/, "import { doc, setDoc, getDocs, collection, query, where, deleteDoc, onSnapshot } from 'firebase/firestore';");
code = code.replace(/export async function syncAllAttemptsFromFirestore\(\) \{[\s\S]*?\n\}/, newSyncFunc);

fs.writeFileSync('src/services/sscTestService.ts', code);
