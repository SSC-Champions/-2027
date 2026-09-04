const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

code = code.replace(/if \(user\.userId\) \{\s*syncUserAttemptsFromFirestore\(user\.userId\)\.then\(\(\) => \{\s*\/\/ Refresh component or let it reactive if possible\s*window\.dispatchEvent\(new Event\('storage'\)\);\s*\}\);\s*\}/, "");

fs.writeFileSync('src/App.tsx', code);
