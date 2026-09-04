const fs = require('fs');

let code = fs.readFileSync('src/components/scoreboard/ScoreBoardView.tsx', 'utf-8');

// 1. Change table className
code = code.replace(
  '<table className="w-full text-left border-collapse text-xs">',
  '<table className="w-full text-left border-separate border-spacing-y-2 text-xs">'
);

// 2. Change thead styling (remove background/borders since it's now separate)
code = code.replace(
  '<tr className="bg-slate-100/80 text-slate-600 border-b border-slate-200 font-bold">',
  '<tr className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">'
);

// 3. Remove divide-y from tbody
code = code.replace(
  '<tbody className="divide-y divide-slate-100">',
  '<tbody>'
);

// 4. Update the TR to have shadow and background
const oldTr = `                  <tr
                    key={entry.studentId || entry.penNo}
                    className={\`hover:bg-slate-50/80 transition-colors \${
                      isUser ? 'bg-blue-50/70 font-semibold' : ''
                    }\`}
                  >`;

const newTr = `                  <tr
                    key={entry.studentId || entry.penNo}
                    className={\`bg-white shadow-sm hover:shadow-md transition-shadow relative \${
                      isUser ? 'bg-blue-50/70 font-semibold' : ''
                    }\`}
                  >`;

code = code.replace(oldTr, newTr);

// 5. Update TDs. This requires some regex magic.
// We will match every <td className="py-3.5 px-4..."> and replace appropriately.
// It's safer to do this with explicit string replacements since there are only 8 columns.

// Column 1 (Rank Badge)
const oldTd1 = `                    <td className={\`py-3.5 px-4 text-center border-l-[6px] \${getRankBorderColor(entry.rank)}\`}>`;
const newTd1 = `                    <td className={\`py-3.5 px-4 text-center border-y-[3px] border-l-[6px] rounded-l-xl \${getRankBorderColor(entry.rank)}\`}>`;
code = code.replace(oldTd1, newTd1);

// Middle Columns (2 to 7)
const middleCols = [
  '                    <td className="py-3.5 px-4">', // 2 Student
  '                    <td className="py-3.5 px-4">', // 3 School
  '                    <td className="py-3.5 px-4 text-center">', // 4 Tests
  '                    <td className="py-3.5 px-4 text-center">', // 5 Score
  '                    <td className="py-3.5 px-4 text-center">', // 6 GPA
  '                    <td className="py-3.5 px-4 text-center text-slate-600">' // 7 Time
];

const newMiddleCols = [
  '                    <td className={\`py-3.5 px-4 border-y-[3px] \${getRankBorderColor(entry.rank)}\`}>',
  '                    <td className={\`py-3.5 px-4 border-y-[3px] \${getRankBorderColor(entry.rank)}\`}>',
  '                    <td className={\`py-3.5 px-4 text-center border-y-[3px] \${getRankBorderColor(entry.rank)}\`}>',
  '                    <td className={\`py-3.5 px-4 text-center border-y-[3px] \${getRankBorderColor(entry.rank)}\`}>',
  '                    <td className={\`py-3.5 px-4 text-center border-y-[3px] \${getRankBorderColor(entry.rank)}\`}>',
  '                    <td className={\`py-3.5 px-4 text-center text-slate-600 border-y-[3px] \${getRankBorderColor(entry.rank)}\`}>'
];

for (let i = 0; i < middleCols.length; i++) {
  code = code.replace(middleCols[i], newMiddleCols[i]);
}

// Column 8 (Date)
const oldTd8 = '                    <td className="py-3.5 px-4 text-right text-slate-500 text-[11px]">';
const newTd8 = '                    <td className={`py-3.5 px-4 text-right text-slate-500 text-[11px] border-y-[3px] border-r-[3px] rounded-r-xl ${getRankBorderColor(entry.rank)}`}>';
code = code.replace(oldTd8, newTd8);

fs.writeFileSync('src/components/scoreboard/ScoreBoardView.tsx', code);
