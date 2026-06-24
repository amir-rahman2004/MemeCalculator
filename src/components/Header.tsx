import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Crown, Sparkles, AlertTriangle, BadgePercent, Lock } from 'lucide-react';
import { FUNNY_SLOGANS } from '../data';
import { playClick } from '../utils/audio';

export default function Header() {
  const [lockedToday, setLockedToday] = useState(12847);
  const [sloganIndex, setSloganIndex] = useState(0);

  // Tick up locked calculations today
  useEffect(() => {
    const interval = setInterval(() => {
      setLockedToday(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Rotate slogan index
  useEffect(() => {
    const interval = setInterval(() => {
      setSloganIndex(prev => (prev + 1) % FUNNY_SLOGANS.length);
    }, 8500);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="w-full max-w-4xl mx-auto space-y-6 text-center px-4 pt-8">
      
      {/* Decorative top badges */}
      <div className="flex flex-wrap justify-center gap-2 items-center text-xs">
        <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full px-3 py-1 font-medium flex items-center gap-1.5 shadow-sm shadow-amber-500/5">
          <Crown className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
          Arithmetic Premium Edition v4.2
        </span>
        <span className="bg-[#E2136E]/10 text-pink-300 border border-[#E2136E]/20 rounded-full px-3 py-1 font-medium flex items-center gap-1.5 shadow-sm">
          <BadgePercent className="w-3.5 h-3.5 text-[#E2136E]" />
          98% Upgrade Conversion
        </span>
      </div>

      {/* Main Title branding */}
      <div className="space-y-3">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight text-white select-none">
          Calculator <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 bg-clip-text text-transparent gold-glow">PRO</span>
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto font-sans leading-relaxed">
          The ultimate high-fidelity digital computer. Experience seamless zero-latency floating-point computations, wrapped in a secure quantum subscription shell.
        </p>
      </div>

      {/* Live locked counter and ticker */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
        {/* Metric Card 1 */}
        <div className="bg-zinc-950/50 backdrop-blur-md border border-zinc-900 rounded-2xl p-4 flex items-center justify-between shadow-xl">
          <div className="text-left space-y-0.5">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">Security Vault State</span>
            <div className="text-lg font-bold text-white flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-amber-500 animate-ping" />
              <span>Vault is Active</span>
            </div>
          </div>
          <div className="text-right space-y-0.5">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">Locked Today</span>
            <div className="text-lg font-mono font-bold text-amber-400">
              {lockedToday.toLocaleString()} 🔒
            </div>
          </div>
        </div>

        {/* Metric Card 2 - Award Badge */}
        <div className="bg-zinc-950/50 backdrop-blur-md border border-zinc-900 rounded-2xl p-4 flex items-center gap-3 text-left shadow-xl">
          <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-amber-400 uppercase tracking-widest font-bold">2026 Math Award Winner</span>
            <h4 className="text-xs text-zinc-300 font-medium font-display leading-tight">
              Best Bangladeshi Subscription Software
            </h4>
          </div>
        </div>
      </div>

      {/* Funny slogan display */}
      <div className="h-10 flex items-center justify-center max-w-xl mx-auto bg-zinc-900/20 rounded-xl px-4 border border-zinc-900/60 overflow-hidden">
        <motion.p 
          key={sloganIndex}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.4 }}
          className="text-zinc-500 text-xs text-center italic"
        >
          💡 {FUNNY_SLOGANS[sloganIndex]}
        </motion.p>
      </div>

    </header>
  );
}
