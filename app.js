// ==========================================================================
// GRAND LINE ONE PIECE PORTFOLIO CONTROLLER
// Gear 5 Joyboy Liberation Drums, Moving Cloud Waves, Ocean Physics,
// 16 Unique Project SFX Synthesizers, Certificate Modal & Watchlist
// ==========================================================================

class AudioSynth {
    constructor() {
        this.ctx = null;
        this.enabled = true;
    }

    init() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) this.ctx = new AudioCtx();
        }
    }

    async ensureRunning() {
        this.init();
        if (this.ctx && this.ctx.state === 'suspended') {
            try {
                await this.ctx.resume();
            } catch (e) {
                console.warn('AudioContext resume failed:', e);
            }
        }
    }

    toggle() {
        this.enabled = !this.enabled;
        return this.enabled;
    }

    // --- SFX 1: Zoro Sword Slash ---
    async playZoroSlash() {
        if (!this.enabled) return; await this.ensureRunning(); if (!this.ctx) return;
        const bufferSize = this.ctx.sampleRate * 0.25;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(400, this.ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(2800, this.ctx.currentTime + 0.2);
        filter.Q.value = 4;
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);
        noise.connect(filter); filter.connect(gain); gain.connect(this.ctx.destination);
        noise.start();
    }

    // --- SFX 2: Nami Thunder Strike ---
    async playNamiThunder() {
        if (!this.enabled) return; await this.ensureRunning(); if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(140, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(35, this.ctx.currentTime + 0.4);
        gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);
        osc.connect(gain); gain.connect(this.ctx.destination);
        osc.start(); osc.stop(this.ctx.currentTime + 0.4);
    }

    // --- SFX 3: Chopper Sakura Chime ---
    async playChopperSakura() {
        if (!this.enabled) return; await this.ensureRunning(); if (!this.ctx) return;
        const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
        notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.05);
            gain.gain.setValueAtTime(0.2, this.ctx.currentTime + idx * 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.05 + 0.35);
            osc.connect(gain); gain.connect(this.ctx.destination);
            osc.start(this.ctx.currentTime + idx * 0.05);
            osc.stop(this.ctx.currentTime + idx * 0.05 + 0.35);
        });
    }

    // --- SFX 4: Shanks Haki Ping ---
    async playShanksHakiPing() {
        if (!this.enabled) return; await this.ensureRunning(); if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1400, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(2800, this.ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);
        osc.connect(gain); gain.connect(this.ctx.destination);
        osc.start(); osc.stop(this.ctx.currentTime + 0.35);
    }

    // --- SFX 5: Digital Scanner OCR Snap ---
    async playScannerOcrSnap() {
        if (!this.enabled) return; await this.ensureRunning(); if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(900, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 0.09);
        gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.09);
        osc.connect(gain); gain.connect(this.ctx.destination);
        osc.start(); osc.stop(this.ctx.currentTime + 0.09);
    }

    // --- SFX 6: Task Commander Tick ---
    async playTaskCommanderClock() {
        if (!this.enabled) return; await this.ensureRunning(); if (!this.ctx) return;
        [440, 880].forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.06);
            gain.gain.setValueAtTime(0.22, this.ctx.currentTime + idx * 0.06);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.06 + 0.05);
            osc.connect(gain); gain.connect(this.ctx.destination);
            osc.start(this.ctx.currentTime + idx * 0.06);
            osc.stop(this.ctx.currentTime + idx * 0.06 + 0.05);
        });
    }

    // --- SFX 7: Skill Spot Gold Drop ---
    async playSkillSpotGold() {
        if (!this.enabled) return; await this.ensureRunning(); if (!this.ctx) return;
        [987.77, 1318.51, 1567.98, 1975.53].forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.04);
            gain.gain.setValueAtTime(0.2, this.ctx.currentTime + idx * 0.04);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.04 + 0.2);
            osc.connect(gain); gain.connect(this.ctx.destination);
            osc.start(this.ctx.currentTime + idx * 0.04);
            osc.stop(this.ctx.currentTime + idx * 0.04 + 0.2);
        });
    }

    // --- SFX 8: Franky Radical Beam ---
    async playFrankyRadicalBeam() {
        if (!this.enabled) return; await this.ensureRunning(); if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(2200, this.ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.35, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);
        osc.connect(gain); gain.connect(this.ctx.destination);
        osc.start(); osc.stop(this.ctx.currentTime + 0.3);
    }

    // --- SFX 9: Next.js Cyber Pulse ---
    async playNextCyberPulse() {
        if (!this.enabled) return; await this.ensureRunning(); if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);
        osc.connect(gain); gain.connect(this.ctx.destination);
        osc.start(); osc.stop(this.ctx.currentTime + 0.25);
    }

    // --- SFX 10: DiffDocs Staccato ---
    async playDiffDocsStaccato() {
        if (!this.enabled) return; await this.ensureRunning(); if (!this.ctx) return;
        [600, 750].forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'square';
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.08);
            gain.gain.setValueAtTime(0.18, this.ctx.currentTime + idx * 0.08);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.08 + 0.07);
            osc.connect(gain); gain.connect(this.ctx.destination);
            osc.start(this.ctx.currentTime + idx * 0.08);
            osc.stop(this.ctx.currentTime + idx * 0.08 + 0.07);
        });
    }

    // --- SFX 11: Waitlist SaaS Rise ---
    async playWaitlistSassRise() {
        if (!this.enabled) return; await this.ensureRunning(); if (!this.ctx) return;
        [523.25, 659.25, 783.99].forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.06);
            gain.gain.setValueAtTime(0.2, this.ctx.currentTime + idx * 0.06);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.06 + 0.3);
            osc.connect(gain); gain.connect(this.ctx.destination);
            osc.start(this.ctx.currentTime + idx * 0.06);
            osc.stop(this.ctx.currentTime + idx * 0.06 + 0.3);
        });
    }

    // --- SFX 12: Wine Ferment Gurgle ---
    async playWineFermentGurgle() {
        if (!this.enabled) return; await this.ensureRunning(); if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(180, this.ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(320, this.ctx.currentTime + 0.1);
        osc.frequency.linearRampToValueAtTime(200, this.ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);
        osc.connect(gain); gain.connect(this.ctx.destination);
        osc.start(); osc.stop(this.ctx.currentTime + 0.25);
    }

    // --- SFX 13: ETL Pipeline Stream ---
    async playEtlPipelineStream() {
        if (!this.enabled) return; await this.ensureRunning(); if (!this.ctx) return;
        [300, 500, 700, 900].forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.04);
            gain.gain.setValueAtTime(0.15, this.ctx.currentTime + idx * 0.04);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.04 + 0.12);
            osc.connect(gain); gain.connect(this.ctx.destination);
            osc.start(this.ctx.currentTime + idx * 0.04);
            osc.stop(this.ctx.currentTime + idx * 0.04 + 0.12);
        });
    }

    // --- SFX 14: Data Wrangling Sweep ---
    async playDataWranglingSweep() {
        if (!this.enabled) return; await this.ensureRunning(); if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.22);
        gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);
        osc.connect(gain); gain.connect(this.ctx.destination);
        osc.start(); osc.stop(this.ctx.currentTime + 0.25);
    }

    // --- SFX 15: Gear 5 Drums of Liberation ---
    async playGear5JoyboyDrums() {
        if (!this.enabled) return; await this.ensureRunning(); if (!this.ctx) return;
        const drumBeats = [130.81, 164.81, 196.00, 261.63, 329.63, 392.00, 523.25];
        drumBeats.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.08);
            gain.gain.setValueAtTime(0.35 - idx * 0.03, this.ctx.currentTime + idx * 0.08);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.08 + 0.4);
            osc.connect(gain); gain.connect(this.ctx.destination);
            osc.start(this.ctx.currentTime + idx * 0.08);
            osc.stop(this.ctx.currentTime + idx * 0.08 + 0.4);
        });
    }

    // --- SFX 16: Ancient Poneglyph Bell ---
    async playPoneglyphAncientBell() {
        if (!this.enabled) return; await this.ensureRunning(); if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(329.63, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.35, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.6);
        osc.connect(gain); gain.connect(this.ctx.destination);
        osc.start(); osc.stop(this.ctx.currentTime + 0.6);
    }

    // Generic Fallback Chime & Ring
    playLiberationDrums() { this.playGear5JoyboyDrums(); }
    playSwordSlash() { this.playZoroSlash(); }
    playThunderStrike() { this.playNamiThunder(); }
    playSakuraChime() { this.playChopperSakura(); }
    playObservationPing() { this.playShanksHakiPing(); }
    playCameraShutter() { this.playScannerOcrSnap(); }
    playTickTock() { this.playTaskCommanderClock(); }
    playCoinDrop() { this.playSkillSpotGold(); }
    playRadicalBeam() { this.playFrankyRadicalBeam(); }
    playCyberPulse() { this.playNextCyberPulse(); }
    playChime() { this.playShanksHakiPing(); }
    playSnailRing() { this.playSkillSpotGold(); }
    playSunnyChime() { this.playChopperSakura(); }

    // Dispatch Project SFX by ID (16 100% Unique Audio Functions)
    async playProjectSfx(id) {
        const pId = parseInt(id, 10);
        switch (pId) {
            case 1: await this.playZoroSlash(); break;
            case 2: await this.playNamiThunder(); break;
            case 3: await this.playChopperSakura(); break;
            case 4: await this.playShanksHakiPing(); break;
            case 5: await this.playScannerOcrSnap(); break;
            case 6: await this.playTaskCommanderClock(); break;
            case 7: await this.playSkillSpotGold(); break;
            case 8: await this.playFrankyRadicalBeam(); break;
            case 9: await this.playNextCyberPulse(); break;
            case 10: await this.playDiffDocsStaccato(); break;
            case 11: await this.playWaitlistSassRise(); break;
            case 12: await this.playWineFermentGurgle(); break;
            case 13: await this.playEtlPipelineStream(); break;
            case 14: await this.playDataWranglingSweep(); break;
            case 15: await this.playGear5JoyboyDrums(); break;
            case 16: await this.playPoneglyphAncientBell(); break;
            default: await this.playShanksHakiPing(); break;
        }
    }
}

