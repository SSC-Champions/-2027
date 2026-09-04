const fs = require('fs');
let code = fs.readFileSync('src/components/auth/RegisterModal.tsx', 'utf-8');

// Remove mobile state
code = code.replace(/const \[mobile, setMobile\] = useState\(''\);\n?/, '');

// Remove mobile from handleRegisterSubmit payload
code = code.replace(/mobile: mobile\.trim\(\) \|\| undefined,\n?/, '');

// Remove the UI for mobile input
// The block starts with <div><label>Mobile No (Optional) and ends before <div><label>Section
const searchString = `                      <div>
                        <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                          Mobile No (Optional)
                        </label>
                        <div className="relative">
                          <input
                            type="tel"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value.replace(/[^0-9]/g, ''))}
                            maxLength={10}
                            className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm font-medium"
                            placeholder="10 Digits"
                          />
                          <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        </div>
                      </div>`;

if (code.includes(searchString)) {
  code = code.replace(searchString, '');
} else {
  console.log("Could not find the UI block exactly, trying regex approach.");
  const rx = /<div>\s*<label[^>]*>\s*Mobile No \(Optional\)\s*<\/label>[\s\S]*?<\/div>\s*<\/div>/;
  code = code.replace(rx, '');
}

// Since we removed one item from grid-cols-2, let's just change the grid to single column or make Section span both?
// Actually, let's just make the Section div span full width by removing grid-cols-2
code = code.replace(/<div className="grid grid-cols-2 gap-4">/g, '<div className="flex flex-col gap-4">');

fs.writeFileSync('src/components/auth/RegisterModal.tsx', code);
