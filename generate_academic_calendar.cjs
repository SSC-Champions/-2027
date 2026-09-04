const fs = require('fs');

const topics = [
  'Acids and Bases', 'Acids, Bases and Salts', 'Active & Passive Voice', 'Antonyms', 'Articles', 'Carbon and its Compounds', 'Chemical Reactions and Equations', 'Chemical Reactions & Gas Evolution', 'Circulation', 'Class 10 English Prose Literature', 'Classification of Elements', 'Climate of India', 'Conditional Clauses (Type 3)', 'Conjunctions', 'Constitution of India', 'Control and Coordination', 'Coordinate Geometry', 'Coordination', 'Coordination in Plants', 'Degrees of Comparison', 'Democracy & Elections', 'Democratic Politics & Parliament', 'Development & Economic Classification', 'Development & Economics', 'Direct & Indirect Speech', 'Drainage & Rivers', 'Economy', 'Electric Current', 'Electric Current & Circuits', 'Electromagnetism', 'Employment Programs', 'Employment & Sectors', 'English Literature Reader', 'English Reader Literature', 'Environmental Movements', 'Excretion', 'Excretion - Renal System', 'Figures of Speech', 'Food Security in India', 'Fundamental Rights & Writs', 'Future Perfect Tense', 'Geometry - Circles', 'Global Economic Institutions', 'Globalisation & World Trade', 'Heredity', 'Heredity and Evolution', 'Heredity & Genetics', 'Human Eye & Refraction', 'Idioms', 'Idioms and Phrases', 'Idioms & Proverbs', 'Indian Constitution', 'Indian Constitution & Rights', 'Indian Democracy & Elections', 'India - Relief Features', 'India Relief Features', 'India: Relief Features (Map Skills)', 'India Relief & Location', 'Linear Equations', 'Linear Equations in Two Variables', 'Logarithms', 'Logarithms & Real Numbers', 'Making of Independent India', 'Mensuration', 'Modal Auxiliaries', 'Money & Credit', 'National Movement', 'National Movement - Civil Disobedience', 'Nutrition & Digestion', 'Nutrition - Human Digestion', 'Nutrition - Photosynthesis', 'Nutrition & Vitamins', 'One-word Substitutes', 'One Word Substitutes', 'Our Environment', 'Our Environment - Ecosystems', 'Parts of Speech', 'Past Perfect Tense', 'Periodic Classification', 'Personality Development Literature', 'Photosynthesis', 'Phrasal Verbs', 'Physiographic Divisions (Map Skills)', 'Physiography', 'Polynomials', 'Population', 'Population & Demographics', 'Population & Human Resources', 'Population & Literacy', 'Post-Independence India', 'Preamble & Indian Constitution', 'Prefixes & Antonyms', 'Prepositions', 'Principles of Metallurgy', 'Probability', 'Progressions', 'Progressions (AP & GP)', 'Punctuation', 'Quadratic Equations', 'Question Tags', 'Real Numbers', 'Real Numbers - Fundamental Theorem of Arithmetic', 'Reflection of Light', 'Refraction & Lenses', 'Refraction & Mirrors (Ray Diagram)', 'Refraction of Light', 'Reproduction', 'Respiration', 'Respiration - Fermentation', 'Rivers & Geography', 'Rivers & Multipurpose Projects', 'Rivers & Water Resources', 'Rivers & Water Systems', 'Salts & Chemistry', 'Sectors of Economy (Information Skills)', 'Sectors of the Indian Economy', 'Sets', 'Similar Triangles', 'Simple, Compound & Complex Sentences', 'Social Movements & Civic Rights', 'Spelling', 'Spelling Accuracy', 'Spotting Errors', 'Statistics', 'Structure of Atom', 'Structure of Atom & Periodic Table', 'Subject-Verb Agreement', 'Sustainable Development', 'Synonyms', 'Tenses & Prepositions', 'The World Between Wars', 'The World Between Wars & Post-War World', 'The World Between Wars - Russian Revolution', 'The World Between Wars (World Map Skills)', 'Transportation', 'Transportation - Blood Pressure', 'Transportation & Heart', 'Transportation in Plants', 'Triangles & Pythagoras', 'Trigonometric Identities', 'Trigonometric Values', 'Trigonometry', 'Vocabulary & Antonyms', 'Water Resources', 'World Wars', 'उपसर्ग', 'उपसर्ग एवं प्रत्यय', 'कवि परिचय', 'कारक', 'कारक (Case)', 'काल', 'काल (Tense)', 'क्रिया', 'क्रिया एवं वाक्य', 'तत्सम एवं तद्भव', 'दीर्घ संधि', 'पर्यायवाची', 'पर्यायवाची शब्द', 'पाठ्य पुस्तक', 'पाठ्य पुस्तक / विधा', 'पाठ्य पुस्तक / संदेश', 'प्रत्यय', 'मुहावरे', 'मुहावरे (Idioms)', 'लिंग', 'लेखक परिचय', 'वर्तनी शुद्धि', 'वाक्य के भेद', 'विलोम शब्द', 'व्यंजन संधि', 'व्याकरण', 'संज्ञा', 'संधि', 'संधि (Sandhi)', 'संधि विच्छेद', 'समास', 'समास (Samas)', 'समास विग्रह', 'साहित्य', 'साहित्यिक परिचय', 'అర్థాలు & పర్యాయాలు', 'అలంకారాలు', 'ఉపజాతి పద్య ఛందస్సు', 'ఉపమాలంకారం', 'కర్తరి - కర్మణి వాక్యాలు', 'కవుల పరిచయం', 'కవుల పరిచయం / ఆధునిక కవిత్వం', 'కవుల పరిచయం / పాఠ్యభాగం', 'కవుల పరిచయం / శతక సాహిత్యం', 'కాలాలు & క్రియలు', 'గేయ సాహిత్యం & కవులు', 'ఛందస్సు', 'జాతి పద్య ఛందస్సు', 'జాతీయాలు', 'పర్యాయపదాలు', 'పాఠ్యభాగ విషయ సంగ్రహం', 'పాఠ్యభాగ సందేశం', 'ప్రకృతి - వికృతి', 'వాక్య రకాలు', 'వాక్య విశ్లేషణ (కర్త, కర్మ, క్రియ)', 'వ్యతిరేకార్థక వాక్యాలు', 'శతక సాహిత్యం', 'సంధులు', 'సమాసాలు', 'సవర్ణదీర్ఘ సంధి', 'సామెతలు', 'సాహిత్య పరిచయం'
];

