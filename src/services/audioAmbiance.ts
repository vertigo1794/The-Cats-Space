/**
 * Realistic Seaside Ocean Waves & Cat Purring Ambient Sound Synthesizer
 * Built entirely with Web Audio API - zero external audio asset dependencies.
 */

class AudioAmbianceService {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private masterGain: GainNode | null = null;
  private oceanGain: GainNode | null = null;
  private purrGain: GainNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private lfoOsc: OscillatorNode | null = null;
  private purrOsc: OscillatorNode | null = null;
  private purrLfo: OscillatorNode | null = null;

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public init() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AudioCtx();
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public start() {
    this.init();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.stop(); // Clear any existing nodes

    const ctx = this.ctx;
    this.masterGain = ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
    this.masterGain.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 1.2);
    this.masterGain.connect(ctx.destination);

    // 1. Generate Ocean Waves using filtered pink noise and oscillating low-pass filter
    const bufferSize = ctx.sampleRate * 4;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }

    this.noiseNode = ctx.createBufferSource();
    this.noiseNode.buffer = noiseBuffer;
    this.noiseNode.loop = true;

    // Filter simulating ocean surf rhythm
    const waveFilter = ctx.createBiquadFilter();
    waveFilter.type = 'lowpass';
    waveFilter.frequency.setValueAtTime(320, ctx.currentTime);
    waveFilter.Q.setValueAtTime(1.5, ctx.currentTime);

    // LFO to modulate surf frequency (swell of waves)
    this.lfoOsc = ctx.createOscillator();
    this.lfoOsc.type = 'sine';
    this.lfoOsc.frequency.setValueAtTime(0.12, ctx.currentTime); // ~8 second swell

    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(260, ctx.currentTime);
    this.lfoOsc.connect(lfoGain);
    lfoGain.connect(waveFilter.frequency);

    this.oceanGain = ctx.createGain();
    this.oceanGain.gain.setValueAtTime(0.7, ctx.currentTime);

    this.noiseNode.connect(waveFilter);
    waveFilter.connect(this.oceanGain);
    this.oceanGain.connect(this.masterGain);

    this.noiseNode.start();
    this.lfoOsc.start();

    // 2. Synthesize gentle rhythmic cat purring (~25Hz modulation with subtle harmonics)
    this.purrOsc = ctx.createOscillator();
    this.purrOsc.type = 'sawtooth';
    this.purrOsc.frequency.setValueAtTime(55, ctx.currentTime);

    const purrFilter = ctx.createBiquadFilter();
    purrFilter.type = 'lowpass';
    purrFilter.frequency.setValueAtTime(140, ctx.currentTime);

    // Modulation for feline purr vibration rhythm (approx 24-26 pulses/sec)
    this.purrLfo = ctx.createOscillator();
    this.purrLfo.type = 'sine';
    this.purrLfo.frequency.setValueAtTime(25, ctx.currentTime);

    const purrModGain = ctx.createGain();
    purrModGain.gain.setValueAtTime(0.5, ctx.currentTime);
    this.purrLfo.connect(purrModGain.gain);

    this.purrGain = ctx.createGain();
    this.purrGain.gain.setValueAtTime(0.04, ctx.currentTime); // quiet, soothing background

    this.purrOsc.connect(purrFilter);
    purrFilter.connect(purrModGain);
    purrModGain.connect(this.purrGain);
    this.purrGain.connect(this.masterGain);

    this.purrOsc.start();
    this.purrLfo.start();

    this.isPlaying = true;
  }

  public stop() {
    if (!this.isPlaying || !this.ctx) return;
    try {
      if (this.masterGain) {
        this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
        this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5);
      }
      setTimeout(() => {
        try {
          this.noiseNode?.stop();
          this.noiseNode?.disconnect();
          this.lfoOsc?.stop();
          this.lfoOsc?.disconnect();
          this.purrOsc?.stop();
          this.purrOsc?.disconnect();
          this.purrLfo?.stop();
          this.purrLfo?.disconnect();
        } catch {
          // ignore
        }
      }, 550);
    } catch {
      // ignore
    }
    this.isPlaying = false;
  }
}

export const audioAmbiance = new AudioAmbianceService();
