const fs = require('fs');
let code = fs.readFileSync('src/services/sscTestService.ts', 'utf-8');

const globalSync = `
export async function syncAllAttemptsFromFirestore() {
  try {
    const snapshot = await getDocs(collection(db, 'attempts'));
    const attempts = snapshot.docs.map(d => d.data() as SSCTestAttempt);
    
    // Merge with current local cache carefully, or just overwrite
    // Since this is a simple setup, we can store all global attempts in a new key for leaderboard use
    // Or we can just update local attempts if they belong to this user, and use all attempts for leaderboard.
    // The codebase assumes getSavedAttempts() returns *global* attempts to calculate leaderboards?
    // Let's check studentDatabaseService.ts. Yes, it relies on getSavedAttempts() for global attempts!
    
    localStorage.setItem(ATTEMPTS_STORAGE_KEY, JSON.stringify(attempts));
    window.dispatchEvent(new Event('storage'));
  } catch (e) {
    console.error('Failed to sync all attempts from firestore', e);
  }
}
`;

code = code.replace("export async function syncUserAttemptsFromFirestore", globalSync + "\nexport async function syncUserAttemptsFromFirestore");

fs.writeFileSync('src/services/sscTestService.ts', code);
