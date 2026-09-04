const fs = require('fs');
let code = fs.readFileSync('src/components/auth/LoginModal.tsx', 'utf-8');

// Candidate Login -> Student Login for Tests
code = code.replace(
  /<h2 className="text-lg font-bold">\{isResetMode \? 'Reset PIN' : 'Candidate Login'\}<\/h2>/,
  '<h2 className="text-lg font-bold">{isResetMode ? \'Reset PIN\' : \'Student Login for Tests\'}</h2>'
);

code = code.replace(
  /<p className="text-xs text-blue-200">\s*\{isResetMode \? 'Create a new security PIN' : 'Sign in with your PEN Number & PIN'\}\s*<\/p>/,
  '<p className="text-xs text-blue-200">\n                {isResetMode ? \'Create a new security PIN\' : \'Only registered students can take practice tests\'}\n              </p>'
);

fs.writeFileSync('src/components/auth/LoginModal.tsx', code);
