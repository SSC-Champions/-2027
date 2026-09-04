const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

code = code.replace("import { getCurrentUser", "import { getCurrentUser, setCurrentUser } from './services/authService';\nimport { syncUserAttemptsFromFirestore } from './services/sscTestService';");

code = code.replace(
  "const handleAuthSuccess = (user: UserAccount) => {\n    setCurrentUserState(user);\n    setCurrentUser(user);\n    setIsLoginModalOpen(false);\n    setIsRegisterModalOpen(false);\n    setPendingGoogleUser(null);\n  };",
  "const handleAuthSuccess = (user: UserAccount) => {\n    setCurrentUserState(user);\n    setCurrentUser(user);\n    setIsLoginModalOpen(false);\n    setIsRegisterModalOpen(false);\n    setPendingGoogleUser(null);\n    if (user.userId) {\n      syncUserAttemptsFromFirestore(user.userId).then(() => {\n        // Refresh component or let it reactive if possible\n        window.dispatchEvent(new Event('storage'));\n      });\n    }\n  };"
);

fs.writeFileSync('src/App.tsx', code);
