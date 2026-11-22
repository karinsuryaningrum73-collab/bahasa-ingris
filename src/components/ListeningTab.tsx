import React, { useState } from 'react';
import { Volume2, CheckCircle2, AlertCircle, ArrowRight, RotateCcw, Eye, HelpCircle } from 'lucide-react';
import {
  LISTENING_QUESTIONS,
  ListeningTargetId,
  BodyPartId,
} from '../data/bodyVocabulary';
import { BodyCharacterSVG } from './BodyCharacterSVG';
import { CloseUpAnatomySVG } from './CloseUpAnatomySVG';
import { playCorrectSound, playStarSound, playWrongSound, speakEnglish } from '../utils/audio';

interface ListeningTabProps {
  solvedQuestionIds: string[];
  onSolveQuestion: (questionId: string) => void;
}

export const ListeningTab: React.FC<ListeningTabProps> = ({
  solvedQuestionIds,
  onSolveQuestion,
}) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showTextHint, setShowTextHint] = useState(false);
  const [attemptState, setAttemptState] = useState<{
    status: 'idle' | 'correct' | 'wrong';
    clickedTarget?: ListeningTargetId;
    message?: string;
  }>({ status: 'idle' });
  const [shakeKey, setShakeKey] = useState(0);

  const currentQuestion = LISTENING_QUESTIONS[questionIndex];
  const isEyeQuestion =
    currentQuestion.targetId === 'one-eye' || currentQuestion.targetId === 'two-eyes';

  const handlePlayPrompt = () => {
    speakEnglish(currentQuestion.promptAudio, {
      rate: 0.85,
      onStart: () => setIsSpeaking(true),
      onEnd: () => setIsSpeaking(false),
    });
  };

  const handleSelectTarget = (target: ListeningTargetId) => {
    if (attemptState.status === 'correct') return;

    const isMatch = currentQuestion.acceptIds.includes(target);
    if (isMatch) {
      playCorrectSound();
      if (!solvedQuestionIds.includes(currentQuestion.id)) {
        window.setTimeout(() => playStarSound(), 280);
      }
      onSolveQuestion(currentQuestion.id);
      setAttemptState({
        status: 'correct',
        clickedTarget: target,
        message: currentQuestion.successNote,
      });
    } else {
      playWrongSound();
      setShakeKey((k) => k + 1);
      let correctionHint = 'Belum tepat, dengarkan lagi instruksinya ya!';
      if (currentQuestion.targetId === 'one-eye' && (target === 'eyes' || target === 'two-eyes')) {
        correctionHint = 'Hampir! Soal meminta "one eye" (satu mata yang berkedip), bukan dua mata.';
      } else if (currentQuestion.targetId === 'two-eyes' && target === 'one-eye') {
        correctionHint = 'Hampir! Soal meminta "two eyes" (kedua mata terbuka), bukan satu mata.';
      }
      setAttemptState({
        status: 'wrong',
        clickedTarget: target,
        message: correctionHint,
      });
    }
  };

  const handleNext = () => {
    const nextIdx = (questionIndex + 1) % LISTENING_QUESTIONS.length;
    setQuestionIndex(nextIdx);
    setAttemptState({ status: 'idle' });
    setShowTextHint(false);
    const nextQ = LISTENING_QUESTIONS[nextIdx];
    window.setTimeout(() => {
      speakEnglish(nextQ.promptAudio, {
        rate: 0.85,
        onStart: () => setIsSpeaking(true),
        onEnd: () => setIsSpeaking(false),
      });
    }, 150);
  };

  const handleRestart = () => {
    setQuestionIndex(0);
    setAttemptState({ status: 'idle' });
    setShowTextHint(false);
  };

  const mapCharacterFeedback = (): { targetId: BodyPartId; status: 'correct' | 'wrong' } | null => {
    if (attemptState.status === 'idle' || !attemptState.clickedTarget) return null;
    const t = attemptState.clickedTarget;
    if (t === 'one-eye' || t === 'two-eyes') return null;
    return { targetId: t, status: attemptState.status };
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Left Zone: Interactive Illustration Target Stage */}
      <section
        aria-label="Area Gambar Tantangan Menyimak"
        key={shakeKey}
        className={`lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 ${
          attemptState.status === 'wrong' ? 'animate-gentle-shake' : ''
        }`}
      >
        <div className="flex items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Klik Bagian Tubuh yang Tepat</h2>
            <p className="text-sm text-slate-600">
              Dengarkan audio instruksi, lalu ketuk bagian tubuh pada gambar anak di bawah ini.
            </p>
          </div>
        </div>

        <div className="py-3">
          <BodyCharacterSVG
            winkMode={
              attemptState.status === 'correct' && currentQuestion.targetId === 'one-eye'
            }
            feedbackState={mapCharacterFeedback()}
            onSelectPart={(part) => handleSelectTarget(part)}
            showHotspots={false}
          />
        </div>

        {/* Dedicated Visual Comparison Targets for One Eye vs Two Eyes */}
        <div className="pt-4 border-t border-slate-100 space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
            <Eye className="w-4 h-4 text-sky-600" aria-hidden="true" />
            <span>Pilihan Fokus Mata (untuk soal "one eye" vs "two eyes"):</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleSelectTarget('one-eye')}
              className={`p-2.5 rounded-xl border text-left transition-all focus-visible:outline-2 focus-visible:outline-sky-600 ${
                attemptState.clickedTarget === 'one-eye'
                  ? attemptState.status === 'correct'
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-rose-500 bg-rose-50'
                  : isEyeQuestion
                  ? 'border-amber-300 bg-amber-50/40 hover:border-sky-400'
                  : 'border-slate-200 bg-slate-50 hover:border-sky-400'
              }`}
            >
              <div className="rounded-lg overflow-hidden border border-slate-200 bg-white mb-2">
                <CloseUpAnatomySVG part="eye" />
              </div>
              <p className="text-sm font-bold text-slate-900 text-center">1 Mata (One Eye)</p>
            </button>

            <button
              type="button"
              onClick={() => handleSelectTarget('two-eyes')}
              className={`p-2.5 rounded-xl border text-left transition-all focus-visible:outline-2 focus-visible:outline-sky-600 ${
                attemptState.clickedTarget === 'two-eyes'
                  ? attemptState.status === 'correct'
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-rose-500 bg-rose-50'
                  : isEyeQuestion
                  ? 'border-amber-300 bg-amber-50/40 hover:border-sky-400'
                  : 'border-slate-200 bg-slate-50 hover:border-sky-400'
              }`}
            >
              <div className="rounded-lg overflow-hidden border border-slate-200 bg-white mb-2">
                <CloseUpAnatomySVG part="eyes" />
              </div>
              <p className="text-sm font-bold text-slate-900 text-center">2 Mata (Two Eyes)</p>
            </button>
          </div>
        </div>
      </section>

      {/* Right Zone: Audio Prompt & Feedback Controls */}
      <section
        aria-label="Kontrol Soal Menyimak"
        className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-5"
      >
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-slate-600 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2 font-semibold">
            <span className="text-slate-900 tabular-nums">
              Soal {questionIndex + 1} dari {LISTENING_QUESTIONS.length}
            </span>
            <span aria-hidden="true">·</span>
            <span className="text-sky-700">{currentQuestion.categoryLabel}</span>
          </div>
          <span className="font-semibold text-emerald-700 tabular-nums">
            {solvedQuestionIds.length}/{LISTENING_QUESTIONS.length} Selesai
          </span>
        </div>

        {/* Main Audio Play CTA */}
        <div className="p-5 rounded-xl bg-sky-50/70 border border-sky-200 space-y-4">
          <p className="text-sm font-semibold text-slate-700">
            Tekan tombol di bawah ini untuk mendengar perintah suara berbahasa Inggris:
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handlePlayPrompt}
              className={`inline-flex items-center gap-2.5 min-h-[52px] px-6 py-3 rounded-xl text-base font-bold transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 ${
                isSpeaking
                  ? 'bg-emerald-600 text-white'
                  : 'bg-sky-600 text-white hover:bg-sky-700'
              }`}
            >
              <Volume2 className="w-6 h-6" aria-hidden="true" />
              <span>{isSpeaking ? 'Sedang Membacakan...' : 'Putar Instruksi Audio'}</span>
            </button>

            <button
              type="button"
              onClick={() => setShowTextHint((prev) => !prev)}
              className="inline-flex items-center gap-2 min-h-[48px] px-4 py-2.5 rounded-xl text-sm font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 whitespace-nowrap"
            >
              <HelpCircle className="w-4 h-4 text-slate-500" aria-hidden="true" />
              <span>{showTextHint ? 'Sembunyikan Teks' : 'Lihat Teks Petunjuk'}</span>
            </button>
          </div>

          {(showTextHint || attemptState.status === 'correct') && (
            <div className="pt-3 border-t border-sky-200/70 space-y-1 animate-pop-in">
              <p className="text-lg font-bold text-slate-900">“{currentQuestion.promptText}”</p>
              <p className="text-sm text-slate-600">{currentQuestion.promptIndonesian}</p>
            </div>
          )}
        </div>

        {/* Explicit Visual + Text Feedback */}
        {attemptState.status === 'correct' && (
          <div
            role="status"
            className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 flex items-start gap-3 animate-pop-in"
          >
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
            <div className="space-y-1">
              <p className="font-bold text-emerald-950">Jawaban Benar! +1 Bintang</p>
              <p className="text-sm text-emerald-900">{attemptState.message}</p>
            </div>
          </div>
        )}

        {attemptState.status === 'wrong' && (
          <div
            role="status"
            className="p-4 rounded-xl bg-rose-50 border border-rose-300 flex items-start gap-3 animate-pop-in"
          >
            <AlertCircle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" aria-hidden="true" />
            <div className="space-y-1">
              <p className="font-bold text-rose-950">Belum Tepat — Coba Lagi</p>
              <p className="text-sm text-rose-900">{attemptState.message}</p>
            </div>
          </div>
        )}

        {/* Navigation Controls */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleRestart}
            className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 whitespace-nowrap"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            <span>Ulang dari Soal 1</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            className={`inline-flex items-center gap-2 min-h-[48px] px-5 py-2.5 rounded-xl text-sm font-bold transition-colors whitespace-nowrap ${
              attemptState.status === 'correct'
                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                : 'bg-slate-900 text-white hover:bg-slate-800'
            }`}
          >
            <span>
              {questionIndex === LISTENING_QUESTIONS.length - 1 ? 'Kembali ke Soal 1' : 'Soal Berikutnya'}
            </span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </section>
    </div>
  );
};
