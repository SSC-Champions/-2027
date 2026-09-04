const fs = require('fs');
let code = fs.readFileSync('src/components/reports/CascadingReportView.tsx', 'utf-8');

const colorFn = `
const getCardColorClass = (index: number) => {
  const colors = [
    'border-blue-500',
    'border-indigo-500',
    'border-violet-500',
    'border-fuchsia-500',
    'border-emerald-500',
    'border-teal-500',
    'border-amber-500',
    'border-orange-500',
    'border-rose-500'
  ];
  return colors[index % colors.length];
};
`;

// Inject helper function right before the return statement inside CascadingReportView
code = code.replace(
  '  return (',
  colorFn + '\n  return ('
);

// 1. District cards
// Replace `filteredDistricts.map((dist) => (`
// With `filteredDistricts.map((dist, index) => (`
code = code.replace(
  'filteredDistricts.map((dist) => (',
  'filteredDistricts.map((dist, index) => ('
);

// Replace `className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:border-blue-500 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"`
// With `className={\`bg-white rounded-2xl p-5 border border-slate-200 border-l-[6px] \${getCardColorClass(index)} shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between\`}`
code = code.replace(
  'className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:border-blue-500 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"',
  'className={`bg-white rounded-2xl p-5 border border-slate-200 border-l-[5px] ${getCardColorClass(index)} shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between`}'
);


// 2. Mandal cards
// Replace `filteredMandals.map((mandal) => (`
// With `filteredMandals.map((mandal, index) => (`
code = code.replace(
  'filteredMandals.map((mandal) => (',
  'filteredMandals.map((mandal, index) => ('
);

// Replace `className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:border-indigo-500 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"`
// With `className={\`bg-white rounded-2xl p-5 border border-slate-200 border-l-[6px] \${getCardColorClass(index)} shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between\`}`
code = code.replace(
  'className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:border-indigo-500 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"',
  'className={`bg-white rounded-2xl p-5 border border-slate-200 border-l-[5px] ${getCardColorClass(index)} shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between`}'
);


// 3. School cards
// Replace `filteredSchools.map((sch) => (`
// With `filteredSchools.map((sch, index) => (`
code = code.replace(
  'filteredSchools.map((sch) => (',
  'filteredSchools.map((sch, index) => ('
);

// Replace `className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-3"`
// With `className={\`bg-white rounded-2xl p-5 border border-slate-200 border-l-[6px] \${getCardColorClass(index)} shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-3\`}`
code = code.replace(
  'className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-3"',
  'className={`bg-white rounded-2xl p-5 border border-slate-200 border-l-[5px] ${getCardColorClass(index)} shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-3`}'
);

fs.writeFileSync('src/components/reports/CascadingReportView.tsx', code);
