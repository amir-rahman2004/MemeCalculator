import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Play, RotateCcw, Lock, Cpu, Sparkles, HelpCircle, Delete, Layers } from 'lucide-react';
import { playClick, playLockSound } from '../utils/audio';

interface CalculatorProps {
  onTriggerPaywall: (expression: string) => void;
}

interface LockedHistory {
  formula: string;
  timestamp: string;
}

export default function Calculator({ onTriggerPaywall }: CalculatorProps) {
  const [display, setDisplay] = useState('');
  const [history, setHistory] = useState<LockedHistory[]>([
    { formula: '999 × 999', timestamp: '10:42 AM' },
    { formula: '2 + 2', timestamp: '09:15 AM' }
  ]);
  const [statusMessage, setStatusMessage] = useState('SYSTEM SECURED');
  const [isComputing, setIsComputing] = useState(false);
  const [activeTab, setActiveTab] = useState<'standard' | 'quantum'>('standard');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Focus and handle keyboard entry
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid intercepting keyboard shortcuts when modals or inputs are focused
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') {
        return;
      }

      const key = e.key;

      if (/[0-9]/.test(key)) {
        handleButtonPress(key);
      } else if (key === '.') {
        handleButtonPress('.');
      } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        let op = key;
        if (key === '*') op = '×';
        if (key === '/') op = '÷';
        handleButtonPress(op);
      } else if (key === 'Enter' || key === '=') {
        e.preventDefault();
        handleEvaluate();
      } else if (key === 'Backspace') {
        handleBackspace();
      } else if (key === 'Escape') {
        handleClear();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [display]);

  // Scroll history to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleButtonPress = (val: string) => {
    playClick(600, 0.04);
    setStatusMessage('STANDBY INPUT');
    
    // Check lengths
    if (display.length >= 22) {
      setStatusMessage('BUFFER WIDTH EXCEEDED');
      return;
    }

    // Basic operator spacing helper
    const operators = ['+', '-', '×', '÷', '%'];
    const isValOperator = operators.includes(val);
    const lastChar = display.trim().slice(-1);
    const isLastCharOperator = operators.includes(lastChar);

    if (isValOperator) {
      if (display === '') return; // cannot start with operator
      if (isLastCharOperator) {
        // Replace operator
        setDisplay(prev => prev.trim().slice(0, -1) + ` ${val} `);
      } else {
        setDisplay(prev => prev + ` ${val} `);
      }
    } else {
      setDisplay(prev => prev + val);
    }
  };

  const handleClear = () => {
    playClick(450, 0.05);
    setDisplay('');
    setStatusMessage('MEM CLEAR - STANDBY');
  };

  const handleBackspace = () => {
    playClick(500, 0.04);
    if (display.endsWith(' ')) {
      // Remove trailing space and operator
      setDisplay(prev => prev.slice(0, -3));
    } else {
      setDisplay(prev => prev.slice(0, -1));
    }
    setStatusMessage('EDITING TAPE');
  };

  const handleEvaluate = () => {
    if (!display.trim()) {
      setStatusMessage('EMPTY EXPRESSION');
      return;
    }

    playClick(800, 0.06);
    setIsComputing(true);
    setStatusMessage('RESOLVING ALGORITHM...');

    // Fake computational timer
    setTimeout(() => {
      setIsComputing(false);
      playLockSound();
      setStatusMessage('🔒 SECURE LOCK DETECTED');

      // Add to locked history list
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setHistory(prev => [...prev, { formula: display, timestamp: timeStr }]);

      // Trigger the modal callbacks
      onTriggerPaywall(display);
    }, 700);
  };

  const handleLockedOperator = (op: string) => {
    // Advanced math operations instantly lock!
    playClick(750, 0.04);
    setStatusMessage(`🔒 PRO FUNCTION "${op}" LOCKED`);
    onTriggerPaywall(`${op}(${display || 'X'})`);
  };

  return (
    <div className="w-full max-w-sm mx-auto px-4">
      {/* Tab Selectors */}
      <div className="flex bg-zinc-950/80 p-1 rounded-2xl border border-zinc-900 mb-4 text-xs font-medium">
        <button 
          onClick={() => { playClick(550, 0.04); setActiveTab('standard'); }}
          className={`flex-1 py-1.5 rounded-xl transition flex items-center justify-center gap-1.5 ${
            activeTab === 'standard' 
              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' 
              : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          Standard Core
        </button>
        <button 
          onClick={() => { playClick(550, 0.04); setActiveTab('quantum'); }}
          className={`flex-1 py-1.5 rounded-xl transition flex items-center justify-center gap-1.5 ${
            activeTab === 'quantum' 
              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' 
              : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          Quantum VIP AI
        </button>
      </div>

      {/* Main Glassmorphic Calculator Shell */}
      <div className="relative rounded-3xl bg-zinc-950 border border-zinc-800/80 shadow-2xl p-4 sm:p-5 space-y-4">
        
        {/* Glow Effects behind calculator */}
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-b from-amber-500/5 to-transparent blur-xl pointer-events-none" />

        {/* Brand header on the unit itself */}
        <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono tracking-widest uppercase select-none px-1">
          <span className="flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            SWISS MATH CORE v4
          </span>
          <span className="text-amber-500/70 font-semibold flex items-center gap-1">
            <Lock className="w-2.5 h-2.5 text-amber-500" />
            PREMIUM LEDGER
          </span>
        </div>

        {/* DISPLAY UNIT */}
        <div className="rounded-2xl bg-zinc-900/90 border border-zinc-800/60 p-4 space-y-2 relative overflow-hidden flex flex-col justify-between h-40">
          
          {/* Subtle Scanline Overlay */}
          <div className="absolute inset-0 bg-scanlines pointer-events-none opacity-[0.02]" />

          {/* Locked computation tape history inside screen */}
          <div 
            ref={scrollRef}
            className="text-[10px] text-zinc-600 font-mono text-right overflow-y-auto max-h-16 space-y-1 pr-1 border-b border-zinc-800/40 pb-1"
          >
            {history.map((hist, i) => (
              <div key={i} className="flex justify-between items-center opacity-70 hover:opacity-100 transition-opacity">
                <span>[{hist.timestamp}]</span>
                <span>{hist.formula} = <span className="text-amber-500 font-semibold">[SUBSCRIBE] 🔒</span></span>
              </div>
            ))}
            {history.length === 0 && <span className="italic block text-left">No locked computations tape...</span>}
          </div>

          {/* Active typed expression & status */}
          <div className="text-right space-y-1">
            {/* Status indicator line */}
            <div className="flex justify-between items-center text-[9px] font-mono select-none">
              <span className={`px-1.5 py-0.5 rounded ${
                isComputing 
                  ? 'bg-amber-500/20 text-amber-400' 
                  : statusMessage.includes('LOCK') 
                  ? 'bg-red-500/15 text-red-400' 
                  : 'bg-zinc-800 text-zinc-500'
              }`}>
                {statusMessage}
              </span>
              <span className="text-zinc-500">SYSTEM: STANDBY</span>
            </div>

            {/* Core digits */}
            <div className="overflow-x-auto whitespace-nowrap scrollbar-none py-1">
              <div className="text-3xl font-mono font-bold text-white tracking-tight leading-none">
                {isComputing ? (
                  <span className="text-amber-400 animate-pulse">COMPUTING...</span>
                ) : (
                  display || '0'
                )}
              </div>
            </div>
          </div>

        </div>

        {/* SCIENTIFIC PRO MODIFIERS BUTTON ROW */}
        <div className="grid grid-cols-4 gap-2">
          {['sin', 'cos', '√', 'x²'].map((op) => (
            <button
              key={op}
              id={`btn-modifier-${op}`}
              onClick={() => handleLockedOperator(op)}
              className="relative py-2 rounded-xl bg-zinc-900/40 hover:bg-zinc-900/80 border border-zinc-800/50 hover:border-amber-500/20 text-zinc-400 hover:text-zinc-200 text-xs font-mono transition flex items-center justify-center gap-1"
            >
              <span>{op}</span>
              <Lock className="w-2.5 h-2.5 text-amber-500/80 shrink-0" />
            </button>
          ))}
        </div>

        {/* BASIC CALCULATOR GRID */}
        <div className="space-y-2">
          {/* Row 1: AC, Backspace, Modulo, Divide */}
          <div className="grid grid-cols-4 gap-2">
            <button 
              id="btn-key-ac"
              onClick={handleClear}
              className="py-3.5 rounded-2xl bg-zinc-900/60 hover:bg-zinc-900 text-red-400 hover:text-red-300 font-semibold text-sm transition-all border border-zinc-800/40 active:scale-95"
            >
              AC
            </button>
            <button 
              id="btn-key-backspace"
              onClick={handleBackspace}
              className="py-3.5 rounded-2xl bg-zinc-900/60 hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200 font-semibold text-sm transition-all border border-zinc-800/40 active:scale-95 flex items-center justify-center"
            >
              <Delete className="w-4 h-4" />
            </button>
            <button 
              id="btn-key-modulo"
              onClick={() => handleButtonPress('%')}
              className="py-3.5 rounded-2xl bg-zinc-900/60 hover:bg-zinc-900 text-amber-400 hover:text-amber-300 font-semibold text-sm transition-all border border-zinc-800/40 active:scale-95"
            >
              %
            </button>
            <button 
              id="btn-key-divide"
              onClick={() => handleButtonPress('÷')}
              className="py-3.5 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 font-bold text-base transition-all border border-amber-500/20 active:scale-95"
            >
              ÷
            </button>
          </div>

          {/* Row 2: 7, 8, 9, Multiply */}
          <div className="grid grid-cols-4 gap-2">
            {['7', '8', '9'].map((num) => (
              <button 
                key={num}
                id={`btn-key-${num}`}
                onClick={() => handleButtonPress(num)}
                className="py-3.5 rounded-2xl bg-zinc-900/30 hover:bg-zinc-900/80 text-white font-medium text-base transition-all border border-zinc-800/30 active:scale-95"
              >
                {num}
              </button>
            ))}
            <button 
              id="btn-key-multiply"
              onClick={() => handleButtonPress('×')}
              className="py-3.5 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 font-bold text-base transition-all border border-amber-500/20 active:scale-95"
            >
              ×
            </button>
          </div>

          {/* Row 3: 4, 5, 6, Subtract */}
          <div className="grid grid-cols-4 gap-2">
            {['4', '5', '6'].map((num) => (
              <button 
                key={num}
                id={`btn-key-${num}`}
                onClick={() => handleButtonPress(num)}
                className="py-3.5 rounded-2xl bg-zinc-900/30 hover:bg-zinc-900/80 text-white font-medium text-base transition-all border border-zinc-800/30 active:scale-95"
              >
                {num}
              </button>
            ))}
            <button 
              id="btn-key-subtract"
              onClick={() => handleButtonPress('-')}
              className="py-3.5 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 font-bold text-base transition-all border border-amber-500/20 active:scale-95"
            >
              -
            </button>
          </div>

          {/* Row 4: 1, 2, 3, Add */}
          <div className="grid grid-cols-4 gap-2">
            {['1', '2', '3'].map((num) => (
              <button 
                key={num}
                id={`btn-key-${num}`}
                onClick={() => handleButtonPress(num)}
                className="py-3.5 rounded-2xl bg-zinc-900/30 hover:bg-zinc-900/80 text-white font-medium text-base transition-all border border-zinc-800/30 active:scale-95"
              >
                {num}
              </button>
            ))}
            <button 
              id="btn-key-add"
              onClick={() => handleButtonPress('+')}
              className="py-3.5 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 font-bold text-base transition-all border border-amber-500/20 active:scale-95"
            >
              +
            </button>
          </div>

          {/* Row 5: 0, Decimal, Equals */}
          <div className="grid grid-cols-4 gap-2">
            <button 
              id="btn-key-0"
              onClick={() => handleButtonPress('0')}
              className="col-span-2 py-3.5 rounded-2xl bg-zinc-900/30 hover:bg-zinc-900/80 text-white font-medium text-base transition-all border border-zinc-800/30 active:scale-95"
            >
              0
            </button>
            <button 
              id="btn-key-decimal"
              onClick={() => handleButtonPress('.')}
              className="py-3.5 rounded-2xl bg-zinc-900/30 hover:bg-zinc-900/80 text-white font-medium text-base transition-all border border-zinc-800/30 active:scale-95"
            >
              .
            </button>
            <button 
              id="btn-key-equals"
              onClick={handleEvaluate}
              className="py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-lg transition-all shadow-md shadow-amber-500/15 flex items-center justify-center active:scale-95"
            >
              =
            </button>
          </div>
        </div>

        {/* Funny informational footer on bottom of calc */}
        <div className="text-center text-[9px] text-zinc-600 select-none border-t border-zinc-900/80 pt-2 flex items-center justify-center gap-1 font-mono">
          <HelpCircle className="w-2.5 h-2.5" />
          <span>Press ESC to clear memory register</span>
        </div>

      </div>
    </div>
  );
}
