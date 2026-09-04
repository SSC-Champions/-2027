const fs = require('fs');
let code = fs.readFileSync('src/services/sscTestService.ts', 'utf-8');

const imports = `import { doc, setDoc, getDocs, collection, query, where, deleteDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { getCurrentUser } from './authService';
`;

code = imports + code;

const syncFunc = `
export async function syncUserAttemptsFromFirestore(userId: string) {
  try {
    const q = query(collection(db, 'attempts'), where('userId', '==', userId));
    const snapshot = await getDocs(q);
    const attempts = snapshot.docs.map(d => d.data() as SSCTestAttempt);
    localStorage.setItem(ATTEMPTS_STORAGE_KEY, JSON.stringify(attempts));
  } catch (e) {
    console.error('Failed to sync attempts from firestore', e);
  }
}
`;

code = code.replace("export function getSavedAttempts(): SSCTestAttempt[] {", syncFunc + "\nexport function getSavedAttempts(): SSCTestAttempt[] {");

const asyncSave = `
export function saveTestAttempt(attempt: SSCTestAttempt): void {
  try {
    const user = getCurrentUser();
    if (user && user.userId) {
      attempt.userId = user.userId;
      // Fire and forget to Firestore
      setDoc(doc(db, 'attempts', attempt.id), attempt).catch(e => console.error(e));
    }

    const existing = getSavedAttempts();
    const updated = [attempt, ...existing.filter(a => a.id !== attempt.id)];
    localStorage.setItem(ATTEMPTS_STORAGE_KEY, JSON.stringify(updated));
    
    // clear active state on submit
    clearActiveTestSession();
  } catch (e) {
    console.error('Failed to save test attempt', e);
  }
}
`;

code = code.replace(/export function saveTestAttempt[\s\S]*?clearActiveTestSession\(\);\n  \} catch \(e\) \{\n    console\.error\('Failed to save test attempt', e\);\n  \}\n\}/, asyncSave);

fs.writeFileSync('src/services/sscTestService.ts', code);
