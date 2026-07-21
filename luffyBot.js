// ==========================================================================
// LUFFY COMPANION BOT STATE MACHINE - ONE PIECE PORTFOLIO
// States: IDLE, SLEEP, WALK, WAVE, JUMP, CELEBRATE
// ==========================================================================

class LuffyCompanionController {
    constructor() {
        this.state = 'IDLE'; // IDLE, SLEEP, WALK, WAVE, JUMP, CELEBRATE
        this.idleTimer = null;
        this.widget = null;
        this.speechBubble = null;
        this.speechText = null;
        this.avatarImg = null;
        this.typewriterInterval = null;

        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.widget = document.getElementById('miniLuffyBot');
            this.speechBubble = document.getElementById('luffySpeechBubble');
            this.speechText = document.getElementById('luffySpeechText');
            this.avatarImg = document.querySelector('.luffy-avatar-img');

            if (!this.widget) return;

            this.resetIdleTimer();
            this.bindEvents();
            this.setState('WAVE', "Shishishi! Welcome to Sankarsha's Grand Line Portfolio!");
        });
    }

    setState(newState, speechMessage = null) {
        this.state = newState;
        if (this.widget) {
            this.widget.setAttribute('data-state', newState);
        }

        if (this.avatarImg) {
            this.avatarImg.className = `luffy-avatar-img state-${newState.toLowerCase()}`;
        }

        if (speechMessage) {
            this.speak(speechMessage);
        }

        if (newState === 'SLEEP') {
            if (this.speechText) this.speechText.textContent = "Zzz... Zzz... dreaming of meat and AI bounties... 🍖";
        }
    }

    speak(text) {
        if (!this.speechText) return;
        if (this.typewriterInterval) clearInterval(this.typewriterInterval);

        this.speechText.textContent = '';
        let i = 0;

        this.typewriterInterval = setInterval(() => {
            if (i < text.length) {
                this.speechText.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(this.typewriterInterval);
            }
        }, 16);
    }

    resetIdleTimer() {
        if (this.idleTimer) clearTimeout(this.idleTimer);

        if (this.state === 'SLEEP') {
            this.setState('IDLE', "Awake! Let's explore more islands!");
        }

        this.idleTimer = setTimeout(() => {
            this.setState('SLEEP');
        }, 12000); // 12 seconds inactivity -> SLEEP
    }

    bindEvents() {
        // Track mouse movement for idle reset and slight cursor follow
        window.addEventListener('mousemove', (e) => {
            this.resetIdleTimer();
            this.handleCursorFollow(e);
        });

        // Track scroll events
        window.addEventListener('scroll', () => {
            this.resetIdleTimer();
        });

        // Click Luffy -> Trigger Jump & Open Sunny AI Assistant Modal
        if (this.widget) {
            this.widget.addEventListener('click', () => {
                this.setState('JUMP', "Opening Sunny AI Assistant! Ask me anything about Sankarsha!");
                
                const sunnyModal = document.getElementById('sunnyAiModal');
                if (sunnyModal) {
                    sunnyModal.classList.add('active');
                }
            });
        }
    }

    handleCursorFollow(e) {
        if (this.state === 'SLEEP' || !this.widget) return;

        // Subtle parallax movement towards cursor
        const mouseX = e.clientX;
        const windowWidth = window.innerWidth;
        const deltaX = (mouseX - windowWidth / 2) / 60;

        this.widget.style.transform = `translateX(${deltaX}px)`;
    }

    triggerCelebrate(msg = "SUGEEE! Mission Accomplished!") {
        this.setState('CELEBRATE', msg);
        setTimeout(() => {
            this.setState('IDLE');
        }, 4000);
    }
}

window.luffyCompanion = new LuffyCompanionController();
