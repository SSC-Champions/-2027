const fs = require('fs');
let code = fs.readFileSync('src/components/ssc-test/SSCTestExamView.tsx', 'utf-8');

code = code.replace(
  /<span>Submit Test<\/span>\s*<\/button>\s*<\/div>\s*<\/div>\s*\{\/\* Paused Overlay Alert \*\/\}/,
  '<span>Submit Test</span>\n          </button>\n        </div>\n        </div>\n      </div>\n\n      {/* Paused Overlay Alert */}'
);

fs.writeFileSync('src/components/ssc-test/SSCTestExamView.tsx', code);
