import fs from 'fs';

const files = [
  'src/data/sscDailyTestBank.ts',
  'src/data/sscDailyTestBankSet2.ts',
  'src/data/sscDailyTestBankSet3.ts',
  'src/data/sscDailyTestBankSet4.ts',
  'src/data/sscDailyTestBankSet5.ts',
  'src/data/sscDailyTestBankSet6.ts',
];

const replacements = [
  // Physics/Chemistry
  ['ఆవర్తన పట్టిక', 'ఆవర్తన పట్టిక'],
  ['అణు సంఖ్య', 'పరమాణు సంఖ్య'], // Atomic number
  ['పరమాణు ద్రవ్యరాశి', 'పరమాణు ద్రవ్యరాశి'], // Atomic mass
  ['రసాయన ప్రతిచర్య', 'రసాయన చర్య'],
  ['రసాయన సమీకరణం', 'రసాయన సమీకరణం'],
  ['కాంతి వక్రీభవనం', 'కాంతి వక్రీభవనం'], // Refraction
  ['కాంతి పరావర్తనం', 'కాంతి పరావర్తనం'], // Reflection
  ['ఎలక్ట్రానిక్ కాన్ఫిగరేషన్', 'ఎలక్ట్రాన్ విన్యాసం'], // Electronic configuration
  ['అయస్కాంత క్షేత్రం', 'అయస్కాంత క్షేత్రం'],
  ['కక్ష్య', 'కక్ష్య'],
  
  // Biology
  ['కిరణజన్య సంయోగక్రియ', 'కిరణజన్య సంయోగక్రియ'],
  ['కణ త్వచం', 'కణ త్వచం'], // Cell membrane
  ['కణ కవచం', 'కణ కవచం'], // Cell wall
  ['నాడీ కణం', 'నాడీ కణం'], // Neuron
  ['మెదడు', 'మెదడు'], 
  ['వెన్నుపాము', 'వెన్నుపాము'],
  ['గుండె', 'హృదయం'],
  ['రక్త నాళాలు', 'రక్తనాళాలు'],
  ['శ్వాసక్రియ', 'శ్వాసక్రియ'],
  ['జీర్ణక్రియ', 'జీర్ణక్రియ'],
  ['కణాల విభజన', 'కణ విభజన'],
  ['అసంకల్పిత ప్రతీకార చర్య', 'అసంకల్పిత ప్రతీకార చర్య'],
  
  // Maths
  ['బహుపదులు', 'బహుపదులు'], // Polynomials
  ['వాస్తవ సంఖ్యలు', 'వాస్తవ సంఖ్యలు'], // Real numbers
  ['సమితులు', 'సమితులు'], // Sets
  ['సరూప త్రిభుజాలు', 'సరూప త్రిభుజాలు'], // Similar triangles
  ['వృత్తానికి స్పర్శరేఖలు మరియు ఛేదన రేఖలు', 'వృత్తానికి స్పర్శరేఖలు మరియు ఛేదన రేఖలు'], // Tangents and secants
  ['క్షేత్రమితి', 'క్షేత్రమితి'], // Mensuration
  ['త్రికోణమితి', 'త్రికోణమితి'], // Trigonometry
  ['సంభావ్యత', 'సంభావ్యత'], // Probability
  ['గణాంక శాస్త్రం', 'సాంఖ్యక శాస్త్రం'], // Statistics
  ['సగటు', 'అంకగణిత సగటు'], // Mean
  ['మధ్యగతం', 'మధ్యగతం'], // Median
  ['బహుళకం', 'బాహుళకం'], // Mode
  ['బాహుళకం', 'బాహుళకం'], // Just making sure
  ['వ్యాసార్థం', 'వ్యాసార్థం'],
  ['చదరపు', 'చదరపు'],
  
  // Formatting fix
  ['విభజించడంలో', 'జీర్ణం చేయడంలో'],
  ['ఏ\'B\'', 'A\'B\'']
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf-8');
  let originalLength = content.length;
  
  for (const [bad, good] of replacements) {
    content = content.split(bad).join(good);
  }
  
  fs.writeFileSync(file, content);
}
console.log('Fixed advanced translation terms!');
