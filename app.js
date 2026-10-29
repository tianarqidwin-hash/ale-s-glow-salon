(() => {
  'use strict';

  const $ = id => document.getElementById(id);
  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
  const shuffle = array => {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };
  const randomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const diagnoses = [
    { id: 'comedonal', label: 'Jerawat komedo', icon: '⚫' },
    { id: 'inflammatory', label: 'Jerawat meradang', icon: '🔴' },
    { id: 'oilyAcne', label: 'Kulit berminyak dengan jerawat ringan', icon: '🫧' },
    { id: 'sensitive', label: 'Kulit sensitif atau iritasi', icon: '🌸' },
    { id: 'severe', label: 'Jerawat berat yang perlu dirujuk', icon: '🩺' }
  ];

  const products = [
    { id: 'assessment', name: 'Analisis Kulit & Kontraindikasi', icon: '🔎', desc: 'Periksa kondisi kulit, riwayat kesehatan, dan kelayakan tindakan.' },
    { id: 'gentleCleansing', name: 'Pembersihan Lembut', icon: '🫧', desc: 'Membersihkan permukaan kulit tanpa menggosok secara agresif.' },
    { id: 'ultrasonicScrubber', name: 'Ultrasonic Scrubber', icon: '〰️', desc: 'Getaran ultrasonik untuk membantu pembersihan sesuai manual.' },
    { id: 'highFrequency', name: 'High Frequency', icon: '⚡', desc: 'Alat frekuensi tinggi; gunakan hanya jika indikasi dan protokol mengizinkan.' },
    { id: 'galvanic', name: 'Galvanic', icon: '🔌', desc: 'Arus searah untuk aplikasi tertentu sesuai petunjuk produsen.' },
    { id: 'ledTherapy', name: 'LED Light Therapy', icon: '💡', desc: 'Cahaya dengan panjang gelombang tertentu; perhatikan perlindungan mata.' },
    { id: 'vacuumSuction', name: 'Vacuum Suction', icon: '🌀', desc: 'Tekanan isap; hindari penggunaan agresif pada jerawat meradang.' },
    { id: 'microcurrent', name: 'Microcurrent', icon: '〽️', desc: 'Stimulasi listrik rendah untuk tujuan kosmetik tertentu.' },
    { id: 'steamer', name: 'Facial Steamer', icon: '♨️', desc: 'Uap hangat; perhatikan risiko iritasi dan paparan panas.' },
    { id: 'finishing', name: 'Finishing & Edukasi', icon: '🧴', desc: 'Evaluasi respons kulit dan berikan edukasi perawatan lanjutan.' },
    { id: 'referral', name: 'Hentikan Tindakan & Rujuk', icon: '🩺', desc: 'Hindari tindakan agresif dan sarankan evaluasi tenaga kesehatan.' }
  ];

  const customers = [
    {
      name: 'Nadia', age: 22, avatar: 'foto 3.jpeg',
      complaint: 'Dahi dan hidung berminyak, dengan komedo dan beberapa jerawat kecil.',
      symptoms: ['Area T-zone mengilap', 'Komedo di hidung', 'Jerawat ringan'],
      diagnosis: 'comedonal',
      notes: 'Utamakan pembersihan lembut. Scrubber hanya dipertimbangkan jika kondisi kulit dan petunjuk perangkat mengizinkan.',
      routine: ['assessment', 'gentleCleansing', 'ultrasonicScrubber', 'finishing'],
      bubble: 'Aku ingin kulit terasa lebih bersih tanpa digosok kasar.'
    },
    {
      name: 'Raka', age: 24, avatar: 'foto 2.jpeg',
      complaint: 'Pipi merah dan beberapa jerawat terasa nyeri saat disentuh.',
      symptoms: ['Jerawat merah dan meradang', 'Sebagian terasa nyeri', 'Kulit berisiko makin iritasi'],
      diagnosis: 'inflammatory',
      notes: 'Hindari vacuum, scrub, dan ekstraksi agresif pada jerawat meradang. Pertimbangkan rujukan sesuai tingkat keparahan.',
      routine: ['assessment', 'gentleCleansing', 'referral'],
      bubble: 'Jerawatku sedang merah dan sakit. Apa yang aman?'
    },
    {
      name: 'Citra', age: 25, avatar: 'foto 5. jpeg.jpeg',
      complaint: 'Komedo tertutup di dahi dan dagu, serta kulit mudah berminyak.',
      symptoms: ['Komedo tertutup', 'Minyak berlebih', 'Tidak terlihat luka terbuka'],
      diagnosis: 'comedonal',
      notes: 'Pilih metode lembut sesuai indikasi. Jangan memaksa mengeluarkan komedo.',
      routine: ['assessment', 'gentleCleansing', 'ultrasonicScrubber', 'finishing'],
      bubble: 'Aku ingin tahu fungsi alat yang membantu membersihkan permukaan kulit.'
    },
    {
      name: 'Dimas', age: 23, avatar: 'foto 4.jpeg',
      complaint: 'Wajah terasa perih dan kemerahan setelah memakai produk baru.',
      symptoms: ['Kulit terasa perih', 'Kemerahan', 'Toleransi kulit menurun'],
      diagnosis: 'sensitive',
      notes: 'Utamakan menghentikan pemicu dan perawatan lembut. Hindari alat listrik bila kondisi belum aman.',
      routine: ['assessment', 'gentleCleansing', 'finishing'],
      bubble: 'Kulitku sedang sensitif. Tolong jangan sampai makin iritasi.'
    },
    {
      name: 'Salsa', age: 21, avatar: 'foto 2.jpeg',
      complaint: 'Kulit berminyak dan ada jerawat ringan, tetapi pipi mudah kemerahan.',
      symptoms: ['Minyak berlebih', 'Jerawat ringan', 'Pipi mudah kemerahan'],
      diagnosis: 'oilyAcne',
      notes: 'Pilih pendekatan konservatif. LED hanya digunakan jika indikasi dan protokol sesuai.',
      routine: ['assessment', 'gentleCleansing', 'ledTherapy', 'finishing'],
      bubble: 'Aku ingin perawatan yang lembut dan sesuai kondisi kulitku.'
    },
    {
      name: 'Farhan', age: 26, avatar: 'foto 4.jpeg',
      complaint: 'Ada jerawat besar dan dalam yang nyeri serta mulai meninggalkan bekas.',
      symptoms: ['Jerawat dalam dan nyeri', 'Risiko bekas luka', 'Perlu penilaian profesional'],
      diagnosis: 'severe',
      notes: 'Jerawat dalam, nyeri, atau berisiko meninggalkan jaringan parut perlu dinilai tenaga kesehatan.',
      routine: ['assessment', 'gentleCleansing', 'referral'],
      bubble: 'Jerawatku cukup parah. Apa perlu diperiksa dulu?'
    }
  ];

  const productFor = id => products.find(p => p.id === id);
  const labelForProduct = id => productFor(id)?.name || id;

  const state = {
    screen: 'homeScreen',
    score: 0, lives: 5, served: 0,
    customerIndex: 0, customerOrder: [], customer: null,
    phase: 'diagnosis', step: 0, seconds: 60, timer: null,
    questionSeconds: 60, questionTimer: null,
    paused: false, gameOver: false,
    quizDeck: [], quizLimit: 12, quizPointer: 0,
    currentQuestion: null, quizAnswered: 0,
    penaltyReason: '', soundOn: true, musicOn: true, voiceOn: false,
    audioContext: null, musicInterval: null, musicStep: 0,
    usedMini: { ingredient: false, water: false, skinTap: false },
    tonerTaps: 0
  };

  // AUDIO DAN EFEK SUARA
  function ensureAudio() {
    if (!state.audioContext) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) state.audioContext = new AudioContextClass();
    }
    if (state.audioContext?.state === 'suspended') {
      state.audioContext.resume().catch(() => {});
    }
    return state.audioContext;
  }

  function tone(freq = 440, duration = 0.12, wave = 'sine', volume = 0.025, delay = 0) {
    if (!state.soundOn) return;
    const ctx = ensureAudio();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = wave;
    osc.frequency.value = freq;

    const start = ctx.currentTime + delay;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(volume, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(start);
    osc.stop(start + duration + 0.03);
  }

  function sfx(kind) {
    if (!state.soundOn) return;
    if (kind === 'click') tone(540, 0.045, 'sine', 0.018);
    if (kind === 'correct') {
      tone(660, 0.12, 'sine', 0.035);
      tone(880, 0.16, 'sine', 0.03, 0.09);
      tone(1046, 0.2, 'sine', 0.025, 0.2);
    }
    if (kind === 'wrong') {
      tone(260, 0.16, 'triangle', 0.04);
      tone(190, 0.2, 'triangle', 0.03, 0.1);
    }
    if (kind === 'customer') {
      tone(520, 0.1, 'sine', 0.025);
      tone(720, 0.13, 'sine', 0.025, 0.1);
    }
    if (kind === 'coin') {
      tone(850, 0.06, 'triangle', 0.025);
      tone(1150, 0.09, 'triangle', 0.02, 0.06);
    }
    if (kind === 'alarm') {
      tone(420, 0.12, 'square', 0.015);
      tone(320, 0.12, 'square', 0.015, 0.16);
    }
  }

  // MUSIK LATAR SINTETIS: TIDAK MEMERLUKAN FILE MP3
  const melody = [
    523.25, 659.25, 783.99, 659.25,
    587.33, 698.46, 880, 698.46,
    523.25, 659.25, 783.99, 880,
    1046.5, 880, 783.99, 659.25,
    587.33, 659.25, 698.46, 783.99,
    698.46, 659.25, 587.33, 523.25
  ];
  const bassline = [130.81, 146.83, 164.81, 196, 174.61, 146.83, 130.81, 164.81];

  function playMusicTick() {
    if (!state.musicOn || !state.soundOn || state.gameOver) return;
    const i = state.musicStep % melody.length;
    const note = melody[i];

    tone(note, 0.26, 'sine', 0.008);
    if (i % 2 === 0) tone(note * 1.25, 0.19, 'sine', 0.002, 0.045);
    if (i % 3 === 0) tone(bassline[Math.floor(i / 3) % bassline.length], 0.32, 'triangle', 0.004);

    state.musicStep++;
  }

  function startMusic() {
    const allowed = ['gameScreen', 'punishmentScreen', 'pauseScreen'];
    if (!allowed.includes(state.screen) || state.musicInterval ||
        !state.musicOn || !state.soundOn || state.gameOver) return;

    ensureAudio();
    if (state.audioContext?.state === 'suspended') {
      state.audioContext.resume().catch(() => {});
    }
    playMusicTick();
    state.musicInterval = setInterval(playMusicTick, 320);
  }

  function stopMusic() {
    if (state.musicInterval) clearInterval(state.musicInterval);
    state.musicInterval = null;
  }

  function speak(text) {
    if (!state.voiceOn || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID';
    utterance.rate = 0.94;
    utterance.pitch = 1.08;
    window.speechSynthesis.speak(utterance);
  }

  function updateSoundButtons() {
    $('soundToggle').classList.toggle('is-off', !state.soundOn);
    $('soundToggle').textContent = state.soundOn ? '🔊' : '🔇';
    $('musicToggle').classList.toggle('is-off', !state.musicOn);
    $('musicToggle').textContent = state.musicOn ? '🎵' : '🎶';
    $('voiceToggle').classList.toggle('is-off', !state.voiceOn);
    $('voiceToggle').textContent = state.voiceOn ? '🗣️' : '🔈';
  }

  function showScreen(id) {
    state.screen = id;
    document.querySelectorAll('.screen').forEach(el => {
      el.classList.toggle('active', el.id === id);
    });
    $('gameHud').classList.toggle('hidden', id !== 'gameScreen');

    if (['gameScreen', 'punishmentScreen', 'pauseScreen'].includes(id)) {
      startMusic();
    } else {
      stopMusic();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function formatTime(seconds) {
    seconds = Math.max(0, seconds);
    return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
  }

  function stopTimer() {
    clearInterval(state.timer);
    state.timer = null;
  }

  function stopQuestionTimer() {
    clearInterval(state.questionTimer);
    state.questionTimer = null;
  }

  function updateQuestionClock() {
    $('questionTimer').textContent = formatTime(state.questionSeconds);
    $('questionTimerBar').style.width = `${state.questionSeconds / 60 * 100}%`;
    $('questionTimer').classList.toggle('urgent', state.questionSeconds <= 10);
  }

  function startQuestionTimer() {
    stopQuestionTimer();
    state.questionSeconds = 60;
    updateQuestionClock();

    state.questionTimer = setInterval(() => {
      if (state.screen !== 'punishmentScreen' || state.gameOver) return;
      state.questionSeconds--;
      updateQuestionClock();

      if (state.questionSeconds <= 10 && state.questionSeconds > 0) sfx('alarm');

      if (state.questionSeconds <= 0) {
        stopQuestionTimer();
        const q = state.currentQuestion || {};
        gradeQuestion(
          false,
          `Waktu habis. Jawaban benar: ${q.answer || q.answerLabel || 'lihat pembahasan'}`,
          q.explanation || 'Waktu menjawab telah habis.'
        );
      }
    }, 1000);
  }

  function updateHud() {
    $('hudScore').textContent = state.score;
    $('hudCustomer').textContent = `${Math.min(state.customerIndex + 1, 6)}/6`;
    $('hudLives').textContent = Array.from({ length: 5 }, (_, i) => i < state.lives ? '♥' : '♡').join(' ');
    $('hudLives').setAttribute('aria-label', `${state.lives} dari 5 nyawa`);
    $('hudTimer').textContent = formatTime(state.seconds);
    $('timerLarge').textContent = formatTime(state.seconds);
    $('timerBar').style.width = `${Math.max(0, state.seconds / 60 * 100)}%`;
    $('gameScore').textContent = state.score;
    $('gameServed').textContent = state.served;
  }

  function beginShift() {
    stopTimer();
    stopQuestionTimer();
    stopMusic();

    state.score = 0;
    state.lives = 5;
    state.served = 0;
    state.customerIndex = 0;
    state.step = 0;
    state.seconds = 60;
    state.phase = 'diagnosis';
    state.paused = false;
    state.gameOver = false;
    state.quizLimit = randomInt(10, 15);
    state.quizDeck = shuffle(window.QUESTION_BANK || []).slice(0, state.quizLimit);
    state.quizPointer = 0;
    state.currentQuestion = null;
    state.quizAnswered = 0;
    state.usedMini = { ingredient: false, water: false, skinTap: false };
    state.tonerTaps = 0;
    state.customerOrder = shuffle(customers);

    showScreen('gameScreen');
    renderMiniGames();
    renderCustomer();
    updateHud();
    startTimer();
    startMusic();
    sfx('customer');
    speak('Selamat datang di salon. Shift dimulai!');
  }

  function startTimer() {
    stopTimer();
    state.timer = setInterval(() => {
      if (state.gameOver || state.paused || state.screen !== 'gameScreen' || state.phase === 'complete') return;

      state.seconds--;
      updateHud();

      if (state.seconds <= 8 && state.seconds > 0) sfx('alarm');

      if (state.seconds <= 0) {
        sfx('wrong');
        mistake('Waktu pelanggan habis!');
      }
    }, 1000);
  }

  function renderCustomer() {
    if (state.gameOver) return;
    if (state.customerIndex >= state.customerOrder.length) {
      finishShift('Semua pelanggan shift ini telah dilayani!');
      return;
    }

    state.customer = state.customerOrder[state.customerIndex];
    state.phase = 'diagnosis';
    state.step = 0;
    state.seconds = 60;

    const c = state.customer;
    $('phaseEyebrow').textContent = 'KONSULTASI PELANGGAN';
    $('shiftHeading').textContent = 'Pelanggan baru datang!';
    $('shiftSubheading').textContent = 'Dengarkan keluhan sebelum memilih tindakan.';
    $('clientAvatar').src = c.avatar;
    $('clientAvatar').alt = `Ilustrasi pelanggan ${c.name}`;
    $('clientNumber').textContent = `PELANGGAN ${String(state.customerIndex + 1).padStart(2, '0')}`;
    $('clientMood').textContent = 'MENUNGGU';
    $('clientName').textContent = `${c.name}, ${c.age} tahun`;
    $('clientComplaint').textContent = c.complaint;
    $('clientBubble').textContent = c.bubble;
    $('clientSymptoms').innerHTML = c.symptoms.map(x => `<li>${escapeHtml(x)}</li>`).join('');

    $('diagnosisPanel').classList.remove('hidden');
    $('carePanel').classList.add('hidden');
    $('tabConsult').classList.add('current');
    $('tabCare').classList.remove('current');
    $('gameFeedback').classList.add('hidden');
    $('gameFeedback').textContent = '';

    renderDiagnosis();
    renderServiceSteps();
    updateHud();
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[c]);
  }

  function renderDiagnosis() {
    const box = $('diagnosisOptions');
    box.innerHTML = '';

    shuffle(diagnoses).forEach(d => {
      const button = document.createElement('button');
      button.className = 'choice-button';
      button.innerHTML = `<span class="choice-icon">${d.icon}</span><span>${escapeHtml(d.label)}</span>`;
      button.addEventListener('click', () => chooseDiagnosis(d.id));
      box.appendChild(button);
    });
  }

  function chooseDiagnosis(id) {
    if (state.phase !== 'diagnosis' || state.screen !== 'gameScreen') return;

    if (id !== state.customer.diagnosis) {
      sfx('wrong');
      mistake('Penilaian kondisi kulit belum sesuai dengan keluhan pelanggan.');
      return;
    }

    state.phase = 'care';
    state.score += 15;
    state.step = 0;
    sfx('correct');
    speak('Konsultasi selesai. Mari pilih langkah yang sesuai.');

    $('clientMood').textContent = 'SIAP DIRAWAT';
    $('phaseEyebrow').textContent = 'TAHAP PERAWATAN';
    $('shiftHeading').textContent = 'Analisis sesuai!';
    $('shiftSubheading').textContent = 'Pilih langkah berdasarkan kondisi kulit dan petunjuk alat.';
    $('diagnosisPanel').classList.add('hidden');
    $('carePanel').classList.remove('hidden');
    $('tabConsult').classList.remove('current');
    $('tabCare').classList.add('current');

    feedback(`✓ Penilaian sesuai. ${state.customer.notes}`, 'good');
    renderRoutine();
    renderServiceSteps();
    updateHud();
  }

  function renderRoutine() {
    const c = state.customer;
    const box = $('routineTimeline');
    box.innerHTML = '';

    c.routine.forEach((id, index) => {
      const p = productFor(id);
      const item = document.createElement('div');
      item.className = 'routine-step' + (index < state.step ? ' done' : index === state.step ? ' current' : '');
      item.innerHTML = `<span class="step-icon">${index < state.step ? '✓' : (p?.icon || '🧴')}</span><span>${escapeHtml(labelForProduct(id))}</span>`;
      box.appendChild(item);
    });

    $('careTitle').textContent = state.step >= c.routine.length
      ? 'Perawatan selesai!'
      : `Pilih langkah ${state.step + 1} dari ${c.routine.length}`;
    $('careInstructions').textContent = 'Ikuti SOP: analisis kulit, pembersihan lembut, pemilihan alat sesuai indikasi, lalu evaluasi.';

    const grid = $('productGrid');
    grid.innerHTML = '';

    shuffle(products).forEach(p => {
      const button = document.createElement('button');
      button.className = 'product-card';
      button.innerHTML = `<span class="product-emoji">${p.icon}</span><strong>${escapeHtml(p.name)}</strong><small>${escapeHtml(p.desc)}</small>`;
      button.disabled = state.phase !== 'care' || c.routine.slice(0, state.step).includes(p.id);
      button.addEventListener('click', () => chooseProduct(p.id));
      grid.appendChild(button);
    });
  }

  function chooseProduct(id) {
    if (state.phase !== 'care' || state.screen !== 'gameScreen') return;

    const expected = state.customer.routine[state.step];
    if (id !== expected) {
      sfx('wrong');
      mistake('Langkah atau alat yang dipilih belum sesuai. Pelajari tantangan remedial.');
      return;
    }

    const product = productFor(id);
    state.step++;
    state.score += 10;
    sfx('correct');
    speak(`${product.name}. Langkah berhasil.`);
    feedback(`✓ ${product.name}: ${product.desc}`, 'good');
    renderRoutine();
    renderServiceSteps();
    updateHud();

    if (state.step >= state.customer.routine.length) completeCustomer();
  }

  function renderServiceSteps() {
    const box = $('serviceSteps');
    box.innerHTML = '';
    const c = state.customer;
    if (!c) return;

    c.routine.forEach((id, index) => {
      const item = document.createElement('div');
      item.className = 'service-step' + (state.phase === 'care' && index < state.step ? ' done' : '');
      item.innerHTML = `<span class="number">${state.phase === 'care' && index < state.step ? '✓' : index + 1}</span><span>${escapeHtml(labelForProduct(id))}</span>`;
      box.appendChild(item);
    });
  }

  function feedback(text, kind = '') {
    const el = $('gameFeedback');
    el.className = 'feedback' + (kind ? ' ' + kind : '');
    el.textContent = text;
    el.classList.remove('hidden');
  }

  function completeCustomer() {
    state.phase = 'complete';
    state.served++;
    state.score += 20;
    sfx('coin');
    speak('Pelanggan selesai. Kerja bagus!');

    $('clientMood').textContent = 'SELESAI ✨';
    $('phaseEyebrow').textContent = 'PELANGGAN SELESAI';
    $('shiftHeading').textContent = 'Simulasi perawatan selesai!';
    $('shiftSubheading').textContent = 'Bonus pelayanan diberikan. Lanjutkan ke pelanggan berikutnya.';
    $('careTitle').textContent = 'Semua langkah selesai';
    $('careInstructions').textContent = 'Ingat, praktik nyata harus mengikuti SOP dan petunjuk alat.';
    $('productGrid').innerHTML = '';
    $('routineTimeline').classList.add('completed');

    feedback('✨ Simulasi selesai! Bonus pelayanan +20 poin.', 'good');

    const button = document.createElement('button');
    button.className = 'btn primary';
    button.textContent = state.customerIndex === state.customerOrder.length - 1
      ? 'Lihat laporan shift →'
      : 'Pelanggan berikutnya →';

    button.addEventListener('click', () => {
      state.customerIndex++;
      $('routineTimeline').classList.remove('completed');
      renderCustomer();
      if (!state.gameOver) {
        updateHud();
        startTimer();
        sfx('customer');
      }
    });

    $('productGrid').appendChild(button);
    updateHud();
    stopTimer();
  }

  function mistake(reason) {
    if (state.gameOver) return;
    state.lives = clamp(state.lives - 1, 0, 5);
    state.penaltyReason = reason;
    updateHud();

    if (state.lives <= 0) {
      finishShift('Nyawa habis! Shift harus diakhiri.');
      return;
    }

    stopTimer();
    sfx('alarm');
    $('punishmentTitle').textContent = reason.includes('Waktu')
      ? 'Waktu habis!'
      : 'Yuk, pelajari lagi!';
    $('punishmentSubtitle').textContent = reason + ' Jawab tantangan remedial untuk kembali bekerja.';
    $('punishmentIcon').textContent = reason.includes('Waktu') ? '⏰' : '💭';
    $('penaltyLives').textContent = state.lives;

    loadNextQuestion();
    if (!state.gameOver) showScreen('punishmentScreen');
  }

  function loadNextQuestion() {
    if (state.quizPointer >= state.quizDeck.length) {
      finishShift('Bank tantangan shift telah habis.');
      return;
    }

    const q = state.quizDeck[state.quizPointer++];
    state.currentQuestion = q;
    state.quizAnswered++;

    $('penaltyCount').textContent = state.quizAnswered;
    $('penaltyMax').textContent = state.quizLimit;
    $('questionType').textContent = q.category.toUpperCase();
    $('questionDifficulty').textContent = (q.difficulty || 'MENENGAH').toUpperCase();
    $('questionTitle').textContent = q.question;
    $('questionScenario').textContent = q.scenario || '';
    $('questionAnswerArea').innerHTML = '';
    $('questionFeedback').classList.add('hidden');
    $('questionFeedback').innerHTML = '';
    $('questionContinue').classList.add('hidden');
    $('questionContinue').textContent = '';
    $('questionFooterNote').textContent = 'Baca pertanyaan dengan teliti.';

    if (q.type === 'choice') renderChoiceQuestion(q);
    else if (q.type === 'order') renderOrderQuestion(q);
    else if (q.type === 'short') renderShortQuestion(q);
    else if (q.type === 'match') renderMatchQuestion(q);

    startQuestionTimer();
  }

  function renderChoiceQuestion(q) {
    const box = $('questionAnswerArea');
    shuffle(q.options).forEach((option, index) => {
      const button = document.createElement('button');
      button.className = 'question-option';
      button.innerHTML = `<span class="option-letter">${String.fromCharCode(65 + index)}</span><span>${escapeHtml(option)}</span>`;
      button.addEventListener('click', () => gradeQuestion(
        option === q.answer, `Jawaban benar: ${q.answer}`, q.explanation
      ));
      box.appendChild(button);
    });
  }

  function renderOrderQuestion(q) {
    const box = $('questionAnswerArea');
    const helper = document.createElement('p');
    helper.className = 'muted';
    helper.textContent = 'Klik item sesuai urutan pilihanmu.';
    box.appendChild(helper);

    const selected = document.createElement('div');
    selected.className = 'order-answer';
    selected.textContent = 'Urutan pilihanmu akan tampil di sini.';
    box.appendChild(selected);

    const pool = document.createElement('div');
    pool.className = 'order-pool';
    box.appendChild(pool);

    const available = shuffle(q.items);
    let picked = [];

    function draw() {
      selected.innerHTML = picked.length
        ? picked.map((v, i) => `<b>${i + 1}.</b> ${escapeHtml(v)}`).join(' → ')
        : 'Urutan pilihanmu akan tampil di sini.';

      pool.innerHTML = '';
      available.forEach(item => {
        const button = document.createElement('button');
        button.className = 'order-item';
        button.textContent = item;
        button.disabled = picked.includes(item);
        button.addEventListener('click', () => {
          if (!picked.includes(item)) {
            picked.push(item);
            draw();
          }
        });
        pool.appendChild(button);
      });
    }

    draw();

    const row = document.createElement('div');
    row.className = 'inline-actions';

    const undo = document.createElement('button');
    undo.className = 'btn secondary small';
    undo.textContent = 'Hapus langkah terakhir';
    undo.addEventListener('click', () => {
      picked.pop();
      draw();
    });

    const submit = document.createElement('button');
    submit.className = 'btn primary small';
    submit.textContent = 'Periksa urutan';
    submit.addEventListener('click', () => {
      if (picked.length !== q.answer.length) {
        showTransientQuestionMessage('Lengkapi semua langkah terlebih dahulu.');
        return;
      }
      gradeQuestion(
        picked.every((v, i) => v === q.answer[i]),
        `Urutan benar: ${q.answer.join(' → ')}`,
        q.explanation
      );
    });

    row.append(undo, submit);
    box.appendChild(row);
  }

  function renderShortQuestion(q) {
    const box = $('questionAnswerArea');
    const input = document.createElement('input');
    input.className = 'answer-input';
    input.placeholder = 'Tulis jawabanmu…';
    input.maxLength = 120;
    box.appendChild(input);

    const button = document.createElement('button');
    button.className = 'btn primary small';
    button.textContent = 'Periksa jawaban';
    button.addEventListener('click', () => {
      const answer = normalize(input.value);
      if (!answer) return input.focus();
      const accepted = q.accepted || [];
      gradeQuestion(
        accepted.some(item => normalize(item) === answer),
        `Jawaban yang diterima: ${q.answerLabel}`,
        q.explanation
      );
    });

    input.addEventListener('keydown', event => {
      if (event.key === 'Enter') button.click();
    });
    box.append(button);
  }

  function renderMatchQuestion(q) {
    const box = $('questionAnswerArea');
    const helper = document.createElement('p');
    helper.className = 'muted';
    helper.textContent = 'Pilih fungsi yang benar untuk setiap istilah.';
    box.appendChild(helper);

    const rows = [];
    const rights = shuffle(q.pairs.map(pair => pair[1]));

    q.pairs.forEach(pair => {
      const row = document.createElement('div');
      row.className = 'match-row';

      const label = document.createElement('label');
      label.textContent = pair[0];

      const select = document.createElement('select');
      select.setAttribute('aria-label', `Fungsi ${pair[0]}`);

      const blank = document.createElement('option');
      blank.value = '';
      blank.textContent = 'Pilih fungsi…';
      select.appendChild(blank);

      shuffle(rights).forEach(right => {
        const option = document.createElement('option');
        option.value = right;
        option.textContent = right;
        select.appendChild(option);
      });

      row.append(label, select);
      box.appendChild(row);
      rows.push({ term: pair[0], select });
    });

    const button = document.createElement('button');
    button.className = 'btn primary small';
    button.textContent = 'Periksa pasangan';
    button.addEventListener('click', () => {
      if (rows.some(row => !row.select.value)) {
        showTransientQuestionMessage('Lengkapi semua pasangan.');
        return;
      }

      const correct = rows.every(row =>
        q.pairs.some(pair => pair[0] === row.term && pair[1] === row.select.value)
      );
      const expected = q.pairs.map(pair => `${pair[0]} → ${pair[1]}`).join(' | ');
      gradeQuestion(correct, `Pasangan benar: ${expected}`, q.explanation);
    });

    box.appendChild(button);
  }

  function normalize(value) {
    return String(value || '')
      .toLocaleLowerCase('id-ID')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9 ]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function showTransientQuestionMessage(text) {
    const note = $('questionFooterNote');
    note.textContent = text;
    note.style.color = '#b14e7c';
    setTimeout(() => { note.style.color = ''; }, 1800);
  }

  function gradeQuestion(correct, answerText, explanation) {
    if (!$('questionContinue').classList.contains('hidden')) return;
    stopQuestionTimer();

    const feedbackBox = $('questionFeedback');
    feedbackBox.classList.remove('hidden');
    feedbackBox.innerHTML = `<strong>${correct ? '✓ Jawaban benar!' : '✦ Pembahasan jawaban'}</strong><div>${escapeHtml(answerText)}</div><p>${escapeHtml(explanation || '')}</p>`;

    $('questionAnswerArea').querySelectorAll('button,input,select').forEach(el => {
      el.disabled = true;
    });

    if (correct) {
      state.score += 10;
      sfx('correct');
      $('questionContinue').textContent = 'Kembali ke salon →';
      $('questionFooterNote').textContent = 'Kamu bisa kembali melayani pelanggan.';
    } else {
      state.score = Math.max(0, state.score - 3);
      sfx('wrong');
      $('questionContinue').textContent = state.quizPointer < state.quizDeck.length
        ? 'Soal berikutnya →'
        : 'Lihat hasil shift →';
      $('questionFooterNote').textContent = 'Soal ini tidak akan diulang dalam shift ini.';
    }

    $('questionContinue').classList.remove('hidden');
    updateHud();

    $('questionContinue').onclick = () => {
      if (!correct) {
        if (state.quizPointer >= state.quizDeck.length) {
          finishShift('Tantangan remedial selesai.');
          return;
        }
        loadNextQuestion();
      } else {
        showScreen('gameScreen');
        state.seconds = 45;
        restoreWorkstation();
        updateHud();
        startTimer();
      }
    };
  }

  function restoreWorkstation() {
    if (state.phase === 'diagnosis') {
      $('diagnosisPanel').classList.remove('hidden');
      $('carePanel').classList.add('hidden');
      renderDiagnosis();
    } else if (state.phase === 'care') {
      $('diagnosisPanel').classList.add('hidden');
      $('carePanel').classList.remove('hidden');
      renderRoutine();
    } else {
      $('diagnosisPanel').classList.add('hidden');
      $('carePanel').classList.remove('hidden');
      $('productGrid').innerHTML = '';
    }
    renderServiceSteps();
  }

  function finishShift(reason) {
    if (state.gameOver) return;
    state.gameOver = true;
    stopTimer();
    stopQuestionTimer();
    stopMusic();

    if ('speechSynthesis' in window) window.speechSynthesis.cancel();

    $('resultTitle').textContent = reason;
    $('resultMessage').textContent = state.served >= 5
      ? 'Kamu berhasil melayani banyak pelanggan. Bagus!'
      : 'Terus berlatih membaca keluhan dan memilih langkah yang aman.';
    $('resultScore').textContent = state.score;
    $('resultServed').textContent = state.served;
    $('resultLives').textContent = `${state.lives}/5`;
    $('resultQs').textContent = state.quizAnswered;

    showScreen('resultScreen');
    sfx('coin');
  }

  function renderMiniGames() {
    state.usedMini = { ingredient: false, water: false, skinTap: false };
    state.tonerTaps = 0;

    $('skinTapCount').innerHTML = '0<span>/7 cek</span>';
    $('skinTapBtn').disabled = false;
    $('skinTapBtn').textContent = '⚡ Cek alat';
    $('skinTapFeedback').textContent = '';

    const list = [
      {
        q: 'Alat yang menggunakan getaran ultrasonik',
        opts: ['Ultrasonic Scrubber', 'Vacuum Suction', 'LED Light Therapy'],
        a: 'Ultrasonic Scrubber',
        why: 'Ultrasonic Scrubber menggunakan getaran ultrasonik.'
      },
      {
        q: 'Alat yang menggunakan tekanan negatif',
        opts: ['Vacuum Suction', 'Galvanic', 'Microcurrent'],
        a: 'Vacuum Suction',
        why: 'Vacuum Suction bekerja dengan tekanan isap dan perlu kehati-hatian.'
      },
      {
        q: 'Perangkat yang menggunakan cahaya dengan panjang gelombang tertentu',
        opts: ['LED Light Therapy', 'Facial Steamer', 'High Frequency'],
        a: 'LED Light Therapy',
        why: 'LED Light Therapy menggunakan cahaya dengan panjang gelombang tertentu.'
      },
      {
        q: 'Perangkat yang menggunakan arus searah',
        opts: ['Galvanic', 'Ultrasonic Scrubber', 'Vacuum Suction'],
        a: 'Galvanic',
        why: 'Galvanic menggunakan arus listrik searah pada fungsi tertentu.'
      }
    ];

    state.miniQ = shuffle(list)[0];
    $('ingredientPrompt').textContent = state.miniQ.q + '.';
    $('ingredientChoices').innerHTML = '';

    shuffle(state.miniQ.opts).forEach(option => {
      const button = document.createElement('button');
      button.className = 'btn small secondary';
      button.textContent = option;
      button.addEventListener('click', () => {
        if (state.usedMini.ingredient) return;
        state.usedMini.ingredient = true;
        const correct = option === state.miniQ.a;

        if (correct) {
          state.score += 5;
          $('ingredientFeedback').textContent = `✓ Tepat! +5 poin. ${state.miniQ.why}`;
          sfx('correct');
        } else {
          state.score = Math.max(0, state.score - 2);
          $('ingredientFeedback').textContent = `Jawaban tepat: ${state.miniQ.a}. ${state.miniQ.why}`;
          sfx('wrong');
        }

        $('ingredientChoices').querySelectorAll('button').forEach(b => b.disabled = true);
        updateHud();
      });
      $('ingredientChoices').appendChild(button);
    });

    $('waterFeedback').textContent = '';
    document.querySelectorAll('[data-water]').forEach(button => {
      button.disabled = false;
      button.onclick = () => {
        if (state.usedMini.water) return;
        state.usedMini.water = true;
        const correct = button.dataset.water === 'false';

        if (correct) {
          state.score += 5;
          $('waterFeedback').textContent = '✓ Benar! Tidak semua alat cocok untuk semua kondisi kulit. +5 poin.';
          sfx('correct');
        } else {
          state.score = Math.max(0, state.score - 2);
          $('waterFeedback').textContent = 'Pemilihan alat bergantung pada kondisi kulit, kontraindikasi, dan manual.';
          sfx('wrong');
        }

        document.querySelectorAll('[data-water]').forEach(b => b.disabled = true);
        updateHud();
      };
    });
  }

  $('skinTapBtn').addEventListener('click', () => {
    if (state.usedMini.skinTap) return;
    state.tonerTaps++;

    $('skinTapCount').innerHTML = `${state.tonerTaps}<span>/7 cek</span>`;
    $('skinTapBtn').classList.remove('tap-pop');
    void $('skinTapBtn').offsetWidth;
    $('skinTapBtn').classList.add('tap-pop');
    tone(470 + state.tonerTaps * 65, 0.1, 'sine', 0.025);

    if (state.tonerTaps >= 7) {
      state.usedMini.skinTap = true;
      state.score += 8;
      $('skinTapBtn').disabled = true;
      $('skinTapBtn').textContent = '✓ Pemeriksaan selesai';
      $('skinTapFeedback').textContent = 'Selesai! Periksa kondisi kulit, kontraindikasi, kabel, aksesori, manual alat, kenyamanan pelanggan, dan kebersihan.';
      sfx('coin');
    } else {
      $('skinTapFeedback').textContent = `Pemeriksaan ${state.tonerTaps} dari 7. Lanjutkan checklist keselamatan.`;
    }
    updateHud();
  });

  function pauseShift() {
    if (state.screen !== 'gameScreen' || state.phase === 'complete') return;
    state.paused = true;
    stopTimer();
    showScreen('pauseScreen');
  }

  function resumeShift() {
    state.paused = false;
    showScreen('gameScreen');
    startTimer();
  }

  // TOMBOL-TOMBOL
  $('startGameBtn').addEventListener('click', beginShift);
  $('startFromMaterials').addEventListener('click', beginShift);
  $('replayBtn').addEventListener('click', beginShift);
  $('openMaterialsBtn').addEventListener('click', () => showScreen('materialsScreen'));

  document.querySelectorAll('[data-go]').forEach(button => {
    button.addEventListener('click', () => showScreen(button.dataset.go));
  });

  $('brandHome').addEventListener('click', event => {
    event.preventDefault();
    stopTimer();
    stopMusic();
    state.gameOver = true;
    showScreen('homeScreen');
  });

  $('pauseBtn').addEventListener('click', pauseShift);
  $('resumeBtn').addEventListener('click', resumeShift);
  $('quitBtn').addEventListener('click', () => finishShift('Shift diakhiri oleh terapis.'));

  $('soundToggle').addEventListener('click', () => {
    state.soundOn = !state.soundOn;
    updateSoundButtons();

    if (state.soundOn) {
      ensureAudio();
      sfx('correct');
      if (state.musicOn) startMusic();
    } else {
      stopMusic();
    }
  });

  $('musicToggle').addEventListener('click', () => {
    state.musicOn = !state.musicOn;
    updateSoundButtons();
    ensureAudio();

    if (state.musicOn && state.soundOn) startMusic();
    else stopMusic();

    if (state.soundOn) sfx('click');
  });

  $('voiceToggle').addEventListener('click', () => {
    state.voiceOn = !state.voiceOn;
    updateSoundButtons();

    if (state.voiceOn) {
      ensureAudio();
      speak('Suara karakter diaktifkan. Selamat bermain!');
    } else if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (state.soundOn) sfx('click');
  });

  updateSoundButtons();

  document.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (button && state.soundOn &&
        !['soundToggle', 'musicToggle', 'voiceToggle'].includes(button.id)) {
      sfx('click');
    }
  }, true);
})();