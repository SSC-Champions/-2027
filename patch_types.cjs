const fs = require('fs');
let code = fs.readFileSync('src/types.ts', 'utf-8');

code = code.replace(/totalScoreSum\?: number;/, 'totalScoreSum: number;');

fs.writeFileSync('src/types.ts', code);
