const fs = require('fs');
let code = fs.readFileSync('src/components/ssc-test/SSCTestLobby.tsx', 'utf-8');

// 1. Filter past attempts based on the current user's PEN No
code = code.replace(
  /const pastAttempts = getSavedAttempts\(\);/,
  `const rawPastAttempts = getSavedAttempts();
  const pastAttempts = currentUser?.penNo ? rawPastAttempts.filter(a => a.penNo === currentUser.penNo) : [];`
);

// 2. Hide "My Test History" tab from non-logged-in users
const oldTabBtn = `<button
          type="button"
          onClick={() => setActiveTab('history')}
          className={\`pb-3 px-4 font-bold text-sm transition-all border-b-2 flex items-center gap-2 cursor-pointer \${
            activeTab === 'history'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }\`}
        >
          <History className="w-4 h-4" />
          <span>My Test History ({pastAttempts.length})</span>
        </button>`;

const newTabBtn = `{currentUser && (
        <button
          type="button"
          onClick={() => setActiveTab('history')}
          className={\`pb-3 px-4 font-bold text-sm transition-all border-b-2 flex items-center gap-2 cursor-pointer \${
            activeTab === 'history'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }\`}
        >
          <History className="w-4 h-4" />
          <span>My Test History ({pastAttempts.length})</span>
        </button>
        )}`;

code = code.replace(oldTabBtn, newTabBtn);

fs.writeFileSync('src/components/ssc-test/SSCTestLobby.tsx', code);
