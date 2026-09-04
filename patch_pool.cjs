const fs = require('fs');
let code = fs.readFileSync('src/services/studentDatabaseService.ts', 'utf-8');
code = code.replace(/const INITIAL_STUDENT_POOL: StudentSchoolRecord\[\] = \[\s*\{[\s\S]*?\}\s*\];/g, 'const INITIAL_STUDENT_POOL: StudentSchoolRecord[] = [];');
fs.writeFileSync('src/services/studentDatabaseService.ts', code);
