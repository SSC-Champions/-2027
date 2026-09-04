const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

if (!code.includes('GoogleSheetsResultsExportButton')) {
  code = code.replace(
    /import \{ CascadingReportView \} from '\.\/components\/reports\/CascadingReportView';/,
    `import { CascadingReportView } from './components/reports/CascadingReportView';\nimport { GoogleSheetsResultsExportButton } from './components/reports/GoogleSheetsResultsExportButton';`
  );
}

// Add state for showAdminPanel
if (!code.includes('showAdminPanel')) {
  code = code.replace(
    /const \[isRegisterModalOpen, setIsRegisterModalOpen\] = useState\(false\);/,
    `const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);\n  const [showAdminPanel, setShowAdminPanel] = useState(false);`
  );

  // Add event listener for toggle-admin-sync
  const effectCode = `
  useEffect(() => {
    const handleToggle = () => setShowAdminPanel(prev => !prev);
    window.addEventListener('toggle-admin-sync', handleToggle);
    return () => window.removeEventListener('toggle-admin-sync', handleToggle);
  }, []);
`;
  code = code.replace(/const handleAuthSuccess =/, effectCode + '\n  const handleAuthSuccess =');

  // Render the GoogleSheetsResultsExportButton conditionally
  const renderCode = `
      {showAdminPanel && (
        <div className="fixed bottom-4 right-4 z-50 w-full max-w-lg shadow-2xl animate-in slide-in-from-bottom-5">
          <GoogleSheetsResultsExportButton />
        </div>
      )}
    </div>
  );
}`;
  code = code.replace(/<\/div>\s*\);\s*\}\s*$/, renderCode);
}

fs.writeFileSync('src/App.tsx', code);
