export const user = {
  name: 'Alex',
  fullName: 'Alex Johnson',
  level: 4,
  balance: 120.50,
};

export const stats = {
  todayAnswered: 7,
  todayTotal: 10,
  totalStaked: 85.40,
  potentialRewards: 24.80,
  accuracy: 68,
};

export const categories = [
  { key: 'all', label: 'All' },
  { key: 'politics', label: 'Politics' },
  { key: 'general', label: 'General Knowledge' },
  { key: 'math', label: 'Math' },
  { key: 'psychology', label: 'Psychology' },
  { key: 'crypto', label: 'Crypto' },
  { key: 'science', label: 'Science' },
  { key: 'sports', label: 'Sports' },
];

export const categoryStyles = {
  Politics: { text: 'text-violet-dark', bg: 'bg-violet-light' },
  Crypto: { text: 'text-amber-600', bg: 'bg-amber-50' },
  'General Knowledge': { text: 'text-sky-600', bg: 'bg-sky-50' },
  Math: { text: 'text-fuchsia-600', bg: 'bg-fuchsia-50' },
  Psychology: { text: 'text-rose-500', bg: 'bg-rose-50' },
  Science: { text: 'text-teal-600', bg: 'bg-teal-50' },
};

export const questions = [
  {
    id: 'us-election-2024',
    category: 'Politics',
    question: 'Will the United States hold presidential elections in 2024?',
    closes: '1h 24m',
    yes: 70,
    no: 30,
    yesPool: 7000,
    noPool: 3000,
    totalPool: 10000,
    resolves: 'This market resolves to "Yes" if the United States holds a presidential election in 2024. Otherwise, it resolves to "No."',
    resolution: 'Resolution will be based on official announcements from verified sources.',
    yourPosition: 'YES',
    yourStake: 1.50,
  },
  {
    id: 'global-recession',
    category: 'Politics',
    question: 'Will a global recession begin in 2025?',
    closes: '1h 30m',
    yes: 65,
    no: 35,
    yesPool: 4030,
    noPool: 2170,
    totalPool: 6200,
  },
  {
    id: 'element-o',
    category: 'General Knowledge',
    question: 'Which element has the chemical symbol \u2018O\u2019?',
    closes: '6h 45m',
    yes: 84,
    no: 16,
    yesPool: 2352,
    noPool: 448,
    totalPool: 2800,
  },
  {
    id: 'is-97-prime',
    category: 'Math',
    question: 'Is 97 a prime number?',
    closes: '6h 20m',
    yes: 92,
    no: 8,
    yesPool: 1702,
    noPool: 148,
    totalPool: 1850,
  },
  {
    id: 'first-impressions',
    category: 'Psychology',
    question: 'Do first impressions shape our long-term perception of people?',
    closes: '1d 2h',
    yes: 58,
    no: 42,
    yesPool: 2088,
    noPool: 1512,
    totalPool: 3600,
  },
  {
    id: 'ethereum-10k',
    category: 'Crypto',
    question: 'Will Ethereum reach $10,000 before 2026?',
    closes: '1d 8h',
    yes: 71,
    no: 29,
    yesPool: 6390,
    noPool: 2610,
    totalPool: 9000,
  },
];

export const todaysQuestions = [
  {
    id: 'largest-planet',
    category: 'General Knowledge',
    question: 'What is the largest planet in our solar system?',
    closes: '4h 45m',
    yes: 62,
    no: 38,
    totalPool: 2450,
  },
  {
    id: 'bitcoin-150k',
    category: 'Crypto',
    question: 'Will Bitcoin reach $150,000 before Dec 2026?',
    closes: '1d 18h',
    yes: 68,
    no: 32,
    totalPool: 8250,
  },
  {
    id: 'sum-of-angles',
    category: 'Math',
    question: 'Is 97 a prime number?',
    closes: '6h 20m',
    yes: 92,
    no: 8,
    totalPool: 1850,
  },
];

export const recentActivity = [
  { id: 1, type: 'yes', text: 'You answered YES on \u2018Will Bitcoin reach $150K before 2026?\u2019', time: '2h ago' },
  { id: 2, type: 'switch', text: 'You switched to NO on \u2018Will AI replace most human jobs by 2035?\u2019', time: '5h ago' },
  { id: 3, type: 'yes', text: 'You answered YES on \u2018Is the sum of the interior angles of a triangle 180\u00b0?\u2019', time: '1d ago' },
];

export const convictions = [
  {
    question: 'Will the United States hold presidential elections in 2024?',
    category: 'Politics',
    answer: 'YES',
    staked: 1.50,
    side: 70,
    totalPool: 10000,
    switched: 'No',
    status: 'Open',
  },
  {
    question: 'Will Bitcoin reach $150,000 before Dec 2026?',
    category: 'Crypto',
    answer: 'YES',
    staked: 2.00,
    side: 68,
    totalPool: 8250,
    switched: 'Yes (NO \u2192 YES)',
    status: 'Open',
  },
  {
    question: 'What is the largest planet in our solar system?',
    category: 'General Knowledge',
    answer: 'Jupiter',
    staked: 0.60,
    side: 62,
    totalPool: 2450,
    switched: 'No',
    status: 'Open',
  },
  {
    question: 'Do first impressions shape our long-term perception of people?',
    category: 'Psychology',
    answer: 'YES',
    staked: 1.20,
    side: 58,
    totalPool: 3600,
    switched: 'No',
    status: 'Open',
  },
  {
    question: 'Is 97 a prime number?',
    category: 'Math',
    answer: 'YES',
    staked: 0.50,
    side: 92,
    totalPool: 1850,
    switched: 'No',
    status: 'Open',
  },
];

export const convictionStats = {
  totalQuestions: 47,
  correctPredictions: 32,
  accuracy: 68,
  totalStaked: 85.40,
  potentialRewards: 24.80,
};

export const howItWorks = [
  {
    step: '01',
    title: 'Answer Questions',
    desc: 'Answer daily questions across politics, general knowledge, math, psychology, crypto and more.',
  },
  {
    step: '02',
    title: 'Pick YES or NO',
    desc: 'Choose the outcome you believe is more likely to happen.',
  },
  {
    step: '03',
    title: 'Stake Your Conviction',
    desc: 'Commit a small amount of Quai to back your answer with conviction.',
  },
  {
    step: '04',
    title: 'Market Reflects Conviction',
    desc: 'YES / NO percentages show the total money volume on each side, not the number of users.',
  },
  {
    step: '05',
    title: 'Earn Rewards',
    desc: 'When the market resolves, correct predictions earn rewards based on the platform rules.',
  },
];
