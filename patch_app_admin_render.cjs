const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

const renderCode = `      <RegisterModal
        isOpen={isRegisterModalOpen}        
        onClose={() => setIsRegisterModalOpen(false)}
        onSuccess={handleAuthSuccess}
        onSwitchToLogin={() => {
          setIsRegisterModalOpen(false);
          setIsLoginModalOpen(true);
        }}
      />
      {showAdminPanel && (
        <div className="fixed bottom-4 right-4 z-[9999] w-full max-w-lg shadow-2xl animate-in slide-in-from-bottom-5">
          <GoogleSheetsResultsExportButton />
        </div>
      )}
    </div>`;

code = code.replace(/<RegisterModal[\s\S]*?setIsLoginModalOpen\(true\);\s*\}\}\s*\/>\s*<\/div>/, renderCode);
fs.writeFileSync('src/App.tsx', code);
