const fs = require('fs');
let code = fs.readFileSync('src/components/reports/GoogleSheetsResultsExportButton.tsx', 'utf-8');
code = code.replace(/GoogleSheetsExportButton/g, 'GoogleSheetsResultsExportButton');
code = code.replace(/exportStudentDataToGoogleSheets/g, 'exportTestResultsToGoogleSheets');
code = code.replace(/googleSheetsSyncToDrive/g, 'googleSheetsResultsSync');
code = code.replace(/Registered Students/g, 'Test Results');
code = code.replace(/Sync to Sheets/g, 'Export Results to Sheets');
code = code.replace(/Sync Registered/g, 'Export Results');
// Remove the firestore sync from the results button, as it was only meant for registered users
code = code.replace(/\/\/ Sync to Firestore DB simultaneously[\s\S]*?catch \(e\) {[\s\S]*?console\.error\("Firestore sync skipped or failed", e\);\n    }/, '');
fs.writeFileSync('src/components/reports/GoogleSheetsResultsExportButton.tsx', code);
