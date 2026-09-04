const fs = require('fs');
let code = fs.readFileSync('src/services/authService.ts', 'utf-8');

code = code.replace(/mobile: payload\.mobile\?\.trim\(\) \|\| undefined,/g, '');
code = code.replace(/email: payload\.email\?\.trim\(\) \|\| undefined,/g, '');

fs.writeFileSync('src/services/authService.ts', code);
