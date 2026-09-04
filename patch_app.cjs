const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

const oldEffect = `  // Global Data Sync
  useEffect(() => {
    syncAllRegisteredStudentsFromFirestore();
    syncAllAttemptsFromFirestore();
  }, []);`;

const newEffect = `  // Global Data Sync
  useEffect(() => {
    const unsubStudents = syncAllRegisteredStudentsFromFirestore();
    const unsubAttempts = syncAllAttemptsFromFirestore();
    
    return () => {
      if (unsubStudents) unsubStudents();
      if (unsubAttempts) unsubAttempts();
    };
  }, []);`;

code = code.replace(oldEffect, newEffect);
fs.writeFileSync('src/App.tsx', code);