const months = [6, 7, 8, 9, 10, 11, 12, 1, 2, 3];
const mapping = {};

topics.forEach((topic) => {
  let assignedMonth = 9; 
  const t = topic.toLowerCase();
  
  if (t.includes('real number') || t.includes('india relief') || t.includes('nutrition') || t.includes('reflection') || t.includes('parts of speech') || t.includes('tenses') || t.includes('కవుల పరిచయం') || t.includes('संज्ञा') || t.includes('సంధులు')) {
    assignedMonth = 6;
  } else if (t.includes('sets') || t.includes('polynomial') || t.includes('climate') || t.includes('respiration') || t.includes('chemical reaction') || t.includes('articles') || t.includes('preposition') || t.includes('సమాసాలు') || t.includes('सर्वनाम')) {
    assignedMonth = 7;
  } else if (t.includes('linear equation') || t.includes('river') || t.includes('transportation') || t.includes('acids') || t.includes('voice') || t.includes('అలంకారాలు') || t.includes('समास')) {
    assignedMonth = 8;
  } else if (t.includes('quadratic') || t.includes('progression') || t.includes('population') || t.includes('excretion') || t.includes('refraction') || t.includes('speech') || t.includes('ఛందస్సు') || t.includes('संधि')) {
    assignedMonth = 9;
  } else if (t.includes('coordinate') || t.includes('triangle') || t.includes('world between wars') || t.includes('control') || t.includes('coordination') || t.includes('human eye') || t.includes('clauses') || t.includes('జాతీయాలు') || t.includes('मुहावरे')) {
    assignedMonth = 10;
  } else if (t.includes('mensuration') || t.includes('national movement') || t.includes('reproduction') || t.includes('atom') || t.includes('periodic') || t.includes('degree') || t.includes('సామెతలు') || t.includes('काल')) {
    assignedMonth = 11;
  } else if (t.includes('trigonometry') || t.includes('constitution') || t.includes('heredity') || t.includes('electric') || t.includes('idioms') || t.includes('వాక్య') || t.includes('पर्यायवाची')) {
    assignedMonth = 12;
  } else if (t.includes('probability') || t.includes('democracy') || t.includes('environment') || t.includes('electromagnetism') || t.includes('phrasal') || t.includes('अव्यय')) {
    assignedMonth = 1;
  } else if (t.includes('statistics') || t.includes('economy') || t.includes('metallurgy') || t.includes('carbon') || t.includes('punctuation') || t.includes('उपसर्ग')) {
    assignedMonth = 2;
  } else {
    assignedMonth = months[t.length % months.length];
  }
  
  mapping[topic] = assignedMonth;
});

const fileContent = `export const TOPIC_MONTH_MAPPING: Record<string, number> = ${JSON.stringify(mapping, null, 2)};

/**
 * Returns true if the given topic is scheduled to be completed by the target month.
 * Academic year starts in June (6).
 */
export function isTopicEligible(topic: string, currentMonth: number): boolean {
  const scheduledMonth = TOPIC_MONTH_MAPPING[topic];
  if (!scheduledMonth) return true; // Fallback to allow if unknown

  const academicOrder = [6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5];
  const currentIndex = academicOrder.indexOf(currentMonth);
  const scheduledIndex = academicOrder.indexOf(scheduledMonth);
  
  if (currentIndex === -1 || scheduledIndex === -1) return true;
  return scheduledIndex <= currentIndex;
}

export function getCurrentSystemMonth(): number {
  return new Date().getMonth() + 1; // 1-12
}
`;

fs.writeFileSync('src/services/academicCalendarService.ts', fileContent);
