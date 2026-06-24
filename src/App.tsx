import { useState } from 'react';
import Calculator from './components/Calculator';
import PaywallModal from './components/PaywallModal';

export default function App() {
  const [isPaywallOpen, setIsPaywallOpen] = useState(false);
  const [currentExpression, setCurrentExpression] = useState('2+2');

  const handleTriggerPaywall = (expression: string) => {
    setCurrentExpression(expression);
    setIsPaywallOpen(true);
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans antialiased flex flex-col items-center justify-center relative selection:bg-amber-500/20 selection:text-amber-300 p-4 overflow-hidden">
      
      {/* Premium Ambient Background Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-zinc-800/10 rounded-full blur-3xl pointer-events-none" />

      {/* Calculator Component Centered */}
      <div className="relative w-full max-w-sm z-10 animate-fade-in">
        <Calculator onTriggerPaywall={handleTriggerPaywall} />
      </div>

      {/* Paywall Modal overlay */}
      <PaywallModal 
        isOpen={isPaywallOpen}
        onClose={() => setIsPaywallOpen(false)}
        expression={currentExpression}
      />

    </div>
  );
}
