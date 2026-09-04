const fs = require('fs');
let code1 = fs.readFileSync('src/components/reports/GoogleSheetsExportButton.tsx', 'utf-8');
code1 = code1.replace('border border-slate-200 mb-6"', 'border border-slate-200 w-full"');
fs.writeFileSync('src/components/reports/GoogleSheetsExportButton.tsx', code1);

let code2 = fs.readFileSync('src/components/reports/GoogleSheetsResultsExportButton.tsx', 'utf-8');
code2 = code2.replace('border border-slate-200 mb-6"', 'border border-slate-200 w-full"');
fs.writeFileSync('src/components/reports/GoogleSheetsResultsExportButton.tsx', code2);

let code3 = fs.readFileSync('src/components/reports/CascadingReportView.tsx', 'utf-8');
code3 = code3.replace('<div className="flex gap-4">', '<div className="flex flex-col lg:flex-row gap-4 mb-6">');
fs.writeFileSync('src/components/reports/CascadingReportView.tsx', code3);
