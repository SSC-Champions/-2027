const fs = require('fs');
let code = fs.readFileSync('src/services/sscTestService.ts', 'utf-8');

const asyncDelete = `
export function deleteSavedAttempt(attemptId: string): void {
  try {
    deleteDoc(doc(db, 'attempts', attemptId)).catch(e => console.error(e));
    const existing = getSavedAttempts();
    const updated = existing.filter(a => a.id !== attemptId);
    localStorage.setItem(ATTEMPTS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to delete test attempt', e);
  }
}
`;

code = code.replace(/export function deleteSavedAttempt[\s\S]*?console\.error\('Failed to delete test attempt', e\);\n  \}\n\}/, asyncDelete);

fs.writeFileSync('src/services/sscTestService.ts', code);
