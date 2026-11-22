import React, { useState, useRef, useEffect } from 'react';
import {
  Volume2,
  Mic,
  MicOff,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Info,
} from 'lucide-react';
import { SPEAKING_TASKS } from '../data/bodyVocabulary';
import { CloseUpAnatomySVG } from './CloseUpAnatomySVG';
import {
  evaluatePronunciation,
  playCorrectSound,
  playStarSound,
  playWrongSound,
  PronunciationResult,
  speakEnglish,
} from '../utils/audio';

interface SpeakingTabProps {
  completedTaskIds: string[];
  onCompleteTask: (taskId: string) => void;
}

interface SpeechRecognitionAlternativeLike {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionResultLike {
  isFinal: boolean;
  0: SpeechRecognitionAlternativeLike;
}

interface SpeechRecognitionEventLike {
  results: ArrayLike<SpeechRecognitionResultLike>;
}

interface SpeechRecognitionErrorEventLike {
  error: string;
}

interface SpeechRecognitionInstance {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  continuous: boolean;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEventLike) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

type SpeechRecognitionCtor = new () => SpeechRecognitionInstance;

function getSpeechRecognitionConstructor(): SpeechRecognitionCtor | null {
  if (typeof window === 'undefined') return null;
  const w = window as unknown as {
    SpeechRecognition?: SpeechRecognitionCtor;
    webkitSpeechRecognition?: SpeechRecognitionCtor;
  };
  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
}

export const SpeakingTab: React.FC<SpeakingTabProps> = ({
  completedTaskIds,
  onCompleteTask,
}) => {
  const [taskIndex, setTaskIndex] = useState(0);
  const currentTask = SPEAKING_TASKS[taskIndex];

  const [isSpeakingExample, setIsSpeakingExample] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [result, setResult] = useState<PronunciationResult | null>(null);
  const [micError, setMicError] = useState<string | null>(null);
  const [manualDone, setManualDone] = useState(false);

  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const speechSupported = Boolean(getSpeechRecognitionConstructor());

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // Ignore cleanup errors
        }
      }
    };
  }, []);

  const resetForTask = (nextIndex: number) => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // Ignore
      }
    }
    setIsListening(false);
    setTaskIndex(nextIndex);
    setTranscript('');
    setResult(null);
    setMicError(null);
    setManualDone(false);
  };

  const handleListenExample = () => {
    speakEnglish(currentTask.targetSentence, {
      rate: 0.85,
      onStart: () => setIsSpeakingExample(true),
      onEnd: () => setIsSpeakingExample(false),
    });
  };

  const handleToggleSpeechRecognition = () => {
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    const Ctor = getSpeechRecognitionConstructor();
    if (!Ctor) {
      setMicError(
        'Browser ini belum mendukung pengenalan suara otomatis. Gunakan Google Chrome atau Microsoft Edge, atau gunakan tombol Latihan Mandiri di bawah.'
      );
      return;
    }

    setMicError(null);
    setResult(null);
    setTranscript('');

    try {
      const recognition = new Ctor();
      recognition.lang = 'en-US';
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;
      recognition.continuous = false;

      let latestText = '';

      recognition.onresult = (event) => {
        let combined = '';
        for (let i = 0; i < event.results.length; i++) {
          combined += event.results[i][0].transcript + ' ';
        }
        latestText = combined.trim();
        setTranscript(latestText);
      };

      recognition.onerror = (event) => {
        setIsListening(false);
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          setMicError(
            'Izin mikrofon belum diberikan. Aktifkan izin mikrofon di browser, atau gunakan tombol Latihan Mandiri di bawah ini.'
          );
        } else if (event.error === 'no-speech') {
          setMicError('Suara belum terdeteksi. Coba tekan "Mulai Bicara" lalu ucapkan kalimat dengan jelas.');
        } else {
          setMicError(
            'Mikrofon sedang tidak tersedia di perangkat ini. Kamu tetap bisa berlatih dengan tombol Latihan Mandiri.'
          );
        }
      };

      recognition.onend = () => {
        setIsListening(false);
        if (latestText) {
          const evalResult = evaluatePronunciation(currentTask.targetSentence, latestText);
          setResult(evalResult);
          if (evalResult.passed) {
            playCorrectSound();
            if (!completedTaskIds.includes(currentTask.id)) {
              window.setTimeout(() => playStarSound(), 280);
            }
            onCompleteTask(currentTask.id);
          } else {
            playWrongSound();
          }
        }
      };

      recognitionRef.current = recognition;
      setIsListening(true);
      recognition.start();
    } catch {
      setIsListening(false);
      setMicError(
        'Pengenalan suara tidak dapat dimulai di jendela browser ini. Gunakan mode Latihan Mandiri di bawah.'
      );
    }
  };

  const handleManualPracticeComplete = () => {
    playCorrectSound();
    if (!completedTaskIds.includes(currentTask.id)) {
      window.setTimeout(() => playStarSound(), 260);
    }
    onCompleteTask(currentTask.id);
    setManualDone(true);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Left Zone: Target Sentence & Visual Aid */}
      <section
        aria-label="Target Kalimat Berbicara"
        className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-4"
      >
        <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <span className="text-sm font-bold text-slate-900 tabular-nums">
            Kalimat {taskIndex + 1} dari {SPEAKING_TASKS.length}
          </span>
          <span className="text-sm font-semibold text-emerald-700 tabular-nums">
            {completedTaskIds.length}/{SPEAKING_TASKS.length} Selesai
          </span>
        </div>

        <div className="rounded-xl overflow-hidden border border-slate-200 bg-sky-50/40">
          <CloseUpAnatomySVG part={currentTask.anatomyId} />
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold text-slate-500">Kalimat Target Bahasa Inggris</p>
          <p className="text-2xl font-extrabold text-slate-900 leading-snug">
            “{currentTask.targetSentence}”
          </p>
          <p className="text-sm text-slate-600">{currentTask.indonesianMeaning}</p>
        </div>

        <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-sm text-amber-950">
          <span className="font-bold">Tips Pelafalan: </span>
          {currentTask.pronunciationTip}
        </div>

        {/* Task Switcher */}
        <div className="pt-3 border-t border-slate-100">
          <p className="text-xs font-semibold text-slate-500 mb-2">Pilih kalimat latihan:</p>
          <div className="flex flex-wrap gap-1.5">
            {SPEAKING_TASKS.map((t, idx) => {
              const done = completedTaskIds.includes(t.id);
              const active = idx === taskIndex;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => resetForTask(idx)}
                  className={`min-h-[38px] min-w-[38px] px-2.5 rounded-lg text-xs font-bold tabular-nums transition-colors ${
                    active
                      ? 'bg-slate-900 text-white'
                      : done
                      ? 'bg-emerald-100 text-emerald-900 hover:bg-emerald-200'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Right Zone: Speech Synthesis & Speech Recognition Practice */}
      <section
        aria-label="Latihan Berbicara dengan Mikrofon"
        className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-5"
      >
        <div>
          <h2 className="text-xl font-bold text-slate-900">Ayo Ucapkan dalam Bahasa Inggris!</h2>
          <p className="text-sm text-slate-600 mt-1">
            Langkah 1: Dengarkan contoh suaranya. Langkah 2: Tekan tombol mikrofon dan tirukan dengan lantang.
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleListenExample}
            className={`inline-flex items-center gap-2 min-h-[52px] px-5 py-3 rounded-xl text-base font-bold transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-sky-600 ${
              isSpeakingExample
                ? 'bg-emerald-600 text-white'
                : 'bg-sky-600 text-white hover:bg-sky-700'
            }`}
          >
            <Volume2 className="w-5 h-5" aria-hidden="true" />
            <span>{isSpeakingExample ? 'Sedang Memutar...' : 'Dengarkan Contoh'}</span>
          </button>

          <button
            type="button"
            onClick={handleToggleSpeechRecognition}
            disabled={!speechSupported}
            className={`inline-flex items-center gap-2 min-h-[52px] px-5 py-3 rounded-xl text-base font-bold transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-sky-600 ${
              !speechSupported
                ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                : isListening
                ? 'bg-rose-600 text-white hover:bg-rose-700'
                : 'bg-slate-900 text-white hover:bg-slate-800'
            }`}
          >
            {isListening ? (
              <>
                <MicOff className="w-5 h-5" aria-hidden="true" />
                <span>Berhenti Mendengarkan</span>
              </>
            ) : (
              <>
                <Mic className="w-5 h-5" aria-hidden="true" />
                <span>Mulai Bicara</span>
              </>
            )}
          </button>
        </div>

        {/* Listening Indicator / Transcript Box */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
          <p className="text-xs font-semibold text-slate-500">
            {isListening ? 'Mikrofon aktif — silakan ucapkan kalimat target...' : 'Hasil Ucapanmu:'}
          </p>
          <p className="text-lg font-bold text-slate-900 min-h-[28px]">
            {transcript ? `“${transcript}”` : isListening ? 'Mendengarkan suara...' : 'Belum ada rekaman suara.'}
          </p>
        </div>

        {/* Pronunciation Score & Word-by-Word Breakdown */}
        {result && (
          <div
            role="status"
            className={`p-4 rounded-xl border space-y-3 animate-pop-in ${
              result.passed
                ? 'bg-emerald-50 border-emerald-300'
                : 'bg-amber-50 border-amber-300'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                {result.passed ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" aria-hidden="true" />
                ) : (
                  <AlertCircle className="w-6 h-6 text-amber-600 shrink-0" aria-hidden="true" />
                )}
                <span className="font-bold text-slate-900">{result.feedbackTitle}</span>
              </div>
              <span className="text-base font-extrabold text-slate-900 tabular-nums">
                Skor Kemiripan: {result.score}%
              </span>
            </div>

            <p className="text-sm text-slate-700">{result.feedbackDetail}</p>

            {/* Word-by-word feedback */}
            <div className="pt-2 border-t border-slate-200/70">
              <p className="text-xs font-semibold text-slate-600 mb-2">Kata yang terdengar tepat:</p>
              <div className="flex flex-wrap gap-2">
                {result.wordMatches.map((wm, idx) => (
                  <span
                    key={`${wm.word}-${idx}`}
                    className={`px-2.5 py-1 rounded-lg text-sm font-bold ${
                      wm.matched
                        ? 'bg-emerald-100 text-emerald-900'
                        : 'bg-white text-slate-500 border border-slate-200'
                    }`}
                  >
                    {wm.word}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Friendly Fallback for Browsers Without SpeechRecognition or Blocked Mic */}
        {(!speechSupported || micError) && (
          <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 space-y-3">
            <div className="flex items-start gap-2.5">
              <Info className="w-5 h-5 text-sky-700 shrink-0 mt-0.5" aria-hidden="true" />
              <div className="space-y-1">
                <p className="text-sm font-bold text-slate-900">Mode Latihan Mandiri (Tanpa Mikrofon)</p>
                <p className="text-sm text-slate-700">
                  {micError ||
                    'Browser ini belum mendukung fitur mikrofon Speech Recognition secara langsung (fitur ini berjalan paling baik di Google Chrome atau Microsoft Edge). Kamu tetap bisa menekan "Dengarkan Contoh", mengucapkannya dengan suara lantang, lalu menekan tombol di bawah!'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleManualPracticeComplete}
              className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-xl text-sm font-bold bg-emerald-600 text-white hover:bg-emerald-700 whitespace-nowrap"
            >
              <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
              <span>Saya Sudah Mengucapkannya dengan Jelas!</span>
            </button>
          </div>
        )}

        {manualDone && !result && (
          <div
            role="status"
            className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 flex items-center gap-2.5 animate-pop-in"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" aria-hidden="true" />
            <p className="text-sm font-bold text-emerald-950">
              Kerja bagus! Kamu sudah berlatih mengucapkan kalimat ini. +1 Bintang!
            </p>
          </div>
        )}

        {/* Next Sentence Button */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
          <button
            type="button"
            onClick={() => resetForTask((taskIndex + 1) % SPEAKING_TASKS.length)}
            className={`inline-flex items-center gap-2 min-h-[48px] px-5 py-2.5 rounded-xl text-sm font-bold transition-colors whitespace-nowrap ${
              result?.passed || manualDone
                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                : 'bg-slate-900 text-white hover:bg-slate-800'
            }`}
          >
            <span>
              {taskIndex === SPEAKING_TASKS.length - 1 ? 'Ulang dari Kalimat 1' : 'Kalimat Berikutnya'}
            </span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </section>
    </div>
  );
};
