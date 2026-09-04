const fs = require('fs');
let code = fs.readFileSync('src/components/auth/RegisterModal.tsx', 'utf-8');

code = code.replace(
  /if \(\!penNo \|\| penNo\.length < 6\) \{/,
  'if (!penNo || !/^[0-9]{11}$/.test(penNo)) {'
);

code = code.replace(
  /setErrorMsg\('Please enter a valid PEN \/ Hall Ticket Number\.'\);/,
  "setErrorMsg('PEN Number must be exactly 11 digits.');"
);

code = code.replace(
  /placeholder="11-Digit PEN"/,
  'placeholder="11-Digit PEN"\n                          maxLength={11}'
);

fs.writeFileSync('src/components/auth/RegisterModal.tsx', code);
