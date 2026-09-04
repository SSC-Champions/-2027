const fs = require('fs');

let code = fs.readFileSync('src/components/scoreboard/ScoreBoardView.tsx', 'utf-8');

const rankBorderFn = `
  const getRankBorderColor = (rank: number) => {
    switch (rank) {
      case 1: return 'border-amber-500';
      case 2: return 'border-slate-400';
      case 3: return 'border-orange-500';
      case 4: return 'border-blue-500';
      case 5: return 'border-indigo-500';
      case 6: return 'border-violet-500';
      case 7: return 'border-fuchsia-500';
      case 8: return 'border-rose-500';
      case 9: return 'border-emerald-500';
      case 10: return 'border-teal-500';
      default: return 'border-slate-200';
    }
  };
`;

// Insert it before the return statement of ScoreBoardView
code = code.replace(
  /const timeframeLabels: Record<TimeframeFilter, \{ label: string; sub: string \}> = \{/,
  rankBorderFn + '\n  const timeframeLabels: Record<TimeframeFilter, { label: string; sub: string }> = {'
);

const oldTr = `                  <tr
                    key={entry.studentId || entry.penNo}
                    className={\`hover:bg-slate-50/80 transition-colors \${
                      isUser ? 'bg-blue-50/70 font-semibold' : ''
                    }\`}
                  >
                    {/* Rank Badge */}
                    <td className="py-3.5 px-4 text-center">`;

const newTr = `                  <tr
                    key={entry.studentId || entry.penNo}
                    className={\`hover:bg-slate-50/80 transition-colors \${
                      isUser ? 'bg-blue-50/70 font-semibold' : ''
                    }\`}
                  >
                    {/* Rank Badge */}
                    <td className={\`py-3.5 px-4 text-center border-l-[6px] \${getRankBorderColor(entry.rank)}\`}>`;

code = code.replace(oldTr, newTr);

fs.writeFileSync('src/components/scoreboard/ScoreBoardView.tsx', code);
