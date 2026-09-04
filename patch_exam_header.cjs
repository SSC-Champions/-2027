const fs = require('fs');
let code = fs.readFileSync('src/components/ssc-test/SSCTestExamView.tsx', 'utf-8');

// The original opening of the main div
const oldDiv = `<div className="flex flex-col min-h-[calc(100vh-140px)] space-y-4">`;
const newDiv = `<div className="flex flex-col min-h-[calc(100vh-140px)] space-y-4 pt-20 sm:pt-16">`;
code = code.replace(oldDiv, newDiv);

// The original control bar
const oldBar = `{/* Top Examination Control Bar */}
      <div className="bg-[#1E293B] text-white rounded-xl px-4 py-3 sm:px-6 shadow-md border border-slate-700 flex flex-wrap items-center justify-between gap-3 sticky top-2 z-20">`;
const newBar = `{/* Top Examination Control Bar - Fixed for Exam Mode */}
      <div className="fixed top-0 left-0 w-full bg-[#0F172A] text-white px-4 sm:px-6 lg:px-8 py-3 shadow-2xl border-b border-slate-700 z-[60] flex justify-center">
        <div className="max-w-7xl w-full flex items-center justify-between gap-3">`;

code = code.replace(oldBar, newBar);

// Now I need to close the extra div `max-w-7xl` that I just opened.
// Let's find the end of the action controls.
const oldControlsEnd = `          </button>
        </div>
      </div>

      {/* Main Examination Layout */}`;
const newControlsEnd = `          </button>
        </div>
        </div>
      </div>

      {/* Main Examination Layout */}`;

code = code.replace(oldControlsEnd, newControlsEnd);

// Also let's make the timer itself much more visually prominent by scaling it up
const oldTimer = `<div className={\`flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono font-bold text-sm sm:text-base border transition-colors \${`;
const newTimer = `<div className={\`flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-2.5 rounded-xl font-mono font-black text-lg sm:text-2xl tracking-wider border-2 shadow-lg transition-all \${`;
code = code.replace(oldTimer, newTimer);

const oldClockIcon = `<Clock className={\`w-4 h-4 \${isLowTime ? 'text-rose-400 animate-spin' : 'text-emerald-400'}\`} />`;
const newClockIcon = `<Clock className={\`w-5 h-5 sm:w-6 sm:h-6 \${isLowTime ? 'text-rose-400 animate-pulse' : 'text-emerald-400'}\`} />`;
code = code.replace(oldClockIcon, newClockIcon);

// We need to fix the submit button size inside the header to match the new height
const oldSubmit = `className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-lg shadow-sm cursor-pointer transition-all flex items-center gap-1.5"`;
const newSubmit = `className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-sm sm:text-base px-5 py-2.5 sm:py-3 rounded-xl shadow-lg shadow-emerald-900/50 cursor-pointer transition-all flex items-center gap-2 uppercase tracking-wide"`;
code = code.replace(oldSubmit, newSubmit);

fs.writeFileSync('src/components/ssc-test/SSCTestExamView.tsx', code);
