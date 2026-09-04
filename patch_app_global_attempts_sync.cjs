const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

code = code.replace(
  "import { syncUserAttemptsFromFirestore } from './services/sscTestService';",
  "import { syncUserAttemptsFromFirestore, syncAllAttemptsFromFirestore } from './services/sscTestService';"
);

code = code.replace(
  "syncAllRegisteredStudentsFromFirestore();",
  "syncAllRegisteredStudentsFromFirestore();\n    syncAllAttemptsFromFirestore();"
);

fs.writeFileSync('src/App.tsx', code);
