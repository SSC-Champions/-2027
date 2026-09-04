const fs = require('fs');
const path = 'src/services/studentDatabaseService.ts';
let code = fs.readFileSync(path, 'utf-8');

code = code.replace(
  /districtMap\.get\(s\.district\)\!\.schools\.add\(s\.udiseCode\);/g,
  '// districtMap.get(s.district)!.schools.add(s.udiseCode); // modified to only count registered schools'
);

code = code.replace(
  /mandalMap\.get\(s\.mandal\)\!\.schools\.add\(s\.udiseCode\);/g,
  '// mandalMap.get(s.mandal)!.schools.add(s.udiseCode); // modified to only count registered schools'
);

fs.writeFileSync(path, code);
