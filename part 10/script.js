/**
 * PART 10 — A BIRTHDAY LOVE LETTER FOR ADITI
 * Realistic 3D Spiral Notebook with Smooth Page Turn Physics
 * For Aditi Soni · Turning 17 (DOB: 16 Dec 2009)
 * From: yours spidy 🕸️❤️
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. APP STATE & CONFIGURATION
     ========================================================================== */
  const TOTAL_PAGES = 5;
  let currentPage = 1;
  let isAnimating = false;
  let isSoundEnabled = true;
  let autoReadInterval = null;
  let isAutoReading = false;

  /* ==========================================================================
     2. PURE WEB AUDIO SYNTHESIZER (REALISTIC PAPER TURN & CHIMES)
     ========================================================================== */
  class BookAudio {
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

    // Realistic paper rustle & slide whoosh
    playPageTurnSound() {
      if (!isSoundEnabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;

      // 1. Filtered noise burst for paper friction
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.28);
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * 0.3;
      }

      const noiseSource = this.ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, now);
      filter.frequency.exponentialRampToValueAtTime(750, now + 0.25);
      filter.Q.setValueAtTime(2.2, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.18, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.26);

      noiseSource.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noiseSource.start(now);
      noiseSource.stop(now + 0.28);

      // 2. Gentle soft parchment settling thud
      const thud = this.ctx.createOscillator();
      const thudGain = this.ctx.createGain();

      thud.type = 'triangle';
      thud.frequency.setValueAtTime(120, now + 0.08);
      thud.frequency.exponentialRampToValueAtTime(55, now + 0.22);

      thudGain.gain.setValueAtTime(0.001, now + 0.08);
      thudGain.gain.exponentialRampToValueAtTime(0.12, now + 0.12);
      thudGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

      thud.connect(thudGain);
      thudGain.connect(this.ctx.destination);

      thud.start(now + 0.08);
      thud.stop(now + 0.26);
    }

    // Celebration Kalimba chords on reaching Page 5
    playFinalBlessingChime() {
      if (!isSoundEnabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      // Dreamy romantic notes: G4, C5, E5, G5, C6
      const notes = [392.00, 523.25, 659.25, 783.99, 1046.50];

      notes.forEach((freq, idx) => {
        const t = now + idx * 0.12;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.exponentialRampToValueAtTime(0.24, t + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.9);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t);
        osc.stop(t + 0.95);
      });
    }
  }

  const soundEngine = new BookAudio();

  /* ==========================================================================
     3. TOAST NOTIFICATION UTILITY
     ========================================================================= */
  let toastTimer = null;
  function showToast(message, icon = '📖') {
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
     4. PAGE TURN CONTROLLER & 3D ANIMATION ENGINE
     ========================================================================== */
  const pageNumEl = document.getElementById('current-page-num');
  const progressFillEl = document.getElementById('reading-progress-fill');
  const btnPrev = document.getElementById('btn-prev-page');
  const btnNext = document.getElementById('btn-next-page');
  const bookmarkTabs = document.querySelectorAll('.bookmark-tab');

  function updateNavigationUI() {
    // 1. Page text & Progress bar
    if (pageNumEl) pageNumEl.textContent = `Page ${currentPage}`;
    if (progressFillEl) {
      const pct = (currentPage / TOTAL_PAGES) * 100;
      progressFillEl.style.width = `${pct}%`;
    }

    // 2. Buttons state
    if (btnPrev) btnPrev.disabled = (currentPage === 1);
    if (btnNext) btnNext.disabled = (currentPage === TOTAL_PAGES);

    // 3. Bookmarks highlight
    bookmarkTabs.forEach(tab => {
      const pageIndex = parseInt(tab.getAttribute('data-page'), 10);
      if (pageIndex === currentPage) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    // 4. Special toast on final page
    if (currentPage === TOTAL_PAGES) {
      soundEngine.playFinalBlessingChime();
      showToast('You’ve reached the final page · Happy Birthday Aditi! 👑💖', '💌');
    }
  }

  // Turn to Next Page (Sheet currentPage flips to the left)
  function flipForward() {
    if (currentPage >= TOTAL_PAGES || isAnimating) return;
    isAnimating = true;

    soundEngine.playPageTurnSound();
    const sheet = document.getElementById(`sheet-${currentPage}`);

    if (sheet) {
      sheet.classList.add('is-turning');
      sheet.classList.add('is-flipped');

      setTimeout(() => {
        sheet.classList.remove('is-turning');
        isAnimating = false;
      }, 850);
    } else {
      isAnimating = false;
    }

    currentPage++;
    updateNavigationUI();
  }

  // Turn to Previous Page (Sheet currentPage - 1 unflips back to right)
  function flipBackward() {
    if (currentPage <= 1 || isAnimating) return;
    isAnimating = true;

    soundEngine.playPageTurnSound();
    const prevPage = currentPage - 1;
    const sheet = document.getElementById(`sheet-${prevPage}`);

    if (sheet) {
      sheet.classList.add('is-turning');
      sheet.classList.remove('is-flipped');

      setTimeout(() => {
        sheet.classList.remove('is-turning');
        isAnimating = false;
      }, 850);
    } else {
      isAnimating = false;
    }

    currentPage--;
    updateNavigationUI();
  }

  // Jump to specific page smoothly
  function jumpToPage(targetPage) {
    if (targetPage === currentPage || isAnimating) return;
    if (targetPage < 1 || targetPage > TOTAL_PAGES) return;

    soundEngine.playPageTurnSound();

    if (targetPage > currentPage) {
      // Fast cascade forward
      let delay = 0;
      for (let p = currentPage; p < targetPage; p++) {
        setTimeout(() => {
          const sheet = document.getElementById(`sheet-${p}`);
          if (sheet) sheet.classList.add('is-flipped');
        }, delay);
        delay += 120;
      }
    } else {
      // Fast cascade backward
      let delay = 0;
      for (let p = currentPage - 1; p >= targetPage; p--) {
        setTimeout(() => {
          const sheet = document.getElementById(`sheet-${p}`);
          if (sheet) sheet.classList.remove('is-flipped');
        }, delay);
        delay += 120;
      }
    }

    currentPage = targetPage;
    updateNavigationUI();
  }

  /* ==========================================================================
     5. AUTO-READ MODE (GENTLE HANDS-FREE READING)
     ========================================================================== */
  const btnAutoRead = document.getElementById('btn-auto-read');

  function toggleAutoRead() {
    soundEngine.init();

    if (isAutoReading) {
      stopAutoRead();
      showToast('Auto-Read paused ⏸️', '📖');
    } else {
      startAutoRead();
      showToast('Auto-Read started! Relax and enjoy reading ⏳', '✨');
    }
  }

  function startAutoRead() {
    isAutoReading = true;
    if (btnAutoRead) {
      btnAutoRead.classList.add('active');
      const text = btnAutoRead.querySelector('.auto-text');
      if (text) text.textContent = 'Pause Auto';
    }

    if (currentPage === TOTAL_PAGES) {
      jumpToPage(1);
    }

    autoReadInterval = setInterval(() => {
      if (currentPage < TOTAL_PAGES) {
        flipForward();
      } else {
        stopAutoRead();
      }
    }, 8500); // 8.5 seconds per page for gentle reading
  }

  function stopAutoRead() {
    isAutoReading = false;
    if (autoReadInterval) {
      clearInterval(autoReadInterval);
      autoReadInterval = null;
    }
    if (btnAutoRead) {
      btnAutoRead.classList.remove('active');
      const text = btnAutoRead.querySelector('.auto-text');
      if (text) text.textContent = 'Auto-Read';
    }
  }

  /* ==========================================================================
     6. EVENT LISTENERS & TOUCH GESTURES
     ========================================================================== */
  function bindBookEvents() {
    // Next & Prev Buttons
    if (btnNext) btnNext.addEventListener('click', flipForward);
    if (btnPrev) btnPrev.addEventListener('click', flipBackward);

    // Auto-Read Button
    if (btnAutoRead) btnAutoRead.addEventListener('click', toggleAutoRead);

    // Dog-Ear Curl Corners on each page
    for (let i = 1; i <= 4; i++) {
      const curl = document.getElementById(`curl-${i}`);
      if (curl) {
        curl.addEventListener('click', (e) => {
          e.stopPropagation();
          flipForward();
        });
      }
    }

    // Transparent click zones on right/left halves of notebook
    const triggerNext = document.getElementById('trigger-next-area');
    const triggerPrev = document.getElementById('trigger-prev-area');
    if (triggerNext) triggerNext.addEventListener('click', flipForward);
    if (triggerPrev) triggerPrev.addEventListener('click', flipBackward);

    // Bookmark Tabs
    bookmarkTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        stopAutoRead();
        const page = parseInt(tab.getAttribute('data-page'), 10);
        jumpToPage(page);
      });
    });

    // Keyboard Arrow navigation
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        stopAutoRead();
        flipForward();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        stopAutoRead();
        flipBackward();
      }
    });

    // Mobile Touch Swipe Handling
    const notebookBook = document.getElementById('notebook-book');
    if (notebookBook) {
      let touchStartX = 0;
      let touchStartY = 0;

      notebookBook.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
        }
      }, { passive: true });

      notebookBook.addEventListener('touchend', (e) => {
        if (e.changedTouches.length === 1) {
          const touchEndX = e.changedTouches[0].clientX;
          const touchEndY = e.changedTouches[0].clientY;
          const diffX = touchEndX - touchStartX;
          const diffY = touchEndY - touchStartY;

          // Horizontal swipe threshold
          if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
            stopAutoRead();
            if (diffX < 0) {
              flipForward(); // Swiped left -> Next page
            } else {
              flipBackward(); // Swiped right -> Previous page
            }
          }
        }
      }, { passive: true });
    }
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
        soundEngine.playPageTurnSound();
      } else {
        soundBtn.classList.add('muted');
        if (soundText) soundText.textContent = 'Sound Effects OFF';
        if (soundIcon) soundIcon.textContent = '🔇';
      }
    });
  }

  /* ==========================================================================
     7. AMBIENT PARTICLES CANVAS
     ========================================================================== */
  const canvasAmbient = document.getElementById('ambient-canvas');
  let ctxAmbient = null;
  const particles = [];

  function initAmbientCanvas() {
    if (!canvasAmbient) return;
    ctxAmbient = canvasAmbient.getContext('2d');

    const handleResize = () => {
      canvasAmbient.width = window.innerWidth;
      canvasAmbient.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    particles.length = 0;
    const colors = ['#dfa13d', '#fca5bb', '#ffd166', '#f472b6', '#fff5ea'];

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvasAmbient.width,
        y: Math.random() * canvasAmbient.height,
        size: Math.random() * 4 + 1.5,
        speedY: Math.random() * 0.5 + 0.2,
        speedX: Math.sin(Math.random() * 3) * 0.35,
        osc: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.6 + 0.25,
        isPetal: Math.random() > 0.65,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02
      });
    }

    animateAmbient();
  }

  function animateAmbient() {
    if (!ctxAmbient) return;
    const w = canvasAmbient.width;
    const h = canvasAmbient.height;

    ctxAmbient.clearRect(0, 0, w, h);

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
        ctxAmbient.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctxAmbient.fill();
      }

      ctxAmbient.restore();
    });

    requestAnimationFrame(animateAmbient);
  }

  /* ==========================================================================
     8. INITIALIZATION ON DOM READY
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    updateNavigationUI();
    bindBookEvents();
    initAmbientCanvas();

    // First user gesture unlocks Web Audio
    const unlockAudio = () => {
      soundEngine.init();
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };
    window.addEventListener('pointerdown', unlockAudio, { passive: true });
    window.addEventListener('keydown', unlockAudio, { passive: true });
  });

})();
