import React, { useState } from 'react';
import { Volume2, Eye, Check, BookOpen, Sparkles } from 'lucide-react';
import { BODY_VOCABULARY, BodyPartId } from '../data/bodyVocabulary';
import { BodyCharacterSVG } from './BodyCharacterSVG';
import { CloseUpAnatomySVG } from './CloseUpAnatomySVG';
import { playClickSound, speakEnglish } from '../utils/audio';

interface ExploreTabProps {
  exploredParts: BodyPartId[];
  eyeGrammarExplored: boolean;
  onExplorePart: (part: BodyPartId) => void;
  onExploreEyeGrammar: () => void;
}

export const ExploreTab: React.FC<ExploreTabProps> = ({
  exploredParts,
  eyeGrammarExplored,
  onExplorePart,
  onExploreEyeGrammar,
}) => {
  const [selectedPart, setSelectedPart] = useState<BodyPartId>('eyes');
  const [eyeMode, setEyeMode] = useState<'plural' | 'singular'>('plural');
  const [speakingTarget, setSpeakingTarget] = useState<'word' | 'sentence' | null>(null);

  const activeItem = BODY_VOCABULARY.find((item) => item.id === selectedPart) || BODY_VOCABULARY[1];
  const isSingularEye = selectedPart === 'eyes' && eyeMode === 'singular' && activeItem.singularOption;

  const handleSelectPart = (part: BodyPartId) => {
    playClickSound();
    setSelectedPart(part);
    onExplorePart(part);
    const item = BODY_VOCABULARY.find((v) => v.id === part);
    if (item) {
      const spoken = part === 'eyes' && eyeMode === 'singular' ? 'one eye' : item.lowercase;
      speakEnglish(spoken, {
        rate: 0.85,
        onStart: () => setSpeakingTarget('word'),
        onEnd: () => setSpeakingTarget(null),
      });
    }
  };

  const handleToggleEyeMode = (mode: 'plural' | 'singular') => {
    playClickSound();
    setEyeMode(mode);
    if (mode === 'singular') {
      onExploreEyeGrammar();
      speakEnglish('One eye. I close one eye. I wink with one eye.', {
        rate: 0.85,
        onStart: () => setSpeakingTarget('sentence'),
        onEnd: () => setSpeakingTarget(null),
      });
    } else {
      speakEnglish('Two eyes. I have two eyes. I read a book with my eyes.', {
        rate: 0.85,
        onStart: () => setSpeakingTarget('sentence'),
        onEnd: () => setSpeakingTarget(null),
      });
    }
  };

  const displayWord = isSingularEye ? activeItem.singularOption!.word : activeItem.word;
  const displayLower = isSingularEye ? activeItem.singularOption!.lowercase : activeItem.lowercase;
  const displaySentence = isSingularEye
    ? activeItem.singularOption!.sentence
    : selectedPart === 'eyes'
    ? activeItem.singularOption!.pluralCompareSentence
    : activeItem.hobbySentence;
  const displayTranslation = isSingularEye
    ? activeItem.singularOption!.translation
    : selectedPart === 'eyes'
    ? activeItem.singularOption!.pluralCompareTranslation
    : activeItem.hobbyTranslation;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Left Zone: Full-body Interactive Character Stage */}
      <section
        aria-label="Ilustrasi Tubuh Interaktif"
        className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Klik Bagian Tubuh pada Gambar</h2>
            <p className="text-sm text-slate-600">
              Ketuk titik biru yang berdenyut untuk melihat bentuk detail dan mendengar pelafalannya.
            </p>
          </div>
          <span className="text-sm font-semibold text-slate-700 tabular-nums">
            {exploredParts.length}/7 dipelajari
          </span>
        </div>

        <div className="py-4">
          <BodyCharacterSVG
            selectedPart={selectedPart}
            winkMode={Boolean(isSingularEye)}
            exploredParts={exploredParts}
            onSelectPart={handleSelectPart}
            showHotspots={true}
          />
        </div>

        {/* Quick accessible button strip for all 7 words */}
        <div className="pt-4 border-t border-slate-100">
          <p className="text-xs font-semibold text-slate-500 mb-2.5">Pilih langsung kosakata (7 kata utama):</p>
          <div className="flex flex-wrap gap-2">
            {BODY_VOCABULARY.map((item) => {
              const isSelected = selectedPart === item.id;
              const isDone = exploredParts.includes(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectPart(item.id)}
                  className={`inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 ${
                    isSelected
                      ? 'bg-sky-600 text-white'
                      : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                  }`}
                >
                  {isDone && (
                    <Check
                      className={`w-3.5 h-3.5 ${isSelected ? 'text-sky-100' : 'text-emerald-600'}`}
                      aria-hidden="true"
                    />
                  )}
                  <span>{item.word}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Right Zone: Detailed Close-up Card, Audio & Singular/Plural Grammar */}
      <section
        aria-label="Kartu Informasi Kosakata"
        className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-5"
      >
        {/* Close-up high-res anatomical SVG */}
        <div className="rounded-xl overflow-hidden border border-slate-200 bg-sky-50/40">
          <CloseUpAnatomySVG part={isSingularEye ? 'eye' : selectedPart} />
        </div>

        {/* Special Toggle for Eyes vs One Eye */}
        {selectedPart === 'eyes' && activeItem.singularOption && (
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-amber-950 font-bold text-sm">
                <Eye className="w-4 h-4 text-amber-700 shrink-0" aria-hidden="true" />
                <span>Aturan Khusus: Eyes (Jamak) vs Eye (Tunggal)</span>
              </div>
              {eyeGrammarExplored && (
                <span className="text-xs font-semibold text-emerald-700">Dipahami</span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 p-1 bg-white border border-amber-200 rounded-lg">
              <button
                type="button"
                onClick={() => handleToggleEyeMode('plural')}
                className={`min-h-[44px] px-3 py-2 rounded-md text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-sky-600 ${
                  eyeMode === 'plural'
                    ? 'bg-sky-600 text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                Two Eyes (2 Mata)
              </button>
              <button
                type="button"
                onClick={() => handleToggleEyeMode('singular')}
                className={`min-h-[44px] px-3 py-2 rounded-md text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-sky-600 ${
                  eyeMode === 'singular'
                    ? 'bg-amber-600 text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                One Eye (1 Mata)
              </button>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed">
              {activeItem.singularOption.ruleExplanation}
            </p>
          </div>
        )}

        {/* Word Spelling, Phonetic & Indonesian Meaning */}
        <div className="flex flex-wrap items-start justify-between gap-4 pt-1">
          <div>
            <div className="flex flex-wrap items-baseline gap-3">
              <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                {displayWord}
              </h3>
              <span className="text-xl font-semibold text-sky-700">
                {displayLower}
              </span>
            </div>
            <div className="mt-1.5 flex flex-wrap items-center gap-2 text-sm text-slate-600">
              <span className="font-semibold text-slate-900">Arti: {activeItem.indonesian}</span>
              <span aria-hidden="true">·</span>
              <span>{activeItem.pronunciationGuide}</span>
              <span aria-hidden="true">·</span>
              <span>{isSingularEye ? 'Tunggal (1 mata · tanpa -s)' : activeItem.grammarNote}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              speakEnglish(displayLower, {
                rate: 0.85,
                onStart: () => setSpeakingTarget('word'),
                onEnd: () => setSpeakingTarget(null),
              })
            }
            className={`inline-flex items-center gap-2 min-h-[46px] px-4 py-2.5 rounded-xl text-sm font-bold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 ${
              speakingTarget === 'word'
                ? 'bg-emerald-600 text-white'
                : 'bg-sky-600 text-white hover:bg-sky-700'
            }`}
          >
            <Volume2 className="w-5 h-5" aria-hidden="true" />
            <span>{speakingTarget === 'word' ? 'Sedang Membaca...' : 'Dengar Kata'}</span>
          </button>
        </div>

        {/* Hobby Context Sentence */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <div className="flex items-center justify-between gap-2 text-xs font-semibold text-slate-500">
            <span className="inline-flex items-center gap-1.5 text-sky-700">
              <BookOpen className="w-4 h-4" aria-hidden="true" />
              <span>Kalimat Hobi · {activeItem.hobbyName}</span>
            </span>
          </div>

          <p className="text-xl font-bold text-slate-900 leading-snug">
            “{displaySentence}”
          </p>
          <p className="text-sm text-slate-600">{displayTranslation}</p>

          <button
            type="button"
            onClick={() =>
              speakEnglish(displaySentence, {
                rate: 0.85,
                onStart: () => setSpeakingTarget('sentence'),
                onEnd: () => setSpeakingTarget(null),
              })
            }
            className={`inline-flex items-center gap-2 min-h-[46px] px-4 py-2.5 rounded-xl text-sm font-bold border transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 ${
              speakingTarget === 'sentence'
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
            }`}
          >
            <Volume2 className="w-5 h-5 text-sky-600" aria-hidden="true" />
            <span>{speakingTarget === 'sentence' ? 'Membacakan Kalimat...' : 'Dengar Kalimat Hobi'}</span>
          </button>
        </div>

        {/* Educational Fun Fact */}
        <div className="pt-4 border-t border-slate-100 flex items-start gap-2.5 text-sm text-slate-600">
          <Sparkles className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" aria-hidden="true" />
          <p>
            <span className="font-semibold text-slate-800">Tahukah kamu? </span>
            {activeItem.funFact}
          </p>
        </div>
      </section>
    </div>
  );
};
