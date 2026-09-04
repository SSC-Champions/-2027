const fs = require('fs');
let code = fs.readFileSync('src/components/ssc-test/SSCDailyPracticeTest.tsx', 'utf-8');

if (!code.includes("import confetti from 'canvas-confetti';")) {
  code = code.replace(
    /import \{ SSCTestResultView \} from '\.\/SSCTestResultView';/,
    "import { SSCTestResultView } from './SSCTestResultView';\nimport confetti from 'canvas-confetti';"
  );
}

const oldSubmit = `    saveTestAttempt(result);
    setCurrentAttempt(result);
    setTestState('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });`;

const newSubmit = `    saveTestAttempt(result);
    setCurrentAttempt(result);
    setTestState('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Trigger celebration confetti
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d', '#ff36ff'],
        zIndex: 9999
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d', '#ff36ff'],
        zIndex: 9999
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();`;

if (!code.includes('requestAnimationFrame(frame)')) {
  code = code.replace(oldSubmit, newSubmit);
}
fs.writeFileSync('src/components/ssc-test/SSCDailyPracticeTest.tsx', code);
