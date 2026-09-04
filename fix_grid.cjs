const fs = require('fs');
let code = fs.readFileSync('src/components/auth/RegisterModal.tsx', 'utf-8');

// The District/Mandal flex flex-col gap-4 should be grid grid-cols-2 gap-4
code = code.replace(
  /<div className="flex flex-col gap-4">\s*<div>\s*<label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1\.5">District<\/label>/,
  '<div className="grid grid-cols-2 gap-4">\n                      <div>\n                        <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">District</label>'
);

fs.writeFileSync('src/components/auth/RegisterModal.tsx', code);
