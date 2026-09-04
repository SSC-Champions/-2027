const fs = require('fs');
let code = fs.readFileSync('src/components/ssc-test/SSCTestLobby.tsx', 'utf-8');

code = code.replace(
  /const stats = getStudentTestStatistics\(\);/,
  'const stats = getStudentTestStatistics(currentUser?.penNo);'
);

fs.writeFileSync('src/components/ssc-test/SSCTestLobby.tsx', code);
