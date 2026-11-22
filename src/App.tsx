import { useState, useEffect } from 'react';
import { Star, RotateCcw } from 'lucide-react';
import {
  BODY_VOCABULARY,
  BodyPartId,
  LISTENING_QUESTIONS,
  SPEAKING_TASKS,
  SPELLING_TASKS,
} from './data/bodyVocabulary';
import { ExploreTab } from './components/ExploreTab';
import { ListeningTab } from './components/ListeningTab';
import { SpellingTab } from './components/SpellingTab';
import { SpeakingTab } from './components/SpeakingTab';
import { stopSpeaking } from './utils/audio';

type ActiveTab = 'explore' | 'listening' | 'spelling' | 'speaking';

interface ProgressState {
  exploredParts: BodyPartId[];
  eyeGrammarExplored: boolean;
  listeningSolvedIds: string[];
  spellingSolvedIds: string[];
  speakingCompletedIds: string[];
}

const STORAGE_KEY = 'my_body_my_hobby_progress_v1';

const DEFAULT_PROGRESS: ProgressState = {
  exploredParts: ['eyes'],
  eyeGrammarExplored: false,
  listeningSolvedIds: [],
  spellingSolvedIds: [],
  speakingCompletedIds: [],
};

function loadInitialProgress(): ProgressState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    return {
      exploredParts: Array.isArray(parsed.exploredParts) ? parsed.exploredParts : ['eyes'],
      eyeGrammarExplored: Boolean(parsed.eyeGrammarExplored),
      listeningSolvedIds: Array.isArray(parsed.listeningSolvedIds) ? parsed.listeningSolvedIds : [],
      spellingSolvedIds: Array.isArray(parsed.spellingSolvedIds) ? parsed.spellingSolvedIds : [],
      speakingCompletedIds: Array.isArray(parsed.speakingCompletedIds)
        ? parsed.speakingCompletedIds
        : [],
    };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

