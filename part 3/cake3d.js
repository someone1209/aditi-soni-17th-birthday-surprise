/**
 * CINEMATIC 3D GOURMET BIRTHDAY CAKE & REALISTIC CUTTING EXPERIENCE
 * Made with Three.js for Aditi Soni
 * Features:
 * - 100% Pristine Uncut Cake before slicing (no visible seams or pre-cut gaps).
 * - Multi-Step Cinematic 3D Knife Slicing Sequence:
 *   1. Camera glides to dramatic cut perspective.
 *   2. Golden Chef's Knife gleams and enters from above.
 *   3. First vertical cut down along left radial seam with slicing audio and crumbs.
 *   4. Knife lifts, rotates 42°, and makes the second cut down along right seam.
 *   5. Knife slides under wedge, lifts slice up, and glides it out onto a luxury golden dessert plate.
 *   6. Golden dessert fork appears next to the slice.
 *   7. Confetti cannon burst and celebration fanfare!
 * - 100% Solid ExtrudeGeometry with zero hollow void.
 * - Mouth-watering gourmet cake interior (golden butter sponge, ruby raspberry jam compote, whipped mascarpone).
 * - Organic multi-phase firing flames with real dynamic candlelight flicker, sparklers, and pure Web Audio.
 */

(() => {
  'use strict';

  // --- AUDIO SYNTHESIZER (Pure Web Audio API - Zero External Dependencies) ---
  class SoundFX {
    constructor() {
      this.ctx = null;
      this.isMusicPlaying = false;
      this.melodyTimer = null;
      this.sparklerInterval = null;
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

    // Candle blow out sound (soft wind whoosh)
    playWhoosh() {
      this.init();
      const bufferSize = this.ctx.sampleRate * 0.45;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(850, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.42);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.32, this.ctx.currentTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.42);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      whiteNoise.start();
    }

    // Spark ignite sound
    playIgnite() {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(280, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.16);

      gain.gain.setValueAtTime(0.24, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.22);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.22);
    }

    // Knife slicing sound (crisp blade cutting through soft sponge)
    playSlice() {
      this.init();
      const bufferSize = this.ctx.sampleRate * 0.4;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.12));
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1600, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.35);
      filter.Q.setValueAtTime(2.5, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.28, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.38);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start();
    }

    // Blade metallic glint sparkle chime
    playShimmer() {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1318.51, this.ctx.currentTime); // E6
      osc.frequency.exponentialRampToValueAtTime(2637.02, this.ctx.currentTime + 0.25); // E7

      gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.5);
    }

    // Celebration bell chime
    playChime(freq = 587.33, duration = 0.8) {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    }

    // Sparkler crackle sound loop
    startSparklerSound() {
      this.init();
      if (this.sparklerInterval) return;
      this.sparklerInterval = setInterval(() => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(1800 + Math.random() * 2400, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.04 + Math.random() * 0.04, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.04);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.04);
      }, 50);
    }

    stopSparklerSound() {
      if (this.sparklerInterval) {
        clearInterval(this.sparklerInterval);
        this.sparklerInterval = null;
      }
    }

    // Polyphonic music box Happy Birthday melody
    toggleMusic(onUpdate) {
      this.init();
      if (this.isMusicPlaying) {
        this.stopMusic();
        if (onUpdate) onUpdate(false);
        return;
      }

      this.isMusicPlaying = true;
      if (onUpdate) onUpdate(true);

      const C4 = 261.63, D4 = 293.66, E4 = 329.63, F4 = 349.23, G4 = 392.00, A4 = 440.00, B4 = 493.88, C5 = 523.25;
      const melody = [
        { note: C4, d: 0.35 }, { note: C4, d: 0.15 }, { note: D4, d: 0.5 }, { note: C4, d: 0.5 }, { note: F4, d: 0.5 }, { note: E4, d: 1.0 },
        { note: C4, d: 0.35 }, { note: C4, d: 0.15 }, { note: D4, d: 0.5 }, { note: C4, d: 0.5 }, { note: G4, d: 0.5 }, { note: F4, d: 1.0 },
        { note: C4, d: 0.35 }, { note: C4, d: 0.15 }, { note: C5, d: 0.5 }, { note: A4, d: 0.5 }, { note: F4, d: 0.5 }, { note: E4, d: 0.5 }, { note: D4, d: 0.8 },
        { note: B4, d: 0.35 }, { note: B4, d: 0.15 }, { note: A4, d: 0.5 }, { note: F4, d: 0.5 }, { note: G4, d: 0.5 }, { note: F4, d: 1.2 }
      ];

      let noteIndex = 0;
      const beatMs = 520;

      const playNext = () => {
        if (!this.isMusicPlaying) return;
        const current = melody[noteIndex];
        this.playMusicBoxNote(current.note, current.d * 1.2);
        noteIndex = (noteIndex + 1) % melody.length;
        this.melodyTimer = setTimeout(playNext, current.d * beatMs);
      };

      playNext();
    }

    playMusicBoxNote(freq, dur) {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 2, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + dur);

      osc.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc2.start();
      osc.stop(this.ctx.currentTime + dur);
      osc2.stop(this.ctx.currentTime + dur);
    }

    stopMusic() {
      this.isMusicPlaying = false;
      if (this.melodyTimer) {
        clearTimeout(this.melodyTimer);
        this.melodyTimer = null;
      }
    }
  }

  const sound = new SoundFX();

  // --- MOUTH-WATERING GOURMET SPONGE INTERIOR TEXTURE ---
  function createCakeInteriorTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    // Rich Golden Butter Sponge Base
    const spongeGrad = ctx.createLinearGradient(0, 0, 1024, 0);
    spongeGrad.addColorStop(0, '#f9e0b8');
    spongeGrad.addColorStop(0.5, '#fae6c6');
    spongeGrad.addColorStop(0.9, '#f6d8a7');
    spongeGrad.addColorStop(1, '#f9bf8f'); // golden crust edge
    ctx.fillStyle = spongeGrad;
    ctx.fillRect(0, 0, 1024, 1024);

    // Realistic Sponge Crumb Porosity & Texture
    for (let i = 0; i < 22000; i++) {
      const x = Math.random() * 1024;
      const y = Math.random() * 1024;
      const rad = Math.random() * 2.4 + 0.6;
      ctx.fillStyle = Math.random() > 0.4 ? '#f0c792' : (Math.random() > 0.5 ? '#fff3e0' : '#e5b273');
      ctx.beginPath();
      ctx.arc(x, y, rad, 0, Math.PI * 2);
      ctx.fill();
    }

    // 3 Thick, Glossy Crimson Strawberry/Raspberry Compote Layers with Mascarpone Cushions
    const jamY = [240, 512, 784];
    jamY.forEach((y, idx) => {
      // Mascarpone vanilla buttercream ribbon (top and bottom cushion)
      ctx.fillStyle = '#fffdf5';
      ctx.fillRect(0, y - 36, 1024, 72);

      // Subtle drop shadow under cream
      ctx.fillStyle = 'rgba(195, 145, 105, 0.4)';
      ctx.fillRect(0, y - 38, 1024, 3);
      ctx.fillRect(0, y + 35, 1024, 3);

      // Deep Ruby Strawberry Compote Core
      const jamGrad = ctx.createLinearGradient(0, y - 20, 0, y + 20);
      jamGrad.addColorStop(0, '#a1082c');
      jamGrad.addColorStop(0.2, '#e01646');
      jamGrad.addColorStop(0.7, '#c20e37');
      jamGrad.addColorStop(1, '#7e0420');
      ctx.fillStyle = jamGrad;
      ctx.fillRect(0, y - 20, 1024, 40);

      // Glossy Strawberry Fruit Sheen Highlight
      ctx.fillStyle = 'rgba(255, 195, 215, 0.55)';
      ctx.fillRect(0, y - 8, 1024, 10);

      // Strawberry Seeds
      for (let s = 0; s < 50; s++) {
        const sx = Math.random() * 1024;
        const sy = y - 12 + Math.random() * 24;
        ctx.fillStyle = '#520213';
        ctx.beginPath();
        ctx.arc(sx, sy, 2.0, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // Outer Edge Frosting Layer (Pink Velvet)
    const edgeGrad = ctx.createLinearGradient(940, 0, 1024, 0);
    edgeGrad.addColorStop(0, 'rgba(247, 168, 186, 0)');
    edgeGrad.addColorStop(0.3, 'rgba(247, 168, 186, 0.9)');
    edgeGrad.addColorStop(1, '#f27898');
    ctx.fillStyle = edgeGrad;
    ctx.fillRect(940, 0, 84, 1024);

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.ClampToEdgeWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    return tex;
  }

  // Golden Inscription Plaque: "Happy Birthday Aditi Soni"
  function createBannerTexture(text) {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createLinearGradient(0, 0, 1024, 0);
    grad.addColorStop(0, '#b88228');
    grad.addColorStop(0.2, '#f9e79f');
    grad.addColorStop(0.5, '#d49a37');
    grad.addColorStop(0.8, '#fff4c2');
    grad.addColorStop(1, '#9e6d1e');

    ctx.fillStyle = grad;
    if (ctx.roundRect) ctx.roundRect(30, 24, 964, 208, 42);
    else ctx.fillRect(30, 24, 964, 208);
    ctx.fill();

    ctx.strokeStyle = '#fff8e7';
    ctx.lineWidth = 6;
    if (ctx.roundRect) ctx.roundRect(44, 38, 936, 180, 32);
    else ctx.strokeRect(44, 38, 936, 180);
    ctx.stroke();

    ctx.fillStyle = '#5c2d08';
    ctx.font = 'bold 54px Georgia, "Playfair Display", serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 512, 110);

    ctx.font = 'italic 34px Georgia, serif';
    ctx.fillStyle = '#941b38';
    ctx.fillText('❤  yours spidy  ❤', 512, 168);

    const tex = new THREE.CanvasTexture(canvas);
    return tex;
  }

  // Candy cane spiral stripe texture for candles
  function createCandleStripeTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#fffdfa';
    ctx.fillRect(0, 0, 256, 256);

    ctx.lineWidth = 32;
    for (let i = -256; i < 512; i += 64) {
      ctx.strokeStyle = '#f4618d';
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + 256, 256);
      ctx.stroke();

      ctx.strokeStyle = '#e0aa3e';
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(i + 38, 0);
      ctx.lineTo(i + 256 + 38, 256);
      ctx.stroke();
      ctx.lineWidth = 32;
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(1, 3);
    return tex;
  }

  // --- MAIN THREE.JS APPLICATION ---
  class BirthdayCake3D {
    constructor() {
      this.canvas = document.getElementById('webgl-canvas');
      this.candles = [];
      this.flames = [];
      this.flameLights = [];
      this.smokeParticles = [];
      this.sparkParticles = [];
      this.sparklerParticles = [];
      this.crumbs = [];
      this.isSliceCut = false;
      this.isCuttingInProgress = false;
      this.isNightMode = true;
      this.isSparklerActive = false;
      this.isMicActive = false;
      this.audioAnalyser = null;
      this.micStream = null;

      this.initScene();
      this.buildLighting();
      this.buildTableAndPedestal();
      this.buildCakeDualModel();
      this.buildChefKnife();
      this.buildCandles();
      this.buildStarlightEnvironment();
      this.initEvents();
      this.animate();
    }

    initScene() {
      this.scene = new THREE.Scene();
      this.scene.fog = new THREE.FogExp2(0x110716, 0.022);

      this.camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 100);
      this.camera.position.set(0, 5.6, 14.0);

      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1.18;

      this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.05;
      this.controls.maxPolarAngle = Math.PI / 2 - 0.04;
      this.controls.minDistance = 6.5;
      this.controls.maxDistance = 22.0;
      this.controls.target.set(0, 1.25, 0);
      this.controls.autoRotate = true;
      this.controls.autoRotateSpeed = 0.55;
    }

    buildLighting() {
      // Soft warm ambient base
      this.ambientLight = new THREE.AmbientLight(0x421d52, 0.32);
      this.scene.add(this.ambientLight);

      // Key light: warm sun casting soft shadows
      this.keyLight = new THREE.DirectionalLight(0xfffaee, 0.45);
      this.keyLight.position.set(7, 15, 9);
      this.keyLight.castShadow = true;
      this.keyLight.shadow.mapSize.width = 2048;
      this.keyLight.shadow.mapSize.height = 2048;
      this.keyLight.shadow.camera.near = 0.5;
      this.keyLight.shadow.camera.far = 35;
      this.keyLight.shadow.camera.left = -6;
      this.keyLight.shadow.camera.right = 6;
      this.keyLight.shadow.camera.top = 8;
      this.keyLight.shadow.camera.bottom = -4;
      this.keyLight.shadow.bias = -0.0004;
      this.scene.add(this.keyLight);

      // Warm fill bounce light (prevents muddy dark shadows)
      this.fillLight = new THREE.DirectionalLight(0xffd5dc, 0.4);
      this.fillLight.position.set(-6, 8, 8);
      this.scene.add(this.fillLight);

      // Rim light for glossy frosting edges
      this.rimLight = new THREE.DirectionalLight(0xff7799, 0.9);
      this.rimLight.position.set(-8, 11, -7);
      this.scene.add(this.rimLight);
    }

    buildTableAndPedestal() {
      this.pedestalGroup = new THREE.Group();

      const goldMat = new THREE.MeshStandardMaterial({
        color: 0xe0a943,
        metalness: 0.88,
        roughness: 0.18
      });

      const porcelainMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.08,
        roughness: 0.12
      });

      const tableMat = new THREE.MeshStandardMaterial({
        color: 0x2b1522,
        roughness: 0.55,
        metalness: 0.12
      });

      // Wooden / Marble Dessert Table Ring
      const tableGeo = new THREE.CylinderGeometry(8.5, 9.0, 0.4, 64);
      const tableMesh = new THREE.Mesh(tableGeo, tableMat);
      tableMesh.position.y = -0.95;
      tableMesh.receiveShadow = true;
      this.pedestalGroup.add(tableMesh);

      // Pedestal Base Foot
      const baseGeo = new THREE.CylinderGeometry(2.9, 3.3, 0.38, 48);
      const baseMesh = new THREE.Mesh(baseGeo, goldMat);
      baseMesh.position.y = -0.62;
      baseMesh.castShadow = true;
      baseMesh.receiveShadow = true;
      this.pedestalGroup.add(baseMesh);

      // Fluted Classical Pedestal Column
      const stemGeo = new THREE.CylinderGeometry(0.85, 1.35, 1.25, 32);
      const stemMesh = new THREE.Mesh(stemGeo, goldMat);
      stemMesh.position.y = 0.1;
      stemMesh.castShadow = true;
      stemMesh.receiveShadow = true;
      this.pedestalGroup.add(stemMesh);

      // Porcelain Cake Platter
      const plateGeo = new THREE.CylinderGeometry(4.7, 4.45, 0.28, 64);
      const plateMesh = new THREE.Mesh(plateGeo, porcelainMat);
      plateMesh.position.y = 0.82;
      plateMesh.receiveShadow = true;
      this.pedestalGroup.add(plateMesh);

      // Scalloped 24K Gold Rim around Platter
      const rimGeo = new THREE.TorusGeometry(4.68, 0.12, 16, 64);
      rimGeo.rotateX(Math.PI / 2);
      const rimMesh = new THREE.Mesh(rimGeo, goldMat);
      rimMesh.position.y = 0.89;
      this.pedestalGroup.add(rimMesh);

      // Floor Shadow Plane
      const floorGeo = new THREE.PlaneGeometry(32, 32);
      const floorMat = new THREE.ShadowMaterial({ opacity: 0.18 });
      const floorMesh = new THREE.Mesh(floorGeo, floorMat);
      floorMesh.rotation.x = -Math.PI / 2;
      floorMesh.position.y = -1.16;
      floorMesh.receiveShadow = true;
      this.pedestalGroup.add(floorMesh);

      this.scene.add(this.pedestalGroup);
    }

    // --- BUILD DUAL MODEL CAKE: PRISTINE UNBROKEN WHOLE CAKE + PRECISE SLICEABLE MODEL ---
    buildCakeDualModel() {
      this.wholeCakeGroup = new THREE.Group(); // Shown BEFORE cutting (100% pristine, 0 seams)
      this.cutCakeMasterGroup = new THREE.Group(); // Shown AFTER cutting (cut cake + extracted slice)
      this.cutCakeMasterGroup.visible = false;

      this.mainCutCake = new THREE.Group();
      this.cutSliceGroup = new THREE.Group();
      this.cutCakeMasterGroup.add(this.mainCutCake);
      this.cutCakeMasterGroup.add(this.cutSliceGroup);

      this.interiorTex = createCakeInteriorTexture();
      this.interiorMat = new THREE.MeshStandardMaterial({
        map: this.interiorTex,
        roughness: 0.45,
        metalness: 0.05
      });

      // Frosting Materials
      const t1Frosting = new THREE.MeshStandardMaterial({ color: 0xf8b3c4, roughness: 0.28, metalness: 0.04 });
      const t2Frosting = new THREE.MeshStandardMaterial({ color: 0xfff8ee, roughness: 0.26, metalness: 0.02 });
      const t3Frosting = new THREE.MeshStandardMaterial({ color: 0xf48aa2, roughness: 0.28, metalness: 0.04 });

      const goldMat = new THREE.MeshStandardMaterial({ color: 0xdfa13d, metalness: 0.88, roughness: 0.18 });
      const creamMat = new THREE.MeshStandardMaterial({ color: 0xfffcf5, roughness: 0.25 });

      this.sliceAngle = Math.PI / 4.3; // ~42 degrees wedge

      const tiers = [
        { r: 3.7, h: 1.35, y: 0.95, mat: t1Frosting },
        { r: 2.65, h: 1.15, y: 0.95 + 1.35, mat: t2Frosting },
        { r: 1.65, h: 0.95, y: 0.95 + 1.35 + 1.15, mat: t3Frosting }
      ];

      this.tiers = tiers;
      this.topTierY = tiers[2].y + tiers[2].h;

      tiers.forEach((tier) => {
        // --- A. WHOLE CAKE TIER (Silky Smooth 360 Cylinder - Zero Pre-Cut Gaps) ---
        const wholeGeo = new THREE.CylinderGeometry(tier.r, tier.r, tier.h, 64);
        wholeGeo.translate(0, tier.y + tier.h / 2, 0);
        const wholeMesh = new THREE.Mesh(wholeGeo, tier.mat);
        wholeMesh.castShadow = true;
        wholeMesh.receiveShadow = true;
        this.wholeCakeGroup.add(wholeMesh);

        // --- B. SLICED CAKE TIER: Main Body (Solid Extrude from sliceAngle to 2*PI) ---
        const mainShape = new THREE.Shape();
        mainShape.moveTo(0, 0);
        mainShape.arc(0, 0, tier.r, this.sliceAngle, Math.PI * 2, false);
        mainShape.closePath();

        const mainGeo = new THREE.ExtrudeGeometry(mainShape, {
          depth: tier.h,
          curveSegments: 48,
          bevelEnabled: true,
          bevelSegments: 4,
          steps: 1,
          bevelSize: 0.04,
          bevelThickness: 0.04
        });
        mainGeo.rotateX(-Math.PI / 2);
        mainGeo.translate(0, tier.y, 0);
        mainGeo.computeVertexNormals();

        const mainMesh = new THREE.Mesh(mainGeo, tier.mat);
        mainMesh.castShadow = true;
        mainMesh.receiveShadow = true;
        this.mainCutCake.add(mainMesh);

        // --- C. SLICED CAKE TIER: Wedge Slice (Solid Extrude from 0 to sliceAngle) ---
        const sliceShape = new THREE.Shape();
        sliceShape.moveTo(0, 0);
        sliceShape.arc(0, 0, tier.r, 0, this.sliceAngle, false);
        sliceShape.closePath();

        const sliceGeo = new THREE.ExtrudeGeometry(sliceShape, {
          depth: tier.h,
          curveSegments: 24,
          bevelEnabled: true,
          bevelSegments: 4,
          steps: 1,
          bevelSize: 0.04,
          bevelThickness: 0.04
        });
        sliceGeo.rotateX(-Math.PI / 2);
        sliceGeo.translate(0, tier.y, 0);
        sliceGeo.computeVertexNormals();

        const sliceMesh = new THREE.Mesh(sliceGeo, tier.mat);
        sliceMesh.castShadow = true;
        this.cutSliceGroup.add(sliceMesh);

        // --- D. GOURMET LAYERED INTERIOR TEXTURED PLANES (Both Main & Slice) ---
        this.buildSolidCutWalls(tier);
      });

      // --- DECORATIONS & TOPPINGS ---
      // Build for both groups so they match seamlessly during transition
      this.buildDecorationsForBothGroups(tiers, creamMat, goldMat, t3Frosting);

      // Serving Platter for Slice
      const slicePlateGeo = new THREE.CylinderGeometry(2.4, 2.2, 0.14, 32);
      const slicePlateMat = new THREE.MeshStandardMaterial({ color: 0xdfa13d, metalness: 0.88, roughness: 0.18 });
      this.cutSlicePlate = new THREE.Mesh(slicePlateGeo, slicePlateMat);
      this.cutSlicePlate.position.set(0, 0.86, 0);
      this.cutSlicePlate.visible = false;
      this.scene.add(this.cutSlicePlate);

      // Golden Dessert Fork
      this.buildDessertFork();

      this.scene.add(this.wholeCakeGroup);
      this.scene.add(this.cutCakeMasterGroup);
    }

    buildSolidCutWalls(tier) {
      const planeGeo = new THREE.PlaneGeometry(tier.r, tier.h);
      planeGeo.translate(tier.r / 2, tier.h / 2, 0);

      // Main Cake Cut Wall A (at angle = sliceAngle)
      const mainWallA = new THREE.Mesh(planeGeo, this.interiorMat);
      mainWallA.position.set(0, tier.y, 0);
      mainWallA.rotation.y = -this.sliceAngle;
      this.mainCutCake.add(mainWallA);

      // Main Cake Cut Wall B (at angle = 0 / 2*PI)
      const mainWallB = new THREE.Mesh(planeGeo, this.interiorMat);
      mainWallB.position.set(0, tier.y, 0);
      mainWallB.rotation.y = Math.PI;
      mainWallB.scale.set(-1, 1, 1);
      this.mainCutCake.add(mainWallB);

      // Slice Cut Wall A (along angle = 0)
      const sliceWallA = new THREE.Mesh(planeGeo, this.interiorMat);
      sliceWallA.position.set(0, tier.y, 0);
      sliceWallA.rotation.y = 0;
      this.cutSliceGroup.add(sliceWallA);

      // Slice Cut Wall B (along angle = sliceAngle)
      const sliceWallB = new THREE.Mesh(planeGeo, this.interiorMat);
      sliceWallB.position.set(0, tier.y, 0);
      sliceWallB.rotation.y = -(this.sliceAngle - Math.PI);
      sliceWallB.scale.set(-1, 1, 1);
      this.cutSliceGroup.add(sliceWallB);
    }

    buildDecorationsForBothGroups(tiers, creamMat, goldMat, t3Frosting) {
      // 1. Ganache Drips
      const dripCount = 38;
      for (let i = 0; i < dripCount; i++) {
        const theta = (i / dripCount) * Math.PI * 2;
        const length = 0.28 + Math.sin(i * 2.8) * 0.18 + (i % 3 === 0 ? 0.22 : 0.05);

        const makeDrip = () => {
          const dg = new THREE.Group();
          dg.position.set(Math.cos(theta) * (tiers[0].r + 0.02), tiers[0].y + tiers[0].h, Math.sin(theta) * (tiers[0].r + 0.02));
          const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.05, length, 12), creamMat);
          stem.position.y = -length / 2;
          dg.add(stem);
          const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.085, 12, 12), creamMat);
          bulb.scale.set(1, 1.25, 1);
          bulb.position.y = -length;
          dg.add(bulb);
          return dg;
        };

        this.wholeCakeGroup.add(makeDrip());
        if (theta >= 0 && theta <= this.sliceAngle) {
          this.cutSliceGroup.add(makeDrip());
        } else {
          this.mainCutCake.add(makeDrip());
        }
      }

      // 2. Pearl Border
      const pearlCount = 40;
      for (let i = 0; i < pearlCount; i++) {
        const theta = (i / pearlCount) * Math.PI * 2;
        const pMat = (i % 3 === 0) ? goldMat : creamMat;
        const makePearl = () => {
          const pm = new THREE.Mesh(new THREE.SphereGeometry(0.12, 14, 14), pMat);
          pm.position.set(Math.cos(theta) * (tiers[0].r + 0.08), tiers[0].y + 0.12, Math.sin(theta) * (tiers[0].r + 0.08));
          pm.castShadow = true;
          return pm;
        };

        this.wholeCakeGroup.add(makePearl());
        if (theta >= 0 && theta <= this.sliceAngle) {
          this.cutSliceGroup.add(makePearl());
        } else {
          this.mainCutCake.add(makePearl());
        }
      }

      // 3. Middle Tier Rosettes & Golden Plaque
      const rosetteCount = 30;
      for (let i = 0; i < rosetteCount; i++) {
        const theta = (i / rosetteCount) * Math.PI * 2;
        const makeRosette = () => {
          const rm = new THREE.Mesh(new THREE.TorusGeometry(0.11, 0.065, 10, 16), t3Frosting);
          rm.rotation.x = Math.PI / 2;
          rm.position.set(Math.cos(theta) * (tiers[1].r - 0.04), tiers[1].y + tiers[1].h, Math.sin(theta) * (tiers[1].r - 0.04));
          return rm;
        };

        this.wholeCakeGroup.add(makeRosette());
        if (theta >= 0 && theta <= this.sliceAngle) {
          this.cutSliceGroup.add(makeRosette());
        } else {
          this.mainCutCake.add(makeRosette());
        }
      }

      // Golden Plaque
      const plaqueTex = createBannerTexture('Happy Birthday Aditi Soni');
      const plaqueMat = new THREE.MeshStandardMaterial({
        map: plaqueTex,
        roughness: 0.28,
        metalness: 0.45,
        transparent: true
      });
      const plaqueGeo = new THREE.CylinderGeometry(tiers[1].r + 0.08, tiers[1].r + 0.08, 0.88, 36, 1, true, Math.PI * 0.72, Math.PI * 0.56);
      const plaqueA = new THREE.Mesh(plaqueGeo, plaqueMat);
      plaqueA.position.y = tiers[1].y + tiers[1].h / 2;
      this.wholeCakeGroup.add(plaqueA);

      const plaqueB = new THREE.Mesh(plaqueGeo, plaqueMat);
      plaqueB.position.y = tiers[1].y + tiers[1].h / 2;
      this.mainCutCake.add(plaqueB);

      // 4. Fresh Fruit Garnishes on Top Tier
      this.buildFruitGarnish(tiers[2].r, this.topTierY);
    }

    buildFruitGarnish(radius, topY) {
      const strawberryMat = new THREE.MeshStandardMaterial({ color: 0xd61338, roughness: 0.16, metalness: 0.08 });
      const leafMat = new THREE.MeshStandardMaterial({ color: 0x2e7d32, roughness: 0.42 });
      const blueberryMat = new THREE.MeshStandardMaterial({ color: 0x1f243b, roughness: 0.55 });
      const creamMat = new THREE.MeshStandardMaterial({ color: 0xfffcf5, roughness: 0.25 });
      const goldFlakeMat = new THREE.MeshStandardMaterial({ color: 0xf5ba42, metalness: 0.9, roughness: 0.15 });

      const fruitCount = 7;
      for (let i = 0; i < fruitCount; i++) {
        const theta = (i / fruitCount) * Math.PI * 2 + 0.25;
        const r = radius * 0.74;
        const x = Math.cos(theta) * r;
        const z = Math.sin(theta) * r;

        const makeFruitGroup = () => {
          const g = new THREE.Group();
          // Strawberry
          const sGroup = new THREE.Group();
          sGroup.position.set(x, topY + 0.28, z);
          sGroup.rotation.y = theta + Math.PI / 2;
          sGroup.rotation.z = 0.18;

          const berryGeo = new THREE.ConeGeometry(0.28, 0.58, 20);
          berryGeo.rotateX(Math.PI);
          const berryMesh = new THREE.Mesh(berryGeo, strawberryMat);
          berryMesh.castShadow = true;
          sGroup.add(berryMesh);

          const leafGeo = new THREE.CylinderGeometry(0.2, 0.02, 0.04, 5);
          const leafMesh = new THREE.Mesh(leafGeo, leafMat);
          leafMesh.position.y = 0.3;
          sGroup.add(leafMesh);
          g.add(sGroup);

          // Whipped Cream Swirl
          const creamGeo = new THREE.SphereGeometry(0.19, 14, 14);
          creamGeo.scale(1, 1.45, 1);
          const creamMesh = new THREE.Mesh(creamGeo, creamMat);
          creamMesh.position.set(Math.cos(theta + 0.45) * (r * 0.92), topY + 0.18, Math.sin(theta + 0.45) * (r * 0.92));
          creamMesh.castShadow = true;
          g.add(creamMesh);

          // Blueberry
          const bMesh = new THREE.Mesh(new THREE.SphereGeometry(0.12, 12, 12), blueberryMat);
          bMesh.position.set(Math.cos(theta - 0.3) * (r * 1.15), topY + 0.12, Math.sin(theta - 0.3) * (r * 1.15));
          g.add(bMesh);

          return g;
        };

        this.wholeCakeGroup.add(makeFruitGroup());
        if (theta >= 0 && theta <= this.sliceAngle) {
          this.cutSliceGroup.add(makeFruitGroup());
        } else {
          this.mainCutCake.add(makeFruitGroup());
        }
      }

      // Edible Gold Flakes
      for (let g = 0; g < 32; g++) {
        const gr = Math.random() * (radius * 0.9);
        const gt = Math.random() * Math.PI * 2;
        const makeFlake = () => {
          const flake = new THREE.Mesh(new THREE.PlaneGeometry(0.08, 0.08), goldFlakeMat);
          flake.rotation.x = -Math.PI / 2;
          flake.rotation.z = Math.random() * Math.PI;
          flake.position.set(Math.cos(gt) * gr, topY + 0.02, Math.sin(gt) * gr);
          return flake;
        };

        this.wholeCakeGroup.add(makeFlake());
        if (gt >= 0 && gt <= this.sliceAngle) {
          this.cutSliceGroup.add(makeFlake());
        } else {
          this.mainCutCake.add(makeFlake());
        }
      }
    }

    buildDessertFork() {
      this.forkGroup = new THREE.Group();
      const goldMat = new THREE.MeshStandardMaterial({ color: 0xdfa13d, metalness: 0.92, roughness: 0.15 });

      // Handle
      const handleGeo = new THREE.CylinderGeometry(0.04, 0.06, 2.0, 8);
      handleGeo.rotateZ(Math.PI / 2);
      const handle = new THREE.Mesh(handleGeo, goldMat);
      handle.position.x = -1.0;
      this.forkGroup.add(handle);

      // Tines Base
      const headGeo = new THREE.BoxGeometry(0.4, 0.03, 0.35);
      const head = new THREE.Mesh(headGeo, goldMat);
      head.position.x = 0.2;
      this.forkGroup.add(head);

      // 4 Tines
      for (let t = -0.12; t <= 0.12; t += 0.08) {
        const tineGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.6, 8);
        tineGeo.rotateZ(Math.PI / 2);
        const tine = new THREE.Mesh(tineGeo, goldMat);
        tine.position.set(0.65, 0, t);
        this.forkGroup.add(tine);
      }

      this.forkGroup.rotation.y = -Math.PI / 4;
      this.forkGroup.position.set(0, 0.88, 0);
      this.forkGroup.visible = false;
      this.scene.add(this.forkGroup);
    }

    // --- CANDLES & REALISTIC FLAMES ---
    buildCandles() {
      const candleCount = 5;
      const candleRadius = 0.92;
      const candleHeight = 1.55;
      const candleMat = new THREE.MeshStandardMaterial({ map: createCandleStripeTexture(), roughness: 0.3 });
      const wickMat = new THREE.MeshBasicMaterial({ color: 0x181818 });

      for (let i = 0; i < candleCount; i++) {
        const theta = (i / candleCount) * Math.PI * 2;
        const x = Math.cos(theta) * candleRadius;
        const z = Math.sin(theta) * candleRadius;
        const y = this.topTierY + candleHeight / 2;

        const candleGroup = new THREE.Group();
        candleGroup.position.set(x, y, z);
        candleGroup.userData = { candleId: i, isLit: true, baseY: y };

        const bodyGeo = new THREE.CylinderGeometry(0.095, 0.095, candleHeight, 24);
        const bodyMesh = new THREE.Mesh(bodyGeo, candleMat);
        bodyMesh.castShadow = true;
        candleGroup.add(bodyMesh);

        const wickGeo = new THREE.CylinderGeometry(0.016, 0.016, 0.22, 8);
        const wickMesh = new THREE.Mesh(wickGeo, wickMat);
        wickMesh.position.y = candleHeight / 2 + 0.09;
        candleGroup.add(wickMesh);

        // Flame Assembly
        const flameGroup = new THREE.Group();
        flameGroup.position.y = candleHeight / 2 + 0.28;

        const innerGeo = new THREE.ConeGeometry(0.1, 0.44, 16);
        innerGeo.translate(0, 0.22, 0);
        const innerMesh = new THREE.Mesh(innerGeo, new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.95 }));
        flameGroup.add(innerMesh);

        const outerGeo = new THREE.ConeGeometry(0.2, 0.62, 16);
        outerGeo.translate(0, 0.28, 0);
        const outerMesh = new THREE.Mesh(outerGeo, new THREE.MeshBasicMaterial({ color: 0xff6600, transparent: true, opacity: 0.82, blending: THREE.AdditiveBlending }));
        flameGroup.add(outerMesh);

        candleGroup.add(flameGroup);

        const flameLight = new THREE.PointLight(0xffa73b, 1.8, 9.0, 2);
        flameLight.position.set(0, candleHeight / 2 + 0.38, 0);
        flameLight.castShadow = true;
        candleGroup.add(flameLight);

        this.scene.add(candleGroup);
        this.candles.push(candleGroup);
        this.flames.push(flameGroup);
        this.flameLights.push(flameLight);
      }
    }

    // --- 3D GOLDEN CHEF'S KNIFE ---
    buildChefKnife() {
      this.knifeGroup = new THREE.Group();

      const steelMat = new THREE.MeshStandardMaterial({ color: 0xf5f5f5, metalness: 0.98, roughness: 0.08 });
      const goldMat = new THREE.MeshStandardMaterial({ color: 0xdfa13d, metalness: 0.92, roughness: 0.15 });
      const pearlHandleMat = new THREE.MeshStandardMaterial({ color: 0x421825, roughness: 0.35, metalness: 0.1 });

      // Blade Shape (Tapered chef's slicing blade)
      const bladeShape = new THREE.Shape();
      bladeShape.moveTo(0, 0);
      bladeShape.lineTo(4.6, 0);
      bladeShape.quadraticCurveTo(4.9, 0.4, 4.3, 0.95);
      bladeShape.lineTo(0, 0.95);
      bladeShape.closePath();

      const bladeGeo = new THREE.ExtrudeGeometry(bladeShape, { depth: 0.04, bevelEnabled: false });
      const bladeMesh = new THREE.Mesh(bladeGeo, steelMat);
      bladeMesh.rotation.z = -Math.PI / 14;
      bladeMesh.castShadow = true;
      this.knifeGroup.add(bladeMesh);

      // Gold Bolster
      const bolsterGeo = new THREE.CylinderGeometry(0.12, 0.12, 1.0, 16);
      const bolsterMesh = new THREE.Mesh(bolsterGeo, goldMat);
      bolsterMesh.position.set(0, 0.48, 0.02);
      this.knifeGroup.add(bolsterMesh);

      // Handle with rivets
      const handleGeo = new THREE.CylinderGeometry(0.16, 0.18, 2.4, 16);
      handleGeo.rotateZ(Math.PI / 2);
      const handleMesh = new THREE.Mesh(handleGeo, pearlHandleMat);
      handleMesh.position.set(-1.2, 0.48, 0.02);
      this.knifeGroup.add(handleMesh);

      // Rivets
      for (let rx of [-0.5, -1.2, -1.9]) {
        const rivet = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.36, 12), goldMat);
        rivet.position.set(rx, 0.48, 0.02);
        this.knifeGroup.add(rivet);
      }

      // Sparkle Shimmer on Blade Tip
      const sparkleGeo = new THREE.PlaneGeometry(0.6, 0.6);
      const sparkleMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, blending: THREE.AdditiveBlending });
      this.bladeSparkle = new THREE.Mesh(sparkleGeo, sparkleMat);
      this.bladeSparkle.position.set(4.6, 0.3, 0.05);
      this.knifeGroup.add(this.bladeSparkle);

      this.knifeGroup.position.set(0, 15, 0);
      this.knifeGroup.visible = false;
      this.scene.add(this.knifeGroup);
    }

    buildStarlightEnvironment() {
      const count = 280;
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(count * 3);

      for (let i = 0; i < count * 3; i += 3) {
        pos[i] = (Math.random() - 0.5) * 32;
        pos[i + 1] = Math.random() * 18 - 2;
        pos[i + 2] = (Math.random() - 0.5) * 32;
      }

      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({
        color: 0xffd3e2,
        size: 0.16,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending
      });

      this.starlightPoints = new THREE.Points(geo, mat);
      this.scene.add(this.starlightPoints);
    }

    // --- CINEMATIC MULTI-STEP CAKE CUTTING ANIMATION ---
    triggerCinematicCakeCut() {
      if (this.isSliceCut || this.isCuttingInProgress) return;
      this.isCuttingInProgress = true;

      const btnCut = document.getElementById('btn-cut');
      if (btnCut) btnCut.disabled = true;

      const statusPill = document.getElementById('status-pill');
      const statusText = statusPill.querySelector('span:last-child');
      statusText.textContent = 'Cutting the first slice for Aditi... 🍰✨';

      // 1. Camera swoops to dramatic cut angle
      this.controls.autoRotate = false;
      this.smoothCameraMove(
        new THREE.Vector3(3.6, 5.4, 7.8),
        new THREE.Vector3(0.9, 2.1, 0.9),
        900
      );

      // 2. Knife enters gracefully from above
      setTimeout(() => {
        this.knifeGroup.visible = true;
        this.knifeGroup.position.set(1.4, 10, 0.0);
        this.knifeGroup.rotation.set(0, 0, -Math.PI / 8);

        // Animate down to hover above Cut Line 1
        this.interpolate(800, (p) => {
          this.knifeGroup.position.y = 10 - p * 4.6; // Y reaches 5.4
        }, () => {
          // Shimmer sparkle glint on blade
          sound.playShimmer();
          this.bladeSparkle.material.opacity = 1.0;
          setTimeout(() => { this.bladeSparkle.material.opacity = 0; }, 350);

          // 3. FIRST CUT: Plunges down vertical seam 1 (at angle 0)
          setTimeout(() => {
            sound.playSlice();
            this.interpolate(700, (p) => {
              this.knifeGroup.position.y = 5.4 - p * 4.3; // reaches plate level y = 1.1
              if (Math.random() < 0.4) {
                this.spawnSlicingCrumbs(new THREE.Vector3(2.0, 5.4 - p * 4.3, 0));
              }
            }, () => {
              // 4. Knife lifts back up and rotates 42 degrees to Cut Line 2
              setTimeout(() => {
                this.interpolate(550, (p) => {
                  this.knifeGroup.position.y = 1.1 + p * 4.3; // lifts to 5.4
                  this.knifeGroup.rotation.y = -p * this.sliceAngle;
                  this.knifeGroup.position.x = 1.4 * Math.cos(p * this.sliceAngle);
                  this.knifeGroup.position.z = 1.4 * Math.sin(p * this.sliceAngle);
                }, () => {
                  // 5. SECOND CUT: Plunges down along Cut Line 2
                  setTimeout(() => {
                    sound.playSlice();
                    this.interpolate(700, (p) => {
                      this.knifeGroup.position.y = 5.4 - p * 4.3;
                      if (Math.random() < 0.4) {
                        this.spawnSlicingCrumbs(new THREE.Vector3(
                          2.0 * Math.cos(this.sliceAngle),
                          5.4 - p * 4.3,
                          2.0 * Math.sin(this.sliceAngle)
                        ));
                      }
                    }, () => {
                      // 6. AT THIS INSTANT: Seamless switch to cut cake + wedge extraction
                      this.wholeCakeGroup.visible = false;
                      this.cutCakeMasterGroup.visible = true;

                      // Position knife right under wedge like a cake server
                      this.knifeGroup.position.set(0.6, 0.92, 0.6);
                      this.knifeGroup.rotation.set(0, -this.sliceAngle / 2, 0);

                      // Knife & Slice lift slightly (+0.35 Y)
                      this.interpolate(400, (p) => {
                        this.knifeGroup.position.y = 0.92 + p * 0.35;
                        this.cutSliceGroup.position.y = p * 0.35;
                      }, () => {
                        // Platter appears on the table
                        this.cutSlicePlate.visible = true;
                        this.cutSlicePlate.position.set(0.8, 0.86, 0.8);

                        // Slide slice forward onto plate
                        const targetPos = new THREE.Vector3(2.6, 0.06, 2.6);
                        const targetPlate = new THREE.Vector3(2.8, 0.86, 2.8);

                        this.interpolate(1000, (p) => {
                          const ease = this.easeInOutQuad(p);
                          this.cutSliceGroup.position.x = ease * targetPos.x;
                          this.cutSliceGroup.position.z = ease * targetPos.z;
                          this.knifeGroup.position.x = 0.6 + ease * targetPos.x;
                          this.knifeGroup.position.z = 0.6 + ease * targetPos.z;
                          this.cutSlicePlate.position.lerpVectors(new THREE.Vector3(0.8, 0.86, 0.8), targetPlate, ease);
                        }, () => {
                          // Fork appears beside slice
                          this.forkGroup.visible = true;
                          this.forkGroup.position.set(targetPlate.x + 1.2, 0.88, targetPlate.z - 0.5);

                          // Knife pulls back and vanishes
                          this.interpolate(450, (p) => {
                            this.knifeGroup.position.y += 0.08;
                            this.knifeGroup.position.x -= 0.1;
                            this.knifeGroup.position.z -= 0.1;
                          }, () => {
                            this.knifeGroup.visible = false;
                          });

                          // 7. CELEBRATION CLIMAX: Confetti, Fanfare & Wish Card
                          this.isSliceCut = true;
                          this.isCuttingInProgress = false;
                          this.triggerCelebration();

                          statusText.textContent = 'First slice served for Aditi! 🍰 Enjoy every sweet bite! ❤️';

                          // Pop-up wish modal opens
                          setTimeout(() => {
                            document.getElementById('wish-modal').classList.add('open');
                            sound.playChime(880.00, 1.0);
                          }, 600);
                        });
                      });
                    });
                  }, 250);
                });
              }, 250);
            });
          }, 250);
        });
      }, 700);
    }

    spawnSlicingCrumbs(pos) {
      const crumbMat = new THREE.MeshStandardMaterial({ color: 0xf5cf98, roughness: 0.8 });
      for (let i = 0; i < 4; i++) {
        const geo = new THREE.DodecahedronGeometry(0.04 + Math.random() * 0.03);
        const mesh = new THREE.Mesh(geo, crumbMat);
        mesh.position.set(pos.x + (Math.random() - 0.5) * 0.2, pos.y, pos.z + (Math.random() - 0.5) * 0.2);
        mesh.userData = {
          velocity: new THREE.Vector3((Math.random() - 0.5) * 0.02, -0.04 - Math.random() * 0.04, (Math.random() - 0.5) * 0.02)
        };
        this.scene.add(mesh);
        this.crumbs.push(mesh);
      }
    }

    // Helper Animation Interpolator
    interpolate(durationMs, onUpdate, onComplete) {
      const start = performance.now();
      const step = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / durationMs, 1.0);
        onUpdate(progress);
        if (progress < 1.0) {
          requestAnimationFrame(step);
        } else if (onComplete) {
          onComplete();
        }
      };
      requestAnimationFrame(step);
    }

    easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    smoothCameraMove(targetPos, targetLookAt, durationMs) {
      const startPos = this.camera.position.clone();
      const startLook = this.controls.target.clone();
      this.interpolate(durationMs, (p) => {
        const ease = this.easeInOutQuad(p);
        this.camera.position.lerpVectors(startPos, targetPos, ease);
        this.controls.target.lerpVectors(startLook, targetLookAt, ease);
      });
    }

    // --- OTHER INTERACTIVE ACTIONS ---
    extinguishCandle(index) {
      const candle = this.candles[index];
      if (!candle || !candle.userData.isLit) return;

      candle.userData.isLit = false;
      this.flames[index].visible = false;
      this.flameLights[index].intensity = 0;

      const worldPos = new THREE.Vector3();
      this.flames[index].getWorldPosition(worldPos);
      this.spawnSmoke(worldPos);
      sound.playWhoosh();
      this.updateStatus();
    }

    extinguishAllCandles() {
      let blownAny = false;
      this.candles.forEach((candle, idx) => {
        if (candle.userData.isLit) {
          setTimeout(() => this.extinguishCandle(idx), idx * 110);
          blownAny = true;
        }
      });

      if (blownAny) {
        setTimeout(() => this.triggerCelebration(), 5 * 110 + 220);
      }
    }

    relightCandles() {
      sound.playIgnite();
      this.candles.forEach((candle, idx) => {
        candle.userData.isLit = true;
        this.flames[idx].visible = true;
        this.flames[idx].scale.set(0.1, 0.1, 0.1);
        this.flameLights[idx].intensity = 1.8;

        const worldPos = new THREE.Vector3();
        this.flames[idx].getWorldPosition(worldPos);
        this.spawnSparks(worldPos);
      });
      this.updateStatus();
    }

    toggleSparklers(buttonEl) {
      this.isSparklerActive = !this.isSparklerActive;
      buttonEl.classList.toggle('sparkler-active', this.isSparklerActive);
      buttonEl.innerHTML = this.isSparklerActive ? '🎆 Sparklers ON' : '✨ Sparklers';

      if (this.isSparklerActive) {
        sound.startSparklerSound();
      } else {
        sound.stopSparklerSound();
      }
    }

    spawnSmoke(pos) {
      for (let i = 0; i < 30; i++) {
        const geo = new THREE.SphereGeometry(0.06 + Math.random() * 0.07, 8, 8);
        const mat = new THREE.MeshBasicMaterial({ color: 0xeeeeee, transparent: true, opacity: 0.75 });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.copy(pos);
        mesh.userData = {
          velocity: new THREE.Vector3(
            (Math.random() - 0.5) * 0.02,
            0.04 + Math.random() * 0.045,
            (Math.random() - 0.5) * 0.02
          ),
          opacity: 0.75,
          scaleSpeed: 0.028
        };
        this.scene.add(mesh);
        this.smokeParticles.push(mesh);
      }
    }

    spawnSparks(pos) {
      for (let i = 0; i < 20; i++) {
        const geo = new THREE.SphereGeometry(0.035, 6, 6);
        const mat = new THREE.MeshBasicMaterial({ color: 0xffea44, transparent: true, opacity: 1 });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.copy(pos);
        mesh.userData = {
          velocity: new THREE.Vector3(
            (Math.random() - 0.5) * 0.09,
            0.06 + Math.random() * 0.09,
            (Math.random() - 0.5) * 0.09
          ),
          life: 1.0
        };
        this.scene.add(mesh);
        this.sparkParticles.push(mesh);
      }
    }

    triggerCelebration() {
      if (window.confetti) {
        window.confetti({
          particleCount: 140,
          spread: 85,
          origin: { y: 0.6 },
          colors: ['#f47298', '#ffd1dc', '#e5b358', '#ffffff', '#e85d88']
        });
      }
      sound.playChime(523.25, 0.5);
      setTimeout(() => sound.playChime(659.25, 0.5), 180);
      setTimeout(() => sound.playChime(783.99, 0.8), 360);
    }

    updateStatus() {
      const litCount = this.candles.filter(c => c.userData.isLit).length;
      const statusPill = document.getElementById('status-pill');
      const dot = statusPill.querySelector('.flame-count-dot');
      const text = statusPill.querySelector('span:last-child');

      if (litCount === 0) {
        dot.classList.add('out');
        text.textContent = 'All 5 wishes made! Happy Birthday Aditi! 🎉';
      } else {
        dot.classList.remove('out');
        text.textContent = `${litCount} flame${litCount > 1 ? 's' : ''} dancing, make a wish ✨`;
      }
    }

    toggleNightMode() {
      this.isNightMode = !this.isNightMode;
      document.body.classList.toggle('night-mode', this.isNightMode);

      if (this.isNightMode) {
        this.scene.fog.color.setHex(0x110716);
        this.ambientLight.intensity = 0.32;
        this.ambientLight.color.setHex(0x421d52);
        this.keyLight.intensity = 0.45;
        this.fillLight.intensity = 0.4;
        this.rimLight.intensity = 0.9;
        this.rimLight.color.setHex(0xff7799);
      } else {
        this.scene.fog.color.setHex(0xfff4f7);
        this.ambientLight.intensity = 0.78;
        this.ambientLight.color.setHex(0xfff6f0);
        this.keyLight.intensity = 1.0;
        this.fillLight.intensity = 0.65;
        this.rimLight.intensity = 0.55;
        this.rimLight.color.setHex(0xfda8be);
      }
    }

    async toggleMicrophone(buttonEl) {
      if (this.isMicActive) {
        if (this.micStream) {
          this.micStream.getTracks().forEach(track => track.stop());
        }
        this.isMicActive = false;
        buttonEl.classList.remove('mic-listening');
        buttonEl.innerHTML = '🎤 Mic Blow';
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        this.micStream = stream;
        sound.init();

        const audioCtx = sound.ctx;
        const source = audioCtx.createMediaStreamSource(stream);
        this.audioAnalyser = audioCtx.createAnalyser();
        this.audioAnalyser.fftSize = 256;
        source.connect(this.audioAnalyser);

        this.isMicActive = true;
        buttonEl.classList.add('mic-listening');
        buttonEl.innerHTML = '🌬️ Blow into mic now!';
      } catch (err) {
        alert('Microphone access was denied or not supported. You can still use the "Blow Candles" button!');
      }
    }

    checkMicrophoneBlow() {
      if (!this.isMicActive || !this.audioAnalyser) return;
      const dataArray = new Uint8Array(this.audioAnalyser.frequencyBinCount);
      this.audioAnalyser.getByteFrequencyData(dataArray);

      let sum = 0;
      for (let i = 0; i < 20; i++) sum += dataArray[i];
      const avg = sum / 20;

      if (avg > 72) {
        this.extinguishAllCandles();
      }
    }

    initEvents() {
      window.addEventListener('resize', () => {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
      });

      // Raycaster for Candle Flame Tapping
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();

      const onPointerDown = (e) => {
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        const clientY = e.clientY || (e.touches && e.touches[0].clientY);
        if (!clientX || !clientY) return;

        mouse.x = (clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, this.camera);
        const intersects = raycaster.intersectObjects(this.scene.children, true);

        for (let hit of intersects) {
          let curr = hit.object;
          while (curr && curr !== this.scene) {
            if (curr.userData && curr.userData.candleId !== undefined) {
              if (curr.userData.isLit) {
                this.extinguishCandle(curr.userData.candleId);
              }
              return;
            }
            curr = curr.parent;
          }
        }
      };

      this.canvas.addEventListener('click', onPointerDown);

      // UI Buttons Hookup
      const btnBlow = document.getElementById('btn-blow');
      if (btnBlow) btnBlow.addEventListener('click', () => this.extinguishAllCandles());

      const btnRelight = document.getElementById('btn-relight');
      if (btnRelight) btnRelight.addEventListener('click', () => this.relightCandles());

      const btnCut = document.getElementById('btn-cut');
      if (btnCut) btnCut.addEventListener('click', () => this.triggerCinematicCakeCut());

      const btnSparkler = document.getElementById('btn-sparkler');
      if (btnSparkler) btnSparkler.addEventListener('click', () => this.toggleSparklers(btnSparkler));

      const btnNight = document.getElementById('btn-night');
      if (btnNight) btnNight.classList.add('active');
      if (btnNight) btnNight.addEventListener('click', () => {
        this.toggleNightMode();
        btnNight.classList.toggle('active', this.isNightMode);
      });

      const btnMusic = document.getElementById('btn-music');
      if (btnMusic) btnMusic.addEventListener('click', () => {
        sound.toggleMusic((isPlaying) => {
          btnMusic.classList.toggle('active', isPlaying);
          btnMusic.innerHTML = isPlaying ? '🎵 Playing' : '🎵 Music';
        });
      });

      const btnMic = document.getElementById('btn-mic');
      if (btnMic) btnMic.addEventListener('click', () => this.toggleMicrophone(btnMic));

      const btnCloseModal = document.getElementById('close-modal');
      if (btnCloseModal) btnCloseModal.addEventListener('click', () => {
        document.getElementById('wish-modal').classList.remove('open');
      });

      const btnViewTop = document.getElementById('btn-view-top');
      if (btnViewTop) btnViewTop.addEventListener('click', () => {
        this.controls.autoRotate = false;
        this.smoothCameraMove(new THREE.Vector3(0, 12.5, 1.8), new THREE.Vector3(0, 1.25, 0), 800);
      });

      const btnViewReset = document.getElementById('btn-view-reset');
      if (btnViewReset) btnViewReset.addEventListener('click', () => {
        this.controls.autoRotate = true;
        this.smoothCameraMove(new THREE.Vector3(0, 5.6, 14.0), new THREE.Vector3(0, 1.25, 0), 800);
      });
    }

    animate() {
      requestAnimationFrame(() => this.animate());

      const time = performance.now() * 0.003;

      this.controls.update();
      this.checkMicrophoneBlow();

      // Dynamic Multiphase Flame Oscillations & Warm Candlelight
      this.flames.forEach((flame, idx) => {
        if (!flame.visible) return;

        const offset = idx * 1.8;
        const scaleY = 1.0 + Math.sin(time * 12 + offset) * 0.18 + Math.cos(time * 22 + offset) * 0.1;
        const scaleXZ = 1.0 + Math.cos(time * 15 + offset) * 0.12;

        flame.scale.set(scaleXZ, scaleY, scaleXZ);
        flame.rotation.z = Math.sin(time * 8 + offset) * 0.12;
        flame.rotation.x = Math.cos(time * 7 + offset) * 0.08;

        if (this.flameLights[idx]) {
          const baseIntensity = this.isNightMode ? 2.6 : 1.8;
          this.flameLights[idx].intensity = baseIntensity + Math.sin(time * 20 + offset) * 0.45 + (Math.random() - 0.5) * 0.25;
        }

        // Continual subtle rising embers
        if (Math.random() < 0.2) {
          const pos = new THREE.Vector3();
          flame.getWorldPosition(pos);
          pos.y += 0.3;
          this.spawnSingleEmber(pos);
        }

        // Sparkler mode shooting golden sparks
        if (this.isSparklerActive) {
          const pos = new THREE.Vector3();
          flame.getWorldPosition(pos);
          for (let s = 0; s < 4; s++) {
            this.spawnSparklerFountain(pos);
          }
        }
      });

      // Animate Slicing Crumbs falling to table
      for (let i = this.crumbs.length - 1; i >= 0; i--) {
        const c = this.crumbs[i];
        if (c.userData.velocity) {
          c.position.add(c.userData.velocity);
          if (c.position.y <= 0.94) {
            c.position.y = 0.94;
            c.userData.velocity = null; // settles on plate
          }
        }
      }

      // Animate Smoke
      for (let i = this.smokeParticles.length - 1; i >= 0; i--) {
        const p = this.smokeParticles[i];
        p.position.add(p.userData.velocity);
        p.scale.addScalar(p.userData.scaleSpeed);
        p.userData.opacity -= 0.012;
        p.material.opacity = p.userData.opacity;

        if (p.userData.opacity <= 0) {
          this.scene.remove(p);
          this.smokeParticles.splice(i, 1);
        }
      }

      // Animate Sparks
      for (let i = this.sparkParticles.length - 1; i >= 0; i--) {
        const s = this.sparkParticles[i];
        s.position.add(s.userData.velocity);
        s.userData.velocity.y -= 0.002;
        s.userData.life -= 0.035;
        s.material.opacity = s.userData.life;

        if (s.userData.life <= 0) {
          this.scene.remove(s);
          this.sparkParticles.splice(i, 1);
        }
      }

      // Animate Sparkler Fountain Particles
      for (let i = this.sparklerParticles.length - 1; i >= 0; i--) {
        const sp = this.sparklerParticles[i];
        sp.position.add(sp.userData.velocity);
        sp.userData.velocity.y -= 0.004;
        sp.userData.life -= 0.045;
        sp.material.opacity = sp.userData.life;

        if (sp.userData.life <= 0) {
          this.scene.remove(sp);
          this.sparklerParticles.splice(i, 1);
        }
      }

      // Animate Floating Starlight
      if (this.starlightPoints) {
        this.starlightPoints.rotation.y = time * 0.03;
      }

      this.renderer.render(this.scene, this.camera);
    }

    spawnSingleEmber(pos) {
      const geo = new THREE.SphereGeometry(0.025, 4, 4);
      const mat = new THREE.MeshBasicMaterial({ color: 0xffaa22, transparent: true, opacity: 0.9 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(pos.x + (Math.random() - 0.5) * 0.1, pos.y, pos.z + (Math.random() - 0.5) * 0.1);
      mesh.userData = {
        velocity: new THREE.Vector3((Math.random() - 0.5) * 0.01, 0.025 + Math.random() * 0.02, (Math.random() - 0.5) * 0.01),
        life: 0.9
      };
      this.scene.add(mesh);
      this.sparkParticles.push(mesh);
    }

    spawnSparklerFountain(pos) {
      const geo = new THREE.SphereGeometry(0.032, 4, 4);
      const mat = new THREE.MeshBasicMaterial({ color: 0xfffa66, transparent: true, opacity: 1 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.copy(pos);
      mesh.userData = {
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.08,
          0.12 + Math.random() * 0.15,
          (Math.random() - 0.5) * 0.08
        ),
        life: 1.0
      };
      this.scene.add(mesh);
      this.sparklerParticles.push(mesh);
    }
  }

  window.addEventListener('DOMContentLoaded', () => {
    new BirthdayCake3D();
  });
})();
