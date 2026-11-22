let sharedAudioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const AudioCtx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) return null;
  if (!sharedAudioCtx) {
    sharedAudioCtx = new AudioCtx();
  }
  if (sharedAudioCtx.state === 'suspended') {
    sharedAudioCtx.resume().catch(() => {});
  }
  return sharedAudioCtx;
}

export function playClickSound(): void {
  const ctx = getAudioContext();
  if (!ctx) return;
  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(680, now + 0.045);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.065);
  } catch {
    // Ignore audio context blocks
  }
}

export function playCorrectSound(): void {
  const ctx = getAudioContext();
  if (!ctx) return;
  try {
    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5 E5 G5 C6
    notes.forEach((freq, idx) => {
      const start = now + idx * 0.075;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0.001, start);
      gain.gain.linearRampToValueAtTime(0.14, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.24);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.26);
    });
  } catch {
    // Ignore
  }
}

export function playWrongSound(): void {
  const ctx = getAudioContext();
  if (!ctx) return;
  try {
    const now = ctx.currentTime;
    const notes = [329.63, 261.63]; // E4 -> C4 gentle boop
    notes.forEach((freq, idx) => {
      const start = now + idx * 0.13;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0.001, start);
      gain.gain.linearRampToValueAtTime(0.11, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.22);
    });
  } catch {
    // Ignore
  }
}

export function playStarSound(): void {
  const ctx = getAudioContext();
  if (!ctx) return;
  try {
    const now = ctx.currentTime;
    const notes = [587.33, 739.99, 880, 1174.66]; // D5 F#5 A5 D6
    notes.forEach((freq, idx) => {
      const start = now + idx * 0.06;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0.001, start);
      gain.gain.linearRampToValueAtTime(0.12, start + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.32);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.34);
    });
  } catch {
    // Ignore
  }
}

function pickEnglishVoice(): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;

  const preferredNames = [
    'Google US English',
    'Google UK English Female',
    'Samantha',
    'Daniel',
    'Alex',
    'Microsoft Aria',
    'Microsoft Jenny',
  ];

  for (const name of preferredNames) {
    const match = voices.find((v) => v.name.includes(name) && v.lang.startsWith('en'));
    if (match) return match;
  }

  return (
    voices.find((v) => v.lang === 'en-US') ||
    voices.find((v) => v.lang === 'en-GB') ||
    voices.find((v) => v.lang.startsWith('en')) ||
    null
  );
}

export function stopSpeaking(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

export function speakEnglish(
  text: string,
  options?: {
    rate?: number;
    onStart?: () => void;
    onEnd?: () => void;
    onError?: () => void;
  }
): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    options?.onError?.();
    return false;
  }

  const synth = window.speechSynthesis;
  synth.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = options?.rate ?? 0.85;
  utterance.pitch = 1.04;

  const voice = pickEnglishVoice();
  if (voice) {
    utterance.voice = voice;
    utterance.lang = voice.lang;
  }

  let finished = false;
  const done = () => {
    if (finished) return;
    finished = true;
    options?.onEnd?.();
  };

  utterance.onstart = () => options?.onStart?.();
  utterance.onend = done;
  utterance.onerror = () => {
    if (!finished) {
      finished = true;
      options?.onEnd?.();
    }
  };

  // Safety timeout in case a browser speech engine hangs without firing onend
  const fallbackMs = Math.max(2500, text.length * 140);
  window.setTimeout(done, fallbackMs);

  synth.speak(utterance);
  return true;
}

function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }
  return dp[m][n];
}

function normalizeSentence(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export interface PronunciationResult {
  score: number;
  passed: boolean;
  wordMatches: { word: string; matched: boolean }[];
  feedbackTitle: string;
  feedbackDetail: string;
}

export function evaluatePronunciation(expected: string, spoken: string): PronunciationResult {
  const normExpected = normalizeSentence(expected);
  const normSpoken = normalizeSentence(spoken);

  if (!normSpoken) {
    return {
      score: 0,
      passed: false,
      wordMatches: normExpected.split(' ').map((w) => ({ word: w, matched: false })),
      feedbackTitle: 'Suara belum terdengar',
      feedbackDetail: 'Coba dekatkan mikrofon dan ucapkan kalimat dengan jelas.',
    };
  }

  const expectedWords = normExpected.split(' ');
  const spokenWords = normSpoken.split(' ');

  const wordMatches = expectedWords.map((ew) => {
    const matched = spokenWords.some((sw) => {
      if (sw === ew) return true;
      // Handle common homophones from speech recognition (e.g., "eye" -> "i", "two" -> "to")
      if (ew === 'eye' && (sw === 'i' || sw === 'aye')) return true;
      if (ew === 'eyes' && sw === 'ice') return false;
      const dist = levenshtein(ew, sw);
      return ew.length >= 4 ? dist <= 1 : dist === 0;
    });
    return { word: ew, matched };
  });

  const matchedCount = wordMatches.filter((w) => w.matched).length;
  const wordRatio = matchedCount / expectedWords.length;

  const maxLen = Math.max(normExpected.length, normSpoken.length);
  const charSimilarity = maxLen > 0 ? 1 - levenshtein(normExpected, normSpoken) / maxLen : 0;

  const score = Math.round(Math.min(100, Math.max(0, (wordRatio * 0.65 + charSimilarity * 0.35) * 100)));
  const passed = score >= 68 || wordRatio >= 0.75;

  let feedbackTitle = 'Ayo coba sekali lagi!';
  let feedbackDetail = 'Dengarkan contoh suaranya lalu tirukan kata demi kata dengan santai.';

  if (score >= 88) {
    feedbackTitle = 'Luar Biasa! Pelafalan Sangat Jelas!';
    feedbackDetail = 'Kamu mengucapkan kalimat bahasa Inggris dengan sangat tepat.';
  } else if (score >= 68) {
    feedbackTitle = 'Bagus Sekali! Kamu Berhasil!';
    feedbackDetail = 'Pelafalanmu sudah jelas dan mudah dipahami. Terus berlatih!';
  } else if (score >= 45) {
    feedbackTitle = 'Hampir Tepat! Coba Lagi Ya';
    feedbackDetail = 'Beberapa kata sudah benar. Perhatikan kata yang masih berwarna abu-abu.';
  }

  return {
    score,
    passed,
    wordMatches,
    feedbackTitle,
    feedbackDetail,
  };
}
