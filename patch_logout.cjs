const fs = require('fs');
let code = fs.readFileSync('src/services/authService.ts', 'utf-8');

code = code.replace("import { UserAccount, SchoolInfo } from '../types';", "import { UserAccount, SchoolInfo } from '../types';\nimport { logoutGoogle } from './googleAuth';");

const newLogout = `
export async function logoutStudent(): Promise<void> {
  await logoutGoogle();
  setCurrentUser(null);
}
`;

code = code.replace(/export function logoutStudent\(\): void \{\n  setCurrentUser\(null\);\n\}/, newLogout);

fs.writeFileSync('src/services/authService.ts', code);
