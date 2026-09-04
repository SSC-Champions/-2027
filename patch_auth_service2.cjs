const fs = require('fs');
let code = fs.readFileSync('src/services/authService.ts', 'utf-8');

code = code.replace(/doc\(db, 'users', newStudent\.id\)/, "doc(db, 'users', newStudent.id || '')");

fs.writeFileSync('src/services/authService.ts', code);
