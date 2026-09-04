const fs = require('fs');
let code = fs.readFileSync('src/services/sscTestService.ts', 'utf-8');

const newSave = `export function saveTestAttempt(attempt: SSCTestAttempt): void {
  try {
    const user = getCurrentUser();
    if (user) {
      attempt.userId = user.id; // Or user.userId if it exists
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
}`;

code = code.replace(/export function saveTestAttempt[\s\S]*?clearActiveTestSession\(\);\s*\}\s*catch\s*\(e\)\s*\{\s*console\.error\('Failed to save test attempt', e\);\s*\}\s*\}/m, newSave);

fs.writeFileSync('src/services/sscTestService.ts', code);
