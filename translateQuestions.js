import fs from 'fs';
import translate from 'translate';

// We will use standard regex to find and replace questionText and options.
// Since the files are well-formatted, we can parse them as text.
const files = [
  'src/data/sscDailyTestBank.ts',
  'src/data/sscDailyTestBankSet2.ts',
  'src/data/sscDailyTestBankSet3.ts',
  'src/data/sscDailyTestBankSet4.ts',
  'src/data/sscDailyTestBankSet5.ts',
  'src/data/sscDailyTestBankSet6.ts',
];

const subjectsToTranslate = ['maths', 'physical_science', 'biological_science', 'social_studies'];

async function processFile(filePath) {
  console.log(`Processing ${filePath}...`);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // A crude but effective regex for the object structure
  const questionRegex = /\{[^}]*subjectId:\s*'([^']+)'[^}]*questionText:\s*'(.*?)'[^}]*options:\s*\[(.*?)\]/g;
  
  // We need a better parser. Let's use a simple state machine to find blocks.
  const lines = content.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check if we are in a question block for non-language
    if (line.includes('subjectId:')) {
      const match = line.match(/subjectId:\s*'([^']+)'/);
      if (match && subjectsToTranslate.includes(match[1])) {
        
        // Find questionText
        let qIdx = i;
        while (qIdx < lines.length && !lines[qIdx].includes('questionText:')) qIdx++;
        
        if (qIdx < lines.length) {
          const qMatch = lines[qIdx].match(/questionText:\s*'(.*?)',/);
          if (qMatch) {
            const originalText = qMatch[1];
            if (!originalText.includes(' / ')) {
              try {
                const translated = await translate(originalText, 'te');
                lines[qIdx] = lines[qIdx].replace(originalText, `${originalText} / ${translated}`);
                console.log(`Translated Q: ${originalText.substring(0, 30)}...`);
              } catch (e) {
                console.error('Translation failed:', e);
              }
            }
          }
        }
        
        // Find options
        let optIdx = i;
        while (optIdx < lines.length && !lines[optIdx].includes('options:')) optIdx++;
        
        if (optIdx < lines.length) {
          const optMatch = lines[optIdx].match(/options:\s*\[(.*?)\]/);
          if (optMatch) {
            const optsStr = optMatch[1];
            // Match single quotes
            const opts = [...optsStr.matchAll(/'([^']+)'/g)].map(m => m[1]);
            const newOpts = [];
            for (const opt of opts) {
              if (!opt.includes(' / ') && !/^[0-9.\- ]+$/.test(opt) && !/^[a-zA-Z]$/.test(opt)) {
                try {
                  const translatedOpt = await translate(opt, 'te');
                  newOpts.push(`${opt} / ${translatedOpt}`);
                } catch (e) {
                  newOpts.push(opt);
                }
              } else {
                newOpts.push(opt);
              }
            }
            if (newOpts.length === opts.length) {
              lines[optIdx] = lines[optIdx].replace(/\[(.*?)\]/, `['${newOpts.join("', '")}']`);
            }
          }
        }
      }
    }
  }
  
  fs.writeFileSync(filePath, lines.join('\n'));
}

async function run() {
  for (const file of files) {
    await processFile(file);
  }
  console.log("Translation complete!");
}

run();
