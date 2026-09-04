const fs = require('fs');
let code = fs.readFileSync('src/components/auth/RegisterModal.tsx', 'utf-8');

code = code.replace(/s\.districtName === selectedDistrict/g, 's.district === selectedDistrict');
code = code.replace(/s\.mandalName === selectedMandal/g, 's.mandal === selectedMandal');
code = code.replace(/school\.mandalName/g, 'school.mandal');

fs.writeFileSync('src/components/auth/RegisterModal.tsx', code);
