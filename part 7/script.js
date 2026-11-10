/**
 * PART 07 — POLAROID MEMORY WALL
 * For Aditi Soni · Turning 17 (DOB: 16 Dec 2009)
 * From: yours spidy 🕸️❤️
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. 8 CHERISHED POLAROID MEMORIES DATA
     ========================================================================== */
  const MEMORIES_DATA = [
    {
      id: 1,
      title: "The First Hello",
      date: "The Sweet Beginning",
      caption: "When two strangers became each other's favorite story.",
      tapeClass: "tape-rose",
      rotationClass: "rot-neg-3",
      fallbackTheme: "sakura",
      imageSrc: "photo1.jpg",
      diaryText: "“I remember typing and re-typing every single message, smiling like an idiot at my phone screen. Who knew that first little hello would turn into my forever home, Aditi? You became my favorite notification from day one.”"
    },
    {
      id: 2,
      title: "3 AM Laughter",
      date: "Midnight Magic",
      caption: "Tired eyes, sleepy giggles, and endless whispers.",
      tapeClass: "tape-gold",
      rotationClass: "rot-pos-4",
      fallbackTheme: "moonlight",
      imageSrc: "photo2.jpg",
      diaryText: "“We were both half-asleep, laughing at the silliest jokes until our stomachs hurt. It was in that quiet darkness that I realized I never, ever want to say goodbye to you. Those 3 AM calls are etched into my heart.”"
    },
    {
      id: 3,
      title: "Voice of Home",
      date: "A Voice That Stole My Heart",
      caption: "Hearing your voice for the very first time.",
      tapeClass: "tape-mint",
      rotationClass: "rot-neg-2",
      fallbackTheme: "coffee",
      imageSrc: "photo3.jpg",
      diaryText: "“My heart was hammering so fast I could barely breathe. But then you spoke, and suddenly everything felt so gentle, warm, and peaceful. Tera voice note hi mera favourite song ban gaya. Best sound in the universe.”"
    },
    {
      id: 4,
      title: "The Cute Pout",
      date: "Inside Joke Classic",
      caption: "The cutest pout in the entire universe.",
      tapeClass: "tape-lilac",
      rotationClass: "rot-pos-5",
      fallbackTheme: "cupid",
      imageSrc: "photo4.jpg",
      diaryText: "“You crossed your arms, pretended to be upset, and insisted 'kuch nahi hua.' But those big puppy eyes said 'please pamper me right now.' Seeing you get playfully dramatic is the most adorable thing on earth.”"
    },
    {
      id: 5,
      title: "Sunset Warmth",
      date: "Golden Hour Dreams",
      caption: "Thinking of you under blush and gold skies.",
      tapeClass: "tape-rose",
      rotationClass: "rot-neg-4",
      fallbackTheme: "sunset",
      imageSrc: "photo5.jpg",
      diaryText: "“Every time the evening sky turns pink and champagne gold, I wish you were standing right next to me with your hand wrapped in mine. Sunset is just nature trying its best to match the glow of your smile.”"
    },
    {
      id: 6,
      title: "Proudest Spidy",
      date: "Proudest Spidy Ever",
      caption: "Watching you shine with pure talent & pride.",
      tapeClass: "tape-gold",
      rotationClass: "rot-pos-3",
      fallbackTheme: "starry",
      imageSrc: "photo6.jpg",
      diaryText: "“Whenever you achieve something or tell me about your day with sparkling eyes, my chest fills with so much pride. You are so genuinely hardworking, smart, and beautiful, babyyygurlll. I am always cheering for you.”"
    },
    {
      id: 7,
      title: "Sweet 17 Angel",
      date: "16 Dec 2009 · Born An Angel",
      caption: "The day the stars aligned to bring you to life.",
      tapeClass: "tape-mint",
      rotationClass: "rot-neg-1",
      fallbackTheme: "angel",
      imageSrc: "photo7.jpg",
      diaryText: "“16 December 2009. The most golden day in history. Turning 17 today, and every single day you make my life infinitely sweeter. You are my greatest blessing, Aditi. Happy Birthday my babyyygurlll! 👑💖”"
    },
    {
      id: 8,
      title: "The Forever Vow",
      date: "Today, Tomorrow & Forever",
      caption: "Hand in hand, across this life and beyond.",
      tapeClass: "tape-lilac",
      rotationClass: "rot-pos-4b",
      fallbackTheme: "infinity",
      imageSrc: "photo8.jpg",
      diaryText: "“No matter how many seasons pass, my promise stands unbroken. In this life, in every rebirth, across every universe, I will choose you again and again without hesitation. Rooted in love forever, yours spidy 🕸️❤️”"
    }
  ];

  /* Storage Key */
  const STORAGE_KEY = 'aditi_polaroid_flipped_ids';

  /* App State */
  let flippedIds = new Set();
  let isSoundEnabled = true;

  /* ==========================================================================
     2. PURE WEB AUDIO SYNTHESIZER (TACTILE PAPER FLIP & CHIMES)
     ========================================================================== */
  class WallAudio {
    constructor() {
      this.ctx = null;
    }

    init() {
      if (!this.ctx) {
        const AudioClass = window.AudioContext || window.webkitAudioContext;
        if (AudioClass) {
          this.ctx = new AudioClass();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    playCardFlipSound() {
      if (!isSoundEnabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;

      // 1. Soft paper swoosh / slide tone
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(320, now);
      osc1.frequency.exponentialRampToValueAtTime(180, now + 0.15);

      gain1.gain.setValueAtTime(0.001, now);
      gain1.gain.exponentialRampToValueAtTime(0.22, now + 0.02);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);

      osc1.start(now);
      osc1.stop(now + 0.25);

      // 2. High metallic chime resonance (paper clip / fairy bell)
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(880, now + 0.04);
      osc2.frequency.exponentialRampToValueAtTime(1320, now + 0.16);

      gain2.gain.setValueAtTime(0.001, now + 0.04);
      gain2.gain.exponentialRampToValueAtTime(0.12, now + 0.06);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);

      osc2.start(now + 0.04);
      osc2.stop(now + 0.38);
    }

    playFanfare() {
      if (!isSoundEnabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];

      notes.forEach((f, idx) => {
        const t = now + idx * 0.1;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, t);

        gain.gain.setValueAtTime(0.001, t);
        gain.gain.exponentialRampToValueAtTime(0.3, t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.7);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t);
        osc.stop(t + 0.75);
      });
    }
  }

  const audioEngine = new WallAudio();

  /* ==========================================================================
     3. ROMANTIC ILLUSTRATED SVG FALLBACK GENERATOR
     ========================================================================== */
  function generateFallbackSVG(theme) {
    switch (theme) {
      case 'sunset':
        return `
          <svg viewBox="0 0 300 240" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="sunsetGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#ff758f"/>
                <stop offset="50%" stop-color="#ffb703"/>
                <stop offset="100%" stop-color="#fb8500"/>
              </linearGradient>
            </defs>
            <rect width="300" height="240" fill="url(#sunsetGrad)"/>
            <!-- Sun -->
            <circle cx="150" cy="130" r="42" fill="#fffdfa" opacity="0.95"/>
            <!-- Sea Horizon & Reflections -->
            <rect y="160" width="300" height="80" fill="#c9184a" opacity="0.85"/>
            <path d="M 0 160 Q 75 155 150 160 T 300 160 L 300 240 L 0 240 Z" fill="#800f2f" opacity="0.4"/>
            <ellipse cx="150" cy="180" rx="35" ry="4" fill="#ffd166" opacity="0.7"/>
            <ellipse cx="150" cy="195" rx="22" ry="3" fill="#ffd166" opacity="0.6"/>
            <!-- Flying Birds / Hearts -->
            <path d="M 80 70 Q 90 60 100 70 Q 110 60 120 70" stroke="#ffffff" stroke-width="2.5" fill="none" opacity="0.8"/>
            <path d="M 190 50 Q 198 42 206 50 Q 214 42 222 50" stroke="#ffffff" stroke-width="2" fill="none" opacity="0.8"/>
          </svg>
        `;

      case 'moonlight':
        return `
          <svg viewBox="0 0 300 240" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="moonGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#1b1b3a"/>
                <stop offset="60%" stop-color="#2b2d42"/>
                <stop offset="100%" stop-color="#4a152d"/>
              </linearGradient>
            </defs>
            <rect width="300" height="240" fill="url(#moonGrad)"/>
            <!-- Crescent Moon -->
            <circle cx="210" cy="75" r="32" fill="#fff8e7"/>
            <circle cx="222" cy="70" r="28" fill="#1b1b3a"/>
            <!-- Stars -->
            <circle cx="60" cy="40" r="2" fill="#ffd166"/>
            <circle cx="110" cy="85" r="2.5" fill="#ffffff"/>
            <circle cx="170" cy="35" r="1.5" fill="#ffffff"/>
            <circle cx="80" cy="120" r="2" fill="#ffd166"/>
            <circle cx="250" cy="130" r="2" fill="#ffffff"/>
            <!-- 3 AM Silhouette Window / Cat / Flowers -->
            <path d="M 0 190 Q 150 170 300 190 L 300 240 L 0 240 Z" fill="#0b090a"/>
            <text x="150" y="215" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="700" fill="#ffb703" text-anchor="middle" letter-spacing="2">3:00 AM · SILENT MAGIC</text>
          </svg>
        `;

      case 'coffee':
        return `
          <svg viewBox="0 0 300 240" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="coffeeGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#faedcd"/>
                <stop offset="100%" stop-color="#d4a373"/>
              </linearGradient>
            </defs>
            <rect width="300" height="240" fill="url(#coffeeGrad)"/>
            <!-- Warm Mug -->
            <ellipse cx="150" cy="140" rx="42" ry="36" fill="#ffffff" stroke="#c92a58" stroke-width="2.5"/>
            <ellipse cx="150" cy="130" rx="34" ry="24" fill="#6f1d1b"/>
            <!-- Latte Art Heart -->
            <path d="M 150 135 C 145 125 136 126 136 132 C 136 138 150 146 150 146 C 150 146 164 138 164 132 C 164 126 155 125 150 135 Z" fill="#fefae0"/>
            <!-- Steam -->
            <path d="M 142 100 Q 140 85 146 72" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.8"/>
            <path d="M 158 96 Q 160 80 154 68" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.8"/>
            <text x="150" y="200" font-family="'Dancing Script', cursive" font-size="20" font-weight="700" fill="#4a152d" text-anchor="middle">Voice of Comfort</text>
          </svg>
        `;

      case 'cupid':
        return `
          <svg viewBox="0 0 300 240" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="cupidGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#ffd6ff"/>
                <stop offset="100%" stop-color="#c8b6ff"/>
              </linearGradient>
            </defs>
            <rect width="300" height="240" fill="url(#cupidGrad)"/>
            <!-- Cupid Bow & Heart Arrow -->
            <circle cx="150" cy="115" r="45" fill="#ffffff" opacity="0.9"/>
            <path d="M 150 125 C 138 105 118 108 118 122 C 118 135 150 152 150 152 C 150 152 182 135 182 122 C 182 108 162 105 150 125 Z" fill="#e84a78"/>
            <!-- Sparkles -->
            <circle cx="100" cy="80" r="4" fill="#ffd166"/>
            <circle cx="205" cy="85" r="5" fill="#ffd166"/>
            <circle cx="150" cy="65" r="3" fill="#ffffff"/>
            <text x="150" y="195" font-family="'Caveat', cursive" font-size="22" font-weight="700" fill="#4a152d" text-anchor="middle">“Mujhe kuch nahi hua...”</text>
          </svg>
        `;

      case 'starry':
        return `
          <svg viewBox="0 0 300 240" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="starGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#0d1b2a"/>
                <stop offset="100%" stop-color="#415a77"/>
              </linearGradient>
            </defs>
            <rect width="300" height="240" fill="url(#starGrad)"/>
            <!-- Constellation Lines -->
            <polyline points="60,80 110,60 160,95 210,70 240,110" stroke="#e0e1dd" stroke-width="1.5" stroke-dasharray="3 3" fill="none" opacity="0.8"/>
            <circle cx="60" cy="80" r="4" fill="#ffd166"/>
            <circle cx="110" cy="60" r="4" fill="#ffffff"/>
            <circle cx="160" cy="95" r="5" fill="#ffd166"/>
            <circle cx="210" cy="70" r="4" fill="#ffffff"/>
            <circle cx="240" cy="110" r="4" fill="#ffd166"/>
            <text x="150" y="180" font-family="'Playfair Display', serif" font-size="16" font-style="italic" font-weight="700" fill="#ffffff" text-anchor="middle">Forever Shining Bright</text>
            <text x="150" y="205" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="700" fill="#fca5bb" text-anchor="middle" letter-spacing="2">PROUDEST SPIDY EVER</text>
          </svg>
        `;

      case 'angel':
        return `
          <svg viewBox="0 0 300 240" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="angelGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#fff0f3"/>
                <stop offset="50%" stop-color="#ffccd5"/>
                <stop offset="100%" stop-color="#ffb3c6"/>
              </linearGradient>
            </defs>
            <rect width="300" height="240" fill="url(#angelGrad)"/>
            <!-- Crown / Halo -->
            <ellipse cx="150" cy="80" rx="36" ry="10" fill="none" stroke="#dfa13d" stroke-width="3" opacity="0.9"/>
            <!-- Birthday Cake Silhouette -->
            <rect x="115" y="120" width="70" height="40" rx="6" fill="#ffffff" stroke="#c92a58" stroke-width="2"/>
            <rect x="125" y="95" width="50" height="26" rx="4" fill="#ffffff" stroke="#c92a58" stroke-width="2"/>
            <!-- Candle -->
            <line x1="150" y1="95" x2="150" y2="82" stroke="#dfa13d" stroke-width="2.5"/>
            <circle cx="150" cy="78" r="3.5" fill="#e84a78"/>
            <text x="150" y="195" font-family="'Playfair Display', serif" font-size="16" font-weight="700" fill="#4a152d" text-anchor="middle">16 DEC 2009 · SWEET 17</text>
            <text x="150" y="215" font-family="'Caveat', cursive" font-size="15" font-weight="700" fill="#c92a58" text-anchor="middle">Happy Birthday Aditi! 👑</text>
          </svg>
        `;

      case 'infinity':
        return `
          <svg viewBox="0 0 300 240" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="infGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#4a152d"/>
                <stop offset="100%" stop-color="#793755"/>
              </linearGradient>
            </defs>
            <rect width="300" height="240" fill="url(#infGrad)"/>
            <!-- Golden Infinity Symbol -->
            <path d="M 120 120 C 100 95 70 95 70 120 C 70 145 100 145 120 120 C 140 95 170 95 170 120 C 170 145 140 145 120 120 Z" 
                  fill="none" stroke="#dfa13d" stroke-width="5" stroke-linecap="round"/>
            <circle cx="120" cy="120" r="5" fill="#ffd166"/>
            <!-- Hearts -->
            <text x="120" y="180" font-family="'Dancing Script', cursive" font-size="22" font-weight="700" fill="#ffd166" text-anchor="middle">Today, Tomorrow & Forever</text>
            <text x="120" y="205" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="800" fill="#fca5bb" text-anchor="middle" letter-spacing="2">UNBROKEN VOW · SPIDY 🕸️❤️</text>
          </svg>
        `;

      case 'sakura':
      default:
        return `
          <svg viewBox="0 0 300 240" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="sakuraGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#fff5f7"/>
                <stop offset="100%" stop-color="#ffd6e0"/>
              </linearGradient>
            </defs>
            <rect width="300" height="240" fill="url(#sakuraGrad)"/>
            <!-- Sakura Branch & Blossom -->
            <path d="M 60 170 Q 120 130 180 150 T 260 120" stroke="#793755" stroke-width="3" stroke-linecap="round" fill="none"/>
            <circle cx="140" cy="130" r="14" fill="#ff758f"/>
            <circle cx="140" cy="130" r="5" fill="#ffd166"/>
            <circle cx="190" cy="140" r="12" fill="#ff4d6d"/>
            <circle cx="190" cy="140" r="4" fill="#ffd166"/>
            <circle cx="100" cy="150" r="10" fill="#ff8fa3"/>
            <text x="150" y="85" font-family="'Playfair Display', serif" font-size="18" font-style="italic" font-weight="700" fill="#4a152d" text-anchor="middle">The Day We First Spoke</text>
            <text x="150" y="110" font-family="'Caveat', cursive" font-size="16" font-weight="600" fill="#e84a78" text-anchor="middle">When our story began ✨</text>
          </svg>
        `;
    }
  }

  // Global fallback handler for inline <img> tag onerror
  window.handlePolaroidFallback = function (imgEl, memoryId) {
    if (!imgEl) return;
    const parentFrame = imgEl.closest('.polaroid-photo-frame');
    if (parentFrame) {
      imgEl.style.display = 'none';
      const fallbackContainer = parentFrame.querySelector('.photo-fallback-art');
      if (fallbackContainer) {
        const mem = MEMORIES_DATA.find(m => m.id === memoryId);
        fallbackContainer.innerHTML = generateFallbackSVG(mem ? mem.fallbackTheme : 'sakura');
      }
    }
  };

  /* ==========================================================================
     4. PERSISTENCE & LOCALSTORAGE
     ========================================================================== */
  function loadProgress() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) {
          flippedIds = new Set(parsed.filter(id => id >= 1 && id <= 8));
        }
      }
    } catch (e) {
      console.warn('Could not read polaroid progress:', e);
      flippedIds = new Set();
    }
  }

  function saveProgress() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(flippedIds)));
    } catch (e) {
      console.warn('Could not save polaroid progress:', e);
    }
  }

  /* ==========================================================================
     5. RENDER POLAROID CARDS COLLAGE
     ========================================================================== */
  const gridEl = document.getElementById('polaroids-grid');
  const countEl = document.getElementById('memories-flipped-count');
  const fillEl = document.getElementById('progress-fill');

  function updateTrackerUI(triggerCelebration = true) {
    const total = MEMORIES_DATA.length; // 8
    const count = flippedIds.size;
    const pct = Math.round((count / total) * 100);

    if (countEl) countEl.textContent = count;
    if (fillEl) fillEl.style.width = pct + '%';

    if (count === total && triggerCelebration) {
      setTimeout(() => {
        audioEngine.playFanfare();
        showToast('All 8 Cherished Memories Unfolded! 💌✨');
      }, 500);
    }
  }

  function renderPolaroidWall() {
    if (!gridEl) return;
    gridEl.innerHTML = '';

    MEMORIES_DATA.forEach(mem => {
      const isFlipped = flippedIds.has(mem.id);
      const card = document.createElement('div');
      card.className = `polaroid-card ${mem.rotationClass}${isFlipped ? ' flipped' : ''}`;
      card.setAttribute('data-id', mem.id);
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `Memory #${mem.id}: ${mem.title}. ${isFlipped ? 'Diary Note side' : 'Photo side'}. Tap to flip.`);

      card.innerHTML = `
        <div class="polaroid-inner">
          <!-- Front Face -->
          <div class="polaroid-face polaroid-front">
            <div class="tape-strip ${mem.tapeClass}" aria-hidden="true"></div>
            
            <div class="polaroid-photo-frame">
              <img class="polaroid-img" src="${mem.imageSrc}" alt="${mem.title}" onerror="window.handlePolaroidFallback(this, ${mem.id})">
              <div class="photo-fallback-art">
                <!-- Fallback SVG populated if image fails -->
              </div>
              <div class="photo-shimmer-glare" aria-hidden="true"></div>
              <button type="button" class="lightbox-btn" aria-label="Zoom photo" title="Zoom in">🔍</button>
            </div>

            <div class="polaroid-caption-area">
              <p class="polaroid-caption">${mem.caption}</p>
              <span class="polaroid-date">${mem.date}</span>
              <span class="tap-hint">Tap to read diary note ↺</span>
            </div>
          </div>

          <!-- Back Face (Diary Note) -->
          <div class="polaroid-face polaroid-back">
            <div class="tape-strip ${mem.tapeClass}" aria-hidden="true"></div>

            <div class="diary-card-inner">
              <span class="diary-tag">MEMO · #${String(mem.id).padStart(2, '0')}</span>
              <h4 class="diary-title">${mem.title}</h4>
              <p class="diary-subtitle">Why this memory stays with me</p>

              <div class="diary-body">
                <p>${mem.diaryText}</p>
              </div>

              <div class="diary-footer">
                <span class="diary-doodle">💌</span>
                <span class="diary-sign">yours spidy 🕸️❤️</span>
              </div>
            </div>
          </div>
        </div>
      `;

      // Tap to Flip
      const handleCardFlip = (e) => {
        // Prevent trigger if clicking modal buttons
        if (e.target.closest('.lightbox-btn')) return;

        audioEngine.playCardFlipSound();
        const currentlyFlipped = card.classList.contains('flipped');

        if (currentlyFlipped) {
          card.classList.remove('flipped');
          flippedIds.delete(mem.id);
        } else {
          card.classList.add('flipped');
          flippedIds.add(mem.id);

          const rect = card.getBoundingClientRect();
          const clickX = e.clientX || rect.left + rect.width / 2;
          const clickY = e.clientY || rect.top + rect.height / 2;
          spawnPetalsAt(clickX, clickY, 8);
        }

        saveProgress();
        updateTrackerUI(true);
      };

      // Zoom button listener
      const zoomBtn = card.querySelector('.lightbox-btn');
      if (zoomBtn) {
        zoomBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          openLightbox(mem);
        });
      }

      // Double-click to open zoom lightbox
      card.addEventListener('dblclick', () => {
        openLightbox(mem);
      });

      card.addEventListener('click', handleCardFlip);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardFlip(e);
        }
      });

      gridEl.appendChild(card);
    });

    // Graceful fallback check: only if an image has finished loading and is broken (naturalWidth === 0)
    gridEl.querySelectorAll('.polaroid-img').forEach(img => {
      if (img.complete && img.naturalWidth === 0) {
        const id = parseInt(img.closest('.polaroid-card').getAttribute('data-id'), 10);
        window.handlePolaroidFallback(img, id);
      }
    });
  }

  /* ==========================================================================
     6. QUICK CONTROLS: FLIP ALL & RESET ALL
     ========================================================================== */
  const btnFlipAll = document.getElementById('btn-flip-all');
  const btnResetFront = document.getElementById('btn-reset-front');

  if (btnFlipAll) {
    btnFlipAll.addEventListener('click', () => {
      audioEngine.init();
      audioEngine.playCardFlipSound();

      let delay = 0;
      MEMORIES_DATA.forEach((mem) => {
        setTimeout(() => {
          const card = gridEl.querySelector(`.polaroid-card[data-id="${mem.id}"]`);
          if (card) card.classList.add('flipped');
          flippedIds.add(mem.id);
          updateTrackerUI(false);
        }, delay);
        delay += 90;
      });

      setTimeout(() => {
        saveProgress();
        updateTrackerUI(true);
        showToast("All Polaroid diary notes revealed! 💌");
      }, delay + 100);
    });
  }

  if (btnResetFront) {
    btnResetFront.addEventListener('click', () => {
      audioEngine.init();
      audioEngine.playCardFlipSound();

      let delay = 0;
      MEMORIES_DATA.forEach((mem) => {
        setTimeout(() => {
          const card = gridEl.querySelector(`.polaroid-card[data-id="${mem.id}"]`);
          if (card) card.classList.remove('flipped');
          flippedIds.delete(mem.id);
          updateTrackerUI(false);
        }, delay);
        delay += 80;
      });

      setTimeout(() => {
        saveProgress();
        updateTrackerUI(false);
        showToast("Returned all Polaroids to front photo view 📸");
      }, delay + 100);
    });
  }

  /* ==========================================================================
     7. HIGH-RESOLUTION LIGHTBOX ZOOM MODAL
     ========================================================================== */
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxImgContainer = document.getElementById('lightbox-img-container');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDate = document.getElementById('lightbox-date');
  const lightboxDiaryText = document.getElementById('lightbox-diary-text');
  const lightboxFlipBtn = document.getElementById('lightbox-flip-btn');

  let activeLightboxMemory = null;

  function openLightbox(mem) {
    if (!lightboxModal) return;
    activeLightboxMemory = mem;

    if (lightboxTitle) lightboxTitle.textContent = mem.title;
    if (lightboxDate) lightboxDate.textContent = mem.date;
    if (lightboxDiaryText) lightboxDiaryText.innerHTML = `<p>${mem.diaryText}</p>`;

    // Display photo with graceful fallback
    if (lightboxImgContainer) {
      lightboxImgContainer.innerHTML = `
        <img class="lightbox-img" src="${mem.imageSrc}" alt="${mem.title}">
      `;
      const img = lightboxImgContainer.querySelector('img');
      if (img) {
        img.onerror = () => {
          lightboxImgContainer.innerHTML = generateFallbackSVG(mem.fallbackTheme);
        };
      }
    }

    lightboxModal.classList.add('open');
    audioEngine.playCardFlipSound();
  }

  function closeLightbox() {
    if (lightboxModal) {
      lightboxModal.classList.remove('open');
    }
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  if (lightboxFlipBtn) {
    lightboxFlipBtn.addEventListener('click', () => {
      if (activeLightboxMemory) {
        const card = gridEl.querySelector(`.polaroid-card[data-id="${activeLightboxMemory.id}"]`);
        if (card) {
          card.click();
        }
      }
      closeLightbox();
    });
  }

  /* ==========================================================================
     8. CELEBRATION PARTICLES & TOAST
     ========================================================================== */
  function spawnPetalsAt(x, y, count = 8) {
    const icons = ['🌸', '💖', '✨', '📸', '💌', '💕', '⭐'];

    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'flying-petal';
      p.textContent = icons[Math.floor(Math.random() * icons.length)];

      const tx = (Math.random() - 0.5) * 140;
      const rot = (Math.random() - 0.5) * 60;
      p.style.setProperty('--tx', `${tx}px`);
      p.style.setProperty('--rot', `${rot}deg`);
      p.style.left = `${x}px`;
      p.style.top = `${y}px`;

      document.body.appendChild(p);

      setTimeout(() => {
        if (p.parentNode) p.parentNode.removeChild(p);
      }, 1800);
    }
  }

  function showToast(message) {
    let toast = document.querySelector('.toast-pill');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast-pill';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  /* ==========================================================================
     9. AUDIO DOCK TOGGLE
     ========================================================================== */
  const soundBtn = document.getElementById('sound-btn');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      isSoundEnabled = !isSoundEnabled;
      const soundText = soundBtn.querySelector('.sound-text');
      const soundIcon = soundBtn.querySelector('.sound-icon');

      if (isSoundEnabled) {
        soundBtn.classList.remove('muted');
        if (soundText) soundText.textContent = 'Sound Effects ON';
        if (soundIcon) soundIcon.textContent = '🎵';
        audioEngine.playCardFlipSound();
        showToast('Flip Sounds Enabled 🎶');
      } else {
        soundBtn.classList.add('muted');
        if (soundText) soundText.textContent = 'Sound Muted';
        if (soundIcon) soundIcon.textContent = '🔇';
        showToast('Sound Muted');
      }
    });
  }

  /* ==========================================================================
     10. AMBIENT BACKGROUND CANVAS (FLOATING FILM STRIPS & ROSE PETALS)
     ========================================================================== */
  function initPolaroidCanvas() {
    const canvas = document.getElementById('polaroid-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particlesCount = 42;
    const particles = [];

    for (let i = 0; i < particlesCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 8 + 6,
        speedX: Math.random() * 0.7 - 0.2,
        speedY: Math.random() * 0.8 + 0.35,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.03,
        opacity: Math.random() * 0.45 + 0.2,
        type: Math.random() > 0.45 ? 'petal' : 'spore',
        oscillation: Math.random() * Math.PI * 2
      });
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      const wind = Math.sin(Date.now() * 0.0006) * 0.5;

      particles.forEach(p => {
        p.oscillation += 0.02;
        p.x += p.speedX + Math.sin(p.oscillation) * 0.5 + wind;
        p.y += p.speedY;
        p.rot += p.rotSpeed;

        if (p.y > height + 25) {
          p.y = -25;
          p.x = Math.random() * width;
        }
        if (p.x > width + 25) p.x = -25;
        if (p.x < -25) p.x = width + 25;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = p.opacity;

        if (p.type === 'petal') {
          // 3D tumbling pink sakura / rose petal
          ctx.scale(Math.cos(p.rot), 1);
          ctx.fillStyle = '#fca5bb';
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(p.size / 2, -p.size, p.size, -p.size / 2, 0, p.size);
          ctx.bezierCurveTo(-p.size, -p.size / 2, -p.size / 2, -p.size, 0, 0);
          ctx.fill();
        } else {
          // Golden luminous spore
          ctx.fillStyle = '#dfa13d';
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 3.5, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }

  /* ==========================================================================
     11. INITIALIZATION ON DOM READY
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    loadProgress();
    renderPolaroidWall();
    updateTrackerUI(false);
    initPolaroidCanvas();

    // First user gesture initializes audio context smoothly
    const unlockAudio = () => {
      audioEngine.init();
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };
    window.addEventListener('pointerdown', unlockAudio, { passive: true });
    window.addEventListener('keydown', unlockAudio, { passive: true });
  });

})();
