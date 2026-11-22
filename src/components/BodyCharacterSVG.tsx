import React from 'react';
import { BodyPartId } from '../data/bodyVocabulary';

interface BodyCharacterSVGProps {
  selectedPart?: BodyPartId | null;
  winkMode?: boolean;
  exploredParts?: BodyPartId[];
  feedbackState?: { targetId: BodyPartId; status: 'correct' | 'wrong' } | null;
  onSelectPart: (part: BodyPartId) => void;
  showHotspots?: boolean;
  interactiveDisabled?: boolean;
}

interface HotspotConfig {
  id: BodyPartId;
  label: string;
  cx: number;
  cy: number;
  labelX: number;
  labelY: number;
  lineEndX: number;
  lineEndY: number;
}

const HOTSPOTS: HotspotConfig[] = [
  { id: 'head', label: 'Head', cx: 200, cy: 58, labelX: 318, labelY: 52, lineEndX: 224, lineEndY: 58 },
  { id: 'eyes', label: 'Eyes', cx: 184, cy: 96, labelX: 78, labelY: 84, lineEndX: 168, lineEndY: 96 },
  { id: 'ears', label: 'Ears', cx: 245, cy: 108, labelX: 320, labelY: 108, lineEndX: 253, lineEndY: 108 },
  { id: 'nose', label: 'Nose', cx: 200, cy: 111, labelX: 78, labelY: 124, lineEndX: 192, lineEndY: 112 },
  { id: 'mouth', label: 'Mouth', cx: 200, cy: 132, labelX: 320, labelY: 152, lineEndX: 218, lineEndY: 132 },
  { id: 'hands', label: 'Hands', cx: 92, cy: 298, labelX: 66, labelY: 360, lineEndX: 92, lineEndY: 314 },
  { id: 'legs', label: 'Legs', cx: 230, cy: 428, labelX: 326, labelY: 428, lineEndX: 254, lineEndY: 428 },
];

