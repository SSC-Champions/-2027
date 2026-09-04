const fs = require('fs');
let code = fs.readFileSync('src/services/authService.ts', 'utf-8');

// Replace registerStudent
const oldRegister = code.match(/export function registerStudent[\s\S]*?return \{ success: false, message: e.message \|\| 'Registration failed.' \};\n  \}\n\}/)[0];

const newRegister = oldRegister.replace(
  /if \(\!pen \|\| pen.length < 6\) \{\s*return \{ success: false, message: 'Please enter a valid 11-Digit PEN \/ Hall Ticket Number.' \};\s*\}/,
  `if (!pen || !/^[0-9]{11}$/.test(pen)) {
      return { success: false, message: 'PEN Number must be exactly 11 digits.' };
    }`
).replace(
  /const existingIndex = allStudents.findIndex\(s => s\.penNo === pen\);\n\s*const newStudent: UserAccount = \{/,
  `const existingIndex = allStudents.findIndex(s => s.penNo === pen);
    if (existingIndex >= 0) {
      return { success: false, message: 'This PEN Number is already registered.' };
    }
    
    const newStudent: UserAccount = {`
);

code = code.replace(oldRegister, newRegister);

// I should also patch registerStudentFirestore just in case
const oldRegisterFirestore = code.match(/export async function registerStudentFirestore[\s\S]*?return \{ success: false, message: e.message \|\| 'Registration failed.' \};\n  \}\n\}/)[0];

const newRegisterFirestore = oldRegisterFirestore.replace(
  /if \(\!pen \|\| pen.length < 6\) \{\s*return \{ success: false, message: 'Please enter a valid 11-Digit PEN \/ Hall Ticket Number.' \};\s*\}/,
  `if (!pen || !/^[0-9]{11}$/.test(pen)) {
      return { success: false, message: 'PEN Number must be exactly 11 digits.' };
    }`
).replace(
  /const existingIndex = allStudents.findIndex\(s => s\.penNo === pen\);/,
  `const existingIndex = allStudents.findIndex(s => s.penNo === pen);
    if (existingIndex >= 0) {
      return { success: false, message: 'This PEN Number is already registered.' };
    }`
);

code = code.replace(oldRegisterFirestore, newRegisterFirestore);

fs.writeFileSync('src/services/authService.ts', code);
