const fs = require('fs');
let code = fs.readFileSync('src/services/sscTestService.ts', 'utf-8');
code = code.replace(
  "return JSON.parse(raw) as SSCTestAttempt[];",
  "const parsed = JSON.parse(raw) as SSCTestAttempt[];\n    // Filter out the hardcoded mock dates to clean up local storage\n    const mockDates = ['2026-08-25','2026-08-27','2026-08-29','2026-08-31','2026-09-01','2026-09-02'];\n    return parsed.filter(a => !mockDates.includes(a.date));"
);
fs.writeFileSync('src/services/sscTestService.ts', code);
