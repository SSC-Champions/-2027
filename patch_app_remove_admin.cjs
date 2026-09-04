const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

// Remove the import
code = code.replace(/import \{ GoogleSheetsResultsExportButton \} from '\.\/components\/reports\/GoogleSheetsResultsExportButton';\n?/, '');

// Remove the state
code = code.replace(/const \[showAdminPanel, setShowAdminPanel\] = useState\(false\);\n?/, '');

// Remove the listener
const oldUseEffect = `    const handleToggle = () => setShowAdminPanel(prev => !prev);
    window.addEventListener('toggle-admin-sync', handleToggle);
    return () => window.removeEventListener('toggle-admin-sync', handleToggle);`;
code = code.replace(oldUseEffect, '');

// Remove the component rendering
const oldRender = `{showAdminPanel && (
        <div className="fixed bottom-4 right-4 z-[9999] w-full max-w-lg shadow-2xl animate-in slide-in-from-bottom-5">
          <GoogleSheetsResultsExportButton />
        </div>
      )}`;
code = code.replace(oldRender, '');

fs.writeFileSync('src/App.tsx', code);
