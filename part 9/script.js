/**
 * PART 09 — OPEN WHEN… LETTERS
 * For Aditi Soni · Turning 17 (DOB: 16 Dec 2009)
 * From: yours spidy 🕸️❤️
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. THE 6 "OPEN WHEN…" LETTERS DATA
     ========================================================================== */
  const LETTERS_DATA = [
    {
      id: 1,
      prompt: "Open when you need a smile.",
      mood: "JOY & SWEET LAUGHTER",
      sealClass: "seal-rose",
      sealIcon: "💖",
      stampIcon: "🌸",
      previewSnippet: "Remember how your eyes crinkle up when you get all dramatically shy? Whenever life feels dull...",
      body: `Hey my prettiest babyyygurlll,

If your smile has disappeared today, consider this an official reminder of how truly stunning it is. Remember the time we laughed so hard at 3 AM our stomachs hurt? Or how your eyes crinkle up when you get all dramatically shy?

Whenever life feels a little dull or heavy, close your eyes and remember: somewhere in this world, there is a Spidy whose entire day becomes a masterpiece just hearing you giggle. Now smile for me right now—yes, that little one counts! I love you so much.`,
      ps: "P.S. You're the cutest when you smile, and nobody can ever take that light from you. Keep shining, angel."
    },
    {
      id: 2,
      prompt: "Open when the day feels long.",
      mood: "GENTLE REST & COMFORT",
      sealClass: "seal-gold",
      sealIcon: "⭐",
      stampIcon: "🍵",
      previewSnippet: "Take a deep breath and let your shoulders drop. You survived today. Put your phone down...",
      body: `My sweetest Aditi,

Take a deep, slow breath and let your shoulders drop. You survived today. You gave it your best, and whatever went wrong or felt exhausting is already in the past.

You don't have to carry the whole world on your shoulders tonight. Put your phone down, curl under the softest blanket, and imagine my arms wrapped tight around you in the warmest hug that never ends. You are safe, you are deeply cherished, and tomorrow will be so much kinder to you. I'm right here with you in spirit, always.`,
      ps: "P.S. Tonight’s sole mission: resting that beautiful brain of yours. You’ve done enough today."
    },
    {
      id: 3,
      prompt: "Open when you feel proud.",
      mood: "TRIUMPH & ADMIRATION",
      sealClass: "seal-plum",
      sealIcon: "👑",
      stampIcon: "🏆",
      previewSnippet: "Look at you go! I KNEW you could do it! Seeing your hard work pay off fills my heart...",
      body: `To my champion, Aditi! 👑

Look at you go! I KNEW you could do it! Every single time you put your mind to something, you shine with so much brilliance and grit. Seeing your hard work pay off fills my heart with an overwhelming amount of pride.

You are so exceptionally smart, talented, and capable, babyyygurlll. Never underestimate the magic you hold inside. Celebrate this win, savor the feeling, and never forget that I will forever be in the front row cheering the loudest for every single triumph of yours. You deserve every ounce of this happiness!`,
      ps: "P.S. Proudest boyfriend in the entire multiverse. Wear your crown high today!"
    },
    {
      id: 4,
      prompt: "Open when you miss me.",
      mood: "CONNECTION & REASSURANCE",
      sealClass: "seal-plum",
      sealIcon: "🌙",
      stampIcon: "💌",
      previewSnippet: "I miss you too. More than words could ever fit on paper. Place your hand over your heart...",
      body: `My dearest Aditi,

I miss you too. More than words could ever fit on paper. If distance could be conquered by how often I think of you, I'd be standing right by your side every single second.

Whenever you feel that little ache in your chest, place your hand over your heart. Feel that steady beat? That's me, holding onto you across every kilometer. The same moon watching over you is shining down on me. We are walking under the exact same sky, counting down the hours until our hands are tangled together again. You are never alone.`,
      ps: "P.S. Close your eyes for five seconds. That little flutter in the breeze? That was a kiss from me."
    },
    {
      id: 5,
      prompt: "Open when you doubt yourself.",
      mood: "UNWAVERING FAITH & COURAGE",
      sealClass: "seal-gold",
      sealIcon: "🌸",
      stampIcon: "✨",
      previewSnippet: "Do not let temporary doubt dim the girl who has the courage of a lion and the kindest soul...",
      body: `Listen to me very carefully, Aditi Soni:

Do not let temporary doubt dim the girl who has the courage of a lion and the kindest soul on earth. The doubts in your head are lying to you; your heart and your track record of overcoming challenges are the real truth.

At 17 years old, you have already grown into such a resilient, inspiring, and breathtaking young woman. I believe in you with every fiber of my being—even on the days when you struggle to believe in yourself. Trust your strength, trust your path, and remember who you are. You've got this, and I've got you.`,
      ps: "P.S. If you ever forget how extraordinary you are, just ask me. I have an endless list waiting for you."
    },
    {
      id: 6,
      prompt: "Open before you sleep.",
      mood: "PEACEFUL SWEET DREAMS",
      sealClass: "seal-rose",
      sealIcon: "✨",
      stampIcon: "☁️",
      previewSnippet: "The stars are out tonight, and I hope they bring you the most peaceful, restful dreams...",
      body: `Goodnight, my sweet babyyygurlll,

The stars are out tonight, and I hope they bring you the most peaceful, restful dreams. Thank you for being the bright spot of my day, the last thought on my mind before I close my eyes, and the first prayer I whisper when I wake up.

Let go of whatever worries are still lingering from today. Tomorrow is a brand new page, full of promise and love. Sleep tight, my angel. I’ll meet you in our dreams where we can wander under the stars without a single care in the world.`,
      ps: "P.S. Sweet dreams, Aditi. Waking up knowing you are in my life is my favorite miracle."
    }
  ];

  const STORAGE_KEY = 'aditi_open_when_letters_read';

  /* App State */
  let readLetterIds = new Set();
  let isSoundEnabled = true;
  let activeModalIndex = 0;

  /* ==========================================================================
     2. PURE WEB AUDIO SYNTHESIZER (PAPER RUSTLE & KALIMBA CHIMES)
     ========================================================================== */
  class LetterAudio {
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

    playPaperRustle() {
      if (!isSoundEnabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;

      // 1. Paper slide/fold frequency sweep
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(160, now + 0.18);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.18, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.24);

      // 2. High celesta bell ring
      const bell = this.ctx.createOscillator();
      const bellGain = this.ctx.createGain();

      bell.type = 'sine';
      bell.frequency.setValueAtTime(880, now + 0.04);
      bell.frequency.exponentialRampToValueAtTime(1320, now + 0.15);

      bellGain.gain.setValueAtTime(0.0001, now + 0.04);
      bellGain.gain.exponentialRampToValueAtTime(0.14, now + 0.06);
      bellGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

      bell.connect(bellGain);
      bellGain.connect(this.ctx.destination);

      bell.start(now + 0.04);
      bell.stop(now + 0.48);
    }

    playTriumphChimes() {
      if (!isSoundEnabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      // Dreamy romantic Kalimba notes: E5, G5, B5, D6, E6
      const notes = [659.25, 783.99, 987.77, 1174.66, 1318.51];

      notes.forEach((f, idx) => {
        const t = now + idx * 0.1;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, t);

        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.exponentialRampToValueAtTime(0.25, t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.85);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t);
        osc.stop(t + 0.9);
      });
    }
  }

  const soundEngine = new LetterAudio();

  /* ==========================================================================
     3. TOAST NOTIFICATIONS
     ========================================================================== */
  let toastTimer = null;
  function showToast(message, icon = '💌') {
    let toast = document.getElementById('letter-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'letter-toast';
      toast.className = 'letter-toast';
      document.body.appendChild(toast);
    }

    toast.innerHTML = `<span class="toast-icon">${icon}</span><span class="toast-text">${message}</span>`;
    toast.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  /* ==========================================================================
     4. PERSISTENCE & LOCALSTORAGE
     ========================================================================== */
  function loadSavedProgress() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) {
          readLetterIds = new Set(parsed.filter(id => id >= 1 && id <= 6));
        }
      }
    } catch (e) {
      console.warn('Could not read letter progress:', e);
      readLetterIds = new Set();
    }
  }

  function saveProgress() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(readLetterIds)));
    } catch (e) {
      console.warn('Could not save letter progress:', e);
    }
  }

  /* ==========================================================================
     5. PROGRESS TRACKER UI
     ========================================================================== */
  const countEl = document.getElementById('opened-count');
  const fillEl = document.getElementById('progress-fill');

  function updateTrackerUI(triggerCelebration = false) {
    const total = LETTERS_DATA.length; // 6
    const count = readLetterIds.size;
    const pct = Math.round((count / total) * 100);

    if (countEl) countEl.textContent = count;
    if (fillEl) fillEl.style.width = pct + '%';

    if (count === total && triggerCelebration) {
      setTimeout(() => {
        soundEngine.playTriumphChimes();
        showToast('All 6 Open When Letters Unfolded with Love! 💌👑', '💖');
        triggerConfettiBurst();
      }, 500);
    }
  }

  /* ==========================================================================
     6. RENDER 6 ENVELOPES DYNAMICALLY
     ========================================================================== */
  const gridEl = document.getElementById('envelopes-grid');

  function renderEnvelopesGrid() {
    if (!gridEl) return;
    gridEl.innerHTML = '';

    LETTERS_DATA.forEach((letter, index) => {
      const isRead = readLetterIds.has(letter.id);

      const card = document.createElement('div');
      card.className = `envelope-card${isRead ? ' is-read' : ''}`;
      card.setAttribute('data-id', letter.id);
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-expanded', 'false');
      card.setAttribute('aria-label', `Envelope #${letter.id}: ${letter.prompt}. Click to open letter.`);

      card.innerHTML = `
        <div class="envelope-box">
          <!-- Read status badge -->
          <div class="envelope-opened-badge" aria-hidden="true">
            <span>Read with Love 💌</span>
          </div>

          <!-- Inside Letter Sheet (Slides Up on Open) -->
          <div class="letter-sheet">
            <div class="letter-sheet-lines" aria-hidden="true"></div>
            
            <div class="sheet-header-row">
              <span class="sheet-badge">LETTER #${String(letter.id).padStart(2, '0')}</span>
              <span class="sheet-stamp-icon" aria-hidden="true">${letter.stampIcon}</span>
            </div>

            <h4 class="sheet-preview-title">${letter.prompt}</h4>
            <p class="sheet-snippet">${letter.previewSnippet}</p>

            <div class="sheet-action-row">
              <button class="sheet-read-btn" type="button" aria-label="Read full letter: ${letter.prompt}">
                <span>Read Letter 💌</span>
              </button>
              <strong class="sheet-sign">yours spidy 🕸️❤️</strong>
            </div>
          </div>

          <!-- Front Pouch & Folds -->
          <div class="envelope-pouch" aria-hidden="true">
            <div class="envelope-fold-left"></div>
            <div class="envelope-fold-right"></div>
            <div class="envelope-fold-bottom"></div>
            
            <div class="envelope-front-tag">
              <span class="front-tag-prompt">A NOTE FOR ADITI</span>
              <h4 class="front-tag-title">${letter.prompt}</h4>
            </div>
          </div>

          <!-- Top Foldable Flap with Wax Seal -->
          <div class="envelope-flap" aria-hidden="true">
            <div class="wax-seal ${letter.sealClass}" title="Wax Seal · Click to break seal and open letter">
              <span>${letter.sealIcon}</span>
            </div>
          </div>
        </div>
      `;

      // Toggle envelope open/close
      const toggleEnvelope = (e) => {
        // If clicking the read button, open modal directly
        if (e && e.target && e.target.closest('.sheet-read-btn')) {
          e.stopPropagation();
          openLetterModal(index);
          return;
        }

        soundEngine.playPaperRustle();
        const isOpen = card.classList.contains('is-open');

        if (isOpen) {
          card.classList.remove('is-open');
          card.setAttribute('aria-expanded', 'false');
        } else {
          card.classList.add('is-open');
          card.setAttribute('aria-expanded', 'true');

          if (!readLetterIds.has(letter.id)) {
            readLetterIds.add(letter.id);
            card.classList.add('is-read');
            saveProgress();
            updateTrackerUI(true);
          }
        }
      };

      card.addEventListener('click', toggleEnvelope);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleEnvelope(e);
        }
      });

      // Wax Seal click explicit handler
      const seal = card.querySelector('.wax-seal');
      if (seal) {
        seal.addEventListener('click', (e) => {
          e.stopPropagation();
          toggleEnvelope(e);
        });
      }

      gridEl.appendChild(card);
    });
  }

  /* ==========================================================================
     7. QUICK CONTROLS: OPEN ALL & TUCK ALL BACK IN
     ========================================================================== */
  const btnOpenAll = document.getElementById('btn-open-all');
  const btnCloseAll = document.getElementById('btn-close-all');

  if (btnOpenAll) {
    btnOpenAll.addEventListener('click', () => {
      soundEngine.init();
      soundEngine.playPaperRustle();

      let delay = 0;
      LETTERS_DATA.forEach((letter) => {
        setTimeout(() => {
          const card = gridEl.querySelector(`.envelope-card[data-id="${letter.id}"]`);
          if (card) {
            card.classList.add('is-open', 'is-read');
            card.setAttribute('aria-expanded', 'true');
            readLetterIds.add(letter.id);
          }
        }, delay);
        delay += 90;
      });

      setTimeout(() => {
        saveProgress();
        updateTrackerUI(true);
        showToast("All 6 keepsake letters opened with warmth! 💌");
      }, delay + 100);
    });
  }

  if (btnCloseAll) {
    btnCloseAll.addEventListener('click', () => {
      soundEngine.init();
      soundEngine.playPaperRustle();

      let delay = 0;
      LETTERS_DATA.forEach((letter) => {
        setTimeout(() => {
          const card = gridEl.querySelector(`.envelope-card[data-id="${letter.id}"]`);
          if (card) {
            card.classList.remove('is-open');
            card.setAttribute('aria-expanded', 'false');
          }
        }, delay);
        delay += 70;
      });

      setTimeout(() => {
        showToast("Tucked all letters back into their envelopes 📫");
      }, delay + 100);
    });
  }

  /* ==========================================================================
     8. FULL-SCREEN LETTER READING MODAL
     ========================================================================== */
  const modalEl = document.getElementById('letter-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalMoodBadge = document.getElementById('modal-mood-badge');
  const modalLetterTitle = document.getElementById('modal-letter-title');
  const modalLetterBody = document.getElementById('modal-letter-body');
  const modalLetterPs = document.getElementById('modal-letter-ps');
  const modalWaxSeal = document.getElementById('modal-wax-seal');
  const modalPageCounter = document.getElementById('modal-page-counter');
  const modalPrevBtn = document.getElementById('modal-prev-btn');
  const modalNextBtn = document.getElementById('modal-next-btn');

  function openLetterModal(index) {
    if (!modalEl || index < 0 || index >= LETTERS_DATA.length) return;
    activeModalIndex = index;
    const letter = LETTERS_DATA[index];

    // Populate modal content
    if (modalMoodBadge) modalMoodBadge.textContent = letter.mood;
    if (modalLetterTitle) modalLetterTitle.textContent = letter.prompt;
    if (modalLetterBody) modalLetterBody.textContent = letter.body;
    if (modalLetterPs) modalLetterPs.textContent = letter.ps;
    if (modalWaxSeal) modalWaxSeal.innerHTML = `<span>${letter.sealIcon}</span>`;
    if (modalPageCounter) modalPageCounter.textContent = `Letter ${index + 1} of ${LETTERS_DATA.length}`;

    // Mark as read in state
    if (!readLetterIds.has(letter.id)) {
      readLetterIds.add(letter.id);
      const card = gridEl.querySelector(`.envelope-card[data-id="${letter.id}"]`);
      if (card) card.classList.add('is-read');
      saveProgress();
      updateTrackerUI(true);
    }

    modalEl.classList.add('open');
    soundEngine.playPaperRustle();
  }

  function closeLetterModal() {
    if (modalEl) {
      modalEl.classList.remove('open');
      soundEngine.playPaperRustle();
    }
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeLetterModal);
  }

  if (modalEl) {
    modalEl.addEventListener('click', (e) => {
      if (e.target === modalEl) {
        closeLetterModal();
      }
    });
  }

  if (modalPrevBtn) {
    modalPrevBtn.addEventListener('click', () => {
      let nextIndex = activeModalIndex - 1;
      if (nextIndex < 0) nextIndex = LETTERS_DATA.length - 1;
      openLetterModal(nextIndex);
    });
  }

  if (modalNextBtn) {
    modalNextBtn.addEventListener('click', () => {
      let nextIndex = activeModalIndex + 1;
      if (nextIndex >= LETTERS_DATA.length) nextIndex = 0;
      openLetterModal(nextIndex);
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalEl && modalEl.classList.contains('open')) {
      closeLetterModal();
    }
    if (modalEl && modalEl.classList.contains('open')) {
      if (e.key === 'ArrowLeft') {
        modalPrevBtn.click();
      } else if (e.key === 'ArrowRight') {
        modalNextBtn.click();
      }
    }
  });

  // Sound Toggle Pill
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
        soundEngine.init();
        soundEngine.playPaperRustle();
      } else {
        soundBtn.classList.add('muted');
        if (soundText) soundText.textContent = 'Sound Effects OFF';
        if (soundIcon) soundIcon.textContent = '🔇';
      }
    });
  }

  /* ==========================================================================
     9. AMBIENT PARTICLES & CONFETTI ENGINE
     ========================================================================== */
  const canvasAmbient = document.getElementById('ambient-canvas');
  let ctxAmbient = null;
  const particles = [];
  const burstParticles = [];

  function initAmbientCanvas() {
    if (!canvasAmbient) return;
    ctxAmbient = canvasAmbient.getContext('2d');

    const handleResize = () => {
      canvasAmbient.width = window.innerWidth;
      canvasAmbient.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    // 70 floating origami paper envelopes, rose petals, and gold specks
    particles.length = 0;
    const colors = ['#dfa13d', '#fca5bb', '#ffd166', '#f472b6', '#fff5ea'];
    for (let i = 0; i < 70; i++) {
      particles.push({
        x: Math.random() * canvasAmbient.width,
        y: Math.random() * canvasAmbient.height,
        size: Math.random() * 4 + 1.5,
        speedY: Math.random() * 0.55 + 0.25,
        speedX: Math.sin(Math.random() * 3) * 0.35,
        osc: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.65 + 0.25,
        type: Math.random() > 0.6 ? 'petal' : (Math.random() > 0.5 ? 'envelope' : 'sparkle'),
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.025
      });
    }

    animateAmbient();
  }

  function triggerConfettiBurst() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const colors = ['#dfa13d', '#fca5bb', '#e84a78', '#ffd166', '#ffffff'];

    for (let i = 0; i < 110; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 10 + 4;
      burstParticles.push({
        x: w / 2,
        y: h / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 4,
        size: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        decay: Math.random() * 0.02 + 0.012,
        gravity: 0.2,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.15,
        isHeart: Math.random() > 0.7
      });
    }
  }

  function animateAmbient() {
    if (!ctxAmbient) return;
    const w = canvasAmbient.width;
    const h = canvasAmbient.height;

    ctxAmbient.clearRect(0, 0, w, h);

    // 1. Ambient Background Particles
    particles.forEach(p => {
      p.osc += 0.02;
      p.x += p.speedX + Math.sin(p.osc) * 0.4;
      p.y += p.speedY;
      p.rot += p.rotSpeed;

      if (p.y > h + 20) {
        p.y = -20;
        p.x = Math.random() * w;
      }
      if (p.x > w + 20) p.x = -20;
      if (p.x < -20) p.x = w + 20;

      ctxAmbient.save();
      ctxAmbient.translate(p.x, p.y);
      ctxAmbient.rotate(p.rot);
      ctxAmbient.globalAlpha = p.opacity;

      if (p.type === 'envelope') {
        // Tiny cute origami envelope
        ctxAmbient.fillStyle = '#fff4f7';
        ctxAmbient.strokeStyle = '#dfa13d';
        ctxAmbient.lineWidth = 0.8;
        ctxAmbient.strokeRect(-p.size * 1.5, -p.size, p.size * 3, p.size * 2);
        ctxAmbient.fillRect(-p.size * 1.5, -p.size, p.size * 3, p.size * 2);
      } else if (p.type === 'petal') {
        // Tumbling pink sakura petal
        ctxAmbient.fillStyle = p.color;
        ctxAmbient.beginPath();
        ctxAmbient.moveTo(0, 0);
        ctxAmbient.bezierCurveTo(p.size, -p.size * 1.5, p.size * 2, -p.size * 0.8, 0, p.size * 2);
        ctxAmbient.bezierCurveTo(-p.size * 2, -p.size * 0.8, -p.size, -p.size * 1.5, 0, 0);
        ctxAmbient.fill();
      } else {
        // Glowing gold shimmer
        ctxAmbient.fillStyle = p.color;
        ctxAmbient.beginPath();
        ctxAmbient.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctxAmbient.fill();
      }

      ctxAmbient.restore();
    });

    // 2. Confetti Bursts
    for (let i = burstParticles.length - 1; i >= 0; i--) {
      const b = burstParticles[i];
      b.x += b.vx;
      b.y += b.vy;
      b.vy += b.gravity;
      b.vx *= 0.98;
      b.rot += b.rotSpeed;
      b.alpha -= b.decay;

      if (b.alpha <= 0) {
        burstParticles.splice(i, 1);
        continue;
      }

      ctxAmbient.save();
      ctxAmbient.translate(b.x, b.y);
      ctxAmbient.rotate(b.rot);
      ctxAmbient.globalAlpha = b.alpha;

      if (b.isHeart) {
        ctxAmbient.font = `${b.size * 2}px serif`;
        ctxAmbient.fillText('💌', 0, 0);
      } else {
        ctxAmbient.fillStyle = b.color;
        ctxAmbient.fillRect(-b.size / 2, -b.size / 2, b.size, b.size * 1.3);
      }

      ctxAmbient.restore();
    }

    requestAnimationFrame(animateAmbient);
  }

  /* ==========================================================================
     10. INITIALIZATION ON DOM READY
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    loadSavedProgress();
    renderEnvelopesGrid();
    updateTrackerUI(false);
    initAmbientCanvas();

    // User gesture audio unlock
    const unlockAudio = () => {
      soundEngine.init();
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };
    window.addEventListener('pointerdown', unlockAudio, { passive: true });
    window.addEventListener('keydown', unlockAudio, { passive: true });
  });

})();
