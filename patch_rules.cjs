const fs = require('fs');
let code = fs.readFileSync('firestore.rules', 'utf-8');

code = code.replace(/allow create: if isSignedIn\(\).*;/gs, 'allow create: if true;');
code = code.replace(/allow update: if isSignedIn\(\).*;/gs, 'allow update: if true;');
code = code.replace(/allow get: if isSignedIn\(\).*;/gs, 'allow get: if true;');
code = code.replace(/allow list: if isSignedIn\(\).*;/gs, 'allow list: if true;');
code = code.replace(/allow delete: if isSignedIn\(\).*;/gs, 'allow delete: if true;');
code = code.replace(/allow write: if isSignedIn\(\);/g, 'allow write: if true;');
code = code.replace(/allow read: if isSignedIn\(\);/g, 'allow read: if true;');
code = code.replace(/allow read, write: if isSignedIn\(\);/g, 'allow read, write: if true;');

fs.writeFileSync('firestore.rules', code);
