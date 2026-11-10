/**
 * The Human Check - Interactive Gatekeeper
 * Designed with love for Aditi Soni
 * Built with pure Vanilla JS, Web Audio API sound synthesis, and procedural canvas confetti/hearts.
 */

(() => {
  'use strict';

  // --- AUDIO SYNTHESIZER (Pure Web Audio API - 100% Offline, Zero Dependencies) ---
  class SoundFX {
    constructor() {
      this.ctx = null;
      this.enabled = true;
    }

    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioCtx();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    // Cute animal pop / bubble sound
    playPop() {
      if (!this.enabled) return;
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    }

    // Playful boing sound for roasts
    playBoing() {
      if (!this.enabled) return;
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(260, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(540, this.ctx.currentTime + 0.08);
      osc.frequency.linearRampToValueAtTime(320, this.ctx.currentTime + 0.16);
      osc.frequency.linearRampToValueAtTime(620, this.ctx.currentTime + 0.24);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.28);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.28);
    }

    // Soft click chime
    playClick() {
      if (!this.enabled) return;
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(659.25, this.ctx.currentTime); // E5
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    }

    // Celebration harp arpeggio when unlocking surprise
    playFanfare() {
      if (!this.enabled) return;
      this.init();
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

          gain.gain.setValueAtTime(0.22, this.ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.6);

          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start();
          osc.stop(this.ctx.currentTime + 0.6);
        }, idx * 90);
      });
    }
  }

  const sound = new SoundFX();

  // --- CONFETTI & FLOATING HEARTS PARTICLE ENGINE ---
  class ConfettiEngine {
    constructor() {
      this.canvas = document.getElementById('confetti-canvas');
      this.ctx = this.canvas.getContext('2d');
      this.particles = [];
      this.animId = null;
      this.resize();
      window.addEventListener('resize', () => this.resize());
    }

    resize() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }

    burst() {
      const colors = ['#f47298', '#ffd1dc', '#e5b358', '#ffffff', '#e85d88', '#f8a5c2'];
      const shapes = ['circle', 'rect', 'heart'];

      for (let i = 0; i < 90; i++) {
        this.particles.push({
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
          vx: (Math.random() - 0.5) * 16,
          vy: -Math.random() * 14 - 6,
          size: Math.random() * 8 + 6,
          color: colors[Math.floor(Math.random() * colors.length)],
          shape: shapes[Math.floor(Math.random() * shapes.length)],
          rot: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.2,
          opacity: 1.0,
          gravity: 0.35
        });
      }

      if (!this.animId) {
        this.animate();
      }
    }

    animate() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.rot += p.vRot;
        p.opacity -= 0.009;

        if (p.opacity <= 0 || p.y > this.canvas.height + 50) {
          this.particles.splice(i, 1);
          continue;
        }

        this.ctx.save();
        this.ctx.globalAlpha = Math.max(0, p.opacity);
        this.ctx.fillStyle = p.color;
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate(p.rot);

        if (p.shape === 'circle') {
          this.ctx.beginPath();
          this.ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          this.ctx.fill();
        } else if (p.shape === 'rect') {
          this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        } else if (p.shape === 'heart') {
          this.drawHeart(0, 0, p.size * 0.8);
        }

        this.ctx.restore();
      }

      if (this.particles.length > 0) {
        this.animId = requestAnimationFrame(() => this.animate());
      } else {
        this.animId = null;
      }
    }

    drawHeart(x, y, s) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, y + s / 4);
      this.ctx.quadraticCurveTo(x, y, x + s / 4, y);
      this.ctx.quadraticCurveTo(x + s / 2, y, x + s / 2, y + s / 4);
      this.ctx.quadraticCurveTo(x + s / 2, y, x + (s * 3) / 4, y);
      this.ctx.quadraticCurveTo(x + s, y, x + s, y + s / 4);
      this.ctx.quadraticCurveTo(x + s, y + s / 2, x + (s * 3) / 4, y + (s * 3) / 4);
      this.ctx.lineTo(x + s / 2, y + s);
      this.ctx.lineTo(x + s / 4, y + (s * 3) / 4);
      this.ctx.quadraticCurveTo(x, y + s / 2, x, y + s / 4);
      this.ctx.fill();
    }
  }

  const confetti = new ConfettiEngine();

  // --- CUTE ANIMAL AVATARS & ROAST MESSAGES ---
  const animalRoasts = [
    {
      avatar: '🐵',
      name: 'monkeyy',
      message: 'Liar liar! 🐒 High-tech scans reveal you are 100% monkeyy! Tap again for another test hehe'
    },
    {
      avatar: '🐼',
      name: 'pandaguu',
      message: 'Beep boop! 🐼 Sensor detected a sleepy pandaguu who loves 12-hour naps & constant snacks!'
    },
    {
      avatar: '🐰',
      name: 'bunnyy',
      message: 'Fake news! 🐰 You are actually a grumpy little bunny who pouts whenever hungry!'
    },
    {
      avatar: '🐱',
      name: 'kitten',
      message: 'Nopeee! 🐱 Security scan confirms: an angry kitten! Scratches first, cuddles later!'
    },
    {
      avatar: '🐧',
      name: 'penguinn',
      message: 'Clearly a tiny penguin 🐧 waddling around looking extremely cute for no reason at all!'
    },
    {
      avatar: '🐨',
      name: 'koalaa',
      message: 'Error 404: Human not found! 🐨 Found a clingy koala who refuses to let go of cuddles!'
    },
    {
      avatar: '🐥',
      name: 'ducklingg',
      message: 'Quack quack! 🐥 Just a tiny duckling following her favorite boy everywhere!'
    },
    {
      avatar: '🐶',
      name: 'puppyyy',
      message: '100% puppy energy! 🐶 Excited, lovable, and easily distracted by treats!'
    },
    {
      avatar: '🦊',
      name: 'foxyy',
      message: 'Clever little foxy 🦊 detected! But you can’t outsmart this birthday test, babyyy!'
    },
    {
      avatar: '🦫',
      name: 'beaverroo',
      message: 'A busy beaverroo 🦫 who stresses over tiny things! Chill out today, birthday girl!'
    }
  ];

  let previousAnimalIndex = -1;

  // --- DOM ELEMENTS ---
  const cardTitle = document.getElementById('card-title');
  const mascotAvatar = document.getElementById('mascot-avatar');
  const speechBubble = document.getElementById('speech-bubble');

  const groupHuman = document.getElementById('group-human');
  const groupHinglish = document.getElementById('group-hinglish');
  const groupUnlock = document.getElementById('group-unlock');

  const btnYes = document.getElementById('btn-yes');
  const btnNo = document.getElementById('btn-no');
  const btnHinglishYes = document.getElementById('btn-hinglish-yes');
  const btnHinglishNo = document.getElementById('btn-hinglish-no');
  const btnUnlock = document.getElementById('btn-unlock');
  const soundToggle = document.getElementById('sound-toggle');

  // --- UTILITY: UPDATE MASCOT & SPEECH BUBBLE WITH SPRING ANIMATION ---
  function updateBubble(text, avatar = null) {
    speechBubble.classList.remove('reply-pop');
    speechBubble.textContent = text;
    void speechBubble.offsetWidth; // Trigger reflow
    speechBubble.classList.add('reply-pop');

    if (avatar) {
      mascotAvatar.classList.remove('pop');
      mascotAvatar.textContent = avatar;
      void mascotAvatar.offsetWidth;
      mascotAvatar.classList.add('pop');
    }
  }

  // --- 1. "YESSS, OBVIOUSLY!" CLICK HANDLER (Animal Avatars & Roasts) ---
  btnYes.addEventListener('click', () => {
    sound.playBoing();

    // Haptic feedback for mobile
    if (navigator.vibrate) navigator.vibrate([20, 10, 30]);

    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * animalRoasts.length);
    } while (nextIndex === previousAnimalIndex);
    previousAnimalIndex = nextIndex;

    const chosen = animalRoasts[nextIndex];
    updateBubble(chosen.message, chosen.avatar);
  });

  // --- 2. "NOPE." CLICK HANDLER (Opens Teasing Hinglish Conversation) ---
  btnNo.addEventListener('click', () => {
    sound.playClick();
    if (navigator.vibrate) navigator.vibrate(30);

    cardTitle.innerHTML = 'Hehehee, <span>I knew it!</span>';
    updateBubble(
      'merkoo to ptaa tha phelee see hehehee 😌 babyyyy vo naa aapse kuch kehnaa thaaa... bolu kya? 🥺👉👈',
      '😏'
    );

    // Switch buttons to Hinglish choices
    groupHuman.classList.add('hidden');
    groupHinglish.classList.remove('hidden');
  });

  // --- 3. HINGLISH: "hnnn boloo 💕" ---
  btnHinglishYes.addEventListener('click', () => {
    sound.playClick();
    if (navigator.vibrate) navigator.vibrate(20);

    updateBubble('nhi bol rhaaa abhi, thoda sa wait krooo 😜', '😜');

    // Playful wobble animation on the button
    btnHinglishYes.style.transform = 'translateX(6px)';
    setTimeout(() => { btnHinglishYes.style.transform = 'translateX(-6px)'; }, 100);
    setTimeout(() => { btnHinglishYes.style.transform = 'translateX(0)'; }, 200);
  });

  // --- 4. HINGLISH: "nhiii 🙈" (Unlocks Birthday Surprise) ---
  btnHinglishNo.addEventListener('click', () => {
    sound.playClick();
    if (navigator.vibrate) navigator.vibrate([40, 20, 50]);

    // Disable buttons temporarily
    btnHinglishYes.disabled = true;
    btnHinglishNo.disabled = true;

    updateBubble('Achaaa sunooo! mai to bolungaa hi bolungaa 🥰', '🥰');

    setTimeout(() => {
      cardTitle.innerHTML = 'You passed the test! <span>❤️</span>';
      updateBubble(
        'Even though you’re not human, you’re an angel 👼 babyyygurlll. Happy Birthday! Ready for your surprise?',
        '💝'
      );

      groupHinglish.classList.add('hidden');
      groupUnlock.classList.remove('hidden');
    }, 700);
  });

  // --- 5. "OKAY, OPEN MY BIRTHDAY SURPRISE 🎁✨" (Grand Unlock) ---
  btnUnlock.addEventListener('click', () => {
    sound.playFanfare();
    confetti.burst();

    if (navigator.vibrate) navigator.vibrate([50, 40, 80, 50, 120]);

    btnUnlock.innerHTML = '<span>✨ Opening your world... 🚀</span>';
    btnUnlock.style.transform = 'scale(0.98)';

    updateBubble(
      'Yaaaay! Unlocking your magical birthday world right now... Hold on to your smile, Aditi! 🌸💫',
      '🎉'
    );

    // Notify any parent window or listener
    window.dispatchEvent(new CustomEvent('human-check-unlocked', { detail: { passed: true } }));

    // Standalone navigation fallback to Part 2
    setTimeout(() => {
      try {
        if (window.parent === window) {
          window.location.href = '../part 2/index.html';
        }
      } catch (_) {}
    }, 2000);
  });

  // --- 6. SOUND TOGGLE BUTTON ---
  soundToggle.addEventListener('click', () => {
    sound.enabled = !sound.enabled;
    soundToggle.innerHTML = sound.enabled
      ? '<span>🔊</span><span>Sound ON</span>'
      : '<span>🔇</span><span>Sound OFF</span>';
  });
})();
