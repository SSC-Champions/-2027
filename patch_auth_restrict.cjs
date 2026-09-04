const fs = require('fs');
let code = fs.readFileSync('src/components/reports/GoogleSheetsResultsExportButton.tsx', 'utf-8');

const authCode = `  const handleAuth = async () => {
    try {
      const result = await googleSignIn();
      if (result) {
        if (result.user.email !== 'swamy6677@gmail.com') {
          await logoutGoogle();
          setSyncStatus({ type: 'error', message: 'Unauthorized: Admin access only (swamy6677@gmail.com)' });
          return;
        }
        setUser(result.user);
        setNeedsAuth(false);
      }
    } catch (e) {
      console.error(e);
      setSyncStatus({ type: 'error', message: 'Google Sign In failed.' });
    }
  };`;

code = code.replace(/const handleAuth = async \(\) => \{[\s\S]*?\}\s*\} catch \(e\) \{[\s\S]*?\}\s*\};/, authCode);

// Also add a close button since it might be a floating panel now.
code = code.replace(
  /<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">/,
  `<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative">
        <button 
          onClick={() => window.dispatchEvent(new Event('toggle-admin-sync'))} 
          className="absolute -top-6 -right-2 w-6 h-6 flex items-center justify-center bg-slate-200 text-slate-500 rounded-full hover:bg-slate-300 transition-colors"
          title="Close Admin Panel"
        >
          &times;
        </button>`
);

fs.writeFileSync('src/components/reports/GoogleSheetsResultsExportButton.tsx', code);
