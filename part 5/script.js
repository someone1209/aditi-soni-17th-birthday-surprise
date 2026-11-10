/**
 * PART 05 — BLOOMING FLOWER GARDEN
 * For Aditi Soni · Turning 17 (DOB: 16 Dec 2009)
 * From: yours spidy 🕸️❤️
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. FLOWER BOTANICAL DATA (16 UNIQUE BLOOMS)
     ========================================================================== */
  const FLOWERS_DATA = [
    {
      id: 1,
      name: "The First Rose",
      species: "English Rose · Eternal Devotion",
      icon: "🌹",
      tone: 261.63, // C4
      petalColor1: "#ff4d6d",
      petalColor2: "#c9184a",
      centerColor: "#ffd166",
      quote: "“You made my whole world bloom the moment you walked into my life.”",
      hinglish: "Tera milna mere liye kisi blessing se kam nahi tha, Aditi. Har ek din tere saath ek pyari si subah jaisa lagta hai.",
      svgType: "rose"
    },
    {
      id: 2,
      name: "Morning Sunlight",
      species: "Golden Sunflower · Pure Warmth",
      icon: "🌻",
      tone: 293.66, // D4
      petalColor1: "#ffb703",
      petalColor2: "#fb8500",
      centerColor: "#582f0e",
      quote: "“Whenever I look at you, everything dark in my life simply melts away.”",
      hinglish: "Jab bhi tu smile karti hai na babyyygurlll, mera pura mood ek second mein theek ho jata hai. Teri hasi meri favorite cheez hai.",
      svgType: "sunflower"
    },
    {
      id: 3,
      name: "Pure Tenderness",
      species: "Blush Tulip · Sweetest Affection",
      icon: "🌷",
      tone: 329.63, // E4
      petalColor1: "#ff758f",
      petalColor2: "#ff4d6d",
      centerColor: "#ffe5ec",
      quote: "“Gentle like spring rain, you brought peace to my chaotic world.”",
      hinglish: "Tere aane se meri zindagi mein wo sukoon aaya jo maine kabhi imagine bhi nahi kiya tha. You are my safe space.",
      svgType: "tulip"
    },
    {
      id: 4,
      name: "Innocent Whisper",
      species: "Silver Daisy · Unconditional Love",
      icon: "🌼",
      tone: 349.23, // F4
      petalColor1: "#ffffff",
      petalColor2: "#f8f9fa",
      centerColor: "#ffbe0b",
      quote: "“Loving you is the simplest and truest truth my heart has ever known.”",
      hinglish: "Bina kisi shart ke, bina kisi expectation ke... bas tujhe pyaar karna meri aadat aur mera sabse pyara haq hai.",
      svgType: "daisy"
    },
    {
      id: 5,
      name: "Sacred Serenity",
      species: "Royal Lotus · Everlasting Grace",
      icon: "🪷",
      tone: 392.00, // G4
      petalColor1: "#ffb3c6",
      petalColor2: "#fb6f92",
      centerColor: "#ffeedd",
      quote: "“Rising pure and divine, you are my prayers answered in flesh and soul.”",
      hinglish: "Tu wo ek insaan hai jiske liye main har roz dua mangta hoon. You are truly divine to me, Aditi.",
      svgType: "lotus"
    },
    {
      id: 6,
      name: "Spring Sakura",
      species: "Cherry Blossom · Precious Moments",
      icon: "🌸",
      tone: 440.00, // A4
      petalColor1: "#ffccd5",
      petalColor2: "#ff758f",
      centerColor: "#ff4d6d",
      quote: "“Every fleeting second with you feels like poetry written across pink skies.”",
      hinglish: "Tere saath bitaya har ek lamha mere dil mein hamesha ke liye freeze ho chuka hai. Every moment is pure gold.",
      svgType: "cherry"
    },
    {
      id: 7,
      name: "Exotic Radiance",
      species: "Velvet Orchid · Rare Beauty",
      icon: "🌺",
      tone: 493.88, // B4
      petalColor1: "#c77dff",
      petalColor2: "#9d4edd",
      centerColor: "#ffd166",
      quote: "“One of a kind, irreplaceable, and breathtakingly gorgeous—that is you.”",
      hinglish: "Tere jaisa pure duniya mein koi nahi ho sakta. You are so genuinely unique and precious to me.",
      svgType: "orchid"
    },
    {
      id: 8,
      name: "Sweet Calm",
      species: "Wild Lavender · Peaceful Comfort",
      icon: "🪻",
      tone: 523.25, // C5
      petalColor1: "#b8b8ff",
      petalColor2: "#9381ff",
      centerColor: "#e8e8e4",
      quote: "“In your gentle arms and soft voice, I found the home I searched for.”",
      hinglish: "Tujhse baat karke din bhar ki sari tension gayab ho jati hai. Tera voice note hi mere liye sabse bada sukoon hai.",
      svgType: "lavender"
    },
    {
      id: 9,
      name: "Blushing Joy",
      species: "Silk Peony · Prosperity & Happiness",
      icon: "💮",
      tone: 587.33, // D5
      petalColor1: "#ff8fa3",
      petalColor2: "#e01e5a",
      centerColor: "#ffe5d9",
      quote: "“A bouquet of laughs, a lifetime of giggles, and a heart full of love.”",
      hinglish: "Tere 17th birthday par sirf yahi wish hai ki teri zindagi hamesha aise hi khushiyon se mehke. Always stay this bubbly!",
      svgType: "peony"
    },
    {
      id: 10,
      name: "Golden Promise",
      species: "Sun Marigold · Eternal Bond",
      icon: "🏵️",
      tone: 659.25, // E5
      petalColor1: "#fca311",
      petalColor2: "#e85d04",
      centerColor: "#6f1d1b",
      quote: "“No matter where life takes us, I promise to walk right beside your heart.”",
      hinglish: "Chahe raste jaise bhi hon, mera haath hamesha tere haath mein rahega. That's my forever promise, babyyygurlll.",
      svgType: "marigold"
    },
    {
      id: 11,
      name: "Crimson Royalty",
      species: "Winter Camellia · Steadfast Love",
      icon: "🥀",
      tone: 698.46, // F5
      petalColor1: "#e63946",
      petalColor2: "#9b2226",
      centerColor: "#ffd166",
      quote: "“Even in freezing winds, true love stands brave, bright, and unbroken.”",
      hinglish: "Kuch bhi badal jaye, meri feelings tere liye kabhi kam nahi hongi. Har janam mein I will choose only you.",
      svgType: "camellia"
    },
    {
      id: 12,
      name: "Midnight Fragrance",
      species: "Star Jasmine · Sweet Memories",
      icon: "⭐",
      tone: 783.99, // G5
      petalColor1: "#fefae0",
      petalColor2: "#e9edc9",
      centerColor: "#dda15e",
      quote: "“The little late-night conversations with you are my treasure chest.”",
      hinglish: "Wo der raat tak bina thake baatein karna, silly jokes pe hasna... those are my favorite moments forever.",
      svgType: "jasmine"
    },
    {
      id: 13,
      name: "Passionate Spark",
      species: "Scarlet Hibiscus · Vibrant Heart",
      icon: "🪴",
      tone: 880.00, // A5
      petalColor1: "#d90429",
      petalColor2: "#ef233c",
      centerColor: "#ffb703",
      quote: "“Every beat of my chest carries your name like a rhythm of life.”",
      hinglish: "Har heartbeat kehti hai ki tu kitni special hai. You are the fire and the song inside my heart.",
      svgType: "hibiscus"
    },
    {
      id: 14,
      name: "Celestial Blue",
      species: "Forget-Me-Not · Memories Engraved",
      icon: "💠",
      tone: 987.77, // B5
      petalColor1: "#90e0ef",
      petalColor2: "#0077b6",
      centerColor: "#ffd166",
      quote: "“Engraved in my soul, your smile will never fade from my eyes.”",
      hinglish: "16 December 2009 ko sabse pyara angel is duniya mein aaya tha. I can never, ever forget this day.",
      svgType: "forgetmenot"
    },
    {
      id: 15,
      name: "Sweetest Grace",
      species: "Pink Carnation · Mother-like Warmth",
      icon: "💐",
      tone: 1046.50, // C6
      petalColor1: "#ffb4a2",
      petalColor2: "#e5989b",
      centerColor: "#b5838d",
      quote: "“You care so deeply, love so purely, and make me want to be my best self.”",
      hinglish: "Teri care aur tera pyaar mujhe roz ek behtar insaan banata hai. You mean everything to me, Aditi.",
      svgType: "carnation"
    },
    {
      id: 16,
      name: "The Crown Lily",
      species: "Golden Lily · Majesty & Forever",
      icon: "👑",
      tone: 1174.66, // D6
      petalColor1: "#ffd166",
      petalColor2: "#e76f51",
      centerColor: "#8338ec",
      quote: "“You are my queen today, tomorrow, this lifetime, and forever after.”",
      hinglish: "Happy 17th Birthday my love! Aaj, kal aur hamesha... I am all yours. Signed with all my heart, yours spidy 🕸️❤️",
      svgType: "lily"
    }
  ];

  /* Storage Key */
  const STORAGE_KEY = 'aditi_blooming_garden_unlocked_ids';

  /* State */
  let unlockedIds = new Set();
  let isSoundEnabled = true;

  /* ==========================================================================
     2. PURE WEB AUDIO SYNTHESIZER (KALIMBA & CELEBRATION CHIMES)
     ========================================================================== */
  class KalimbaAudio {
    constructor() {
      this.ctx = null;
      this.isReady = false;
    }

    init() {
      if (!this.ctx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
          this.ctx = new AudioContextClass();
          this.isReady = true;
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    playKalimbaTone(freq, timeOffset = 0) {
      if (!isSoundEnabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime + timeOffset;

      // Master gain for this note
      const noteGain = this.ctx.createGain();
      noteGain.connect(this.ctx.destination);

      // Lowpass filter to simulate wood soundboard resonance
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2600, now);
      filter.Q.setValueAtTime(3.5, now);
      filter.connect(noteGain);

      // 1. Fundamental sine wave (the main chime body)
      const osc1 = this.ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(freq, now);

      const oscGain1 = this.ctx.createGain();
      oscGain1.gain.setValueAtTime(0.001, now);
      oscGain1.gain.exponentialRampToValueAtTime(0.45, now + 0.012);
      oscGain1.gain.exponentialRampToValueAtTime(0.0001, now + 1.15);

      osc1.connect(oscGain1);
      oscGain1.connect(filter);

      // 2. High metallic tine overtone (~2.756x fundamental)
      const osc2 = this.ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 2.756, now);

      const oscGain2 = this.ctx.createGain();
      oscGain2.gain.setValueAtTime(0.001, now);
      oscGain2.gain.exponentialRampToValueAtTime(0.18, now + 0.006);
      oscGain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.22); // quick metallic ping decay

      osc2.connect(oscGain2);
      oscGain2.connect(filter);

      // Start & stop oscillators
      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 1.2);
      osc2.stop(now + 0.3);
    }

    playBloomArpeggio(freq) {
      if (!isSoundEnabled) return;
      this.playKalimbaTone(freq, 0);
      this.playKalimbaTone(freq * 1.5, 0.12);
    }

    playCelebrationFanfare() {
      if (!isSoundEnabled) return;
      this.init();
      if (!this.ctx) return;

      // Joyful cascading Kalimba arpeggio chord (C Major 9 to F Major 7)
      const notes = [
        261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50, 1318.51
      ];

      notes.forEach((freq, index) => {
        this.playKalimbaTone(freq, index * 0.11);
      });

      // Secondary triumphant harmonic burst
      setTimeout(() => {
        [523.25, 659.25, 783.99, 1046.50].forEach((freq) => {
          this.playKalimbaTone(freq, 0);
        });
      }, 950);
    }
  }

  const audioEngine = new KalimbaAudio();

  /* ==========================================================================
     3. SVG FLOWER GENERATOR (BEAUTIFUL BUD + FULL BLOOM LAYERS)
     ========================================================================== */
  function generateFlowerSVG(flower) {
    const p1 = flower.petalColor1;
    const p2 = flower.petalColor2;
    const center = flower.centerColor;
    const type = flower.svgType;

    let bloomInner = '';

    switch (type) {
      case 'rose':
        bloomInner = `
          <!-- Rose Spiral Blossom -->
          <circle cx="50" cy="45" r="24" fill="${p2}" opacity="0.9" />
          <path d="M 50 25 C 65 25 72 38 72 45 C 72 56 60 65 50 65 C 38 65 28 56 28 45 C 28 35 38 25 50 25 Z" fill="${p1}" />
          <path d="M 42 34 C 55 28 64 36 62 48 C 60 55 48 58 42 52 C 37 47 38 38 42 34 Z" fill="${p2}" />
          <path d="M 46 39 C 52 35 58 40 56 46 C 54 50 48 52 46 48 C 44 45 44 41 46 39 Z" fill="${p1}" />
          <circle cx="50" cy="45" r="4.5" fill="${center}" />
        `;
        break;

      case 'sunflower':
        bloomInner = `
          <!-- Golden Sunflower Petals -->
          <g>
            ${Array.from({ length: 12 }).map((_, i) => {
              const rot = i * 30;
              return `<ellipse cx="50" cy="22" rx="5" ry="14" fill="${p1}" transform="rotate(${rot} 50 45)" />`;
            }).join('')}
            ${Array.from({ length: 12 }).map((_, i) => {
              const rot = i * 30 + 15;
              return `<ellipse cx="50" cy="26" rx="4" ry="10" fill="${p2}" transform="rotate(${rot} 50 45)" />`;
            }).join('')}
            <circle cx="50" cy="45" r="14" fill="${center}" stroke="#402008" stroke-width="1.5" />
            <circle cx="50" cy="45" r="9" fill="#2d1305" opacity="0.6" stroke-dasharray="2 2" stroke="#e0a96d" />
          </g>
        `;
        break;

      case 'tulip':
        bloomInner = `
          <!-- Elegant Cup Tulip -->
          <path d="M 32 55 C 26 38 34 25 45 28 C 48 35 48 45 48 55 Z" fill="${p2}" />
          <path d="M 68 55 C 74 38 66 25 55 28 C 52 35 52 45 52 55 Z" fill="${p2}" />
          <path d="M 38 58 C 30 42 42 22 50 20 C 58 22 70 42 62 58 C 58 64 42 64 38 58 Z" fill="${p1}" />
          <path d="M 45 55 C 44 38 50 26 50 26 C 50 26 56 38 55 55 Z" fill="${center}" opacity="0.4" />
        `;
        break;

      case 'daisy':
        bloomInner = `
          <!-- Radiant Daisy -->
          <g>
            ${Array.from({ length: 16 }).map((_, i) => {
              const rot = i * 22.5;
              return `<ellipse cx="50" cy="21" rx="4" ry="15" fill="${p1}" stroke="#e9ecef" stroke-width="0.75" transform="rotate(${rot} 50 45)" />`;
            }).join('')}
            <circle cx="50" cy="45" r="11" fill="${center}" stroke="#e09f3e" stroke-width="1" />
            <circle cx="50" cy="45" r="7" fill="#fff3b0" opacity="0.7" />
          </g>
        `;
        break;

      case 'lotus':
        bloomInner = `
          <!-- Sacred Lotus -->
          <path d="M 50 18 C 42 30 38 46 50 56 C 62 46 58 30 50 18 Z" fill="${p1}" />
          <path d="M 30 30 C 28 42 38 54 50 56 C 42 48 36 38 30 30 Z" fill="${p2}" />
          <path d="M 70 30 C 72 42 62 54 50 56 C 58 48 64 38 70 30 Z" fill="${p2}" />
          <path d="M 22 40 C 26 52 38 58 50 58 C 36 56 26 48 22 40 Z" fill="${p1}" opacity="0.9" />
          <path d="M 78 40 C 74 52 62 58 50 58 C 64 56 74 48 78 40 Z" fill="${p1}" opacity="0.9" />
          <circle cx="50" cy="46" r="6" fill="${center}" />
        `;
        break;

      case 'cherry':
        bloomInner = `
          <!-- 5-Petal Sakura Cherry Blossom -->
          <g>
            ${Array.from({ length: 5 }).map((_, i) => {
              const rot = i * 72;
              return `
                <g transform="rotate(${rot} 50 45)">
                  <path d="M 50 45 C 40 35 42 20 47 18 C 50 21 50 21 53 18 C 58 20 60 35 50 45 Z" fill="${p1}" stroke="${p2}" stroke-width="0.8" />
                </g>
              `;
            }).join('')}
            <circle cx="50" cy="45" r="7" fill="${p2}" />
            <circle cx="50" cy="45" r="3.5" fill="${center}" />
          </g>
        `;
        break;

      case 'orchid':
        bloomInner = `
          <!-- Velvet Orchid -->
          <ellipse cx="50" cy="27" rx="9" ry="16" fill="${p1}" />
          <ellipse cx="32" cy="44" rx="14" ry="9" fill="${p2}" transform="rotate(-15 32 44)" />
          <ellipse cx="68" cy="44" rx="14" ry="9" fill="${p2}" transform="rotate(15 68 44)" />
          <!-- Labellum / Lip -->
          <path d="M 44 45 C 40 56 46 63 50 63 C 54 63 60 56 56 45 Z" fill="${center}" stroke="${p2}" stroke-width="1.2" />
          <circle cx="50" cy="46" r="3" fill="#ffffff" />
        `;
        break;

      case 'lavender':
        bloomInner = `
          <!-- Lavender Blossom Spike -->
          <path d="M 50 20 L 50 60" stroke="#7b2cbf" stroke-width="2" />
          ${Array.from({ length: 8 }).map((_, i) => {
            const y = 22 + i * 4.5;
            return `
              <circle cx="45" cy="${y}" r="4.5" fill="${p1}" />
              <circle cx="55" cy="${y}" r="4.5" fill="${p2}" />
            `;
          }).join('')}
          <circle cx="50" cy="18" r="4" fill="${center}" />
        `;
        break;

      case 'peony':
        bloomInner = `
          <!-- Fluffy Peony -->
          <circle cx="50" cy="45" r="23" fill="${p2}" opacity="0.85" />
          ${Array.from({ length: 8 }).map((_, i) => {
            const rot = i * 45;
            return `<ellipse cx="50" cy="30" rx="9" ry="14" fill="${p1}" opacity="0.9" transform="rotate(${rot} 50 45)" />`;
          }).join('')}
          <circle cx="50" cy="45" r="11" fill="${p2}" />
          <circle cx="50" cy="45" r="6" fill="${center}" />
        `;
        break;

      case 'marigold':
        bloomInner = `
          <!-- Ruffled Marigold -->
          <circle cx="50" cy="45" r="22" fill="${p2}" />
          ${Array.from({ length: 14 }).map((_, i) => {
            const rot = i * (360 / 14);
            return `<circle cx="50" cy="28" r="7" fill="${p1}" transform="rotate(${rot} 50 45)" />`;
          }).join('')}
          <circle cx="50" cy="45" r="10" fill="${center}" />
        `;
        break;

      case 'camellia':
        bloomInner = `
          <!-- Symmetrical Camellia -->
          <g>
            ${Array.from({ length: 6 }).map((_, i) => {
              const rot = i * 60;
              return `<circle cx="50" cy="27" r="12" fill="${p2}" transform="rotate(${rot} 50 45)" />`;
            }).join('')}
            ${Array.from({ length: 6 }).map((_, i) => {
              const rot = i * 60 + 30;
              return `<circle cx="50" cy="32" r="10" fill="${p1}" transform="rotate(${rot} 50 45)" />`;
            }).join('')}
            <circle cx="50" cy="45" r="7" fill="${center}" />
          </g>
        `;
        break;

      case 'jasmine':
        bloomInner = `
          <!-- Star Jasmine -->
          <g>
            ${Array.from({ length: 5 }).map((_, i) => {
              const rot = i * 72;
              return `
                <path d="M 50 45 C 44 32 46 16 50 14 C 54 16 56 32 50 45 Z" fill="${p1}" stroke="${p2}" stroke-width="0.8" transform="rotate(${rot} 50 45)" />
              `;
            }).join('')}
            <circle cx="50" cy="45" r="5" fill="${center}" />
          </g>
        `;
        break;

      case 'hibiscus':
        bloomInner = `
          <!-- Flared Hibiscus -->
          <g>
            ${Array.from({ length: 5 }).map((_, i) => {
              const rot = i * 72;
              return `
                <path d="M 50 45 C 32 30 36 15 50 16 C 64 15 68 30 50 45 Z" fill="${p1}" opacity="0.95" transform="rotate(${rot} 50 45)" />
              `;
            }).join('')}
            <circle cx="50" cy="45" r="7" fill="${p2}" />
            <!-- Long Stamen Column -->
            <path d="M 50 45 Q 52 30 58 20" stroke="${center}" stroke-width="2.5" stroke-linecap="round" fill="none" />
            <circle cx="58" cy="20" r="3.5" fill="#ffd166" />
          </g>
        `;
        break;

      case 'forgetmenot':
        bloomInner = `
          <!-- Forget-Me-Not -->
          <g>
            ${Array.from({ length: 5 }).map((_, i) => {
              const rot = i * 72;
              return `<circle cx="50" cy="26" r="10" fill="${p1}" stroke="${p2}" stroke-width="1" transform="rotate(${rot} 50 45)" />`;
            }).join('')}
            <circle cx="50" cy="45" r="7" fill="#ffffff" />
            <circle cx="50" cy="45" r="4.5" fill="${center}" />
          </g>
        `;
        break;

      case 'carnation':
        bloomInner = `
          <!-- Ruffled Carnation -->
          <circle cx="50" cy="45" r="22" fill="${p2}" />
          ${Array.from({ length: 10 }).map((_, i) => {
            const rot = i * 36;
            return `
              <path d="M 50 45 L 42 24 L 46 22 L 50 25 L 54 22 L 58 24 Z" fill="${p1}" transform="rotate(${rot} 50 45)" />
            `;
          }).join('')}
          <circle cx="50" cy="45" r="8" fill="${center}" />
        `;
        break;

      case 'lily':
      default:
        bloomInner = `
          <!-- Royal Golden Lily -->
          <g>
            ${Array.from({ length: 6 }).map((_, i) => {
              const rot = i * 60;
              return `
                <path d="M 50 45 C 38 30 40 12 50 10 C 60 12 62 30 50 45 Z" fill="${p1}" stroke="${p2}" stroke-width="1" transform="rotate(${rot} 50 45)" />
              `;
            }).join('')}
            <circle cx="50" cy="45" r="6" fill="${center}" />
            <path d="M 50 45 L 48 32 M 50 45 L 52 32 M 50 45 L 50 28" stroke="${p2}" stroke-width="1.5" stroke-linecap="round" />
          </g>
        `;
        break;
    }

    return `
      <svg class="flower-svg" viewBox="0 0 100 100" aria-hidden="true">
        <!-- Natural Stem -->
        <path class="stem-path" d="M 50 48 Q 47 70 50 96" />
        
        <!-- Organic Leaves -->
        <path class="leaf-shape" d="M 48 68 C 36 65 30 72 34 80 C 40 82 46 76 48 72 Z" />
        <path class="leaf-shape" d="M 51 77 C 62 74 68 80 64 88 C 58 90 52 84 51 80 Z" />

        <!-- Closed Bud State Layer -->
        <g class="bud-group">
          <!-- Green Sepals wrapping tight bud -->
          <path d="M 50 34 C 43 40 43 54 50 56 C 57 54 57 40 50 34 Z" fill="${p1}" opacity="0.8" />
          <path d="M 46 42 C 40 46 44 56 50 58 C 47 52 45 46 46 42 Z" fill="#3d8b52" />
          <path d="M 54 42 C 60 46 56 56 50 58 C 53 52 55 46 54 42 Z" fill="#3d8b52" />
          <path d="M 50 36 C 47 43 48 56 50 58 C 52 56 53 43 50 36 Z" fill="#2d6a4f" opacity="0.9" />
          <!-- Gentle Sparkle on Bud -->
          <circle cx="50" cy="34" r="1.5" fill="#ffd166" />
        </g>

        <!-- Bloomed Blossom State Layer -->
        <g class="bloom-group">
          ${bloomInner}
        </g>
      </svg>
    `;
  }

  /* ==========================================================================
     4. PERSISTENCE & LOCALSTORAGE MANAGEMENT
     ========================================================================== */
  function loadProgress() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const arr = JSON.parse(saved);
        if (Array.isArray(arr)) {
          unlockedIds = new Set(arr.filter(id => id >= 1 && id <= 16));
        }
      }
    } catch (e) {
      console.warn('Could not read from localStorage:', e);
      unlockedIds = new Set();
    }
  }

  function saveProgress() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(unlockedIds)));
    } catch (e) {
      console.warn('Could not save to localStorage:', e);
    }
  }

  /* ==========================================================================
     5. UI UPDATERS (PROGRESS BAR, MINI PREVIEW, CARD STATES)
     ========================================================================== */
  const countEl = document.getElementById('blooms-unlocked-count');
  const fillEl = document.getElementById('progress-fill');
  const previewEl = document.getElementById('mini-bouquet-preview');
  const gridEl = document.getElementById('flowers-grid');

  function updateProgressUI(triggerCelebration = true) {
    const total = FLOWERS_DATA.length; // 16
    const count = unlockedIds.size;
    const pct = Math.min(100, Math.round((count / total) * 100));

    if (countEl) countEl.textContent = count;
    if (fillEl) fillEl.style.width = pct + '%';

    // Update Mini Bouquet Preview
    if (previewEl) {
      if (count === 0) {
        previewEl.innerHTML = '<span class="bouquet-placeholder-text">Your basket is waiting for the first blossom... Tap any bud below!</span>';
      } else {
        const miniIconsHTML = Array.from(unlockedIds)
          .sort((a, b) => a - b)
          .map(id => {
            const fl = FLOWERS_DATA.find(f => f.id === id);
            return `<span class="mini-bloom-icon" title="${fl ? fl.name : ''}">${fl ? fl.icon : '🌸'}</span>`;
          })
          .join('');
        previewEl.innerHTML = miniIconsHTML;
      }
    }

    // Check for Master Bouquet Achievement Completion
    if (count === total && triggerCelebration) {
      setTimeout(() => {
        showMasterCelebration();
      }, 650);
    }
  }

  /* ==========================================================================
     6. FLYING PARTICLES & HEARTS EFFECT (TWICE THE ANIMATION)
     ========================================================================== */
  function spawnHeartsAndSparksAt(x, y, count = 14) {
    const icons = ['❤️', '💖', '✨', '🌸', '💐', '💕', '⭐', '🌺', '🌷', '🏵️'];
    for (let i = 0; i < count; i++) {
      if (Math.random() > 0.35) {
        // Floating emoji particle
        const heart = document.createElement('div');
        heart.className = 'flying-heart';
        heart.textContent = icons[Math.floor(Math.random() * icons.length)];

        const tx = (Math.random() - 0.5) * 140;
        const rot = (Math.random() - 0.5) * 80;
        heart.style.setProperty('--tx', `${tx}px`);
        heart.style.setProperty('--rot', `${rot}deg`);
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;

        document.body.appendChild(heart);

        setTimeout(() => {
          if (heart.parentNode) heart.parentNode.removeChild(heart);
        }, 1800);
      } else {
        // Shimmering stardust spark
        const spark = document.createElement('div');
        spark.className = 'stardust-spark';
        const tx = (Math.random() - 0.5) * 130;
        const ty = -(Math.random() * 90 + 30);
        spark.style.setProperty('--tx', `${tx}px`);
        spark.style.setProperty('--ty', `${ty}px`);
        spark.style.left = `${x}px`;
        spark.style.top = `${y}px`;

        document.body.appendChild(spark);

        setTimeout(() => {
          if (spark.parentNode) spark.parentNode.removeChild(spark);
        }, 1400);
      }
    }
  }

  // Alias for backward compatibility
  function spawnHeartsAt(x, y, count = 14) {
    spawnHeartsAndSparksAt(x, y, count);
  }

  /* Toast Notification */
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
     7. FLOWER NOTE MODAL LOGIC
     ========================================================================== */
  const flowerModal = document.getElementById('flower-modal');
  const flowerModalClose = document.getElementById('flower-modal-close');
  const modalIcon = document.getElementById('modal-flower-icon');
  const modalNum = document.getElementById('modal-flower-number');
  const modalTitle = document.getElementById('modal-flower-title');
  const modalSpecies = document.getElementById('modal-flower-species');
  const modalQuote = document.getElementById('modal-quote');
  const modalHinglish = document.getElementById('modal-hinglish');
  const modalHeartBtn = document.getElementById('modal-heart-btn');

  function openFlowerModal(flower) {
    if (!flowerModal) return;

    if (modalIcon) modalIcon.textContent = flower.icon;
    if (modalNum) modalNum.textContent = `BLOOM · #${String(flower.id).padStart(2, '0')}`;
    if (modalTitle) modalTitle.textContent = flower.name;
    if (modalSpecies) modalSpecies.textContent = flower.species;
    if (modalQuote) modalQuote.textContent = flower.quote;
    if (modalHinglish) modalHinglish.textContent = flower.hinglish;

    flowerModal.classList.add('open');
  }

  function closeFlowerModal() {
    if (flowerModal) {
      flowerModal.classList.remove('open');
    }
  }

  if (flowerModalClose) {
    flowerModalClose.addEventListener('click', closeFlowerModal);
  }

  if (flowerModal) {
    flowerModal.addEventListener('click', (e) => {
      if (e.target === flowerModal) closeFlowerModal();
    });
  }

  if (modalHeartBtn) {
    modalHeartBtn.addEventListener('click', (e) => {
      const rect = modalHeartBtn.getBoundingClientRect();
      spawnHeartsAt(rect.left + rect.width / 2, rect.top, 8);
      audioEngine.playKalimbaTone(880);
      showToast('Cherished in your heart forever 💝');
      setTimeout(closeFlowerModal, 600);
    });
  }

  /* ==========================================================================
     8. MASTER BOUQUET CELEBRATION MODAL & CONFETTI
     ========================================================================== */
  const masterModal = document.getElementById('master-celebration-modal');
  const masterClose = document.getElementById('master-celebration-close');
  const certRow = document.getElementById('certificate-flower-icons');

  function showMasterCelebration() {
    if (!masterModal) return;

    // Populate the 16 flower icons
    if (certRow) {
      certRow.innerHTML = FLOWERS_DATA.map(f => `<span title="${f.name}">${f.icon}</span>`).join(' ');
    }

    masterModal.classList.add('open');
    audioEngine.playCelebrationFanfare();
    launchMasterConfetti();
  }

  function closeMasterCelebration() {
    if (masterModal) {
      masterModal.classList.remove('open');
    }
  }

  if (masterClose) {
    masterClose.addEventListener('click', closeMasterCelebration);
  }

  if (masterModal) {
    masterModal.addEventListener('click', (e) => {
      if (e.target === masterModal) closeMasterCelebration();
    });
  }

  /* Master Confetti Generator (Twice the Celebration) */
  function launchMasterConfetti() {
    const colors = ['#fca5bb', '#e84a78', '#dfa13d', '#ffd166', '#d8b4e2', '#c92a58', '#ffffff', '#b8b8ff'];
    const count = 260; // Doubled from 120

    for (let i = 0; i < count; i++) {
      const conf = document.createElement('div');
      conf.style.position = 'fixed';
      conf.style.zIndex = '10003';
      conf.style.pointerEvents = 'none';
      const isStarOrRibbon = Math.random();
      if (isStarOrRibbon > 0.7) {
        // Ribbon streamer
        conf.style.width = `${Math.floor(Math.random() * 6 + 5)}px`;
        conf.style.height = `${Math.floor(Math.random() * 22 + 14)}px`;
        conf.style.borderRadius = '2px';
      } else if (isStarOrRibbon > 0.4) {
        // Circle petal
        conf.style.width = `${Math.floor(Math.random() * 10 + 7)}px`;
        conf.style.height = `${Math.floor(Math.random() * 10 + 7)}px`;
        conf.style.borderRadius = '50%';
      } else {
        // Confetti square
        conf.style.width = `${Math.floor(Math.random() * 8 + 6)}px`;
        conf.style.height = `${Math.floor(Math.random() * 12 + 6)}px`;
        conf.style.borderRadius = '3px';
      }
      conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      conf.style.left = `${Math.random() * 100}vw`;
      conf.style.top = '-25px';
      conf.style.opacity = '1';
      conf.style.transform = `rotate(${Math.random() * 360}deg)`;
      conf.style.transition = `transform ${Math.random() * 2 + 2.5}s cubic-bezier(0.25, 0.46, 0.45, 0.94), top ${Math.random() * 2 + 2.5}s ease-in, opacity 1s ease ${Math.random() * 1.5 + 2}s`;

      document.body.appendChild(conf);

      requestAnimationFrame(() => {
        conf.style.top = `${window.innerHeight + 50}px`;
        conf.style.transform = `rotate(${Math.random() * 1080}deg) translateX(${(Math.random() - 0.5) * 220}px)`;
        conf.style.opacity = '0';
      });

      setTimeout(() => {
        if (conf.parentNode) conf.parentNode.removeChild(conf);
      }, 5500);
    }
  }

  /* ==========================================================================
     9. CARD CREATION & GRID RENDERING
     ========================================================================== */
  function renderFlowersGrid() {
    if (!gridEl) return;
    gridEl.innerHTML = '';

    FLOWERS_DATA.forEach(flower => {
      const isBloomed = unlockedIds.has(flower.id);
      const card = document.createElement('div');
      card.className = `flower-pot-card${isBloomed ? ' bloomed' : ''}`;
      card.setAttribute('data-id', flower.id);
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `${flower.name} - ${isBloomed ? 'Bloomed' : 'Closed Bud'}`);

      card.innerHTML = `
        <div class="pot-top-tag">
          <span class="pot-number">#${String(flower.id).padStart(2, '0')}</span>
          <span class="pot-status-badge">${isBloomed ? 'BLOOMED 🌸' : 'BUD 🌿'}</span>
        </div>

        <div class="flower-stage">
          <div class="bloom-aura"></div>
          ${generateFlowerSVG(flower)}
        </div>

        <h4 class="pot-flower-name">${flower.name}</h4>
        <p class="pot-flower-species">${flower.species}</p>
        <span class="pot-tap-prompt">${isBloomed ? 'View Note 💌' : 'Tap to Bloom ✨'}</span>
      `;

      // Stagger organic living sway delay so the garden moves naturally in a gentle breeze
      const swayDelay = ((flower.id * 0.35) % 2.8).toFixed(2);
      const bloomGroup = card.querySelector('.bloom-group');
      const budGroup = card.querySelector('.bud-group');
      const stemPath = card.querySelector('.stem-path');
      const leafShape = card.querySelector('.leaf-shape');

      if (bloomGroup) bloomGroup.style.animationDelay = `1.25s, ${swayDelay}s`;
      if (budGroup) budGroup.style.animationDelay = `${swayDelay}s`;
      if (stemPath) stemPath.style.animationDelay = `${swayDelay}s`;
      if (leafShape) leafShape.style.animationDelay = `${(swayDelay * 1.2).toFixed(2)}s`;

      // Click Interaction
      const handleTap = (e) => {
        handleFlowerClick(flower, card, e);
      };

      card.addEventListener('click', handleTap);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleTap(e);
        }
      });

      gridEl.appendChild(card);
    });
  }

  function handleFlowerClick(flower, card, event) {
    const isAlreadyBloomed = unlockedIds.has(flower.id);
    const rect = card.getBoundingClientRect();
    const clickX = event.clientX || rect.left + rect.width / 2;
    const clickY = event.clientY || rect.top + rect.height / 2;

    // Trigger golden shockwave ripple (Twice the Animation)
    const flowerStage = card.querySelector('.flower-stage');
    if (flowerStage) {
      const shockwave = document.createElement('div');
      shockwave.className = 'bloom-shockwave';
      flowerStage.appendChild(shockwave);
      setTimeout(() => {
        if (shockwave.parentNode) shockwave.parentNode.removeChild(shockwave);
      }, 950);
    }

    // Play dual tactile Kalimba blossom chime
    audioEngine.playBloomArpeggio(flower.tone);

    if (!isAlreadyBloomed) {
      // Unlock new flower
      unlockedIds.add(flower.id);
      saveProgress();

      // Update Card Visuals
      card.classList.add('bloomed');
      const statusBadge = card.querySelector('.pot-status-badge');
      if (statusBadge) statusBadge.textContent = 'BLOOMED 🌸';
      const promptBadge = card.querySelector('.pot-tap-prompt');
      if (promptBadge) promptBadge.textContent = 'View Note 💌';
      card.setAttribute('aria-label', `${flower.name} - Bloomed`);

      // Spawn Hearts & Sparks (14 particles - Twice the Animation!)
      spawnHeartsAndSparksAt(clickX, clickY, 14);

      // Update progress bar & mini basket
      updateProgressUI(true);

      // Show Note Modal after smooth cinematic 2-phase bloom unfolding delay
      setTimeout(() => {
        openFlowerModal(flower);
      }, 650);
    } else {
      // Already bloomed: subtle spark & view note
      spawnHeartsAndSparksAt(clickX, clickY, 6);
      openFlowerModal(flower);
    }
  }

  /* ==========================================================================
     10. QUICK ACTION BUTTONS (BLOOM ALL & RESET GARDEN)
     ========================================================================== */
  const btnBloomAll = document.getElementById('btn-bloom-all');
  const btnResetGarden = document.getElementById('btn-reset-garden');

  if (btnBloomAll) {
    btnBloomAll.addEventListener('click', () => {
      audioEngine.init();
      let delay = 0;
      let newlyBloomed = 0;

      FLOWERS_DATA.forEach((flower, idx) => {
        if (!unlockedIds.has(flower.id)) {
          newlyBloomed++;
          setTimeout(() => {
            unlockedIds.add(flower.id);
            const card = gridEl.querySelector(`.flower-pot-card[data-id="${flower.id}"]`);
            if (card) {
              card.classList.add('bloomed');
              const statusBadge = card.querySelector('.pot-status-badge');
              if (statusBadge) statusBadge.textContent = 'BLOOMED 🌸';
              const promptBadge = card.querySelector('.pot-tap-prompt');
              if (promptBadge) promptBadge.textContent = 'View Note 💌';
            }
            audioEngine.playKalimbaTone(flower.tone);
            updateProgressUI(false);
          }, delay);
          delay += 120;
        }
      });

      if (newlyBloomed > 0) {
        setTimeout(() => {
          saveProgress();
          updateProgressUI(true);
          showToast('The entire garden is in full bloom! 🌸✨');
        }, delay + 100);
      } else {
        showToast('All 16 flowers are already blooming! 💐');
        showMasterCelebration();
      }
    });
  }

  if (btnResetGarden) {
    btnResetGarden.addEventListener('click', () => {
      unlockedIds.clear();
      saveProgress();
      renderFlowersGrid();
      updateProgressUI(false);
      showToast('Garden tended! Buds are resting peacefully 🌿');
    });
  }

  /* ==========================================================================
     11. AUDIO TOGGLE DOCK
     ========================================================================== */
  const soundBtn = document.getElementById('sound-btn');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      isSoundEnabled = !isSoundEnabled;
      const soundText = soundBtn.querySelector('.sound-text');
      const soundIcon = soundBtn.querySelector('.sound-icon');

      if (isSoundEnabled) {
        soundBtn.classList.remove('muted');
        if (soundText) soundText.textContent = 'Kalimba Chimes ON';
        if (soundIcon) soundIcon.textContent = '🎵';
        audioEngine.playKalimbaTone(523.25);
        showToast('Kalimba Chimes Enabled 🎶');
      } else {
        soundBtn.classList.add('muted');
        if (soundText) soundText.textContent = 'Kalimba Muted';
        if (soundIcon) soundIcon.textContent = '🔇';
        showToast('Sound Muted');
      }
    });
  }

  /* ==========================================================================
     12. BACKGROUND CANVAS (TWICE THE PARTICLES & 3D TUMBLING SAKURA)
     ========================================================================== */
  function initGardenCanvas() {
    const canvas = document.getElementById('garden-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particlesCount = 85; // Doubled from 38 (Twice the Animation)
    const particles = [];

    for (let i = 0; i < particlesCount; i++) {
      const typeRand = Math.random();
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 8 + 6,
        speedX: Math.random() * 0.8 - 0.2,
        speedY: Math.random() * 0.8 + 0.35,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.04,
        opacity: Math.random() * 0.45 + 0.25,
        type: typeRand > 0.45 ? 'petal' : (typeRand > 0.15 ? 'spore' : 'mote'),
        oscillation: Math.random() * Math.PI * 2
      });
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      const windGust = Math.sin(Date.now() * 0.0008) * 0.5;

      particles.forEach(p => {
        p.oscillation += 0.02;
        p.x += p.speedX + Math.sin(p.oscillation) * 0.6 + windGust;
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
          // 3D tumbling pink sakura petal with realistic perspective flip
          ctx.scale(Math.cos(p.rot), 1);
          ctx.fillStyle = '#fca5bb';
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(p.size / 2, -p.size, p.size, -p.size / 2, 0, p.size);
          ctx.bezierCurveTo(-p.size, -p.size / 2, -p.size / 2, -p.size, 0, 0);
          ctx.fill();
        } else if (p.type === 'spore') {
          // Golden luminous spore with pulsating radius
          const pulse = 1 + Math.sin(p.oscillation * 2) * 0.25;
          ctx.fillStyle = '#dfa13d';
          ctx.beginPath();
          ctx.arc(0, 0, (p.size / 3.5) * pulse, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Romantic starlight mote
          ctx.fillStyle = '#e84a78';
          ctx.beginPath();
          ctx.arc(0, 0, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }

  /* ==========================================================================
     13. INITIALIZATION ON DOM READY
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    loadProgress();
    renderFlowersGrid();
    updateProgressUI(false);
    initGardenCanvas();

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
