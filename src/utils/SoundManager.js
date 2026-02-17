class SoundManager {
    constructor() {
        this.context = null;
        this.masterGain = null;
        this.enabled = true;
    }

    init() {
        if (!this.context) {
            this.context = new (window.AudioContext || window.webkitAudioContext)();
            this.masterGain = this.context.createGain();
            this.masterGain.connect(this.context.destination);
            this.masterGain.gain.value = 0.3; // Default volume
        }
    }

    playTone(freq, type, duration, vol = 1) {
        if (!this.enabled) return;
        this.init();
        if (this.context.state === 'suspended') {
            this.context.resume();
        }

        const osc = this.context.createOscillator();
        const gain = this.context.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.context.currentTime);

        gain.gain.setValueAtTime(vol, this.context.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start();
        osc.stop(this.context.currentTime + duration);
    }

    playClick() {
        // High pitched short blip
        this.playTone(1200, 'sine', 0.1, 0.5);
        setTimeout(() => this.playTone(600, 'square', 0.05, 0.3), 50);
    }

    playHover() {
        // Very short, subtle blip
        this.playTone(400, 'sine', 0.05, 0.2);
    }

    playTyping() {
        // Random variance for typing
        const variance = Math.random() * 200;
        this.playTone(800 + variance, 'square', 0.03, 0.3);
    }

    playBoot() {
        // Startup sound
        if (!this.enabled) return;
        this.init();
        if (this.context.state === 'suspended') this.context.resume();

        const osc = this.context.createOscillator();
        const gain = this.context.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(100, this.context.currentTime);
        osc.frequency.exponentialRampToValueAtTime(600, this.context.currentTime + 1);

        gain.gain.setValueAtTime(0, this.context.currentTime);
        gain.gain.linearRampToValueAtTime(0.3, this.context.currentTime + 0.5);
        gain.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 1.5);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start();
        osc.stop(this.context.currentTime + 1.5);
    }

    toggleMute() {
        this.enabled = !this.enabled;
        return this.enabled;
    }
}

const soundManager = new SoundManager();
export default soundManager;
