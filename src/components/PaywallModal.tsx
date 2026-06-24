import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, X, Check, ShieldCheck, Sparkles, 
  User, Phone, KeyRound, Hourglass, CreditCard,
  AlertCircle, ChevronRight, Coins
} from 'lucide-react';
import { PREMIUM_PLANS } from '../data';
import { playClick, playSuccessSound, playSubmitBloop } from '../utils/audio';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  expression: string;
}

export default function PaywallModal({ isOpen, onClose, expression }: PaywallModalProps) {
  const [selectedPlan, setSelectedPlan] = useState(PREMIUM_PLANS[1]); // Default to Pro
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [trxId, setTrxId] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStep, setSubmitStep] = useState(0);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'verifying' | 'completed'>('idle');
  const [queuePosition, setQueuePosition] = useState(8421);

  // Error validations
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const verificationSteps = [
    'Initializing quantum secure tunnel...',
    'Interrogating bKash API node...',
    'Checking database ledger for duplicate TrxIDs...',
    `Verifying mathematical integrity of "${expression}"...`,
    'Calculating bKash fee structure...',
    'Securing approval of Bangladesh Mathematical Society...',
    'Placing your calculation in premium validation queue...'
  ];

  // Increment step during submit animation
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSubmitting && submitStep < verificationSteps.length) {
      timer = setTimeout(() => {
        setSubmitStep(prev => prev + 1);
        playClick(400 + (submitStep * 80), 0.05);
      }, 1100);
    } else if (isSubmitting && submitStep === verificationSteps.length) {
      setIsSubmitting(false);
      setSubmitStatus('completed');
      playSuccessSound();
    }
    return () => clearTimeout(timer);
  }, [isSubmitting, submitStep]);

  // Keep queue updating slowly to show standard premium "activity"
  useEffect(() => {
    const interval = setInterval(() => {
      setQueuePosition(prev => {
        const delta = Math.floor(Math.random() * 3) - 1; // fluctuates or drops slowly
        return prev + delta > 0 ? prev + delta : prev;
      });
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const handlePlanSelect = (plan: typeof PREMIUM_PLANS[0]) => {
    playClick(650, 0.05);
    setSelectedPlan(plan);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = 'Full Name is required.';
    if (!phone.trim()) {
      newErrors.phone = 'bKash Number is required.';
    } else if (!/^(?:\+88|01)?\d{11}$/.test(phone.replace(/[-\s]/g, ''))) {
      newErrors.phone = 'Enter a valid 11-digit Bangladeshi mobile number.';
    }
    if (!trxId.trim()) {
      newErrors.trxId = 'Transaction ID is required.';
    } else if (trxId.length < 8) {
      newErrors.trxId = 'TrxID must be at least 8 alphanumeric characters.';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    playSubmitBloop();
    setIsSubmitting(true);
    setSubmitStep(0);
    setSubmitStatus('verifying');
  };

  const handleReset = () => {
    playClick(500, 0.05);
    setName('');
    setPhone('');
    setTrxId('');
    setSubmitStatus('idle');
    setIsSubmitting(false);
    setSubmitStep(0);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/80 backdrop-blur-md">
        
        {/* Main Modal */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative w-full max-w-2xl bg-zinc-950 border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl shadow-amber-500/10"
        >
          {/* Top Gold Bar */}
          <div className="h-1.5 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 w-full" />
          
          {/* Close Button */}
          {submitStatus !== 'verifying' && (
            <button 
              id="btn-close-paywall"
              onClick={() => { playClick(440, 0.05); onClose(); }}
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-full bg-zinc-900/50 hover:bg-zinc-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <div className="p-6 sm:p-8 max-h-[85vh] overflow-y-auto">
            
            {submitStatus === 'idle' && (
              <div className="space-y-6">
                
                {/* Paywall Header */}
                <div className="text-center space-y-2">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 mb-2 animate-bounce">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                    🔒 Calculation Locked!
                  </h3>
                  <p className="text-zinc-400 text-sm max-w-md mx-auto">
                    The result for <span className="text-amber-400 font-mono font-bold bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">{expression}</span> is available exclusively to Premium Arithmetic members.
                  </p>
                </div>

                {/* Plans Selection */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">Select Arithmetic Tier</span>
                    <span className="text-xs text-zinc-500">12,847 calculations locked today</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {PREMIUM_PLANS.map((plan) => {
                      const isSelected = selectedPlan.id === plan.id;
                      return (
                        <div 
                          key={plan.id}
                          onClick={() => handlePlanSelect(plan)}
                          className={`relative cursor-pointer rounded-2xl p-4 border transition-all duration-300 ${
                            isSelected 
                              ? 'bg-amber-500/5 border-amber-400 shadow-lg shadow-amber-500/5 scale-[1.02]' 
                              : 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-700'
                          }`}
                        >
                          {plan.badge && (
                            <span className="absolute -top-2.5 right-3 bg-amber-500 text-[9px] font-bold uppercase tracking-widest text-black px-2 py-0.5 rounded-full shadow-md">
                              {plan.badge}
                            </span>
                          )}
                          <div className="flex flex-col justify-between h-full space-y-2">
                            <div>
                              <h4 className="font-semibold text-sm text-zinc-100">{plan.name}</h4>
                              <div className="flex items-baseline space-x-1.5 mt-1">
                                <span className="text-xl font-bold text-amber-400">{plan.price}</span>
                                <span className="text-[10px] text-zinc-500 line-through">{plan.originalPrice}</span>
                              </div>
                            </div>
                            <ul className="text-[10px] text-zinc-400 space-y-1 pt-2 border-t border-zinc-800/60">
                              {plan.features.slice(0, 2).map((feat, i) => (
                                <li key={i} className="flex items-start">
                                  <Check className="w-3 h-3 text-amber-500 mr-1 shrink-0 mt-0.5" />
                                  <span className="line-clamp-1">{feat}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Funny conversion stat */}
                <div className="flex items-center space-x-2 p-2 px-3 bg-zinc-900/50 border border-zinc-800 rounded-xl text-[11px] text-zinc-400">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>⚡ <strong>98% of users</strong> upgrade to Premium when calculation locks occur to bypass educational rate limits.</span>
                </div>

                {/* bKash Payment Box */}
                <div className="border border-zinc-800 rounded-2xl overflow-hidden bg-zinc-900/30">
                  {/* bKash Header Banner */}
                  <div className="bg-[#E2136E] px-4 py-3 flex justify-between items-center text-white">
                    <div className="flex items-center space-x-2">
                      <div className="font-bold tracking-tight font-display text-sm bg-white text-[#E2136E] px-2 py-0.5 rounded">bKash</div>
                      <span className="text-xs font-medium">Official Digital Gateway</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-pink-100 block">Required Amount</span>
                      <span className="text-sm font-bold">{selectedPlan.price} BDT</span>
                    </div>
                  </div>

                  <form onSubmit={handleSubmitPayment} className="p-4 sm:p-5 space-y-4">
                    {/* Instructions */}
                    <div className="text-xs text-zinc-400 space-y-1.5 leading-relaxed bg-zinc-900/80 p-3 rounded-xl border border-zinc-800/40">
                      <p className="font-medium text-zinc-200">How to make payment:</p>
                      <ol className="list-decimal pl-4 space-y-1 text-[11px]">
                        <li>Send Money / Cash Out <strong className="text-amber-400">{selectedPlan.price}</strong> to bKash Personal Number: <code className="text-white font-mono bg-zinc-950 px-1.5 py-0.5 rounded border border-zinc-800">+880 1799-528414</code></li>
                        <li>Copy the 10-character Transaction ID (TrxID) received from bKash.</li>
                        <li>Fill in your credentials below to request prompt mathematical release.</li>
                      </ol>
                    </div>

                    {/* Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                      <div className="space-y-1">
                        <label className="text-[11px] font-medium text-zinc-400 flex items-center">
                          <User className="w-3 h-3 text-[#E2136E] mr-1" />
                          Full Name
                        </label>
                        <input 
                          type="text" 
                          placeholder="Fahim Ahmed"
                          value={name}
                          onChange={(e) => { setName(e.target.value); if (errors.name) delete errors.name; }}
                          className={`w-full bg-zinc-950 border text-sm rounded-xl px-3 py-2 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition ${
                            errors.name ? 'border-red-500/50' : 'border-zinc-800'
                          }`}
                        />
                        {errors.name && <span className="text-[10px] text-red-400 font-medium">{errors.name}</span>}
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-medium text-zinc-400 flex items-center">
                          <Phone className="w-3 h-3 text-[#E2136E] mr-1" />
                          Your bKash Phone Number
                        </label>
                        <input 
                          type="text" 
                          placeholder="01712345678"
                          value={phone}
                          onChange={(e) => { setPhone(e.target.value); if (errors.phone) delete errors.phone; }}
                          className={`w-full bg-zinc-950 border text-sm rounded-xl px-3 py-2 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition ${
                            errors.phone ? 'border-red-500/50' : 'border-zinc-800'
                          }`}
                        />
                        {errors.phone && <span className="text-[10px] text-red-400 font-medium">{errors.phone}</span>}
                      </div>
                    </div>

                    <div className="space-y-1 text-left">
                      <label className="text-[11px] font-medium text-zinc-400 flex items-center">
                        <KeyRound className="w-3 h-3 text-[#E2136E] mr-1" />
                        Transaction ID (TrxID)
                      </label>
                      <input 
                        type="text" 
                        placeholder="AK82H9DK3L"
                        value={trxId}
                        onChange={(e) => { setTrxId(e.target.value.toUpperCase()); if (errors.trxId) delete errors.trxId; }}
                        className={`w-full bg-zinc-950 border text-sm rounded-xl px-3 py-2 text-white uppercase font-mono placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition ${
                          errors.trxId ? 'border-red-500/50' : 'border-zinc-800'
                        }`}
                      />
                      {errors.trxId && <span className="text-[10px] text-red-400 font-medium">{errors.trxId}</span>}
                    </div>

                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 pt-1">
                      <button 
                        type="submit"
                        id="btn-submit-payment"
                        className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold py-2.5 rounded-xl transition-all duration-300 text-sm shadow-lg shadow-amber-500/10 flex items-center justify-center space-x-2 hover:scale-[1.01]"
                      >
                        <CreditCard className="w-4 h-4" />
                        <span>Submit Premium Payment</span>
                      </button>
                      <button 
                        type="button"
                        id="btn-maybe-later"
                        onClick={() => { playClick(440, 0.05); onClose(); }}
                        className="bg-zinc-900 hover:bg-zinc-800 text-zinc-300 py-2.5 px-4 rounded-xl text-sm transition-all border border-zinc-800 hover:border-zinc-700"
                      >
                        Maybe Later
                      </button>
                    </div>
                  </form>
                </div>

                <div className="text-center text-[10px] text-zinc-600 space-y-1">
                  <p>🛡️ Powered by Quantum Ledger Protocol. Encrypted client-to-merchant mathematics pipeline.</p>
                  <p>© 2026 Premium Arithmetic Bangladesh Ltd. All arithmetic equations remain properties of original subscribers.</p>
                </div>
              </div>
            )}

            {submitStatus === 'verifying' && (
              <div className="py-12 flex flex-col items-center text-center space-y-8">
                {/* Loader Ring */}
                <div className="relative w-24 h-24">
                  <div className="absolute inset-0 rounded-full border-4 border-zinc-800" />
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    className="absolute inset-0 rounded-full border-4 border-amber-500 border-t-transparent"
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-amber-500">
                    <Coins className="w-8 h-8 animate-pulse" />
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xl font-bold text-white tracking-tight">Verifying Subscription</h4>
                  <p className="text-sm text-zinc-400 font-mono h-12 max-w-md mx-auto">
                    {verificationSteps[Math.min(submitStep, verificationSteps.length - 1)]}
                  </p>
                </div>

                {/* Progress bar */}
                <div className="w-full max-w-md bg-zinc-900 rounded-full h-2 overflow-hidden border border-zinc-800">
                  <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: `${(submitStep / verificationSteps.length) * 100}%` }}
                    transition={{ ease: "easeInOut", duration: 0.8 }}
                    className="bg-gradient-to-r from-[#E2136E] to-amber-500 h-full"
                  />
                </div>

                <p className="text-xs text-zinc-500">
                  Step {Math.min(submitStep + 1, verificationSteps.length)} of {verificationSteps.length}
                </p>
              </div>
            )}

            {submitStatus === 'completed' && (
              <div className="py-8 space-y-6">
                
                {/* Success Chime Box */}
                <div className="text-center space-y-3">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-2">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white">
                    Transaction Registered!
                  </h3>
                  <p className="text-sm text-zinc-300 max-w-md mx-auto">
                    Excellent, <strong className="text-amber-400">{name}</strong>! Your payment of <strong className="text-amber-400">{selectedPlan.price}</strong> with Transaction ID <strong className="text-zinc-100 font-mono">{trxId}</strong> is successfully received by our math auditors.
                  </p>
                </div>

                {/* Queue status block */}
                <div className="bg-zinc-900/60 border border-amber-500/20 rounded-2xl p-5 space-y-4 max-w-md mx-auto text-left">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                    <span className="text-xs text-zinc-400 flex items-center">
                      <Hourglass className="w-3.5 h-3.5 mr-1 text-amber-500" />
                      Auditing Status:
                    </span>
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                      QUEUED
                    </span>
                  </div>

                  <div className="space-y-3 text-xs leading-relaxed">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Your Queue Position:</span>
                      <span className="font-bold text-white font-mono">#{queuePosition.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Estimated Process Time:</span>
                      <span className="font-bold text-amber-400">48 - 720 Hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Mathematical Priority:</span>
                      <span className="text-zinc-300">{selectedPlan.name} Tier</span>
                    </div>
                    
                    <div className="mt-3 p-2.5 bg-zinc-950 rounded-xl border border-zinc-800/60 text-[11px] text-zinc-400 flex items-start space-x-2">
                      <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>
                        <strong>Do not clear cookies or recalculate</strong> during this verification window. If you input new formula expressions, your transaction may experience quantum misalignment, requiring a new bKash submission.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Button and funny exit */}
                <div className="text-center pt-2">
                  <button 
                    onClick={handleReset}
                    id="btn-close-wait"
                    className="bg-amber-500 hover:bg-amber-400 text-black font-semibold py-2.5 px-8 rounded-xl transition duration-300 text-sm shadow-md hover:scale-[1.01]"
                  >
                    Close & Wait Patiently
                  </button>
                  <p className="text-[10px] text-zinc-600 mt-3 italic">
                    By waiting, you agree to our standard math liability limits of zero guarantees.
                  </p>
                </div>

              </div>
            )}

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
