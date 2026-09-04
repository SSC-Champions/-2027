const fs = require('fs');
let code = fs.readFileSync('src/components/dashboard/StudentDashboardView.tsx', 'utf-8');

// Filter initial state
const oldInitialState = `  const [attempts, setAttempts] = useState<SSCTestAttempt[]>(() => {
    return getSavedAttempts();
  });`;
const newInitialState = `  const [attempts, setAttempts] = useState<SSCTestAttempt[]>(() => {
    const all = getSavedAttempts();
    return currentUser?.penNo ? all.filter(a => a.penNo === currentUser.penNo) : [];
  });`;
code = code.replace(oldInitialState, newInitialState);

// Filter in useEffect
const oldUseEffect = `  // Reload attempts on mount or user switch
  useEffect(() => {
    setAttempts(getSavedAttempts());
  }, [currentUser]);`;
const newUseEffect = `  // Reload attempts on mount or user switch
  useEffect(() => {
    const all = getSavedAttempts();
    setAttempts(currentUser?.penNo ? all.filter(a => a.penNo === currentUser.penNo) : []);
  }, [currentUser]);`;
code = code.replace(oldUseEffect, newUseEffect);

// Seed data
const oldSeed = `    const seeded = getSavedAttempts();
    setAttempts([...seeded]);`;
const newSeed = `    const seeded = getSavedAttempts();
    setAttempts(currentUser?.penNo ? seeded.filter(a => a.penNo === currentUser.penNo) : []);`;
code = code.replace(oldSeed, newSeed);

// Delete attempt
const oldDelete = `      deleteSavedAttempt(id);
      setAttempts(getSavedAttempts());`;
const newDelete = `      deleteSavedAttempt(id);
      const all = getSavedAttempts();
      setAttempts(currentUser?.penNo ? all.filter(a => a.penNo === currentUser.penNo) : []);`;
code = code.replace(oldDelete, newDelete);

fs.writeFileSync('src/components/dashboard/StudentDashboardView.tsx', code);
