const fs = require('fs');
let code = fs.readFileSync('src/services/authService.ts', 'utf-8');

// Remove all firebase/firestore imports
code = code.replace(/import \{.*\} from 'firebase\/firestore';\n?/g, '');

// Prepend a single unified import
code = "import { collection, getDocs, doc, setDoc, onSnapshot } from 'firebase/firestore';\n" + code;

fs.writeFileSync('src/services/authService.ts', code);
