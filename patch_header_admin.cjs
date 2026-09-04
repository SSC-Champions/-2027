const fs = require('fs');
let code = fs.readFileSync('src/components/Header.tsx', 'utf-8');
code = code.replace(
  /<div className="flex items-center gap-2">/,
  `<div className="flex items-center gap-2" onDoubleClick={() => window.dispatchEvent(new Event('toggle-admin-sync'))}>`
);
fs.writeFileSync('src/components/Header.tsx', code);
