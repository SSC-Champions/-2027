const fs = require('fs');
let code = fs.readFileSync('src/services/sscTestService.ts', 'utf-8');

// Fix the getStudentTestStatistics bug
const oldFilter = `  let attempts = getSavedAttempts();
  if (penNo) {
    const filtered = attempts.filter(a => a.penNo === penNo);
    if (filtered.length > 0) {
      attempts = filtered;
    }
  }`;
const newFilter = `  let attempts = getSavedAttempts();
  if (penNo) {
    attempts = attempts.filter(a => a.penNo === penNo);
  } else {
    // If no penNo provided, return 0 stats (no public global stats)
    attempts = [];
  }`;

code = code.replace(oldFilter, newFilter);

fs.writeFileSync('src/services/sscTestService.ts', code);
