const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');
code = code.replace("import { getCurrentUser, setCurrentUser } from './services/authService';\nimport { syncUserAttemptsFromFirestore } from './services/sscTestService';, setCurrentUser, logoutStudent, clearAllRegisteredInformation } from './services/authService';", 
"import { getCurrentUser, setCurrentUser, logoutStudent, clearAllRegisteredInformation } from './services/authService';\nimport { syncUserAttemptsFromFirestore } from './services/sscTestService';");
fs.writeFileSync('src/App.tsx', code);
