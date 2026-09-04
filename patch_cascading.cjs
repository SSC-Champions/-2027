const fs = require('fs');
const path = 'src/components/reports/CascadingReportView.tsx';
let code = fs.readFileSync(path, 'utf-8');

code = code.replace(
  /<th className="px-4 py-3 text-center">High Schools<\/th>/g,
  '<th className="px-4 py-3 text-center">Registered Schools</th>'
);

code = code.replace(
  /<th className="px-4 py-3 text-center">Schools<\/th>/g,
  '<th className="px-4 py-3 text-center">Registered Schools</th>'
);

code = code.replace(
  /\{mandal.totalSchools\} Schools in Mandal/g,
  '{mandal.totalSchools} Registered Schools'
);

code = code.replace(
  /\{dist.totalSchools\} High Schools Registered/g,
  '{dist.totalSchools} Registered Schools'
);

fs.writeFileSync(path, code);
