import { money } from '../theme';

const heroImg = require('../assets/hero.png');
const tiles = {
  'ultimate-gamer-pass': require('../assets/offerings/ultimate-gamer-pass.png'),
  'vip-gaming-experience': require('../assets/offerings/vip-gaming-experience.png'),
  'esports-training-package': require('../assets/offerings/esports-training-package.png'),
  'birthday-party-package': require('../assets/offerings/birthday-party-package.png'),
  'virtual-reality-experience': require('../assets/offerings/virtual-reality-experience.png'),
  'racing-simulator-challenge': require('../assets/offerings/racing-simulator-challenge.png'),
  'escape-room-challenge': require('../assets/offerings/escape-room-challenge.png'),
};

export type OfferingCategory = 'package' | 'experience';

export type Offering = {
  id: string;
  category: OfferingCategory;
  tagline: string;
  name: string;
  blurb: string;
  fee: number;
  image: number;
  includes: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  related: string[];
};

export const OFFERINGS: Offering[] = [
  {
    id: 'ultimate-gamer-pass',
    category: 'package',
    tagline: 'FULL-DAY PLAY',
    name: 'Ultimate Gamer Pass',
    blurb: 'Unlimited gaming access for a full day.',
    fee: 1500,
    image: tiles['ultimate-gamer-pass'],
    includes: [
      { title: 'PC gaming', description: 'Settle into the arena PC gaming environment and get into your game.' },
      { title: 'Console gaming', description: 'Switch up your play with console gaming included in your pass.' },
      { title: 'High-speed internet', description: 'Stay connected while you play in the arena.' },
      { title: 'Snack voucher', description: 'A snack voucher is part of your full-day package.' },
      { title: 'Tournament entry', description: 'Bring a competitive edge to your visit with included tournament entry.' },
    ],
    faqs: [
      { question: 'Does the pass cover a full day?', answer: 'Yes. The Ultimate Gamer Pass provides unlimited gaming access for a full day.' },
      { question: 'Are both PC and console gaming included?', answer: 'Yes. PC gaming and console gaming are both included, alongside high-speed internet, a snack voucher and tournament entry.' },
      { question: 'How do I ask about tournament entry?', answer: 'Tournament entry is included. Contact the arena team to discuss the tournament arrangements for your visit.' },
    ],
    related: ['vip-gaming-experience', 'virtual-reality-experience'],
  },
  {
    id: 'vip-gaming-experience',
    category: 'package',
    tagline: 'YOUR PRIVATE ARENA',
    name: 'VIP Gaming Experience',
    blurb: 'Premium gaming experience with exclusive facilities.',
    fee: 1500,
    image: tiles['vip-gaming-experience'],
    includes: [
      { title: 'Private gaming booth', description: 'Enjoy a dedicated private setting for your gaming experience.' },
      { title: 'Premium gaming equipment', description: 'Play with premium equipment as part of the VIP package.' },
      { title: 'Food and drinks', description: 'Food and drinks are included so your visit goes beyond the game.' },
      { title: 'Priority booking', description: 'Priority booking is part of the VIP experience. Ask the team about your preferred visit.' },
      { title: 'Personal gaming assistant', description: 'Personal assistance helps you get comfortable with your gaming setup.' },
    ],
    faqs: [
      { question: 'What makes this the VIP experience?', answer: 'The package brings together a private gaming booth, premium equipment and a personal gaming assistant.' },
      { question: 'Are refreshments included?', answer: 'Yes. Food and drinks are included in the R1500 package fee.' },
      { question: 'Does the package include priority booking?', answer: 'Yes. Priority booking is an inclusion. Contact the team to discuss availability and arrangements.' },
    ],
    related: ['ultimate-gamer-pass', 'esports-training-package'],
  },
  {
    id: 'esports-training-package',
    category: 'package',
    tagline: 'TRAIN WITH PURPOSE',
    name: 'Esports Training Package',
    blurb: 'Improve competitive gaming skills with professional coaching.',
    fee: 1500,
    image: tiles['esports-training-package'],
    includes: [
      { title: 'Strategy coaching', description: 'Work through the decisions that shape your competitive play.' },
      { title: 'Team communication', description: 'Focus on clearer callouts and coordinated play with your team.' },
      { title: 'Match analysis', description: 'Review gameplay to understand decisions, patterns and opportunities.' },
      { title: 'Practice sessions', description: 'Put coaching ideas into practice through focused gameplay.' },
      { title: 'Performance feedback', description: 'Use professional feedback to identify your next areas of improvement.' },
    ],
    faqs: [
      { question: 'What does the coaching focus on?', answer: 'The package covers strategy coaching, team communication, match analysis, practice sessions and performance feedback.' },
      { question: 'Will I receive feedback on my play?', answer: 'Yes. Performance feedback and match analysis are both included.' },
      { question: 'Can I discuss my competitive goals first?', answer: 'Yes. Use a booking inquiry to tell the team about your game and what you want to work on with professional coaching.' },
    ],
    related: ['ultimate-gamer-pass', 'vip-gaming-experience'],
  },
  {
    id: 'birthday-party-package',
    category: 'package',
    tagline: 'CELEBRATE TOGETHER',
    name: 'Birthday Party Package',
    blurb: 'Host a gaming-themed birthday celebration.',
    fee: 1500,
    image: tiles['birthday-party-package'],
    includes: [
      { title: 'Reserved gaming area', description: 'A reserved gaming area gives your celebration a place to come together.' },
      { title: 'Multiplayer competition', description: 'Get friends into the action with a shared multiplayer competition.' },
      { title: 'Party decorations', description: 'Party decorations bring the birthday atmosphere to the arena.' },
      { title: 'Catering', description: 'Catering is included in the birthday package. Discuss your requirements with the team.' },
      { title: 'Tournament prizes', description: 'Tournament prizes add a celebratory finish to the competition.' },
    ],
    faqs: [
      { question: 'What is included for the celebration?', answer: 'The package includes a reserved gaming area, multiplayer competition, party decorations, catering and tournament prizes.' },
      { question: 'Does the package include catering?', answer: 'Yes. Catering is included in the R1500 package fee. Share any catering questions in your inquiry.' },
      { question: 'How can I plan the party with the team?', answer: 'Send a booking inquiry with your preferred visit and celebration details, or call +27 9725682229 to discuss arrangements.' },
    ],
    related: ['virtual-reality-experience', 'escape-room-challenge'],
  },
  {
    id: 'virtual-reality-experience',
    category: 'experience',
    tagline: 'BEYOND THE SCREEN',
    name: 'Virtual Reality Experience',
    blurb: 'Explore immersive virtual reality games.',
    fee: 750,
    image: tiles['virtual-reality-experience'],
    includes: [
      { title: 'VR headset', description: 'A VR headset is included for your immersive gaming experience.' },
      { title: 'Choice of games', description: 'Explore the available games and choose the virtual world you want to enter.' },
      { title: 'Staff assistance', description: 'Staff assistance is included to help you get started with VR.' },
    ],
    faqs: [
      { question: 'Is a VR headset provided?', answer: 'Yes. The R750 experience includes a VR headset.' },
      { question: 'Can I choose what to play?', answer: 'Yes. A choice of games is included. Ask the team about the available VR games.' },
      { question: 'Is help available with the headset?', answer: 'Yes. Staff assistance is included in the Virtual Reality Experience.' },
    ],
    related: ['racing-simulator-challenge', 'escape-room-challenge'],
  },
  {
    id: 'racing-simulator-challenge',
    category: 'experience',
    tagline: 'CHASE THE LEADERBOARD',
    name: 'Racing Simulator Challenge',
    blurb: 'Race on professional driving simulators.',
    fee: 750,
    image: tiles['racing-simulator-challenge'],
    includes: [
      { title: 'Racing simulator', description: 'Get into the driving seat of a professional racing simulator.' },
      { title: 'Choice of tracks', description: 'Choose from the available tracks and take on your next racing challenge.' },
      { title: 'Leaderboard competition', description: 'Bring a competitive focus to your drive with leaderboard competition.' },
    ],
    faqs: [
      { question: 'What equipment is included?', answer: 'The experience includes a racing simulator for professional driving simulation.' },
      { question: 'Can I choose the track?', answer: 'Yes. A choice of tracks is included. Contact the team to ask about the available tracks.' },
      { question: 'Is there a competitive element?', answer: 'Yes. Leaderboard competition is included in the R750 Racing Simulator Challenge.' },
    ],
    related: ['virtual-reality-experience', 'escape-room-challenge'],
  },
  {
    id: 'escape-room-challenge',
    category: 'experience',
    tagline: 'THINK AS A TEAM',
    name: 'Escape Room Challenge',
    blurb: 'Solve puzzles and escape before time runs out.',
    fee: 750,
    image: tiles['escape-room-challenge'],
    includes: [
      { title: 'Team challenge', description: 'Combine your ideas and work together to solve the challenge.' },
      { title: 'Themed escape room', description: 'Step into a themed environment built around the puzzle-solving experience.' },
      { title: 'Digital scorecard', description: 'A digital scorecard is included to capture your challenge result.' },
    ],
    faqs: [
      { question: 'Is this a team experience?', answer: 'Yes. A team challenge is included in the Escape Room Challenge.' },
      { question: 'Will we receive a scorecard?', answer: 'Yes. A digital scorecard is included, alongside the themed escape room and team challenge.' },
      { question: 'How much would two bookings cost?', answer: 'Two bookings at R750 give a R1500 subtotal. The 5% bulk discount saves R75, for a quoted total of R1425.' },
    ],
    related: ['racing-simulator-challenge', 'birthday-party-package'],
  },
];

export const findOffering = (id: string): Offering =>
  OFFERINGS.find((o) => o.id === id) ?? OFFERINGS[0];

export const CONTACT = {
  brandLine1: 'NEXT LEVEL',
  brandLine2: 'GAMING ARENA',
  city: 'Joburg',
  hotline: '+27 9725682229',
  hours: 'Fri - Sun: 10:00 AM - 4:00 PM',
  hoursNote: 'Contact us to confirm opening hours.',
  heroImage: heroImg,
};