const TABS: { id: ActiveTab; label: string }[] = [
  { id: 'explore', label: 'Explore & Label' },
  { id: 'listening', label: 'Listening Challenge' },
  { id: 'spelling', label: 'Spelling Builder' },
  { id: 'speaking', label: 'Speaking Practice' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('explore');
  const [progress, setProgress] = useState<ProgressState>(loadInitialProgress);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Ignore storage quota errors
    }
  }, [progress]);

  const handleTabChange = (tab: ActiveTab) => {
    stopSpeaking();
    setActiveTab(tab);
  };

  const handleExplorePart = (part: BodyPartId) => {
    setProgress((prev) => {
      if (prev.exploredParts.includes(part)) return prev;
      return { ...prev, exploredParts: [...prev.exploredParts, part] };
    });
  };

  const handleExploreEyeGrammar = () => {
    setProgress((prev) => {
      if (prev.eyeGrammarExplored) return prev;
      return { ...prev, eyeGrammarExplored: true };
    });
  };

  const handleSolveListening = (questionId: string) => {
    setProgress((prev) => {
      if (prev.listeningSolvedIds.includes(questionId)) return prev;
      return { ...prev, listeningSolvedIds: [...prev.listeningSolvedIds, questionId] };
    });
  };

  const handleSolveSpelling = (taskId: string) => {
    setProgress((prev) => {
      if (prev.spellingSolvedIds.includes(taskId)) return prev;
      return { ...prev, spellingSolvedIds: [...prev.spellingSolvedIds, taskId] };
    });
  };

  const handleCompleteSpeaking = (taskId: string) => {
    setProgress((prev) => {
      if (prev.speakingCompletedIds.includes(taskId)) return prev;
      return { ...prev, speakingCompletedIds: [...prev.speakingCompletedIds, taskId] };
    });
  };

  const handleResetProgress = () => {
    stopSpeaking();
    setProgress(DEFAULT_PROGRESS);
  };

  const maxStars =
    BODY_VOCABULARY.length +
    1 +
    LISTENING_QUESTIONS.length +
    SPELLING_TASKS.length +
    SPEAKING_TASKS.length;

  const totalStars =
    progress.exploredParts.length +
    (progress.eyeGrammarExplored ? 1 : 0) +
    progress.listeningSolvedIds.length +
    progress.spellingSolvedIds.length +
    progress.speakingCompletedIds.length;

  const progressPercent = Math.round((totalStars / maxStars) * 100);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Top Bar Contract: 3 clean single-row zones */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              handleTabChange('explore');
            }}
            className="font-display text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 whitespace-nowrap shrink-0"
          >
            My Body &amp; My Hobby
          </a>

          <nav
            aria-label="Navigasi Modul Pembelajaran"
            className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600"
          >
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTabChange(tab.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`py-5 border-b-2 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-sky-600 ${
                    isActive
                      ? 'border-sky-600 text-sky-700 font-bold'
                      : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={handleResetProgress}
              className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-sky-600"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Reset Skor</span>
            </button>
          </div>
        </div>
      </header>

      <main id="top" className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Intro + Star Score & Progress Bar */}
        <section
          aria-label="Ringkasan Kemajuan Belajar"
          className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-4"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1 max-w-2xl">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 text-balance">
                Belajar Anggota Tubuh &amp; Hobi dalam Bahasa Inggris
              </h1>
              <p className="text-sm sm:text-base text-slate-600">
                Materi Kelas 3 SD · 7 Kosakata Utama (head, eyes, ears, nose, mouth, hands, legs) · Aturan eye vs eyes
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-50 border border-amber-200">
                <Star className="w-6 h-6 text-amber-500 fill-amber-400 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-xs font-semibold text-amber-900">Skor Bintang</p>
                  <p className="text-lg font-extrabold text-slate-900 tabular-nums leading-tight">
                    {totalStars} / {maxStars}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar + Clean Unboxed Module Breakdown */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm text-slate-600">
              <div className="flex flex-wrap items-center gap-2 tabular-nums">
                <span className="font-semibold text-slate-800">Kemajuan Total: {progressPercent}%</span>
                <span aria-hidden="true">·</span>
                <span>Explore {progress.exploredParts.length}/7</span>
                <span aria-hidden="true">·</span>
                <span>Listening {progress.listeningSolvedIds.length}/{LISTENING_QUESTIONS.length}</span>
                <span aria-hidden="true">·</span>
                <span>Spelling {progress.spellingSolvedIds.length}/{SPELLING_TASKS.length}</span>
                <span aria-hidden="true">·</span>
                <span>Speaking {progress.speakingCompletedIds.length}/{SPEAKING_TASKS.length}</span>
              </div>
            </div>

            <div
              role="progressbar"
              aria-valuenow={progressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Bilah kemajuan belajar"
              className="w-full h-3 rounded-full bg-slate-100 overflow-hidden border border-slate-200"
            >
              <div
                className="h-full bg-sky-600 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Mobile/Tablet Tab Switcher (visible below md breakpoint) */}
          <div className="grid grid-cols-2 gap-2 md:hidden pt-2 border-t border-slate-100">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTabChange(tab.id)}
                  className={`min-h-[44px] px-3 py-2 rounded-xl text-sm font-bold transition-colors ${
                    isActive
                      ? 'bg-sky-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* Active Module View */}
        {activeTab === 'explore' && (
          <ExploreTab
            exploredParts={progress.exploredParts}
            eyeGrammarExplored={progress.eyeGrammarExplored}
            onExplorePart={handleExplorePart}
            onExploreEyeGrammar={handleExploreEyeGrammar}
          />
        )}

        {activeTab === 'listening' && (
          <ListeningTab
            solvedQuestionIds={progress.listeningSolvedIds}
            onSolveQuestion={handleSolveListening}
          />
        )}

        {activeTab === 'spelling' && (
          <SpellingTab
            solvedTaskIds={progress.spellingSolvedIds}
            onSolveTask={handleSolveSpelling}
          />
        )}

        {activeTab === 'speaking' && (
          <SpeakingTab
            completedTaskIds={progress.speakingCompletedIds}
            onCompleteTask={handleCompleteSpeaking}
          />
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white mt-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
          <span>My Body &amp; My Hobby · Pembelajaran Bahasa Inggris Kelas 3 SD</span>
          <span>Audio &amp; Ilustrasi SVG Mandiri (Tanpa Aset Eksternal)</span>
        </div>
      </footer>
    </div>
  );
}
