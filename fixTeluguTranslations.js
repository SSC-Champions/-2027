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
  // Physics & Science
  ['రే రేఖాచిత్రాన్ని', 'కిరణ చిత్రాన్ని'],
  ['అద్దం', 'దర్పణం'],
  ['చిత్రం ఏర్పడిన', 'ప్రతిబింబం ఏర్పడిన'],
  ['సమానమైన ప్రతిఘటన', 'ఫలిత నిరోధం'],
  ['ప్రతిఘటన', 'నిరోధం'],
  ['సిరీస్‌లో', 'శ్రేణి సంధానంలో'],
  ['సమాంతరంగా', 'సమాంతర సంధానంలో'],
  ['కనెక్ట్ చేయబడ్డాయి', 'కలిపారు'],
  ['డబుల్ గోడల', 'ద్విపొరల'],
  ['మొక్కల హార్మోన్', 'వృక్ష హార్మోన్'],
  ['రక్తపోటు ఇలా కొలుస్తారు', 'రక్తపోటు విలువ:'],
  ['పునాది ప్రయోగాలకు', 'మూల ప్రయోగాలకు'],
  ['వక్రత కేంద్రం', 'వక్రతా కేంద్రం'],
  ['ఫోకస్', 'నాభి'],
  ['గురుత్వాకర్షణ', 'గురుత్వాకర్షణ'],
  ['కాంతి కణాలు', 'కాంతి కిరణాలు'],
  ['కణాల పొడిగింపు', 'కణాల పెరుగుదల'],
  
  // Maths
  ['క్వాడ్రాటిక్ బహుపది', 'వర్గ బహుపది'],
  ['అర్థమెటిక్ ప్రోగ్రెషన్', 'అంకశ్రేఢి'],
  ['కోఆర్డినేట్ జ్యామితి', 'నిరూపక రేఖాగణితం'],
  ['సున్నాలైతే', 'శూన్యాలు అయితే'],
  ['సున్నాల', 'శూన్యాల'],
  ['(AP)', '(A.P.)'],
  ['నిర్వచించబడలేదు', 'నిర్వచించబడదు'],
  ['లాగ్₁₀', 'log₁₀'],
  ['లాగ్₂', 'log₂'],
  ['అంటే ఏమిటి?', 'విలువ ఎంత?'],
  ['అంటే ఏమిటి', 'విలువ ఎంత'],
  
  // Geography / Social
  ['అవుట్‌లైన్ మ్యాప్‌ను', 'పటాన్ని'],
  ['లైన్ "X"', '"X" రేఖ'],
  ['నిరంతర పర్వత శ్రేణిని', 'అవిచ్ఛిన్న పర్వత శ్రేణిని'],
  ['ముసాయిదా కమిటీ', 'ముసాయిదా కమిటీ (Drafting Committee)'],
  ['వ్యూహాత్మక సముద్రాన్ని', 'వ్యూహాత్మక సముద్ర భాగాన్ని'],
  ['లక్షణాలు', 'లక్షణాలు']
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf-8');
  let originalLength = content.length;
  
  for (const [bad, good] of replacements) {
    // Escape for regex if needed, but simple split/join is safer for strings without regex chars
    content = content.split(bad).join(good);
  }
  
  fs.writeFileSync(file, content);
  console.log(`Processed ${file}, size changed from ${originalLength} to ${content.length}`);
}
console.log('Fixed common translation errors!');
