/**
 * PART 06 — HEART CLUES TREASURE HUNT
 * For Aditi Soni · Turning 17 (DOB: 16 Dec 2009)
 * From: yours spidy 🕸️❤️
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. 12 ROMANTIC TRIVIA CLUES & INSIDE JOKES DATA (SHUFFLED ANSWERS A, B, C, D)
     ========================================================================== */
  const CLUES_DATA = [
    {
      id: 1,
      category: "Inside Jokes & Drama",
      stampIcon: "🎭",
      stampName: "Drama Queen",
      question: "Which one of us is slightly more dramatic whenever something minor goes wrong? 🎭",
      options: [
        "Neither (We are zen meditation masters 🧘)",
        "It's a strict 50/50 tie every single day",
        "Aditi (Oscar-winning emotional performance guaranteed! 🏆)",
        "Spidy (He secretly cries over Bollywood movies)"
      ],
      correctIndex: 2, // Option C
      feedbackCorrect: "Spot on babyyygurlll! 😂 You know it’s 100% you! But your cute over-the-top reactions are my favorite entertainment in the entire world! 💖",
      feedbackIncorrect: "Hehe, not that one, guess again babyyy! 😜 You know who the real drama queen is!",
      hint: "Whisper from Spidy: Think of who pouts with puppy eyes and says 'dekho mere saath kya hua!' 🙈 (Check Option C!)"
    },
    {
      id: 2,
      category: "Smile Magic",
      stampIcon: "✨",
      stampName: "Smile Cure",
      question: "What happens to Spidy the exact millisecond Aditi smiles or giggles? ✨",
      options: [
        "Heart rate hits 200 BPM & all stress instantly evaporates 💖",
        "He pretends not to notice and acts super cool",
        "Nothing at all, he stays completely immune",
        "He forgets what language he speaks"
      ],
      correctIndex: 0, // Option A
      feedbackCorrect: "Aww yes! Tera ek smile mere pure din ka sabse bada mood-booster hai, Aditi. Every time you smile, my whole universe lights up! 🌸",
      feedbackIncorrect: "Arre babyyygurlll, thoda aur socho na! 🥺 My heart literally dances when you smile!",
      hint: "Whisper from Spidy: Look at option A! It's pure medical science when it comes to you! 🌸"
    },
    {
      id: 3,
      category: "Precious Dates",
      stampIcon: "🎂",
      stampName: "Prettiest Angel",
      question: "What historical date marks when the prettiest girl in the multiverse was born? 🎂",
      options: [
        "1 January 2009 (New Year's Day)",
        "14 February 2010 (Valentine's Day)",
        "25 December 2008 (Christmas Miracle)",
        "16 December 2009 (The day heaven lost its most precious angel!)"
      ],
      correctIndex: 3, // Option D
      feedbackCorrect: "16 December 2009! The most golden day in history! Turning 17 today, and looking more angelic every second! 👑✨",
      feedbackIncorrect: "Heyyy madam ji! You don't know your own birthdate?! 😂 Guess again right now!",
      hint: "Whisper from Spidy: Check Option D & the postage stamp on the top right corner! 😉"
    },
    {
      id: 4,
      category: "Sweet Nicknames",
      stampIcon: "🕸️",
      stampName: "Babyyygurlll",
      question: "What is Spidy's absolute favorite, most cherished nickname for Aditi? 🥺",
      options: [
        "Madam Supreme Commander 🫡",
        "babyyygurlll ❤️ (With extra 'y's for maximum love!)",
        "Chhotu Pandit",
        "Hey You"
      ],
      correctIndex: 1, // Option B
      feedbackCorrect: "babyyygurlll forever! 🔒 Nobody else has the copyright to call you that except your Spidy! 🕸️❤️",
      feedbackIncorrect: "Galat jawab madam ji! 🙈 Think about what I type when I'm missing you the most!",
      hint: "Whisper from Spidy: Option B! It starts with 'babyyy' and ends with pure butterflies! 🥰"
    },
    {
      id: 5,
      category: "Mood Decoding",
      stampIcon: "🕵️‍♂️",
      stampName: "Mood Decoder",
      question: "When Aditi says 'Mujhe kuch nahi hua...', what does it ACTUALLY translate to? 🧐",
      options: [
        "'I am totally peaceful and need zero attention'",
        "'Please give me a surprise math exam right now'",
        "'Pakka kuch hua hai, abhi pamper karo, hugs do aur 100 compliments sunao!'",
        "'I am completely fine and thinking about dinner'"
      ],
      correctIndex: 2, // Option C
      feedbackCorrect: "Certified Spidy Decoder! 😎 I know your silent signals inside out babyyy. Whenever you say that, extra cuddle protocol initiates! 🫂",
      feedbackIncorrect: "Hehe, not that one, guess again babyyy! 😜 As if you'd ever mean it literally!",
      hint: "Whisper from Spidy: Option C! It means emergency pampering & infinite kisses are needed immediately!"
    },
    {
      id: 6,
      category: "Voice Notes",
      stampIcon: "🎧",
      stampName: "Voice Melody",
      question: "What is the certified scientific effect of Aditi's voice notes on Spidy? 🎧",
      options: [
        "Sudden uncontrollable yawning",
        "Instant short-term memory loss",
        "He listens once and forgets about it",
        "Instant dopamine rush, blushing like an idiot, and 0% sadness left 🎶"
      ],
      correctIndex: 3, // Option D
      feedbackCorrect: "1000% True! Tere voice notes sunke jo sukoon milta hai na, wo duniya ke kisi song mein nahi hai. I listen to them on repeat! 🥺🎧",
      feedbackIncorrect: "Arre galat jawab! 🙈 Try again! Your voice is my favorite melody!",
      hint: "Whisper from Spidy: Option D is the absolute gospel truth! Your voice is my favorite melody!"
    },
    {
      id: 7,
      category: "Wardrobe Mysteries",
      stampIcon: "👗",
      stampName: "Fashion Icon",
      question: "Who takes 45 minutes to pick an outfit only to wear the very first thing they tried? 👗",
      options: [
        "Spidy (he wears the exact same black hoodie every day)",
        "Aditi (while asking Spidy 'ye accha lag raha hai na?' 25 times!)",
        "Neither, we get dressed in 30 seconds flat",
        "A fashion supermodel"
      ],
      correctIndex: 1, // Option B
      feedbackCorrect: "Haha you know it's true! 😂 But honestly, whatever you wear, you look effortlessly stunning. You're my personal supermodel! 💃✨",
      feedbackIncorrect: "Hehe, nope! Don't blame me, I only have two hoodies! 😜 Guess again!",
      hint: "Whisper from Spidy: Option B! Who asks 'ye pehnu ya ye?' every single time we go out?"
    },
    {
      id: 8,
      category: "Cute Offenses",
      stampIcon: "🔒",
      stampName: "Cuddle Jail",
      question: "What is the official legal penalty if Aditi is caught being excessively adorable? 🚔",
      options: [
        "Lifetime sentence in Spidy's arms with infinite forehead kisses 👮‍♂️❤️",
        "A ₹50 fine paid in chocolate eclairs",
        "Standing in the timeout corner for 5 minutes",
        "No dessert for an entire week"
      ],
      correctIndex: 0, // Option A
      feedbackCorrect: "Guilty as charged! 🚨 The court orders you to be cuddled forever and you have zero rights to escape my hugs! 🔒🥰",
      feedbackIncorrect: "Haha as if I'd ever give you a real punishment! 😜 Guess again babyyy!",
      hint: "Whisper from Spidy: Option A! The sentence involves warm hugs and never letting you go!"
    },
    {
      id: 9,
      category: "Late Night Rituals",
      stampIcon: "🌙",
      stampName: "3 AM Whispers",
      question: "What is our absolute favorite late-night ritual together? 🌙",
      options: [
        "Discussing global economic inflation rates",
        "Going to bed strictly at 8:30 PM like disciplined seniors",
        "Talking about everything & nothing until 3 AM with silly giggles ⭐",
        "Competing in silence staring contests"
      ],
      correctIndex: 2, // Option C
      feedbackCorrect: "Those late-night conversations are pure gold! 🌙✨ Falling asleep while talking to you is the sweetest blessing in my life.",
      feedbackIncorrect: "Hehe, not that one, guess again babyyy! 😜 We are night owls of love!",
      hint: "Whisper from Spidy: Option C! Think about 3 AM sleepiness and random funny jokes!"
    },
    {
      id: 10,
      category: "Forever Promises",
      stampIcon: "💍",
      stampName: "Forever Vow",
      question: "What is Spidy's non-negotiable lifetime promise to Aditi? 💍",
      options: [
        "To let you eat all his french fries without complaining",
        "To love, protect & cherish you every second, this life & after rebirth ♾️",
        "To buy you socks for your birthday",
        "To learn how to bake a round pizza"
      ],
      correctIndex: 1, // Option B
      feedbackCorrect: "A lifetime vow etched in stone! 💍 Chahe jo ho jaye, mera dil hamesha sirf tera rahega, Aditi. Every second, minute, day, and forever after. ❤️",
      feedbackIncorrect: "Arre babyyy, it's something way deeper and eternal! Try again! 🥺",
      hint: "Whisper from Spidy: Option B! It involves all my heart, forever and ever!"
    },
    {
      id: 11,
      category: "The Debate Rule",
      stampIcon: "🏆",
      stampName: "Always Winning",
      question: "If Aditi and Spidy get into a silly playful debate, what is the guaranteed outcome? 🏆",
      options: [
        "Spidy presents a 40-slide PowerPoint to debate back",
        "We hire an international referee to judge",
        "It ends in a thumb wrestling match",
        "Aditi wins 100% of the time, and Spidy happily surrenders with a smile 👑"
      ],
      correctIndex: 3, // Option D
      feedbackCorrect: "Queen Aditi takes the trophy every single time! 🏆 Because making you smile and win is my favorite victory anyway! 🥰",
      feedbackIncorrect: "Haha as if Spidy could ever beat you in an argument! 😜 Guess again!",
      hint: "Whisper from Spidy: Option D! Who is the undisputed boss in this relationship? (Hint: You!)"
    },
    {
      id: 12,
      category: "Infinite Cosmos",
      stampIcon: "♾️",
      stampName: "Infinite Love",
      question: "How much does Spidy truly love Aditi Soni? ♾️",
      options: [
        "Just a normal medium amount",
        "7.5 out of 10",
        "More than all stars, galaxies, heartbeats, and dimensions combined! 🌌❤️",
        "A little bit on weekends only"
      ],
      correctIndex: 2, // Option C
      feedbackCorrect: "To infinity, multiverse, and far beyond! 🌌 Happy 17th Birthday my whole universe! You have unlocked the Grand Treasure! 🎁👑",
      feedbackIncorrect: "Nope! It cannot be measured in tiny numbers! Aim for the stars! 😜",
      hint: "Whisper from Spidy: Look at Option C! My love for you is infinite!"
    }
  ];

  /* Storage Key */
  const STORAGE_KEY = 'aditi_heart_clues_progress';

  /* App State */
  let currentIdx = 0;
  let solvedIds = new Set();
  let isSoundEnabled = true;

  /* ==========================================================================
     2. PURE WEB AUDIO SYNTHESIZER (CORRECT, BOOP, STAMP & FANFARE)
     ========================================================================== */
  class HuntAudio {
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

    playCorrectSound() {
      if (!isSoundEnabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      // Joyful upward arpeggio sweep (C5 -> E5 -> G5 -> C6)
      const freqs = [523.25, 659.25, 783.99, 1046.50];

      freqs.forEach((f, idx) => {
        const noteTime = now + idx * 0.08;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, noteTime);

        gain.gain.setValueAtTime(0.001, noteTime);
        gain.gain.exponentialRampToValueAtTime(0.35, noteTime + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 0.45);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(noteTime);
        osc.stop(noteTime + 0.5);
      });
    }

    playIncorrectSound() {
      if (!isSoundEnabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      // Soft playful wobble (gentle descending tone)
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(360, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.28);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.28, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.38);
    }

    playStampSound() {
      if (!isSoundEnabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      // Tactile stamp click
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.08);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.12);
    }

    playTreasureFanfare() {
      if (!isSoundEnabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      // Triumphant fanfare
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];

      notes.forEach((f, idx) => {
        const t = now + idx * 0.12;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, t);

        gain.gain.setValueAtTime(0.001, t);
        gain.gain.exponentialRampToValueAtTime(0.4, t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.8);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t);
        osc.stop(t + 0.85);
      });
    }
  }

  const audioEngine = new HuntAudio();

  /* ==========================================================================
     3. LOCALSTORAGE PERSISTENCE
     ========================================================================== */
  function loadProgress() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed.solved)) {
          solvedIds = new Set(parsed.solved.filter(id => id >= 1 && id <= 12));
        }
        if (typeof parsed.current === 'number' && parsed.current >= 0 && parsed.current < 12) {
          currentIdx = parsed.current;
        }
      }
    } catch (e) {
      console.warn('Could not read treasure hunt progress:', e);
      solvedIds = new Set();
      currentIdx = 0;
    }
  }

  function saveProgress() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        solved: Array.from(solvedIds),
        current: currentIdx
      }));
    } catch (e) {
      console.warn('Could not save treasure hunt progress:', e);
    }
  }

  /* ==========================================================================
     4. DOM ELEMENTS
     ========================================================================== */
  const countEl = document.getElementById('clues-solved-count');
  const fillEl = document.getElementById('progress-fill');
  const trailStrip = document.getElementById('trail-map-strip');
  const stampGrid = document.getElementById('stamp-album-grid');
  const albumHint = document.getElementById('album-hint');
  const statusBadge = document.getElementById('quest-status-badge');

  // Clue Card elements
  const activeCard = document.getElementById('active-clue-card');
  const clueNumEl = document.getElementById('card-clue-num');
  const clueCategoryEl = document.getElementById('card-clue-category');
  const questionTextEl = document.getElementById('card-question-text');
  const optionsGridEl = document.getElementById('clue-options-grid');
  const feedbackBanner = document.getElementById('clue-feedback-banner');
  const feedbackIcon = document.getElementById('feedback-icon');
  const feedbackTitle = document.getElementById('feedback-title');
  const feedbackMessage = document.getElementById('feedback-message');
  const dotsIndicator = document.getElementById('card-dots-indicator');

  // Navigation
  const btnPrev = document.getElementById('btn-prev-clue');
  const btnNext = document.getElementById('btn-next-clue');
  const btnHint = document.getElementById('btn-show-hint');
  const btnReset = document.getElementById('btn-reset-hunt');

  // Modals
  const treasureModal = document.getElementById('treasure-reward-modal');
  const treasureClose = document.getElementById('treasure-modal-close');
  const voucherSummary = document.getElementById('voucher-stamps-summary');
  const btnClaimHug = document.getElementById('btn-claim-hug');

  /* ==========================================================================
     5. RENDER TRAIL NODES & STAMP ALBUM
     ========================================================================== */
  function renderTrailNodes() {
    if (!trailStrip) return;
    trailStrip.innerHTML = '';

    CLUES_DATA.forEach((clue, idx) => {
      const node = document.createElement('div');
      const isSolved = solvedIds.has(clue.id);
      const isActive = idx === currentIdx;

      node.className = `trail-node${isSolved ? ' solved' : ''}${isActive ? ' active' : ''}`;
      node.textContent = isSolved ? '✓' : clue.id;
      node.title = `Clue #${clue.id}: ${clue.category}`;

      node.addEventListener('click', () => {
        goToClue(idx);
      });

      trailStrip.appendChild(node);
    });
  }

  function renderStampAlbum() {
    if (!stampGrid) return;
    stampGrid.innerHTML = '';

    CLUES_DATA.forEach(clue => {
      const slot = document.createElement('div');
      const isSolved = solvedIds.has(clue.id);

      slot.className = `stamp-slot${isSolved ? ' unlocked' : ''}`;
      slot.setAttribute('data-id', clue.id);
      slot.title = isSolved ? `${clue.stampName} (Unlocked!)` : `Locked Stamp #${clue.id}`;
      slot.innerHTML = isSolved ? clue.stampIcon : '🔒';

      if (isSolved) {
        slot.addEventListener('click', () => {
          showToast(`Stamp #${clue.id}: ${clue.stampName} ✨`);
          audioEngine.playStampSound();
        });
      }

      stampGrid.appendChild(slot);
    });
  }

  function updateDashboardUI() {
    const solvedCount = solvedIds.size;
    const total = CLUES_DATA.length; // 12
    const pct = Math.round((solvedCount / total) * 100);

    if (countEl) countEl.textContent = solvedCount;
    if (fillEl) fillEl.style.width = pct + '%';

    if (albumHint) {
      if (solvedCount === total) {
        albumHint.textContent = '🎉 All 12 Stamps Collected! Passport Complete!';
      } else {
        albumHint.textContent = `${solvedCount} / ${total} Collected. Answer correctly to stamp!`;
      }
    }

    if (statusBadge) {
      if (solvedCount === total) {
        statusBadge.textContent = '👑 Grand Treasure Unlocked!';
        statusBadge.style.background = 'rgba(42, 157, 143, 0.15)';
        statusBadge.style.color = '#2a9d8f';
      } else {
        statusBadge.textContent = `🗝️ Clue #${currentIdx + 1} In Progress`;
      }
    }

    renderTrailNodes();
    renderStampAlbum();

    // Check for Final Grand Treasure Completion
    if (solvedCount === total) {
      setTimeout(() => {
        openTreasureModal();
      }, 700);
    }
  }

  /* ==========================================================================
     6. ACTIVE CLUE CARD DISPLAY & LOGIC
     ========================================================================== */
  function renderActiveClue() {
    const clue = CLUES_DATA[currentIdx];
    if (!clue) return;

    const isSolved = solvedIds.has(clue.id);

    // Update Card Headers
    if (clueNumEl) clueNumEl.textContent = `CLUE #${String(clue.id).padStart(2, '0')} OF 12`;
    if (clueCategoryEl) clueCategoryEl.textContent = `${clue.stampIcon} ${clue.category}`;
    if (questionTextEl) questionTextEl.textContent = clue.question;

    // Render Options
    if (optionsGridEl) {
      optionsGridEl.innerHTML = '';
      const letters = ['A', 'B', 'C', 'D'];

      clue.options.forEach((optText, optIdx) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.type = 'button';
        btn.setAttribute('role', 'radio');
        btn.setAttribute('aria-checked', isSolved && optIdx === clue.correctIndex ? 'true' : 'false');

        if (isSolved && optIdx === clue.correctIndex) {
          btn.classList.add('correct');
        }

        btn.innerHTML = `
          <span class="option-letter">${letters[optIdx]}</span>
          <span class="option-label">${optText}</span>
        `;

        btn.addEventListener('click', (e) => {
          handleOptionClick(clue, optIdx, btn, e);
        });

        optionsGridEl.appendChild(btn);
      });
    }

    // Update Feedback Banner
    if (feedbackBanner) {
      if (isSolved) {
        feedbackBanner.className = 'clue-feedback-banner correct';
        if (feedbackIcon) feedbackIcon.textContent = '💖';
        if (feedbackTitle) feedbackTitle.textContent = 'Clue Solved & Stamp Collected!';
        if (feedbackMessage) feedbackMessage.textContent = clue.feedbackCorrect;
      } else {
        feedbackBanner.className = 'clue-feedback-banner';
        if (feedbackIcon) feedbackIcon.textContent = '✨';
        if (feedbackTitle) feedbackTitle.textContent = 'Tap an answer to see if you remember!';
        if (feedbackMessage) feedbackMessage.textContent = 'Take a sweet guess, babyyygurlll. Every option has love in it!';
      }
    }

    // Update Indicator Dots
    if (dotsIndicator) {
      dotsIndicator.innerHTML = '';
      CLUES_DATA.forEach((c, idx) => {
        const dot = document.createElement('span');
        const cSolved = solvedIds.has(c.id);
        dot.className = `indicator-dot${idx === currentIdx ? ' active' : ''}${cSolved ? ' solved' : ''}`;
        dotsIndicator.appendChild(dot);
      });
    }

    // Navigation Buttons State
    if (btnPrev) btnPrev.disabled = currentIdx === 0;
    if (btnNext) {
      btnNext.disabled = currentIdx === CLUES_DATA.length - 1 && isSolved;
      if (isSolved && currentIdx < CLUES_DATA.length - 1) {
        btnNext.classList.add('ready-to-advance');
      } else {
        btnNext.classList.remove('ready-to-advance');
      }
    }

    // Auto-scroll trail to show current node on mobile
    if (trailStrip) {
      const activeNode = trailStrip.querySelector('.trail-node.active');
      if (activeNode) {
        activeNode.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }

  function handleOptionClick(clue, selectedIdx, btnEl, event) {
    const isAlreadySolved = solvedIds.has(clue.id);

    if (selectedIdx === clue.correctIndex) {
      // CORRECT ANSWER (Thrice the Animation)
      audioEngine.playCorrectSound();
      audioEngine.playStampSound();

      // Trigger 3-Stage Victory Shockwave Ring
      const shockwave = document.createElement('div');
      shockwave.className = 'victory-shockwave-ring';
      btnEl.style.position = 'relative';
      btnEl.appendChild(shockwave);
      setTimeout(() => {
        if (shockwave.parentNode) shockwave.parentNode.removeChild(shockwave);
      }, 900);

      // Mark option button
      optionsGridEl.querySelectorAll('.option-btn').forEach(b => b.classList.remove('incorrect'));
      btnEl.classList.add('correct');

      // Spawn 36 celebration particles from button (Tripled!)
      const rect = btnEl.getBoundingClientRect();
      const clickX = event.clientX || rect.left + rect.width / 2;
      const clickY = event.clientY || rect.top + rect.height / 2;
      spawnCelebrationParticles(clickX, clickY, 36);

      if (!isAlreadySolved) {
        solvedIds.add(clue.id);
        saveProgress();
      }

      // Update feedback banner
      if (feedbackBanner) {
        feedbackBanner.className = 'clue-feedback-banner correct';
        if (feedbackIcon) feedbackIcon.textContent = '💖';
        if (feedbackTitle) feedbackTitle.textContent = 'Spot on my love! 🎉';
        if (feedbackMessage) feedbackMessage.textContent = clue.feedbackCorrect;
      }

      updateDashboardUI();

      if (btnNext && currentIdx < CLUES_DATA.length - 1) {
        btnNext.classList.add('ready-to-advance');
      }
    } else {
      // INCORRECT ANSWER (Playful tease with 3-stage shake)
      audioEngine.playIncorrectSound();

      // 3-Stage Shake card
      if (activeCard) {
        activeCard.classList.remove('shake');
        void activeCard.offsetWidth; // re-flow
        activeCard.classList.add('shake');
      }

      btnEl.classList.add('incorrect');
      setTimeout(() => {
        btnEl.classList.remove('incorrect');
      }, 700);

      // Playful teasing feedback
      if (feedbackBanner) {
        feedbackBanner.className = 'clue-feedback-banner tease';
        if (feedbackIcon) feedbackIcon.textContent = '😜';
        if (feedbackTitle) feedbackTitle.textContent = 'Hehe, not quite that one!';
        if (feedbackMessage) feedbackMessage.textContent = clue.feedbackIncorrect;
      }

      showToast("Arre babyyy, guess again! 🙈");
    }
  }

  function goToClue(idx) {
    if (idx < 0 || idx >= CLUES_DATA.length) return;
    currentIdx = idx;
    saveProgress();
    renderActiveClue();
    renderTrailNodes();
    if (statusBadge && solvedIds.size < CLUES_DATA.length) {
      statusBadge.textContent = `🗝️ Clue #${currentIdx + 1} In Progress`;
    }
  }

  /* Navigation listeners */
  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      if (currentIdx > 0) goToClue(currentIdx - 1);
    });
  }

  if (btnNext) {
    btnNext.addEventListener('click', () => {
      if (currentIdx < CLUES_DATA.length - 1) {
        goToClue(currentIdx + 1);
      } else if (solvedIds.size === CLUES_DATA.length) {
        openTreasureModal();
      }
    });
  }

  if (btnHint) {
    btnHint.addEventListener('click', () => {
      const clue = CLUES_DATA[currentIdx];
      if (clue) {
        showToast(clue.hint);
        audioEngine.playStampSound();
      }
    });
  }

  if (btnReset) {
    btnReset.addEventListener('click', () => {
      const confirmReset = window.confirm("Do you want to reset the Heart Clues Treasure Hunt to Clue #1?");
      if (confirmReset) {
        solvedIds.clear();
        currentIdx = 0;
        saveProgress();
        updateDashboardUI();
        renderActiveClue();
        showToast("Treasure Hunt reset! Ready for an adventure 🗝️");
      }
    });
  }

  /* ==========================================================================
     7. GRAND TREASURE REWARD MODAL & VOUCHER
     ========================================================================== */
  function openTreasureModal() {
    if (!treasureModal) return;

    if (voucherSummary) {
      voucherSummary.innerHTML = CLUES_DATA.map(c => `<span title="${c.stampName}">${c.stampIcon}</span>`).join(' ');
    }

    treasureModal.classList.add('open');
    audioEngine.playTreasureFanfare();
    launchGrandConfetti();
  }

  function closeTreasureModal() {
    if (treasureModal) {
      treasureModal.classList.remove('open');
    }
  }

  if (treasureClose) {
    treasureClose.addEventListener('click', closeTreasureModal);
  }

  if (treasureModal) {
    treasureModal.addEventListener('click', (e) => {
      if (e.target === treasureModal) closeTreasureModal();
    });
  }

  if (btnClaimHug) {
    btnClaimHug.addEventListener('click', () => {
      const rect = btnClaimHug.getBoundingClientRect();
      spawnCelebrationParticles(rect.left + rect.width / 2, rect.top, 50); // Tripled to 50!
      audioEngine.playTreasureFanfare();
      showToast("Virtual Hug & Infinite Kisses Claimed! 🤗❤️");
    });
  }

  /* ==========================================================================
     8. CELEBRATION PARTICLES & CONFETTI (THRICE THE ANIMATION)
     ========================================================================== */
  function spawnCelebrationParticles(x, y, count = 36) {
    const icons = ['❤️', '💖', '✨', '💎', '🗝️', '👑', '💐', '⭐', '🌸', '🎁', '💌'];

    for (let i = 0; i < count; i++) {
      if (Math.random() > 0.3) {
        const p = document.createElement('div');
        p.className = 'flying-particle';
        p.textContent = icons[Math.floor(Math.random() * icons.length)];

        const tx = (Math.random() - 0.5) * 180;
        const rot = (Math.random() - 0.5) * 90;
        p.style.setProperty('--tx', `${tx}px`);
        p.style.setProperty('--rot', `${rot}deg`);
        p.style.left = `${x}px`;
        p.style.top = `${y}px`;

        document.body.appendChild(p);

        setTimeout(() => {
          if (p.parentNode) p.parentNode.removeChild(p);
        }, 1900);
      } else {
        const spark = document.createElement('div');
        spark.className = 'stardust-spark';
        const tx = (Math.random() - 0.5) * 160;
        const ty = -(Math.random() * 110 + 35);
        spark.style.setProperty('--tx', `${tx}px`);
        spark.style.setProperty('--ty', `${ty}px`);
        spark.style.left = `${x}px`;
        spark.style.top = `${y}px`;

        document.body.appendChild(spark);

        setTimeout(() => {
          if (spark.parentNode) spark.parentNode.removeChild(spark);
        }, 1500);
      }
    }
  }

  function launchGrandConfetti() {
    const colors = ['#fca5bb', '#e84a78', '#dfa13d', '#ffd166', '#d8b4e2', '#c92a58', '#ffffff', '#2a9d8f', '#ff758f'];
    const count = 550; // Tripled from 240!

    for (let i = 0; i < count; i++) {
      const conf = document.createElement('div');
      conf.style.position = 'fixed';
      conf.style.zIndex = '10003';
      conf.style.pointerEvents = 'none';

      const shapeType = Math.random();
      if (shapeType > 0.65) {
        // Streamer ribbon
        conf.style.width = `${Math.floor(Math.random() * 6 + 5)}px`;
        conf.style.height = `${Math.floor(Math.random() * 26 + 14)}px`;
        conf.style.borderRadius = '2px';
      } else if (shapeType > 0.3) {
        // Shimmering circle petal
        conf.style.width = `${Math.floor(Math.random() * 12 + 7)}px`;
        conf.style.height = `${Math.floor(Math.random() * 12 + 7)}px`;
        conf.style.borderRadius = '50%';
      } else {
        // Gold foil square
        conf.style.width = `${Math.floor(Math.random() * 9 + 6)}px`;
        conf.style.height = `${Math.floor(Math.random() * 14 + 6)}px`;
        conf.style.borderRadius = '3px';
      }

      conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      conf.style.left = `${Math.random() * 100}vw`;
      conf.style.top = '-30px';
      conf.style.opacity = '1';
      conf.style.transform = `rotate(${Math.random() * 360}deg)`;
      conf.style.transition = `transform ${Math.random() * 2 + 2.5}s cubic-bezier(0.25, 0.46, 0.45, 0.94), top ${Math.random() * 2 + 2.5}s ease-in, opacity 1s ease ${Math.random() * 1.5 + 2}s`;

      document.body.appendChild(conf);

      requestAnimationFrame(() => {
        conf.style.top = `${window.innerHeight + 60}px`;
        conf.style.transform = `rotate(${Math.random() * 1260}deg) translateX(${(Math.random() - 0.5) * 260}px)`;
        conf.style.opacity = '0';
      });

      setTimeout(() => {
        if (conf.parentNode) conf.parentNode.removeChild(conf);
      }, 5500);
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
        if (soundText) soundText.textContent = 'Game Chimes ON';
        if (soundIcon) soundIcon.textContent = '🎵';
        audioEngine.playCorrectSound();
        showToast('Game Audio Enabled 🎶');
      } else {
        soundBtn.classList.add('muted');
        if (soundText) soundText.textContent = 'Game Audio Muted';
        if (soundIcon) soundIcon.textContent = '🔇';
        showToast('Game Audio Muted');
      }
    });
  }

  /* ==========================================================================
     10. AMBIENT BACKGROUND CANVAS (THRICE THE PARTICLES: 140 DRIFTING ELEMENTS)
     ========================================================================== */
  function initTreasureCanvas() {
    const canvas = document.getElementById('treasure-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particlesCount = 140; // Tripled from 45 (Thrice the Animation)
    const particles = [];
    const stampEmojis = ['💌', '🗝️', '✨', '💎', '💝', '🌸', '👑', '💖', '⭐', '💍'];

    for (let i = 0; i < particlesCount; i++) {
      const typeRand = Math.random();
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 12 + 8,
        speedX: Math.random() * 0.7 - 0.2,
        speedY: Math.random() * 0.7 + 0.35,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.03,
        opacity: Math.random() * 0.4 + 0.15,
        type: typeRand > 0.55 ? 'emoji' : (typeRand > 0.25 ? 'spore' : 'stamp'),
        emoji: stampEmojis[Math.floor(Math.random() * stampEmojis.length)],
        oscillation: Math.random() * Math.PI * 2
      });
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      const wind = Math.sin(Date.now() * 0.0006) * 0.55;

      particles.forEach(p => {
        p.oscillation += 0.02;
        p.x += p.speedX + Math.sin(p.oscillation) * 0.6 + wind;
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

        if (p.type === 'emoji') {
          // 3D tumbling perspective
          ctx.scale(Math.cos(p.rot), 1);
          ctx.font = `${p.size}px sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(p.emoji, 0, 0);
        } else if (p.type === 'stamp') {
          // Miniature scalloped postage stamp
          ctx.scale(Math.cos(p.rot * 0.8), 1);
          ctx.strokeStyle = '#dfa13d';
          ctx.lineWidth = 1;
          ctx.strokeRect(-p.size / 2, -p.size / 2, p.size, p.size);
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(-p.size / 2 + 1, -p.size / 2 + 1, p.size - 2, p.size - 2);
          ctx.font = `${p.size * 0.6}px sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('💌', 0, 0);
        } else {
          // Pulsing golden luminous stardust
          const pulse = 1 + Math.sin(p.oscillation * 2) * 0.3;
          ctx.fillStyle = '#dfa13d';
          ctx.beginPath();
          ctx.arc(0, 0, 2.5 * pulse, 0, Math.PI * 2);
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
    updateDashboardUI();
    renderActiveClue();
    initTreasureCanvas();

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
