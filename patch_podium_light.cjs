const fs = require('fs');

let code = fs.readFileSync('src/components/scoreboard/ScoreBoardView.tsx', 'utf-8');

const startIndex = code.indexOf('{/* TOP 3 PODIUM DISPLAY (Cinematic Style) */}');
const endIndex = code.indexOf('{/* TOP 10 COMPLETE DATA TABLE */}');

if (startIndex === -1 || endIndex === -1) {
  console.error("Could not find bounds");
  process.exit(1);
}

const before = code.substring(0, startIndex);
const after = code.substring(endIndex);

const lightBoldPodium = `{/* TOP 3 PODIUM DISPLAY (Light Bold Style) */}
      {top10List.length >= 3 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-10 pt-12 pb-8 items-end">
            
            {/* Rank 2 - Silver */}
            <div className="order-2 md:order-1 bg-white rounded-3xl p-6 border-[3px] border-slate-200 shadow-xl relative flex flex-col justify-between transition-transform hover:-translate-y-1">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-slate-100 text-slate-800 border-2 border-slate-300 font-black text-xs px-6 py-1.5 rounded-full flex items-center gap-1 shadow-md tracking-wider uppercase whitespace-nowrap">
                <span>Rank 2</span>
              </div>
              
              <div className="text-center pt-5 space-y-2">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-slate-100 to-slate-200 border-2 border-slate-300 mx-auto flex items-center justify-center font-black text-slate-800 text-2xl shadow-inner">
                  {top10List[1].studentName.charAt(0)}
                </div>
                <h3 className="font-black text-slate-900 text-lg mt-2 leading-tight">{top10List[1].studentName}</h3>
                {currentUser && currentUser.penNo === top10List[1].penNo ? (
                  <p className="text-xs font-mono text-blue-700 font-bold tracking-wide">PEN: {top10List[1].penNo} (You)</p>
                ) : (
                  <p className="text-xs text-slate-500 font-bold flex items-center justify-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>PEN Protected</span>
                  </p>
                )}
                <p className="text-sm font-bold text-slate-600 line-clamp-1">{top10List[1].schoolName}</p>
                <span className="inline-block text-[11px] font-black tracking-wide uppercase bg-slate-100 text-slate-600 px-3 py-1 rounded-md border border-slate-200 mt-1">
                  {top10List[1].district}
                </span>
              </div>

              <div className="mt-6 pt-5 border-t-2 border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-black tracking-widest">Score</span>
                  <span className="font-black text-slate-900 text-2xl">{top10List[1].score}<span className="text-sm text-slate-500">/{top10List[1].maxScore}</span></span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block uppercase font-black tracking-widest">Grade</span>
                  <span className="font-black text-emerald-700 bg-emerald-100 px-3 py-1 rounded-md border border-emerald-200 text-sm">{top10List[1].gpaGrade}</span>
                </div>
              </div>
            </div>

            {/* Rank 1 - Gold (Elevated) */}
            <div className="order-1 md:order-2 bg-gradient-to-b from-amber-50 to-white rounded-3xl p-8 border-[4px] border-amber-400 shadow-2xl relative flex flex-col justify-between transform md:-translate-y-8 z-20 transition-transform hover:-translate-y-10">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 border-2 border-amber-200 font-black text-sm px-8 py-2 rounded-full flex items-center gap-2 shadow-lg tracking-wider uppercase whitespace-nowrap">
                <Trophy className="w-5 h-5 fill-amber-950" />
                <span>State Rank 1</span>
              </div>

              <div className="text-center pt-6 space-y-2">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-300 to-amber-400 border-4 border-white mx-auto flex items-center justify-center font-black text-amber-950 text-4xl shadow-xl relative">
                  {top10List[0].studentName.charAt(0)}
                </div>

                <h3 className="font-black text-slate-900 text-2xl tracking-tight mt-4 leading-tight">{top10List[0].studentName}</h3>
                
                {currentUser && currentUser.penNo === top10List[0].penNo ? (
                  <p className="text-sm font-mono text-amber-700 font-bold tracking-wide">PEN: {top10List[0].penNo} (You)</p>
                ) : (
                  <p className="text-sm text-slate-500 font-bold flex items-center justify-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>PEN Protected</span>
                  </p>
                )}

                <p className="text-base font-bold text-slate-700 line-clamp-1 mt-2">{top10List[0].schoolName}</p>
                <span className="inline-block text-xs font-black tracking-wider uppercase bg-amber-100 text-amber-800 px-4 py-1.5 rounded-md border border-amber-200 mt-1">
                  {top10List[0].mandal}, {top10List[0].district}
                </span>
              </div>

              <div className="mt-8 pt-6 border-t-2 border-amber-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-xs text-amber-700/70 block uppercase font-black tracking-widest">Top Mark</span>
                  <span className="font-black text-amber-600 text-4xl">{top10List[0].score}<span className="text-xl text-amber-600/50">/{top10List[0].maxScore}</span></span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-amber-700/70 block uppercase font-black tracking-widest">Time</span>
                  <span className="font-black text-slate-800 text-xl">{formatTime(top10List[0].timeSpentSeconds)}</span>
                </div>
              </div>
            </div>

            {/* Rank 3 - Bronze */}
            <div className="order-3 bg-white rounded-3xl p-6 border-[3px] border-orange-200 shadow-xl relative flex flex-col justify-between transition-transform hover:-translate-y-1">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-orange-50 text-orange-900 border-2 border-orange-200 font-black text-xs px-6 py-1.5 rounded-full flex items-center gap-1 shadow-md tracking-wider uppercase whitespace-nowrap">
                <span>Rank 3</span>
              </div>
              
              <div className="text-center pt-5 space-y-2">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-orange-100 to-orange-200 border-2 border-orange-300 mx-auto flex items-center justify-center font-black text-orange-900 text-2xl shadow-inner">
                  {top10List[2].studentName.charAt(0)}
                </div>
                <h3 className="font-black text-slate-900 text-lg mt-2 leading-tight">{top10List[2].studentName}</h3>
                {currentUser && currentUser.penNo === top10List[2].penNo ? (
                  <p className="text-xs font-mono text-orange-700 font-bold tracking-wide">PEN: {top10List[2].penNo} (You)</p>
                ) : (
                  <p className="text-xs text-slate-500 font-bold flex items-center justify-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-orange-400 shrink-0" />
                    <span>PEN Protected</span>
                  </p>
                )}
                <p className="text-sm font-bold text-slate-600 line-clamp-1">{top10List[2].schoolName}</p>
                <span className="inline-block text-[11px] font-black tracking-wide uppercase bg-orange-50 text-orange-700 px-3 py-1 rounded-md border border-orange-200 mt-1">
                  {top10List[2].district}
                </span>
              </div>

              <div className="mt-6 pt-5 border-t-2 border-orange-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-black tracking-widest">Score</span>
                  <span className="font-black text-slate-900 text-2xl">{top10List[2].score}<span className="text-sm text-slate-500">/{top10List[2].maxScore}</span></span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block uppercase font-black tracking-widest">Grade</span>
                  <span className="font-black text-emerald-700 bg-emerald-100 px-3 py-1 rounded-md border border-emerald-200 text-sm">{top10List[2].gpaGrade}</span>
                </div>
              </div>
            </div>

        </div>
      )}
      `;

fs.writeFileSync('src/components/scoreboard/ScoreBoardView.tsx', before + lightBoldPodium + after);
