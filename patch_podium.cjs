const fs = require('fs');

let code = fs.readFileSync('src/components/scoreboard/ScoreBoardView.tsx', 'utf-8');

const startIndex = code.indexOf('{/* TOP 3 PODIUM DISPLAY */}');
const endIndex = code.indexOf('{/* TOP 10 COMPLETE DATA TABLE */}');

if (startIndex === -1 || endIndex === -1) {
  console.error("Could not find bounds");
  process.exit(1);
}

const before = code.substring(0, startIndex);
const after = code.substring(endIndex);

const cinematicPodium = `{/* TOP 3 PODIUM DISPLAY (Cinematic Style) */}
      {top10List.length >= 3 && (
        <div className="relative bg-slate-950 rounded-3xl p-6 md:p-10 border border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden my-8">
          {/* Ambient Cinematic Glows */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-amber-500/20 blur-[80px] pointer-events-none rounded-full" />
          <div className="absolute bottom-0 left-0 w-1/2 h-32 bg-slate-400/10 blur-[60px] pointer-events-none rounded-full" />
          <div className="absolute bottom-0 right-0 w-1/2 h-32 bg-orange-500/10 blur-[60px] pointer-events-none rounded-full" />
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 lg:gap-8 pt-8 items-end">
            
            {/* Rank 2 - Silver */}
            <div className="order-2 md:order-1 bg-gradient-to-b from-slate-300/20 to-slate-900 rounded-2xl p-[1px] border-t border-slate-400 shadow-[0_0_30px_rgba(148,163,184,0.15)] relative flex flex-col justify-between backdrop-blur-md">
              <div className="bg-slate-950/90 rounded-2xl p-5 flex flex-col h-full border border-white/5">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-slate-400 via-slate-100 to-slate-400 text-slate-900 font-black text-[10px] px-5 py-1.5 rounded-full flex items-center gap-1 shadow-[0_0_15px_rgba(203,213,225,0.4)] tracking-widest uppercase">
                  <span>Rank 2</span>
                </div>
                
                <div className="text-center pt-4 space-y-1.5">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-slate-400 via-slate-200 to-slate-400 border border-slate-300 mx-auto flex items-center justify-center font-black text-slate-900 text-xl shadow-[0_0_20px_rgba(203,213,225,0.2)]">
                    {top10List[1].studentName.charAt(0)}
                  </div>
                  <h3 className="font-bold text-white text-base mt-2">{top10List[1].studentName}</h3>
                  {currentUser && currentUser.penNo === top10List[1].penNo ? (
                    <p className="text-[10px] font-mono text-slate-300 font-bold tracking-wider">PEN: {top10List[1].penNo} (You)</p>
                  ) : (
                    <p className="text-[10px] text-slate-500 font-medium flex items-center justify-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-slate-600 shrink-0" />
                      <span>PEN Protected</span>
                    </p>
                  )}
                  <p className="text-[11px] text-slate-400 line-clamp-1">{top10List[1].schoolName}</p>
                  <span className="inline-block text-[9px] font-bold tracking-wide uppercase bg-white/5 text-slate-400 px-2 py-0.5 rounded border border-white/10 mt-1">
                    {top10List[1].district}
                  </span>
                </div>

                <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[9px] text-slate-500 block uppercase tracking-widest">Score</span>
                    <span className="font-black text-slate-200 text-xl">{top10List[1].score}<span className="text-xs text-slate-600">/{top10List[1].maxScore}</span></span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] text-slate-500 block uppercase tracking-widest">Grade</span>
                    <span className="font-bold text-slate-300 bg-white/10 px-2 py-1 rounded border border-white/5">{top10List[1].gpaGrade}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Rank 1 - Gold (Elevated) */}
            <div className="order-1 md:order-2 bg-gradient-to-b from-amber-500/30 to-slate-900 rounded-2xl p-[1px] border-t-2 border-amber-400 shadow-[0_0_40px_rgba(251,191,36,0.2)] relative flex flex-col justify-between transform md:-translate-y-6 md:scale-110 backdrop-blur-md z-20">
              <div className="bg-slate-950/90 rounded-2xl p-6 flex flex-col h-full border border-white/5">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-600 via-amber-300 to-yellow-600 text-amber-950 font-black text-[11px] px-6 py-2 rounded-full flex items-center gap-1.5 shadow-[0_0_20px_rgba(251,191,36,0.6)]">
                  <Trophy className="w-4 h-4 fill-amber-950" />
                  <span className="tracking-widest uppercase">State Rank 1</span>
                </div>

                <div className="text-center pt-5 space-y-2">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-200 to-amber-600 border-2 border-amber-200 mx-auto flex items-center justify-center font-black text-amber-950 text-3xl shadow-[0_0_30px_rgba(251,191,36,0.5)] relative">
                    {top10List[0].studentName.charAt(0)}
                    <div className="absolute inset-0 rounded-full bg-amber-400 blur-md -z-10 opacity-60 animate-pulse"></div>
                  </div>

                  <h3 className="font-black text-white text-lg tracking-tight mt-3">{top10List[0].studentName}</h3>
                  
                  {currentUser && currentUser.penNo === top10List[0].penNo ? (
                    <p className="text-[11px] font-mono text-amber-400 font-bold tracking-wider">PEN: {top10List[0].penNo} (You)</p>
                  ) : (
                    <p className="text-[11px] text-slate-400 font-medium flex items-center justify-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span>PEN Protected</span>
                    </p>
                  )}

                  <p className="text-xs text-slate-300 font-medium line-clamp-1 mt-2">{top10List[0].schoolName}</p>
                  <span className="inline-block text-[10px] font-bold tracking-wider uppercase bg-white/10 text-amber-100 px-3 py-1 rounded-full border border-white/10">
                    {top10List[0].mandal}, {top10List[0].district}
                  </span>
                </div>

                <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase tracking-widest font-semibold">Top Mark</span>
                    <span className="font-black text-amber-400 text-2xl">{top10List[0].score}<span className="text-base text-amber-400/50">/{top10List[0].maxScore}</span></span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block uppercase tracking-widest font-semibold">Time</span>
                    <span className="font-bold text-slate-200 text-base">{formatTime(top10List[0].timeSpentSeconds)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Rank 3 - Bronze */}
            <div className="order-3 bg-gradient-to-b from-orange-500/20 to-slate-900 rounded-2xl p-[1px] border-t border-orange-500/60 shadow-[0_0_30px_rgba(249,115,22,0.15)] relative flex flex-col justify-between backdrop-blur-md">
              <div className="bg-slate-950/90 rounded-2xl p-5 flex flex-col h-full border border-white/5">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-600 via-orange-300 to-orange-600 text-orange-950 font-black text-[10px] px-5 py-1.5 rounded-full flex items-center gap-1 shadow-[0_0_15px_rgba(253,186,116,0.4)] tracking-widest uppercase">
                  <span>Rank 3</span>
                </div>
                
                <div className="text-center pt-4 space-y-1.5">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-orange-600 via-orange-300 to-orange-700 border border-orange-300 mx-auto flex items-center justify-center font-black text-orange-950 text-xl shadow-[0_0_20px_rgba(253,186,116,0.2)]">
                    {top10List[2].studentName.charAt(0)}
                  </div>
                  <h3 className="font-bold text-white text-base mt-2">{top10List[2].studentName}</h3>
                  {currentUser && currentUser.penNo === top10List[2].penNo ? (
                    <p className="text-[10px] font-mono text-orange-300 font-bold tracking-wider">PEN: {top10List[2].penNo} (You)</p>
                  ) : (
                    <p className="text-[10px] text-slate-500 font-medium flex items-center justify-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-slate-600 shrink-0" />
                      <span>PEN Protected</span>
                    </p>
                  )}
                  <p className="text-[11px] text-slate-400 line-clamp-1">{top10List[2].schoolName}</p>
                  <span className="inline-block text-[9px] font-bold tracking-wide uppercase bg-white/5 text-slate-400 px-2 py-0.5 rounded border border-white/10 mt-1">
                    {top10List[2].district}
                  </span>
                </div>

                <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[9px] text-slate-500 block uppercase tracking-widest">Score</span>
                    <span className="font-black text-slate-200 text-xl">{top10List[2].score}<span className="text-xs text-slate-600">/{top10List[2].maxScore}</span></span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] text-slate-500 block uppercase tracking-widest">Grade</span>
                    <span className="font-bold text-slate-300 bg-white/10 px-2 py-1 rounded border border-white/5">{top10List[2].gpaGrade}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
      `;

fs.writeFileSync('src/components/scoreboard/ScoreBoardView.tsx', before + cinematicPodium + after);