window.sfx = new AudioSynth();

// Global auto-unlock for AudioContext on initial mouse movement
const unlockAudioOnUserAction = async () => {
    if (window.sfx) await window.sfx.ensureRunning();
};
window.addEventListener('pointermove', unlockAudioOnUserAction);
window.addEventListener('mousemove', unlockAudioOnUserAction);
window.addEventListener('mouseenter', unlockAudioOnUserAction);
window.addEventListener('click', unlockAudioOnUserAction);

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Entry Splash Screen ---
    const gear5SplashOverlay = document.getElementById('gear5SplashOverlay');
    const startVoyageBtn = document.getElementById('startVoyageBtn');
    if (gear5SplashOverlay && startVoyageBtn) {
        startVoyageBtn.addEventListener('click', () => {
            window.sfx.playGear5JoyboyDrums();
            gear5SplashOverlay.classList.add('hidden');
            showToast("🥁 Drums of Liberation! Welcome aboard!");
        });
    }

    // --- 2. Active Nav Links ---
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // --- 3. Canvas Ocean Physics & Waves ---
    const canvas = document.getElementById('oceanCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        const clouds = [];
        for (let c = 0; c < 14; c++) {
            clouds.push({
                x: Math.random() * width,
                y: Math.random() * (height * 0.55),
                rx: Math.random() * 60 + 40,
                ry: Math.random() * 25 + 15,
                speed: Math.random() * 0.6 + 0.2,
                alpha: Math.random() * 0.35 + 0.15,
                waveOffset: Math.random() * Math.PI * 2
            });
        }

        let step = 0;
        function drawWaves() {
            ctx.clearRect(0, 0, width, height);
            step += 0.02;

            // Render Animated Clouds
            clouds.forEach(cloud => {
                cloud.x += cloud.speed;
                if (cloud.x - cloud.rx > width) cloud.x = -cloud.rx;
                const waveY = cloud.y + Math.sin(step + cloud.waveOffset) * 6;
                ctx.beginPath();
                ctx.ellipse(cloud.x, waveY, cloud.rx, cloud.ry, 0, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${cloud.alpha})`;
                ctx.fill();
            });

            // Render Dynamic Ocean Waves
            const waveConfigs = [
                { color: 'rgba(7, 25, 47, 0.7)', speedMult: 1.0, offset: 40 },
                { color: 'rgba(10, 37, 64, 0.5)', speedMult: 1.5, offset: 25 },
                { color: 'rgba(244, 117, 33, 0.18)', speedMult: 0.8, offset: 10 }
            ];

            waveConfigs.forEach((cfg, idx) => {
                ctx.fillStyle = cfg.color;
                ctx.beginPath();
                ctx.moveTo(0, height);
                for (let x = 0; x <= width; x += 15) {
                    const y = Math.sin(x * 0.005 + step * cfg.speedMult + idx * 2) * 22 + height - cfg.offset;
                    ctx.lineTo(x, y);
                }
                ctx.lineTo(width, height);
                ctx.closePath();
                ctx.fill();
            });

            requestAnimationFrame(drawWaves);
        }
        drawWaves();
    }

    // --- 4. Unique SFX for Every Project Card Across All Rows ---
    const sfxElements = document.querySelectorAll('[data-sfx-id], .wanted-poster');
    sfxElements.forEach((el, idx) => {
        const sfxId = el.getAttribute('data-sfx-id') || (idx + 1);
        const triggerSfx = async () => {
            await window.sfx.playProjectSfx(sfxId);
        };
        el.addEventListener('mouseenter', triggerSfx);
        el.addEventListener('pointerenter', triggerSfx);
        el.addEventListener('click', triggerSfx);
    });

    // --- 5. Proposal & Feedback Form Submissions ---
    const proposalSuccessModal = document.getElementById('proposalSuccessModal');
    const proposalSuccessClose = document.getElementById('proposalSuccessClose');
    const proposalSuccessOverlay = document.getElementById('proposalSuccessOverlay');
    const proposalSuccessDoneBtn = document.getElementById('proposalSuccessDoneBtn');
    const proposalSuccessMessage = document.getElementById('proposalSuccessMessage');

    function closeProposalSuccessModal() {
        if (proposalSuccessModal) proposalSuccessModal.classList.remove('active');
    }

    if (proposalSuccessClose) proposalSuccessClose.addEventListener('click', closeProposalSuccessModal);
    if (proposalSuccessOverlay) proposalSuccessOverlay.addEventListener('click', closeProposalSuccessModal);
    if (proposalSuccessDoneBtn) proposalSuccessDoneBtn.addEventListener('click', closeProposalSuccessModal);

    const feedbackForm = document.getElementById('projectFeedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', (e) => {
            e.preventDefault();
            window.sfx.playGear5JoyboyDrums();
            const project = document.getElementById('feedbackProject')?.value || 'LLM Firewall';
            const rating = document.getElementById('feedbackRating')?.value || '5 Stars';
            const msg = document.getElementById('feedbackMessage')?.value || '';

            if (proposalSuccessMessage) {
                proposalSuccessMessage.innerHTML = `<strong>Feedback Received!</strong><br>Target Project: <em>${project}</em><br>Rating: <em>${rating}</em><br>Your thoughts: "${msg}"`;
            }
            if (proposalSuccessModal) proposalSuccessModal.classList.add('active');

            const mailtoLink = `mailto:sankarshsreekulam@gmail.com?subject=Project Feedback: ${encodeURIComponent(project)}&body=${encodeURIComponent(msg + '\n\nRating: ' + rating)}`;
            window.open(mailtoLink, '_blank');
        });
    }

    const collabForm = document.getElementById('collabPitchForm');
    if (collabForm) {
        collabForm.addEventListener('submit', (e) => {
            e.preventDefault();
            window.sfx.playGear5JoyboyDrums();
            const name = document.getElementById('collabName')?.value || 'Developer';
            const contact = document.getElementById('collabContact')?.value || '';
            const proposal = document.getElementById('collabProposal')?.value || '';

            if (proposalSuccessMessage) {
                proposalSuccessMessage.innerHTML = `<strong>Collaboration Proposal Dispatched!</strong><br>From: <em>${name} (${contact})</em><br>Proposal Details: "${proposal}"`;
            }
            if (proposalSuccessModal) proposalSuccessModal.classList.add('active');

            const mailtoLink = `mailto:sankarshsreekulam@gmail.com?subject=Collab Pitch from ${encodeURIComponent(name)}&body=${encodeURIComponent(proposal + '\n\nContact: ' + contact)}`;
            window.open(mailtoLink, '_blank');
        });
    }

    // --- 6. Episode Specs Modal ---
    const episodeModal = document.getElementById('episodeModal');
    const episodeClose = document.getElementById('episodeClose');
    const episodeOverlay = document.getElementById('episodeOverlay');

    function closeEpisodeModal() {
        if (episodeModal) episodeModal.classList.remove('active');
    }

    if (episodeClose) episodeClose.addEventListener('click', closeEpisodeModal);
    if (episodeOverlay) episodeOverlay.addEventListener('click', closeEpisodeModal);

    const openEpisodeBtns = document.querySelectorAll('.open-episode-btn');
    openEpisodeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const pId = btn.getAttribute('data-project');
            window.sfx.playProjectSfx(pId);
            if (episodeModal) {
                document.getElementById('epNumber').textContent = `EPISODE SPECS // PROJECT #${pId}`;
                document.getElementById('epTitle').textContent = `Repository Details #${pId}`;
                document.getElementById('epCodeSnippet').textContent = `git clone https://github.com/Sankarsh369/repo_${pId}\ncd repo_${pId}\npip install -r requirements.txt\npython app.py`;
                episodeModal.classList.add('active');
            }
        });
    });

    // --- 7. Watchlist System ---
    let watchlist = JSON.parse(localStorage.getItem('crew_watchlist') || '[]');
    const watchlistCountEl = document.getElementById('watchlistCount');
    const watchlistModal = document.getElementById('watchlistModal');
    const openWatchlistBtn = document.getElementById('openWatchlistBtn');
    const watchlistClose = document.getElementById('watchlistClose');
    const watchlistOverlay = document.getElementById('watchlistOverlay');
    const watchlistContentList = document.getElementById('watchlistContentList');
    const clearWatchlistBtn = document.getElementById('clearWatchlistBtn');

    function updateWatchlistUI() {
        if (watchlistCountEl) watchlistCountEl.textContent = watchlist.length;
        if (watchlistContentList) {
            if (watchlist.length === 0) {
                watchlistContentList.innerHTML = `<p class="text-muted">No bookmarked items yet! Click '🔖 Save' on any project card to bookmark it here!</p>`;
            } else {
                watchlistContentList.innerHTML = watchlist.map((item, idx) => `
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: rgba(7,25,47,0.7); border-radius: 8px; margin-bottom: 0.5rem;">
                        <div>
                            <strong>#${item.id} ${item.title}</strong>
                        </div>
                        <button class="btn btn-sm btn-outline remove-watchlist-item" data-index="${idx}"><i data-feather="x"></i> Remove</button>
                    </div>
                `).join('');
                if (typeof feather !== 'undefined') feather.replace();
                
                document.querySelectorAll('.remove-watchlist-item').forEach(b => {
                    b.addEventListener('click', () => {
                        const index = parseInt(b.getAttribute('data-index'), 10);
                        watchlist.splice(index, 1);
                        localStorage.setItem('crew_watchlist', JSON.stringify(watchlist));
                        updateWatchlistUI();
                        showToast("Removed item from Watchlist!");
                    });
                });
            }
        }
    }

    updateWatchlistUI();

    document.querySelectorAll('.bookmark-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = btn.getAttribute('data-id');
            const title = btn.getAttribute('data-title');
            window.sfx.playSkillSpotGold();

            if (!watchlist.some(i => i.id === id)) {
                watchlist.push({ id, title });
                localStorage.setItem('crew_watchlist', JSON.stringify(watchlist));
                updateWatchlistUI();
                showToast(`Bookmarked: ${title}`);
            } else {
                showToast("Already in your watchlist!");
            }
        });
    });

    if (openWatchlistBtn) {
        openWatchlistBtn.addEventListener('click', () => {
            window.sfx.playSkillSpotGold();
            if (watchlistModal) watchlistModal.classList.add('active');
        });
    }

    if (watchlistClose) watchlistClose.addEventListener('click', () => watchlistModal?.classList.remove('active'));
    if (watchlistOverlay) watchlistOverlay.addEventListener('click', () => watchlistModal?.classList.remove('active'));

    if (clearWatchlistBtn) {
        clearWatchlistBtn.addEventListener('click', () => {
            watchlist = [];
            localStorage.setItem('crew_watchlist', JSON.stringify(watchlist));
            updateWatchlistUI();
            showToast("Watchlist cleared!");
        });
    }

    // --- 8. SFX Toggle Button ---
    const sfxToggleBtn = document.getElementById('sfxToggleBtn');
    if (sfxToggleBtn) {
        sfxToggleBtn.addEventListener('click', () => {
            const isEnabled = window.sfx.toggle();
            sfxToggleBtn.innerHTML = isEnabled ? `<i data-feather="volume-2"></i> SFX: ON` : `<i data-feather="volume-x"></i> SFX: OFF`;
            if (typeof feather !== 'undefined') feather.replace();
            showToast(isEnabled ? "Audio Sound Effects Enabled!" : "Audio Sound Effects Muted!");
        });
    }

    // --- 9. Treasure Chest Resume Modal ---
    const treasureModal = document.getElementById('treasureModal');
    const openTreasureBtn = document.getElementById('openTreasureBtn');
    const treasureClose = document.getElementById('treasureClose');
    const treasureOverlay = document.getElementById('treasureOverlay');
    const modalCopyEmailBtn = document.getElementById('modalCopyEmailBtn');

    if (openTreasureBtn) {
        openTreasureBtn.addEventListener('click', () => {
            window.sfx.playPoneglyphAncientBell();
            if (treasureModal) treasureModal.classList.add('active');
        });
    }

    if (treasureClose) treasureClose.addEventListener('click', () => treasureModal?.classList.remove('active'));
    if (treasureOverlay) treasureOverlay.addEventListener('click', () => treasureModal?.classList.remove('active'));

    if (modalCopyEmailBtn) {
        modalCopyEmailBtn.addEventListener('click', () => {
            navigator.clipboard.writeText('sankarshsreekulam@gmail.com');
            showToast("Copied sankarshsreekulam@gmail.com!");
        });
    }

    // --- 10. Nav Mobile Toggle ---
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
});

// Toast notification helper
function showToast(msg) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    if (toast && toastMessage) {
        toastMessage.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}
