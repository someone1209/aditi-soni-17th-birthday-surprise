/**
 * PART 08 — SCRATCH-OFF LOVE COUPONS
 * For Aditi Soni · Turning 17 (DOB: 16 Dec 2009)
 * From: yours spidy 🕸️❤️
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. COUPONS CONFIGURATION & DATA
     ========================================================================== */
  const COUPONS_DATA = [
    {
      id: 1,
      name: "Unlimited Cuddles",
      prize: "Unlimited cuddles & tight hugs on demand (Never expires)",
      serial: "HUG-1612",
      theme: "gold",
      accent: "#dfa13d",
      gradientStops: ["#b87e22", "#fde08b", "#dfa13d", "#fff6d1", "#9c6515"]
    },
    {
      id: 2,
      name: "Romantic Dinner",
      prize: "Dinner date at your favorite spot, my treat",
      serial: "DINE-1612",
      theme: "rose-gold",
      accent: "#e88b99",
      gradientStops: ["#b75364", "#fed0d9", "#e88b99", "#fff0f3", "#9b3c4c"]
    },
    {
      id: 3,
      name: "Genie Wish",
      prize: "One wish granted with zero questions asked",
      serial: "WISH-1612",
      theme: "champagne",
      accent: "#d49a37",
      gradientStops: ["#a16812", "#ffebb5", "#e2ab4b", "#fffadb", "#8a540a"]
    }
  ];

  const STORAGE_KEY = 'aditi_scratch_coupons_revealed';
  const SCRATCH_THRESHOLD = 0.45; // 45% scratched auto-reveals the coupon

  /* State */
  let revealedSet = new Set();
  let isSoundEnabled = true;

  /* ==========================================================================
     2. PURE WEB AUDIO SYNTHESIZER (REALISTIC SCRATCH & REWARD CHIMES)
     ========================================================================== */
  class ScratchAudio {
    constructor() {
      this.ctx = null;
      this.noiseNode = null;
      this.filterNode = null;
      this.gainNode = null;
      this.isScratching = false;
      this.lastScratchTime = 0;
    }

    init() {
      if (!this.ctx) {
        const AudioClass = window.AudioContext || window.webkitAudioContext;
        if (AudioClass) {
          this.ctx = new AudioClass();
          this.setupNoiseGenerator();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    // Synthesize physical metallic coin scratching texture via filtered white noise
    setupNoiseGenerator() {
      if (!this.ctx) return;
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);

      // Generate pink/white noise with grain variation
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * 0.4;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Bandpass filter to simulate metallic coin against foil card
      this.filterNode = this.ctx.createBiquadFilter();
      this.filterNode.type = 'bandpass';
      this.filterNode.frequency.setValueAtTime(2600, this.ctx.currentTime);
      this.filterNode.Q.setValueAtTime(3.2, this.ctx.currentTime);

      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.0001, this.ctx.currentTime);

      whiteNoise.connect(this.filterNode);
      this.filterNode.connect(this.gainNode);
      this.gainNode.connect(this.ctx.destination);

      whiteNoise.start(0);
      this.noiseNode = whiteNoise;
    }

    playScratchTone(speed = 1) {
      if (!isSoundEnabled) return;
      this.init();
      if (!this.gainNode || !this.ctx) return;

      const now = this.ctx.currentTime;
      // Modulate frequency slightly with scratch speed
      const targetFreq = 2200 + Math.min(speed * 35, 1200);
      this.filterNode.frequency.cancelScheduledValues(now);
      this.filterNode.frequency.setValueAtTime(targetFreq, now);

      this.gainNode.gain.cancelScheduledValues(now);
      this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, now);
      this.gainNode.gain.linearRampToValueAtTime(0.14, now + 0.03);
      this.gainNode.gain.linearRampToValueAtTime(0.0001, now + 0.16);
    }

    playRevealFanfare() {
      if (!isSoundEnabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      // Sparkling magical arpeggio (Cmaj9: C5, E5, G5, B5, D6)
      const freqs = [523.25, 659.25, 783.99, 987.77, 1174.66];

      freqs.forEach((freq, idx) => {
        const t = now + idx * 0.08;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.exponentialRampToValueAtTime(0.24, t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.7);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t);
        osc.stop(t + 0.75);
      });
    }

    playGrandTriumph() {
      if (!isSoundEnabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      // Majestic chord burst (G - C - E - G - C6)
      const chords = [
        { f: 392.00, delay: 0.0 },
        { f: 523.25, delay: 0.1 },
        { f: 659.25, delay: 0.2 },
        { f: 783.99, delay: 0.3 },
        { f: 1046.50, delay: 0.4 },
        { f: 1318.51, delay: 0.5 }
      ];

      chords.forEach(c => {
        const t = now + c.delay;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(c.f, t);

        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.exponentialRampToValueAtTime(0.28, t + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t);
        osc.stop(t + 1.3);
      });
    }
  }

  const soundEngine = new ScratchAudio();

  /* ==========================================================================
     3. TOAST NOTIFICATION UTILITY
     ========================================================================== */
  let toastTimer = null;
  function showToast(message, icon = '✨') {
    let toast = document.getElementById('scratch-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'scratch-toast';
      toast.className = 'scratch-toast';
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
          revealedSet = new Set(parsed.filter(id => id >= 1 && id <= 3));
        }
      }
    } catch (e) {
      console.warn('Could not read scratch progress:', e);
      revealedSet = new Set();
    }
  }

  function saveProgress() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(revealedSet)));
    } catch (e) {
      console.warn('Could not save scratch progress:', e);
    }
  }

  /* ==========================================================================
     5. TRACKER & PROGRESS BAR UPDATES
     ========================================================================== */
  const countEl = document.getElementById('revealed-count');
  const fillEl = document.getElementById('progress-fill');

  function updateTrackerUI(triggerGrandFanfare = false) {
    const total = COUPONS_DATA.length; // 3
    const count = revealedSet.size;
    const pct = Math.round((count / total) * 100);

    if (countEl) countEl.textContent = count;
    if (fillEl) fillEl.style.width = pct + '%';

    if (count === total && triggerGrandFanfare) {
      setTimeout(() => {
        soundEngine.playGrandTriumph();
        showToast('All 3 Golden Love Coupons Unlocked! 👑💖', '🎉');
        triggerScreenWideConfetti();
      }, 600);
    }
  }

  /* ==========================================================================
     6. FOIL CANVAS RENDERING ENGINE (PROCEDURAL METALLIC FOIL)
     ========================================================================== */
  function drawFoilLayer(canvas, ctx, coupon) {
    const w = canvas.width;
    const h = canvas.height;
    const dpr = window.devicePixelRatio || 1;
    const displayW = w / dpr;
    const displayH = h / dpr;

    ctx.save();
    ctx.clearRect(0, 0, w, h);

    // 1. Rich metallic gradient
    const grad = ctx.createLinearGradient(0, 0, displayW, displayH);
    const stops = coupon.gradientStops;
    stops.forEach((color, idx) => {
      grad.addColorStop(idx / (stops.length - 1), color);
    });

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, displayW, displayH);

    // 2. Procedural gold foil grain & micro-sparkles
    const grainCount = Math.floor((displayW * displayH) / 80);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    for (let i = 0; i < grainCount; i++) {
      const rx = Math.random() * displayW;
      const ry = Math.random() * displayH;
      const rsize = Math.random() * 1.6 + 0.4;
      ctx.fillRect(rx, ry, rsize, rsize);
    }

    // Darker foil texture flecks
    ctx.fillStyle = 'rgba(60, 30, 0, 0.12)';
    for (let i = 0; i < grainCount / 2; i++) {
      const rx = Math.random() * displayW;
      const ry = Math.random() * displayH;
      const rsize = Math.random() * 2 + 0.5;
      ctx.fillRect(rx, ry, rsize, rsize);
    }

    // 3. Diagonal luxury security guilloche watermark
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.16)';
    ctx.lineWidth = 1;
    const step = 14;
    for (let x = -displayH; x < displayW + displayH; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + displayH, displayH);
      ctx.stroke();
    }
    ctx.restore();

    // 4. Stamped Gold Leaf Outer & Inner Border
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.lineWidth = 2.5;
    ctx.strokeRect(12, 12, displayW - 24, displayH - 24);

    ctx.strokeStyle = 'rgba(120, 60, 10, 0.35)';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 4]);
    ctx.strokeRect(17, 17, displayW - 34, displayH - 34);
    ctx.setLineDash([]);
    ctx.restore();

    // 5. Corner decorative florets
    const drawCornerStar = (cx, cy) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.fillStyle = '#fff9e6';
      ctx.font = '10px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('❖', 0, 0);
      ctx.restore();
    };
    drawCornerStar(14, 14);
    drawCornerStar(displayW - 14, 14);
    drawCornerStar(14, displayH - 14);
    drawCornerStar(displayW - 14, displayH - 14);

    // 6. Center Foil Medallion / Badge
    const midX = displayW / 2;
    const midY = displayH / 2;

    // Outer circle
    ctx.save();
    ctx.beginPath();
    ctx.arc(midX, midY - 20, 52, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.22)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Inner circle
    ctx.beginPath();
    ctx.arc(midX, midY - 20, 44, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(43, 14, 30, 0.15)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(120, 60, 10, 0.35)';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();

    // Medallion icon
    ctx.save();
    ctx.font = '28px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🪙', midX, midY - 20);
    ctx.restore();

    // Foil Stamped Typography
    ctx.save();
    ctx.textAlign = 'center';

    // Header label
    ctx.font = 'bold 11px "Cinzel", Georgia, serif';
    ctx.fillStyle = 'rgba(43, 14, 30, 0.85)';
    ctx.letterSpacing = '2px';
    ctx.fillText('✦ GOLDEN LOVE VOUCHER ✦', midX, midY + 48);

    // Title
    ctx.font = 'bold 15px "Cinzel", Georgia, serif';
    ctx.fillStyle = '#2b0e1e';
    ctx.fillText(`SCRATCH TICKET #${coupon.id}`, midX, midY + 70);

    // Prompt
    ctx.font = 'italic 12px "Playfair Display", Georgia, serif';
    ctx.fillStyle = 'rgba(43, 14, 30, 0.8)';
    ctx.fillText('Rub with your finger or pointer to reveal ✨', midX, midY + 92);

    // Serial badge at bottom
    ctx.font = 'bold 10px "Space Mono", monospace';
    ctx.fillStyle = 'rgba(43, 14, 30, 0.65)';
    ctx.fillText(`KEY: ${coupon.serial} · SPIDY & ADITI`, midX, displayH - 24);

    ctx.restore();
    ctx.restore();
  }

  /* ==========================================================================
     7. SCRATCH CONTROLLER PER CARD
     ========================================================================== */
  class ScratchCardController {
    constructor(coupon, cardEl) {
      this.coupon = coupon;
      this.cardEl = cardEl;
      this.containerEl = cardEl.querySelector('.scratch-canvas-container');
      this.canvas = cardEl.querySelector('.scratch-canvas');
      this.ctx = null;
      this.stampEl = cardEl.querySelector('.unlocked-stamp');
      this.accBtn = cardEl.querySelector('.accessible-btn');

      this.isScratching = false;
      this.isRevealed = false;
      this.lastPos = null;
      this.scratchDistance = 0;
      this.dpr = window.devicePixelRatio || 1;
      this.checkTimer = null;

      this.init();
    }

    init() {
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });
      this.setupCanvasSize();
      this.bindEvents();

      // Check if already revealed from storage
      if (revealedSet.has(this.coupon.id)) {
        this.markAsAlreadyRevealed();
      } else {
        this.renderFoil();
      }
    }

    setupCanvasSize() {
      const rect = this.cardEl.getBoundingClientRect();
      const w = Math.floor(rect.width);
      const h = Math.floor(rect.height);

      this.canvas.width = w * this.dpr;
      this.canvas.height = h * this.dpr;
      this.canvas.style.width = w + 'px';
      this.canvas.style.height = h + 'px';

      this.ctx.scale(this.dpr, this.dpr);
    }

    renderFoil() {
      this.isRevealed = false;
      this.containerEl.classList.remove('cleared', 'scratching');
      this.cardEl.classList.remove('revealed');
      if (this.stampEl) this.stampEl.classList.remove('slammed');
      drawFoilLayer(this.canvas, this.ctx, this.coupon);
    }

    markAsAlreadyRevealed() {
      this.isRevealed = true;
      this.cardEl.classList.add('revealed');
      this.containerEl.classList.add('cleared');
      if (this.stampEl) this.stampEl.classList.add('slammed');
    }

    bindEvents() {
      // Pointer down
      this.canvas.addEventListener('pointerdown', (e) => {
        if (this.isRevealed) return;
        this.isScratching = true;
        this.containerEl.classList.add('scratching');
        this.canvas.setPointerCapture(e.pointerId);

        const pos = this.getPointerPos(e);
        this.lastPos = pos;
        this.scratchAt(pos.x, pos.y);

        soundEngine.init();
        soundEngine.playScratchTone(1.2);
        updateCursorCoin(e.clientX, e.clientY, true);
      });

      // Pointer move
      this.canvas.addEventListener('pointermove', (e) => {
        if (!this.isScratching || this.isRevealed) return;
        const currentPos = this.getPointerPos(e);

        if (this.lastPos) {
          const dx = currentPos.x - this.lastPos.x;
          const dy = currentPos.y - this.lastPos.y;
          const dist = Math.hypot(dx, dy);
          this.scratchDistance += dist;

          this.scratchLine(this.lastPos.x, this.lastPos.y, currentPos.x, currentPos.y);
          soundEngine.playScratchTone(dist);
        }

        this.lastPos = currentPos;
        updateCursorCoin(e.clientX, e.clientY, true);

        // Throttle progress check
        this.scheduleProgressCheck();
      });

      // Pointer up / leave / cancel
      const stopScratching = (e) => {
        if (!this.isScratching) return;
        this.isScratching = false;
        this.lastPos = null;
        this.containerEl.classList.remove('scratching');
        updateCursorCoin(0, 0, false);
        try {
          if (e && e.pointerId && this.canvas.hasPointerCapture(e.pointerId)) {
            this.canvas.releasePointerCapture(e.pointerId);
          }
        } catch (_) {}

        this.checkProgressImmediately();
      };

      this.canvas.addEventListener('pointerup', stopScratching);
      this.canvas.addEventListener('pointercancel', stopScratching);

      // Accessible button
      if (this.accBtn) {
        this.accBtn.addEventListener('click', () => {
          this.revealCoupon();
        });
      }
    }

    getPointerPos(e) {
      const rect = this.canvas.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }

    // Dynamic Brush Scratching with soft feathered edge
    scratchAt(x, y) {
      this.ctx.save();
      this.ctx.globalCompositeOperation = 'destination-out';

      // Natural jitter radius
      const radius = 24 + Math.sin(this.scratchDistance * 0.15) * 5 + Math.random() * 3;

      const grad = this.ctx.createRadialGradient(x, y, 0, x, y, radius);
      grad.addColorStop(0, 'rgba(0, 0, 0, 1)');
      grad.addColorStop(0.75, 'rgba(0, 0, 0, 0.95)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      this.ctx.fillStyle = grad;
      this.ctx.beginPath();
      this.ctx.arc(x, y, radius, 0, Math.PI * 2);
      this.ctx.fill();

      this.ctx.restore();
    }

    // Connect points along line so quick drags don't leave hollow gaps
    scratchLine(x1, y1, x2, y2) {
      const dist = Math.hypot(x2 - x1, y2 - y1);
      const step = 6;
      const steps = Math.max(Math.floor(dist / step), 1);

      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const x = x1 + (x2 - x1) * t;
        const y = y1 + (y2 - y1) * t;
        this.scratchAt(x, y);
      }
    }

    scheduleProgressCheck() {
      if (this.checkTimer) return;
      this.checkTimer = setTimeout(() => {
        this.checkTimer = null;
        this.calculateScratchedPercentage();
      }, 160);
    }

    checkProgressImmediately() {
      if (this.checkTimer) {
        clearTimeout(this.checkTimer);
        this.checkTimer = null;
      }
      this.calculateScratchedPercentage();
    }

    // Read pixel alpha channel with 16px stride for 60fps calculation speed
    calculateScratchedPercentage() {
      if (this.isRevealed) return;

      const w = this.canvas.width;
      const h = this.canvas.height;
      if (w === 0 || h === 0) return;

      try {
        const imgData = this.ctx.getImageData(0, 0, w, h);
        const data = imgData.data;
        const stride = 16 * 4; // Check every 16th pixel
        let cleared = 0;
        let total = 0;

        for (let i = 3; i < data.length; i += stride) {
          total++;
          if (data[i] < 64) { // Alpha is mostly transparent
            cleared++;
          }
        }

        const ratio = cleared / total;
        if (ratio >= SCRATCH_THRESHOLD) {
          this.revealCoupon();
        }
      } catch (e) {
        console.warn('Pixel read error:', e);
      }
    }

    revealCoupon() {
      if (this.isRevealed) return;
      this.isRevealed = true;

      // Add to state & storage
      revealedSet.add(this.coupon.id);
      saveProgress();

      // Visual animations
      this.containerEl.classList.add('cleared');
      this.cardEl.classList.add('revealed');

      if (this.stampEl) {
        setTimeout(() => {
          this.stampEl.classList.add('slammed');
        }, 150);
      }

      // Audio & Celebration
      soundEngine.playRevealFanfare();
      showToast(`Coupon #${this.coupon.id} Uncovered: “${this.coupon.name}” 💖`, '🎟️');

      // Card-specific confetti burst
      const rect = this.cardEl.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      spawnCardBurst(centerX, centerY, 38);

      // Update tracker
      updateTrackerUI(true);
    }
  }

  /* ==========================================================================
     8. GLOBAL CONTROLLERS & ACTIONS
     ========================================================================== */
  const cardControllers = [];

  function initScratchCards() {
    cardControllers.length = 0;
    COUPONS_DATA.forEach(coupon => {
      const cardEl = document.getElementById(`coupon-card-${coupon.id}`);
      if (cardEl) {
        const ctrl = new ScratchCardController(coupon, cardEl);
        cardControllers.push(ctrl);
      }
    });
  }

  // Quick Scratch All button
  const btnScratchAll = document.getElementById('btn-scratch-all');
  if (btnScratchAll) {
    btnScratchAll.addEventListener('click', () => {
      soundEngine.init();
      let delay = 0;

      cardControllers.forEach(ctrl => {
        if (!ctrl.isRevealed) {
          setTimeout(() => {
            ctrl.revealCoupon();
          }, delay);
          delay += 250;
        }
      });

      if (delay === 0) {
        showToast('All 3 coupons are already revealed! 👑', '✨');
      }
    });
  }

  // Scratch Again (Re-Foil) button
  const btnReFoil = document.getElementById('btn-refoil');
  if (btnReFoil) {
    btnReFoil.addEventListener('click', () => {
      soundEngine.init();
      revealedSet.clear();
      saveProgress();
      updateTrackerUI(false);

      cardControllers.forEach(ctrl => {
        ctrl.renderFoil();
      });

      soundEngine.playRevealFanfare();
      showToast('Coupons re-foiled with gold! Scratch them again 🪙', '🔄');
    });
  }

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
        soundEngine.playScratchTone(1);
      } else {
        soundBtn.classList.add('muted');
        if (soundText) soundText.textContent = 'Sound Effects OFF';
        if (soundIcon) soundIcon.textContent = '🔇';
      }
    });
  }

  /* ==========================================================================
     9. SCRATCH CURSOR COIN EFFECT
     ========================================================================== */
  const cursorCoin = document.getElementById('scratch-coin');
  let cursorCoinActive = false;

  function updateCursorCoin(clientX, clientY, active) {
    if (!cursorCoin) return;
    if (active) {
      cursorCoin.style.left = clientX + 'px';
      cursorCoin.style.top = clientY + 'px';
      if (!cursorCoinActive) {
        cursorCoin.classList.add('active');
        cursorCoinActive = true;
      }
    } else {
      if (cursorCoinActive) {
        cursorCoin.classList.remove('active');
        cursorCoinActive = false;
      }
    }
  }

  // Track global pointer for coin hover over coupons
  document.addEventListener('pointermove', (e) => {
    const isOverFoil = e.target.closest('.scratch-canvas-container:not(.cleared)');
    if (isOverFoil) {
      updateCursorCoin(e.clientX, e.clientY, true);
    } else if (!isOverFoil && !cardControllers.some(c => c.isScratching)) {
      updateCursorCoin(0, 0, false);
    }
  });

  /* ==========================================================================
     10. AMBIENT PARTICLES & CONFETTI BURST ENGINE
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

    // Spawn 65 floating gold specks & rose petals
    particles.length = 0;
    const colors = ['#dfa13d', '#ffd166', '#fca5bb', '#f472b6', '#fff4cc'];
    for (let i = 0; i < 65; i++) {
      particles.push({
        x: Math.random() * canvasAmbient.width,
        y: Math.random() * canvasAmbient.height,
        size: Math.random() * 3.5 + 1.2,
        speedY: Math.random() * 0.6 + 0.3,
        speedX: Math.sin(Math.random() * 3) * 0.4,
        osc: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.6 + 0.25,
        isPetal: Math.random() > 0.65,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.03
      });
    }

    animateAmbient();
  }

  function spawnCardBurst(originX, originY, count = 35) {
    const colors = ['#dfa13d', '#fde08b', '#e84a78', '#ff758f', '#fff2b2', '#ffffff'];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 9 + 4;
      burstParticles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3,
        size: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        decay: Math.random() * 0.025 + 0.015,
        gravity: 0.22,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.15,
        isHeart: Math.random() > 0.7
      });
    }
  }

  function triggerScreenWideConfetti() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    spawnCardBurst(w * 0.25, h * 0.4, 50);
    spawnCardBurst(w * 0.5, h * 0.35, 60);
    spawnCardBurst(w * 0.75, h * 0.4, 50);
  }

  function animateAmbient() {
    if (!ctxAmbient) return;
    const w = canvasAmbient.width;
    const h = canvasAmbient.height;

    ctxAmbient.clearRect(0, 0, w, h);

    // 1. Ambient Background Particles
    particles.forEach(p => {
      p.osc += 0.02;
      p.x += p.speedX + Math.sin(p.osc) * 0.35;
      p.y += p.speedY;
      p.rot += p.rotSpeed;

      if (p.y > h + 15) {
        p.y = -15;
        p.x = Math.random() * w;
      }
      if (p.x > w + 15) p.x = -15;
      if (p.x < -15) p.x = w + 15;

      ctxAmbient.save();
      ctxAmbient.translate(p.x, p.y);
      ctxAmbient.rotate(p.rot);
      ctxAmbient.globalAlpha = p.opacity;

      if (p.isPetal) {
        ctxAmbient.fillStyle = p.color;
        ctxAmbient.beginPath();
        ctxAmbient.moveTo(0, 0);
        ctxAmbient.bezierCurveTo(p.size, -p.size * 1.5, p.size * 2, -p.size * 0.8, 0, p.size * 2);
        ctxAmbient.bezierCurveTo(-p.size * 2, -p.size * 0.8, -p.size, -p.size * 1.5, 0, 0);
        ctxAmbient.fill();
      } else {
        ctxAmbient.fillStyle = p.color;
        ctxAmbient.beginPath();
        ctxAmbient.arc(0, 0, p.size, 0, Math.PI * 2);
        ctxAmbient.fill();
      }

      ctxAmbient.restore();
    });

    // 2. Celebration Bursts
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
        ctxAmbient.fillText('💖', 0, 0);
      } else {
        ctxAmbient.fillStyle = b.color;
        ctxAmbient.fillRect(-b.size / 2, -b.size / 2, b.size, b.size * 1.4);
      }

      ctxAmbient.restore();
    }

    requestAnimationFrame(animateAmbient);
  }

  /* ==========================================================================
     11. INITIALIZATION ON DOM READY
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    loadSavedProgress();
    initScratchCards();
    updateTrackerUI(false);
    initAmbientCanvas();

    // Resize listener to re-scale canvas dimensions cleanly
    let resizeTimer = null;
    window.addEventListener('resize', () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        cardControllers.forEach(ctrl => {
          ctrl.setupCanvasSize();
          if (!ctrl.isRevealed) {
            ctrl.renderFoil();
          }
        });
      }, 200);
    });

    // User gesture unlock for audio
    const unlockAudio = () => {
      soundEngine.init();
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };
    window.addEventListener('pointerdown', unlockAudio, { passive: true });
    window.addEventListener('keydown', unlockAudio, { passive: true });
  });

})();
