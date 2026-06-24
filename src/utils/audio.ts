/**
 * High-quality procedural synthesizer sound effects for the Premium Calculator
 * Using standard Web Audio API - no external assets required.
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Play a professional cybernetic click sound
 */
export function playClick(freq = 600, duration = 0.04) {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq / 2, ctx.currentTime + duration);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    // Fail silently if audio context is blocked or not supported
  }
}

/**
 * Play a funny access-locked warning buzzer sound
 */
export function playLockSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Play dual detuned oscillators for a retro digital locks tone
    const playTone = (freq: number, startDelay: number, dur: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now + startDelay);
      
      gain.gain.setValueAtTime(0, now + startDelay);
      gain.gain.linearRampToValueAtTime(0.06, now + startDelay + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + startDelay + dur);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now + startDelay);
      osc.stop(now + startDelay + dur);
    };

    // Buzz buzz sound
    playTone(180, 0, 0.15);
    playTone(176, 0, 0.15);
    
    playTone(180, 0.2, 0.3);
    playTone(176, 0.2, 0.3);
  } catch (e) {
    // Fail silently
  }
}

/**
 * Play an administrative gold success/upgrade sound
 */
export function playSuccessSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const playChime = (freq: number, delay: number, dur: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + delay);
      
      gain.gain.setValueAtTime(0, now + delay);
      gain.gain.linearRampToValueAtTime(0.08, now + delay + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + delay + dur);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now + delay);
      osc.stop(now + delay + dur);
    };

    // Ascending major chord arpeggio
    playChime(523.25, 0, 0.4);   // C5
    playChime(659.25, 0.1, 0.4); // E5
    playChime(783.99, 0.2, 0.4); // G5
    playChime(1046.50, 0.3, 0.6); // C6
  } catch (e) {
    // Fail silently
  }
}

/**
 * Play a funny data submit bloop
 */
export function playSubmitBloop() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.3);

    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  } catch (e) {
    // Fail silently
  }
}
