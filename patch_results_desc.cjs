const fs = require('fs');
let code = fs.readFileSync('src/components/reports/GoogleSheetsResultsExportButton.tsx', 'utf-8');
code = code.replace("Export all registered students and their scores directly to your Google Drive.", "Export all student test results and attempts directly to a new Google Sheet.");
code = code.replace("Google Sheets Export", "Google Sheets Results");
fs.writeFileSync('src/components/reports/GoogleSheetsResultsExportButton.tsx', code);
