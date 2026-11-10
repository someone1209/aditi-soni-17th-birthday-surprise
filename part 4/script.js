/**
 * PART 04 — THE LOVE NOTES
 * 12 Gorgeous Romantic Themes (CSS-driven via body[data-theme])
 * Pure Vanilla JavaScript
 * Features:
 * - 12 Romantic Themes switching via body[data-theme="..."]
 * - Interactive Theme Drawer Modal & Quick Theme Cycle Dock
 * - Physical 3D Card Tilt with Specular Glare Tracking
 * - Ambient Floating Rose Petals & Starlight Particle Canvas (Theme-reactive colors)
 * - Pure Web Audio API Synthesizer (Zero Audio File Dependencies)
 * - Heart Burst Animation & Interactive Promise Lock Counter
 * - Secret Whisper Accordion Unfolds
 * - Sweet Hinglish Toast Reassurance
 * Dedicated to Aditi Soni (Born 16 Dec 2009) from yours spidy 🕸️❤️
 */

(() => {
  'use strict';

  // ==========================================================================
  // 1. 12 ROMANTIC THEMES DEFINITION (Matches body[data-theme] in style.css)
  // ==========================================================================
  const THEMES = [
    {
      id: 'blush-parchment',
      name: 'Blush Parchment',
      icon: '🌸',
      badge: 'Classic Romance',
      desc: 'Handmade cotton rag paper, rose-gold pins & washi tape ribbons.',
      petalColors: [['#f9b8c8', '#e85d88'], ['#ffd6e2', '#f489a8'], ['#fbe3ec', '#eb7698']]
    },
    {
      id: 'midnight-velvet',
      name: 'Midnight Velvet',
      icon: '🌙',
      badge: 'Cyber Romance',
      desc: 'Obsidian glass cards with electric magenta & neon cyan edge glow.',
      petalColors: [['#ff2a85', '#9b51e0'], ['#00f0ff', '#7928ca'], ['#ff007f', '#3a0ca3']]
    },
    {
      id: 'lavender-haze',
      name: 'Lavender Haze',
      icon: '💜',
      badge: 'Ethereal Cloud',
      desc: 'Soft lilac gradient mist, floating card aura & crystal amethyst pins.',
      petalColors: [['#d8b4e2', '#a855f7'], ['#e9d5ff', '#c084fc'], ['#f3e8ff', '#9333ea']]
    },
    {
      id: 'rose-gold-luxury',
      name: 'Rose Gold Luxury',
      icon: '✨',
      badge: 'High Fashion',
      desc: 'Editorial luxury layout with metallic copper foil & champagne satin.',
      petalColors: [['#f3c4b2', '#e58c73'], ['#fde2d8', '#d97757'], ['#fff1eb', '#b45309']]
    },
    {
      id: 'sakura-blossom',
      name: 'Sakura Blossom',
      icon: '🌸',
      badge: 'Tokyo Spring',
      desc: 'Cherry blossom festival lanterns with falling sakura petals & washi strips.',
      petalColors: [['#ffb7c5', '#ff6b81'], ['#ffe4e8', '#ff8fa3'], ['#ffffff', '#ffccd5']]
    },
    {
      id: 'celestial-starlight',
      name: 'Celestial Starlight',
      icon: '⭐',
      badge: 'Zodiac Cosmos',
      desc: 'Deep indigo midnight sky dusted with twinkling constellations & golden stardust.',
      petalColors: [['#ffd700', '#ffae00'], ['#82aaff', '#4c8bf5'], ['#ffffff', '#e0e7ff']]
    },
    {
      id: 'vintage-scrapbook',
      name: 'Vintage Scrapbook',
      icon: '📜',
      badge: 'Old Polaroid',
      desc: 'Sepia airmail postcard deck with retro postage stamps & kraft twine.',
      petalColors: [['#d4a373', '#bc6c25'], ['#faedcd', '#dda15e'], ['#fefae0', '#99582a']]
    },
    {
      id: 'sunset-romance',
      name: 'Sunset Romance',
      icon: '🌅',
      badge: 'Golden Hour',
      desc: 'Warm sunset horizon gradients with golden sunbeam highlights & beach polaroids.',
      petalColors: [['#ff7e5f', '#feb47b'], ['#ff9966', '#ff5e62'], ['#ffd166', '#ef476f']]
    },
    {
      id: 'emerald-fairytale',
      name: 'Emerald Fairytale',
      icon: '🌿',
      badge: 'Enchanted Story',
      desc: 'Deep forest velvet, gold illuminated manuscript borders & ivy leaves.',
      petalColors: [['#52b788', '#2d6a4f'], ['#74c69d', '#1b4332'], ['#d8f3dc', '#40916c']]
    },
    {
      id: 'cotton-candy',
      name: 'Cotton Candy',
      icon: '🍭',
      badge: 'Sweet Y2K',
      desc: 'Bubbly pastel sky blue & bubblegum pink with playful sparkles.',
      petalColors: [['#ffb6c1', '#a0c4ff'], ['#ffc6ff', '#bdb2ff'], ['#fdffb6', '#caffbf']]
    },
    {
      id: 'ruby-passion',
      name: 'Ruby Passion',
      icon: '🌹',
      badge: 'Deep Devotion',
      desc: 'Deep crimson velvet folios with royal gold wax seals & burgundy roses.',
      petalColors: [['#e63946', '#9b111e'], ['#ff4d6d', '#590d22'], ['#ff758f', '#800f2f']]
    },
    {
      id: 'moonlit-pearl',
      name: 'Moonlit Pearl',
      icon: '🪞',
      badge: 'Clean Elegance',
      desc: 'Minimalist porcelain cards with iridescent pearlescent shimmer & silver pins.',
      petalColors: [['#e0e7ff', '#c7d2fe'], ['#f1f5f9', '#94a3b8'], ['#ffffff', '#cbd5e1']]
    }
  ];

  // ==========================================================================
  // 2. PURE WEB AUDIO SYNTHESIZER
  // ==========================================================================
  class LoveSoundFX {
    constructor() {
      this.ctx = null;
      this.muted = false;
      this.chimeScale = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50]; // C5 to C6 pentatonic
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

    playChime(noteIndex = 0) {
      if (this.muted) return;
      this.init();

      const freq = this.chimeScale[noteIndex % this.chimeScale.length];
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      const oscOvertone = this.ctx.createOscillator();
      const gainOvertone = this.ctx.createGain();
      oscOvertone.type = 'triangle';
      oscOvertone.frequency.setValueAtTime(freq * 2, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.85);

      gainOvertone.gain.setValueAtTime(0.001, now);
      gainOvertone.gain.linearRampToValueAtTime(0.06, now + 0.02);
      gainOvertone.gain.exponentialRampToValueAtTime(0.0001, now + 0.55);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      oscOvertone.connect(gainOvertone);
      gainOvertone.connect(this.ctx.destination);

      osc.start(now);
      oscOvertone.start(now);
      osc.stop(now + 0.9);
      oscOvertone.stop(now + 0.6);
    }

    playHeartLock() {
      if (this.muted) return;
      this.init();
      const now = this.ctx.currentTime;
      const notes = [659.25, 830.61, 987.77, 1318.51]; // E Major chord arpeggio
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        gain.gain.setValueAtTime(0.001, now + idx * 0.06);
        gain.gain.linearRampToValueAtTime(0.14, now + idx * 0.06 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 0.7);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.75);
      });
    }

    playPaperRustle() {
      if (this.muted) return;
      this.init();
      const now = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 0.15;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.4));
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, now);
      filter.Q.setValueAtTime(2.5, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      whiteNoise.start(now);
      whiteNoise.stop(now + 0.16);
    }

    playThemeChime() {
      if (this.muted) return;
      this.init();
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0.001, now + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.12, now + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.6);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.65);
      });
    }

    toggleMute() {
      this.muted = !this.muted;
      return !this.muted;
    }
  }

  const sound = new LoveSoundFX();

  // ==========================================================================
  // 3. AMBIENT PETALS & STARLIGHT PARTICLES CANVAS
  // ==========================================================================
  class AmbientPetalsCanvas {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext('2d');
      this.petals = [];
      this.sparkles = [];
      this.petalCount = window.innerWidth < 768 ? 22 : 44;
      this.sparkleCount = window.innerWidth < 768 ? 26 : 52;
      this.currentColors = THEMES[0].petalColors;

      this.resize();
      this.initParticles();
      this.bindEvents();
      this.loop();
    }

    resize() {
      this.width = this.canvas.width = window.innerWidth;
      this.height = this.canvas.height = window.innerHeight;
    }

    bindEvents() {
      window.addEventListener('resize', () => this.resize(), { passive: true });
    }

    updateThemeColors(theme) {
      if (theme && theme.petalColors) {
        this.currentColors = theme.petalColors;
      }
    }

    initParticles() {
      this.petals = [];
      for (let i = 0; i < this.petalCount; i++) {
        this.petals.push(this.createPetal(true));
      }
      this.sparkles = [];
      for (let i = 0; i < this.sparkleCount; i++) {
        this.sparkles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          radius: Math.random() * 1.8 + 0.6,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.03 + 0.015
        });
      }
    }

    createPetal(randomY = false) {
      return {
        x: Math.random() * this.width,
        y: randomY ? Math.random() * this.height : -30,
        size: Math.random() * 10 + 9,
        speedY: Math.random() * 1.2 + 0.7,
        speedX: Math.random() * 0.9 - 0.45,
        angle: Math.random() * 360,
        angularSpeed: (Math.random() - 0.5) * 0.03,
        tilt: Math.random() * Math.PI,
        tiltSpeed: Math.random() * 0.04 + 0.02,
        opacity: Math.random() * 0.45 + 0.35,
        colorIndex: Math.floor(Math.random() * 3)
      };
    }

    loop() {
      this.ctx.clearRect(0, 0, this.width, this.height);

      // Draw Starlight Sparkles
      this.sparkles.forEach(s => {
        s.phase += s.speed;
        const currentAlpha = 0.2 + (Math.sin(s.phase) + 1) * 0.35;
        this.ctx.fillStyle = `rgba(223, 161, 61, ${currentAlpha})`;
        this.ctx.beginPath();
        this.ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        this.ctx.fill();
      });

      // Draw Rose Petals
      const colors = this.currentColors;

      this.petals.forEach(p => {
        p.y += p.speedY;
        p.x += Math.sin(p.tilt) * 0.8 + p.speedX;
        p.angle += p.angularSpeed;
        p.tilt += p.tiltSpeed;

        if (p.y > this.height + 40 || p.x < -40 || p.x > this.width + 40) {
          Object.assign(p, this.createPetal(false));
        }

        this.ctx.save();
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate(p.angle);
        this.ctx.scale(Math.cos(p.tilt), 1);
        this.ctx.globalAlpha = p.opacity;

        const grad = this.ctx.createLinearGradient(0, -p.size, 0, p.size);
        const [c1, c2] = colors[p.colorIndex % colors.length];
        grad.addColorStop(0, c1);
        grad.addColorStop(1, c2);

        this.ctx.fillStyle = grad;
        this.ctx.beginPath();
        this.ctx.moveTo(0, -p.size);
        this.ctx.bezierCurveTo(p.size * 0.8, -p.size * 0.5, p.size * 0.7, p.size * 0.6, 0, p.size);
        this.ctx.bezierCurveTo(-p.size * 0.7, p.size * 0.6, -p.size * 0.8, -p.size * 0.5, 0, -p.size);
        this.ctx.fill();

        this.ctx.restore();
      });

      requestAnimationFrame(() => this.loop());
    }
  }

  let ambientCanvasInstance = null;

  // ==========================================================================
  // 4. THEME MANAGER: 12 TOTALLY DISTINCT ROMANTIC THEMES
  // ==========================================================================
  class ThemeManager {
    constructor() {
      this.currentIndex = 0;
      this.storageKey = 'aditi_love_notes_theme';
      this.themePill = document.getElementById('theme-switch-pill');
      this.quickBtn = document.getElementById('theme-quick-btn');
      this.paletteBtn = document.getElementById('theme-palette-btn');
      this.modal = document.getElementById('theme-modal');
      this.closeBtn = document.getElementById('theme-modal-close');
      this.grid = document.getElementById('theme-grid');
      this.dockIcon = document.getElementById('dock-theme-icon');

      this.initThemeList();
      this.bindEvents();
      this.restoreTheme();
    }

    initThemeList() {
      if (!this.grid) return;
      this.grid.innerHTML = '';

      THEMES.forEach((theme, index) => {
        const card = document.createElement('button');
        card.type = 'button';
        card.className = `theme-choice-card ${index === this.currentIndex ? 'active' : ''}`;
        card.setAttribute('data-theme-id', theme.id);
        card.innerHTML = `
          <div class="choice-top">
            <span class="choice-icon">${theme.icon}</span>
            <span class="choice-badge">${theme.badge}</span>
          </div>
          <div class="choice-name">${theme.name}</div>
          <div class="choice-desc">${theme.desc}</div>
        `;

        card.addEventListener('click', () => {
          this.applyTheme(index);
          this.closeModal();
        });

        this.grid.appendChild(card);
      });
    }

    bindEvents() {
      // Open modal
      if (this.themePill) {
        this.themePill.addEventListener('click', () => this.openModal());
      }
      if (this.paletteBtn) {
        this.paletteBtn.addEventListener('click', () => this.openModal());
      }

      // Close modal
      if (this.closeBtn) {
        this.closeBtn.addEventListener('click', () => this.closeModal());
      }
      if (this.modal) {
        this.modal.addEventListener('click', (e) => {
          if (e.target === this.modal) this.closeModal();
        });
      }

      // Quick switch next theme
      if (this.quickBtn) {
        this.quickBtn.addEventListener('click', () => {
          const nextIndex = (this.currentIndex + 1) % THEMES.length;
          this.applyTheme(nextIndex);
        });
      }

      // ESC key to close modal
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.modal && this.modal.classList.contains('open')) {
          this.closeModal();
        }
      });
    }

    openModal() {
      if (!this.modal) return;
      this.modal.classList.add('open');
      this.modal.setAttribute('aria-hidden', 'false');
      sound.playChime(2);
    }

    closeModal() {
      if (!this.modal) return;
      this.modal.classList.remove('open');
      this.modal.setAttribute('aria-hidden', 'true');
    }

    applyTheme(index) {
      if (index < 0 || index >= THEMES.length) index = 0;
      this.currentIndex = index;
      const theme = THEMES[index];

      // Set body data-theme attribute (drives ALL 12 themes in style.css!)
      document.body.setAttribute('data-theme', theme.id);

      // Update active card in modal
      if (this.grid) {
        const cards = this.grid.querySelectorAll('.theme-choice-card');
        cards.forEach((c, idx) => {
          c.classList.toggle('active', idx === index);
        });
      }

      // Update theme dock icon & pill text
      if (this.dockIcon) {
        this.dockIcon.textContent = theme.icon;
      }
      if (this.themePill) {
        const pillText = this.themePill.querySelector('.theme-pill-text');
        if (pillText) pillText.textContent = theme.name;
        const pillIcon = this.themePill.querySelector('.theme-pill-icon');
        if (pillIcon) pillIcon.textContent = theme.icon;
      }

      // Update ambient canvas petal colors
      if (ambientCanvasInstance) {
        ambientCanvasInstance.updateThemeColors(theme);
      }

      // Save to localStorage
      try {
        localStorage.setItem(this.storageKey, theme.id);
      } catch (e) {}

      // Sound & Toast feedback
      sound.playThemeChime();
      showToast(`Switched to theme: ${theme.name} ${theme.icon}`);
    }

    restoreTheme() {
      let savedThemeId = null;
      try {
        savedThemeId = localStorage.getItem(this.storageKey);
      } catch (e) {}

      let targetIndex = 0;
      if (savedThemeId) {
        const foundIdx = THEMES.findIndex(t => t.id === savedThemeId);
        if (foundIdx !== -1) targetIndex = foundIdx;
      }

      this.applyTheme(targetIndex);
    }
  }

  // ==========================================================================
  // 5. PHYSICAL 3D CARD TILT & SPECULAR GLARE
  // ==========================================================================
  function initCardTilt() {
    const cards = document.querySelectorAll('.love-card');
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    cards.forEach((card, index) => {
      let isHovered = false;

      const handleMove = (e) => {
        if (!isHovered) return;
        const rect = card.getBoundingClientRect();
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        const clientY = e.clientY || (e.touches && e.touches[0].clientY);

        if (!clientX || !clientY) return;

        const x = clientX - rect.left;
        const y = clientY - rect.top;

        // Update CSS custom properties for specular glare
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        // Compute normalized coordinates (-1 to 1)
        const normX = (x / rect.width) * 2 - 1;
        const normY = (y / rect.height) * 2 - 1;

        // Subtle 3D tilt angles (max 8 degrees)
        const rotX = -normY * 8;
        const rotY = normX * 8;

        card.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-4px) scale(1.02)`;
      };

      card.addEventListener('mouseenter', (e) => {
        isHovered = true;
        sound.playChime(index);
        handleMove(e);
      });

      card.addEventListener('mousemove', handleMove, { passive: true });

      card.addEventListener('mouseleave', () => {
        isHovered = false;
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
      });

      // Touch tactile feedback
      if (isTouchDevice) {
        card.addEventListener('touchstart', () => {
          card.style.transform = 'scale(0.98)';
        }, { passive: true });

        card.addEventListener('touchend', () => {
          card.style.transform = 'scale(1)';
        }, { passive: true });
      }
    });
  }

  // ==========================================================================
  // 6. HEART BURST & PROMISE LOCK INTERACTION
  // ==========================================================================
  const toastMessages = [
    "Promise locked in my heart forever, Aditi 🔒❤️",
    "Tu meri priority thi, hai, aur hamesha rahegi ✨",
    "No terms, no conditions... bas beintehaa pyaar 💖",
    "Every single heartbeat belongs to you ⏳",
    "Rebirth ke baad bhi tu hi meri favorite rahegi ♾️",
    "Teri smile meri favorite scenery hai, babyyygurlll 🌸"
  ];

  function showToast(message) {
    let toast = document.querySelector('.toast-pill');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast-pill';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');

    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  function spawnFlyingHearts(originX, originY) {
    const heartEmojis = ['💖', '❤️', '💕', '✨', '🌸', '💘'];
    const count = 8;

    for (let i = 0; i < count; i++) {
      const heart = document.createElement('div');
      heart.className = 'flying-heart';
      heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
      heart.style.left = `${originX}px`;
      heart.style.top = `${originY}px`;

      const tx = (Math.random() - 0.5) * 160;
      const rot = (Math.random() - 0.5) * 60;
      heart.style.setProperty('--tx', `${tx}px`);
      heart.style.setProperty('--rot', `${rot}deg`);

      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 1600);
    }
  }

  function initHeartPromises() {
    const heartBtns = document.querySelectorAll('.heart-promise-btn');

    heartBtns.forEach((btn, index) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();

        // Increment counter
        const counterEl = btn.querySelector('.heart-counter');
        if (counterEl) {
          let current = parseInt(counterEl.getAttribute('data-count') || '16', 10);
          current += 1;
          counterEl.setAttribute('data-count', current);
          counterEl.textContent = current;
        }

        // Bouncy pulse animation
        btn.style.transform = 'scale(1.22)';
        setTimeout(() => { btn.style.transform = ''; }, 220);

        // Spawn flying hearts
        const rect = btn.getBoundingClientRect();
        const originX = rect.left + rect.width / 2;
        const originY = rect.top + rect.height / 2;
        spawnFlyingHearts(originX, originY);

        // Sound & Toast
        sound.playHeartLock();
        showToast(toastMessages[index % toastMessages.length]);
      });
    });
  }

  // ==========================================================================
  // 7. SECRET WHISPER ACCORDION
  // ==========================================================================
  function initSecretWhispers() {
    const toggleBtns = document.querySelectorAll('.secret-toggle-btn');

    toggleBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = btn.closest('.love-card');
        if (!card) return;

        const content = card.querySelector('.secret-whisper-content');
        if (!content) return;

        const isOpen = content.classList.contains('open');

        if (isOpen) {
          content.classList.remove('open');
          btn.setAttribute('aria-expanded', 'false');
          btn.innerHTML = '<span>Secret Whisper ✨</span>';
        } else {
          content.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
          btn.innerHTML = '<span>Hide Whisper ✕</span>';
          sound.playPaperRustle();
        }
      });
    });
  }

  // ==========================================================================
  // 8. AUDIO TOGGLE BUTTON
  // ==========================================================================
  function initAudioControl() {
    const soundBtn = document.getElementById('sound-btn');
    if (!soundBtn) return;

    soundBtn.addEventListener('click', () => {
      const isAudible = sound.toggleMute();
      const icon = soundBtn.querySelector('.sound-icon');
      const text = soundBtn.querySelector('.sound-text');

      if (isAudible) {
        soundBtn.classList.remove('muted');
        if (icon) icon.textContent = '🔊';
        if (text) text.textContent = 'Chimes ON';
        sound.playChime(4);
      } else {
        soundBtn.classList.add('muted');
        if (icon) icon.textContent = '🔇';
        if (text) text.textContent = 'Chimes Muted';
      }
    });
  }

  // ==========================================================================
  // 9. INITIALIZE ON DOM READY
  // ==========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    ambientCanvasInstance = new AmbientPetalsCanvas('ambient-canvas');
    new ThemeManager();
    initCardTilt();
    initHeartPromises();
    initSecretWhispers();
    initAudioControl();
  });

})();
