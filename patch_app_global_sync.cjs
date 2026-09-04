const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

code = code.replace(
  "import { getCurrentUser, setCurrentUser, logoutStudent, clearAllRegisteredInformation } from './services/authService';",
  "import { getCurrentUser, setCurrentUser, logoutStudent, clearAllRegisteredInformation, syncAllRegisteredStudentsFromFirestore } from './services/authService';"
);

code = code.replace(
  "// Sync state with authService",
  "// Global Data Sync\n  useEffect(() => {\n    syncAllRegisteredStudentsFromFirestore();\n  }, []);\n\n  // Sync state with authService"
);

fs.writeFileSync('src/App.tsx', code);
