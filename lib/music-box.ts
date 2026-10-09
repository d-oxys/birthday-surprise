/**
 * A gentle music-box "Happy Birthday" synthesized with the Web Audio API.
 * Used when no audio file is configured (or the file fails to load),
 * so the music button always works without shipping an mp3.
 */

// [midi note, beats, optional bass note on this beat]
const MELODY: Array<[number, number, number?]> = [
  [67, 0.75], [67, 0.25],
  [69, 1, 48], [67, 1], [72, 1],
  [71, 2, 43], [67, 0.75], [67, 0.25],
  [69, 1, 43], [67, 1], [74, 1],
  [72, 2, 48], [67, 0.75], [67, 0.25],
  [79, 1, 48], [76, 1], [72, 1],
  [71, 1, 41], [69, 1], [77, 0.75], [77, 0.25],
  [76, 1, 48], [72, 1], [74, 1, 43],
  [72, 3, 48],
];

const BEAT = 0.52; // seconds per beat
const LOOP_GAP = 2.4; // seconds of silence between repeats

const freq = (midi: number) => 440 * Math.pow(2, (midi - 69) / 12);

type AudioContextCtor = typeof AudioContext;

export class MusicBox {
  private ctx: AudioContext;
  private master: GainNode;
  private bus: GainNode;
  private nextStart = 0;
  private timer: ReturnType<typeof setTimeout> | undefined;
  private running = false;

  constructor(volume: number) {
    const Ctor: AudioContextCtor =
      window.AudioContext ?? (window as unknown as { webkitAudioContext: AudioContextCtor }).webkitAudioContext;
    this.ctx = new Ctor();

    this.master = this.ctx.createGain();
    this.master.gain.value = Math.max(0, Math.min(1, volume)) * 0.6;
    this.master.connect(this.ctx.destination);

    // Notes → bus → (dry + soft echo) → master
    this.bus = this.ctx.createGain();
    this.bus.connect(this.master);

    const delay = this.ctx.createDelay(1);
    delay.delayTime.value = 0.31;
    const feedback = this.ctx.createGain();
    feedback.gain.value = 0.28;
    const wet = this.ctx.createGain();
    wet.gain.value = 0.35;
    const tone = this.ctx.createBiquadFilter();
    tone.type = "lowpass";
    tone.frequency.value = 2400;

    this.bus.connect(delay);
    delay.connect(tone);
    tone.connect(feedback);
    feedback.connect(delay);
    tone.connect(wet);
    wet.connect(this.master);
  }

  private note(midi: number, at: number, length: number, gain: number, bright: boolean) {
    const env = this.ctx.createGain();
    env.gain.setValueAtTime(0.0001, at);
    env.gain.exponentialRampToValueAtTime(gain, at + 0.008);
    env.gain.exponentialRampToValueAtTime(0.0001, at + length);
    env.connect(this.bus);

    const partials = bright ? [[1, 1], [2, 0.32], [3.01, 0.12]] : [[1, 1]];
    for (const [ratio, amp] of partials) {
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq(midi) * ratio;
      g.gain.value = amp;
      osc.connect(g);
      g.connect(env);
      osc.start(at);
      osc.stop(at + length + 0.05);
    }
  }

  /** Schedules one full melody starting at `start`; returns its length in seconds. */
  private playMelody(start: number) {
    let t = start;
    for (const [midi, beats, bass] of MELODY) {
      this.note(midi, t, Math.max(1.1, beats * BEAT * 1.6), 0.22, true);
      if (bass) this.note(bass, t, beats * BEAT * 2.4, 0.12, false);
      t += beats * BEAT;
    }
    return t - start;
  }

  private tick = () => {
    if (!this.running) return;
    while (this.nextStart < this.ctx.currentTime + 1.5) {
      this.nextStart += this.playMelody(this.nextStart) + LOOP_GAP;
    }
    this.timer = setTimeout(this.tick, 500);
  };

  async play() {
    if (this.running) return;
    this.running = true;
    await this.ctx.resume();
    if (this.nextStart < this.ctx.currentTime) this.nextStart = this.ctx.currentTime + 0.1;
    this.tick();
  }

  async pause() {
    this.running = false;
    clearTimeout(this.timer);
    await this.ctx.suspend();
  }

  destroy() {
    this.running = false;
    clearTimeout(this.timer);
    void this.ctx.close();
  }
}
