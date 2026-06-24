import { SubscriptionPlan, Review } from './types';

export const PREMIUM_PLANS: SubscriptionPlan[] = [
  {
    id: 'basic',
    name: 'Basic Arithmetic',
    price: '৳19',
    originalPrice: '৳49',
    features: [
      'Unlock addition (+) and subtraction (-)',
      'Numbers from 1 to 50 only',
      'Standard bKash validation (24-48 hours)',
      'Basic copper digital theme'
    ]
  },
  {
    id: 'pro',
    name: 'Pro Sovereign VIP',
    price: '৳49',
    originalPrice: '৳120',
    badge: 'Popular',
    features: [
      'Unlock multiplication (*) and division (/)',
      'Advanced decimal point support (.)',
      'Secret Calculator AI assistant',
      'Fast-track bKash queue (12-24 hours)'
    ]
  },
  {
    id: 'quantum',
    name: 'Hyper-Quantum VIP',
    price: '৳149',
    originalPrice: '৳399',
    badge: 'Ultimate',
    features: [
      'Full support for division by zero (experimental)',
      'Unlimited digit precision (visually elegant)',
      'Priority mathematical ledger clearance',
      'Direct line to our head mathematician'
    ]
  }
];

export const PREMIUM_BENEFITS = [
  {
    title: 'Infinite Arithmetic',
    description: 'Calculate values greater than 100 without triggering regional regulatory rate limits.',
    icon: 'Infinity'
  },
  {
    title: 'Secret Calculator AI',
    description: 'Our proprietary server-side neural math core predicts what your answer would have been.',
    icon: 'Cpu'
  },
  {
    title: 'Ultra-Fast Paywall Loading',
    description: 'Zero-latency system blocks mathematical outputs in under 4 milliseconds.',
    icon: 'Zap'
  },
  {
    title: 'Sovereign Status Layout',
    description: 'Glow golden button borders, premium hover micro-sound design, and exclusive fonts.',
    icon: 'Crown'
  }
];

export const PREMIUM_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Fahim Ahmed',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=120&h=120',
    rating: 5,
    date: 'Today',
    comment: 'The gold glassmorphism calculator is so gorgeous. When I hit 100/5 and the paywall locked it, I immediately sent ৳49 via bKash. Still waiting in the verification queue, but the button clicking sounds are extremely soothing.',
    plan: 'Pro Sovereign VIP'
  },
  {
    id: 'rev-2',
    name: 'Nusrat Jahan',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120&h=120',
    rating: 5,
    date: 'Yesterday',
    comment: 'Saved my college homework! Instead of submitting wrong answers, I sent a screenshot showing my Calculation Premium subscription was pending approval. My professor gave me an A+ for financial responsibility.',
    plan: 'Pro Sovereign VIP'
  },
  {
    id: 'rev-3',
    name: 'Sakib Chowdhury',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120',
    rating: 4.8,
    date: '2 days ago',
    comment: 'I upgraded to the Hyper-Quantum plan to test division by zero. The application threw a gorgeous premium warning popup telling me I was about to collapse the space-time continuum. Best ৳149 I have ever spent.',
    plan: 'Hyper-Quantum VIP'
  },
  {
    id: 'rev-4',
    name: 'Farhana Akhter',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=120&h=120',
    rating: 5,
    date: '3 days ago',
    comment: 'Usually calculators are boring. This one feels like a luxury Swiss watch. The bKash validation queue counter currently says my transaction will be verified in 712 hours. Can’t wait to calculate 2+2!',
    plan: 'Basic Arithmetic'
  }
];

export const FUNNY_SLOGANS = [
  'Over 12,840 arithmetic processes secured against deflation today.',
  'Did you know? 98% of users upgraded to Pro after calculating 2+2.',
  'Why calculate for free when you can pay a tiny bKash subscription for premium suspense?',
  'Warning: Free calculations may contain rounding errors up to ±100%. Subscribe to ensure exact premium results.'
];