export const BodyCharacterSVG: React.FC<BodyCharacterSVGProps> = ({
  selectedPart = null,
  winkMode = false,
  exploredParts = [],
  feedbackState = null,
  onSelectPart,
  showHotspots = true,
  interactiveDisabled = false,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent, part: BodyPartId) => {
    if (interactiveDisabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelectPart(part);
    }
  };

  const getRegionHighlightColor = (part: BodyPartId) => {
    if (feedbackState?.targetId === part) {
      return feedbackState.status === 'correct' ? '#059669' : '#E11D48';
    }
    if (selectedPart === part) return '#0284C7';
    return null;
  };

  return (
    <svg
      viewBox="0 0 400 560"
      className="w-full max-w-[400px] mx-auto h-auto select-none"
      role="img"
      aria-label="Ilustrasi interaktif tubuh anak lengkap dengan titik bagian tubuh"
    >
      <defs>
        <radialGradient id="fc-skin" cx="46%" cy="38%" r="65%">
          <stop offset="0%" stopColor="#FFE3CC" />
          <stop offset="65%" stopColor="#F7C6A3" />
          <stop offset="100%" stopColor="#E1A27B" />
        </radialGradient>
        <linearGradient id="fc-skin-limb" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFE0C6" />
          <stop offset="55%" stopColor="#F4C19D" />
          <stop offset="100%" stopColor="#DC9B74" />
        </linearGradient>
        <linearGradient id="fc-hair" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3F2A1F" />
          <stop offset="55%" stopColor="#2A1B13" />
          <stop offset="100%" stopColor="#190E08" />
        </linearGradient>
        <linearGradient id="fc-shirt" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0EA5E9" />
          <stop offset="100%" stopColor="#0369A1" />
        </linearGradient>
        <linearGradient id="fc-shorts" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </linearGradient>
        <radialGradient id="fc-iris" cx="45%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#7C4A26" />
          <stop offset="65%" stopColor="#46240E" />
          <stop offset="100%" stopColor="#231004" />
        </radialGradient>
      </defs>

      {/* Clean floor shadow */}
      <ellipse cx="200" cy="526" rx="95" ry="13" fill="#CBD5E1" opacity="0.65" />

      {/* ================= LEGS (Kaki + Lutut + Sepatu) ================= */}
      <g
        onClick={() => !interactiveDisabled && onSelectPart('legs')}
        onKeyDown={(e) => handleKeyDown(e, 'legs')}
        tabIndex={interactiveDisabled ? -1 : 0}
        role="button"
        aria-label="Pilih Legs (Kaki)"
        className={interactiveDisabled ? 'cursor-default' : 'cursor-pointer focus:outline-none'}
      >
        {/* Left Leg */}
        <path
          d="M158 342 L155 415 C154 426, 155 434, 157 442 L160 492 L183 492 L188 442 C190 434, 191 425, 190 415 L193 342 Z"
          fill="url(#fc-skin-limb)"
          stroke={getRegionHighlightColor('legs') || '#C68660'}
          strokeWidth={getRegionHighlightColor('legs') ? 3 : 1.5}
        />
        {/* Left Kneecap (Patella) */}
        <ellipse cx="172" cy="422" rx="8.5" ry="9" fill="#FFE6D3" opacity="0.6" />
        <path d="M165 417 Q172 413 179 417 M166 428 Q172 431 178 428" fill="none" stroke="#C5825E" strokeWidth="1.4" strokeLinecap="round" />
        {/* Left Sock & Sneaker */}
        <path d="M159 480 L184 480 L185 498 L158 498 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.2" />
        <path d="M159 485 L184 485" stroke="#0284C7" strokeWidth="2.2" />
        <path d="M157 496 L186 496 L191 512 C191 519, 184 522, 168 522 L147 522 C141 522, 141 513, 147 507 Z" fill="#0284C7" stroke="#075985" strokeWidth="1.5" />
        <path d="M144 516 L190 516 L190 522 L144 522 Z" fill="#FFFFFF" />

        {/* Right Leg */}
        <path
          d="M207 342 L210 415 C209 425, 210 434, 212 442 L217 492 L240 492 L243 442 C245 434, 246 426, 245 415 L242 342 Z"
          fill="url(#fc-skin-limb)"
          stroke={getRegionHighlightColor('legs') || '#C68660'}
          strokeWidth={getRegionHighlightColor('legs') ? 3 : 1.5}
        />
        {/* Right Kneecap (Patella) */}
        <ellipse cx="228" cy="422" rx="8.5" ry="9" fill="#FFE6D3" opacity="0.6" />
        <path d="M221 417 Q228 413 235 417 M222 428 Q228 431 234 428" fill="none" stroke="#C5825E" strokeWidth="1.4" strokeLinecap="round" />
        {/* Right Sock & Sneaker */}
        <path d="M216 480 L241 480 L242 498 L215 498 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.2" />
        <path d="M216 485 L241 485" stroke="#0284C7" strokeWidth="2.2" />
        <path d="M214 496 L243 496 L253 507 C259 513, 259 522, 253 522 L232 522 C216 522, 209 519, 209 512 Z" fill="#0284C7" stroke="#075985" strokeWidth="1.5" />
        <path d="M210 516 L256 516 L256 522 L210 522 Z" fill="#FFFFFF" />

        {/* Generous touch target across legs */}
        <rect x="140" y="365" width="120" height="160" fill="transparent" />
      </g>

      {/* ================= TORSO & SHORTS ================= */}
      <g>
        {/* Neck */}
        <path d="M182 146 L182 178 Q200 186 218 178 L218 146 Z" fill="url(#fc-skin-limb)" stroke="#C68660" strokeWidth="1.3" />
        <path d="M185 150 Q200 164 215 150 L215 164 Q200 172 185 164 Z" fill="#C98661" opacity="0.35" />

        {/* Denim Shorts */}
        <path d="M150 286 L250 286 L255 352 L205 352 L200 326 L195 352 L145 352 Z" fill="url(#fc-shorts)" stroke="#1E3A8A" strokeWidth="1.6" />
        <path d="M148 345 L193 345 M207 345 L252 345" stroke="#93C5FD" strokeWidth="1.2" strokeDasharray="3 3" />

        {/* Arms (Upper arms & forearms) */}
        <path d="M146 184 L112 246 L100 280 L120 286 L133 252 L154 218 Z" fill="url(#fc-skin-limb)" stroke="#C68660" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M254 184 L288 246 L300 280 L280 286 L267 252 L246 218 Z" fill="url(#fc-skin-limb)" stroke="#C68660" strokeWidth="1.5" strokeLinejoin="round" />

        {/* Polo Shirt Torso & Sleeves */}
        <path
          d="M150 172 Q200 164 250 172 L274 216 L248 228 L244 205 L248 288 L152 288 L156 205 L152 228 L126 216 Z"
          fill="url(#fc-shirt)"
          stroke="#0369A1"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        {/* Shirt Collar */}
        <path d="M174 170 L200 192 L226 170 L214 166 L200 180 L186 166 Z" fill="#FFFFFF" stroke="#BAE6FD" strokeWidth="1.2" />
        <line x1="200" y1="190" x2="200" y2="212" stroke="#E0F2FE" strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* ================= HANDS (Left & Right with 5 Fingers) ================= */}
      <g
        onClick={() => !interactiveDisabled && onSelectPart('hands')}
        onKeyDown={(e) => handleKeyDown(e, 'hands')}
        tabIndex={interactiveDisabled ? -1 : 0}
        role="button"
        aria-label="Pilih Hands (Tangan)"
        className={interactiveDisabled ? 'cursor-default' : 'cursor-pointer focus:outline-none'}
      >
        {/* Left Hand (Viewer's Left) */}
        <path
          d="M100 278 L119 283 C124 291, 126 300, 121 304 C118 306, 114 301, 112 296
             L111 317 C110 322, 105 322, 105 316 L104 302
             L101 322 C100 327, 94 327, 95 321 L96 302
             L91 321 C90 326, 84 325, 85 319 L89 301
             L82 315 C80 319, 75 317, 77 311 L85 294 C88 286, 94 281, 100 278 Z"
          fill="url(#fc-skin)"
          stroke={getRegionHighlightColor('hands') || '#C68660'}
          strokeWidth={getRegionHighlightColor('hands') ? 2.8 : 1.4}
          strokeLinejoin="round"
        />
        {/* Right Hand (Viewer's Right) */}
        <path
          d="M300 278 L281 283 C276 291, 274 300, 279 304 C282 306, 286 301, 288 296
             L289 317 C290 322, 295 322, 295 316 L296 302
             L299 322 C300 327, 306 327, 305 321 L304 302
             L309 321 C310 326, 316 325, 315 319 L311 301
             L318 315 C320 319, 325 317, 323 311 L315 294 C312 286, 306 281, 300 278 Z"
          fill="url(#fc-skin)"
          stroke={getRegionHighlightColor('hands') || '#C68660'}
          strokeWidth={getRegionHighlightColor('hands') ? 2.8 : 1.4}
          strokeLinejoin="round"
        />
        <circle cx="98" cy="300" r="28" fill="transparent" />
        <circle cx="302" cy="300" r="28" fill="transparent" />
      </g>

      {/* ================= HEAD & FACIAL FEATURES ================= */}
      {/* Back Hair */}
      <path d="M148 92 C144 40, 174 22, 200 22 C226 22, 256 40, 252 92 Z" fill="url(#fc-hair)" />

      {/* Ears (Telinga) */}
      <g
        onClick={() => !interactiveDisabled && onSelectPart('ears')}
        onKeyDown={(e) => handleKeyDown(e, 'ears')}
        tabIndex={interactiveDisabled ? -1 : 0}
        role="button"
        aria-label="Pilih Ears (Telinga)"
        className={interactiveDisabled ? 'cursor-default' : 'cursor-pointer focus:outline-none'}
      >
        <ellipse
          cx="151"
          cy="108"
          rx="9"
          ry="15"
          fill="url(#fc-skin)"
          stroke={getRegionHighlightColor('ears') || '#C68660'}
          strokeWidth={getRegionHighlightColor('ears') ? 2.8 : 1.4}
        />
        <path d="M149 101 Q145 108 150 116" fill="none" stroke="#B77450" strokeWidth="1.5" strokeLinecap="round" />

        <ellipse
          cx="249"
          cy="108"
          rx="9"
          ry="15"
          fill="url(#fc-skin)"
          stroke={getRegionHighlightColor('ears') || '#C68660'}
          strokeWidth={getRegionHighlightColor('ears') ? 2.8 : 1.4}
        />
        <path d="M251 101 Q255 108 250 116" fill="none" stroke="#B77450" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="148" cy="108" r="18" fill="transparent" />
        <circle cx="252" cy="108" r="18" fill="transparent" />
      </g>

      {/* Head Contour (Kepala) */}
      <g
        onClick={() => !interactiveDisabled && onSelectPart('head')}
        onKeyDown={(e) => handleKeyDown(e, 'head')}
        tabIndex={interactiveDisabled ? -1 : 0}
        role="button"
        aria-label="Pilih Head (Kepala)"
        className={interactiveDisabled ? 'cursor-default' : 'cursor-pointer focus:outline-none'}
      >
        <path
          d="M153 84 C152 126, 168 156, 200 158 C232 156, 248 126, 247 84 C247 52, 227 36, 200 36 C173 36, 153 52, 153 84 Z"
          fill="url(#fc-skin)"
          stroke={getRegionHighlightColor('head') || '#C98A65'}
          strokeWidth={getRegionHighlightColor('head') ? 2.8 : 1.4}
        />
        {/* Cheek warmth */}
        <ellipse cx="170" cy="118" rx="10" ry="5.5" fill="#F29587" opacity="0.26" />
        <ellipse cx="230" cy="118" rx="10" ry="5.5" fill="#F29587" opacity="0.26" />

        {/* Natural Front Hair */}
        <path
          d="M148 92 C147 52, 170 24, 202 24 C234 24, 253 52, 252 92 C247 72, 236 60, 224 57 C212 66, 193 70, 174 64 C162 72, 153 81, 148 92 Z"
          fill="url(#fc-hair)"
          stroke={getRegionHighlightColor('head') || 'none'}
          strokeWidth={getRegionHighlightColor('head') ? 2.5 : 0}
        />
        <path d="M174 42 Q200 32 226 42" fill="none" stroke="#5A4033" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        {/* Clickable forehead/hair zone */}
        <ellipse cx="200" cy="52" rx="45" ry="25" fill="transparent" />
      </g>

      {/* Eyebrows */}
      <path d="M168 83 Q180 78 190 83" fill="none" stroke="#2D1D14" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M210 83 Q220 78 232 83" fill="none" stroke="#2D1D14" strokeWidth="2.6" strokeLinecap="round" />

      {/* Eyes (Mata) — Supports winkMode for 'one eye' */}
      <g
        onClick={() => !interactiveDisabled && onSelectPart('eyes')}
        onKeyDown={(e) => handleKeyDown(e, 'eyes')}
        tabIndex={interactiveDisabled ? -1 : 0}
        role="button"
        aria-label="Pilih Eyes (Mata)"
        className={interactiveDisabled ? 'cursor-default' : 'cursor-pointer focus:outline-none'}
      >
        {getRegionHighlightColor('eyes') && (
          <rect
            x="162"
            y="86"
            width="76"
            height="20"
            rx="10"
            fill="none"
            stroke={getRegionHighlightColor('eyes')!}
            strokeWidth="2.2"
          />
        )}
        {/* Viewer's Left Eye — Open */}
        <path d="M168 96 Q179 88 190 96 Q179 102 168 96 Z" fill="#FFFFFF" stroke="#9B6A4E" strokeWidth="1.1" />
        <circle cx="179" cy="96" r="5" fill="url(#fc-iris)" />
        <circle cx="179" cy="96" r="2.3" fill="#0F172A" />
        <circle cx="177.5" cy="94.5" r="1.3" fill="#FFFFFF" />
        <path d="M168 95 Q179 87 190 95" fill="none" stroke="#2B1A11" strokeWidth="1.8" strokeLinecap="round" />

        {/* Viewer's Right Eye — Open or Winking */}
        {winkMode ? (
          <g>
            <path d="M210 96 Q221 102 232 96" fill="none" stroke="#2B1A11" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M214 98 L212 102 M221 100 L221 104 M228 98 L230 102" stroke="#2B1A11" strokeWidth="1.3" strokeLinecap="round" />
          </g>
        ) : (
          <g>
            <path d="M210 96 Q221 88 232 96 Q221 102 210 96 Z" fill="#FFFFFF" stroke="#9B6A4E" strokeWidth="1.1" />
            <circle cx="221" cy="96" r="5" fill="url(#fc-iris)" />
            <circle cx="221" cy="96" r="2.3" fill="#0F172A" />
            <circle cx="219.5" cy="94.5" r="1.3" fill="#FFFFFF" />
            <path d="M210 95 Q221 87 232 95" fill="none" stroke="#2B1A11" strokeWidth="1.8" strokeLinecap="round" />
          </g>
        )}
        <rect x="163" y="85" width="74" height="20" fill="transparent" />
      </g>

      {/* Nose (Hidung) */}
      <g
        onClick={() => !interactiveDisabled && onSelectPart('nose')}
        onKeyDown={(e) => handleKeyDown(e, 'nose')}
        tabIndex={interactiveDisabled ? -1 : 0}
        role="button"
        aria-label="Pilih Nose (Hidung)"
        className={interactiveDisabled ? 'cursor-default' : 'cursor-pointer focus:outline-none'}
      >
        {getRegionHighlightColor('nose') && (
          <circle cx="200" cy="111" r="11" fill="none" stroke={getRegionHighlightColor('nose')!} strokeWidth="2.2" />
        )}
        <path d="M200 97 L197 112 Q200 116 204 112" fill="none" stroke="#C5815D" strokeWidth="1.6" strokeLinecap="round" />
        <ellipse cx="196.5" cy="113.5" rx="1.7" ry="1" fill="#9E5E3F" opacity="0.7" />
        <ellipse cx="203.5" cy="113.5" rx="1.7" ry="1" fill="#9E5E3F" opacity="0.7" />
        <circle cx="200" cy="110" r="13" fill="transparent" />
      </g>

      {/* Mouth (Mulut) */}
      <g
        onClick={() => !interactiveDisabled && onSelectPart('mouth')}
        onKeyDown={(e) => handleKeyDown(e, 'mouth')}
        tabIndex={interactiveDisabled ? -1 : 0}
        role="button"
        aria-label="Pilih Mouth (Mulut)"
        className={interactiveDisabled ? 'cursor-default' : 'cursor-pointer focus:outline-none'}
      >
        {getRegionHighlightColor('mouth') && (
          <ellipse cx="200" cy="132" rx="19" ry="11" fill="none" stroke={getRegionHighlightColor('mouth')!} strokeWidth="2.2" />
        )}
        <path d="M185 128 Q200 140 215 128 Q200 132 185 128 Z" fill="#FFFFFF" stroke="#B65555" strokeWidth="1.4" />
        <path d="M188 131 Q200 142 212 131" fill="none" stroke="#C86362" strokeWidth="1.8" strokeLinecap="round" />
        <ellipse cx="200" cy="132" rx="20" ry="12" fill="transparent" />
      </g>

      {/* ================= PULSING HOTSPOTS & CALLOUT LABELS ================= */}
      {showHotspots &&
        HOTSPOTS.map((spot) => {
          const isSelected = selectedPart === spot.id;
          const isExplored = exploredParts.includes(spot.id);
          const feedback = feedbackState?.targetId === spot.id ? feedbackState.status : null;

          let ringColor = '#0284C7';
          let dotBg = '#0284C7';
          if (feedback === 'correct') {
            ringColor = '#059669';
            dotBg = '#059669';
          } else if (feedback === 'wrong') {
            ringColor = '#E11D48';
            dotBg = '#E11D48';
          } else if (isSelected) {
            ringColor = '#0369A1';
            dotBg = '#0369A1';
          } else if (isExplored) {
            ringColor = '#059669';
            dotBg = '#059669';
          }

          const isLeft = spot.labelX < 200;

          return (
            <g
              key={spot.id}
              onClick={() => !interactiveDisabled && onSelectPart(spot.id)}
              onKeyDown={(e) => handleKeyDown(e, spot.id)}
              tabIndex={interactiveDisabled ? -1 : 0}
              role="button"
              aria-label={`Titik interaktif ${spot.label}`}
              className={interactiveDisabled ? 'cursor-default' : 'cursor-pointer focus:outline-none'}
            >
              {/* Callout leader line */}
              <line
                x1={spot.lineEndX}
                y1={spot.lineEndY}
                x2={isLeft ? spot.labelX + 34 : spot.labelX - 34}
                y2={spot.labelY}
                stroke={isSelected ? '#0284C7' : '#94A3B8'}
                strokeWidth={isSelected ? 2 : 1.3}
                strokeDasharray={isSelected ? 'none' : '3 3'}
              />

              {/* Pulsing hotspot ring */}
              <circle
                cx={spot.cx}
                cy={spot.cy}
                r="13"
                fill="none"
                stroke={ringColor}
                strokeWidth="2"
                className="animate-hotspot-ring"
                style={{ transformOrigin: `${spot.cx}px ${spot.cy}px` }}
              />
              <circle
                cx={spot.cx}
                cy={spot.cy}
                r="7.5"
                fill={dotBg}
                stroke="#FFFFFF"
                strokeWidth="2"
              />

              {/* Clean interactive label button */}
              <rect
                x={spot.labelX - 36}
                y={spot.labelY - 15}
                width="72"
                height="30"
                rx="8"
                fill={isSelected ? '#0284C7' : feedback === 'correct' ? '#059669' : feedback === 'wrong' ? '#E11D48' : '#FFFFFF'}
                stroke={isSelected ? '#0369A1' : isExplored ? '#10B981' : '#CBD5E1'}
                strokeWidth="1.5"
              />
              <text
                x={spot.labelX}
                y={spot.labelY + 4.5}
                textAnchor="middle"
                fontSize="13"
                fontWeight="700"
                fill={isSelected || feedback ? '#FFFFFF' : '#0F172A'}
                fontFamily="Plus Jakarta Sans, sans-serif"
              >
                {spot.id === 'eyes' && winkMode ? '1 Eye' : spot.label}
              </text>
            </g>
          );
        })}
    </svg>
  );
};
