const fs = require('fs');
let code = fs.readFileSync('src/components/reports/CascadingReportView.tsx', 'utf-8');

const oldColorFn = `const getCardColorClass = (index: number) => {
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
};`;

const newColorFn = `const getCardColorClass = (index: number) => {
  const colors = [
    'border-blue-200 border-l-blue-500',
    'border-indigo-200 border-l-indigo-500',
    'border-violet-200 border-l-violet-500',
    'border-fuchsia-200 border-l-fuchsia-500',
    'border-emerald-200 border-l-emerald-500',
    'border-teal-200 border-l-teal-500',
    'border-amber-200 border-l-amber-500',
    'border-orange-200 border-l-orange-500',
    'border-rose-200 border-l-rose-500'
  ];
  return colors[index % colors.length];
};`;

code = code.replace(oldColorFn, newColorFn);

// 1. District cards
code = code.replace(
  'className={`bg-white rounded-2xl p-5 border border-slate-200 border-l-[5px] ${getCardColorClass(index)} shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between`}',
  'className={`bg-white rounded-2xl p-5 border border-l-[5px] ${getCardColorClass(index)} shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between`}'
);

// 2. Mandal cards
code = code.replace(
  'className={`bg-white rounded-2xl p-5 border border-slate-200 border-l-[5px] ${getCardColorClass(index)} shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between`}',
  'className={`bg-white rounded-2xl p-5 border border-l-[5px] ${getCardColorClass(index)} shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between`}'
);

// 3. School cards
code = code.replace(
  'className={`bg-white rounded-2xl p-5 border border-slate-200 border-l-[5px] ${getCardColorClass(index)} shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-3`}',
  'className={`bg-white rounded-2xl p-5 border border-l-[5px] ${getCardColorClass(index)} shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-3`}'
);

fs.writeFileSync('src/components/reports/CascadingReportView.tsx', code);
