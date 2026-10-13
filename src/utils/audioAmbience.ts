// Web Audio API ambient sound generator for cozy cafe atmosphere
// Pure procedural audio (safe in all sandboxes, no external mp3 or streams needed)

class CafeAmbianceAudio {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private gainNode: GainNode | null = null;
  private intervalId: any = null;

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  public start() {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.04, this.ctx.currentTime);
      this.gainNode.connect(this.ctx.destination);

      // Warm background drone
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(260, this.ctx.currentTime);

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(146.83, this.ctx.currentTime); // D3

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(220.0, this.ctx.currentTime); // A3

      const oscGain = this.ctx.createGain();
      oscGain.gain.setValueAtTime(0.03, this.ctx.currentTime);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(this.gainNode);

      osc1.start();
      osc2.start();

      // Soft periodic gentle warm harmonic chime (simulating cozy cafe acoustic warmth)
      const playChime = () => {
        if (!this.ctx || !this.isPlaying || !this.gainNode) return;
        const notes = [293.66, 369.99, 440.0, 554.37, 659.25]; // D major pentatonic
        const note = notes[Math.floor(Math.random() * notes.length)];
        
        const chimeOsc = this.ctx.createOscillator();
        const chimeGain = this.ctx.createGain();
        chimeOsc.type = 'sine';
        chimeOsc.frequency.setValueAtTime(note, this.ctx.currentTime);
        
        chimeGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
        chimeGain.gain.exponentialRampToValueAtTime(0.02, this.ctx.currentTime + 0.1);
        chimeGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 3.2);

        chimeOsc.connect(chimeGain);
        chimeGain.connect(this.gainNode);

        chimeOsc.start();
        chimeOsc.stop(this.ctx.currentTime + 3.5);
      };

      this.intervalId = setInterval(playChime, 4500);
      playChime();
      this.isPlaying = true;
    } catch (e) {
      console.warn('Audio autoplay or context restriction:', e);
      this.isPlaying = false;
    }
  }

  public stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.ctx) {
      try {
        this.ctx.close();
      } catch (e) {}
      this.ctx = null;
    }
    this.isPlaying = false;
  }
}

export const cafeAmbiance = new CafeAmbianceAudio();
