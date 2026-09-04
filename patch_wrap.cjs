const fs = require('fs');
let code = fs.readFileSync('src/components/ssc-test/SSCTestExamView.tsx', 'utf-8');

code = code.replace(
  /<div className="max-w-7xl w-full flex items-center justify-between gap-3">/,
  '<div className="max-w-7xl w-full flex flex-wrap items-center justify-between gap-3">'
);

code = code.replace(
  /<div className="flex flex-col min-h-\[calc\(100vh-140px\)\] space-y-4 pt-20 sm:pt-16">/,
  '<div className="flex flex-col min-h-[calc(100vh-140px)] space-y-4 pt-28 sm:pt-20">'
);

fs.writeFileSync('src/components/ssc-test/SSCTestExamView.tsx', code);
