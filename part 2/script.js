/**
 * Cupid's Arrow & Balloon Surprise - Part 02
 * Dark Purplish Velvet Luxury Night Theme
 * Interactive Archery, Dynamic SVG Bowstring, Arrow Flight Physics,
 * Playful Balloon Squish/Bounce, Gift Box Reveal & Pure Web Audio API.
 * Built with love for Aditi Soni.
 */

(() => {
  'use strict';

  // --- AUDIO SYNTHESIZER (Pure Web Audio API - Zero External Dependencies) ---
  class SoundFX {
    constructor() {
      this.ctx = null;
      this.enabled = true;
      this.lastTensionTime = 0;
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

    // Playful cute squeak when balloon is tapped directly
    playSqueak() {
      if (!this.enabled) return;
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(480, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(840, this.ctx.currentTime + 0.12);
      osc.frequency.exponentialRampToValueAtTime(320, this.ctx.currentTime + 0.22);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.25);
    }

    // Subtle bowstring tension creak while drawing back
    playTension() {
      if (!this.enabled) return;
      const now = performance.now();
      if (now - this.lastTensionTime < 130) return;
      this.lastTensionTime = now;

      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(150 + Math.random() * 40, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(190, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.06);
    }

    // Arrow release whoosh (air slice)
    playArrowRelease() {
      if (!this.enabled) return;
      this.init();

      const bufferSize = this.ctx.sampleRate * 0.25;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.08));
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1300, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(450, this.ctx.currentTime + 0.2);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.32, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.22);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start();
    }

    // Balloon burst pop sound
    playPop() {
      if (!this.enabled) return;
      this.init();

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(360, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(55, this.ctx.currentTime + 0.13);

      gain.gain.setValueAtTime(0.38, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    }

    // Celebratory romantic fanfare & bell arpeggio
    playCelebration() {
      if (!this.enabled) return;
      this.init();

      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98]; // C5, E5, G5, C6, E6, G6
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const osc2 = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

          osc2.type = 'triangle';
          osc2.frequency.setValueAtTime(freq * 2, this.ctx.currentTime);

          gain.gain.setValueAtTime(0.24, this.ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.7);

          osc.connect(gain);
          osc2.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start();
          osc2.start();
          osc.stop(this.ctx.currentTime + 0.7);
          osc2.stop(this.ctx.currentTime + 0.7);
        }, idx * 100);
      });
    }
  }

  const sound = new SoundFX();

  // --- BURST CONFETTI & HEARTS PARTICLE ENGINE ---
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

    burstAt(x, y) {
      const colors = ['#ff598e', '#ffd1dc', '#f5c469', '#ffffff', '#e02462', '#ff99c8', '#a855f7'];
      const shapes = ['circle', 'rect', 'heart', 'ribbon'];

      for (let i = 0; i < 130; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 17 + 5;
        this.particles.push({
          x: x,
          y: y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 2.8,
          size: Math.random() * 9 + 6,
          color: colors[Math.floor(Math.random() * colors.length)],
          shape: shapes[Math.floor(Math.random() * shapes.length)],
          rot: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.25,
          opacity: 1.0,
          gravity: 0.32
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

        if (p.opacity <= 0 || p.y > this.canvas.height + 60) {
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
        } else if (p.shape === 'ribbon') {
          this.ctx.fillRect(-p.size, -2, p.size * 2, 4);
        } else if (p.shape === 'heart') {
          this.drawHeart(0, 0, p.size * 0.85);
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

  // --- ARCHERY STAGE CONTROLLER ---
  class ArcheryStage {
    constructor() {
      this.arena = document.getElementById('archery-arena');
      this.svgLayer = document.getElementById('archery-svg');
      this.bowString = document.getElementById('bow-string-path');
      this.bowGroup = document.getElementById('bow-group');
      this.bowFinialTop = document.getElementById('bow-finial-top');
      this.bowFinialBottom = document.getElementById('bow-finial-bottom');
      this.arrowGroup = document.getElementById('arrow-group');
      this.trajectoryPath = document.getElementById('trajectory-path');
      this.balloonContainer = document.getElementById('balloon-container');
      this.balloonToast = document.getElementById('balloon-toast');
      this.revealModal = document.getElementById('reveal-modal');
      this.btnReset = document.getElementById('btn-reset');
      this.tensionMeter = document.getElementById('tension-meter');
      this.tensionFill = document.getElementById('tension-fill');

      // Bow curves forward towards target at X=238 (grip), with string resting at X=165
      this.bowRestX = 165;
      this.bowTopY = 120;
      this.bowBottomY = 480;
      this.bowCenterY = 300;
      this.arrowLength = 210;

      this.isDragging = false;
      this.isFlying = false;
      this.isPopped = false;
      this.currentX = this.bowRestX;
      this.currentY = this.bowCenterY;

      this.toastTimer = null;

      this.initEvents();
      this.initStarField();
      this.resetArrow();
    }

    initStarField() {
      const starField = document.getElementById('star-field');
      if (!starField) return;
      const count = 38;
      for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 2.8 + 1.2;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.setProperty('--twinkle-dur', `${Math.random() * 3 + 2}s`);
        star.style.animationDelay = `${Math.random() * 3}s`;
        starField.appendChild(star);
      }
    }

    initEvents() {
      // 1. Balloon Direct Tap (Does NOT burst! Plays playful bounce & tooltip)
      this.balloonContainer.addEventListener('click', (e) => {
        if (this.isPopped) return;
        e.stopPropagation();

        // Cute squish bounce animation
        this.balloonContainer.classList.remove('wobble');
        void this.balloonContainer.offsetWidth; // trigger reflow
        this.balloonContainer.classList.add('wobble');

        sound.playSqueak();
        if (navigator.vibrate) navigator.vibrate(25);

        // Show teasing toast tooltip
        this.showBalloonToast();
      });

      // 2. Pointer Drag Interaction for Bow and Arrow
      const onPointerDown = (e) => {
        if (this.isFlying || this.isPopped) return;
        this.isDragging = true;
        this.arrowGroup.classList.add('dragging');
        this.tensionMeter.classList.add('active');

        sound.init();
      };

      const onPointerMove = (e) => {
        if (!this.isDragging) return;
        const pt = this.getSVGCoordinates(e);

        // Clamp drag pull: user pulls back to the left (between -140px and 0px)
        const deltaX = Math.min(0, Math.max(-140, pt.x - this.bowRestX));
        const deltaY = Math.min(65, Math.max(-65, pt.y - this.bowCenterY));

        this.currentX = this.bowRestX + deltaX;
        this.currentY = this.bowCenterY + deltaY;

        const pullDist = Math.abs(deltaX);

        this.updateBowstringAndFlex(this.currentX, this.currentY, pullDist);
        this.updateArrow(this.currentX, this.currentY);
        this.updateTrajectory(this.currentX, this.currentY);

        const tensionPercent = Math.min(100, Math.round((pullDist / 120) * 100));
        this.tensionFill.style.width = `${tensionPercent}%`;

        if (pullDist > 18) {
          sound.playTension();
        }

        if (navigator.vibrate && tensionPercent > 80) {
          navigator.vibrate(12);
        }
      };

      const onPointerUp = (e) => {
        if (!this.isDragging) return;
        this.isDragging = false;
        this.arrowGroup.classList.remove('dragging');
        this.tensionMeter.classList.remove('active');

        const pullDistance = this.bowRestX - this.currentX;

        // If drawn sufficiently, launch arrow! Otherwise return smoothly
        if (pullDistance >= 32) {
          this.launchArrow(pullDistance);
        } else {
          this.resetArrow();
        }
      };

      this.arena.addEventListener('pointerdown', onPointerDown);
      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);
      window.addEventListener('pointercancel', onPointerUp);

      // Spacebar accessibility
      window.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && !this.isFlying && !this.isPopped) {
          e.preventDefault();
          this.currentX = this.bowRestX - 100;
          this.currentY = this.bowCenterY;
          this.updateBowstringAndFlex(this.currentX, this.currentY, 100);
          this.updateArrow(this.currentX, this.currentY);
          setTimeout(() => this.launchArrow(100), 220);
        }
      });

      // Reset button
      this.btnReset.addEventListener('click', () => this.resetStage());
    }

    showBalloonToast() {
      if (this.toastTimer) clearTimeout(this.toastTimer);
      this.balloonToast.classList.add('show');
      this.toastTimer = setTimeout(() => {
        this.balloonToast.classList.remove('show');
      }, 2600);
    }

    getSVGCoordinates(e) {
      const rect = this.arena.getBoundingClientRect();
      const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;

      const x = ((clientX - rect.left) / rect.width) * 1000;
      const y = ((clientY - rect.top) / rect.height) * 600;
      return { x, y };
    }

    updateBowstringAndFlex(pullX, pullY, pullDist) {
      const flexX = this.bowRestX - pullDist * 0.08;
      const flexTopY = this.bowTopY + pullDist * 0.04;
      const flexBottomY = this.bowBottomY - pullDist * 0.04;

      this.bowString.setAttribute(
        'd',
        `M ${flexX},${flexTopY} Q ${pullX},${pullY} ${flexX},${flexBottomY}`
      );

      this.bowFinialTop.setAttribute('transform', `translate(${flexX - this.bowRestX}, ${flexTopY - this.bowTopY})`);
      this.bowFinialBottom.setAttribute('transform', `translate(${flexX - this.bowRestX}, ${flexBottomY - this.bowBottomY})`);
    }

    updateArrow(pullX, pullY) {
      const targetX = 760;
      const targetY = 280;

      const angleRad = Math.atan2(targetY - pullY, targetX - (pullX + this.arrowLength * 0.8));
      const angleDeg = (angleRad * 180) / Math.PI;

      this.arrowGroup.setAttribute(
        'transform',
        `translate(${pullX}, ${pullY}) rotate(${angleDeg})`
      );
    }

    updateTrajectory(pullX, pullY) {
      const tipX = pullX + this.arrowLength;
      const tipY = pullY;
      const targetX = 760;
      const targetY = 280;
      const midX = (tipX + targetX) / 2;
      const midY = (tipY + targetY) / 2 - 22;

      this.trajectoryPath.setAttribute(
        'd',
        `M ${tipX},${tipY} Q ${midX},${midY} ${targetX},${targetY}`
      );
      this.trajectoryPath.style.opacity = '1';
    }

    launchArrow(power) {
      this.isFlying = true;
      this.trajectoryPath.style.opacity = '0';

      // Snap bowstring back instantly with elastic rebound
      this.bowString.setAttribute(
        'd',
        `M ${this.bowRestX},${this.bowTopY} Q ${this.bowRestX + 16},${this.bowCenterY} ${this.bowRestX},${this.bowBottomY}`
      );
      setTimeout(() => {
        this.bowString.setAttribute(
          'd',
          `M ${this.bowRestX},${this.bowTopY} L ${this.bowRestX},${this.bowBottomY}`
        );
        this.bowFinialTop.removeAttribute('transform');
        this.bowFinialBottom.removeAttribute('transform');
      }, 70);

      sound.playArrowRelease();
      if (navigator.vibrate) navigator.vibrate([30, 15, 45]);

      const startNockX = this.currentX;
      const startNockY = this.currentY;
      const targetX = 760;
      const targetY = 280;

      const durationMs = Math.max(220, 420 - power * 2.2);
      const startTime = performance.now();

      const animateFlight = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(1.0, elapsed / durationMs);

        // Parabolic trajectory
        const currX = startNockX + (targetX - startNockX) * progress;
        const currY = startNockY + (targetY - startNockY) * progress - Math.sin(progress * Math.PI) * 32;

        const nextX = startNockX + (targetX - startNockX) * (progress + 0.02);
        const nextY = startNockY + (targetY - startNockY) * (progress + 0.02) - Math.sin((progress + 0.02) * Math.PI) * 32;
        const angleDeg = (Math.atan2(nextY - currY, nextX - currX) * 180) / Math.PI;

        this.arrowGroup.setAttribute(
          'transform',
          `translate(${currX}, ${currY}) rotate(${angleDeg})`
        );

        if (progress < 1.0) {
          requestAnimationFrame(animateFlight);
        } else {
          // Arrow arrives at balloon and BURSTS it!
          this.popBalloon();
        }
      };

      requestAnimationFrame(animateFlight);
    }

    popBalloon() {
      if (this.isPopped) return;
      this.isPopped = true;
      this.isFlying = false;

      // Arena Impact Shake
      this.arena.classList.add('shake');
      setTimeout(() => this.arena.classList.remove('shake'), 450);

      // Hide balloon and arrow
      this.balloonContainer.classList.add('popped');
      this.arrowGroup.style.display = 'none';

      // Sound
      sound.playPop();
      setTimeout(() => sound.playCelebration(), 80);

      if (navigator.vibrate) navigator.vibrate([60, 40, 100, 50, 150]);

      // Coordinates for confetti burst in viewport pixels
      const arenaRect = this.arena.getBoundingClientRect();
      const burstX = arenaRect.left + arenaRect.width * 0.76;
      const burstY = arenaRect.top + arenaRect.height * 0.46;

      confetti.burstAt(burstX, burstY);

      // Show Reveal Modal
      setTimeout(() => {
        this.revealModal.classList.add('show');
      }, 400);

      window.dispatchEvent(new CustomEvent('balloon-popped', { detail: { target: 'Aditi Soni' } }));
    }

    resetArrow() {
      this.currentX = this.bowRestX;
      this.currentY = this.bowCenterY;
      this.bowString.setAttribute(
        'd',
        `M ${this.bowRestX},${this.bowTopY} L ${this.bowRestX},${this.bowBottomY}`
      );
      this.bowFinialTop.removeAttribute('transform');
      this.bowFinialBottom.removeAttribute('transform');

      this.arrowGroup.setAttribute(
        'transform',
        `translate(${this.bowRestX}, ${this.bowCenterY}) rotate(0)`
      );
      this.arrowGroup.style.display = 'block';
      this.trajectoryPath.style.opacity = '0';
      this.tensionFill.style.width = '0%';
    }

    resetStage() {
      this.revealModal.classList.remove('show');
      this.isPopped = false;
      this.isFlying = false;

      // Re-inflate balloon
      this.balloonContainer.classList.remove('popped');
      this.balloonContainer.style.transform = 'translateY(-50%) scale(0.2)';
      setTimeout(() => {
        this.balloonContainer.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
        this.balloonContainer.style.transform = 'translateY(-50%) scale(1)';
        setTimeout(() => {
          this.balloonContainer.style.transition = '';
        }, 500);
      }, 50);

      this.resetArrow();
    }
  }

  window.addEventListener('DOMContentLoaded', () => {
    new ArcheryStage();

    const soundToggle = document.getElementById('sound-toggle-btn');
    if (soundToggle) {
      soundToggle.addEventListener('click', () => {
        sound.enabled = !sound.enabled;
        soundToggle.innerHTML = sound.enabled
          ? '<span>🔊</span><span>Sound ON</span>'
          : '<span>🔇</span><span>Sound OFF</span>';
      });
    }
  });
})();
