import React, { useState, useEffect, useCallback } from 'react';
import {
  Volume2,
  Delete,
  RotateCcw,
  Shuffle,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';
import { SPELLING_TASKS, SpellingTask } from '../data/bodyVocabulary';
import { CloseUpAnatomySVG } from './CloseUpAnatomySVG';
import {
  playClickSound,
  playCorrectSound,
  playStarSound,
  playWrongSound,
  speakEnglish,
} from '../utils/audio';

interface SpellingTabProps {
  solvedTaskIds: string[];
  onSolveTask: (taskId: string) => void;
}

interface TileItem {
  tileId: string;
  letter: string;
}

function buildLetterPool(task: SpellingTask): TileItem[] {
  const targetLetters = task.targetWord.split('');
  const distractorsPool = ['A', 'E', 'I', 'O', 'U', 'S', 'H', 'N', 'T', 'R', 'L', 'D'];
  const extras: string[] = [];

  // Pedagogical distractor: include 'S' when target is 'EYE' so students actively distinguish eye vs eyes
  if (task.targetWord === 'EYE') {
    extras.push('S', 'A', 'N');
  } else {
    for (const ch of distractorsPool) {
      if (extras.length >= 3) break;
      if (!targetLetters.includes(ch) || (ch === 'S' && !targetLetters.includes('S'))) {
        extras.push(ch);
      }
    }
    while (extras.length < 3) {
      extras.push(distractorsPool[extras.length % distractorsPool.length]);
    }
  }

  const combined = [...targetLetters, ...extras].map((letter, idx) => ({
    tileId: `${task.id}-${idx}-${letter}`,
    letter,
  }));

  // Deterministic-feeling shuffle that avoids starting already in exact order
  for (let i = combined.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [combined[i], combined[j]] = [combined[j], combined[i]];
  }
  return combined;
}

export const SpellingTab: React.FC<SpellingTabProps> = ({ solvedTaskIds, onSolveTask }) => {
  const [taskIndex, setTaskIndex] = useState(0);
  const currentTask = SPELLING_TASKS[taskIndex];

  const [pool, setPool] = useState<TileItem[]>(() => buildLetterPool(currentTask));
  const [placedTileIds, setPlacedTileIds] = useState<(string | null)[]>(() =>
    Array(currentTask.targetWord.length).fill(null)
  );
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [feedbackMsg, setFeedbackMsg] = useState<string>('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const resetForTask = useCallback((task: SpellingTask) => {
    setPool(buildLetterPool(task));
    setPlacedTileIds(Array(task.targetWord.length).fill(null));
    setStatus('idle');
    setFeedbackMsg('');
  }, []);

  const handleSelectTask = (idx: number) => {
    setTaskIndex(idx);
    resetForTask(SPELLING_TASKS[idx]);
  };

  const evaluateWord = useCallback(
    (nextPlaced: (string | null)[]) => {
      if (nextPlaced.some((id) => id === null)) {
        setStatus('idle');
        setFeedbackMsg('');
        return;
      }

      const formed = nextPlaced
        .map((id) => pool.find((t) => t.tileId === id)?.letter || '')
        .join('');

      if (formed === currentTask.targetWord) {
        playCorrectSound();
        if (!solvedTaskIds.includes(currentTask.id)) {
          window.setTimeout(() => playStarSound(), 280);
        }
        onSolveTask(currentTask.id);
        setStatus('correct');
        setFeedbackMsg(`Hebat! "${currentTask.targetWord}" artinya ${currentTask.indonesian}.`);
        speakEnglish(currentTask.exampleSentence, { rate: 0.85 });
      } else {
        playWrongSound();
        setStatus('wrong');
        if (currentTask.targetWord === 'EYE' && formed.includes('S')) {
          setFeedbackMsg('Perhatikan gambar: hanya 1 mata terbuka, jadi gunakan "EYE" tanpa huruf S.');
        } else if (currentTask.targetWord === 'EYES' && formed.startsWith('EYE')) {
          setFeedbackMsg('Hampir tepat! Ada 2 mata terbuka, jangan lupa huruf S di akhir.');
        } else {
          setFeedbackMsg(
            `Ejaan "${formed}" belum tepat. Klik huruf di kotak atas untuk menggantinya.`
          );
        }
      }
    },
    [currentTask, onSolveTask, pool, solvedTaskIds]
  );

  const handlePickTile = useCallback(
    (tile: TileItem) => {
      if (status === 'correct') return;
      if (placedTileIds.includes(tile.tileId)) return;

      const emptySlotIdx = placedTileIds.findIndex((id) => id === null);
      if (emptySlotIdx === -1) return;

      playClickSound();
      const next = [...placedTileIds];
      next[emptySlotIdx] = tile.tileId;
      setPlacedTileIds(next);
      evaluateWord(next);
    },
    [evaluateWord, placedTileIds, status]
  );

  const handleRemoveSlot = (slotIdx: number) => {
    if (status === 'correct') return;
    if (placedTileIds[slotIdx] === null) return;
    playClickSound();
    const next = [...placedTileIds];
    next[slotIdx] = null;
    setPlacedTileIds(next);
    setStatus('idle');
    setFeedbackMsg('');
  };

  const handleBackspace = useCallback(() => {
    if (status === 'correct') return;
    const lastFilledIdx = [...placedTileIds]
      .map((v, i) => (v !== null ? i : -1))
      .filter((i) => i !== -1)
      .pop();

    if (lastFilledIdx === undefined) return;
    playClickSound();
    const next = [...placedTileIds];
    next[lastFilledIdx] = null;
    setPlacedTileIds(next);
    setStatus('idle');
    setFeedbackMsg('');
  }, [placedTileIds, status]);

  const handleReshuffle = () => {
    playClickSound();
    setPlacedTileIds(Array(currentTask.targetWord.length).fill(null));
    setPool(buildLetterPool(currentTask));
    setStatus('idle');
    setFeedbackMsg('');
  };

  // Physical keyboard support for desktop learners
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'Backspace') {
        handleBackspace();
        return;
      }
      const upper = e.key.toUpperCase();
      if (/^[A-Z]$/.test(upper)) {
        const availableTile = pool.find(
          (t) => t.letter === upper && !placedTileIds.includes(t.tileId)
        );
        if (availableTile) {
          handlePickTile(availableTile);
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleBackspace, handlePickTile, placedTileIds, pool]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Left Zone: Close-up Image + Audio Hint */}
      <section
        aria-label="Gambar dan Petunjuk Ejaan"
        className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-4"
      >
        <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <span className="text-sm font-bold text-slate-900 tabular-nums">
            Kata {taskIndex + 1} dari {SPELLING_TASKS.length}
          </span>
          <span className="text-sm font-semibold text-emerald-700 tabular-nums">
            {solvedTaskIds.length}/{SPELLING_TASKS.length} Selesai
          </span>
        </div>

        <div className="rounded-xl overflow-hidden border border-slate-200 bg-sky-50/40">
          <CloseUpAnatomySVG part={currentTask.anatomyId} />
        </div>

        <div className="space-y-1.5">
          <p className="text-xs font-semibold text-slate-500">Arti & Petunjuk</p>
          <p className="text-xl font-extrabold text-slate-900">{currentTask.indonesian}</p>
          <p className="text-sm text-slate-600">{currentTask.grammarHint}</p>
        </div>

        <button
          type="button"
          onClick={() =>
            speakEnglish(currentTask.audioHint, {
              rate: 0.85,
              onStart: () => setIsSpeaking(true),
              onEnd: () => setIsSpeaking(false),
            })
          }
          className={`w-full inline-flex items-center justify-center gap-2 min-h-[48px] px-4 py-2.5 rounded-xl text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-sky-600 ${
            isSpeaking
              ? 'bg-emerald-600 text-white'
              : 'bg-sky-600 text-white hover:bg-sky-700'
          }`}
        >
          <Volume2 className="w-5 h-5" aria-hidden="true" />
          <span>{isSpeaking ? 'Membacakan Petunjuk...' : 'Dengar Audio Petunjuk'}</span>
        </button>

        {/* Quick word selector */}
        <div className="pt-3 border-t border-slate-100">
          <p className="text-xs font-semibold text-slate-500 mb-2">Pilih soal ejaan:</p>
          <div className="flex flex-wrap gap-1.5">
            {SPELLING_TASKS.map((t, idx) => {
              const solved = solvedTaskIds.includes(t.id);
              const active = idx === taskIndex;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => handleSelectTask(idx)}
                  className={`min-h-[38px] min-w-[38px] px-2.5 rounded-lg text-xs font-bold tabular-nums transition-colors ${
                    active
                      ? 'bg-slate-900 text-white'
                      : solved
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

      {/* Right Zone: Letter Slots & Shuffled Tiles */}
      <section
        aria-label="Susun Huruf Ejaan"
        className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-6"
      >
        <div>
          <h2 className="text-xl font-bold text-slate-900">Susun Huruf Menjadi Kata Bahasa Inggris</h2>
          <p className="text-sm text-slate-600 mt-1">
            Klik tombol huruf di bawah secara berurutan (atau ketik lewat keyboard) untuk mengisi kotak kosong.
          </p>
        </div>

        {/* Answer Letter Slots */}
        <div
          className={`p-5 rounded-xl border ${
            status === 'correct'
              ? 'bg-emerald-50/70 border-emerald-300'
              : status === 'wrong'
              ? 'bg-rose-50/70 border-rose-300 animate-gentle-shake'
              : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div className="flex flex-wrap items-center justify-center gap-3">
            {placedTileIds.map((tileId, idx) => {
              const tile = pool.find((t) => t.tileId === tileId);
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleRemoveSlot(idx)}
                  disabled={!tile || status === 'correct'}
                  aria-label={tile ? `Hapus huruf ${tile.letter}` : `Kotak huruf ${idx + 1} kosong`}
                  className={`w-13 h-15 sm:w-16 sm:h-18 rounded-xl text-2xl sm:text-3xl font-extrabold font-display flex items-center justify-center transition-all focus-visible:outline-2 focus-visible:outline-sky-600 ${
                    tile
                      ? status === 'correct'
                        ? 'bg-emerald-600 text-white border-2 border-emerald-700'
                        : status === 'wrong'
                        ? 'bg-rose-600 text-white border-2 border-rose-700'
                        : 'bg-white text-slate-900 border-2 border-sky-500 hover:bg-sky-50'
                      : 'bg-white text-slate-300 border-2 border-dashed border-slate-300'
                  }`}
                >
                  {tile ? tile.letter : ''}
                </button>
              );
            })}
          </div>
        </div>

        {/* Feedback Banner */}
        {status === 'correct' && (
          <div
            role="status"
            className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 flex items-start gap-3 animate-pop-in"
          >
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
            <div className="space-y-1">
              <p className="font-bold text-emerald-950">{feedbackMsg}</p>
              <p className="text-sm text-emerald-900">
                Contoh kalimat: <span className="font-semibold">“{currentTask.exampleSentence}”</span>
              </p>
            </div>
          </div>
        )}

        {status === 'wrong' && (
          <div
            role="status"
            className="p-4 rounded-xl bg-rose-50 border border-rose-300 flex items-start gap-3 animate-pop-in"
          >
            <AlertCircle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="font-bold text-rose-950">Ejaan Belum Tepat</p>
              <p className="text-sm text-rose-900">{feedbackMsg}</p>
            </div>
          </div>
        )}

        {/* Shuffled Letter Buttons */}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-slate-700">Pilihan Huruf Acak:</p>
          <div className="flex flex-wrap gap-2.5">
            {pool.map((tile) => {
              const used = placedTileIds.includes(tile.tileId);
              return (
                <button
                  key={tile.tileId}
                  type="button"
                  disabled={used || status === 'correct'}
                  onClick={() => handlePickTile(tile)}
                  className={`min-w-[52px] min-h-[54px] px-4 rounded-xl text-xl font-extrabold font-display transition-all focus-visible:outline-2 focus-visible:outline-sky-600 ${
                    used
                      ? 'bg-slate-100 text-slate-300 border border-slate-200 cursor-not-allowed'
                      : 'bg-white text-slate-900 border-2 border-slate-300 hover:border-sky-500 hover:bg-sky-50 active:scale-95'
                  }`}
                >
                  {tile.letter}
                </button>
              );
            })}
          </div>
        </div>

        {/* Utility Controls */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleBackspace}
              disabled={status === 'correct'}
              className="inline-flex items-center gap-1.5 min-h-[44px] px-3.5 py-2 rounded-xl text-sm font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 disabled:opacity-50 whitespace-nowrap"
            >
              <Delete className="w-4 h-4" aria-hidden="true" />
              <span>Hapus 1 Huruf</span>
            </button>
            <button
              type="button"
              onClick={() => resetForTask(currentTask)}
              className="inline-flex items-center gap-1.5 min-h-[44px] px-3.5 py-2 rounded-xl text-sm font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 whitespace-nowrap"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              <span>Kosongkan</span>
            </button>
            <button
              type="button"
              onClick={handleReshuffle}
              className="inline-flex items-center gap-1.5 min-h-[44px] px-3.5 py-2 rounded-xl text-sm font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 whitespace-nowrap"
            >
              <Shuffle className="w-4 h-4" aria-hidden="true" />
              <span>Acak Huruf</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => handleSelectTask((taskIndex + 1) % SPELLING_TASKS.length)}
            className={`inline-flex items-center gap-2 min-h-[48px] px-5 py-2.5 rounded-xl text-sm font-bold transition-colors whitespace-nowrap ${
              status === 'correct'
                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                : 'bg-slate-900 text-white hover:bg-slate-800'
            }`}
          >
            <span>
              {taskIndex === SPELLING_TASKS.length - 1 ? 'Ulang dari Awal' : 'Kata Berikutnya'}
            </span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </section>
    </div>
  );
};
