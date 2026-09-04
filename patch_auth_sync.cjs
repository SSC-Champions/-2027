const fs = require('fs');
let code = fs.readFileSync('src/services/authService.ts', 'utf-8');

// replace the getDocs code with onSnapshot
const newSyncFunc = `import { doc, setDoc, collection, getDocs, onSnapshot } from 'firebase/firestore';

export function syncAllRegisteredStudentsFromFirestore() {
  try {
    return onSnapshot(collection(db, 'registered_students'), (snapshot) => {
      const students = snapshot.docs.map(d => d.data() as UserAccount);
      localStorage.setItem(ALL_STUDENTS_KEY, JSON.stringify(students));
      window.dispatchEvent(new Event('storage'));
    }, (error) => {
      console.error('Failed to sync registered students in real-time', error);
    });
  } catch (e) {
    console.error('Failed to setup real-time sync for registered students', e);
    return () => {};
  }
}`;

code = code.replace(/import \{ doc, setDoc \} from 'firebase\/firestore';/, "import { doc, setDoc, collection, getDocs, onSnapshot } from 'firebase/firestore';");
code = code.replace(/export async function syncAllRegisteredStudentsFromFirestore\(\) \{[\s\S]*?\n\}/, newSyncFunc.replace("import { doc, setDoc, collection, getDocs, onSnapshot } from 'firebase/firestore';\n\n", ""));

fs.writeFileSync('src/services/authService.ts', code);
