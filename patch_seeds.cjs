const fs = require('fs');
let code = fs.readFileSync('src/components/dashboard/StudentDashboardView.tsx', 'utf-8');
code = code.replace(/const seeded = seedDemoAttemptsIfEmpty\(currentUser\);/g, 'const seeded = getSavedAttempts();');
fs.writeFileSync('src/components/dashboard/StudentDashboardView.tsx', code);
