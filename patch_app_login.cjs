const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

const oldLogin = `  const handleAuthSuccess = (user: UserAccount) => {
    setCurrentUserState(user);
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
    
    if (user.userId) {
      syncUserAttemptsFromFirestore(user.userId).then(() => {
        // Refresh component or let it reactive if possible
        window.dispatchEvent(new Event('storage'));
      });
    }
  };`;

const newLogin = `  const handleAuthSuccess = (user: UserAccount) => {
    setCurrentUserState(user);
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
  };`;

code = code.replace(oldLogin, newLogin);
fs.writeFileSync('src/App.tsx', code);
